import { useState } from 'react';
import Icon from './Icon';
import { downloadCareGuidePdf } from '../utils/generateBotanicalPdf';

interface PressProps {
  onOpenPressInquiry?: () => void;
  onOpenPdfGuide?: () => void;
  onOpenDnsDiagnostic?: () => void;
}

const coverage = [
  {
    publication: 'The New York Times',
    headline: 'The Plant Shop Redefining What Premium Delivery Looks Like',
    date: 'March 2026',
    category: 'Feature',
    excerpt: "Verdana's obsessive attention to packaging and plant health has made it the go-to source for rare indoor plants along the Eastern seaboard.",
  },
  {
    publication: 'Apartment Therapy',
    headline: 'We Ordered From 12 Online Plant Shops. One Stood Far Above the Rest.',
    date: 'January 2026',
    category: 'Review',
    excerpt: 'Every single plant arrived in flawless condition. The care card included with each order was more comprehensive than most gardening books.',
  },
  {
    publication: 'Architectural Digest',
    headline: 'The 8 Best Plant Delivery Services, According to Interior Designers',
    date: 'November 2025',
    category: 'Roundup',
    excerpt: 'Verdana is the only service we recommend for rare statement plants. Their 30-day quality guarantee is the gold standard.',
  },
  {
    publication: 'Domino',
    headline: "Brooklyn's Best-Kept Botanical Secret Is Now Shipping Regionwide",
    date: 'September 2025',
    category: 'Feature',
    excerpt: 'What started as a neighborhood greenhouse has grown into one of the most respected plant retailers on the East Coast.',
  },
  {
    publication: 'HGTV Digital',
    headline: 'How to Build a Plant-Forward Interior on Any Budget',
    date: 'July 2025',
    category: 'Guide',
    excerpt: "Verdana's curated starter collections make it easy to build a cohesive indoor jungle without guessing care routines.",
  },
  {
    publication: 'Fast Company',
    headline: "This Plant Startup Is Proving Sustainability and Premium Retail Aren't Mutually Exclusive",
    date: 'May 2025',
    category: 'Business',
    excerpt: 'From 100% biodegradable packaging to fair-trade grower agreements, Verdana walks the talk on environmental stewardship.',
  },
];

const categoryColor: Record<string, string> = {
  Feature: '#e28b27',
  Review: '#5a8a6a',
  Roundup: '#4a90c4',
  Guide: '#8ab89a',
  Business: '#f0a84a',
};

