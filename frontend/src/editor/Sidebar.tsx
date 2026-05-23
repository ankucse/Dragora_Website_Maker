import { Type, Image, Square, AlignLeft, GripVertical, Search, Box, Grid, Play, MousePointer2, Sparkles, Layers, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Sidebar() {
  const categories = [
    {
      name: "Layout & Structure",
      items: [
        { id: 'grid', label: 'CSS Grid Area', icon: <Grid className="w-4 h-4 text-blue-400" /> },
        { id: 'flex', label: 'Flex Container', icon: <Box className="w-4 h-4 text-indigo-400" /> },
        { id: 'hero', label: 'Hero Section', icon: <AlignLeft className="w-4 h-4 text-purple-400" /> },
      ]
    },
    {
      name: "Next-Gen Effects",
      items: [
        { id: 'mesh', label: 'Mesh Gradient', icon: <Wand2 className="w-4 h-4 text-pink-400" /> },
        { id: 'liquid', label: 'Liquid Wave', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
        { id: 'particles', label: 'Particle System', icon: <Layers className="w-4 h-4 text-yellow-400" /> },
      ]
    },
    {
      name: "Interactive Elements",
      items: [
        { id: 'text', label: 'Typography', icon: <Type className="w-4 h-4 text-zinc-400" /> },
        { id: 'image', label: 'Media Block', icon: <Image className="w-4 h-4 text-green-400" /> },
        { id: 'button', label: 'Hover Button', icon: <MousePointer2 className="w-4 h-4 text-red-400" /> },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-80 bg-zinc-950/80 backdrop-blur-3xl border-r border-white/10 p-5 flex flex-col gap-6 z-10 pt-28 shadow-[20px_0_40px_rgba(0,0,0,0.5)] relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
      
      <div className="relative">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Layers className="w-3 h-3" /> Component Library
        </h3>
        
        <div className="relative mb-6">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search effects, layouts..." 
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder:text-zinc-600 transition-all"
          />
        </div>

        <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 h-[calc(100vh-400px)]">
          {categories.map((cat, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-semibold text-zinc-600 mb-3">{cat.name}</h4>
              <div className="grid grid-cols-2 gap-2">
                {cat.items.map(el => (
                  <div 
                    key={el.id}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-800 hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing group shadow-sm"
                  >
                    <div className="mb-2 p-2.5 rounded-lg bg-zinc-950 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                      {el.icon}
                    </div>
                    <span className="text-[10px] font-medium text-zinc-400 group-hover:text-white transition-colors">{el.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 border-t border-white/10 pt-6 relative">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <GripVertical className="w-3 h-3" /> Layer Tree
        </h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-white text-xs cursor-pointer">
            <div className="flex items-center gap-2">
              <GripVertical className="w-3 h-3 text-indigo-400/50" />
              <Grid className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-medium">Hero Mesh Grid</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 text-zinc-400 hover:text-white text-xs cursor-pointer ml-4 transition-colors">
            <GripVertical className="w-3 h-3 text-zinc-600" />
            <Type className="w-3.5 h-3.5" />
            Display Heading
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 text-zinc-400 hover:text-white text-xs cursor-pointer ml-4 transition-colors">
            <GripVertical className="w-3 h-3 text-zinc-600" />
            <MousePointer2 className="w-3.5 h-3.5" />
            Magnetic CTA Button
          </div>
        </div>
      </div>
    </motion.div>
  );
}
