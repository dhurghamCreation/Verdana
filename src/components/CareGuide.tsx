import { useState } from 'react';
import Icon, { type IconName } from './Icon';
import { downloadCareGuidePdf } from '../utils/generateBotanicalPdf';

interface CareGuideProps {
  onOpenPdfViewer?: () => void;
  onOpenDoctorClinic?: () => void;
}

const guides = [
  {
    id: 'light',
    label: 'Light',
    icon: 'sun' as IconName,
    color: '#e28b27',
    title: 'Mastering Light Exposure',
    intro:
      'Light is botanical energy. Most indoor specimens thrive in bright, indirect light — where they can see the sky clearly, but harsh afternoon sun does not burn leaf margins.',
    tips: [
      {
        heading: 'Bright Indirect Exposure',
        body: 'Place 2–4 feet from south or east-facing windows. Ideal for Monstera, Fiddle Leaf Figs, and Bird of Paradise.',
      },
      {
        heading: 'Filtered / Medium Light',
        body: 'A few feet back into the room or near north-facing apertures. Perfect for Peace Lilies and Calatheas.',
      },
      {
        heading: 'Low Light Tolerant',
        body: 'Spaces with only ambient indirect illumination. Snake Plants and ZZ Plants endure and look architectural here.',
      },
      {
        heading: 'Seasonal Rotation',
        body: 'Rotate your planters 90 degrees every month to ensure even phototropism and balanced branching.',
      },
    ],
  },
  {
    id: 'water',
    label: 'Watering',
    icon: 'droplet' as IconName,
    color: '#4a90c4',
    title: 'The Art of Mindful Watering',
    intro:
      'Overwatering suffocates root hairs; underwatering desiccates cell walls. The golden botanical rule: check soil saturation depth, never water purely by the calendar.',
    tips: [
      {
        heading: 'The 2-Inch Moisture Probe',
        body: 'Insert your index finger 2 inches into topsoil. If dry and crumbly, give a deep, thorough drink.',
      },
      {
        heading: 'Deep Bottom Soaking',
        body: 'Sit nursery pot in 2 inches of water for 25 minutes. Capillary action draws water upward without compacting topsoil.',
      },
      {
        heading: 'Water Quality Matters',
        body: 'Let municipal tap water rest uncovered overnight so chlorine evaporates, preventing crispy brown foliar tips.',
      },
      {
        heading: 'Drainage Imperative',
        body: 'Never let planters stand in saucers of stagnant drainage water. Empty drip trays 15 minutes after watering.',
      },
    ],
  },
  {
    id: 'soil',
    label: 'Soil & Potting',
    icon: 'pot' as IconName,
    color: '#8b5a2b',
    title: 'Living Soil & Repotting Systems',
    intro:
      'Roots require a dynamic balance of moisture retention, mineral nutrition, and aeration pores. All Verdana plants arrive in our signature organic micro-aerated mix.',
    tips: [
      {
        heading: 'When to Up-Pot',
        body: 'Repot when roots circle base drainage holes or push up topsoil — typically every 14–18 months in spring.',
      },
      {
        heading: 'Diameter Sizing Rule',
        body: 'Move up by only 1–2 inches in diameter. Oversized pots hold excess soggy soil that invites root rot.',
      },
      {
        heading: 'Aeration Components',
        body: 'Our house mix combines aged pine bark, chunky perlite, coconut coir, and worm castings for sustained microbial vigor.',
      },
      {
        heading: 'Seasonal Repotting Window',
        body: 'Repot in early spring through mid-summer when active vegetative growth accelerates root establishment.',
      },
    ],
  },
  {
    id: 'humidity',
    label: 'Humidity',
    icon: 'cloud' as IconName,
    color: '#5a8a6a',
    title: 'Micro-Climates & Ambient Humidity',
    intro:
      'Tropical understory plants evolved in air saturated with 60%–80% humidity. Modern winter heating often dries indoor spaces below 30%, stressing foliage.',
    tips: [
      {
        heading: 'Target Indoor Range',
        body: 'Most tropical flora flourish at 50%–65% relative humidity. An inexpensive digital hygrometer helps monitor this.',
      },
      {
        heading: 'Micro-Climate Grouping',
        body: 'Grouping three or more plants closely together creates a mutual humidity canopy via continuous leaf transpiration.',
      },
      {
        heading: 'Pebble Moisture Trays',
        body: 'Place pots on trays filled with river stones and water below the pot base. Evaporating water hydrates leaves without soaking roots.',
      },
      {
        heading: 'Ultrasonic Humidifiers',
        body: 'In dry winters, run a small cool-mist ultrasonic humidifier 3–5 feet away on a 6-hour daily timer.',
      },
    ],
  },
];

