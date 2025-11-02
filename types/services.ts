// Service types for Rider App
export interface VehicleType {
  id: string;
  name: string;
  description: string;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  capacity: number;
  image: string;
  estimatedTime: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  vehicleTypes: VehicleType[];
}

export interface FareEstimate {
  baseFare: number;
  distance: number;
  duration: number;
  totalFare: number;
  currency: string;
  breakdown: {
    baseFare: number;
    distanceFare: number;
    timeFare: number;
    surgeMultiplier?: number;
  };
}

export interface PromoCode {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minFare?: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: 'ride' | 'payment' | 'account' | 'technical' | 'other';
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
}

export interface SupportMessage {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: string;
  attachments?: string[];
}