export default function Press({
  onOpenPressInquiry,
  onOpenPdfGuide,
  onOpenDnsDiagnostic,
}: PressProps) {
  const [filter, setFilter] = useState('All');
  const [showFactSheet, setShowFactSheet] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const cats = ['All', 'Feature', 'Review', 'Roundup', 'Guide', 'Business'];

  const filtered = filter === 'All' ? coverage : coverage.filter(c => c.category === filter);

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    try {
      downloadCareGuidePdf();
    } finally {
      setTimeout(() => setDownloadingPdf(false), 800);
    }
  };

  const handlePressAction = () => {
    if (onOpenPressInquiry) {
      onOpenPressInquiry();
    } else {
      window.dispatchEvent(new CustomEvent('verdana:open-support', { detail: { department: 'press' } }));
    }
  };

  return (
    <section id="press" style={{ background: '#073b24', padding: 'clamp(80px, 12vh, 130px) 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 reveal">
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#e28b27',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            Newsroom &amp; Media Relations
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              color: '#f6ede2',
              margin: '0 0 16px',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}
          >
            Verdana in the{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#8ab89a' }}>
              press &amp; media
            </em>
          </h2>
          <p className="text-base text-white/75 leading-relaxed m-0">
            Official press contacts, specimen loan desk, verified editorial assets, and media kit downloads for journalists and curators.
          </p>
        </div>

        {/* TOP: Dedicated Newsroom & Media Relations Desk (Moved to TOP as requested!) */}
        <div
          className="reveal mb-14"
          style={{
            background: 'linear-gradient(135deg, rgba(4,42,26,0.95), rgba(7,59,36,0.92), rgba(4,42,26,0.98))',
            border: '2px solid rgba(226,139,39,0.4)',
            borderRadius: '28px',
            padding: 'clamp(24px, 4vw, 42px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Dispatch desk and actions */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e28b27]/20 border border-[#e28b27]/40 text-[#e28b27] text-xs font-bold uppercase tracking-wider">
                  <Icon name="mail" size={13} /> Official Media Inquiries Desk
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                  press@verdanaplants.com (Active In-App)
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f6ede2] mb-3 leading-tight">
                For Press Inquiries, Photoshoots &amp; Founder Interviews
              </h3>

              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Are you a journalist, interior editor, or stylist? Our media relations team arranges executive commentary with Dr. Lena Marsh, specimen loans for architectural photo shoots, and provides vector press assets with instant ticket confirmation.
              </p>

              {/* Action buttons at TOP */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={handlePressAction}
                  className="btn-amber text-xs py-3 px-5 font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-transform"
                >
                  <Icon name="mail" size={16} /> Dispatch Official Press Inquiry (press@)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenPdfGuide) onOpenPdfGuide();
                    else handleDownloadPdf();
                  }}
                  className="inline-flex items-center gap-2 text-xs py-3 px-5 font-semibold text-[#f6ede2] bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all cursor-pointer shadow"
                >
                  <Icon name="book" size={15} /> Open Care Handbook PDF Reader
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={downloadingPdf}
                  className="inline-flex items-center gap-2 text-xs py-3 px-4 font-semibold text-[#e28b27] bg-[#e28b27]/15 hover:bg-[#e28b27]/25 border border-[#e28b27]/30 rounded-full transition-colors cursor-pointer"
                >
                  <Icon name="truck" size={14} />
                  {downloadingPdf ? 'Compiling PDF...' : 'Download Field Guide (.pdf)'}
                </button>
              </div>

              {/* DNS Notice regarding Outlook external bounce */}
              <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white/75 flex items-start gap-3">
                <span className="text-[#e28b27] text-base leading-none font-bold">ℹ</span>
                <div className="flex-1">
                  <strong className="text-[#e28b27]">Direct Server Dispatch Guarantee:</strong> Submitting inquiries via this web portal routes directly to our Brooklyn media directors with instant <span className="font-mono text-white font-bold">VRD-PRESS</span> ticket receipts, bypassing external DNS mail client drops (e.g. Outlook bounce errors).
                  {onOpenDnsDiagnostic && (
                    <button
                      type="button"
                      onClick={onOpenDnsDiagnostic}
                      className="ml-2 text-[#8ab89a] underline hover:text-white cursor-pointer font-semibold"
                    >
                      Why did external Outlook bounce?
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Media Press Assets Box */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#e28b27] mb-1">
                Verified Press Downloads &amp; Fact Sheets
              </div>

              {/* 6-Page Care Guide PDF Card */}
              <div
                onClick={() => {
                  if (onOpenPdfGuide) onOpenPdfGuide();
                  else handleDownloadPdf();
                }}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#e28b27]/50 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#e28b27] text-[#073b24] font-bold text-xs flex items-center justify-center shrink-0 shadow">
                    PDF
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Botanical Care Field Dossier</div>
                    <div className="text-xs text-white/60">6-Page 2026 Edition · Vector 300 DPI · Stamped</div>
                  </div>
                </div>
                <span className="text-[#e28b27] text-sm font-bold">Open Reader →</span>
              </div>

              {/* Verified Press Kit Request Button */}
              <div
                onClick={handlePressAction}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#e28b27]/50 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#073b24] text-[#8ab89a] border border-[#8ab89a]/30 font-bold text-xs flex items-center justify-center shrink-0">
                    KIT
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">High-Res Media Photo Kit</div>
                    <div className="text-xs text-white/60">Raw TIFF photography, founders bios &amp; logos</div>
                  </div>
                </div>
                <span className="text-white/80 text-xs font-semibold">Request Access →</span>
              </div>

              {/* Corporate Fact Sheet Toggle */}
              <div
                onClick={() => setShowFactSheet(!showFactSheet)}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#8ab89a]/50 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#8ab89a] font-bold text-xs flex items-center justify-center shrink-0">
                    DOC
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Corporate Fact Sheet 2026</div>
                    <div className="text-xs text-white/60">B-Corp impact score (91.4), nursery stats &amp; team</div>
                  </div>
                </div>
                <span className="text-[#8ab89a] text-xs font-semibold">{showFactSheet ? 'Hide ↑' : 'View ↓'}</span>
              </div>
            </div>
          </div>

          {/* Quick inline fact sheet drawer */}
          {showFactSheet && (
            <div className="mt-6 p-6 bg-black/40 rounded-2xl border border-white/15 text-xs text-white/90 space-y-3 animate-fadeIn">
              <div className="flex justify-between items-center text-[#e28b27] font-bold uppercase tracking-wider">
                <span>Verdana Plants | 2026 Corporate Fact Sheet</span>
                <button
                  type="button"
                  onClick={() => setShowFactSheet(false)}
                  className="modal-close-btn close-red-hover px-2 py-0.5 rounded text-white hover:text-white cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
              <p className="leading-relaxed m-0">
                <strong>Founded:</strong> 2019 in Brooklyn, NY by Dr. Lena Marsh &amp; Marcus Vance.<br />
                <strong>Footprint:</strong> Delivery across NY, NJ, CT, MA, RI, PA, DE, MD, and Washington DC.<br />
                <strong>Certifications:</strong> B Corporation Certified (Impact Score: 91.4). 100% Carbon-Neutral Delivery. Zero single-use plastic packaging since 2024.<br />
                <strong>Direct Media Queue:</strong> press@verdanaplants.com (via Verified In-App Dispatch Desk) · Brooklyn HQ: +1 (718) 555-0143
              </p>
            </div>
          )}
        </div>

        {/* Coverage Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#f6ede2] m-0">
              Selected Press &amp; Editorial Coverage
            </h3>
            <p className="text-xs text-white/60 m-0 mt-1">
              Read what architectural journals and lifestyle publications say about Verdana.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5">
            {cats.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '40px',
                  border: '1.5px solid',
                  fontSize: '12px',
                  fontWeight: 500,
                  transition: 'all 0.25s ease',
                  borderColor: filter === c ? '#e28b27' : 'rgba(246,237,226,0.15)',
                  background: filter === c ? 'rgba(226,139,39,0.18)' : 'transparent',
                  color: filter === c ? '#e28b27' : 'rgba(246,237,226,0.65)',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Coverage Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <div
              key={item.headline}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(246,237,226,0.1)',
                borderRadius: '20px',
                padding: '26px',
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                animation: `cardAppear 0.5s ease ${i * 0.06}s both`,
              }}
              className="hover:-translate-y-1 hover:border-[#e28b27]/40 hover:bg-white/10"
            >
              <div className="flex justify-between items-start mb-3">
                <span
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '13px',
                    fontStyle: 'italic',
                    color: 'rgba(246,237,226,0.6)',
                  }}
                >
                  {item.publication}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '3px 9px',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.1)',
                    color: categoryColor[item.category] || '#e28b27',
                  }}
                >
                  {item.category}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#f6ede2',
                  margin: '0 0 10px',
                  lineHeight: 1.35,
                }}
              >
                {item.headline}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'rgba(246,237,226,0.6)',
                  margin: '0 0 14px',
                }}
              >
                {item.excerpt}
              </p>
              <span style={{ fontSize: '12px', color: '#e28b27', fontWeight: 600 }}>
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
