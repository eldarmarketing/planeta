// Типы данных для СТО CRM

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
  vehicles: string[]; // IDs автомобилей
}

export interface Vehicle {
  id: string;
  clientId: string;
  brand: string;
  model: string;
  year: number;
  gosNumber: string;
  vin?: string;
  mileage?: number;
}

export interface Employee {
  id: string;
  name: string;
  role: 'mechanic' | 'diagnostician' | 'electrician' | 'manager' | 'admin';
  phone?: string;
  avatar: string;
  isActive: boolean;
}

export interface WorkOrder {
  id: string;
  orderNumber: string;
  clientId: string;
  vehicleId: string;
  employeeId?: string;
  title: string;
  description?: string;
  status: 'initial_contact' | 'diagnostics' | 'estimate' | 'passed_to_work' | 'taken_to_work' | 'ready' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  services: Service[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  scheduledDate?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  workOrderId?: string;
  clientId?: string;
  vehicleId?: string;
  type: 'appointment' | 'reminder' | 'task';
  priority: 'Danger' | 'Success' | 'Primary' | 'Warning';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

// Store state
export interface STOStore {
  clients: Client[];
  vehicles: Vehicle[];
  employees: Employee[];
  workOrders: WorkOrder[];
  calendarEvents: CalendarEvent[];
  messages: ChatMessage[];
  notifications: Notification[];
}

