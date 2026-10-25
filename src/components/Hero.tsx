import { useEffect, useRef } from 'react';
import Icon from './Icon';

interface HeroProps {
  onExplore: () => void;
  onDoctorOpen: () => void;
  onOpenPdfGuide?: () => void;
}

export default function Hero({ onExplore, onDoctorOpen, onOpenPdfGuide }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      hero.querySelectorAll<HTMLElement>('.floater').forEach(el => {
        const depth = parseFloat(el.dataset.depth || '1');
        el.style.transform = `translate(${x * depth * 22}px, ${y * depth * 16}px)`;
      });
    };

    hero.addEventListener('mousemove', onMove, { passive: true });
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        background: 'linear-gradient(145deg, #042a1a 0%, #073b24 55%, #0a4d30 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Ambient glow circles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          className="floater"
          data-depth="0.5"
          style={{
            position: 'absolute',
            top: '8%',
            right: '6%',
            width: '540px',
            height: '540px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15,92,57,0.55) 0%, transparent 70%)',
            transition: 'transform 0.6s ease',
          }}
        />
        <div
          className="floater"
          data-depth="1.2"
          style={{
            position: 'absolute',
            bottom: '-12%',
            left: '-6%',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(226,139,39,0.1) 0%, transparent 70%)',
            transition: 'transform 0.6s ease',
          }}
        />
      </div>

      {/* Subtle architectural botanical grid lines */}
      <svg
        style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', opacity: 0.05, pointerEvents: 'none' }}
        viewBox="0 0 500 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="400" cy="200" r="200" stroke="#f6ede2" strokeWidth="1" />
        <circle cx="400" cy="200" r="140" stroke="#f6ede2" strokeWidth="0.5" />
        <circle cx="400" cy="200" r="90" stroke="#f6ede2" strokeWidth="0.5" />
        <line x1="200" y1="0" x2="400" y2="800" stroke="#f6ede2" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="600" y2="800" stroke="#f6ede2" strokeWidth="0.5" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column — Headlines */}
          <div>
            <div style={{ animation: 'fadeInUp 0.6s ease 0.15s both' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(226,139,39,0.15)',
                  border: '1px solid rgba(226,139,39,0.3)',
                  borderRadius: '40px',
                  padding: '6px 16px',
                  color: '#e28b27',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '28px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#e28b27',
                    display: 'inline-block',
                    animation: 'pulseGlow 2s ease infinite',
                  }}
                />
                Curated by botanists · 30-Day Health Guarantee
              </span>
            </div>

            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", margin: 0 }}>
              <span className="hero-text-line">
                <span
                  className="hero-text-inner"
                  style={{
                    animationDelay: '0.3s',
                    color: '#f6ede2',
                    fontSize: 'clamp(48px, 6.8vw, 92px)',
                    fontWeight: 700,
                    lineHeight: 1.16,
                    paddingBottom: '0.12em',
                    letterSpacing: '-0.03em',
                    display: 'block',
                  }}
                >
                  Bring the
                </span>
              </span>
              <span className="hero-text-line">
                <span
                  className="hero-text-inner"
                  style={{
                    animationDelay: '0.45s',
                    color: '#f6ede2',
                    fontSize: 'clamp(48px, 6.8vw, 92px)',
                    fontWeight: 700,
                    lineHeight: 1.16,
                    paddingBottom: '0.12em',
                    letterSpacing: '-0.03em',
                    display: 'block',
                  }}
                >
                  wild
                </span>
              </span>
              <span className="hero-text-line">
                <span className="hero-text-inner" style={{ animationDelay: '0.6s', display: 'block', lineHeight: 1.08 }}>
                  <em
                    style={{
                      color: '#e28b27',
                      fontStyle: 'italic',
                      fontSize: 'clamp(48px, 6.8vw, 92px)',
                      fontWeight: 300,
                    }}
                  >
                    indoors.
                  </em>
                </span>
              </span>
            </h1>

            <div style={{ animation: 'fadeInUp 0.8s ease 0.8s both', opacity: 0 }}>
              <p
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 19px)',
                  lineHeight: 1.7,
                  color: 'rgba(246,237,226,0.7)',
                  maxWidth: '480px',
                  marginTop: '24px',
                  marginBottom: '36px',
                }}
              >
                Rare, thriving specimens inspected by horticultural experts — delivered to your door in custom biodegradable packaging with live care diagnostics.
              </p>
            </div>

            <div style={{ animation: 'fadeInUp 0.8s ease 1s both', opacity: 0 }} className="flex flex-wrap gap-3 items-center">
              <button
                className="btn-amber pulse-glow"
                onClick={onExplore}
              >
                Explore Collection →
              </button>
              <button
                className="btn-outline-forest"
                onClick={onDoctorOpen}
              >
                <Icon name="stethoscope" size={16} />
                Diagnose My Plant
              </button>
              {onOpenPdfGuide && (
                <button
                  type="button"
                  onClick={onOpenPdfGuide}
                  className="px-4 py-3 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#f6ede2] border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Icon name="book" size={15} />
                  2026 Field Guide (PDF)
                </button>
              )}
            </div>

            {/* Trust Badges */}
            <div style={{ animation: 'fadeInUp 0.8s ease 1.2s both', opacity: 0 }} className="flex flex-wrap gap-6 mt-12">
              {[
                { icon: 'shield' as const, label: '30-Day Guarantee' },
                { icon: 'package' as const, label: 'Zero Plastic Packaging' },
                { icon: 'truck' as const, label: 'Carbon-Neutral Fleet' },
                { icon: 'star' as const, label: '4.9 ★ (18K+ Happy Homes)' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2">
                  <Icon name={b.icon} size={16} style={{ color: '#e28b27' }} />
                  <span style={{ color: 'rgba(246,237,226,0.65)', fontSize: '13px', fontWeight: 500 }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Hero Visual Stack */}
          <div style={{ position: 'relative', height: 'clamp(420px, 58vh, 620px)' }}>
            <div
              className="floater img-parallax-wrap"
              data-depth="0.75"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '88%',
                height: '92%',
                borderRadius: '190px 190px 120px 120px',
                overflow: 'hidden',
                transition: 'transform 0.65s ease',
                animation: 'scaleIn 0.9s ease 0.35s both',
                boxShadow: '0 32px 80px rgba(4,42,26,0.5)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=900&fit=crop&auto=format"
                alt="Verdana Monstera Deliciosa — hand inspected"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(7,59,36,0.4) 100%)',
                }}
              />
            </div>

            {/* Floating Price Pill */}
            <div
              className="floater"
              data-depth="1.8"
              style={{
                position: 'absolute',
                bottom: '12%',
                left: 0,
                background: '#f6ede2',
                borderRadius: '18px',
                padding: '16px 20px',
                boxShadow: '0 20px 50px rgba(7,59,36,0.3)',
                animation: 'fadeInUp 0.8s ease 0.9s both',
                transition: 'transform 0.6s ease',
                zIndex: 10,
                minWidth: '190px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '12px',
                  color: '#5a8a6a',
                  marginBottom: '2px',
                  fontStyle: 'italic',
                }}
              >
                Weekly Featured Drop
              </div>
              <div
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#073b24',
                }}
              >
                Monstera Deliciosa
              </div>
              <div className="flex items-center justify-between mt-2">
                <span style={{ fontWeight: 700, color: '#073b24', fontSize: '20px' }}>$48</span>
                <span style={{ fontSize: '12px', color: '#5a8a6a', textDecoration: 'line-through' }}>$62</span>
              </div>
            </div>

            {/* Floating Rating Badge */}
            <div
              className="floater"
              data-depth="1.4"
              style={{
                position: 'absolute',
                top: '7%',
                left: '2%',
                background: '#073b24',
                border: '1px solid rgba(246,237,226,0.15)',
                borderRadius: '50px',
                padding: '10px 18px',
                boxShadow: '0 12px 35px rgba(7,59,36,0.4)',
                animation: 'fadeInUp 0.8s ease 1s both',
                transition: 'transform 0.6s ease',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: '#e28b27', fontSize: '13px' }}>★★★★★</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#f6ede2' }}>4.9</span>
            </div>

            {/* Decorative spinning orbital dashed ring */}
            <div
              className="floater"
              data-depth="0.3"
              style={{
                position: 'absolute',
                top: '-4%',
                right: '-4%',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                border: '1px dashed rgba(226,139,39,0.3)',
                animation: 'spinSlow 45s linear infinite',
                transition: 'transform 0.6s ease',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
