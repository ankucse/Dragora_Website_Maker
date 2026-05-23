import { useEditorStore } from '../store/useEditorStore';
import { Layout, Trash2, Box, Eye, Link, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export function PropertiesPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedId = useEditorStore(s => s.selectedId);
  const pages = useEditorStore(s => s.pages);
  const components = useEditorStore(s => {
    const page = s.pages.find(p => p.id === s.currentPageId);
    return page ? page.components : [];
  });
  const updateComponent = useEditorStore(s => s.updateComponent);
  const removeComponent = useEditorStore(s => s.removeComponent);

  const comp = components.find(c => c.id === selectedId);

  if (!comp) {
    return (
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-[300px] bg-zinc-950/80 backdrop-blur-3xl border-l border-white/10 p-5 flex flex-col items-center justify-center z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] text-center relative"
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

  const handlePositionChange = (key: string, value: any) => {
    updateComponent(comp.id, { position: { ...comp.position, [key]: value } });
  };

  const handlePropChange = (key: string, value: string) => {
    updateComponent(comp.id, { props: { ...comp.props, [key]: value } });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handlePropChange('src', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-[300px] bg-zinc-950/80 backdrop-blur-3xl border-l border-white/10 p-5 flex flex-col z-10 pt-28 overflow-y-auto custom-scrollbar text-zinc-300 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 relative">
        <h3 className="font-bold text-white text-sm">Design Properties</h3>
        <span className="text-[9px] px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30 font-mono tracking-wider uppercase">{comp.type}</span>
      </div>

      <div className="space-y-8 relative">
        
        {/* Layout & Transform */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <Box className="w-3 h-3" /> Size & Position
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5 flex items-center bg-zinc-900/50 p-1.5 rounded-lg border border-white/5">
              <label className="text-[9px] text-zinc-500 font-medium w-3">X</label>
              <input type="number" value={Math.round(comp.position.x)} onChange={(e) => handlePositionChange('x', Number(e.target.value))} className="w-full bg-transparent text-xs outline-none text-white font-mono" />
            </div>
            <div className="space-y-1.5 flex items-center bg-zinc-900/50 p-1.5 rounded-lg border border-white/5">
              <label className="text-[9px] text-zinc-500 font-medium w-3">Y</label>
              <input type="number" value={Math.round(comp.position.y)} onChange={(e) => handlePositionChange('y', Number(e.target.value))} className="w-full bg-transparent text-xs outline-none text-white font-mono" />
            </div>
            <div className="space-y-1.5 flex items-center bg-zinc-900/50 p-1.5 rounded-lg border border-white/5">
              <label className="text-[9px] text-zinc-500 font-medium w-3">W</label>
              <input type="text" value={comp.position.width} onChange={(e) => handlePositionChange('width', e.target.value)} className="w-full bg-transparent text-xs outline-none text-white font-mono" />
            </div>
            <div className="space-y-1.5 flex items-center bg-zinc-900/50 p-1.5 rounded-lg border border-white/5">
              <label className="text-[9px] text-zinc-500 font-medium w-3">H</label>
              <input type="text" value={comp.position.height} onChange={(e) => handlePositionChange('height', e.target.value)} className="w-full bg-transparent text-xs outline-none text-white font-mono" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-500 font-medium">Border Radius</label>
            <input type="text" value={comp.styles.borderRadius || '0px'} onChange={(e) => handleStyleChange('borderRadius', e.target.value)} className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" />
          </div>
        </div>

        {/* Content Properties */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <Type className="w-3 h-3" /> Content
          </div>
          
          {comp.props.text !== undefined && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Text (or double-click canvas)</label>
              <textarea 
                value={comp.props.text} 
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors min-h-[60px]" 
              />
            </div>
          )}
          
          {comp.props.src !== undefined && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Media Source (URL or Upload)</label>
              <div className="flex gap-2">
                <input type="text" value={comp.props.src} onChange={(e) => handlePropChange('src', e.target.value)} className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" />
                <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/40 border border-indigo-500/50 transition-colors">
                  <Upload className="w-4 h-4" />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
              </div>
            </div>
          )}
          
          {(comp.type === 'button' || comp.type === 'form') && (
             <div className="space-y-3 pt-4 border-t border-white/10">
               <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                 <Link className="w-3 h-3" /> Actions
               </div>
               <div className="space-y-1.5">
                 <label className="text-[10px] text-zinc-500 font-medium">On Click</label>
                 <select value={comp.props.actionType || 'none'} onChange={(e) => handlePropChange('actionType', e.target.value)} className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors">
                   <option value="none">None</option>
                   <option value="navigate">Navigate to Page</option>
                   <option value="alert">Show Success Alert</option>
                 </select>
               </div>
               
               {comp.props.actionType === 'navigate' && (
                 <div className="space-y-1.5">
                   <label className="text-[10px] text-zinc-500 font-medium">Target Page</label>
                   <select value={comp.props.actionTarget || ''} onChange={(e) => handlePropChange('actionTarget', e.target.value)} className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors">
                     <option value="">Select a page...</option>
                     {pages.map(p => (
                       <option key={p.id} value={p.id}>{p.name}</option>
                     ))}
                   </select>
                 </div>
               )}
             </div>
          )}
        </div>

        {/* Visual Effects */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex-1">
            <Eye className="w-3 h-3" /> Appearance
          </div>
          
          <div className="space-y-3">
             <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Background</label>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded border border-white/10 flex-shrink-0" style={{ backgroundColor: comp.styles.backgroundColor || 'transparent' }}></div>
                <input type="text" value={comp.styles.backgroundColor || 'transparent'} onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Color</label>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded border border-white/10 flex-shrink-0" style={{ backgroundColor: comp.styles.color || 'transparent' }}></div>
                <input type="text" value={comp.styles.color || 'transparent'} onChange={(e) => handleStyleChange('color', e.target.value)} className="w-full bg-zinc-900/80 border border-white/10 rounded-lg p-2 text-xs focus:border-indigo-500 outline-none text-white transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-medium">Opacity</label>
              <input type="range" min="0" max="1" step="0.1" value={comp.styles.opacity || 1} onChange={(e) => handleStyleChange('opacity', e.target.value)} className="w-full accent-indigo-500" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-white/10 pb-12">
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

function Type(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
}
