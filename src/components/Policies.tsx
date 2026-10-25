import { useEffect, useState } from 'react';
import Icon, { type IconName } from './Icon';

const tabs = [
  {
    id: 'returns',
    label: 'Returns & Guarantee',
    icon: 'return' as IconName,
    content: {
      title: '30-Day Plant Health Guarantee',
      lead: 'We stand behind every botanical specimen we deliver. If your plant arrives stressed or fails to thrive within 30 days under proper care, we replace it completely or issue a full refund.',
      sections: [
        {
          heading: "What's Protected",
          items: [
            'Transit leaf breakage or crushed stems',
            'Cold or heat shock occurring during climate transport',
            'Pre-existing root pathogens or nursery pests',
            'Incorrect plant variety delivered',
            'Failure to establish within 30 days under recommended light and watering',
          ],
        },
        {
          heading: 'Filing a Guarantee Claim',
          items: [
            'Email care@verdanaplants.com or open our online chat',
            'Include your order number (e.g. VRD-XXXXXX) and 2 clear photos',
            'Our botanical team assesses the specimen within 24 hours',
            'Replacements are dispatched free of charge via express transit',
            'No cumbersome return shipping required for live plants',
          ],
        },
        {
          heading: 'Exceptions',
          items: [
            'Severe drought or sub-zero freezing exposure caused after delivery',
            'Repotting into unsuitable non-draining containers within first 14 days',
            'Claims submitted outside the 30-day window',
          ],
        },
      ],
    },
  },
  {
    id: 'shipping',
    label: 'Shipping Policy',
    icon: 'package' as IconName,
    content: {
      title: 'Climate-Controlled Delivery',
      lead: 'We ship Monday through Thursday using insulated boxes to ensure live roots never sit frozen or overheated in courier transit.',
      sections: [
        {
          heading: 'Transit Speeds',
          items: [
            'NY & NJ Metro: Next-day delivery available (order by 1pm ET)',
            'CT, MA, RI, PA, DE, MD, DC: 2–3 business days transit',
            'Climate insulated winter packaging with 72-hour thermal packs',
            'Real-time courier SMS updates with 2-hour arrival window',
          ],
        },
        {
          heading: 'Shipping Rates',
          items: [
            'Free Standard Delivery on all orders over $75',
            'Flat $9.95 standard shipping on orders under $75',
            'Zero handling or nursery packaging fees',
            'Carbon offsets retired quarterly with verified audit certificates',
          ],
        },
        {
          heading: 'Upon Arrival',
          items: [
            'Carefully slice exterior box tape without puncturing inner wraps',
            'Remove compostable root pouch and place in indirect light',
            'Check soil hydration; hydrate with 1 cup of room-temp water if dry',
          ],
        },
      ],
    },
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    icon: 'lock' as IconName,
    content: {
      title: 'Privacy & Data Protection',
      lead: 'We collect only what is strictly necessary to deliver plants and provide clinical care. We never sell or broker customer data to third-party ad networks.',
      sections: [
        {
          heading: 'Collected Information',
          items: [
            'Name, delivery address, and contact info for order fulfillment',
            'Saved wishlist plants and customized plant care reminders',
            'Payment details tokenized through secure industry-standard processors',
          ],
        },
        {
          heading: 'How We Protect You',
          items: [
            '256-bit SSL encryption on all API and checkout interactions',
            'Zero storage of raw credit card numbers or security codes',
            'Instant account data deletion upon user request',
          ],
        },
        {
          heading: 'Your Rights',
          items: [
            'Export your complete profile, orders, and diagnostic logs anytime',
            'Unsubscribe from newsletter or waitlists with a single click',
            'Contact our Data Officer at privacy@verdanaplants.com',
          ],
        },
      ],
    },
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    icon: 'clipboard' as IconName,
    content: {
      title: 'Terms & Botanical Agreement',
      lead: 'Plain-language commitments regarding ordering, plant provenance, and nursery guarantees.',
      sections: [
        {
          heading: 'Order Placement',
          items: [
            'Prices are in USD and reflect live specimen availability',
            'Orders may be adjusted or cancelled prior to nursery packaging',
            'Promotional codes (like GROW15) apply to first-time orders',
          ],
        },
        {
          heading: 'Living Goods Nature',
          items: [
            'Plants are living organisms; natural leaf size, variegation, and shape will vary delightfully from photos',
            'Measurements represent healthy nursery averages from pot base to crown',
            'Toxicity notes must be observed regarding household pets',
          ],
        },
        {
          heading: 'Account & Service',
          items: [
            'All intellectual property and botanical photography belong to Verdana Plants, Inc.',
            'Disputes are resolved amicably through our dedicated customer advocacy team in Brooklyn, NY',
          ],
        },
      ],
    },
  },
];

