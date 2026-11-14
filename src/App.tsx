import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';

// Corporate & Ecosystem Pages
import { HomePage } from './pages/HomePage';
import { MaterialsPage } from './pages/MaterialsPage';
import { ReverseAuctionPage } from './pages/ReverseAuctionPage';
import { ServicesPage } from './pages/ServicesPage';
import { LabourNetPage } from './pages/LabourNetPage';
import { RealEstatePage } from './pages/RealEstatePage';
import { FloorPlansPage } from './pages/FloorPlansPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { HomeLoansPage } from './pages/HomeLoansPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Home Services Marketplace & Mobile App Pages (image copy 14.png)
import { CustomerHomePage } from './pages/CustomerHomePage';
import { CategoryServicesPage } from './pages/CategoryServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { NearbyProvidersPage } from './pages/NearbyProvidersPage';
import { BookingTrackingPage } from './pages/BookingTrackingPage';
import { BookingCompletedPage } from './pages/BookingCompletedPage';
import { CustomerProfilePage } from './pages/CustomerProfilePage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { RealEstateAppPage } from './pages/RealEstateAppPage';
import { HouseDesigns3DPage } from './pages/HouseDesigns3DPage';
import { ConstructionCalculatorAppPage } from './pages/ConstructionCalculatorAppPage';
import { PartnerRegistrationPage } from './pages/PartnerRegistrationPage';
import { PartnerDashboardPage } from './pages/PartnerDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Modals
import { QuickViewModal } from './components/QuickViewModal';
import { EnquiryModal } from './components/EnquiryModal';
import { CalculatorModal } from './components/CalculatorModal';
import { SearchModal } from './components/SearchModal';
import { BOQModal, BOQItem } from './components/BOQModal';
import { PlatformModule } from './data/modulesData';
import { EngineeringCalculator } from './data/calculatorsData';

