import { Sidebar } from '../editor/Sidebar';
import { Canvas } from '../editor/Canvas';
import { PropertiesPanel } from '../editor/PropertiesPanel';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Globe, Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useEditorStore } from '../store/useEditorStore';
import type { ComponentType } from '../store/useEditorStore';

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addComponent = useEditorStore(s => s.addComponent);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    
    // If dropped over the canvas
    if (over && over.id === 'canvas') {
      const typeStr = active.id.toString().replace('sidebar-', '');
      // Validate type to appease TS
      const validTypes = ['hero', 'grid', 'flex', 'mesh', 'liquid', 'particles', 'text', 'image', 'button'];
      if (validTypes.includes(typeStr)) {
        addComponent(typeStr as ComponentType);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
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

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-white/10 text-white cursor-pointer"><Monitor className="w-4 h-4" /></div>
            <div className="p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors"><Smartphone className="w-4 h-4" /></div>
          </div>

          <div className="w-[1px] h-6 bg-white/10"></div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-zinc-500 hidden sm:inline-block">{id === 'new' ? 'Untitled Project' : id}</span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] uppercase tracking-wider font-bold">Saved</span>
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
          <Canvas />
          <PropertiesPanel />
        </div>
      </div>
    </DndContext>
  );
}
