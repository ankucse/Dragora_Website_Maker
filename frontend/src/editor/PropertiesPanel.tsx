import { useEditorStore } from '../store/useEditorStore';
import { Layout, Wand2, MonitorPlay, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function PropertiesPanel() {
  const selectedId = useEditorStore(s => s.selectedId) || 'Hero Mesh Grid';

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-80 bg-zinc-950/80 backdrop-blur-3xl border-l border-white/10 p-5 flex flex-col z-10 pt-28 overflow-y-auto custom-scrollbar text-zinc-300 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 relative">
        <h3 className="font-bold text-white text-sm">Design Properties</h3>
        <span className="text-[9px] px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30 font-mono tracking-wider uppercase">{selectedId}</span>
      </div>

      <div className="space-y-8 relative">
        
        {/* Advanced Layout (Flex/Grid) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <Layout className="w-3 h-3" /> Layout Engine
          </div>
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-1 flex mb-3">
            <button className="flex-1 py-1.5 px-3 text-[10px] font-medium rounded-lg bg-zinc-800 text-white shadow-sm border border-white/10">Flexbox</button>
            <button className="flex-1 py-1.5 px-3 text-[10px] font-medium rounded-lg text-zinc-500 hover:text-white transition-colors">CSS Grid</button>
            <button className="flex-1 py-1.5 px-3 text-[10px] font-medium rounded-lg text-zinc-500 hover:text-white transition-colors">Block</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Direction</label>
              <select className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors cursor-pointer appearance-none">
                <option>Row (Horizontal)</option>
                <option>Column (Vertical)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Wrap</label>
              <select className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors cursor-pointer appearance-none">
                <option>No Wrap</option>
                <option>Wrap</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1.5">
             <label className="text-[10px] text-zinc-500 font-medium">Justify Content</label>
             <div className="flex gap-1">
                {['start', 'center', 'end', 'between', 'around'].map(j => (
                  <div key={j} className="h-6 flex-1 bg-zinc-900 border border-white/10 rounded flex items-center justify-center hover:bg-zinc-800 cursor-pointer transition-colors group">
                    <div className={`w-3 h-0.5 bg-zinc-500 group-hover:bg-white rounded-full`}></div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Visual Effects (Mesh / Liquid) */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex-1">
            <Wand2 className="w-3 h-3" /> Next-Gen Effects
            <span className="ml-auto text-[8px] bg-indigo-500 text-white px-1.5 py-0.5 rounded uppercase font-bold">Pro</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-white/10 cursor-pointer hover:border-indigo-500/50 transition-colors">
              <span className="text-xs font-medium">Mesh Gradient</span>
              <div className="w-8 h-4 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-white/10 cursor-pointer hover:border-indigo-500/50 transition-colors">
              <span className="text-xs font-medium">Glassmorphism Blur</span>
              <span className="text-xs text-zinc-500">12px</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-white/10 cursor-pointer hover:border-indigo-500/50 transition-colors">
              <span className="text-xs font-medium">Liquid Reveal</span>
              <div className="w-6 h-3 rounded-full bg-zinc-700 relative"><div className="absolute right-0.5 top-0.5 w-2 h-2 rounded-full bg-zinc-400"></div></div>
            </div>
          </div>
        </div>

        {/* Motion Timeline */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <MonitorPlay className="w-3 h-3" /> Scroll Animations
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium flex justify-between">
                <span>Trigger Offset</span>
                <span className="text-indigo-400">20%</span>
              </label>
              <input type="range" className="w-full accent-indigo-500 h-1 bg-zinc-800 rounded-full appearance-none" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-medium">Initial State</label>
                <div className="p-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-center">y: 50, opacity: 0</div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-medium">Animate State</label>
                <div className="p-2 bg-zinc-900 border border-indigo-500/30 rounded-lg text-xs text-center text-indigo-300">y: 0, opacity: 1</div>
              </div>
            </div>
            
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
              <Play className="w-3 h-3" /> Preview Animation
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
