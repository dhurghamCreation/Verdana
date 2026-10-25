import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

const quickReplies = [
  'How often should I water my Monstera?',
  'Why are my plant leaves turning yellow?',
  'Best plants for low light spaces?',
  'What is the 30-day health guarantee?',
  'Are any of your plants pet friendly?',
];

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Chatbot({
  onOpenDoctorClinic,
}: {
  onOpenDoctorClinic: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: "Hello! I'm **Vera**, Verdana's Senior Plant Care Expert in Brooklyn.\n\nAsk me anything about light levels, watering schedules, pest troubleshooting, or choosing the ideal specimen for your home.",
      time: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open, messages]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map(m => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      const reply = data.reply || getLocalFallback(text);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: reply, time: now() },
      ]);
    } catch {
      const reply = getLocalFallback(text);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: reply, time: now() },
      ]);
    } finally {
      setTyping(false);
      if (!open) setUnread(u => u + 1);
    }
  };

  const getLocalFallback = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('water') || lower.includes('thirsty')) {
      return "For most indoor tropicals like **Monsteras** and **Ficus**, the golden rule is checking moisture 2 inches down. Water thoroughly only when soil feels dry to the touch, and allow excess water to drain out completely.";
    }
    if (lower.includes('yellow') || lower.includes('droop')) {
      return "Yellowing leaves typically indicate overwatering or root saturation. Check whether the pot is standing in water. If lower leaves are soft and yellow, suspend watering for 5 days. You can also use our **Plant Doctor Tool** above for a step-by-step triage!";
    }
    if (lower.includes('low light') || lower.includes('dark')) {
      return "For lower light environments, our top recommendations are the **ZZ Plant**, **Sansevieria Laurentii (Snake Plant)**, and **Cast Iron Plant**. All three tolerate minimal daylight while maintaining architectural beauty.";
    }
    if (lower.includes('pet') || lower.includes('cat') || lower.includes('dog')) {
      return "For pet-friendly homes, look for our **Calathea Orbifolia** and **Cast Iron Plant** — both are non-toxic to cats and dogs. Monsteras and Ficus should be kept on elevated pedestals out of reach.";
    }
    if (lower.includes('guarantee') || lower.includes('return')) {
      return "All Verdana orders include our **30-Day Health Guarantee**. If any plant arrives stressed or fails to thrive, open our in-app **Botanist Care Clinic** for instant ticket generation, and we will dispatch a replacement free of charge.";
    }
    return "Great question! Consistent lighting and mindful watering are the foundation of healthy houseplants. If you are noticing specific leaf discoloration or pests, try our **Plant Doctor Tool** or ask me more details!";
  };

  const formatText = (text: string) =>
    text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith('**') ? <strong key={j} className="font-bold">{part.slice(2, -2)}</strong> : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close botanical chat' : 'Open plant care assistant'}
        className="fixed bottom-6 right-6 z-[8000] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          background: open ? '#f6ede2' : 'linear-gradient(135deg, #073b24, #0f5c39)',
          boxShadow: '0 10px 30px rgba(7,59,36,0.35)',
        }}
      >
        {open ? (
          <span className="text-xl font-bold text-[#073b24]">✕</span>
        ) : (
          <div className="relative text-[#e28b27]">
            <Icon name="leaf" size={24} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                {unread}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '24px',
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(520px, calc(100vh - 130px))',
            background: '#f6ede2',
            borderRadius: '24px',
            zIndex: 7999,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 24px 70px rgba(4,42,26,0.35)',
            border: '1px solid rgba(7,59,36,0.12)',
            animation: 'chatSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div className="bg-[#073b24] p-4 flex items-center justify-between text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#e28b27] flex items-center justify-center text-[#073b24] shadow-sm">
                <Icon name="leaf" size={18} />
              </div>
              <div>
                <div
                  className="font-bold text-sm"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  Vera · Plant Care Specialist
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Brooklyn Nursery Hub</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenDoctorClinic();
                }}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold text-[#e28b27] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                title="Open full Plant Doctor diagnostic tool"
              >
                <Icon name="stethoscope" size={12} />
                Clinic Tool
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="modal-close-btn close-red-hover w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 font-bold text-xs cursor-pointer border border-white/20"
                aria-label="Close chat window"
                title="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#073b24] text-[#f6ede2] rounded-br-none'
                      : 'bg-white text-[#073b24] rounded-bl-none border border-[rgba(7,59,36,0.06)]'
                  }`}
                >
                  {formatText(msg.text)}
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.role === 'user' ? 'text-white/40' : 'text-gray-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-[rgba(7,59,36,0.06)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#073b24] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#073b24] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#073b24] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Replies chips */}
          {messages.length <= 3 && (
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto flex-shrink-0">
              {quickReplies.slice(0, 3).map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="px-2.5 py-1 bg-white hover:bg-[#073b24] hover:text-white text-[#073b24] text-[11px] font-medium rounded-full border border-[rgba(7,59,36,0.15)] whitespace-nowrap transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 bg-white border-t border-[rgba(7,59,36,0.08)] flex gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about watering, light, pests..."
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs text-[#073b24] outline-none focus:border-[#e28b27]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-8 h-8 rounded-full bg-[#073b24] disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-opacity"
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </>
  );
}
