import Icon, { type IconName } from './Icon';

const commitments = [
  {
    icon: 'leaf' as IconName,
    title: 'Carbon-Neutral Delivery',
    stat: '100%',
    statLabel: 'offset since 2023',
    desc: 'Every shipment is carbon offset through verified reforestation initiatives in the Amazon basin. We partner with South Pole to retire verified carbon credits quarterly.',
    color: '#5a8a6a',
  },
  {
    icon: 'recycle' as IconName,
    title: 'Zero Single-Use Plastic',
    stat: '0%',
    statLabel: 'plastic in packaging',
    desc: 'All packaging — boxes, cushioning wraps, nursery liners, and ties — are 100% biodegradable or curbside recyclable. We eliminated plastics entirely in 2024.',
    color: '#4a90c4',
  },
  {
    icon: 'handshake' as IconName,
    title: 'Fair-Trade Grower Partners',
    stat: '28',
    statLabel: 'certified farm partners',
    desc: 'We partner exclusively with independent growers who guarantee living wages, safe horticultural environments, and regenerative soil practices.',
    color: '#e28b27',
  },
  {
    icon: 'droplet' as IconName,
    title: 'Closed-Loop Irrigation',
    stat: '94%',
    statLabel: 'water recaptured & reused',
    desc: 'Our Brooklyn and Newark growing facilities utilize automated closed-loop drip systems, recirculating 94% of irrigation runoff and saving millions of gallons.',
    color: '#f0a84a',
  },
  {
    icon: 'globe' as IconName,
    title: 'Zero Wild-Collected Plants',
    stat: '100%',
    statLabel: 'ethically propagated',
    desc: 'Every specimen we offer is sustainably propagated from mother stocks — never poached from endangered wild habitats. We support botanical conservation preserves.',
    color: '#8b5a2b',
  },
  {
    icon: 'building' as IconName,
    title: 'Certified B Corporation',
    stat: '91.4',
    statLabel: '2025 B Impact Score',
    desc: 'Verdana meets the highest verified standards of social and environmental performance, accountability, and transparency across our full operational footprint.',
    color: '#5a4a8a',
  },
];

const timeline = [
  { year: '2019', event: 'Founded in a 400 sq ft Brooklyn greenhouse with a commitment to sustainable horticulture.' },
  { year: '2021', event: 'Eliminated all single-use plastics from packaging, shifting to molded compostable pulp.' },
  { year: '2022', event: 'Earned initial B Corporation certification with an impact score of 78.2.' },
  { year: '2023', event: 'Achieved 100% verified carbon-neutral delivery across all regional corridors.' },
  { year: '2024', event: 'Installed closed-loop nutrient recapturing irrigation in Newark distribution hub.' },
  { year: '2025', event: 'B Corp recertification completed with an upgraded score of 91.4 / 200.' },
  { year: '2026', event: 'Surpassed 10,000 trees planted through our 1-Order-1-Tree botanical initiative.' },
];

export default function Ethics() {
  return (
    <section id="ethics" style={{ background: '#073b24', padding: 'clamp(80px, 12vh, 130px) 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="reveal">
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#e28b27',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Ethics &amp; Environmental Stewardship
            </span>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                color: '#f6ede2',
                margin: '0 0 20px',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
              }}
            >
              Doing business<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#8ab89a' }}>
                the right way
              </em>
            </h2>
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.72,
                color: 'rgba(246,237,226,0.7)',
                margin: 0,
                maxWidth: '480px',
              }}
            >
              Profit and botanical integrity are not mutually exclusive. We measure success by the health of our flora, our growers, our community, and the earth.
            </p>
          </div>

          {/* B Corp Badge graphic */}
          <div className="reveal-right flex justify-center">
            <div
              style={{
                width: 'min(280px, 100%)',
                aspectRatio: '1',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(246,237,226,0.12)',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '32px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '64px',
                  fontWeight: 700,
                  color: '#e28b27',
                  lineHeight: 1,
                }}
              >
                B
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(246,237,226,0.7)',
                  marginTop: '8px',
                }}
              >
                CORP CERTIFIED
              </div>
              <div
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#f6ede2',
                  marginTop: '6px',
                }}
              >
                91.4 / 200
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(246,237,226,0.45)',
                  marginTop: '4px',
                }}
              >
                Verified Impact Score
              </div>
            </div>
          </div>
        </div>

        {/* Commitments Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {commitments.map((c, i) => (
            <div
              key={c.title}
              className={`region-card reveal delay-${i + 1}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '20px',
                padding: '28px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <span className="section-icon section-icon-dark">
                  <Icon name={c.icon} size={24} />
                </span>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: '26px',
                      fontWeight: 700,
                      color: c.color,
                      lineHeight: 1,
                    }}
                  >
                    {c.stat}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'rgba(246,237,226,0.45)',
                      marginTop: '2px',
                    }}
                  >
                    {c.statLabel}
                  </div>
                </div>
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#f6ede2',
                  margin: '0 0 10px',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: 'rgba(246,237,226,0.6)',
                  margin: 0,
                }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal">
          <h3
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 700,
              color: '#f6ede2',
              marginBottom: '32px',
            }}
          >
            Our Environmental Journey
          </h3>
          <div
            style={{
              position: 'relative',
              paddingLeft: '28px',
              borderLeft: '2px solid rgba(226,139,39,0.3)',
            }}
          >
            {timeline.map((item, i) => (
              <div
                key={item.year}
                style={{
                  position: 'relative',
                  paddingBottom: '28px',
                  paddingLeft: '24px',
                  animation: `cardAppear 0.5s ease ${i * 0.08}s both`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-36px',
                    top: '3px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: i === timeline.length - 1 ? '#e28b27' : '#5a8a6a',
                    border: `2px solid ${i === timeline.length - 1 ? '#e28b27' : '#5a8a6a'}`,
                    boxShadow: i === timeline.length - 1 ? '0 0 0 4px rgba(226,139,39,0.25)' : 'none',
                  }}
                />
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#e28b27',
                    marginBottom: '4px',
                  }}
                >
                  {item.year} {i === timeline.length - 1 && '(current milestone)'}
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    color: 'rgba(246,237,226,0.75)',
                    lineHeight: 1.55,
                  }}
                >
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
