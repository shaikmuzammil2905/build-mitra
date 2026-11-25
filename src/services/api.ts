/**
 * BuildMitra Master API Service Layer
 * Connects frontend to Node.js backend (AWS EC2 / localhost:5000 / Vercel API proxy)
 */

const API_BASE = (((import.meta as any).env && (import.meta as any).env.VITE_API_URL) || 'http://localhost:5000').replace(/\/$/, '');

export interface AnalyticsData {
  users: {
    total: number;
    active: number;
    inactive: number;
    realEstateUsers: number;
  };
  partners: {
    total: number;
    pendingApprovals: number;
    approved: number;
    rejected: number;
    contractors: number;
    painters: number;
    electricians: number;
    plumbers: number;
  };
  realEstate: {
    totalProperties: number;
    totalAuctions: number;
    activeAuctions: number;
  };
  calculators: {
    totalUsage: number;
    totalPdfPurchases: number;
    pdfRevenue: number;
  };
  finance: {
    totalRevenue: number;
    subscriptionRevenue: number;
    pdfRevenue: number;
    totalTransactions: number;
  };
  cloud: {
    region: string;
    bucket: string;
    razorpayLiveId: string;
  };
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  registeredAt: string;
  plan: string;
  calculatorUsage: number;
  pdfPurchases: number;
}

export interface PartnerRecord {
  id: string;
  userId: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  category: string;
  experienceYears: number;
  serviceLocations: string[];
  status: 'Pending Approval' | 'Approved' | 'Rejected' | 'Suspended';
  rejectionReason?: string;
  documents: { name: string; url: string; verified: boolean }[];
  subscriptionPlan: string;
  subscriptionStatus: string;
  registeredAt: string;
}

export interface AuctionRecord {
  id: string;
  title: string;
  material: string;
  quantity: string;
  city: string;
  startingPrice: string;
  reservePrice: string;
  currentLowest: string;
  lowestBidder: string;
  status: 'Active' | 'Closed' | 'Awarded';
  bidsCount: number;
  expiresAt: string;
}

export interface CalculatorRecord {
  id: string;
  name: string;
  category: string;
  defaultRate: number;
  pdfPrice: number;
  usageCount: number;
}

export interface MediaAsset {
  id: string;
  originalName: string;
  s3Url: string;
  s3Key: string;
  mimeType: string;
  size: number;
  category: string;
  uploadedAt: string;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  paymentId: string;
  userPhone: string;
  amount: number;
  currency: string;
  purpose: string;
  status: string;
  createdAt: string;
}

export interface CourseRecord {
  id: string;
  title: string;
  category: string;
  price: number;
  isFree: boolean;
  thumbnailUrl: string;
  description: string;
  lessonsCount: number;
  isPublished: boolean;
  enrollmentsCount: number;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  user: string;
  details: string;
  timestamp: string;
}

