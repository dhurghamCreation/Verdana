import { useState } from 'react';
import type { CartItem, Order } from '../types';
import Icon, { type IconName } from './Icon';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  couponCode: string;
  discountPercent?: number;
  discountLabel?: string;
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

type Step = 'shipping' | 'payment' | 'success';

const US_STATES = [
  'NY', 'NJ', 'CT', 'MA', 'PA', 'DE', 'MD', 'DC', 'RI',
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NM', 'NC', 'ND', 'OH', 'OK', 'OR', 'SC', 'SD', 'TN',
  'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function Checkout({
  items,
  total,
  couponCode,
  discountPercent = 15,
  discountLabel,
  onClose,
  onSuccess,
}: CheckoutProps) {
  const [step, setStep] = useState<Step>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  // Shipping form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('NY');
  const [zip, setZip] = useState('11201');

  // Payment form fields
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Calculation
  const discountRate = (couponCode ? discountPercent : 0) / 100;
  const discountAmount = couponCode ? Math.round(total * discountRate * 100) / 100 : 0;
  const shipping = total >= 75 ? 0 : 9.95;
  const taxable = Math.max(0, total - discountAmount);
  const tax = Math.round(taxable * 0.08875 * 100) / 100;
  const finalTotal = Math.round((taxable + shipping + tax) * 100) / 100;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !address || !city || !state || !zip) {
      setError('Please fill in all required shipping fields.');
      return;
    }
    setError('');
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            plantId: i.plant.id,
            quantity: i.quantity,
          })),
          customer: {
            firstName,
            lastName,
            email,
            address,
            city,
            state,
            zip,
          },
          couponCode,
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setCompletedOrder(data.order);
        try {
          localStorage.setItem('verdana_last_order', JSON.stringify(data.order));
        } catch {}
        onSuccess(data.order);
        setStep('success');
      } else {
        throw new Error(data.error || 'Failed to place order.');
      }
    } catch (err: any) {
      setError(err.message || 'Payment simulation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div
      className="fixed inset-0 z-[7000] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#042a1a]/88 backdrop-blur-md"
        onClick={step !== 'success' ? onClose : undefined}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl max-h-[94vh] overflow-hidden bg-[#073b24] rounded-3xl shadow-2xl border border-[rgba(246,237,226,0.12)] flex flex-col"
        style={{ animation: 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[rgba(246,237,226,0.1)] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e28b27] flex items-center justify-center text-[#073b24]">
              <Icon name="shield" size={17} />
            </div>
            <span
              id="checkout-modal-title"
              className="text-lg font-bold text-[#f6ede2]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Verdana Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-4">
            {step !== 'success' && (
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`px-2.5 py-1 rounded-full font-bold ${
                    step === 'shipping'
                      ? 'bg-[#e28b27] text-[#073b24]'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  1. Shipping
                </span>
                <span className="text-white/20">→</span>
                <span
                  className={`px-2.5 py-1 rounded-full font-bold ${
                    step === 'payment'
                      ? 'bg-[#e28b27] text-[#073b24]'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  2. Payment
                </span>
              </div>
            )}

            {step !== 'success' && (
              <button
                type="button"
                onClick={onClose}
                data-action="cancel"
                className="btn-cancel px-3 py-1 rounded-full text-xs font-semibold text-white/70 bg-white/10 border border-white/20 transition-all cursor-pointer hover:!bg-red-600 hover:!border-red-500 hover:!text-white hover:!shadow-[0_0_16px_rgba(239,68,68,0.55)]"
                title="Cancel checkout"
              >
                Cancel
              </button>
            )}

            <button
              onClick={onClose}
              className="modal-close-btn close-red-hover w-8 h-8 rounded-full bg-white/10 text-[#f6ede2] flex items-center justify-center font-bold text-sm border border-white/20 cursor-pointer"
              aria-label="Close checkout"
              title="Close window"
            >
              <Icon name="times" size={14} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {step === 'success' && completedOrder ? (
            /* Success Screen */
            <div className="text-center py-6 max-w-lg mx-auto space-y-5 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#e28b27]">
                  Order Confirmed &amp; Queued for Inspection
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-[#f6ede2] mt-1"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  Thank you, {completedOrder.customer.name}!
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  Our nursery botanists have received your specimen order and are preparing root-hydration diagnostics and biodegradable packaging.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Order Reference</span>
                  <span className="font-mono font-bold text-[#e28b27]">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Estimated Delivery</span>
                  <span className="font-bold text-white">{completedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Carrier Protocol</span>
                  <span className="text-white">{completedOrder.carrier}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Total Paid</span>
                  <span className="font-bold text-lg text-white">${completedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={onClose}
                  className="btn-amber text-xs px-6"
                >
                  Return to Garden Catalog
                </button>
              </div>
            </div>
          ) : (
            /* Split layout: Form + Order Summary */
            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form */}
              <div className="md:col-span-7 space-y-5">
                {error && (
                  <div className="p-3 bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs rounded-xl">
                    {error}
                  </div>
                )}

                {step === 'shipping' ? (
                  /* Step 1: Shipping Form */
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3
                        className="text-lg font-bold text-[#f6ede2]"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      >
                        1. Delivery Address &amp; Recipient
                      </h3>
                      <span className="text-[11px] text-[#e28b27] font-semibold bg-[#e28b27]/10 px-2.5 py-1 rounded-full border border-[#e28b27]/25 inline-flex items-center gap-1 w-fit">
                        <span className="font-bold text-xs">*</span> Mandatory info for plant guarantee
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                          First Name <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          placeholder="Elena"
                          required
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                          Last Name <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          placeholder="Rostova"
                          required
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                        Email Address (for live transit updates) <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="elena@example.com"
                        required
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                        Street Address &amp; Apartment <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="148 Henry Street, Apt 3A"
                        required
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                          City <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          placeholder="Brooklyn"
                          required
                          className="w-full px-3 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                          State <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                        </label>
                        <select
                          value={state}
                          onChange={e => setState(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white/10 border border-white/15 rounded-xl text-sm text-white outline-none"
                        >
                          {US_STATES.map(s => (
                            <option key={s} value={s} className="bg-[#073b24] text-white">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                          ZIP Code <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                        </label>
                        <input
                          type="text"
                          value={zip}
                          onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                          placeholder="11201"
                          pattern="[0-9]{5}"
                          required
                          className="w-full px-3 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-amber mt-2 flex items-center justify-center gap-2"
                    >
                      <span>Continue to Payment Details</span>
                      <Icon name="arrow-right" size={14} />
                    </button>
                  </form>
                ) : (
                  /* Step 2: Payment Form & Card Preview */
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3
                        className="text-lg font-bold text-[#f6ede2]"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      >
                        2. Payment Details
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="text-xs text-[#e28b27] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Icon name="arrow-left" size={12} />
                        <span>Edit Address</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-[#e28b27] font-semibold bg-[#e28b27]/10 px-2.5 py-1 rounded-full border border-[#e28b27]/25 inline-flex items-center gap-1 w-fit">
                      <span className="font-bold text-xs">*</span> All fields mandatory for encrypted verification
                    </div>

                    {/* Animated Card Preview */}
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #0f5c39, #073b24)',
                        borderRadius: '16px',
                        padding: '18px 22px',
                        border: '1px solid rgba(246,237,226,0.15)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                      }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-mono tracking-widest text-[#e28b27]">VERDANA VAULT</span>
                        <span className="text-xs font-bold text-white/70">CREDIT / DEBIT</span>
                      </div>
                      <div className="font-mono text-base tracking-widest text-white mb-4">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between text-xs text-white/80">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-white/50">Cardholder</div>
                          <div className="font-semibold uppercase">{cardName || `${firstName} ${lastName}`.trim() || 'CUSTOMER NAME'}</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-white/50">Expires</div>
                          <div className="font-semibold">{expiry || 'MM/YY'}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                        Name on Card <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        placeholder="Elena Rostova"
                        required
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                        Card Number <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(formatCard(e.target.value))}
                        placeholder="4242 4242 4242 4242"
                        required
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm font-mono tracking-wider text-white outline-none focus:border-[#e28b27]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                          Expiry <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={e => setExpiry(formatExpiry(e.target.value))}
                          placeholder="12/28"
                          required
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-white/60 mb-1">
                          Security CVC <span className="text-[#e28b27] font-bold" title="Mandatory">*</span>
                        </label>
                        <input
                          type="password"
                          value={cvc}
                          onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="•••"
                          required
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white outline-none focus:border-[#e28b27]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-400 bg-white/5 p-3 rounded-xl border border-white/10">
                      <Icon name="lock" size={14} />
                      <span>Encrypted SSL 256-Bit Protection · 30-Day Guarantee</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full btn-amber mt-2 flex items-center justify-center gap-2"
                    >
                      <Icon name="lock" size={14} />
                      <span>{isProcessing ? 'Authorizing & Queuing Order...' : `Authorize & Place Order · $${finalTotal.toFixed(2)}`}</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
                <h4
                  className="text-xs uppercase font-bold tracking-widest text-[#e28b27]"
                >
                  Order Summary ({items.length} items)
                </h4>

                <div className="max-h-[220px] overflow-y-auto space-y-3 pr-1 divide-y divide-white/5">
                  {items.map(item => (
                    <div key={item.plant.id} className="pt-2 flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.plant.image}
                          alt={item.plant.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-semibold text-white">{item.plant.name}</div>
                          <div className="text-[11px] text-white/50">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-bold text-white">
                        ${(item.plant.price * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-white/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#e28b27] font-semibold">
                      <span>{discountLabel || `${discountPercent}% Promo`} ({couponCode})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Carbon-Neutral Delivery</span>
                    <span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                    <span>Total</span>
                    <span
                      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      className="text-lg text-[#e28b27]"
                    >
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl text-[11px] text-white/70 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Icon name="check-circle" size={13} className="text-emerald-400 flex-shrink-0" />
                    <span>Hand-inspected before boxing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="check-circle" size={13} className="text-emerald-400 flex-shrink-0" />
                    <span>30-day no-stress replacement guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="check-circle" size={13} className="text-emerald-400 flex-shrink-0" />
                    <span>100% recyclable, plastic-free materials</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
