import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, Activity, Globe, Zap, 
  Users, Search,
  ShieldAlert, LayoutDashboard
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (!storedEmail) {
      navigate('/login');
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const isAdmin = email === 'admin@lumina.build';

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"></div>
            <span className="font-bold tracking-tight">Lumina</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="text-white">Overview</a>
            <a href="#" className="hover:text-white transition-colors">Deployments</a>
            <a href="#" className="hover:text-white transition-colors">Analytics</a>
            <a href="#" className="hover:text-white transition-colors">Settings</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-zinc-900/50 border border-white/10 rounded-lg px-3 py-1.5 w-64">
            <Search className="w-4 h-4 text-zinc-500 mr-2" />
            <input type="text" placeholder="Search projects..." className="bg-transparent text-sm w-full outline-none placeholder:text-zinc-600" />
            <div className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-400 font-mono">⌘K</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20 cursor-pointer hover:scale-105 transition-transform">
            {email.charAt(0).toUpperCase()}
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
              {isAdmin ? 'System Overview' : 'Your Workspace'}
              {isAdmin && <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 uppercase tracking-widest font-bold">Admin</span>}
            </h1>
            <p className="text-zinc-400">Manage your cinematic visual projects and deployments.</p>
          </div>
          <button 
            onClick={() => navigate('/editor/new')}
            className="bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* Analytics Grid - Vercel Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Bandwidth', value: '1.24 TB', icon: <Activity />, trend: '+14%', color: 'text-indigo-400' },
            { label: 'Global Edge Hits', value: '4.8M', icon: <Globe />, trend: '+22%', color: 'text-blue-400' },
            { label: 'Active Users', value: '124,592', icon: <Users />, trend: '+5%', color: 'text-green-400' },
            { label: 'Avg Build Time', value: '1.2s', icon: <Zap />, trend: '-18%', color: 'text-amber-400' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl hover:bg-zinc-900/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-zinc-400">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-6">Recent Projects</h2>
            {[1, 2].map((project) => (
              <motion.div 
                key={project}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (project * 0.1) }}
                className="group relative bg-zinc-900/30 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all cursor-pointer overflow-hidden"
                onClick={() => navigate(`/editor/proj-${project}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <LayoutDashboard className="w-6 h-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                        project-acme-frontend
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] uppercase font-bold tracking-wider">Production</span>
                      </h3>
                      <p className="text-sm text-zinc-500 mt-1">acme-frontend.lumina.build</p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-sm text-zinc-400 flex items-center justify-end gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Deployed 2m ago
                    </p>
                    <p className="text-xs text-zinc-600 mt-1 font-mono">Commit: 7a8b9c2</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Activity Feed (Linear Style) */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Activity Feed</h2>
            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
              <div className="space-y-6">
                {[
                  { user: 'S', action: 'deployed to Production', time: '2m ago', color: 'bg-indigo-500' },
                  { user: 'A', action: 'pushed to main', time: '5m ago', color: 'bg-green-500' },
                  { user: 'K', action: 'updated CSS Grid layout', time: '1h ago', color: 'bg-blue-500' },
                  { user: 'S', action: 'invited Alex to Workspace', time: '3h ago', color: 'bg-purple-500' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 items-start relative">
                    {i !== 3 && <div className="absolute top-8 left-4 bottom-[-16px] w-[1px] bg-white/10"></div>}
                    <div className={`w-8 h-8 rounded-full ${act.color} flex items-center justify-center text-xs font-bold shrink-0 z-10`}>
                      {act.user}
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium text-white">{act.user === 'S' ? 'System' : 'Admin'}</span> <span className="text-zinc-400">{act.action}</span></p>
                      <span className="text-xs text-zinc-600">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {isAdmin && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> System Alerts
                </h3>
                <p className="text-sm text-zinc-400">All edge nodes operational. No anomalies detected.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
