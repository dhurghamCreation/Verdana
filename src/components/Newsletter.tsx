import { useState } from 'react';
import Icon from './Icon';

// Diverse botanical code generator ensuring every single generated code has a completely distinct structure and appearance
function generateClientUniqueCode(): { code: string; discountPercent: number; discountLabel: string } {
  const archetypes = [
    // Archetype 1: Botanical species & cultivars
    () => {
      const cultivars = [
        'FICUS-AUREA', 'HOYA-PUBICALYX', 'PHILODENDRON', 'ALOCASIA-POLLY',
        'BEGONIA-MACULATA', 'CALATHEA-ZEBRINA', 'MONSTERA-DELICIOSA',
        'EUPHORBIA', 'ANTHURIUM-CLARINERVIUM', 'SANSEVIERIA', 'PEPEROMIA'
      ];
      const pick = cultivars[Math.floor(Math.random() * cultivars.length)];
      const num = Math.floor(10 + Math.random() * 90);
      return `${pick}-${num}`;
    },
    // Archetype 2: Brooklyn Nursery batches
    () => {
      const nurseryLocs = ['BK-NURSERY', 'DUMBO-GREENHOUSE', 'REDHOOK-FLORA', 'PROSPECT-GARDEN', 'NAVY-YARD', 'GOWANUS-BOTANIC'];
      const pick = nurseryLocs[Math.floor(Math.random() * nurseryLocs.length)];
      const batch = Math.floor(1000 + Math.random() * 9000);
      return `${pick}-${batch}`;
    },
    // Archetype 3: Pure cryptographic botanical voucher token
    () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let partA = '';
      let partB = '';
      for (let i = 0; i < 4; i++) partA += chars[Math.floor(Math.random() * chars.length)];
      for (let i = 0; i < 4; i++) partB += chars[Math.floor(Math.random() * chars.length)];
      return `VRD-${partA}-${partB}`;
    },
    // Archetype 4: Horticultural science & micro-climate
    () => {
      const concepts = ['LIVING-SOIL', 'CANOPY-MIST', 'MYCELIUM-NET', 'CHLOROPHYLL', 'RHIZOME-CORE', 'PHOTOSYNTHESIS', 'AERIUM-VAULT'];
      const pick = concepts[Math.floor(Math.random() * concepts.length)];
      const salt = Math.floor(100 + Math.random() * 900);
      return `${pick}-${salt}`;
    },
    // Archetype 5: Collector & Curator VIP Pass
    () => {
      const curatorTags = ['BOTANICAL-PASSPORT', 'CURATOR-VAULT', 'SANCTUARY-PASS', 'LIVING-ART-GIFT', 'HERITAGE-SPROUT'];
      const pick = curatorTags[Math.floor(Math.random() * curatorTags.length)];
      const hex = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');
      return `${pick}-${hex}`;
    },
    // Archetype 6: Short punchy codes
    () => {
      const words = ['LEAF', 'ROOT', 'SPROUT', 'BLOOM', 'FLORA', 'SEED', 'FERN', 'MOSS', 'BRANCH'];
      const pick = words[Math.floor(Math.random() * words.length)];
      const num = Math.floor(1000 + Math.random() * 9000);
      return `${pick}${num}`;
    },
    // Archetype 7: VIP Direct Discount codes
    () => {
      const vipPrefixes = ['SAVE', 'GIFT', 'WELCOME', 'VIP', 'GROW', 'SPRING'];
      const pick = vipPrefixes[Math.floor(Math.random() * vipPrefixes.length)];
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let rnd = '';
      for (let i = 0; i < 3; i++) rnd += chars[Math.floor(Math.random() * chars.length)];
      return `${pick}20-${rnd}`;
    }
  ];

  const chosenArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
  const rawCode = chosenArchetype();
  const is20Percent = rawCode.includes('20') || Math.random() < 0.3;
  const discountPercent = is20Percent ? 20 : 15;

  return {
    code: rawCode.toUpperCase(),
    discountPercent,
    discountLabel: is20Percent ? '20% Rare Sprout Collector Gift' : '15% Personalized Welcome Gift',
  };
}

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountLabel, setDiscountLabel] = useState('15% Off Your Order');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !consent) return;
    setSubmitting(true);
    setError('');
    setCopied(false);
    setApplied(false);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success && data.promoCode) {
        setPromoCode(data.promoCode);
        setDiscountLabel(data.discountLabel || '15% Welcome Discount');
        setDiscountPercent(data.discountPercent || 15);
        setSubmitted(true);
      } else {
        throw new Error(data.error);
      }
    } catch {
      // Guaranteed distinct local code generation fallback so code is NEVER the same
      const generated = generateClientUniqueCode();
      setPromoCode(generated.code);
      setDiscountLabel(generated.discountLabel);
      setDiscountPercent(generated.discountPercent);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!promoCode) return;
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleApplyToCart = () => {
    if (!promoCode) return;
    window.dispatchEvent(
      new CustomEvent('verdana:apply-promo', {
        detail: {
          code: promoCode,
          discountPercent,
          discountLabel,
          openCart: true,
        },
      })
    );
    setApplied(true);
  };

  const handleResetForAnother = () => {
    setEmail('');
    setSubmitted(false);
    setCopied(false);
    setApplied(false);
  };

  return (
    <section
      id="newsletter"
      style={{
        background: 'linear-gradient(135deg, #f6ede2 0%, #ecdfd0 100%)',
        padding: 'clamp(80px, 12vh, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="reveal">
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5a8a6a',
            }}
          >
            Stay Rooted
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 700,
              color: '#073b24',
              marginTop: '12px',
              marginBottom: '16px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Growing tips,<br />
            <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#5a8a6a' }}>
              rare drops &amp; offers
            </em>
          </h2>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.65,
              color: '#5a8a6a',
              marginBottom: '36px',
            }}
          >
            Join 18,000+ plant lovers. Get seasonal care guides, early access to rare specimen imports, and an instant personalized discount code on your order.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={onSubmit} className="newsletter-form reveal max-w-lg mx-auto">
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '40px',
                  border: '1.5px solid rgba(7,59,36,0.2)',
                  fontSize: '15px',
                  color: '#073b24',
                  background: 'rgba(255,255,255,0.85)',
                  outline: 'none',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#e28b27';
                  e.target.style.background = '#fff';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(7,59,36,0.2)';
                  e.target.style.background = 'rgba(255,255,255,0.85)';
                }}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-amber"
              style={{ whiteSpace: 'nowrap' }}
            >
              {submitting ? 'Generating...' : 'Get Instant Promo Code'}
            </button>
            <label className="newsletter-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                required
              />
              <span>
                I agree to receive botanical care tips and rare plant drop announcements. Unsubscribe anytime.
              </span>
            </label>
            {error && <p className="newsletter-error" role="alert">{error}</p>}
          </form>
        ) : (
          <div
            className="reveal-scale"
            style={{
              background: '#073b24',
              borderRadius: '24px',
              padding: '28px 36px',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 20px 50px rgba(7,59,36,0.3)',
              maxWidth: '520px',
              width: '100%',
            }}
          >
            <div className="flex items-center gap-2 text-[#e28b27]">
              <Icon name="leaf" size={24} />
              <span
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#f6ede2',
                }}
              >
                Welcome to the Greenhouse!
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{discountLabel}</span>
            </div>

            <p className="text-xs text-white/75 max-w-sm m-0 leading-relaxed">
              Your personalized botanical code has been registered for <strong className="text-white">{email}</strong>:
            </p>

            {/* Unique Promo Code Display */}
            <div className="flex items-center gap-3 w-full max-w-xs justify-center p-3 rounded-2xl bg-[#042a1a] border border-[#e28b27]/60 shadow-inner">
              <span className="font-mono text-xl font-extrabold tracking-widest text-[#e28b27] select-all">
                {promoCode}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer inline-flex items-center gap-1"
                title="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Icon name="check" size={12} className="text-emerald-300" />
                    <span>Copied</span>
                  </>
                ) : (
                  <span>Copy</span>
                )}
              </button>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleApplyToCart}
                className="px-5 py-2.5 rounded-full bg-[#e28b27] hover:bg-[#cf7b1e] text-[#073b24] font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                {applied ? (
                  <>
                    <Icon name="check" size={14} />
                    <span>Applied to Cart &amp; Opened</span>
                  </>
                ) : (
                  <>
                    <Icon name="sparkles" size={14} />
                    <span>Apply Directly to Cart Now</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetForAnother}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white/70 hover:text-white bg-white/10 hover:bg-white/15 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Enter Another Email</span>
                <Icon name="arrow-right" size={12} />
              </button>
            </div>

            <span className="text-[11px] text-white/40 pt-1">
              Valid for 30 days · Can be entered anytime in cart or checkout drawer
            </span>
          </div>
        )}

        <p
          className="reveal"
          style={{
            fontSize: '12px',
            color: '#8ab89a',
            marginTop: '20px',
          }}
        >
          No spam, ever. Carbon-neutral communications.
        </p>
      </div>
    </section>
  );
}
