import { useState, useEffect } from 'react';
import Icon from './Icon';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
  onAccountOpen: () => void;
  onTrackOrderOpen: () => void;
  onDoctorOpen: () => void;
  onSupportOpen?: () => void;
  onOpenPdfGuide?: () => void;
  userName: string | null;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onCartOpen,
  onSearchOpen,
  onAccountOpen,
  onTrackOrderOpen,
  onDoctorOpen,
  onSupportOpen,
  onOpenPdfGuide,
  userName,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (targetId: string) => {
    const cleanId = targetId.replace('#', '');
    const el = document.getElementById(cleanId);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  // Strictly organized in continuous top-to-bottom reading order
  const links = [
    { label: 'Shop', id: 'shop' },
    { label: 'Our Story', id: 'about' },
    { label: 'Care Guides', id: 'care-guide' },
    { label: 'Ethics', id: 'ethics' },
    { label: 'Regions', id: 'regions' },
    { label: 'Press', id: 'press' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '36px',
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(7,59,36,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(246,237,226,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group bg-transparent border-0 p-0 cursor-pointer"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
            style={{ background: '#e28b27' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7 3 3 8 3 13C3 18 7 21 12 21C14 21 12 18 12 15C12 12 15 9 18 9C15 6 13 3 12 3Z" fill="#073b24" />
              <path d="M12 15C12 18 14 21 12 21C10 21 8 18 8 15C8 12 10 9 12 9C14 9 16 12 12 15Z" fill="#073b24" opacity="0.4" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '22px',
              fontWeight: 700,
              color: '#f6ede2',
              letterSpacing: '-0.02em',
            }}
          >
            Verdana
          </span>
        </button>

        {/* Desktop Nav Links in Top-to-Bottom Logical Order */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(link => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="nav-link text-sm font-medium bg-transparent border-0 p-0 cursor-pointer"
              style={{ color: 'rgba(246,237,226,0.85)', letterSpacing: '0.02em' }}
            >
              {link.label}
            </button>
          ))}
          {/* Plant Doctor Pill */}
          <button
            onClick={onDoctorOpen}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(226,139,39,0.18)',
              border: '1px solid rgba(226,139,39,0.4)',
              color: '#e28b27',
              cursor: 'pointer',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e28b27] animate-pulse" />
            Plant Doctor
          </button>
          {onOpenPdfGuide && (
            <button
              onClick={onOpenPdfGuide}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(138,184,154,0.18)',
                border: '1px solid rgba(138,184,154,0.4)',
                color: '#8ab89a',
                cursor: 'pointer',
              }}
              title="Open Official Care Handbook PDF"
            >
              <Icon name="book" size={13} />
              Care PDF
            </button>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={onSearchOpen}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:bg-white/10"
            style={{ color: '#f6ede2', cursor: 'pointer' }}
            aria-label="Search Catalog"
            title="Search plants"
          >
            <Icon name="search" size={17} />
          </button>

          {/* Track Order Trigger */}
          <button
            onClick={onTrackOrderOpen}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10"
            style={{ color: 'rgba(246,237,226,0.85)', border: '1px solid rgba(246,237,226,0.15)', cursor: 'pointer' }}
            title="Track Your Order"
          >
            <Icon name="truck" size={14} />
            <span>Track</span>
          </button>

          {/* Account / Sign In */}
          <button
            onClick={onAccountOpen}
            className="flex items-center gap-2 rounded-full transition-all duration-200 hover:bg-white/10 px-2.5 py-1.5"
            style={{ color: '#f6ede2', cursor: 'pointer' }}
            aria-label={userName ? `Account for ${userName}` : 'Sign in'}
            title={userName ? `Signed in as ${userName}` : 'Sign In'}
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#e28b27]">
              {userName ? userName.charAt(0).toUpperCase() : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4.2 3.5-6.3 8-6.3s7.2 2.1 8 6.3"/>
                </svg>
              )}
            </div>
            {userName && (
              <span className="hidden md:inline text-xs font-semibold max-w-[90px] truncate">
                {userName}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onCartOpen}
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-white/10"
            style={{ color: '#f6ede2', cursor: 'pointer' }}
            aria-label={`Cart (${cartCount} items)`}
          >
            <Icon name="package" size={20} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 rounded-full text-[10px] font-bold flex items-center justify-center shadow"
                style={{
                  background: '#e28b27',
                  color: '#073b24',
                  minWidth: '19px',
                  height: '19px',
                  padding: '0 4px',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button with high-contrast visible X and running red hover */}
          <button
            className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ml-1 ${
              menuOpen
                ? 'close-red-hover modal-close-btn bg-white/20 text-white border border-white/30'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            title={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <div className="flex flex-col gap-1 w-5 items-end">
                <span className="block w-5 h-0.5 bg-[#f6ede2] rounded-full" />
                <span className="block w-3.5 h-0.5 bg-[#f6ede2] rounded-full" />
                <span className="block w-5 h-0.5 bg-[#f6ede2] rounded-full" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(7,59,36,0.98)',
            backdropFilter: 'blur(28px)',
            borderTop: '1px solid rgba(246,237,226,0.12)',
            maxHeight: 'calc(100vh - 100px)',
          }}
          className="lg:hidden px-6 pt-5 pb-12 flex flex-col gap-4 shadow-2xl overflow-y-auto"
        >
          {/* Mobile Drawer Header with Explicit Close X Window Button */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#e28b27] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7 3 3 8 3 13C3 18 7 21 12 21C14 21 12 18 12 15C12 12 15 9 18 9C15 6 13 3 12 3Z" fill="#073b24" />
                </svg>
              </div>
              <span className="font-serif font-bold text-base text-[#f6ede2]">Verdana Navigation</span>
            </div>

            {/* Explicit Close X Window button with Running Red Hover */}
            <button
              onClick={() => setMenuOpen(false)}
              className="modal-close-btn close-red-hover w-9 h-9 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center font-bold text-base cursor-pointer"
              aria-label="Close menu window"
              title="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links in Strict Top-to-Bottom Sequence */}
          <div className="flex flex-col gap-3 pt-2">
            {links.map((link, idx) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(link.id);
                }}
                className="flex items-center justify-between text-lg font-medium text-[#f6ede2] hover:text-[#e28b27] transition-colors text-left bg-transparent border-0 p-1 cursor-pointer"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                <span>{link.label}</span>
                <span className="text-xs text-white/40 font-mono">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="h-px bg-white/10 my-1" />

          {/* Utility Tools */}
          <div className="space-y-2.5">
            <button
              onClick={() => { setMenuOpen(false); onDoctorOpen(); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-left text-[#e28b27] font-semibold text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#e28b27]/20 flex items-center justify-center text-[#e28b27]">
                <Icon name="stethoscope" size={16} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#e28b27]">Plant Doctor Diagnostic Tool</div>
                <div className="text-[11px] text-white/60">Triage sick leaves &amp; root health</div>
              </div>
            </button>

            <button
              onClick={() => { setMenuOpen(false); onTrackOrderOpen(); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-left text-cream font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#f6ede2]">
                <Icon name="truck" size={16} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#f6ede2]">Track Existing Order</div>
                <div className="text-[11px] text-white/60">Live courier &amp; climate transit status</div>
              </div>
            </button>

            {onSupportOpen && (
              <button
                onClick={() => { setMenuOpen(false); onSupportOpen(); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-left text-cream font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                  <Icon name="heart" size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-300">Botanist Care &amp; Support Clinic</div>
                  <div className="text-[11px] text-white/60">Verified direct message dispatch</div>
                </div>
              </button>
            )}

            {onOpenPdfGuide && (
              <button
                onClick={() => { setMenuOpen(false); onOpenPdfGuide(); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-left text-cream font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#8ab89a]/20 flex items-center justify-center text-[#8ab89a]">
                  <Icon name="book" size={16} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#8ab89a]">Botanical Field Guide &amp; Care PDF</div>
                  <div className="text-[11px] text-white/60">6-page compendium &amp; 30-day guarantee</div>
                </div>
              </button>
            )}
          </div>

          {/* Brilliant Alignment: Search Plants & Care Pill Card with Generous Bottom Cushioning */}
          <div className="pt-2 pb-8">
            <button
              onClick={() => {
                setMenuOpen(false);
                onSearchOpen();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-between text-sm text-[#f6ede2] hover:bg-white/15 hover:border-[#e28b27] transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#e28b27]/25 flex items-center justify-center text-[#e28b27] group-hover:bg-[#e28b27] group-hover:text-[#073b24] transition-colors">
                  <Icon name="search" size={16} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm text-[#f6ede2]">Search Plants &amp; Care</div>
                  <div className="text-[11px] text-white/60">Find specimens by lighting, size, or room</div>
                </div>
              </div>
              <span className="text-xs text-[#e28b27] font-semibold group-hover:translate-x-1 transition-transform">
                Explore →
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
