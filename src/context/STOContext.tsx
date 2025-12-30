import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  STOStore,
  Client,
  Vehicle,
  Employee,
  WorkOrder,
  CalendarEvent,
  ChatMessage,
  Notification,
} from '../types/sto';

// Action types
type Action =
  | { type: 'SET_ALL'; payload: STOStore }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'DELETE_CLIENT'; payload: string }
  | { type: 'ADD_VEHICLE'; payload: Vehicle }
  | { type: 'UPDATE_VEHICLE'; payload: Vehicle }
  | { type: 'DELETE_VEHICLE'; payload: string }
  | { type: 'ADD_EMPLOYEE'; payload: Employee }
  | { type: 'UPDATE_EMPLOYEE'; payload: Employee }
  | { type: 'DELETE_EMPLOYEE'; payload: string }
  | { type: 'ADD_WORK_ORDER'; payload: WorkOrder }
  | { type: 'UPDATE_WORK_ORDER'; payload: WorkOrder }
  | { type: 'DELETE_WORK_ORDER'; payload: string }
  | { type: 'UPDATE_WORK_ORDER_STATUS'; payload: { id: string; status: WorkOrder['status'] } }
  | { type: 'ADD_CALENDAR_EVENT'; payload: CalendarEvent }
  | { type: 'UPDATE_CALENDAR_EVENT'; payload: CalendarEvent }
  | { type: 'DELETE_CALENDAR_EVENT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'MARK_MESSAGES_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

// const STORAGE_KEY = 'planeta_sto_data'; // Больше не используется

// Initial state
const initialState: STOStore = {
  clients: [],
  vehicles: [],
  employees: [],
  workOrders: [],
  calendarEvents: [],
  messages: [],
  notifications: [],
};

// Reducer
function stoReducer(state: STOStore, action: Action): STOStore {
  switch (action.type) {
    case 'SET_ALL':
      return action.payload;

    // Clients
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] };
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter((c) => c.id !== action.payload),
      };

    // Vehicles
    case 'ADD_VEHICLE':
      return { ...state, vehicles: [...state.vehicles, action.payload] };
    case 'UPDATE_VEHICLE':
      return {
        ...state,
        vehicles: state.vehicles.map((v) =>
          v.id === action.payload.id ? action.payload : v
        ),
      };
    case 'DELETE_VEHICLE':
      return {
        ...state,
        vehicles: state.vehicles.filter((v) => v.id !== action.payload),
      };

    // Employees
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter((e) => e.id !== action.payload),
      };

    // Work Orders
    case 'ADD_WORK_ORDER':
      return { ...state, workOrders: [...state.workOrders, action.payload] };
    case 'UPDATE_WORK_ORDER':
      return {
        ...state,
        workOrders: state.workOrders.map((wo) =>
          wo.id === action.payload.id ? action.payload : wo
        ),
      };
    case 'DELETE_WORK_ORDER':
      return {
        ...state,
        workOrders: state.workOrders.filter((wo) => wo.id !== action.payload),
      };
    case 'UPDATE_WORK_ORDER_STATUS':
      return {
        ...state,
        workOrders: state.workOrders.map((wo) =>
          wo.id === action.payload.id
            ? { ...wo, status: action.payload.status, updatedAt: new Date().toISOString() }
            : wo
        ),
      };

    // Calendar Events
    case 'ADD_CALENDAR_EVENT':
      return { ...state, calendarEvents: [...state.calendarEvents, action.payload] };
    case 'UPDATE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case 'DELETE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.filter((e) => e.id !== action.payload),
      };

    // Messages
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'MARK_MESSAGES_READ':
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.senderId === action.payload ? { ...m, isRead: true } : m
        ),
      };

    // Notifications
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, isRead: true } : n
        ),
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };

    default:
      return state;
  }
}

// Context
interface STOContextType {
  state: STOStore;
  dispatch: React.Dispatch<Action>;
  // Helper functions
  getClient: (id: string) => Client | undefined;
  getVehicle: (id: string) => Vehicle | undefined;
  getEmployee: (id: string) => Employee | undefined;
  getWorkOrder: (id: string) => WorkOrder | undefined;
  getClientVehicles: (clientId: string) => Vehicle[];
  getClientOrders: (clientId: string) => WorkOrder[];
  generateOrderNumber: () => string;
}

