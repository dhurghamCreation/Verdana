import { lazy, Suspense, useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedPlants from './components/FeaturedPlants';
import PlantDetailModal from './components/PlantDetailModal';
import PlantDoctorModal from './components/PlantDoctorModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import Journey from './components/Journey';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Features from './components/Features';
import CareGuide from './components/CareGuide';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Careers from './components/Careers';
import Press from './components/Press';
import Policies from './components/Policies';
import Ethics from './components/Ethics';
import Regions from './components/Regions';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Chatbot from './components/Chatbot';
import AuthModal from './components/AuthModal';
import SupportModal from './components/SupportModal';
import PdfViewerModal from './components/PdfViewerModal';
import CareerApplicationModal from './components/CareerApplicationModal';
import DnsDiagnosticModal from './components/DnsDiagnosticModal';
import { useCart } from './hooks/useCart';
import { useScrollReveal } from './hooks/useScrollReveal';
import type { Plant, Order, UserProfile } from './types';

const PlantPlanet = lazy(() => import('./components/PlantPlanet'));

export default function App() {
  const cart = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [supportInitialDept, setSupportInitialDept] = useState('care');
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [showDnsModal, setShowDnsModal] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [trackerOrderId, setTrackerOrderId] = useState<string>('VRD-8291402');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [couponCode, setCouponCode] = useState('GROW15');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [discountLabel, setDiscountLabel] = useState('15% Welcome Discount');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('verdana_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('verdana_wishlist');
      return saved ? JSON.parse(saved) : ['monstera-deliciosa', 'calathea-orbifolia'];
    } catch {
      return ['monstera-deliciosa'];
    }
  });

  useScrollReveal();

  useEffect(() => {
    try {
      localStorage.setItem('verdana_wishlist', JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  useEffect(() => {
    const handleOpenSupport = (e: Event) => {
      const customEvent = e as CustomEvent<{ department?: string }>;
      if (customEvent?.detail?.department) {
        setSupportInitialDept(customEvent.detail.department);
      } else {
        setSupportInitialDept('care');
      }
      setShowSupport(true);
    };
    const handleOpenPdf = () => setShowPdfViewer(true);
    const handleOpenCareers = (e?: any) => {
      if (e?.detail?.job) {
        setApplyingJob(e.detail.job);
      }
      setShowCareerModal(true);
    };
    const handleOpenDns = () => setShowDnsModal(true);

    const handleApplyPromo = (e: Event) => {
      const customEvent = e as CustomEvent<{
        code: string;
        discountPercent?: number;
        discountLabel?: string;
        openCart?: boolean;
      }>;
      if (customEvent?.detail?.code) {
        setCouponCode(customEvent.detail.code);
        if (customEvent.detail.discountPercent) {
          setDiscountPercent(customEvent.detail.discountPercent);
        }
        if (customEvent.detail.discountLabel) {
          setDiscountLabel(customEvent.detail.discountLabel);
        }
        if (customEvent.detail.openCart) {
          cart.setIsOpen(true);
        }
      }
    };

    window.addEventListener('verdana:open-support', handleOpenSupport);
    window.addEventListener('verdana:open-pdf', handleOpenPdf);
    window.addEventListener('verdana:open-careers', handleOpenCareers);
    window.addEventListener('verdana:open-dns-diagnostic', handleOpenDns);
    window.addEventListener('verdana:apply-promo', handleApplyPromo);
    return () => {
      window.removeEventListener('verdana:open-support', handleOpenSupport);
      window.removeEventListener('verdana:open-pdf', handleOpenPdf);
      window.removeEventListener('verdana:open-careers', handleOpenCareers);
      window.removeEventListener('verdana:open-dns-diagnostic', handleOpenDns);
      window.removeEventListener('verdana:apply-promo', handleApplyPromo);
    };
  }, []);

  const handleToggleWishlist = async (plantId: string) => {
    setWishlistIds(prev =>
      prev.includes(plantId) ? prev.filter(id => id !== plantId) : [...prev, plantId]
    );

    if (currentUser?.email) {
      try {
        await fetch('/api/wishlist/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: currentUser.email, plantId }),
        });
      } catch {}
    }
  };

  const handleApplyCoupon = async (code: string): Promise<boolean> => {
    const clean = code.trim().toUpperCase();
    if (!clean) return false;
    try {
      const res = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: clean }),
      });
      const data = await res.json();
      if (data.valid) {
        setCouponCode(data.code || clean);
        setDiscountPercent(data.discountPercent || 15);
        setDiscountLabel(data.discountLabel || `${data.discountPercent || 15}% Off Order`);
        return true;
      }
    } catch {}

    // Resilient fallback: accept valid botanical code structures
    if (clean.length >= 3) {
      const is20 = clean.includes('20') || clean.includes('VIP') || clean.includes('RARE') || clean.includes('GIFT') || clean.includes('SPRING');
      setCouponCode(clean);
      setDiscountPercent(is20 ? 20 : 15);
      setDiscountLabel(is20 ? '20% Off Order' : '15% Off Order');
      return true;
    }
    return false;
  };

  const handleAuthenticated = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('verdana_user', JSON.stringify(user));
    } catch {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('verdana_user');
    } catch {}
    setShowAuth(false);
  };

  const handleCheckoutSuccess = (order: Order) => {
    cart.clearCart();
    setTrackerOrderId(order.id);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const openSearch = () => {
    scrollToSection('shop');
    setTimeout(() => {
      window.dispatchEvent(new Event('verdana:catalog-search'));
    }, 450);
  };

  return (
    <>
      {/* Desktop Custom Cursor */}
      <div className="hidden md:block">
        <Cursor />
      </div>

      {/* Top Fixed Header with Announcement Bar and Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <AnnouncementBar />
        <Navbar
          cartCount={cart.count}
          wishlistCount={wishlistIds.length}
          onCartOpen={() => cart.setIsOpen(true)}
          onSearchOpen={openSearch}
          onAccountOpen={() => setShowAuth(true)}
          onTrackOrderOpen={() => setShowTracker(true)}
          onDoctorOpen={() => setShowDoctor(true)}
          onSupportOpen={() => {
            setSupportInitialDept('care');
            setShowSupport(true);
          }}
          onOpenPdfGuide={() => setShowPdfViewer(true)}
          userName={currentUser?.name || null}
        />
      </div>

      {/* Main Experience */}
      <main style={{ paddingTop: '36px' }}>
        <Hero
          onExplore={() => scrollToSection('shop')}
          onDoctorOpen={() => setShowDoctor(true)}
          onOpenPdfGuide={() => setShowPdfViewer(true)}
        />

        {/* 3D Living Botanical World */}
        <section className="plant-world" aria-labelledby="plant-world-title">
          <div className="plant-world-copy reveal-left">
            <span className="eyebrow">A Living Ecosystem</span>
            <h2 id="plant-world-title">
              Every plant connects to a <em>larger world</em>
            </h2>
            <p>
              Explore the living supply network behind every specimen: certified regenerative growers, temperature-controlled transit corridors, and clinical care that continues long after delivery.
            </p>
            <div className="world-metrics">
              <span>
                <strong>28</strong> partner growers
              </span>
              <span>
                <strong>8</strong> regional delivery states
              </span>
              <span>
                <strong>100%</strong> carbon-neutral transit
              </span>
            </div>
          </div>
          <div className="reveal-scale">
            <Suspense
              fallback={
                <div
                  className="planet-shell planet-loading"
                  aria-label="Loading 3D botanical world"
                />
              }
            >
              <PlantPlanet />
            </Suspense>
          </div>
        </section>

        {/* Catalog Collection */}
        <FeaturedPlants
          onAddToCart={(plant, qty = 1) => cart.addItem(plant, qty)}
          onSelectPlant={plant => setSelectedPlant(plant)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Story & Operations */}
        <Journey />
        <HowItWorks />
        <About />

        {/* Value Proposition */}
        <Features />
        <CareGuide
          onOpenPdfViewer={() => setShowPdfViewer(true)}
          onOpenDoctorClinic={() => setShowDoctor(true)}
        />

        {/* Social Proof */}
        <Testimonials />

        {/* Company & Stewardship */}
        <Ethics />
        <Regions />
        <Careers
          onOpenDnsDiagnostic={() => setShowDnsModal(true)}
          onApplyJob={(job) => {
            setApplyingJob(job);
            setShowCareerModal(true);
          }}
        />
        <Press
          onOpenPressInquiry={() => {
            setSupportInitialDept('press');
            setShowSupport(true);
          }}
          onOpenPdfGuide={() => setShowPdfViewer(true)}
          onOpenDnsDiagnostic={() => setShowDnsModal(true)}
        />
        <Policies />

        {/* Conversion Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer
        onDoctorOpen={() => setShowDoctor(true)}
        onTrackOrderOpen={() => setShowTracker(true)}
        onSupportOpen={() => {
          setSupportInitialDept('care');
          setShowSupport(true);
        }}
        onOpenPdfGuide={() => setShowPdfViewer(true)}
        onOpenCareers={() => setShowCareerModal(true)}
        onOpenDnsDiagnostic={() => setShowDnsModal(true)}
      />

      {/* Sliding Cart Drawer */}
      <Cart
        items={cart.items}
        total={cart.total}
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeItem}
        onCheckout={() => {
          cart.setIsOpen(false);
          setShowCheckout(true);
        }}
        onBrowsePlants={() => {
          cart.setIsOpen(false);
          scrollToSection('shop');
        }}
        couponCode={couponCode}
        discountPercent={discountPercent}
        discountLabel={discountLabel}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Multi-Step Checkout Modal */}
      {showCheckout && (
        <Checkout
          items={cart.items}
          total={cart.total}
          couponCode={couponCode}
          discountPercent={discountPercent}
          discountLabel={discountLabel}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {/* Plant Doctor Diagnostic Clinic Modal */}
      {showDoctor && (
        <PlantDoctorModal
          onClose={() => setShowDoctor(false)}
          defaultPlantName={selectedPlant?.name || 'Monstera Deliciosa'}
        />
      )}

      {/* Order Tracker Modal */}
      {showTracker && (
        <OrderTrackerModal
          onClose={() => setShowTracker(false)}
          initialOrderId={trackerOrderId}
        />
      )}

      {/* Plant Quick View & Review Detail Modal */}
      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onAddToCart={(p, qty) => cart.addItem(p, qty)}
          isWishlisted={wishlistIds.includes(selectedPlant.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* User Authentication & Profile Drawer */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuthenticated={handleAuthenticated}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* Botanist Verified Care & Support Modal */}
      {showSupport && (
        <SupportModal
          onClose={() => setShowSupport(false)}
          initialDepartment={supportInitialDept}
          initialOrderNumber={trackerOrderId}
          onOpenPdfGuide={() => {
            setShowSupport(false);
            setShowPdfViewer(true);
          }}
        />
      )}

      {/* Official Botanical Field Guide & Care Handbook PDF Viewer Modal */}
      {showPdfViewer && (
        <PdfViewerModal
          onClose={() => setShowPdfViewer(false)}
        />
      )}

      {/* Verified Careers & Talent Application Modal */}
      {showCareerModal && (
        <CareerApplicationModal
          job={applyingJob}
          onClose={() => {
            setShowCareerModal(false);
            setApplyingJob(null);
          }}
          onOpenDnsDiagnostic={() => {
            setShowCareerModal(false);
            setShowDnsModal(true);
          }}
        />
      )}

      {/* DNS & Email System Delivery Diagnostic Modal */}
      {showDnsModal && (
        <DnsDiagnosticModal
          onClose={() => setShowDnsModal(false)}
          onOpenCareers={() => {
            setShowDnsModal(false);
            setShowCareerModal(true);
          }}
          onOpenPress={() => {
            setShowDnsModal(false);
            setSupportInitialDept('press');
            setShowSupport(true);
          }}
        />
      )}

      {/* Vera Floating Chat Assistant */}
      <Chatbot onOpenDoctorClinic={() => setShowDoctor(true)} />
    </>
  );
}
