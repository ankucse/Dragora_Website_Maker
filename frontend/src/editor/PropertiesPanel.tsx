import { useEditorStore } from '../store/useEditorStore';
import { Layout, Wand2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function PropertiesPanel() {
  const selectedId = useEditorStore(s => s.selectedId);
  const components = useEditorStore(s => s.components);
  const updateComponent = useEditorStore(s => s.updateComponent);
  const removeComponent = useEditorStore(s => s.removeComponent);

  const comp = components.find(c => c.id === selectedId);

  if (!comp) {
    return (
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-80 bg-zinc-950/80 backdrop-blur-3xl border-l border-white/10 p-5 flex flex-col items-center justify-center z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] text-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
        <Layout className="w-8 h-8 text-zinc-700 mb-4" />
        <p className="text-sm text-zinc-500 font-medium">No component selected</p>
        <p className="text-xs text-zinc-600 mt-2">Click an element on the canvas to edit its properties.</p>
      </motion.div>
    );
  }

  const handleStyleChange = (key: string, value: string) => {
    updateComponent(comp.id, { styles: { ...comp.styles, [key]: value } });
  };

  const handlePropChange = (key: string, value: string) => {
    updateComponent(comp.id, { props: { ...comp.props, [key]: value } });
  };

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
        <span className="text-[9px] px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30 font-mono tracking-wider uppercase">{comp.type}</span>
      </div>

      <div className="space-y-8 relative">
        
        {/* Content Properties */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <Type className="w-3 h-3" /> Content
          </div>
          
          {comp.props.text !== undefined && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Text</label>
              <input 
                type="text" 
                value={comp.props.text} 
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" 
              />
            </div>
          )}
          
          {comp.props.title !== undefined && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Title</label>
              <input 
                type="text" 
                value={comp.props.title} 
                onChange={(e) => handlePropChange('title', e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" 
              />
            </div>
          )}
          
          {comp.props.src !== undefined && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Image URL</label>
              <input 
                type="text" 
                value={comp.props.src} 
                onChange={(e) => handlePropChange('src', e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" 
              />
            </div>
          )}
        </div>

        {/* Advanced Layout (Flex/Grid) */}
        <div className="space-y-4 pt-6 border-t border-white/10">
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
              <select 
                value={comp.styles.flexDirection || 'row'} 
                onChange={(e) => handleStyleChange('flexDirection', e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors cursor-pointer appearance-none"
              >
                <option value="row">Row (Horizontal)</option>
                <option value="column">Column (Vertical)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Padding</label>
              <input 
                type="text" 
                value={comp.styles.padding || '0px'} 
                onChange={(e) => handleStyleChange('padding', e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors cursor-pointer" 
              />
            </div>
          </div>
        </div>

        {/* Visual Effects (Mesh / Liquid) */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex-1">
            <Wand2 className="w-3 h-3" /> Appearance
          </div>
          
          <div className="space-y-3">
             <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Background Color</label>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded border border-white/10 flex-shrink-0" style={{ backgroundColor: comp.styles.backgroundColor || 'transparent' }}></div>
                <input 
                  type="text" 
                  value={comp.styles.backgroundColor || 'transparent'} 
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" 
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Text Color</label>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded border border-white/10 flex-shrink-0" style={{ backgroundColor: comp.styles.color || 'transparent' }}></div>
                <input 
                  type="text" 
                  value={comp.styles.color || 'transparent'} 
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-white/10">
           <button 
             onClick={() => removeComponent(comp.id)}
             className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
           >
             <Trash2 className="w-4 h-4" /> Delete Component
           </button>
        </div>

      </div>
    </motion.div>
  );
}

// Quick inline icon component to avoid importing another missing icon in PropertiesPanel
function Type(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
}