// Universal fetch wrapper
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || `HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn(`API Error [${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  // Health
  checkHealth: () => apiFetch<{ status: string; service: string; cloud: string; bucket: string; razorpayConfigured: boolean }>('/api/health'),

  // Analytics
  getAnalytics: () => apiFetch<AnalyticsData>('/api/admin/analytics'),

  // Users
  getUsers: () => apiFetch<UserRecord[]>('/api/admin/users'),
  updateUserStatus: (id: string, status: string) => apiFetch<{ success: boolean; user: UserRecord }>(`/api/admin/users/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),

  // Partners
  getPartners: () => apiFetch<PartnerRecord[]>('/api/partners'),
  getPartnerCategories: () => apiFetch<{ id: string; name: string; count: number; active: boolean }[]>('/api/admin/partner-categories'),
  createPartnerCategory: (name: string) => apiFetch<{ id: string; name: string; count: number; active: boolean }>('/api/admin/partner-categories', {
    method: 'POST',
    body: JSON.stringify({ name })
  }),
  registerPartner: (data: Partial<PartnerRecord>) => apiFetch<{ success: boolean; partner: PartnerRecord }>('/api/partners/register', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updatePartnerStatus: (id: string, status: string, rejectionReason?: string) => apiFetch<{ success: boolean; partner: PartnerRecord }>(`/api/admin/partners/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, rejectionReason })
  }),

  // Auctions
  getAuctions: () => apiFetch<AuctionRecord[]>('/api/auctions'),
  createAuction: (data: Partial<AuctionRecord>) => apiFetch<{ success: boolean; auction: AuctionRecord }>('/api/auctions', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  placeBid: (id: string, data: { bidderName: string; bidderPhone: string; bidAmount: string }) => apiFetch<{ success: boolean; bid: any; auction: AuctionRecord }>(`/api/auctions/${id}/bid`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Calculators & PDF Reports
  getCalculators: () => apiFetch<CalculatorRecord[]>('/api/calculators'),
  updateCalculatorRate: (id: string, defaultRate: number, pdfPrice: number) => apiFetch<{ success: boolean; calculator: CalculatorRecord }>(`/api/admin/calculators/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ defaultRate, pdfPrice })
  }),
  createPdfOrder: (calculatorId: string, calculatorName: string, userPhone: string) => apiFetch<{
    success: boolean;
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    pdfPrice: number;
  }>('/api/calculators/pdf/order', {
    method: 'POST',
    body: JSON.stringify({ calculatorId, calculatorName, userPhone })
  }),
  verifyAndGeneratePdf: (data: any) => apiFetch<{
    success: boolean;
    reportNo: string;
    downloadUrl: string;
    pdfBase64: string;
    message: string;
  }>('/api/calculators/pdf/verify-and-generate', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // S3 Media Library
  getMedia: () => apiFetch<MediaAsset[]>('/api/media'),
  uploadMedia: async (file: File, category = 'General', folder = 'media') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('folder', folder);

    const res = await fetch(`${API_BASE}/api/media/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload file to S3');
    return await res.json();
  },
  deleteMedia: (id: string) => apiFetch<{ success: boolean; message: string }>(`/api/media/${id}`, {
    method: 'DELETE'
  }),

  // CMS
  getCms: () => apiFetch<Record<string, any>>('/api/cms'),
  updateCmsSection: (sectionKey: string, data: any) => apiFetch<{ success: boolean; section: any }>(`/api/admin/cms/${sectionKey}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Courses
  getCourses: () => apiFetch<CourseRecord[]>('/api/courses'),
  createCourse: (data: Partial<CourseRecord>) => apiFetch<{ success: boolean; course: CourseRecord }>('/api/admin/courses', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  deleteCourse: (id: string) => apiFetch<{ success: boolean; message: string }>(`/api/admin/courses/${id}`, {
    method: 'DELETE'
  }),

  // Payments, Subscriptions, Properties & Audit Logs
  getPayments: () => apiFetch<PaymentRecord[]>('/api/admin/payments'),
  getProperties: () => apiFetch<any[]>('/api/properties'),
  getProducts: () => apiFetch<any[]>('/api/products'),
  getServices: () => apiFetch<any[]>('/api/services'),
  updateService: (id: string, data: any) => apiFetch<{ success: boolean; service: any }>(`/api/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  get3DModels: () => apiFetch<any[]>('/api/3d-models'),
  getPdfPurchases: () => apiFetch<any[]>('/api/pdf-purchases'),
  getNotifications: () => apiFetch<any[]>('/api/notifications'),
  getSupportRequests: () => apiFetch<any[]>('/api/support-requests'),
  getAdminUsers: () => apiFetch<any[]>('/api/admin-users'),
  getAuditLogs: () => apiFetch<AuditLogRecord[]>('/api/admin/audit-logs'),
  getSystemSettings: () => apiFetch<any>('/api/admin/settings')
};
