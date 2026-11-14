import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SERVICE_CATEGORIES, 
  INITIAL_NEARBY_PROVIDERS, 
  INITIAL_BOOKINGS, 
  ServiceCategory, 
  SubService, 
  NearbyProvider, 
  Booking 
} from '../data/homeServicesData';
import { HOUSE_DESIGNS_CATALOG, HouseDesign3D } from '../data/houseDesignsData';
import { REAL_ESTATE_INSIGHTS, PropertyInsight } from '../data/propertiesData';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  addresses: string[];
  isLoggedIn: boolean;
  role: 'customer' | 'partner' | 'admin';
}

export interface PartnerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceCategory: string;
  experienceYears: number;
  avatar: string;
  rating: number;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  isOnline: boolean;
  earnings: {
    total: number;
    completedJobs: number;
    walletBalance: number;
  };
  kycDocuments: {
    aadhaarProof?: string;
    addressProof?: string;
    workPhotos?: string[];
  };
}

export interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  encryption: 'TLS' | 'SSL' | 'STARTTLS';
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  status: 'Delivered' | 'Queued' | 'Failed';
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  timestamp: string;
  adminReply?: string;
}

interface AppContextType {
  // Customer State
  currentUser: UserProfile;
  loginUser: (phone: string, name?: string) => void;
  logoutUser: () => void;
  updateUserAddresses: (addresses: string[]) => void;
  
  // Auth Modal State
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authStep: 'welcome' | 'login' | 'otp' | 'profile';
  setAuthStep: (step: 'welcome' | 'login' | 'otp' | 'profile') => void;
  tempPhone: string;
  setTempPhone: (phone: string) => void;

  // City & Navigation
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  // Services Catalog
  categories: ServiceCategory[];
  getCategory: (id: string) => ServiceCategory | undefined;
  getSubService: (id: string) => SubService | undefined;

  // Providers & GPS
  providers: NearbyProvider[];
  selectedProvider: NearbyProvider | null;
  setSelectedProvider: (provider: NearbyProvider | null) => void;

  // Bookings
  bookings: Booking[];
  activeBooking: Booking | null;
  setActiveBooking: (booking: Booking | null) => void;
  createBooking: (service: SubService, provider: NearbyProvider, date: string, time: string, address: string) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  rateBooking: (bookingId: string, rating: number, review?: string) => void;

  // Partner State
  partner: PartnerProfile;
  registerPartner: (data: { name: string; phone: string; serviceCategory: string; experienceYears: number }) => void;
  uploadKycDocuments: (docs: { aadhaarProof?: string; addressProof?: string; workPhotos?: string[] }) => void;
  togglePartnerOnline: () => void;
  adminApprovePartner: (partnerId: string, approved: boolean) => void;

  // 3D Designs & Real Estate
  houseDesigns: HouseDesign3D[];
  realEstateProperties: PropertyInsight[];
  quotationRequests: any[];
  submitQuotationRequest: (designTitle: string, userPhone: string, notes: string) => void;

  // Admin & SMTP
  smtpConfig: SmtpConfig;
  setSmtpConfig: React.Dispatch<React.SetStateAction<SmtpConfig>>;
  emailLogs: EmailLog[];
  sendTestEmail: (recipient: string) => Promise<boolean>;
  
  // Support & Inquiries
  supportTickets: SupportTicket[];
  submitSupportTicket: (data: { name: string; phone: string; email: string; subject: string; message: string }) => void;
  replySupportTicket: (ticketId: string, reply: string) => void;

