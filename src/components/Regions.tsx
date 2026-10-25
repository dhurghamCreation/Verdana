import { useState } from 'react';
import Icon, { type IconName } from './Icon';

const regions = [
  {
    name: 'New York City',
    states: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
    delivery: 'Next-day & Same-day',
    badge: 'flagship',
    icon: 'landmark' as IconName,
    color: '#073b24',
    stores: 2,
    desc: 'Our original flagship nursery. Next-day delivery across all 5 boroughs with zero emissions courier options.',
  },
  {
    name: 'New Jersey',
    states: ['Jersey City', 'Hoboken', 'Newark', 'Montclair', 'Princeton'],
    delivery: '1–2 days',
    badge: 'active',
    icon: 'city' as IconName,
    color: '#0f5c39',
    stores: 1,
    desc: 'Full coverage across Northern and Central NJ powered by our Newark greenhouse propagation hub.',
  },
  {
    name: 'Connecticut',
    states: ['New Haven', 'Stamford', 'Hartford', 'Greenwich', 'Westport'],
    delivery: '2–3 days',
    badge: 'active',
    icon: 'leaf' as IconName,
    color: '#5a8a6a',
    stores: 0,
    desc: 'Full residential delivery. Carbon-neutral express transit for all orders over $75.',
  },
  {
    name: 'Massachusetts',
    states: ['Boston', 'Cambridge', 'Worcester', 'Northampton'],
    delivery: '2–3 days',
    badge: 'active',
    icon: 'wave' as IconName,
    color: '#4a90c4',
    stores: 0,
    desc: 'Boston metropolitan and surrounding communities served via climate-controlled regional dispatch.',
  },
  {
    name: 'Pennsylvania',
    states: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Lancaster'],
    delivery: '2–3 days',
    badge: 'active',
    icon: 'bell' as IconName,
    color: '#e28b27',
    stores: 1,
    desc: 'Our Rittenhouse Square botanical studio in Philly opened Spring 2025. Statewide home delivery.',
  },
  {
    name: 'DC / MD / DE / RI',
    states: ['Washington DC', 'Baltimore', 'Wilmington', 'Providence'],
    delivery: '2–4 days',
    badge: 'active',
    icon: 'landmark' as IconName,
    color: '#8b5a2b',
    stores: 0,
    desc: 'Mid-Atlantic and Rhode Island coverage with insulated climate boxes designed for live specimen care.',
  },
  {
    name: 'Southeast (Coming Soon)',
    states: ['Atlanta, GA', 'Charlotte, NC', 'Richmond, VA', 'Nashville, TN'],
    delivery: 'Q1 2027',
    badge: 'soon',
    icon: 'flower' as IconName,
    color: '#8ab89a',
    stores: 0,
    desc: 'Greenhouse infrastructure underway. Register below to receive priority access and an opening gift code.',
  },
  {
    name: 'West Coast (Planned)',
    states: ['Los Angeles', 'San Francisco', 'Seattle', 'Portland'],
    delivery: '2028',
    badge: 'planned',
    icon: 'wave' as IconName,
    color: '#5a4a8a',
    stores: 0,
    desc: 'Pacific growing facility partnerships in active discovery. Sign up for regional announcements.',
  },
];

const badgeStyle: Record<string, React.CSSProperties> = {
  flagship: { background: 'rgba(226,139,39,0.25)', color: '#e28b27', border: '1px solid rgba(226,139,39,0.45)' },
  active: { background: 'rgba(90,138,106,0.2)', color: '#8ab89a', border: '1px solid rgba(90,138,106,0.35)' },
  soon: { background: 'rgba(74,144,196,0.2)', color: '#4a90c4', border: '1px solid rgba(74,144,196,0.35)' },
  planned: { background: 'rgba(246,237,226,0.08)', color: 'rgba(246,237,226,0.5)', border: '1px solid rgba(246,237,226,0.12)' },
};

function renderBadge(type: string) {
  switch (type) {
    case 'flagship':
      return (
        <span className="inline-flex items-center gap-1">
          <Icon name="star-filled" size={10} className="text-[#e28b27]" />
          <span>Flagship</span>
        </span>
      );
    case 'active':
      return (
        <span className="inline-flex items-center gap-1">
          <Icon name="check" size={10} className="text-emerald-400" />
          <span>Active</span>
        </span>
      );
    case 'soon':
      return (
        <span className="inline-flex items-center gap-1">
          <Icon name="clock" size={10} className="text-sky-300" />
          <span>Coming Soon</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1">
          <Icon name="map-pin" size={10} className="text-white/40" />
          <span>Planned</span>
        </span>
      );
  }
}

