import { useState } from 'react';
import type { CartItem } from '../types';
import Icon from './Icon';

interface CartProps {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onBrowsePlants: () => void;
  couponCode: string;
  discountPercent?: number;
  discountLabel?: string;
  onApplyCoupon: (code: string) => Promise<boolean> | boolean;
}

export default function Cart({
  items,
  total,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onBrowsePlants,
  couponCode,
  discountPercent = 15,
  discountLabel,
  onApplyCoupon,
}: CartProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [applying, setApplying] = useState(false);

  if (!isOpen) return null;

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const discountRate = (couponCode ? discountPercent : 0) / 100;
  const discountAmount = couponCode ? Math.round(total * discountRate * 100) / 100 : 0;
  const shipping = total >= 75 || total === 0 ? 0 : 9.95;
  const finalSubtotal = Math.max(0, total - discountAmount);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim() || applying) return;
    const clean = promoInput.trim().toUpperCase();
    setApplying(true);
    setPromoMessage('');
    try {
      const success = await onApplyCoupon(clean);
      if (success) {
        setPromoMessage(`✓ Applied code ${clean}!`);
        setPromoInput('');
      } else {
        setPromoMessage('Promo code not recognized. Check spelling or get a new code in our newsletter.');
      }
    } catch {
      setPromoMessage('Unable to apply promo code right now.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(7,59,36,0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 6000,
          animation: 'overlayIn 0.25s ease forwards',
        }}
      />

      {/* Drawer Panel */}
      <div
        className="cart-panel"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(440px, 100vw)',
          background: '#f6ede2',
          zIndex: 6001,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-20px 0 80px rgba(4,42,26,0.3)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '22px 26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(7,59,36,0.1)',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: '22px',
                fontWeight: 700,
                color: '#073b24',
                margin: 0,
              }}
            >
              Your Botanical Cart
            </h2>
            <p style={{ fontSize: '12px', color: '#5a8a6a', margin: '2px 0 0' }}>
              {totalItems === 0
                ? 'Your basket is currently empty'
                : `${totalItems} living ${totalItems === 1 ? 'specimen' : 'specimens'} selected`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              data-action="cancel"
              className="btn-cancel px-3 py-1.5 rounded-full text-xs font-semibold text-[#073b24]/70 bg-white border border-[rgba(7,59,36,0.15)] transition-all cursor-pointer hover:!bg-red-600 hover:!border-red-500 hover:!text-white hover:!shadow-[0_0_14px_rgba(239,68,68,0.5)]"
              title="Cancel and close basket"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="modal-close-btn close-red-hover w-9 h-9 rounded-full bg-white border border-[rgba(7,59,36,0.15)] text-[#073b24] shadow-sm flex items-center justify-center font-bold text-sm cursor-pointer"
              aria-label="Close cart"
              title="Close cart"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Free shipping progress bar */}
        <div style={{ padding: '14px 26px', background: 'rgba(7,59,36,0.04)', borderBottom: '1px solid rgba(7,59,36,0.06)' }}>
          {total >= 75 ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#073b24]">
              <span className="text-[#e28b27]">✓</span>
              <span>You have unlocked Free Carbon-Neutral Shipping!</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 text-[#5a8a6a]">
                <span>Add <strong className="text-[#073b24]">${(75 - total).toFixed(0)}</strong> more for Free Delivery</span>
                <span>${total.toFixed(0)} / $75</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#073b24] transition-all duration-300"
                  style={{ width: `${Math.min(100, (total / 75) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 26px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '70px' }}>
              <div className="w-16 h-16 rounded-full bg-[rgba(7,59,36,0.08)] text-[#5a8a6a] mx-auto flex items-center justify-center mb-4">
                <Icon name="leaf" size={32} />
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: '20px',
                  color: '#073b24',
                  marginBottom: '8px',
                }}
              >
                No plants in your cart yet
              </h3>
              <p style={{ fontSize: '14px', color: '#5a8a6a', maxWidth: '280px', margin: '0 auto 24px' }}>
                Every specimen includes live botanist care and our 30-day health guarantee.
              </p>
              <button onClick={onBrowsePlants} className="btn-amber">
                Explore Collection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {items.map(item => (
                <div
                  key={item.plant.id}
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '14px',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'center',
                    boxShadow: '0 2px 10px rgba(7,59,36,0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '80px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#e8f0eb',
                    }}
                  >
                    <img
                      src={item.plant.image}
                      alt={item.plant.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex justify-between items-start">
                      <h4
                        style={{
                          fontFamily: "'Fraunces', Georgia, serif",
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#073b24',
                          margin: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.plant.name}
                      </h4>
                      <button
                        onClick={() => onRemove(item.plant.id)}
                        className="modal-close-btn w-6 h-6 rounded-full flex items-center justify-center text-[#8ab89a] text-xs cursor-pointer"
                        title="Remove plant"
                      >
                        ✕
                      </button>
                    </div>

                    <p style={{ fontSize: '11px', color: '#5a8a6a', margin: '2px 0 8px' }}>
                      {item.plant.care} Care · {item.plant.light}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[rgba(7,59,36,0.18)] rounded-full px-2 py-0.5 bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full text-xs font-bold text-[#073b24]"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#073b24]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full text-xs font-bold bg-[#073b24] text-white"
                        >
                          +
                        </button>
                      </div>

                      <div
                        style={{
                          fontFamily: "'Fraunces', Georgia, serif",
                          fontSize: '17px',
                          fontWeight: 700,
                          color: '#073b24',
                        }}
                      >
                        ${(item.plant.price * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div
            style={{
              padding: '18px 26px',
              borderTop: '1px solid rgba(7,59,36,0.1)',
              background: '#f6ede2',
            }}
          >
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Promo code (e.g. GROW15)"
                value={promoInput}
                onChange={e => setPromoInput(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-1.5 bg-white border border-[rgba(7,59,36,0.15)] rounded-lg text-xs font-mono tracking-wider outline-none uppercase"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#073b24] text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-[#0f5c39]"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div className="text-[11px] font-semibold text-[#5a8a6a] mb-2">
                {promoMessage}
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#5a8a6a] mb-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#073b24]">${total.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#e28b27] font-semibold">
                  <span>{discountLabel || `${discountPercent}% Promo`} ({couponCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Carbon-Neutral Shipping</span>
                <span className="font-semibold text-[#073b24]">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[rgba(7,59,36,0.1)] text-sm">
                <span className="font-bold text-[#073b24]">Estimated Total</span>
                <span
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  className="font-bold text-lg text-[#073b24]"
                >
                  ${(finalSubtotal + shipping).toFixed(2)}
                </span>
              </div>
            </div>

            <button onClick={onCheckout} className="btn-amber w-full text-center">
              Proceed to Secure Checkout →
            </button>
            <p className="text-[11px] text-[#8ab89a] text-center mt-2">
              Includes 30-Day Plant Health Guarantee
            </p>
          </div>
        )}
      </div>
    </>
  );
}
