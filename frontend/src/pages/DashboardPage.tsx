import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Layout, Settings, LogOut, MoreVertical, Globe } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();

  const projects = [
    { id: '1', name: 'Acme Corp Landing', url: 'acme.lumina.build', date: '2 days ago', status: 'Published' },
    { id: '2', name: 'Personal Portfolio', url: 'portfolio.lumina.build', date: '5 hours ago', status: 'Draft' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="h-16 border-b border-border bg-surface/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Layout className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg">Lumina</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
          <div className="w-px h-6 bg-border"></div>
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:px-16 max-w-7xl mx-auto w-full pt-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-2">Projects</motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-400">Manage and create your websites.</motion.p>
          </div>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/editor/new')}
            className="px-5 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-glow shadow-white/20"
          >
            <Plus className="w-5 h-5" />
            New Project
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="group relative h-64 rounded-2xl glass-panel p-1 flex flex-col hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
              onClick={() => navigate(`/editor/${p.id}`)}
            >
              {/* Thumbnail Placeholder */}
              <div className="h-32 w-full rounded-xl bg-surface border border-white/5 relative overflow-hidden group-hover:border-primary/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Globe className="w-3 h-3" />
                      {p.url}
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-white transition-colors p-1" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center text-xs mt-4">
                  <span className="text-gray-500">Edited {p.date}</span>
                  <span className={`px-2.5 py-1 rounded-full border ${p.status === 'Published' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
