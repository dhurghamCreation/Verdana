export default function AnnouncementBar() {
  return (
    <div
      style={{ backgroundColor: '#073b24', overflow: 'hidden' }}
      className="w-full py-2 flex items-center relative z-50 border-b border-[rgba(246,237,226,0.08)]"
    >
      <div className="marquee-track">
        {[0, 1].map(i => (
          <div key={i} className="flex items-center gap-12 px-6">
            <span
              className="text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap"
              style={{ color: '#f6ede2' }}
            >
              Delivery Areas Expanded!{' '}
              <span style={{ color: '#e28b27', fontWeight: 700 }}>
                NY &amp; NJ + DC, PA, DE, MD, CT, MA, and RI
              </span>
            </span>
            <span
              className="text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap"
              style={{ color: '#f6ede2' }}
            >
              Free Delivery on orders over{' '}
              <span style={{ color: '#e28b27', fontWeight: 700 }}>$75</span>
            </span>
            <span
              className="text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap"
              style={{ color: '#f6ede2' }}
            >
              Expert plant doctor diagnosis{' '}
              <span style={{ color: '#e28b27', fontWeight: 700 }}>Online 7 Days</span>
            </span>
            <span
              className="text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap"
              style={{ color: '#f6ede2' }}
            >
              Use code <strong style={{ color: '#e28b27' }}>GROW15</strong> for 15% off first order
            </span>
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: '#e28b27' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