const STOContext = createContext<STOContextType | undefined>(undefined);

// Provider
export function STOProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stoReducer, initialState);

  // ❌ УБРАНО: НЕ загружаем НИЧЕГО из localStorage!
  // STOContext больше не используется - все данные через APIContext
  // localStorage используется ТОЛЬКО для токенов, НЕ для данных!
  
  // useEffect(() => {
  //   const saved = localStorage.getItem(STORAGE_KEY);
  //   if (saved) {
  //     try {
  //       const data = JSON.parse(saved) as STOStore;
  //       dispatch({ type: 'SET_ALL', payload: data });
  //     } catch (e) {
  //       console.error('Error loading data from localStorage:', e);
  //     }
  //   }
  // }, []);

  // ❌ УБРАНО: НЕ сохраняем в localStorage!
  // Все данные должны храниться только на сервере через API
  
  // useEffect(() => {
  //   if (state.clients.length > 0 || state.workOrders.length > 0) {
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  //   }
  // }, [state]);

  // Helper functions
  const getClient = (id: string) => state.clients.find((c) => c.id === id);
  const getVehicle = (id: string) => state.vehicles.find((v) => v.id === id);
  const getEmployee = (id: string) => state.employees.find((e) => e.id === id);
  const getWorkOrder = (id: string) => state.workOrders.find((wo) => wo.id === id);
  const getClientVehicles = (clientId: string) =>
    state.vehicles.filter((v) => v.clientId === clientId);
  const getClientOrders = (clientId: string) =>
    state.workOrders.filter((wo) => wo.clientId === clientId);

  const generateOrderNumber = () => {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const count = state.workOrders.length + 1;
    return `ЗН-${year}${month}${count.toString().padStart(4, '0')}`;
  };

  const value: STOContextType = {
    state,
    dispatch,
    getClient,
    getVehicle,
    getEmployee,
    getWorkOrder,
    getClientVehicles,
    getClientOrders,
    generateOrderNumber,
  };

  return <STOContext.Provider value={value}>{children}</STOContext.Provider>;
}

// Hook
export function useSTO() {
  const context = useContext(STOContext);
  if (context === undefined) {
    throw new Error('useSTO must be used within a STOProvider');
  }
  return context;
}

// Specific hooks for convenience
export function useClients() {
  const { state, dispatch, getClientVehicles, getClientOrders } = useSTO();
  
  const addClient = (client: Omit<Client, 'id' | 'createdAt' | 'vehicles'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      vehicles: [],
    };
    dispatch({ type: 'ADD_CLIENT', payload: newClient });
    return newClient;
  };

  const updateClient = (client: Client) => {
    dispatch({ type: 'UPDATE_CLIENT', payload: client });
  };

  const deleteClient = (id: string) => {
    dispatch({ type: 'DELETE_CLIENT', payload: id });
  };

  return {
    clients: state.clients,
    addClient,
    updateClient,
    deleteClient,
    getClientVehicles,
    getClientOrders,
  };
}

export function useWorkOrders() {
  const { state, dispatch, getClient, getVehicle, getEmployee, generateOrderNumber } = useSTO();

  const addWorkOrder = (order: Omit<WorkOrder, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: WorkOrder = {
      ...order,
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_WORK_ORDER', payload: newOrder });
    return newOrder;
  };

  const updateWorkOrder = (order: WorkOrder) => {
    dispatch({ type: 'UPDATE_WORK_ORDER', payload: { ...order, updatedAt: new Date().toISOString() } });
  };

  const updateStatus = (id: string, status: WorkOrder['status']) => {
    dispatch({ type: 'UPDATE_WORK_ORDER_STATUS', payload: { id, status } });
  };

  const deleteWorkOrder = (id: string) => {
    dispatch({ type: 'DELETE_WORK_ORDER', payload: id });
  };

  return {
    workOrders: state.workOrders,
    addWorkOrder,
    updateWorkOrder,
    updateStatus,
    deleteWorkOrder,
    getClient,
    getVehicle,
    getEmployee,
  };
}

export function useCalendarEvents() {
  const { state, dispatch } = useSTO();

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_CALENDAR_EVENT', payload: newEvent });
    return newEvent;
  };

  const updateEvent = (event: CalendarEvent) => {
    dispatch({ type: 'UPDATE_CALENDAR_EVENT', payload: event });
  };

  const deleteEvent = (id: string) => {
    dispatch({ type: 'DELETE_CALENDAR_EVENT', payload: id });
  };

  return {
    events: state.calendarEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}

export function useEmployees() {
  const { state, dispatch } = useSTO();

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
    return newEmployee;
  };

  const updateEmployee = (employee: Employee) => {
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: employee });
  };

  const deleteEmployee = (id: string) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
  };

  return {
    employees: state.employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
}

