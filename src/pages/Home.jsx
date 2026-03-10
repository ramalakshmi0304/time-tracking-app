import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Clock, Shield, Sparkles, Users, Zap, Activity, TrendingUp } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 text-slate-900 font-sans overflow-x-hidden selection:bg-gradient-to-r from-indigo-500 to-purple-500 selection:text-white">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400/30 rounded-full animate-float opacity-60"
            style={{
              left: `${10 + i * 8}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${4 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="backdrop-blur-xl bg-white/80 border-b border-white/50 sticky top-0 z-50 px-8 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/25 backdrop-blur-sm group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-indigo-500/40 transition-all duration-300">
            <Clock className="w-7 h-7 drop-shadow-lg" />
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
            TrackerApp
          </span>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/60 hover:-translate-y-0.5 transition-all duration-300 border border-white/20 backdrop-blur-sm text-sm"
        >
          Get Started Free
        </button>
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-24 pb-32 max-w-7xl mx-auto text-center relative">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-indigo-200/50 text-indigo-700 text-sm font-bold mb-12 animate-pulse-hover group">
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span>🚀 NEW: Real-Time Analytics Dashboard</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping ml-2" />
        </div>

        {/* Hero Title */}
        <h1 className="font-black tracking-tight mb-8 leading-[0.9] animate-hero-slide">
          <span className="text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent drop-shadow-2xl">
            Master your 
          </span>
          <br />
          <span className="text-7xl md:text-9xl lg:text-[10rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
            TIME
          </span>
          <br />
          <span className="text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">
            Elevate your life.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed backdrop-blur-sm bg-white/60 px-8 py-6 rounded-3xl border border-slate-200/50 shadow-lg">
          The ultimate minimalist time tracker for high-performers. 
          Log activities, capture memories, analyze productivity patterns—all in real-time.
        </p>

        {/* Hero CTA */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 animate-fade-in-up">
          <button 
            onClick={() => navigate('/login')}
            className="group relative px-12 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-lg rounded-3xl shadow-2xl shadow-indigo-500/40 hover:shadow-3xl hover:shadow-indigo-500/60 hover:-translate-y-2 transition-all duration-500 border border-white/20 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-3">
              Start Tracking Free 
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>
       
        </div>

        {/* Stats Bar */}
     
      </header>

      {/* Features Grid */}
      <section className="px-6 pb-32 relative -mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Features Header */}
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Everything you need,
            </h2>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
              nothing you don't.
            </h2>
          </div>

          {/* Glass Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="w-8 h-8" />}
              title="Lightning Logging"
              description="Capture every moment instantly. Voice input, quick tags, and smart suggestions make logging effortless."
              gradient="from-indigo-500 to-purple-600"
              badge="NEW"
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8" />}
              title="Insightful Analytics"
              description="Beautiful pie charts, time trends, and productivity scores. See exactly where your time flows."
              gradient="from-emerald-500 to-teal-600"
              badge="LIVE"
            />
            <FeatureCard 
              icon={<Activity className="w-8 h-8" />}
              title="Memory Capture"
              description="Attach photos and notes to activities. Relive your best moments with rich visual timelines."
              gradient="from-pink-500 to-rose-600"
              badge="BETA"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8" />}
              title="Smart Insights"
              description="AI-powered patterns reveal your peak hours, focus streaks, and productivity superpowers."
              gradient="from-orange-500 to-red-600"
              badge="AI"
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8" />}
              title="Fortress Security"
              description="End-to-end encryption with Supabase RLS. Your data stays yours, forever."
              gradient="from-slate-500 to-slate-700"
              badge="SECURE"
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8" />}
              title="Zero Friction"
              description="Works offline, syncs instantly. iOS, Android, Desktop—your timeline follows you everywhere."
              gradient="from-amber-500 to-yellow-600"
              badge="OFFLINE"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-lg">
            Ready to unlock your potential?
          </h3>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            Join 10,000+ high-performers mastering their time.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="px-12 py-6 bg-white text-indigo-600 font-black text-xl rounded-3xl shadow-2xl shadow-white/30 hover:shadow-3xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100/50 bg-white/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900">TrackerApp</span>
          </div>
          <p className="text-lg mb-6">© 2026 TrackerApp. Built for builders by builders.</p>
          <p className="text-sm opacity-75">Lightning-fast. Privacy-first. Performance-obsessed.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient, badge }) {
  return (
    <div className="group relative overflow-hidden rounded-4xl p-10 bg-white/60 backdrop-blur-xl border border-white/50 hover:border-indigo-200/50 shadow-2xl hover:shadow-3xl hover:shadow-indigo-200/30 transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02]">
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-2xl text-xs font-bold shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
          {badge}
        </div>
      )}
      
      {/* Icon */}
      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-2xl shadow-[${gradient.split(' ').slice(1).join(' ').replace(/from-|to-/g, '')}]/25 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mx-auto`}>
        {React.cloneElement(icon, { className: "w-10 h-10 text-white drop-shadow-lg" })}
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-indigo-900 group-hover:to-purple-900 transition-all duration-500 text-center">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed text-center opacity-90 group-hover:opacity-100 transition-opacity duration-500">
        {description}
      </p>
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-4xl blur-xl -z-10" />
    </div>
  );
}