// Helper to scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const location = useLocation();

  // Global Modals State
  const [quickViewModule, setQuickViewModule] = useState<PlatformModule | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryTopic, setEnquiryTopic] = useState('General Consultation');
  const [activeCalculator, setActiveCalculator] = useState<EngineeringCalculator | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [boqOpen, setBOQOpen] = useState(false);

  // Dynamic BOQ Line Items State
  const [boqItems, setBOQItems] = useState<BOQItem[]>([
    { id: '1', item: 'UltraTech Cement 50kg Bags (M20 Grade)', quantity: 80, unit: 'Bags', rate: 380, total: 30400 },
    { id: '2', item: 'Tata Tiscon Fe 550D 12mm Rebars', quantity: 600, unit: 'Kg', rate: 62, total: 37200 },
    { id: '3', item: 'VSI Washed M-Sand for Masonry', quantity: 12, unit: 'Tons', rate: 1800, total: 21600 }
  ]);

  const handleOpenEnquiry = (topic = 'General Consultation') => {
    setEnquiryTopic(topic);
    setEnquiryOpen(true);
  };

  const handleSearchTrigger = (query: string) => {
    setSearchInitialQuery(query);
    setSearchOpen(true);
  };

  const handleAddToBOQ = (newItems: any[]) => {
    const formatted: BOQItem[] = newItems.map((it, idx) => ({
      id: `${Date.now()}-${idx}`,
      item: it.item,
      quantity: it.quantity,
      unit: it.unit,
      rate: it.rate,
      total: it.total
    }));
    setBOQItems((prev) => [...prev, ...formatted]);
  };

  const handleRemoveBOQItem = (id: string) => {
    setBOQItems((prev) => prev.filter(it => it.id !== id));
  };

  const handleClearBOQ = () => {
    setBOQItems([]);
  };

  // Determine if on mobile app screen or admin
  const isAppView = [
    '/app',
    '/nearby-providers',
    '/booking',
    '/booking-success',
    '/my-bookings',
    '/profile',
    '/3d-designs',
    '/calculator-app',
    '/partner',
    '/admin'
  ].some(prefix => location.pathname.startsWith(prefix));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Sticky Corporate Header */}
      <Header 
        onOpenSearch={() => setSearchOpen(true)}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          {/* Corporate / Ecosystem Pages */}
          <Route 
            path="/" 
            element={
              <HomePage
                onSearchSubmit={handleSearchTrigger}
                onOpenEnquiry={handleOpenEnquiry}
                onQuickView={(mod) => setQuickViewModule(mod)}
                onOpenCalculator={(calc) => setActiveCalculator(calc)}
                onOpenBOQ={() => setBOQOpen(true)}
              />
            } 
          />
          <Route 
            path="/materials" 
            element={<MaterialsPage onOpenEnquiry={handleOpenEnquiry} />} 
          />
          <Route 
            path="/reverse-auction" 
            element={<ReverseAuctionPage onOpenEnquiry={handleOpenEnquiry} />} 
          />
          <Route 
            path="/services" 
            element={<ServicesPage onOpenBooking={handleOpenEnquiry} />} 
          />
          <Route 
            path="/labour" 
            element={<LabourNetPage onHireWorker={(worker, trade) => handleOpenEnquiry(`Hire ${worker} (${trade})`)} />} 
          />
          <Route 
            path="/real-estate" 
            element={<RealEstatePage onOpenEnquiry={handleOpenEnquiry} />} 
          />
          <Route 
            path="/floor-plans" 
            element={<FloorPlansPage onOpenEnquiry={handleOpenEnquiry} />} 
          />
          <Route 
            path="/calculators" 
            element={
              <CalculatorsPage 
                onOpenCalculator={(calc) => setActiveCalculator(calc)} 
                onOpenBOQ={() => setBOQOpen(true)} 
              />
            } 
          />
          <Route 
            path="/loans" 
            element={<HomeLoansPage onOpenEnquiry={handleOpenEnquiry} />} 
          />
          <Route 
            path="/about" 
            element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />} 
          />
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />

          {/* Home Services Marketplace & Mobile App Routes (image copy 14.png) */}
          <Route path="/app" element={<CustomerHomePage />} />
          <Route path="/services/:categoryId" element={<CategoryServicesPage />} />
          <Route path="/category/:categoryId" element={<CategoryServicesPage />} />
          <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/nearby-providers" element={<NearbyProvidersPage />} />
          <Route path="/nearby-providers/:serviceId" element={<NearbyProvidersPage />} />
          <Route path="/booking/:bookingId" element={<BookingTrackingPage />} />
          <Route path="/booking-success/:bookingId" element={<BookingCompletedPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/profile" element={<CustomerProfilePage />} />
          <Route path="/real-estate-app" element={<RealEstateAppPage />} />
          <Route path="/3d-designs" element={<HouseDesigns3DPage />} />
          <Route path="/calculator-app" element={<ConstructionCalculatorAppPage />} />

          {/* Partner & Admin Portals */}
          <Route path="/partner/register" element={<PartnerRegistrationPage />} />
          <Route path="/partner/dashboard" element={<PartnerDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </main>

      {/* Footer (hidden on pure app views) */}
      {!isAppView && <Footer />}

      {/* Mobile Bottom Navigation Bar (Screen 5 & App screens) */}
      <BottomNav />

      {/* Global Auth Modal (Screens 1, 2, 3) */}
      <AuthModal />

      {/* Global Modals */}
      <QuickViewModal
        module={quickViewModule}
        onClose={() => setQuickViewModule(null)}
        onEnquire={(title) => handleOpenEnquiry(title)}
      />

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultTopic={enquiryTopic}
      />

      <CalculatorModal
        calculator={activeCalculator}
        onClose={() => setActiveCalculator(null)}
        onAddToBOQ={handleAddToBOQ}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        initialQuery={searchInitialQuery}
      />

      <BOQModal
        isOpen={boqOpen}
        onClose={() => setBOQOpen(false)}
        items={boqItems}
        onRemoveItem={handleRemoveBOQItem}
        onClearAll={handleClearBOQ}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
