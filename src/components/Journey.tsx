import { useEffect, useRef } from 'react';

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const img = section.querySelector<HTMLElement>('.parallax-img');
      if (img) img.style.transform = `translateY(${progress * 70}px) scale(1.1)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Parallax background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          className="parallax-img"
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&h=900&fit=crop&auto=format"
          alt="Botanical greenhouse — lush tropical plants"
          style={{
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            display: 'block',
            transform: 'translateY(0) scale(1.1)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(4,42,26,0.72) 0%, rgba(7,59,36,0.48) 40%, rgba(4,42,26,0.85) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="max-w-5xl mx-auto px-6 lg:px-10 text-center"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(80px, 14vh, 140px) clamp(24px, 5vw, 60px)',
        }}
      >
        <div className="reveal">
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#e28b27',
              display: 'block',
              marginBottom: '20px',
            }}
          >
            The Verdana Way
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(38px, 6vw, 72px)',
              fontWeight: 700,
              color: '#f6ede2',
              margin: '0 0 24px',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Every plant has a<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#8ab89a' }}>
              story worth telling
            </em>
          </h2>
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: 1.7,
              color: 'rgba(246,237,226,0.7)',
              maxWidth: '620px',
              margin: '0 auto 44px',
            }}
          >
            We partner directly with sustainable growers across the Americas, selecting only specimens that exceed our rigorous health standards. Each plant arrives with complete provenance — origin, greenhouse grower, and an exact micro-climate care plan.
          </p>
        </div>

        <div className="reveal flex flex-wrap justify-center gap-5">
          <button
            className="btn-amber"
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop the Collection
          </button>
          <button
            className="btn-outline-forest"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Meet Our Botanists
          </button>
        </div>

        {/* Floating stat cards */}
        <div className="reveal flex flex-wrap justify-center gap-6 mt-14">
          {[
            { number: '200+', label: 'Rare varieties' },
            { number: '18K', label: 'Happy plant parents' },
            { number: '28', label: 'Certified growers' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(246,237,226,0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(246,237,226,0.15)',
                borderRadius: '16px',
                padding: '20px 28px',
                textAlign: 'center',
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(226,139,39,0.14)';
                e.currentTarget.style.borderColor = 'rgba(226,139,39,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(246,237,226,0.08)';
                e.currentTarget.style.borderColor = 'rgba(246,237,226,0.15)';
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#e28b27',
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(246,237,226,0.6)',
                  marginTop: '6px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
