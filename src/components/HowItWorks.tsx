import { useEffect, useRef, useState } from 'react';
import Icon, { type IconName } from './Icon';

const steps = [
  {
    num: '01',
    title: 'Curate Your Collection',
    desc: 'Explore over 200 botanist-vetted indoor varieties. Filter by light levels, pet friendliness, or architectural presence.',
    icon: 'search' as IconName,
    image: 'https://images.unsplash.com/photo-1603912699214-92627f304eb6?w=600&h=500&fit=crop&auto=format',
  },
  {
    num: '02',
    title: 'Nursery Vetting & Prep',
    desc: 'Every plant is hand-inspected for root vitality, potted in organic living soil, and nestled in molded biodegradable pulp.',
    icon: 'package' as IconName,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=500&fit=crop&auto=format',
  },
  {
    num: '03',
    title: 'Climate-Controlled Dispatch',
    desc: 'Next-day in NY/NJ and 2–3 days across the Northeast. Sealed in temperature-safe insulation to arrive in showroom condition.',
    icon: 'truck' as IconName,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=500&fit=crop&auto=format',
  },
  {
    num: '04',
    title: 'Lifelong Botanist Care',
    desc: 'Receive custom care schedules, diagnostics via our online clinic, and 7-day expert horticultural chat with Vera.',
    icon: 'shield' as IconName,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=500&fit=crop&auto=format',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % steps.length);
    }, 3800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStepClick = (i: number) => {
    setActiveStep(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % steps.length);
    }, 4500);
  };

  return (
    <section id="how-it-works" style={{ background: '#f6ede2', padding: 'clamp(80px, 12vh, 130px) 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5a8a6a',
            }}
          >
            How it works
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              fontWeight: 700,
              color: '#073b24',
              marginTop: '12px',
              marginBottom: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            From greenhouse<br />
            <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#5a8a6a' }}>
              to your living room
            </em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Steps list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => handleStepClick(i)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px',
                  padding: '20px 24px',
                  borderRadius: '20px',
                  border: 'none',
                  textAlign: 'left',
                  background: activeStep === i ? '#073b24' : 'transparent',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  transform: activeStep === i ? 'translateX(8px)' : 'translateX(0)',
                  cursor: 'pointer',
                }}
              >
                {/* Step number & icon */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: activeStep === i ? '#e28b27' : 'rgba(7,59,36,0.08)',
                    color: activeStep === i ? '#073b24' : '#073b24',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <Icon name={step.icon} size={22} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: activeStep === i ? '#e28b27' : '#8ab89a',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {step.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: '18px',
                        fontWeight: 600,
                        color: activeStep === i ? '#f6ede2' : '#073b24',
                        margin: 0,
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  {activeStep === i && (
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.65,
                        color: 'rgba(246,237,226,0.75)',
                        margin: 0,
                        animation: 'fadeInUp 0.35s ease',
                      }}
                    >
                      {step.desc}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Image panel */}
          <div className="reveal-right" style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '28px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                position: 'relative',
                boxShadow: '0 24px 60px rgba(7,59,36,0.18)',
              }}
            >
              {steps.map((step, i) => (
                <img
                  key={step.num}
                  src={step.image}
                  alt={step.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: activeStep === i ? 1 : 0,
                    transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
                    transform: activeStep === i ? 'scale(1)' : 'scale(1.05)',
                  }}
                />
              ))}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7,59,36,0.5) 0%, transparent 50%)',
                }}
              />

              {/* Step indicator bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleStepClick(i)}
                    style={{
                      width: i === activeStep ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      border: 'none',
                      background: i === activeStep ? '#e28b27' : 'rgba(246,237,226,0.4)',
                      transition: 'all 0.4s ease',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Progress ring */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px' }}>
              <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(7,59,36,0.1)" strokeWidth="3" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#e28b27"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - (activeStep + 1) / steps.length)}`}
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#073b24',
                }}
              >
                {String(activeStep + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
