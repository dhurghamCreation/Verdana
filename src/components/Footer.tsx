import Icon from './Icon';

function go(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 90;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
  }
}

type LinkDef = { label: string; action: () => void };

function shop(category: string) {
  window.dispatchEvent(new CustomEvent('verdana:catalog-category', { detail: category }));
  go('shop');
}

function policy(tab: string) {
  window.dispatchEvent(new CustomEvent('verdana:policy', { detail: tab }));
  go('policies');
}

export default function Footer({
  onDoctorOpen,
  onTrackOrderOpen,
  onSupportOpen,
  onOpenPdfGuide,
  onOpenCareers,
  onOpenDnsDiagnostic,
}: {
  onDoctorOpen: () => void;
  onTrackOrderOpen: () => void;
  onSupportOpen?: () => void;
  onOpenPdfGuide?: () => void;
  onOpenCareers?: () => void;
  onOpenDnsDiagnostic?: () => void;
}) {
  const year = new Date().getFullYear();

  const collectionsLinks: LinkDef[] = [
    { label: 'All Specimens', action: () => shop('All') },
    { label: 'Tropical Aroids', action: () => shop('Tropical') },
    { label: 'Air Purifying', action: () => shop('Air Purifying') },
    { label: 'Statement Trees', action: () => shop('Statement') },
    { label: 'Hanging & Trailing', action: () => shop('Hanging') },
    { label: 'Rare Collector Drops', action: () => shop('New Arrivals') },
  ];

  const companyLinks: LinkDef[] = [
    { label: 'Our Story & Greenhouse', action: () => go('about') },
    { label: 'Careers & Culture', action: () => go('careers') },
    {
      label: 'Apply for Positions (In-App)',
      action: onOpenCareers || (() => window.dispatchEvent(new CustomEvent('verdana:open-careers'))),
    },
    { label: 'Press & Media Relations', action: () => go('press') },
    {
      label: 'Verified Press Desk (press@)',
      action: () => window.dispatchEvent(new CustomEvent('verdana:open-support', { detail: { department: 'press' } })),
    },
    {
      label: 'Outlook DNS Delivery Notice',
      action: onOpenDnsDiagnostic || (() => window.dispatchEvent(new CustomEvent('verdana:open-dns-diagnostic'))),
    },
    { label: 'Ethics & B Corp Score', action: () => go('ethics') },
    { label: 'Regional Delivery Map', action: () => go('regions') },
  ];

  const supportLinks: LinkDef[] = [
    { label: 'Botanist Care & Support', action: onSupportOpen || onDoctorOpen },
    { label: 'Plant Doctor Diagnostic Tool', action: onDoctorOpen },
    { label: 'Care Handbook (6-Page PDF)', action: onOpenPdfGuide || (() => go('care-guide')) },
    { label: 'Track Existing Order', action: onTrackOrderOpen },
    { label: 'Care Guides & Protocols', action: () => go('care-guide') },
    { label: '30-Day Health Guarantee', action: () => policy('returns') },
    { label: 'Climate Shipping Info', action: () => policy('shipping') },
    { label: 'Privacy Policy', action: () => policy('privacy') },
  ];

  const locationLinks: LinkDef[] = [
    { label: 'New York City Nursery', action: () => go('regions') },
    { label: 'Newark Propagation Hub', action: () => go('regions') },
    { label: 'Philadelphia Studio', action: () => go('regions') },
    { label: 'Boston Metro Service', action: () => go('regions') },
    { label: 'DC / MD / DE Corridor', action: () => go('regions') },
  ];

  return (
    <footer id="footer" style={{ background: '#042a1a', padding: 'clamp(64px, 8vh, 96px) 0 36px' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main 5-Column Grid with explicit vertical column dividing lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 pb-12 border-b border-[rgba(246,237,226,0.12)]">
          {/* Column 1: Brand & Brooklyn Nursery Hub (Span 4) with right divider line */}
          <div className="lg:col-span-4 pr-0 lg:pr-8 lg:border-r border-[rgba(246,237,226,0.14)] pb-8 lg:pb-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                padding: 0,
                marginBottom: '18px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#e28b27',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                }}
                className="hover:scale-110 shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7 3 3 8 3 13C3 18 7 21 12 21C14 21 12 18 12 15C12 12 15 9 18 9C15 6 13 3 12 3Z" fill="#073b24" />
                  <path d="M12 15C12 18 14 21 12 21C10 21 8 18 8 15C8 12 10 9 12 9C14 9 16 12 12 15Z" fill="#073b24" opacity="0.4" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#f6ede2',
                  letterSpacing: '-0.02em',
                }}
              >
                Verdana
              </span>
            </button>

            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'rgba(246,237,226,0.7)',
                marginBottom: '20px',
                maxWidth: '320px',
              }}
            >
              Artisanal indoor plants inspected by botanists, delivered in zero-plastic packaging across the Northeast.
            </p>

            {/* Nursery Contact Details Box */}
            <div
              className="p-4 rounded-2xl mb-5 space-y-2"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(246,237,226,0.12)',
                maxWidth: '320px',
              }}
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#f6ede2]">
                <Icon name="landmark" size={14} style={{ color: '#e28b27' }} />
                <span>Brooklyn Nursery · 48 Bond St, NY</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8ab89a]">
                <Icon name="sun" size={14} style={{ color: '#8ab89a' }} />
                <span>Mon–Sat: 9am–6pm ET</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#e28b27]">
                <Icon name="phone" size={14} style={{ color: '#e28b27' }} />
                <span>+1 (718) 555-0143</span>
              </div>
              {onSupportOpen && (
                <button
                  type="button"
                  onClick={onSupportOpen}
                  className="mt-2 w-full py-1.5 px-3 rounded-lg bg-[#e28b27]/20 border border-[#e28b27]/40 text-xs font-semibold text-[#e28b27] hover:bg-[#e28b27] hover:text-[#073b24] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Icon name="heart" size={12} />
                  <span>Contact Care Team · Instant Ticket</span>
                </button>
              )}
            </div>

            {/* Certified B Corp Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Certified B Corporation · Score 91.4</span>
            </div>
          </div>

          {/* Column 2: Collections (Span 2) with vertical divider lines */}
          <div className="lg:col-span-2 px-0 md:px-6 lg:px-8 border-t md:border-t-0 md:border-r border-[rgba(246,237,226,0.14)] pt-6 md:pt-0">
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#e28b27',
                marginBottom: '18px',
                marginTop: 0,
              }}
            >
              Collections
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
              }}
            >
              {collectionsLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="footer-link text-left"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(246,237,226,0.65)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (Span 2) with vertical divider lines */}
          <div className="lg:col-span-2 px-0 md:px-6 lg:px-8 border-t md:border-t-0 md:border-r border-[rgba(246,237,226,0.14)] pt-6 md:pt-0">
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#e28b27',
                marginBottom: '18px',
                marginTop: 0,
              }}
            >
              Company
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
              }}
            >
              {companyLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="footer-link text-left"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(246,237,226,0.65)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support (Span 2) with vertical divider lines */}
          <div className="lg:col-span-2 px-0 md:px-6 lg:px-8 border-t md:border-t-0 md:border-r border-[rgba(246,237,226,0.14)] pt-6 md:pt-0">
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#e28b27',
                marginBottom: '18px',
                marginTop: 0,
              }}
            >
              Support
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
              }}
            >
              {supportLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="footer-link text-left"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(246,237,226,0.65)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Locations (Span 2) */}
          <div className="lg:col-span-2 pl-0 md:pl-6 lg:pl-8 border-t md:border-t-0 pt-6 md:pt-0">
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#e28b27',
                marginBottom: '18px',
                marginTop: 0,
              }}
            >
              Locations
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
              }}
            >
              {locationLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="footer-link text-left"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(246,237,226,0.65)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Badges, Privacy Links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '28px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(246,237,226,0.45)',
              margin: 0,
            }}
          >
            © {year} Verdana Plants, Inc. · Certified B Corporation · 100% Carbon-Neutral Delivery
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">VISA</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">MC</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">AMEX</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">APPLE PAY</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">GOOGLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
