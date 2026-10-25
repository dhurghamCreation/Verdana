export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  care: 'Easy' | 'Medium' | 'Expert';
  light: string;
  water: string;
  description: string;
  origin?: string;
  humidity?: string;
  petSafe?: boolean;
  size?: 'Small (6-10")' | 'Medium (12-18")' | 'Large (2-3ft)' | 'Statement (4-6ft)';
  inStock?: boolean;
  stockCount?: number;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface Review {
  id: string;
  plantId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface OrderItem {
  plantId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: 'placed' | 'inspecting' | 'packed' | 'in_transit' | 'delivered';
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  trackingNumber: string;
  estimatedDelivery: string;
  carrier: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  savedPlantIds: string[];
  orders: Order[];
}

export interface DiagnosticRequest {
  plantName: string;
  symptoms: string[];
  environment: {
    light: string;
    wateringFrequency: string;
    humidity: string;
  };
  customNotes?: string;
}

export interface DiagnosticResult {
  diagnosis: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'urgent';
  probableCauses: string[];
  immediateAction: string;
  recoveryPlan: string[];
  wateringAdvice: string;
  lightAdvice: string;
}
