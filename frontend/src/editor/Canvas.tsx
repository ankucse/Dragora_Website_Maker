import { useEditorStore } from '../store/useEditorStore';
import { motion } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { useState, useCallback } from 'react';

export function Canvas() {
  const components = useEditorStore(s => s.components);
  const selectedId = useEditorStore(s => s.selectedId);
  const selectComponent = useEditorStore(s => s.selectComponent);
  const addComponent = useEditorStore(s => s.addComponent);
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  const [isDragOver, setIsDragOver] = useState(false);

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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            addComponent('image', { src: event.target.result as string });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, [addComponent]);

  const renderComponent = (comp: any) => {
    const isSelected = selectedId === comp.id;
    const baseClass = `relative group transition-colors ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : 'hover:ring-2 hover:ring-indigo-500/50'} cursor-pointer overflow-hidden`;

    switch (comp.type) {
      case 'hero':
        return (
          <div key={comp.id} className={baseClass} style={comp.styles} onClick={(e) => { e.stopPropagation(); selectComponent(comp.id); }}>
            <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-center">{comp.props.title}</h1>
            <p className="text-xl max-w-2xl mx-auto text-center opacity-80">{comp.props.subtitle}</p>
          </div>
        );
      case 'text':
        return (
          <div key={comp.id} className={baseClass} style={comp.styles} onClick={(e) => { e.stopPropagation(); selectComponent(comp.id); }}>
            {comp.props.text}
          </div>
        );
      case 'button':
        return (
          <button key={comp.id} className={baseClass} style={comp.styles} onClick={(e) => { e.stopPropagation(); selectComponent(comp.id); }}>
            {comp.props.text}
          </button>
        );
      case 'image':
        return (
          <img key={comp.id} src={comp.props.src} alt="img" className={baseClass} style={comp.styles} onClick={(e) => { e.stopPropagation(); selectComponent(comp.id); }} />
        );
      case 'mesh':
        return (
          <div key={comp.id} className={baseClass} style={comp.styles} onClick={(e) => { e.stopPropagation(); selectComponent(comp.id); }}>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-3xl mix-blend-overlay">Mesh Gradient</div>
          </div>
        );
      case 'flex':
      case 'grid':
        return (
          <div key={comp.id} className={baseClass} style={{...comp.styles, minHeight: '100px'}} onClick={(e) => { e.stopPropagation(); selectComponent(comp.id); }}>
            {comp.children?.map(renderComponent)}
          </div>
        );
      default:
        return (
          <div key={comp.id} className={`${baseClass} p-8 border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-500`} style={comp.styles} onClick={(e) => { e.stopPropagation(); selectComponent(comp.id); }}>
            {comp.type} Block
          </div>
        );
    }
  };
  
  return (
    <div className="flex-1 canvas-grid overflow-auto flex justify-center items-start p-12 pt-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl min-h-[800px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative border border-white/20 overflow-hidden"
      >
        {/* Browser Topbar Mockup */}
        <div className="h-10 bg-[#f1f1f1] w-full border-b flex items-center px-4 gap-2 sticky top-0 z-20">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <div className="mx-auto w-1/2 h-5 bg-white rounded-md border text-[10px] flex items-center justify-center text-gray-400 font-mono">
            acme.lumina.build
          </div>
        </div>

        {/* Real Canvas Content */}
        <div 
          ref={setNodeRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => selectComponent(null)}
          className={`p-8 text-black relative min-h-[760px] transition-colors ${isOver || isDragOver ? 'bg-indigo-50' : ''}`}
        >
          <div className="flex flex-col gap-4">
            {components.map(renderComponent)}
          </div>

          {components.length === 0 && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="px-6 py-4 rounded-full bg-indigo-50 text-indigo-600 font-medium border border-indigo-100 flex items-center gap-2 shadow-sm animate-pulse">
                 <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                 Drop elements or images here
               </div>
             </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