  // Notifications
  notifications: { id: string; title: string; message: string; timestamp: string; read: boolean }[];
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Current Customer User State (Persisted in localStorage)
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('bm_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'cust-1',
      name: 'Guest User',
      phone: '+91 98765 43210',
      email: 'guest@buildmitra.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      addresses: [
        'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
        'Plot 18, Road No. 12, Banjara Hills, Hyderabad - 500034'
      ],
      isLoggedIn: false,
      role: 'customer'
    };
  });

  useEffect(() => {
    localStorage.setItem('bm_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<'welcome' | 'login' | 'otp' | 'profile'>('welcome');
  const [tempPhone, setTempPhone] = useState('+91 98765 43210');

  const loginUser = (phone: string, name = 'Hemanth Kumar') => {
    setCurrentUser(prev => ({
      ...prev,
      phone,
      name: prev.name || name,
      isLoggedIn: true
    }));
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(prev => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  const updateUserAddresses = (addresses: string[]) => {
    setCurrentUser(prev => ({ ...prev, addresses }));
  };

  // 2. City Selector
  const [selectedCity, setSelectedCity] = useState<string>('Hyderabad');

  // 3. Categories & Sub-Services
  const [categories] = useState<ServiceCategory[]>(SERVICE_CATEGORIES);

  const getCategory = (id: string) => categories.find(c => c.id === id);
  const getSubService = (id: string) => {
    for (const c of categories) {
      const sub = c.subServices.find(s => s.id === id);
      if (sub) return sub;
    }
    return undefined;
  };

  // 4. Nearby Providers
  const [providers] = useState<NearbyProvider[]>(INITIAL_NEARBY_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState<NearbyProvider | null>(INITIAL_NEARBY_PROVIDERS[0]);

  // 5. Bookings State (Persisted in localStorage)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bm_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem('bm_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const [activeBooking, setActiveBooking] = useState<Booking | null>(bookings[0] || null);

  const createBooking = (
    service: SubService,
    provider: NearbyProvider,
    date: string,
    time: string,
    address: string
  ): Booking => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newBooking: Booking = {
      id: `#BM${randomNum}`,
      serviceId: service.id,
      serviceName: service.name,
      categoryName: service.categoryId.charAt(0).toUpperCase() + service.categoryId.slice(1),
      serviceImage: service.image,
      bookingDate: date,
      bookingTime: time,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      customerAddress: address || currentUser.addresses[0],
      provider: provider,
      amount: service.priceStarting,
      status: 'Request Placed',
      timeline: [
        { status: 'Request Placed', timestamp: 'Just now', completed: true, note: 'Service requested via Mobile App' },
        { status: 'Provider Accepted', timestamp: 'Pending confirmation', completed: false, note: `Assigned to ${provider.name}` },
        { status: 'On the Way', timestamp: `ETA ~ ${provider.etaMinutes} mins`, completed: false },
        { status: 'In Progress', timestamp: 'Pending start', completed: false },
        { status: 'Completed', timestamp: 'Pending handover', completed: false }
      ],
      paymentMethod: 'Online UPI',
      paymentStatus: 'Paid'
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      
      const newTimeline = b.timeline.map(t => {
        if (t.status === status) {
          return { ...t, completed: true, timestamp: 'Today • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        }
        return t;
      });

      const updated = { ...b, status, timeline: newTimeline };
      if (activeBooking?.id === bookingId) {
        setActiveBooking(updated);
      }
      return updated;
    }));
  };

  const rateBooking = (bookingId: string, rating: number, review?: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, rating, review };
      }
      return b;
    }));
  };

  // 6. Partner Profile State (Persisted in localStorage)
  const [partner, setPartner] = useState<PartnerProfile>(() => {
    const saved = localStorage.getItem('bm_partner');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'BMPT2456',
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      email: 'ramesh.kumar@servicepartner.com',
      serviceCategory: 'Painting',
      experienceYears: 8,
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
      rating: 4.8,
      status: 'Pending Approval', // Screen 16 shows Pending Approval initially
      isOnline: true,
      earnings: {
        total: 28450,
        completedJobs: 14,
        walletBalance: 8200
      },
      kycDocuments: {
        aadhaarProof: 'aadhaar_card_ramesh.pdf',
        addressProof: 'electricity_bill_hyd.pdf',
        workPhotos: ['site_finish_1.jpg', 'exterior_primer.jpg']
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('bm_partner', JSON.stringify(partner));
  }, [partner]);

  const registerPartner = (data: { name: string; phone: string; serviceCategory: string; experienceYears: number }) => {
    const randomId = 'BMPT' + Math.floor(1000 + Math.random() * 9000);
    setPartner(prev => ({
      ...prev,
      id: randomId,
      name: data.name,
      phone: data.phone,
      serviceCategory: data.serviceCategory,
      experienceYears: data.experienceYears,
      status: 'Pending Approval'
    }));
  };

  const uploadKycDocuments = (docs: { aadhaarProof?: string; addressProof?: string; workPhotos?: string[] }) => {
    setPartner(prev => ({
      ...prev,
      kycDocuments: { ...prev.kycDocuments, ...docs }
    }));
  };

  const togglePartnerOnline = () => {
    setPartner(prev => ({ ...prev, isOnline: !prev.isOnline }));
  };

  const adminApprovePartner = (partnerId: string, approved: boolean) => {
    setPartner(prev => {
      if (prev.id === partnerId || partnerId === 'current') {
        return {
          ...prev,
          status: approved ? 'Approved' : 'Rejected'
        };
      }
      return prev;
    });
  };

  // 7. 3D House Designs & Real Estate
  const [houseDesigns] = useState<HouseDesign3D[]>(HOUSE_DESIGNS_CATALOG);
  const [realEstateProperties] = useState<PropertyInsight[]>(REAL_ESTATE_INSIGHTS);
  const [quotationRequests, setQuotationRequests] = useState<any[]>([]);

  const submitQuotationRequest = (designTitle: string, userPhone: string, notes: string) => {
    const newReq = {
      id: `REQ-${Date.now()}`,
      designTitle,
      userPhone,
      notes,
      timestamp: new Date().toLocaleString()
    };
    setQuotationRequests(prev => [newReq, ...prev]);
  };

  // 8. SMTP Email Configuration & Logs
  const [smtpConfig, setSmtpConfig] = useState<SmtpConfig>(() => {
    const saved = localStorage.getItem('bm_smtp');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      host: 'smtp.sendgrid.net',
      port: 587,
      username: 'apikey',
      password: 'SG.buildmitra_secure_token',
      fromEmail: 'noreply@buildmitra.com',
      fromName: 'BuildMitra Platform',
      encryption: 'TLS'
    };
  });

  useEffect(() => {
    localStorage.setItem('bm_smtp', JSON.stringify(smtpConfig));
  }, [smtpConfig]);

  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([
    { id: '1', to: 'hemanth.kumar@example.com', subject: 'Booking Confirmation #BM12456', status: 'Delivered', timestamp: 'Today, 09:20 AM' },
    { id: '2', to: 'ramesh.kumar@servicepartner.com', subject: 'New Lead Assignment: Interior Painting', status: 'Delivered', timestamp: 'Today, 09:35 AM' }
  ]);

  const sendTestEmail = async (recipient: string): Promise<boolean> => {
    const newLog: EmailLog = {
      id: String(Date.now()),
      to: recipient,
      subject: 'BuildMitra SMTP Verification Test',
      status: 'Delivered',
      timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setEmailLogs(prev => [newLog, ...prev]);
    return true;
  };

  // 9. Support Tickets
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'TCK-8821',
      name: 'Hemanth Kumar',
      phone: '+91 98765 43210',
      email: 'hemanth.kumar@example.com',
      subject: 'Clarification regarding moisture meter scan on site',
      message: 'Can the technician also inspect our balcony ceiling for seepage during painting?',
      status: 'In Progress',
      timestamp: 'Today, 09:40 AM',
      adminReply: 'Yes Mr. Hemanth, Ramesh Enterprises has been notified to carry the thermal moisture scanner for your balcony inspection.'
    }
  ]);

  const submitSupportTicket = (data: { name: string; phone: string; email: string; subject: string; message: string }) => {
    const newTicket: SupportTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'Open',
      timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSupportTickets(prev => [newTicket, ...prev]);
  };

  const replySupportTicket = (ticketId: string, reply: string) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: 'Resolved', adminReply: reply };
      }
      return t;
    }));
  };

  // 10. In-App Notifications
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Booking #BM12456 Update', message: 'Provider Ramesh Enterprises is on the way (ETA 15 min).', timestamp: '10 min ago', read: false },
    { id: '2', title: 'Welcome to BuildMitra', message: 'Get 10% off on your first home service booking with code BMFIRST.', timestamp: '1 hour ago', read: true },
    { id: '3', title: 'Real Estate Price Alert', message: 'New 3 BHK villa listed in Hyderabad starting at ₹75 Lakhs.', timestamp: 'Yesterday', read: true }
  ]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      loginUser,
      logoutUser,
      updateUserAddresses,
      authModalOpen,
      setAuthModalOpen,
      authStep,
      setAuthStep,
      tempPhone,
      setTempPhone,
      selectedCity,
      setSelectedCity,
      categories,
      getCategory,
      getSubService,
      providers,
      selectedProvider,
      setSelectedProvider,
      bookings,
      activeBooking,
      setActiveBooking,
      createBooking,
      updateBookingStatus,
      rateBooking,
      partner,
      registerPartner,
      uploadKycDocuments,
      togglePartnerOnline,
      adminApprovePartner,
      houseDesigns,
      realEstateProperties,
      quotationRequests,
      submitQuotationRequest,
      smtpConfig,
      setSmtpConfig,
      emailLogs,
      sendTestEmail,
      supportTickets,
      submitSupportTicket,
      replySupportTicket,
      notifications,
      markNotificationRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
