import { Sidebar } from '../editor/Sidebar';
import { Canvas } from '../editor/Canvas';
import { PropertiesPanel } from '../editor/PropertiesPanel';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Globe, Smartphone, Monitor, Tablet, Undo2, Redo2, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { useEditorStore } from '../store/useEditorStore';
import type { ComponentType } from '../store/useEditorStore';
import { useState, useEffect } from 'react';

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = useEditorStore(s => s.pages);
  const currentPageId = useEditorStore(s => s.currentPageId);
  const setCurrentPage = useEditorStore(s => s.setCurrentPage);
  const addPage = useEditorStore(s => s.addPage);
  const undo = useEditorStore(s => s.undo);
  const redo = useEditorStore(s => s.redo);
  const pastCount = useEditorStore(s => s.past.length);
  const futureCount = useEditorStore(s => s.future.length);
  const deviceMode = useEditorStore(s => s.deviceMode);
  const setDeviceMode = useEditorStore(s => s.setDeviceMode);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { over, active } = event;
    
    if (over && over.id === 'canvas') {
      const typeStr = active.id.toString().replace('sidebar-', '');
      const addComponent = useEditorStore.getState().addComponent;
      addComponent(typeStr as ComponentType, {}, 300, 300);
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen w-screen bg-[#0a0a0a] flex flex-col overflow-hidden font-sans text-zinc-300">
        {/* Floating Pill Toolbar */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        >
          <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-[1px] h-6 bg-white/10"></div>

          {/* Device Toggles */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-full border border-white/5">
            <select 
              value={currentPageId}
              onChange={(e) => setCurrentPage(e.target.value)}
              className="bg-transparent text-sm font-bold text-white outline-none px-2 cursor-pointer"
            >
              {pages.map(p => <option key={p.id} value={p.id} className="bg-zinc-900 text-sm">{p.name}</option>)}
            </select>
            <button 
              onClick={() => {
                const name = prompt("Enter new page name:");
                if (name) addPage(name);
              }}
              className="ml-2 text-xs text-indigo-400 hover:text-indigo-300 font-bold px-2 border-l border-white/10"
            >
              + New
            </button>
          </div>

          <div className="w-[1px] h-6 bg-white/10"></div>

          {/* Device Toggles */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-full border border-white/5">
            <button onClick={() => setDeviceMode('desktop')} className={`p-1.5 rounded-full transition-colors ${deviceMode === 'desktop' ? 'bg-indigo-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setDeviceMode('tablet')} className={`p-1.5 rounded-full transition-colors ${deviceMode === 'tablet' ? 'bg-indigo-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}><Tablet className="w-4 h-4" /></button>
            <button onClick={() => setDeviceMode('mobile')} className={`p-1.5 rounded-full transition-colors ${deviceMode === 'mobile' ? 'bg-indigo-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}><Smartphone className="w-4 h-4" /></button>
          </div>

          <div className="w-[1px] h-6 bg-white/10"></div>

          {/* History */}
          <div className="flex items-center gap-2">
            <button onClick={undo} disabled={pastCount === 0} className={`p-1.5 rounded-full transition-colors ${pastCount > 0 ? 'text-zinc-300 hover:bg-white/10' : 'text-zinc-700 cursor-not-allowed'}`}><Undo2 className="w-4 h-4" /></button>
            <button onClick={redo} disabled={futureCount === 0} className={`p-1.5 rounded-full transition-colors ${futureCount > 0 ? 'text-zinc-300 hover:bg-white/10' : 'text-zinc-700 cursor-not-allowed'}`}><Redo2 className="w-4 h-4" /></button>
          </div>

          <div className="w-[1px] h-6 bg-white/10"></div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-zinc-500 hidden sm:inline-block">{id === 'new' ? 'Untitled Project' : id}</span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] uppercase tracking-wider font-bold">Autosaved</span>
          </div>

          <div className="w-[1px] h-6 bg-white/10"></div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
              <Play className="w-4 h-4" />
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <Globe className="w-4 h-4" /> Publish
            </button>
          </div>
        </motion.div>

        <div className="flex-1 flex relative">
          <Sidebar />
          <div className="flex-1 relative flex justify-center overflow-hidden transition-all duration-300">
             {/* The Canvas wrapper width is driven by deviceMode */}
             <div className="h-full border-x border-white/5 bg-[#0a0a0a] transition-all duration-500 flex flex-col" style={{ width: deviceMode === 'mobile' ? '375px' : deviceMode === 'tablet' ? '768px' : '100%' }}>
                <Canvas />
             </div>
          </div>
          <PropertiesPanel />
        </div>

        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-indigo-500 bg-indigo-500/20 shadow-xl opacity-90 scale-105 cursor-grabbing" style={{ width: '100px', height: '100px' }}>
              <div className="mb-1.5 p-2 rounded-lg bg-zinc-950 shadow-inner border border-white/5">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-[10px] font-medium text-white capitalize">{activeId.replace('sidebar-', '')}</span>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
