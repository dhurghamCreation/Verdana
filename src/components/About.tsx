import { useEffect, useRef, useState, type ReactNode } from 'react';
import Icon from './Icon';

function Counter({
  target,
  suffix = '',
  suffixNode,
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  suffixNode?: ReactNode;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const step = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setValue(decimals ? Number(current.toFixed(decimals)) : Math.round(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <div ref={ref} className="counter-val inline-flex items-center">
      <span>
        {value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
      </span>
      {suffixNode ? suffixNode : suffix}
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: '#073b24',
        padding: 'clamp(80px, 12vh, 140px) 0',
        overflow: 'hidden',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image column */}
          <div className="reveal-left relative">
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=1000&fit=crop&auto=format"
                alt="Verdana Brooklyn Botanical Greenhouse"
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
                  background: 'linear-gradient(to top, rgba(7,59,36,0.6) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Floating quote pill */}
            <div
              style={{
                position: 'absolute',
                right: '-6%',
                bottom: '10%',
                background: '#f6ede2',
                borderRadius: '20px',
                padding: '22px 24px',
                maxWidth: '240px',
                boxShadow: '0 24px 60px rgba(7,59,36,0.35)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: '#073b24',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                "Every plant we ship has been individually vetted for root vigour and pest absence."
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '12px',
                  color: '#5a8a6a',
                  marginTop: '10px',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                — Dr. Lena Marsh, Head Botanist
              </p>
            </div>
          </div>

          {/* Text column */}
          <div>
            <div className="reveal">
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#e28b27',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                Our Botanical Story
              </span>
              <h2
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 'clamp(34px, 4.5vw, 52px)',
                  fontWeight: 700,
                  color: '#f6ede2',
                  margin: '0 0 24px',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                }}
              >
                Grown with intention,<br />
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#8ab89a' }}>
                  delivered with care
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '17px',
                  lineHeight: 1.75,
                  color: 'rgba(246,237,226,0.7)',
                  margin: '0 0 20px',
                }}
              >
                Verdana began in a 400 sq ft Brooklyn greenhouse in 2019. What started as a passion project between two botanists grew into the Northeast's most trusted source for rare, architectural indoor flora.
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '17px',
                  lineHeight: 1.75,
                  color: 'rgba(246,237,226,0.7)',
                  margin: '0 0 38px',
                }}
              >
                Every plant is inspected, potted in custom nutrient-rich living soil, and packaged in biodegradable molded pulp. Our 30-day health guarantee means if your plant doesn't flourish, we replace it immediately — no questions asked.
              </p>
            </div>

            {/* Live Stats */}
            <div className="about-stats reveal">
              {[
                { target: 12400, suffix: '+', label: 'Plants delivered' },
                { target: 98, suffix: '%', label: 'Arrive healthy' },
                {
                  target: 4.9,
                  suffixNode: <Icon name="star-filled" size={20} className="text-[#e28b27] ml-1.5" />,
                  decimals: 1,
                  label: 'Average rating',
                },
              ].map((s, index) => (
                <div key={s.label} className={`about-stat about-stat-${index + 1}`}>
                  <div style={{ color: '#e28b27' }}>
                    <Counter
                      target={s.target}
                      suffix={s.suffix}
                      suffixNode={s.suffixNode}
                      decimals={s.decimals || 0}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: '13px',
                      color: 'rgba(246,237,226,0.55)',
                      marginTop: '6px',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal mt-10">
              <button
                type="button"
                className="btn-amber cursor-pointer inline-flex items-center gap-2"
                onClick={() => {
                  const el = document.getElementById('journey');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.pageYOffset - 85;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
              >
                <span>Our Botanical Journey</span>
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
