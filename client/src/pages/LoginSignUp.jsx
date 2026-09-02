import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, User, Lock, Mail, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';

  const { login, signup } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('customer');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      if (mode === 'signin') {
        const user = await login(email, password);
        if (user.role === 'admin') navigate('/admin');
        else navigate('/shop');
      } else {
        const user = await signup(name, email, password, role);
        if (user.role === 'admin') navigate('/admin');
        else navigate('/shop');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Authentication request failed');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemoAccount = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setMode('signin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-12">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> StyleSync AI Portal
          </div>
          <h1 className="font-serif-luxury text-3xl font-bold text-slate-100">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-xs text-slate-400">
            {mode === 'signin' ? 'Sign in to access your digital wardrobe & orders' : 'Join StyleSync AI for personalized virtual styling'}
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              mode === 'signin' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              mode === 'signup' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Sophia Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 pl-10 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@stylesync.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 pl-10 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 pl-10 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Account Role</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                    role === 'customer'
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Customer User
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                    role === 'admin'
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Boutique Admin
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-amber-500/20 transition disabled:opacity-50"
          >
            {submitting ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Account' : 'Create New Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Test Buttons */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block text-center">
            Quick 1-Click Test Credentials
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => fillDemoAccount('customer@stylesync.ai', 'Customer@123')}
              className="flex-1 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300 hover:border-amber-500/40 hover:text-amber-300 transition"
            >
              Customer Demo
            </button>
            <button
              onClick={() => fillDemoAccount('admin@stylesync.ai', 'Admin@123')}
              className="flex-1 py-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-amber-400 hover:border-amber-500/40 transition"
            >
              Boutique Admin Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginSignUp;
