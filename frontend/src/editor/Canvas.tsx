import { useEditorStore } from '../store/useEditorStore';
import { motion } from 'framer-motion';

export function Canvas() {
  const components = useEditorStore(s => s.components);
  
  return (
    <div className="flex-1 canvas-grid overflow-auto flex justify-center items-start p-12 pt-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl min-h-[800px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative border border-white/20 overflow-hidden"
      >
        {/* Browser Topbar Mockup */}
        <div className="h-10 bg-[#f1f1f1] w-full border-b flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <div className="mx-auto w-1/2 h-5 bg-white rounded-md border text-[10px] flex items-center justify-center text-gray-400 font-mono">
            acme.lumina.build
          </div>
        </div>

        {/* Real Canvas Content */}
        <div className="p-8 text-black relative">
          {/* Example Pre-filled component for visual flair */}
          <div className="relative group p-12 text-center rounded-2xl hover:bg-gray-50 transition-colors border-2 border-transparent hover:border-blue-500 cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
            <div className="absolute -top-3 left-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">Hero Section</div>
            
            <h1 className="text-6xl font-extrabold tracking-tight mb-6">Build the future.</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">Deploy stunning websites in seconds with our cinematic drag-and-drop builder.</p>
            <button className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-xl">Get Started</button>
          </div>

          {components.length === 0 && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-64">
               <div className="px-6 py-4 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100 flex items-center gap-2 shadow-sm animate-pulse">
                 <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                 Drop elements here
               </div>
             </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
