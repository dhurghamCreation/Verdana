import Icon, { type IconName } from './Icon';

const features = [
  {
    icon: 'shield' as IconName,
    title: '30-Day Health Guarantee',
    desc: 'Every plant arrives healthy or we replace it immediately — no receipts, no returns, no hassle.',
  },
  {
    icon: 'leaf' as IconName,
    title: 'Botanical Curation',
    desc: 'Our in-house botanists select only plants that exceed our strict root-ball and foliage standards.',
  },
  {
    icon: 'recycle' as IconName,
    title: 'Zero Single-Use Plastic',
    desc: '100% biodegradable molded pulp, recycled cardboard, and organic coconut coir wraps — always.',
  },
  {
    icon: 'truck' as IconName,
    title: 'Climate-Controlled Fleet',
    desc: 'Next-day in NY & NJ; 2–3 days across the Northeast. Insulated for freezing winters and hot summers.',
  },
  {
    icon: 'health' as IconName,
    title: 'Plant Doctor Support',
    desc: 'Access our interactive diagnostic tool or consult directly with our botanical team 7 days a week.',
  },
  {
    icon: 'book' as IconName,
    title: 'Personalized Care Guides',
    desc: 'Each specimen ships with an illustrated care card tailored to its native micro-climate requirements.',
  },
];

export default function Features() {
  return (
    <section id="features" style={{ background: '#f6ede2', padding: 'clamp(80px, 12vh, 120px) 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14 reveal">
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5a8a6a',
            }}
          >
            Why Verdana
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              fontWeight: 700,
              color: '#073b24',
              marginTop: '12px',
              marginBottom: 0,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            Obsessively good,{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>every step</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card reveal delay-${i + 1}`}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '32px 28px',
              }}
            >
              <div
                className="feature-icon"
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'rgba(7,59,36,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#073b24',
                  marginBottom: '20px',
                }}
              >
                <Icon name={f.icon} size={24} />
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#073b24',
                  margin: '0 0 10px',
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: '#5a8a6a',
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
