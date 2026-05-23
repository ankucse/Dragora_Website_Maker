import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Side - Brand & Visuals */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-border bg-surface/30">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-blob"></div>
          <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow shadow-primary/50">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Lumina Build</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg mt-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold leading-tight mb-6"
          >
            Design at the speed of thought.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 leading-relaxed mb-8"
          >
            The world's most powerful visual development platform. Build cinematic web experiences without writing a single line of code.
          </motion.p>
          
          {/* Floating UI Elements Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="relative h-48 w-full rounded-2xl glass p-4 overflow-hidden"
          >
            <div className="w-full h-8 flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex gap-4">
              <div className="w-32 h-24 rounded-lg bg-white/5 border border-white/10"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 rounded bg-white/10"></div>
                <div className="h-4 w-1/2 rounded bg-white/10"></div>
                <div className="h-4 w-5/6 rounded bg-white/5"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-semibold mb-2">Welcome back</h2>
            <p className="text-gray-400">Enter your details to access your workspace.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">Email address</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-white placeholder:text-gray-600"
                required
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs text-primary hover:text-blue-400 transition-colors">Forgot password?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-white placeholder:text-gray-600"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black font-semibold mt-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Or continue with</span>
            <div className="h-px flex-1 bg-border"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-2.5 rounded-xl bg-surface border border-border hover:bg-surfaceHover transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            </button>
            <button className="flex items-center justify-center py-2.5 rounded-xl bg-surface border border-border hover:bg-surfaceHover transition-colors">
              <img src="https://www.svgrepo.com/show/448224/github.svg" className="w-5 h-5 filter invert opacity-80" alt="GitHub" />
            </button>
          </div>
          
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account? <a href="#" className="text-white font-medium hover:underline">Sign up for free</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
