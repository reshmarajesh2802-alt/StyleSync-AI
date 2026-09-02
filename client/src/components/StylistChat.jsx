import React, { useState } from 'react';
import { Sparkles, Send, Bot, RefreshCw, ShoppingBag, CheckCircle, Flame } from 'lucide-react';
import { stylistAPI } from '../services/api';
import { useStyleCart } from '../context/StyleCartContext';

const QUICK_PROMPTS = [
  'Red Carpet Gala Event',
  'Monochrome Techwear',
  'Parisian Chic Sunset Cocktail',
  'Silent Luxury Executive Suit',
  'Summer Resort Beachwear',
];

const StylistChat = () => {
  const { addToCart } = useStyleCart();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Greetings! I am SyncStylist AI, your bespoke fashion assistant. Tell me your occasion, mood, or aesthetic preference, and I will engineer a complete high-fashion outfit capsule for you.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState(null);

  const handleSendPrompt = async (textToSend) => {
    const query = textToSend || promptInput;
    if (!query.trim() || loading) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setLoading(true);

    try {
      const res = await stylistAPI.recommend({ prompt: query });
      const recommendation = res.data;

      setCurrentOutfit(recommendation);

      const aiMsg = {
        sender: 'ai',
        text: `I have styled the **${recommendation.title}** for you (${recommendation.matchScore}% Aesthetic Match). ${recommendation.stylistNotes}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        outfit: recommendation,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Stylist Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I encountered a temporary disruption while curating your look. Please try sending your request again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCapsuleToBag = (outfit) => {
    if (outfit && outfit.outfitItems) {
      outfit.outfitItems.forEach((item) => {
        addToCart(item, item.sizes ? item.sizes[0] : 'M');
      });
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 p-6 shadow-2xl flex flex-col h-[650px] justify-between">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="font-serif-luxury text-slate-100 font-bold text-lg flex items-center gap-2">
              SyncStylist AI Assistant
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Gemini Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">Conversational Haute Couture Curation</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2 my-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium shadow-lg'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md'
              }`}
            >
              <div className="text-xs font-bold mb-1 opacity-80 flex items-center gap-1.5">
                {msg.sender === 'user' ? 'You' : 'SyncStylist AI'} • {msg.timestamp}
              </div>
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Render Styled Outfit Cards inside AI Response */}
              {msg.outfit && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-amber-500/30">
                    <div>
                      <span className="text-xs text-amber-400 font-semibold block uppercase">Curated Outfit Capsule</span>
                      <span className="text-sm font-bold text-slate-100">{msg.outfit.title}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> {msg.outfit.matchScore}% Match
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {msg.outfit.outfitItems.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2.5 bg-slate-950/40 p-2 rounded-lg border border-slate-800">
                        <img
                          src={item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1548624149-f1e944f86d8a?auto=format&fit=crop&w=300&q=80'}
                          alt={item.title}
                          className="w-12 h-14 object-cover rounded-md"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-amber-400 block font-semibold">{item.category}</span>
                          <span className="text-xs font-bold text-slate-200 truncate block">{item.title}</span>
                          <span className="text-xs text-slate-400">${item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddCapsuleToBag(msg.outfit)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-amber-500/20 transition"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add Entire Capsule to Shopping Bag
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs p-3 bg-slate-900/50 rounded-xl w-fit animate-pulse border border-slate-800">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            Analyzing color harmony & luxury fashion graph...
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {QUICK_PROMPTS.map((promptText, pIdx) => (
          <button
            key={pIdx}
            onClick={() => handleSendPrompt(promptText)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-amber-500/40 hover:text-amber-300 transition"
          >
            + {promptText}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="pt-3 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
          placeholder="Ask AI Stylist e.g. 'I need a cocktail dress for a summer rooftop gala in Paris'..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
        />
        <button
          onClick={() => handleSendPrompt()}
          disabled={loading || !promptInput.trim()}
          className="px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 disabled:opacity-50 transition flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default StylistChat;
