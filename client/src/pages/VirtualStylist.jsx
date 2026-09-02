import React from 'react';
import { Sparkles, Bot, Sliders, ShieldCheck, Flame } from 'lucide-react';
import StylistChat from '../components/StylistChat';
import { useStyleCart } from '../context/StyleCartContext';

const VirtualStylist = ({ onOpenQuiz }) => {
  const { stylePersona } = useStyleCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" /> Stitch Fix & Gemini AI Fashion Integration
          </div>
          <h1 className="font-serif-luxury text-4xl font-bold text-slate-100">
            SyncStylist AI Virtual Studio
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Interact with your personal AI fashion curator powered by Google Gemini API. Engineer customized capsule wardrobes tailored to your occasion, fit preferences, and aesthetic persona.
          </p>
        </div>

        {/* Current Active Persona Widget */}
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 space-y-2 min-w-[280px]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> Calibrated Persona
            </span>
            <button onClick={onOpenQuiz} className="text-[10px] text-slate-400 hover:text-amber-300 underline">
              Recalibrate
            </button>
          </div>
          <div className="font-serif-luxury text-slate-100 font-bold text-base">
            {stylePersona.primaryAesthetic}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>{stylePersona.fitPreference}</span>
            <span>•</span>
            <span>{stylePersona.colorPalette ? stylePersona.colorPalette[0] : 'Monochrome'}</span>
          </div>
        </div>
      </div>

      {/* Main Stylist Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Chat Studio */}
        <div className="lg:col-span-8">
          <StylistChat />
        </div>

        {/* Informational Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Bot className="w-4 h-4" /> AI Styling Architecture
            </div>
            <h3 className="font-serif-luxury font-bold text-slate-100 text-lg">How SyncStylist AI Works</h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">1</span>
                <span><strong>Natural Language Curation:</strong> Describe any occasion (e.g. "Met Gala", "Parisian Evening") or mood.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">2</span>
                <span><strong>Color Harmony Matrix:</strong> Evaluates color undertones, fabric weights, and structural contrast across garments.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0">3</span>
                <span><strong>Instant Shopping Bag Sync:</strong> Add complete outfit capsules to your bag in 1-click.</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 space-y-3 text-center">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="font-serif-luxury text-slate-100 font-bold text-base">Want More Precision?</h4>
            <p className="text-xs text-slate-400">
              Take the Stitch Fix style questionnaire to fine-tune your color undertones and silhouette preferences.
            </p>
            <button
              onClick={onOpenQuiz}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
            >
              Start Style Quiz
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default VirtualStylist;