// Interactive Lux calculator helper
const WINDOW_PROFILES = [
  { direction: 'South-Facing', lux: 2400, desc: 'Highest peak sunlight (5–8h direct/filtered). Ideal for Olive, Ficus, Bird of Paradise.' },
  { direction: 'East-Facing', lux: 1750, desc: 'Gentle, cool morning sun (3–4h). Best for Monstera, Philodendron, Anthuriums.' },
  { direction: 'West-Facing', lux: 2100, desc: 'Intense warm afternoon sunlight. Best for Rubber Tree, Snake Plant, Jade.' },
  { direction: 'North-Facing', lux: 750, desc: 'Consistent gentle indirect ambient glow. Ideal for ZZ Plant, Cast Iron, Peace Lily.' },
];

export default function CareGuide({ onOpenPdfViewer, onOpenDoctorClinic }: CareGuideProps) {
  const [active, setActive] = useState('light');
  const [selectedWindow, setSelectedWindow] = useState('East-Facing');
  const [distanceFt, setDistanceFt] = useState(3);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const guide = guides.find(g => g.id === active)!;

  const currentProfile = WINDOW_PROFILES.find(w => w.direction === selectedWindow)!;
  // Inverse square law estimation for indoor light
  const estimatedLux = Math.round(currentProfile.lux / Math.max(1, distanceFt * 0.75));

  const handleDownload = () => {
    setDownloadingPdf(true);
    try {
      downloadCareGuidePdf();
    } finally {
      setTimeout(() => setDownloadingPdf(false), 800);
    }
  };

  return (
    <section id="care-guide" style={{ background: '#073b24', padding: 'clamp(80px, 12vh, 130px) 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#e28b27',
            }}
          >
            Botanical Knowledge Base
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              fontWeight: 700,
              color: '#f6ede2',
              marginTop: '12px',
              marginBottom: '8px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Help your plants{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#8ab89a' }}>
              flourish
            </em>
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(246,237,226,0.65)',
              maxWidth: '520px',
              margin: '0 auto 20px',
            }}
          >
            Our horticulturists distill decades of botanical experience into actionable protocols for your living room.
          </p>

          {/* Great PDF Action Banner in Care Guide Header */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onOpenPdfViewer) onOpenPdfViewer();
                else handleDownload();
              }}
              className="btn-amber text-xs py-2.5 px-5 rounded-full inline-flex items-center gap-2 font-bold cursor-pointer shadow-md hover:scale-105 transition-transform"
            >
              <Icon name="book" size={15} /> Open 6-Page Care Handbook PDF (Interactive Reader)
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloadingPdf}
              className="inline-flex items-center gap-2 text-xs py-2.5 px-4 font-semibold text-[#f6ede2] bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-colors cursor-pointer"
            >
              <Icon name="truck" size={14} />
              {downloadingPdf ? 'Compiling PDF...' : 'Download PDF Directly (.pdf)'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="reveal flex flex-wrap justify-center gap-3 mb-12">
          {guides.map(g => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '40px',
                border: '1.5px solid',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                borderColor: active === g.id ? g.color : 'rgba(246,237,226,0.15)',
                background: active === g.id ? `${g.color}25` : 'transparent',
                color: active === g.id ? g.color : 'rgba(246,237,226,0.65)',
                transform: active === g.id ? 'scale(1.04)' : 'scale(1)',
                cursor: 'pointer',
              }}
            >
              <Icon name={g.icon} size={17} />
              {g.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="min-h-[420px] transition-opacity duration-300 mb-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — Intro & Quick Reference */}
            <div>
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 'clamp(26px, 3.5vw, 38px)',
                  fontWeight: 700,
                  color: '#f6ede2',
                  margin: '0 0 16px',
                  lineHeight: 1.2,
                }}
              >
                {guide.title}
              </h3>
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.7,
                  color: 'rgba(246,237,226,0.7)',
                  margin: '0 0 32px',
                }}
              >
                {guide.intro}
              </p>

              {/* Quick reference card */}
              <div
                style={{
                  background: `${guide.color}14`,
                  border: `1px solid ${guide.color}35`,
                  borderRadius: '20px',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: guide.color,
                    marginBottom: '14px',
                  }}
                >
                  Quick Reference Protocol
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {[
                    { label: 'Most Forgiving', value: 'Snake Plant, ZZ, Pothos' },
                    { label: 'High Attention', value: 'Calathea, Fiddle Leaf' },
                    { label: 'Beginner Recommendation', value: 'Start with Easy Care' },
                    { label: 'Core Golden Rule', value: 'Consistency Beats Perfection' },
                  ].map(r => (
                    <div key={r.label}>
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'rgba(246,237,226,0.5)',
                          marginBottom: '2px',
                        }}
                      >
                        {r.label}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#f6ede2' }}>
                        {r.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Tip Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {guide.tips.map((tip, i) => (
                <div
                  key={tip.heading}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(246,237,226,0.1)',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    transition: 'all 0.3s ease',
                    animationDelay: `${i * 0.08}s`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                    e.currentTarget.style.borderColor = `${guide.color}50`;
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(246,237,226,0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: guide.color,
                        flexShrink: 0,
                      }}
                    />
                    <h4
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: '17px',
                        fontWeight: 600,
                        color: '#f6ede2',
                        margin: 0,
                      }}
                    >
                      {tip.heading}
                    </h4>
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'rgba(246,237,226,0.65)',
                      margin: 0,
                      paddingLeft: '18px',
                    }}
                  >
                    {tip.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Interactive Tool: Room Sunlight & Lux Calculator */}
        <div className="reveal p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 mb-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="w-full lg:max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#e28b27] block mb-2">
                Interactive Botanical Tool
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#f6ede2] m-0 mb-3">
                Room Light &amp; Lux Exposure Calculator
              </h3>
              <p className="text-sm text-white/70 m-0 mb-5 leading-relaxed">
                Calculate the estimated photon density for your exact room aperture and window distance to find the perfect specimen match.
              </p>

              {/* Window selectors */}
              <div className="mb-6">
                <span className="text-xs text-white/60 block mb-2 font-medium">Select Window Aperture Direction:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WINDOW_PROFILES.map(w => (
                    <button
                      key={w.direction}
                      type="button"
                      onClick={() => setSelectedWindow(w.direction)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                        selectedWindow === w.direction
                          ? 'bg-[#e28b27] text-[#073b24] font-bold shadow-md'
                          : 'bg-white/10 hover:bg-white/15 text-white/80'
                      }`}
                    >
                      {w.direction}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance from window - 100% Perfectly Aligned Precision Stepper & Ruler */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70 font-medium">Distance from window aperture:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDistanceFt(prev => Math.max(1, prev - 1))}
                      disabled={distanceFt <= 1}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#e28b27] font-mono font-bold flex items-center justify-center text-sm cursor-pointer transition-colors"
                      title="Decrease distance by 1 foot"
                    >
                      −
                    </button>
                    <span className="font-mono tabular-nums text-sm font-bold text-[#e28b27] bg-[#e28b27]/15 border border-[#e28b27]/30 px-3 py-1 rounded-lg min-w-[84px] text-center inline-block">
                      {distanceFt} {distanceFt === 1 ? 'foot' : 'feet'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDistanceFt(prev => Math.min(12, prev + 1))}
                      disabled={distanceFt >= 12}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#e28b27] font-mono font-bold flex items-center justify-center text-sm cursor-pointer transition-colors"
                      title="Increase distance by 1 foot"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 12-Step Perfectly Aligned Distance Grid */}
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(ft => (
                    <button
                      key={ft}
                      type="button"
                      onClick={() => setDistanceFt(ft)}
                      className={`h-9 rounded-lg font-mono tabular-nums text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                        distanceFt === ft
                          ? 'bg-[#e28b27] text-[#073b24] shadow-md ring-2 ring-[#e28b27]/50 scale-105'
                          : 'bg-white/10 hover:bg-white/20 text-white/70'
                      }`}
                    >
                      <span>{ft}</span>
                      <span className="text-[9px] opacity-70 leading-none">ft</span>
                    </button>
                  ))}
                </div>

                {/* Range Slider for smooth scrubbing */}
                <div className="pt-2">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={distanceFt}
                    onChange={e => setDistanceFt(Number(e.target.value))}
                    className="w-full accent-[#e28b27] cursor-pointer h-2 bg-white/20 rounded-lg appearance-none"
                  />
                  {/* Perfectly aligned tick labels underneath slider */}
                  <div className="grid grid-cols-12 text-center pt-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(ft => (
                      <span
                        key={ft}
                        onClick={() => setDistanceFt(ft)}
                        className={`font-mono tabular-nums text-[11px] cursor-pointer transition-colors ${
                          distanceFt === ft
                            ? 'text-[#e28b27] font-bold scale-110'
                            : 'text-white/40 hover:text-white/70'
                        }`}
                      >
                        {ft}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Result Card with rock-solid tabular-nums alignment */}
            <div className="w-full lg:w-auto p-6 rounded-2xl bg-[#042a1a] border border-[#e28b27]/40 min-w-[300px] text-center shadow-lg">
              <div className="text-[10px] text-[#e28b27] font-bold uppercase tracking-wider mb-2">
                Estimated Photon Density
              </div>
              <div className="font-mono tabular-nums text-4xl sm:text-5xl font-bold text-[#e28b27] mb-1 tracking-tight text-center">
                {estimatedLux.toLocaleString()} <span className="text-lg font-normal text-white/70">Lux</span>
              </div>
              <div className="font-mono tabular-nums text-xs text-[#8ab89a] mb-4 text-center">
                ~ {Math.round(estimatedLux / 10).toLocaleString()} Foot-Candles (fc)
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold mb-3">
                {estimatedLux >= 1500 ? '☀ Tier 1 · Bright Indirect Exposure' : estimatedLux >= 800 ? '⛅ Tier 2 · Medium Dappled Exposure' : '☁ Tier 3 · Low Light Tolerant'}
              </div>
              <p className="text-[11px] text-white/70 m-0 leading-relaxed max-w-xs mx-auto">
                {currentProfile.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Great PDF Showcase Banner */}
        <div className="reveal p-8 rounded-3xl bg-gradient-to-r from-[#042a1a] via-[#073b24] to-[#042a1a] border-2 border-[#e28b27]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#e28b27]/20 border border-[#e28b27]/50 flex items-center justify-center text-[#e28b27] shrink-0">
              <Icon name="book" size={32} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#e28b27] mb-1">
                Verified Greenhouse Edition · 2026
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#f6ede2] m-0 mb-1">
                The Complete 6-Page Verdana Care Handbook (PDF)
              </h4>
              <p className="text-xs text-white/70 m-0 max-w-xl">
                Features our phototropism matrix, living soil blends, 4-season hydration curves, clinical pathology triage, and official stamped 30-day living guarantee certificate.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (onOpenPdfViewer) onOpenPdfViewer();
                else handleDownload();
              }}
              className="px-4 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#f6ede2] border border-white/20 transition-all cursor-pointer"
            >
              Interactive Preview
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloadingPdf}
              className="btn-amber text-xs py-2.5 px-6 font-bold cursor-pointer inline-flex items-center gap-2 shadow-lg"
            >
              <Icon name="truck" size={14} />
              {downloadingPdf ? 'Compiling PDF...' : 'Download PDF (.pdf)'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