export default function Policies() {
  const [active, setActive] = useState('returns');
  const tab = tabs.find(t => t.id === active)!;

  useEffect(() => {
    const selectPolicy = (event: Event) => {
      const policy = (event as CustomEvent<string>).detail;
      if (tabs.some(t => t.id === policy)) setActive(policy);
    };
    window.addEventListener('verdana:policy', selectPolicy);
    return () => window.removeEventListener('verdana:policy', selectPolicy);
  }, []);

  return (
    <section id="policies" style={{ background: '#f6ede2', padding: 'clamp(80px, 12vh, 130px) 0' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5a8a6a',
            }}
          >
            Clear Guarantees &amp; Terms
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(34px, 4.5vw, 50px)',
              fontWeight: 700,
              color: '#073b24',
              marginTop: '12px',
              marginBottom: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Our <em style={{ fontStyle: 'italic', fontWeight: 300 }}>policies</em>
          </h2>
        </div>

        {/* Tab navigation */}
        <div
          className="reveal flex flex-wrap gap-1 border-b border-[rgba(7,59,36,0.12)] mb-10"
        >
          {tabs.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              style={{
                padding: '12px 20px',
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                color: active === t.id ? '#073b24' : '#8ab89a',
                borderBottom: `2.5px solid ${active === t.id ? '#e28b27' : 'transparent'}`,
                marginBottom: '-2px',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              <span className="inline-flex items-center gap-2">
                <Icon name={t.icon} size={15} />
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content with stable min-height */}
        <div className="min-h-[460px] transition-opacity">
          <h3
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 700,
              color: '#073b24',
              margin: '0 0 14px',
            }}
          >
            {tab.content.title}
          </h3>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: '#5a8a6a',
              margin: '0 0 36px',
              maxWidth: '680px',
            }}
          >
            {tab.content.lead}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {tab.content.sections.map((sec, i) => (
              <div
                key={sec.heading}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1.5px solid rgba(7,59,36,0.08)',
                  animation: `cardAppear 0.45s ease ${i * 0.08}s both`,
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#073b24',
                    margin: '0 0 16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(7,59,36,0.08)',
                  }}
                >
                  {sec.heading}
                </h4>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {sec.items.map(item => (
                    <li key={item} className="flex gap-2.5 items-start text-xs text-[#5a8a6a] leading-relaxed">
                      <span className="text-[#e28b27] flex-shrink-0 mt-0.5">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="mt-8 p-4 bg-white/70 rounded-2xl border border-[rgba(7,59,36,0.08)] flex items-center justify-between text-xs text-[#5a8a6a]"
          >
            <span>
              Need clarification on a policy?{' '}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('verdana:open-support'))}
                className="font-bold text-[#073b24] underline hover:text-[#e28b27] cursor-pointer"
              >
                Open Botanist Care Dispatch
              </button>{' '}
              for instant ticket generation, or consult our plant care team Mon–Sat.
            </span>
            <span className="font-bold text-[#073b24] hidden sm:inline">
              +1 (718) 555-0143
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
