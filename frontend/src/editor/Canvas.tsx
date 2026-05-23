import { useEditorStore } from '../store/useEditorStore';
import { motion } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

export function Canvas() {
  const components = useEditorStore(s => s.components);
  const selectedId = useEditorStore(s => s.selectedId);
  const selectComponent = useEditorStore(s => s.selectComponent);
  const addComponent = useEditorStore(s => s.addComponent);
  const updateComponent = useEditorStore(s => s.updateComponent);
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);

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
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            addComponent('image', { src: event.target.result as string }, x, y);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, [addComponent]);

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
              contentEditable={isSelected}
              suppressContentEditableWarning
              onBlur={(e) => handleTextEdit(comp.id, e.currentTarget.textContent || '')}
              onClick={(e) => e.stopPropagation()}
            >
              {comp.props.text}
            </div>
          );
        case 'button':
          return (
            <button className="w-full h-full flex items-center justify-center" style={innerStyles}>
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
               <div className="font-bold text-lg">Logo</div>
               <div className="flex gap-6 text-sm font-medium">
                 <span>Home</span>
                 <span>Features</span>
                 <span>Pricing</span>
               </div>
               <button className="px-4 py-2 bg-black text-white rounded-md text-sm font-bold">Sign Up</button>
            </div>
          );
        default:
          return (
            <div className="w-full h-full p-4 border border-dashed border-gray-300 bg-gray-50/50 flex items-center justify-center text-gray-500 backdrop-blur-sm" style={innerStyles}>
              {comp.type} Block
            </div>
          );
      }
    })();

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
        onClick={(e: any) => { e.stopPropagation(); selectComponent(comp.id); }}
        className={`group transition-shadow ${isSelected ? 'ring-2 ring-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]' : 'hover:ring-1 hover:ring-indigo-500/50'}`}
        style={{ zIndex: isSelected ? 50 : 10 }}
        dragHandleClassName="rnd-drag-handle"
        enableResizing={isSelected}
      >
        <div className="w-full h-full relative rnd-drag-handle cursor-move">
          {innerContent}
        </div>
      </Rnd>
    );
  };
  
  return (
    <div className="flex-1 overflow-hidden bg-[#0a0a0a] relative canvas-grid">
      {/* Pan & Zoom Container */}
      <div className="absolute inset-0 overflow-auto flex items-center justify-center p-12 custom-scrollbar">
        <div 
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center', transition: 'transform 0.1s ease-out' }}
          className="relative origin-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[1200px] h-[800px] bg-zinc-950 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative border border-white/10 overflow-hidden"
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
              className={`w-full h-full text-zinc-300 relative transition-colors ${isOver || isDragOver ? 'bg-indigo-500/10' : ''}`}
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
