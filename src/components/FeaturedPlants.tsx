import { useEffect, useMemo, useRef, useState } from 'react';
import { plants, categories } from '../data/plants';
import type { Plant } from '../types';
import Icon from './Icon';

interface FeaturedPlantsProps {
  onAddToCart: (plant: Plant, quantity?: number) => void;
  onSelectPlant: (plant: Plant) => void;
  wishlistIds: string[];
  onToggleWishlist: (plantId: string) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i <= Math.round(rating) ? '#e28b27' : '#d4c9ba'}
        >
          <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.5L6 8.875L2.91 10.5L3.5 7.07L1 4.635L4.455 4.13L6 1Z" />
        </svg>
      ))}
    </div>
  );
}

const careColor: Record<string, string> = {
  Easy: '#5a8a6a',
  Medium: '#e28b27',
  Expert: '#c0392b',
};

export default function FeaturedPlants({
  onAddToCart,
  onSelectPlant,
  wishlistIds,
  onToggleWishlist,
}: FeaturedPlantsProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCare, setActiveCare] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let result = plants.filter(plant => {
      const inCategory =
        activeCategory === 'All' ||
        plant.category === activeCategory ||
        (activeCategory === 'New Arrivals' && plant.badge === 'New Arrival');

      const inCare = activeCare === 'All' || plant.care === activeCare;

      const searchable =
        `${plant.name} ${plant.scientificName} ${plant.category} ${plant.care} ${plant.light} ${plant.description}`.toLowerCase();

      const matchesQuery = !query.trim() || searchable.includes(query.trim().toLowerCase());

      return inCategory && inCare && matchesQuery;
    });

    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, activeCare, query, sortBy]);

  useEffect(() => {
    const focusSearch = () => searchRef.current?.focus();
    const selectCategory = (event: Event) => {
      const category = (event as CustomEvent<string>).detail;
      if (!category) return;
      setQuery('');
      setActiveCategory(category);
    };

    window.addEventListener('verdana:catalog-search', focusSearch);
    window.addEventListener('verdana:catalog-category', selectCategory);
    return () => {
      window.removeEventListener('verdana:catalog-search', focusSearch);
      window.removeEventListener('verdana:catalog-category', selectCategory);
    };
  }, []);

  const handleAdd = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(plant, 1);
    setAddedId(plant.id);
    setTimeout(() => setAddedId(null), 1300);
  };

  return (
    <section id="shop" style={{ background: '#f6ede2', padding: 'clamp(64px, 10vh, 120px) 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="reveal">
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#5a8a6a',
                marginBottom: '10px',
              }}
            >
              The Curated Collection
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                color: '#073b24',
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Plants that <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#5a8a6a' }}>thrive</em>
            </h2>
          </div>

          <div className="reveal flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#5a8a6a] font-semibold">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs font-semibold px-3 py-2 bg-white rounded-full border border-[rgba(7,59,36,0.15)] text-[#073b24] outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated (5.0 Stars)</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Search & Tool Bar */}
        <div className="catalog-tools reveal">
          <label className="catalog-search">
            <Icon name="search" size={17} />
            <input
              ref={searchRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by plant, botanical name, light, or care..."
              aria-label="Search plants"
            />
            {query && (
              <button
                className="close-button close-red-hover"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                title="Clear search"
              >
                <Icon name="times" size={13} />
              </button>
            )}
          </label>
          <span className="catalog-count">
            {filtered.length} {filtered.length === 1 ? 'specimen' : 'specimens'} available
          </span>
        </div>

        {/* Category Filter Pills */}
        <div id="collections" className="reveal flex flex-wrap items-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                padding: '8px 18px',
                borderRadius: '40px',
                border: '1.5px solid',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                borderColor: activeCategory === cat ? '#073b24' : 'rgba(7,59,36,0.18)',
                background: activeCategory === cat ? '#073b24' : 'transparent',
                color: activeCategory === cat ? '#f6ede2' : '#073b24',
                transform: activeCategory === cat ? 'scale(1.04)' : 'scale(1)',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}

          {/* Care quick filter */}
          <div className="hidden sm:flex items-center gap-1.5 ml-auto text-xs">
            <span className="text-[#5a8a6a] font-semibold">Care:</span>
            {['All', 'Easy', 'Medium', 'Expert'].map(care => (
              <button
                key={care}
                type="button"
                onClick={() => setActiveCare(care)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  activeCare === care
                    ? 'bg-[#073b24] text-white'
                    : 'bg-white/60 text-[#5a8a6a] hover:bg-white'
                }`}
              >
                {care}
              </button>
            ))}
          </div>
        </div>

        {/* Plants Grid with stable container to prevent scroll jump */}
        {filtered.length === 0 ? (
          <div className="catalog-empty">
            <p>No plants match your search criteria.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
                setActiveCare('All');
              }}
              className="btn-amber"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 min-h-[460px] transition-all"
          >
            {filtered.map((plant, i) => {
              const isWishlisted = wishlistIds.includes(plant.id);

              return (
                <div
                  key={plant.id}
                  onClick={() => onSelectPlant(plant)}
                  className="plant-card card-appear cursor-pointer group"
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {/* Image area */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '3/4',
                      overflow: 'hidden',
                      background: '#e8f0eb',
                    }}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                      onError={e => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=700&h=850&fit=crop&auto=format';
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
                      }}
                      className="group-hover:scale-105"
                    />

                    {/* Badge */}
                    {plant.badge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: '#073b24',
                          color: '#e28b27',
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          zIndex: 2,
                        }}
                      >
                        {plant.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onToggleWishlist(plant.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 5,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.85)',
                        border: 'none',
                        color: isWishlisted ? '#c0392b' : '#073b24',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, background 0.2s ease',
                      }}
                      title={isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                      aria-label="Wishlist"
                    >
                      <Icon name="heart" size={15} />
                    </button>

                    {/* Hover overlay */}
                    <div className="card-overlay" />

                    {/* Hover info */}
                    <div className="card-info-hover" style={{ zIndex: 3 }}>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'rgba(246,237,226,0.9)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {plant.description}
                      </p>
                      <div className="flex gap-3 mt-2">
                        <span className="plant-care-meta">
                          <Icon name="sun" size={12} />
                          {plant.light}
                        </span>
                        <span className="plant-care-meta">
                          <Icon name="droplet" size={12} />
                          {plant.water}
                        </span>
                      </div>
                    </div>

                    {/* Add to cart button */}
                    <button
                      className="add-btn"
                      onClick={e => handleAdd(plant, e)}
                      style={{
                        zIndex: 4,
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        padding: '10px 22px',
                        borderRadius: '40px',
                        border: 'none',
                        background: addedId === plant.id ? '#5a8a6a' : '#e28b27',
                        color: '#073b24',
                        transition: 'background 0.3s ease, transform 0.3s ease',
                        transform: addedId === plant.id ? 'translateX(-50%) scale(1.08)' : undefined,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                      }}
                    >
                      {addedId === plant.id ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="check" size={13} />
                          <span>Added to Cart</span>
                        </span>
                      ) : (
                        <span>+ Add to Cart</span>
                      )}
                    </button>
                  </div>

                  {/* Card Bottom Meta */}
                  <div style={{ padding: '14px 16px 16px' }}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#073b24',
                            margin: 0,
                            lineHeight: 1.2,
                          }}
                        >
                          {plant.name}
                        </h3>
                        <p
                          style={{
                            fontSize: '11px',
                            color: '#8ab89a',
                            margin: '2px 0 0',
                            fontStyle: 'italic',
                          }}
                        >
                          {plant.scientificName}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div
                          style={{
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#073b24',
                            lineHeight: 1,
                          }}
                        >
                          ${plant.price}
                        </div>
                        {plant.originalPrice && (
                          <div
                            style={{
                              fontSize: '11px',
                              color: '#8ab89a',
                              textDecoration: 'line-through',
                            }}
                          >
                            ${plant.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1.5">
                        <StarRating rating={plant.rating} />
                        <span style={{ fontSize: '11px', color: '#8ab89a' }}>
                          ({plant.reviews})
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          color: careColor[plant.care],
                          textTransform: 'uppercase',
                        }}
                      >
                        {plant.care} Care
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
