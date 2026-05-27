import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, Zap, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"></div>
            <span className="font-bold text-lg tracking-tight">Lumina</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Templates</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Customers</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Log in</button>
            <button onClick={() => navigate('/login')} className="text-sm font-medium bg-white text-zinc-950 px-4 py-2 rounded-full hover:scale-105 transition-transform">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
          <div className="absolute top-[30%] left-[30%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ opacity }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Introducing Lumina AI Generation</span>
              <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
            </div>
            
            <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-[0.9]">
              The web, <br />reimagined.
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Design, build, and scale world-class visual experiences. The ultimate no-code engine for modern SaaS and enterprise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/login')} className="px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Start Building Free
              </button>
              <button className="px-8 py-4 rounded-full bg-white/5 text-white font-medium text-lg border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
                Book a Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editor Mockup Showcase */}
      <section className="relative z-20 max-w-[1400px] mx-auto px-6 -mt-12 pb-32">
        <motion.div 
          style={{ y }}
          className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-3xl shadow-[0_0_100px_rgba(99,102,241,0.2)] overflow-hidden relative"
        >
          {/* Mockup Header */}
          <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-zinc-900/80">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 h-6 rounded bg-zinc-800"></div>
              <div className="w-24 h-6 rounded bg-zinc-800"></div>
            </div>
          </div>
          {/* Mockup Body */}
          <div className="h-[600px] flex">
            <div className="w-64 border-r border-white/5 p-4 space-y-4">
              <div className="h-8 rounded bg-zinc-800/50 w-full"></div>
              <div className="h-24 rounded bg-zinc-800/50 w-full"></div>
              <div className="h-24 rounded bg-zinc-800/50 w-full"></div>
            </div>
            <div className="flex-1 bg-[#0a0a0a] p-12 flex items-center justify-center relative overflow-hidden">
               {/* Inside the mockup */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
               <div className="relative w-full max-w-lg h-64 border border-indigo-500/50 rounded-xl bg-zinc-900/80 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.1)]">
                 <div className="absolute -top-3 -left-3 w-6 h-6 border-2 border-indigo-500 rounded bg-zinc-950"></div>
                 <div className="absolute -bottom-3 -right-3 w-6 h-6 border-2 border-indigo-500 rounded bg-zinc-950"></div>
                 <h3 className="text-3xl font-bold">Cinematic Layouts</h3>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-zinc-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Uncompromised Power.</h2>
            <p className="text-xl text-zinc-400 max-w-2xl">Every tool you need to build venture-scale applications, perfectly integrated into one seamless engine.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Layers className="text-indigo-400" />, title: "Advanced Grid Systems", desc: "True CSS Grid and Flexbox editing. Build complex layouts visually without writing a single line of code." },
              { icon: <Zap className="text-yellow-400" />, title: "Global Edge Network", desc: "Deploy in milliseconds to 300+ edge locations worldwide. Perfect Lighthouse scores out of the box." },
              { icon: <Code className="text-green-400" />, title: "React Architecture", desc: "Export clean, production-ready React/Vite code. No lock-in, just beautiful standard code." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-indigo-500/10 mix-blend-screen"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Ready to build?</h2>
          <button onClick={() => navigate('/login')} className="px-10 py-5 rounded-full bg-white text-zinc-950 font-bold text-xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
            Get Started <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}