export function useVehicles() {
  const { state, dispatch } = useSTO();

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_VEHICLE', payload: newVehicle });
    return newVehicle;
  };

  const updateVehicle = (vehicle: Vehicle) => {
    dispatch({ type: 'UPDATE_VEHICLE', payload: vehicle });
  };

  const deleteVehicle = (id: string) => {
    dispatch({ type: 'DELETE_VEHICLE', payload: id });
  };

  return {
    vehicles: state.vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
  };
}

export function useMessages() {
  const { state, dispatch, getClient, getEmployee } = useSTO();

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp' | 'isRead'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
    return newMessage;
  };

  const markAsRead = (senderId: string) => {
    dispatch({ type: 'MARK_MESSAGES_READ', payload: senderId });
  };

  // Get all unique contacts (clients + employees) with their last messages
  const getContacts = () => {
    const contactMap = new Map<string, { 
      id: string; 
      name: string; 
      role: string;
      avatar: string;
      lastMessage?: ChatMessage; 
      unreadCount: number;
    }>();

    // Add clients
    state.clients.forEach(client => {
      const clientMessages = state.messages.filter(
        m => m.senderId === client.id || m.receiverId === client.id
      );
      const lastMessage = clientMessages.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0];
      const unreadCount = clientMessages.filter(
        m => m.senderId === client.id && !m.isRead
      ).length;

      contactMap.set(client.id, {
        id: client.id,
        name: client.name,
        role: 'Клиент',
        avatar: `/images/planets/${['earth', 'venus', 'mercury', 'pluto'][Math.floor(Math.random() * 4)]}.svg`,
        lastMessage,
        unreadCount,
      });
    });

    // Add employees
    state.employees.forEach(employee => {
      const employeeMessages = state.messages.filter(
        m => m.senderId === employee.id || m.receiverId === employee.id
      );
      const lastMessage = employeeMessages.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0];
      const unreadCount = employeeMessages.filter(
        m => m.senderId === employee.id && !m.isRead
      ).length;

      const roleLabels: Record<string, string> = {
        mechanic: 'Механик',
        diagnostician: 'Диагност',
        electrician: 'Электрик',
        manager: 'Менеджер',
        admin: 'Администратор',
      };

      contactMap.set(employee.id, {
        id: employee.id,
        name: employee.name,
        role: roleLabels[employee.role] || employee.role,
        avatar: employee.avatar,
        lastMessage,
        unreadCount,
      });
    });

    return Array.from(contactMap.values()).sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
    });
  };

  // Get messages for a specific contact
  const getMessagesWithContact = (contactId: string) => {
    return state.messages
      .filter(m => m.senderId === contactId || m.receiverId === contactId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  // Get contact info by id
  const getContactInfo = (contactId: string) => {
    const client = getClient(contactId);
    if (client) {
      return { name: client.name, role: 'Клиент', avatar: '' };
    }
    const employee = getEmployee(contactId);
    if (employee) {
      const roleLabels: Record<string, string> = {
        mechanic: 'Механик',
        diagnostician: 'Диагност',
        electrician: 'Электрик',
        manager: 'Менеджер',
        admin: 'Администратор',
      };
      return { name: employee.name, role: roleLabels[employee.role], avatar: employee.avatar };
    }
    return null;
  };

  return {
    messages: state.messages,
    addMessage,
    markAsRead,
    getContacts,
    getMessagesWithContact,
    getContactInfo,
  };
}

export function useNotifications() {
  const { state, dispatch } = useSTO();

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
    return newNotification;
  };

  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const unreadCount = state.notifications.filter((n) => !n.isRead).length;

  return {
    notifications: state.notifications,
    addNotification,
    markAsRead,
    clearAll,
    unreadCount,
  };
}

