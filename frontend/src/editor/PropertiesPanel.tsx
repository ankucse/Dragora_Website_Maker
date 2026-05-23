import { useEditorStore } from '../store/useEditorStore';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Type, Layout, Maximize, Palette } from 'lucide-react';

export function PropertiesPanel() {
  const selectedId = useEditorStore(s => s.selectedId) || 'hero-1'; // Mock selected for demo

  return (
    <div className="w-80 bg-surface/80 backdrop-blur-3xl border-l border-border p-5 flex flex-col z-10 pt-20 overflow-y-auto custom-scrollbar text-gray-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <h3 className="font-semibold text-white">Properties</h3>
        <span className="text-[10px] px-2 py-1 bg-primary/20 text-primary rounded border border-primary/30 font-mono">{selectedId}</span>
      </div>

      <div className="space-y-6">
        {/* Layout Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            <Layout className="w-3.5 h-3.5" /> Layout
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <label className="text-[11px] text-gray-500">Display</label>
              <select className="w-full bg-background border border-white/10 rounded-lg p-2 text-xs focus:border-primary outline-none text-white">
                <option>Flex</option>
                <option>Block</option>
                <option>Grid</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-gray-500">Direction</label>
              <select className="w-full bg-background border border-white/10 rounded-lg p-2 text-xs focus:border-primary outline-none text-white">
                <option>Column</option>
                <option>Row</option>
              </select>
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            <Type className="w-3.5 h-3.5" /> Typography
          </div>
          <div className="space-y-2">
            <select className="w-full bg-background border border-white/10 rounded-lg p-2 text-xs focus:border-primary outline-none text-white font-sans">
              <option>Inter</option>
              <option>Roboto</option>
              <option>SF Pro Display</option>
            </select>
            
            <div className="flex gap-2">
              <div className="flex bg-background border border-white/10 rounded-lg overflow-hidden flex-1">
                <button className="flex-1 p-1.5 hover:bg-white/10 text-white flex justify-center"><AlignLeft className="w-4 h-4" /></button>
                <button className="flex-1 p-1.5 bg-white/10 text-primary flex justify-center"><AlignCenter className="w-4 h-4" /></button>
                <button className="flex-1 p-1.5 hover:bg-white/10 text-white flex justify-center"><AlignRight className="w-4 h-4" /></button>
                <button className="flex-1 p-1.5 hover:bg-white/10 text-white flex justify-center"><AlignJustify className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing Section */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            <Maximize className="w-3.5 h-3.5" /> Spacing (Padding)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center bg-background border border-white/10 rounded-lg px-2">
              <span className="text-[10px] text-gray-500 w-4">T</span>
              <input type="text" defaultValue="48px" className="w-full bg-transparent p-1.5 text-xs outline-none text-right" />
            </div>
            <div className="flex items-center bg-background border border-white/10 rounded-lg px-2">
              <span className="text-[10px] text-gray-500 w-4">B</span>
              <input type="text" defaultValue="48px" className="w-full bg-transparent p-1.5 text-xs outline-none text-right" />
            </div>
            <div className="flex items-center bg-background border border-white/10 rounded-lg px-2">
              <span className="text-[10px] text-gray-500 w-4">L</span>
              <input type="text" defaultValue="24px" className="w-full bg-transparent p-1.5 text-xs outline-none text-right" />
            </div>
            <div className="flex items-center bg-background border border-white/10 rounded-lg px-2">
              <span className="text-[10px] text-gray-500 w-4">R</span>
              <input type="text" defaultValue="24px" className="w-full bg-transparent p-1.5 text-xs outline-none text-right" />
            </div>
          </div>
        </div>
        
        {/* Colors Section */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" /> Appearance
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-background border border-white/10">
            <span className="text-xs">Background</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono">#FFFFFF</span>
              <div className="w-5 h-5 rounded-md bg-white border border-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
