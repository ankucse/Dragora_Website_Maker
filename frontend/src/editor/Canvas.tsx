import { useEditorStore } from '../store/useEditorStore';
import { motion } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { Play, Check, ShoppingCart } from 'lucide-react';

export function Canvas() {
  const pages = useEditorStore(s => s.pages);
  const currentPageId = useEditorStore(s => s.currentPageId);
  const components = pages.find(p => p.id === currentPageId)?.components || [];
  const selectedId = useEditorStore(s => s.selectedId);
  const selectComponent = useEditorStore(s => s.selectComponent);
  const addComponent = useEditorStore(s => s.addComponent);
  const updateComponent = useEditorStore(s => s.updateComponent);
  const isPreview = useEditorStore(s => s.isPreview);
  const setCurrentPage = useEditorStore(s => s.setCurrentPage);
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Prevent default window drag/drop behavior to avoid file open in new tab
  useEffect(() => {
    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
    };
    const handleWindowDrop = (e: DragEvent) => {
      e.preventDefault();
    };
    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);
    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, []);

  // HTML5 Drag and Drop for Local Images
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const rect = canvasRef.current?.getBoundingClientRect();
    const scrollParent = canvasRef.current?.parentElement;
    const scrollTop = scrollParent?.scrollTop || 0;
    const scrollLeft = scrollParent?.scrollLeft || 0;

    const x = (e.clientX - (rect?.left || 0) + scrollLeft) / scale;
    const y = (e.clientY - (rect?.top || 0) + scrollTop) / scale;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const isImage = file.type.startsWith('image/') || /\.(gif|jpe?g|tiff?|png|webp|bmp|svg)$/i.test(file.name);
      const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.name);

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            addComponent('image', { src: event.target.result as string }, x, y);
          }
        };
        reader.readAsDataURL(file);
      } else if (isVideo) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            addComponent('video', { src: event.target.result as string }, x, y);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, [addComponent, scale]);

  // Handle zooming with mouse wheel (holding Ctrl/Cmd)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setScale(s => Math.min(Math.max(0.1, s - e.deltaY * 0.005), 3));
      }
    };
    
    const canvasEl = canvasRef.current;
    if (canvasEl) {
      canvasEl.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvasEl.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const handleTextEdit = (id: string, newText: string) => {
    updateComponent(id, { props: { text: newText } });
  };

  const renderComponent = (comp: any) => {
    const isSelected = selectedId === comp.id;
    
    // Base styles minus sizing/positioning (handled by Rnd)
    const { width, height, ...innerStyles } = comp.styles;
    
    const innerContent = (() => {
      switch (comp.type) {
        case 'hero':
          return (
            <div className="w-full h-full flex flex-col" style={innerStyles}>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-center">{comp.props.title}</h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-center opacity-80">{comp.props.subtitle}</p>
            </div>
          );
        case 'text':
          return (
            <div 
              className="w-full h-full outline-none" 
              style={innerStyles}
              contentEditable={isSelected && !isPreview}
              suppressContentEditableWarning
              onBlur={(e) => handleTextEdit(comp.id, e.currentTarget.textContent || '')}
              onClick={(e) => e.stopPropagation()}
            >
              {comp.props.text}
            </div>
          );
        case 'button':
          const handleBtnClick = () => {
            if (!isPreview) return;
            if (comp.props.actionType === 'navigate' && comp.props.actionTarget) {
              setCurrentPage(comp.props.actionTarget);
            } else if (comp.props.actionType === 'alert') {
              alert("Action triggered successfully!");
            }
          };
          return (
            <button 
              className={`w-full h-full flex items-center justify-center ${isPreview ? 'pointer-events-auto cursor-pointer hover:opacity-90' : 'pointer-events-none'}`} 
              style={innerStyles}
              onClick={handleBtnClick}
            >
              {comp.props.text}
            </button>
          );
        case 'image':
          return (
            <img src={comp.props.src} alt="img" className="w-full h-full" style={innerStyles} draggable={false} />
          );
        case 'glasscard':
          return (
            <div className="w-full h-full p-6 flex flex-col" style={innerStyles}>
              <h3 className="text-xl font-bold mb-2 text-white">{comp.props.title}</h3>
              <p className="text-sm text-white/70">Drag to resize this glassmorphism card.</p>
            </div>
          );
        case 'mesh':
          return (
            <div className="w-full h-full relative overflow-hidden" style={innerStyles}>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-xl mix-blend-overlay">Mesh Gradient</div>
            </div>
          );
        case 'navbar':
          return (
            <div className="w-full h-full flex items-center justify-between" style={innerStyles}>
               <div className="font-bold text-lg cursor-pointer" onClick={() => isPreview && setCurrentPage('page-home')}>Logo</div>
               <div className="flex gap-6 text-sm font-medium">
                 <span className="cursor-pointer hover:text-white/80 transition-colors" onClick={() => isPreview && setCurrentPage('page-home')}>Home</span>
                 <span className="cursor-pointer hover:text-white/80 transition-colors">Features</span>
                 <span className="cursor-pointer hover:text-white/80 transition-colors" onClick={() => isPreview && setCurrentPage('page-pricing')}>Pricing</span>
               </div>
               <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-bold hover:bg-zinc-200 transition-colors" onClick={() => isPreview && setCurrentPage('page-pricing')}>Sign Up</button>
            </div>
          );
        case 'video':
          return (
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black" style={innerStyles}>
              {comp.props.src ? (
                 <video src={comp.props.src} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                 <img src="https://images.unsplash.com/photo-1616499370260-485e3e5810e2?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="placeholder" />
              )}
              {!comp.props.src && (
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 z-10 cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              )}
            </div>
          );
        case 'pricing':
          return (
            <div className="w-full h-full flex gap-6" style={innerStyles}>
              {[ 'Basic', 'Pro', 'Enterprise' ].map((plan, i) => (
                <div key={plan} className={`flex-1 rounded-2xl p-6 border ${i === 1 ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-zinc-900/50'} flex flex-col`}>
                   <h3 className="text-xl font-bold text-white">{plan}</h3>
                   <div className="mt-4 text-3xl font-bold text-white">${i === 0 ? '9' : i === 1 ? '29' : '99'}<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
                   <div className="mt-6 space-y-3 flex-1">
                     {[1,2,3].map(f => (
                       <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                         <Check className="w-4 h-4 text-indigo-400" /> Feature {f}
                       </div>
                     ))}
                   </div>
                   <button className={`w-full mt-6 py-2 rounded-lg font-bold text-sm ${i === 1 ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white'} ${isPreview ? 'pointer-events-auto cursor-pointer hover:scale-[1.02] transition-transform' : 'pointer-events-none'}`}>Get Started</button>
                </div>
              ))}
            </div>
          );
        case 'form':
          const handleFormSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!isPreview) return;
            alert("Form submitted successfully!");
          };
          return (
            <form onSubmit={handleFormSubmit} className="w-full h-full flex flex-col gap-4 text-white" style={innerStyles}>
              <h3 className="text-xl font-bold">Contact Us</h3>
              <input type="text" placeholder="Name" required className={`bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 ${isPreview ? 'pointer-events-auto' : 'pointer-events-none'}`} />
              <input type="email" placeholder="Email" required className={`bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 ${isPreview ? 'pointer-events-auto' : 'pointer-events-none'}`} />
              <textarea placeholder="Message" required className={`bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 flex-1 min-h-[80px] ${isPreview ? 'pointer-events-auto' : 'pointer-events-none'}`} />
              <button type="submit" className={`bg-white text-black font-bold py-2 rounded-lg ${isPreview ? 'pointer-events-auto cursor-pointer hover:bg-zinc-200' : 'pointer-events-none'}`}>Submit</button>
            </form>
          );
        case 'cart':
          return (
            <div className="w-full h-full flex flex-col" style={innerStyles}>
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> Your Cart</h3>
                <span className="bg-black text-white text-xs px-2 py-1 rounded-full">3 items</span>
              </div>
              <div className="flex-1 space-y-4">
                 {[1,2].map(i => (
                   <div key={i} className="flex gap-3">
                     <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                     <div>
                       <div className="font-medium text-sm">Premium Product {i}</div>
                       <div className="text-gray-500 text-xs">$99.00</div>
                     </div>
                   </div>
                 ))}
              </div>
              <button className="w-full bg-black text-white py-3 rounded-lg font-bold mt-4">Checkout - $198.00</button>
            </div>
          );
        case 'megamenu':
          return (
             <div className="w-full h-full flex flex-col" style={innerStyles}>
                <div className="flex gap-8 mb-6 border-b border-zinc-800 pb-4">
                  <span className="font-bold text-indigo-400 border-b-2 border-indigo-400 pb-4 -mb-[17px]">Products</span>
                  <span className="text-zinc-400">Solutions</span>
                  <span className="text-zinc-400">Resources</span>
                </div>
                <div className="flex gap-8 flex-1">
                   <div className="flex-1 space-y-4">
                     <h4 className="text-xs font-bold text-zinc-500 uppercase">Core</h4>
                     <div className="font-bold">Database</div>
                     <div className="font-bold">Authentication</div>
                     <div className="font-bold">Storage</div>
                   </div>
                   <div className="flex-1 space-y-4">
                     <h4 className="text-xs font-bold text-zinc-500 uppercase">Tools</h4>
                     <div className="font-bold">Edge Functions</div>
                     <div className="font-bold">Realtime</div>
                     <div className="font-bold">Vector</div>
                   </div>
                   <div className="flex-1 bg-zinc-900 rounded-lg p-4">
                      <h4 className="font-bold text-sm mb-2">New Release</h4>
                      <p className="text-xs text-zinc-400">Check out our latest AI features.</p>
                   </div>
                </div>
             </div>
          );
        case 'section':
        case 'container':
        case 'grid':
        case 'flex':
          return (
            <div className="w-full h-full relative" style={innerStyles}>
               {comp.type === 'grid' && (
                 <>
                   <div className="border border-white/10 rounded"></div>
                   <div className="border border-white/10 rounded"></div>
                 </>
               )}
            </div>
          );
        default:
          return (
            <div className="w-full h-full p-4 border border-dashed border-zinc-700 bg-zinc-900/50 flex flex-col items-center justify-center text-zinc-500 backdrop-blur-sm rounded-xl" style={innerStyles}>
              <span className="text-xs uppercase tracking-widest font-bold mb-1">{comp.type} Component</span>
              <span className="text-[10px]">Ready for configuration</span>
            </div>
          );
      }
    })();

    // Rnd drag bounds is parent
    return (
      <Rnd
        key={comp.id}
        bounds="parent"
        position={{ x: comp.position.x, y: comp.position.y }}
        size={{ width: comp.position.width, height: comp.position.height }}
        onDragStop={(_e, d) => {
          updateComponent(comp.id, { position: { ...comp.position, x: d.x, y: d.y } });
        }}
        onResizeStop={(_e, _direction, ref, _delta, position) => {
          updateComponent(comp.id, {
            position: {
              ...comp.position,
              width: ref.style.width,
              height: ref.style.height,
              ...position,
            }
          });
        }}
        onClick={(e: any) => { 
          if (isPreview) return;
          e.stopPropagation(); 
          selectComponent(comp.id); 
        }}
        className={isPreview ? '' : `group transition-shadow ${isSelected ? 'ring-2 ring-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]' : 'hover:ring-1 hover:ring-indigo-500/50'}`}
        style={{ zIndex: isSelected ? 50 : 10 }}
        dragHandleClassName="rnd-drag-handle"
        enableResizing={isSelected && !isPreview}
        disableDragging={isPreview}
      >
        <div className="w-full h-full relative rnd-drag-handle cursor-move">
          {innerContent}
          {/* Overlay to intercept drag/click events. Active ONLY in design mode, disabled when editing text. */}
          {!(comp.type === 'text' && isSelected) && !isPreview && (
            <div className="absolute inset-0 z-20" />
          )}
        </div>
      </Rnd>
    );
  };

  // Calculate dynamic canvas height to wrap all absolute components
  const canvasHeight = Math.max(
    800,
    ...components.map(c => {
      const y = Number(c.position.y) || 0;
      const h = Number(c.position.height) || (typeof c.position.height === 'string' ? parseInt(c.position.height) : 0) || 0;
      return y + h;
    })
  );
  
  return (
    <div className="w-full h-full overflow-hidden bg-[#0a0a0a] relative canvas-grid">
      {/* Pan & Zoom Container */}
      <div className="absolute inset-0 overflow-auto flex items-center justify-center p-12 custom-scrollbar">
        <div 
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center', transition: 'transform 0.1s ease-out' }}
          className="relative origin-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[1200px] h-[800px] bg-zinc-950 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative border border-white/10 overflow-y-auto overflow-x-hidden custom-scrollbar"
          >
            {/* Real Canvas Content */}
            <div 
              ref={(node) => {
                canvasRef.current = node;
                setNodeRef(node);
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => selectComponent(null)}
              style={{ height: `${canvasHeight}px` }}
              className={`w-full text-zinc-300 relative transition-colors ${isOver || isDragOver ? 'bg-indigo-500/10' : ''}`}
            >
              {components.map(renderComponent)}

              {components.length === 0 && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="px-6 py-4 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30 flex items-center gap-2 shadow-sm animate-pulse backdrop-blur-md">
                     <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                     Drop elements or images here (Use Ctrl+Wheel to Zoom)
                   </div>
                 </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-6 right-6 z-50 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md rounded-lg p-2 border border-white/10">
        <button onClick={() => setScale(s => Math.max(0.1, s - 0.1))} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-white">-</button>
        <span className="text-xs font-mono text-white w-12 text-center">{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale(s => Math.min(3, s + 0.1))} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-white">+</button>
      </div>
    </div>
  );
}
