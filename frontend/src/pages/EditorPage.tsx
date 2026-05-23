import { Sidebar } from '../editor/Sidebar';
import { Canvas } from '../editor/Canvas';
import { PropertiesPanel } from '../editor/PropertiesPanel';
import { Play, ArrowLeft, Monitor, Smartphone, Tablet, Undo, Redo, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EditorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background overflow-hidden text-sm">
      <Sidebar />
      
      <div className="flex-1 flex flex-col relative z-0">
        {/* Floating Topbar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-4 py-2 flex items-center gap-6 shadow-glass">
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"><Monitor className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-600"><Tablet className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-600"><Smartphone className="w-4 h-4" /></button>
          </div>
          
          <div className="w-px h-4 bg-border"></div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400"><Undo className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-600"><Redo className="w-4 h-4" /></button>
          </div>
          
          <div className="w-px h-4 bg-border"></div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-glow shadow-green-500/50"></div>
              <span className="text-xs text-gray-400">Saved</span>
            </div>
            <button className="p-1.5 rounded-md hover:bg-white/10 transition-colors"><Play className="w-4 h-4" /></button>
            <button className="px-4 py-1.5 bg-primary text-white font-medium rounded-full hover:bg-blue-600 transition-colors flex items-center gap-1.5 shadow-glow shadow-primary/40 text-xs">
              <Rocket className="w-3.5 h-3.5" /> Publish
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <Canvas />
      </div>

      <PropertiesPanel />
      
      {/* Back button overlay */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="absolute top-4 left-4 z-50 p-2 glass rounded-full hover:bg-white/10 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
}
