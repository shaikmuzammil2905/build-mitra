import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CustomerHeader } from './components/CustomerHeader';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';

// All 17 Mobile App Screens & Portals from image copy 14.png
import { HomePage } from './pages/HomePage';
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
import { ContactPage } from './pages/ContactPage';
import { ReverseAuctionPage } from './pages/ReverseAuctionPage';
import { HomeLoansPage } from './pages/HomeLoansPage';

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

  // Hide large footer on pure app screens to preserve app experience
  const isAppOnlyView = [
    '/booking',
    '/nearby-providers',
    '/profile',
    '/partner/dashboard'
  ].some(p => location.pathname.startsWith(p));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* Universal Top Customer App Header */}
      <CustomerHeader />

      {/* Main Routed Content - Directly Maps to image copy 14.png */}
      <main className="flex-1">
        <Routes>
          {/* Screen 5: Customer Home Screen */}
          <Route path="/" element={<HomePage />} />
          
          {/* Screen 6: Category Services Listing */}
          <Route path="/services" element={<CategoryServicesPage />} />
          <Route path="/services/:categoryId" element={<CategoryServicesPage />} />
          <Route path="/category/:categoryId" element={<CategoryServicesPage />} />

          {/* Screen 7: Service Detail Page */}
          <Route path="/service/:serviceId" element={<ServiceDetailPage />} />

          {/* Screen 8: GPS Nearby Providers */}
          <Route path="/nearby-providers" element={<NearbyProvidersPage />} />
          <Route path="/nearby-providers/:serviceId" element={<NearbyProvidersPage />} />

          {/* Screen 9: Live Booking Tracking */}
          <Route path="/booking/:bookingId" element={<BookingTrackingPage />} />

          {/* Screen 13: Payment & Booking Completed */}
          <Route path="/booking-success/:bookingId" element={<BookingCompletedPage />} />

          {/* Reverse Auction Engine (Replaces Real Estate per user request) */}
          <Route path="/reverse-auction" element={<ReverseAuctionPage onOpenEnquiry={() => {}} />} />
          <Route path="/real-estate" element={<ReverseAuctionPage onOpenEnquiry={() => {}} />} />
          <Route path="/real-estate-app" element={<ReverseAuctionPage onOpenEnquiry={() => {}} />} />

          {/* Home Loan EMI Calculator & Financial Portal (per image copy 30.png) */}
          <Route path="/home-loans" element={<HomeLoansPage onOpenEnquiry={() => {}} />} />
          <Route path="/loan-calculator" element={<HomeLoansPage onOpenEnquiry={() => {}} />} />

          {/* Screen 11: 3D House & Villa Designs */}
          <Route path="/3d-designs" element={<HouseDesigns3DPage />} />

          {/* Screen 12: Construction Cost Calculator */}
          <Route path="/calculator" element={<ConstructionCalculatorAppPage />} />
          <Route path="/calculator-app" element={<ConstructionCalculatorAppPage />} />

          {/* Screen 4: Customer Profile */}
          <Route path="/profile" element={<CustomerProfilePage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />

          {/* Screens 14, 15, 17: Partner Onboarding & KYC Upload */}
          <Route path="/partner/register" element={<PartnerRegistrationPage />} />

          {/* Screen 16: Partner Dashboard */}
          <Route path="/partner/dashboard" element={<PartnerDashboardPage />} />

          {/* Admin Panel (Phase 14 & Phase 4: KYC Approvals, Bookings Override, SMTP Gateway) */}
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* Support / Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Catch-all fallback to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer on desktop & informative views */}
      {!isAppOnlyView && <Footer />}

      {/* Mobile App Bottom Navigation Bar (Screens 4, 5, 10) */}
      <BottomNav />

      {/* Global Customer Auth Modal (Screens 1, 2, 3: Welcome, Mobile/Email Login, 6-digit OTP) */}
      <AuthModal />

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
