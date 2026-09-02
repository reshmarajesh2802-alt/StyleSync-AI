import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { useStyleCart } from '../context/StyleCartContext';
import confetti from 'canvas-confetti';

const AESTHETICS = [
  { id: 'Minimalist Elegance', desc: 'Clean architectural lines & monochrome neutrals' },
  { id: 'Silent Luxury', desc: 'Unbranded cashmere, silk, & fine tailoring' },
  { id: 'Parisian Chic', desc: 'Effortless romantic elegance with classic outerwear' },
  { id: 'Cyberpunk Luxury', desc: 'Metallic accents, structural leather & techwear' },
  { id: 'Urban Streetwear', desc: 'Statement graphics, oversized denim & sneakers' },
];

const OCCASIONS = ['Red Carpet Gala', 'Executive Meeting', 'Weekend Sunset Cocktail', 'Resort Getaway'];
const FITS = ['Tailored / Structured Slim', 'Relaxed Oversized Silhouette', 'Fluid Asymmetric Fit'];
const COLORS = ['Monochrome Black & Ivory', 'Warm Earth Tones & Cognac', 'Jewel Tones & Emerald', 'Soft Pastel Hues'];

const StyleQuizModal = ({ isOpen, onClose }) => {
  const { setStylePersona } = useStyleCart();
  const [step, setStep] = useState(1);
  const [selectedAesthetic, setSelectedAesthetic] = useState('Minimalist Elegance');
  const [selectedOccasion, setSelectedOccasion] = useState('Red Carpet Gala');
  const [selectedFit, setSelectedFit] = useState('Tailored / Structured Slim');
  const [selectedColor, setSelectedColor] = useState('Monochrome Black & Ivory');

  if (!isOpen) return null;

  const handleFinishQuiz = () => {
    setStylePersona({
      primaryAesthetic: selectedAesthetic,
      preferredOccasion: selectedOccasion,
      fitPreference: selectedFit,
      colorPalette: [selectedColor],
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-100 transition">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Stitch Fix Inspired Style Quiz (Step {step}/4)
          </div>
          <h2 className="font-serif-luxury text-slate-100 text-2xl font-bold">
            Calibrate Your AI Style Persona
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step 1: Aesthetic */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300 font-semibold mb-3">Which style aesthetic resonates most with your wardrobe?</p>
            {AESTHETICS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedAesthetic(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedAesthetic === item.id
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold text-sm">{item.id}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
                {selectedAesthetic === item.id && <Check className="w-5 h-5 text-amber-400" />}
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Occasion */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300 font-semibold mb-3">What primary occasion are you building your looks for?</p>
            {OCCASIONS.map((occ) => (
              <button
                key={occ}
                onClick={() => setSelectedOccasion(occ)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedOccasion === occ
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-sm">{occ}</div>
                {selectedOccasion === occ && <Check className="w-5 h-5 text-amber-400" />}
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Fit */}
        {step === 3 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300 font-semibold mb-3">Select your preferred garment silhouette fit:</p>
            {FITS.map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(fit)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedFit === fit
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-sm">{fit}</div>
                {selectedFit === fit && <Check className="w-5 h-5 text-amber-400" />}
              </button>
            ))}
          </div>
        )}

        {/* Step 4: Color */}
        {step === 4 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300 font-semibold mb-3">Choose your signature color palette:</p>
            {COLORS.map((col) => (
              <button
                key={col}
                onClick={() => setSelectedColor(col)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedColor === col
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-sm">{col}</div>
                {selectedColor === col && <Check className="w-5 h-5 text-amber-400" />}
              </button>
            ))}
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-slate-100 transition"
            >
              Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleFinishQuiz}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition"
            >
              Save Style Profile & Calibrate AI
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default StyleQuizModal;
