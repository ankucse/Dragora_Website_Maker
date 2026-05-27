import { Type, Image, GripVertical, Search, Box, Grid, MousePointer2, Layers, Wand2, Video, LayoutTemplate, FormInput, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { useEditorStore } from '../store/useEditorStore';
import type { ComponentType, ComponentData } from '../store/useEditorStore';

function DraggableItem({ id, label, icon }: { id: string, label: string, icon: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${id}`,
    data: { type: id }
  });
  
  const addComponent = useEditorStore(s => s.addComponent);

  return (
    <div 
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => addComponent(id as ComponentType, {}, 300, 300)}
      className={`flex flex-col items-center justify-center p-3 rounded-xl border ${isDragging ? 'border-indigo-500 bg-indigo-500/20' : 'border-white/5 bg-zinc-900/30'} hover:bg-zinc-800 hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing group shadow-sm z-50`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="mb-1.5 p-2 rounded-lg bg-zinc-950 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
        {icon}
      </div>
      <span className="text-[9px] font-medium text-zinc-400 group-hover:text-white transition-colors text-center leading-tight">{label}</span>
    </div>
  );
}

export function Sidebar() {
  const pages = useEditorStore(s => s.pages);
  const currentPageId = useEditorStore(s => s.currentPageId);
  const components = pages.find(p => p.id === currentPageId)?.components || [];
  const selectComponent = useEditorStore(s => s.selectComponent);
  const selectedId = useEditorStore(s => s.selectedId);

  const categories = [
    {
      name: "Layout (V2)",
      items: [
        { id: 'section', label: 'Section', icon: <Box className="w-4 h-4 text-zinc-400" /> },
        { id: 'container', label: 'Container', icon: <Box className="w-4 h-4 text-zinc-400" /> },
        { id: 'grid', label: 'Grid', icon: <Grid className="w-4 h-4 text-blue-400" /> },
        { id: 'flex', label: 'Flex', icon: <Box className="w-4 h-4 text-indigo-400" /> },
      ]
    },
    {
      name: "Navigation (V2)",
      items: [
        { id: 'navbar', label: 'Navbar', icon: <LayoutTemplate className="w-4 h-4 text-teal-400" /> },
        { id: 'megamenu', label: 'Mega Menu', icon: <LayoutTemplate className="w-4 h-4 text-teal-400" /> },
      ]
    },
    {
      name: "Typography & Media",
      items: [
        { id: 'text', label: 'Text Block', icon: <Type className="w-4 h-4 text-zinc-400" /> },
        { id: 'image', label: 'Image', icon: <Image className="w-4 h-4 text-green-400" /> },
        { id: 'video', label: 'Video', icon: <Video className="w-4 h-4 text-rose-400" /> },
      ]
    },
    {
      name: "Advanced Visuals",
      items: [
        { id: 'glasscard', label: 'Glass Card', icon: <Layers className="w-4 h-4 text-white" /> },
        { id: 'mesh', label: 'Mesh BG', icon: <Wand2 className="w-4 h-4 text-pink-400" /> },
        { id: 'pricing', label: 'Pricing', icon: <LayoutTemplate className="w-4 h-4 text-amber-400" /> },
      ]
    },
    {
      name: "Forms & Ecommerce",
      items: [
        { id: 'form', label: 'Form', icon: <FormInput className="w-4 h-4 text-purple-400" /> },
        { id: 'button', label: 'Button', icon: <MousePointer2 className="w-4 h-4 text-red-400" /> },
        { id: 'cart', label: 'Cart', icon: <ShoppingCart className="w-4 h-4 text-emerald-400" /> },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-[340px] bg-zinc-950/80 backdrop-blur-3xl border-r border-white/10 p-5 flex flex-col gap-6 z-10 pt-28 shadow-[20px_0_40px_rgba(0,0,0,0.5)] relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
      
      <div className="relative">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Layers className="w-3 h-3" /> V2 Component Library
        </h3>
        
        <div className="relative mb-6">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search 100+ components..." 
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder:text-zinc-600 transition-all"
          />
        </div>

        <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 h-[calc(100vh-450px)]">
          {categories.map((cat, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-semibold text-zinc-600 mb-3">{cat.name}</h4>
              <div className="grid grid-cols-3 gap-2">
                {cat.items.map(el => (
                  <DraggableItem key={el.id} id={el.id} label={el.label} icon={el.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 border-t border-white/10 pt-6 relative overflow-y-auto custom-scrollbar">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <GripVertical className="w-3 h-3" /> Navigator (Layers)
        </h3>
        <div className="space-y-1">
          {components.length === 0 && <p className="text-xs text-zinc-600 italic px-2">No layers yet.</p>}
          {components.map((comp: ComponentData) => (
            <div 
              key={comp.id}
              onClick={() => selectComponent(comp.id)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                selectedId === comp.id ? 'bg-indigo-500/10 border border-indigo-500/20 text-white' : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <GripVertical className={`w-3 h-3 ${selectedId === comp.id ? 'text-indigo-400/50' : 'text-zinc-600'}`} />
                <span className="font-medium text-xs capitalize">{comp.type}</span>
              </div>
              {selectedId === comp.id && <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
