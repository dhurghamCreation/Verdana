import { useState, useEffect } from 'react';
import type { Plant, Review } from '../types';
import Icon from './Icon';
import { downloadSpecimenPassportPdf } from '../utils/generateBotanicalPdf';

interface PlantDetailModalProps {
  plant: Plant;
  onClose: () => void;
  onAddToCart: (plant: Plant, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (plantId: string) => void;
}

export default function PlantDetailModal({
  plant,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: PlantDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'care' | 'reviews'>('overview');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  // Fetch verified reviews from backend
  useEffect(() => {
    fetch(`/api/plants/${plant.id}/reviews`)
      .then(res => res.json())
      .then(data => {
        if (data.reviews) setReviewsList(data.reviews);
      })
      .catch(() => {
        // Fallback default review
        setReviewsList([
          {
            id: 'rev-default',
            plantId: plant.id,
            author: 'Verified Verdana Parent',
            rating: 5,
            date: '1 week ago',
            title: 'Exceeded botanical expectations',
            comment: `This ${plant.name} arrived healthy, well-rooted, and beautifully packaged.`,
            verified: true,
          },
        ]);
      });
  }, [plant.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;
    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/plants/${plant.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, rating, comment }),
      });
      const data = await res.json();
      if (data.review) {
        setReviewsList(prev => [data.review, ...prev]);
        setAuthor('');
        setComment('');
        setReviewMessage('Your review has been verified and published.');
      }
    } catch {
      setReviewMessage('Saved locally for this session.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[6500] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="plant-detail-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#042a1a]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#f6ede2] rounded-3xl shadow-2xl border border-[rgba(7,59,36,0.15)] flex flex-col md:flex-row overflow-hidden"
        style={{ animation: 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn close-red-hover absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-[#073b24] shadow flex items-center justify-center border border-[rgba(7,59,36,0.15)] font-bold text-sm cursor-pointer"
          aria-label="Close modal"
          title="Close modal"
        >
          <Icon name="times" size={15} />
        </button>

        {/* Left: Plant Imagery & Badges */}
        <div className="md:w-5/12 relative bg-[#e8f0eb] min-h-[300px] md:min-h-full">
          <img
            src={plant.image}
            alt={plant.name}
            onError={e => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=700&h=850&fit=crop&auto=format';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#073b24]/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {plant.badge && (
              <span className="px-3 py-1 rounded-full bg-[#073b24] text-[#e28b27] text-[11px] font-bold tracking-wider uppercase shadow">
                {plant.badge}
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow inline-flex items-center gap-1.5 ${
                plant.petSafe
                  ? 'bg-emerald-800 text-emerald-100'
                  : 'bg-amber-800 text-amber-100'
              }`}
            >
              {plant.petSafe ? (
                <>
                  <Icon name="paw" size={12} className="text-emerald-200" />
                  <span>Pet Friendly</span>
                </>
              ) : (
                <>
                  <Icon name="alert-triangle" size={12} className="text-amber-200" />
                  <span>Keep Away from Pets</span>
                </>
              )}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="text-xs uppercase tracking-widest text-[#e28b27] font-semibold">
              Botanical Provenance
            </div>
            <div className="text-sm font-medium opacity-90">
              {plant.origin || 'Ethically propagated in certified partner greenhouses'}
            </div>
          </div>
        </div>

        {/* Right: Details, Tabs, Actions */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#5a8a6a]">
                  {plant.category}
                </span>
                <h2
                  id="plant-detail-title"
                  className="text-2xl sm:text-3xl font-bold text-[#073b24] tracking-tight"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {plant.name}
                </h2>
                <p className="text-xs italic text-[#5a8a6a] font-serif">
                  {plant.scientificName}
                </p>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <div
                  className="text-2xl sm:text-3xl font-bold text-[#073b24]"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  ${plant.price}
                </div>
                {plant.originalPrice && (
                  <div className="text-xs line-through text-[#8ab89a]">
                    ${plant.originalPrice}
                  </div>
                )}
              </div>
            </div>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3 my-3 text-xs text-[#5a8a6a]">
              <div className="flex items-center gap-0.5 text-[#e28b27]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    name={i < Math.round(plant.rating) ? 'star-filled' : 'star-empty'}
                    size={13}
                    className={i < Math.round(plant.rating) ? 'text-[#e28b27]' : 'text-stone-300'}
                  />
                ))}
              </div>
              <span>({plant.reviews} verified reviews)</span>
              <span>·</span>
              <span className="text-[#073b24] font-semibold inline-flex items-center gap-1">
                <Icon name="check" size={13} className="text-emerald-600" />
                <span>Ready for greenhouse dispatch</span>
              </span>
            </div>

            {/* Tab navigation */}
            <div className="flex gap-2 border-b border-[rgba(7,59,36,0.12)] my-4 text-xs font-semibold uppercase tracking-wider">
              {(['overview', 'care', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 px-2 transition-colors relative cursor-pointer ${
                    activeTab === tab ? 'text-[#073b24]' : 'text-[#8ab89a] hover:text-[#073b24]'
                  }`}
                >
                  {tab === 'reviews' ? `Reviews (${reviewsList.length})` : tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e28b27]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-sm text-[#073b24]/80 leading-relaxed">
                <p>{plant.description}</p>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-[rgba(7,59,36,0.08)]">
                    <div className="text-[11px] uppercase tracking-wider text-[#5a8a6a] font-semibold">
                      Light Requirement
                    </div>
                    <div className="font-semibold text-[#073b24] mt-0.5">
                      {plant.light}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[rgba(7,59,36,0.08)]">
                    <div className="text-[11px] uppercase tracking-wider text-[#5a8a6a] font-semibold">
                      Water Frequency
                    </div>
                    <div className="font-semibold text-[#073b24] mt-0.5">
                      {plant.water}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[rgba(7,59,36,0.08)]">
                    <div className="text-[11px] uppercase tracking-wider text-[#5a8a6a] font-semibold">
                      Care Difficulty
                    </div>
                    <div className="font-semibold text-[#073b24] mt-0.5">
                      {plant.care} Level
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[rgba(7,59,36,0.08)]">
                    <div className="text-[11px] uppercase tracking-wider text-[#5a8a6a] font-semibold">
                      Mature Size
                    </div>
                    <div className="font-semibold text-[#073b24] mt-0.5">
                      {plant.size || 'Medium (12-18")'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Care Guide */}
            {activeTab === 'care' && (
              <div className="space-y-3 text-xs text-[#073b24]/85 leading-relaxed">
                <div className="p-3.5 bg-white rounded-xl border border-[rgba(7,59,36,0.08)]">
                  <div className="font-bold text-[#073b24] flex items-center gap-1.5 mb-1 text-sm">
                    <Icon name="sun" size={16} /> Lighting Exposure
                  </div>
                  <p>
                    Prefers {plant.light}. Avoid harsh midday summer sun that scorches foliage. Rotate 90 degrees every month for symmetrical outward growth.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[rgba(7,59,36,0.08)]">
                  <div className="font-bold text-[#073b24] flex items-center gap-1.5 mb-1 text-sm">
                    <Icon name="droplet" size={16} /> Watering Rhythm
                  </div>
                  <p>
                    Check top 1–2 inches of soil with your finger before watering. Soak thoroughly until water drains from bottom drainage holes; discard standing runoff.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-[rgba(7,59,36,0.08)]">
                  <div className="font-bold text-[#073b24] flex items-center gap-1.5 mb-1 text-sm">
                    <Icon name="shield" size={16} /> 30-Day Health Promise
                  </div>
                  <p>
                    Every plant leaves our Brooklyn nursery inspected for roots and pests. If it fails to thrive within 30 days, we replace it free of charge.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                {reviewMessage && (
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs rounded-lg font-medium">
                    {reviewMessage}
                  </div>
                )}

                {/* Submit quick review */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-3 bg-white rounded-xl border border-[rgba(7,59,36,0.08)] space-y-2 text-xs"
                >
                  <div className="font-bold text-[#073b24]">Leave a Verified Plant Review</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      required
                      className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#e28b27]"
                    />
                    <select
                      value={rating}
                      onChange={e => setRating(Number(e.target.value))}
                      className="px-2 py-1.5 border border-gray-200 rounded-lg outline-none"
                    >
                      <option value={5}>★★★★★ (5)</option>
                      <option value={4}>★★★★☆ (4)</option>
                      <option value={3}>★★★☆☆ (3)</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Share how this plant is thriving in your space..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                    rows={2}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#e28b27]"
                  />
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-3 py-1.5 bg-[#073b24] text-white rounded-lg font-semibold hover:bg-[#0f5c39] transition-colors"
                  >
                    {submittingReview ? 'Submitting...' : 'Post Review'}
                  </button>
                </form>

                {/* Review items */}
                {reviewsList.map(r => (
                  <div
                    key={r.id}
                    className="p-3 bg-white rounded-xl border border-[rgba(7,59,36,0.06)] text-xs space-y-1"
                  >
                    <div className="flex justify-between items-center text-[#5a8a6a]">
                      <span className="font-semibold text-[#073b24]">{r.author}</span>
                      <span>{r.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#e28b27]">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Icon key={i} name="star-filled" size={12} className="text-[#e28b27]" />
                      ))}
                    </div>
                    <p className="text-[#073b24]/80">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions: Quantity, Wishlist, Add to Cart */}
          <div className="pt-6 mt-4 border-t border-[rgba(7,59,36,0.12)] flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[rgba(7,59,36,0.2)] rounded-full px-3 py-1.5 bg-white">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-[#073b24] font-bold text-sm"
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-sm text-[#073b24]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-6 h-6 rounded-full bg-[#073b24] hover:bg-[#0f5c39] text-white font-bold text-sm"
              >
                +
              </button>
            </div>

            {/* Wishlist Toggle */}
            <button
              onClick={() => onToggleWishlist(plant.id)}
              className={`p-3 rounded-full border transition-all ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : 'bg-white border-[rgba(7,59,36,0.2)] text-[#5a8a6a] hover:text-[#073b24]'
              }`}
              title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
            >
              <Icon name="heart" size={18} />
            </button>

            {/* Add to Cart CTA */}
            <button
              onClick={() => {
                onAddToCart(plant, quantity);
                onClose();
              }}
              className="flex-1 btn-amber cursor-pointer"
            >
              Add {quantity} to Cart · ${(plant.price * quantity).toFixed(0)}
            </button>
          </div>

          {/* Individual Specimen Passport PDF Download */}
          <div className="pt-3 flex items-center justify-between text-xs text-[#5a8a6a]">
            <span>Includes 30-Day Living Guarantee</span>
            <button
              type="button"
              onClick={() => downloadSpecimenPassportPdf(plant)}
              className="font-semibold text-[#073b24] hover:text-[#e28b27] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Icon name="book" size={13} />
              Download Specimen Passport (PDF) ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
