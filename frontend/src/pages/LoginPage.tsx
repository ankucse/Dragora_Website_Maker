import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Try admin@lumina.build / admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      {/* Brand Side - Cinematic Animated Mesh */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center border-r border-white/5">
        <div className="absolute top-[-20%] left-[-10%] w-[140%] h-[140%] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[120%] h-[120%] bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent blur-[120px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        
        <div className="relative z-10 p-16 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-300 font-medium mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              Lumina Engine v2.0 Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-[1.1] mb-6">
              Build the impossible.
            </h1>
            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-12">
              The world's most powerful visual development engine. Design, animate, and deploy cinematic web experiences at the speed of thought.
            </p>

            {/* Floating Mockups */}
            <div className="relative h-64 perspective-1000">
              <motion.div 
                animate={{ y: [-10, 10, -10], rotateX: [5, 10, 5], rotateY: [-5, -10, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-80 h-48 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 transform -rotate-12"
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 rounded w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  <div className="h-4 bg-white/5 rounded w-full mt-6"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Auth Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Layout className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Lumina</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-[420px]"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">Welcome back</h2>
            <p className="text-zinc-400 text-sm">Enter your credentials to access the engine.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lumina.build"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</a>
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 transition-colors mt-8 disabled:opacity-70"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-8">
            Don't have an account? <a href="#" className="text-white font-medium hover:underline">Request access</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
