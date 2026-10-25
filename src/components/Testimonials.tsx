import { useState } from 'react';
import { testimonials } from '../data/plants';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(i => (i + 1) % testimonials.length);

  return (
    <section style={{ background: '#073b24', padding: 'clamp(80px, 12vh, 130px) 0', overflow: 'hidden' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 reveal">
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#e28b27',
            }}
          >
            From Our Living Community
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              fontWeight: 700,
              color: '#f6ede2',
              marginTop: '12px',
              marginBottom: 0,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            Plants that{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#8ab89a' }}>
              transformed
            </em>{' '}
            their spaces
          </h2>
        </div>

        {/* Main Testimonial Card */}
        <div className="reveal" style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ position: 'relative', minHeight: '220px' }}>
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                style={{
                  position: i === active ? 'relative' : 'absolute',
                  inset: 0,
                  opacity: i === active ? 1 : 0,
                  transform: `translateX(${(i - active) * 24}px)`,
                  transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: i === active ? 'auto' : 'none',
                }}
              >
                {/* 5 Amber Stars */}
                <div className="flex justify-center gap-1.5 mb-6">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="18" height="18" viewBox="0 0 18 18" fill="#e28b27">
                      <path d="M9 1.5L11.3 6.2L16.5 6.95L12.75 10.6L13.6 15.8L9 13.3L4.4 15.8L5.25 10.6L1.5 6.95L6.7 6.2L9 1.5Z" />
                    </svg>
                  ))}
                </div>

                <blockquote
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 'clamp(20px, 2.5vw, 26px)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: '#f6ede2',
                    lineHeight: 1.6,
                    margin: '0 0 32px',
                  }}
                >
                  "{t.text}"
                </blockquote>

                <div className="flex flex-col items-center gap-2.5">
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid rgba(226,139,39,0.5)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f6ede2', fontSize: '15px' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(246,237,226,0.6)' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(246,237,226,0.2)',
              background: 'transparent',
              color: '#f6ede2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#e28b27';
              e.currentTarget.style.color = '#e28b27';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(246,237,226,0.2)';
              e.currentTarget.style.color = '#f6ede2';
            }}
            aria-label="Previous review"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  padding: 0,
                  background: i === active ? '#e28b27' : 'rgba(246,237,226,0.25)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(246,237,226,0.2)',
              background: 'transparent',
              color: '#f6ede2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#e28b27';
              e.currentTarget.style.color = '#e28b27';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(246,237,226,0.2)';
              e.currentTarget.style.color = '#f6ede2';
            }}
            aria-label="Next review"
          >
            →
          </button>
        </div>

        {/* As featured in */}
        <div className="mt-20 pt-12 reveal" style={{ borderTop: '1px solid rgba(246,237,226,0.1)' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(246,237,226,0.4)',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            Recognized &amp; Praised By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {['Apartment Therapy', 'The New York Times', 'Architectural Digest', 'HGTV Digital', 'Domino', 'Fast Company'].map(pub => (
              <span
                key={pub}
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '16px',
                  fontStyle: 'italic',
                  color: 'rgba(246,237,226,0.3)',
                  whiteSpace: 'nowrap',
                }}
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