export default function Regions() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  const joinWaitlist = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !zip) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, zip }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setWaitlistCount(data.totalWaitlistCount);
      } else {
        throw new Error(data.error);
      }
    } catch {
      setError('Unable to record waitlist entry. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="regions" style={{ background: '#042a1a', padding: 'clamp(80px, 12vh, 130px) 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
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
            Regional Delivery Corridor
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(34px, 4.5vw, 52px)',
              fontWeight: 700,
              color: '#f6ede2',
              marginTop: '12px',
              marginBottom: '16px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Where we{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#8ab89a' }}>
              deliver
            </em>
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(246,237,226,0.65)',
              maxWidth: '540px',
              margin: '0 auto',
            }}
          >
            Currently serving 8 states and Washington DC across the Northeast corridor with specialized climate-controlled delivery.
          </p>
        </div>

        {/* Coverage stats */}
        <div className="reveal flex flex-wrap justify-center gap-6 mb-14">
          {[
            { n: '8', label: 'States + DC' },
            { n: '4', label: 'Physical Studios' },
            { n: '18K+', label: 'Delivered Specimens' },
            { n: '2027', label: 'Southeast Corridor' },
          ].map(s => (
            <div
              key={s.label}
              style={{
                padding: '16px 28px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(246,237,226,0.08)',
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(226,139,39,0.1)';
                e.currentTarget.style.borderColor = 'rgba(226,139,39,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(246,237,226,0.08)';
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
                {s.n}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(246,237,226,0.6)',
                  marginTop: '6px',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Region Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map((r, i) => (
            <div
              key={r.name}
              className={`region-card reveal delay-${Math.min(i + 1, 8)}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '20px',
                padding: '24px',
                opacity: r.badge === 'planned' ? 0.75 : 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '14px',
                }}
              >
                <span className="section-icon section-icon-dark">
                  <Icon name={r.icon} size={22} />
                </span>
                <span
                  style={{
                    ...badgeStyle[r.badge],
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    padding: '3px 9px',
                    borderRadius: '20px',
                  }}
                >
                  {renderBadge(r.badge)}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#f6ede2',
                  margin: '0 0 6px',
                  lineHeight: 1.3,
                }}
              >
                {r.name}
              </h3>
              <div className="region-delivery">
                <Icon name="truck" size={14} />
                {r.delivery}
              </div>
              <p
                style={{
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: 'rgba(246,237,226,0.6)',
                  margin: '0 0 12px',
                }}
              >
                {r.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {r.states.slice(0, 3).map(s => (
                  <span
                    key={s}
                    style={{
                      fontSize: '10px',
                      color: 'rgba(246,237,226,0.45)',
                      background: 'rgba(255,255,255,0.05)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    {s}
                  </span>
                ))}
                {r.states.length > 3 && (
                  <span
                    style={{
                      fontSize: '10px',
                      color: 'rgba(246,237,226,0.45)',
                    }}
                  >
                    +{r.states.length - 3} more
                  </span>
                )}
              </div>
              {r.stores > 0 && (
                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(246,237,226,0.08)',
                    fontSize: '12px',
                    color: '#8ab89a',
                  }}
                >
                  <span className="region-delivery">
                    <Icon name="store" size={14} />
                    {r.stores} Botanical Studio{r.stores > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expansion Waitlist Trigger */}
        <div className="reveal mt-14 text-center">
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(246,237,226,0.65)',
              marginBottom: '16px',
            }}
          >
            Not in our delivery footprint yet?
          </p>
          <button
            className="btn-amber"
            onClick={() => setShowWaitlist(val => !val)}
          >
            {showWaitlist ? 'Hide Waitlist Form ↑' : 'Get notified when we reach your ZIP →'}
          </button>

          {showWaitlist && (
            <div className="region-waitlist mt-6">
              {submitted ? (
                <div className="waitlist-success text-center py-2">
                  <strong>You're registered for priority notification.</strong>
                  <span>
                    We'll email you the moment Verdana climate delivery reaches ZIP {zip}. Total waiting in your corridor: {waitlistCount || 428}.
                  </span>
                </div>
              ) : (
                <form onSubmit={joinWaitlist}>
                  <label>
                    <span className="flex items-center justify-between text-xs font-semibold text-[#f6ede2]/90 mb-1">
                      <span>Email address <span className="text-amber-400" title="Mandatory field">*</span></span>
                      <span className="text-[10px] text-white/40 font-normal">Required</span>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      aria-required="true"
                    />
                  </label>
                  <label>
                    <span className="flex items-center justify-between text-xs font-semibold text-[#f6ede2]/90 mb-1">
                      <span>ZIP code <span className="text-amber-400" title="Mandatory field">*</span></span>
                      <span className="text-[10px] text-white/40 font-normal">5 digits</span>
                    </span>
                    <input
                      value={zip}
                      onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="30301"
                      pattern="[0-9]{5}"
                      required
                      aria-required="true"
                    />
                  </label>
                  <button className="btn-amber" type="submit" disabled={submitting}>
                    {submitting ? 'Registering...' : 'Join Priority Waitlist'}
                  </button>
                </form>
              )}
              {error && <p className="waitlist-error" role="alert">{error}</p>}
              <p className="text-[11px] text-white/40 mt-3">
                No marketing spam. Only expansion and local opening notifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
