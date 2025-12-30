import { createContext, useContext, ReactNode } from 'react';
import { useClients } from '../hooks/useClients';
import { useVehicles } from '../hooks/useVehicles';
import { useEmployees } from '../hooks/useEmployees';
import { useWorkOrders } from '../hooks/useWorkOrders';
import type { Client } from '../services/clientsService';
import type { Vehicle } from '../services/vehiclesService';
import type { Employee } from '../services/employeesService';
import type { WorkOrder } from '../services/workOrdersService';

interface APIContextType {
  // Clients
  clients: Client[];
  clientsLoading: boolean;
  clientsError: string | null;
  createClient: ReturnType<typeof useClients>['createClient'];
  updateClient: ReturnType<typeof useClients>['updateClient'];
  deleteClient: ReturnType<typeof useClients>['deleteClient'];
  
  // Vehicles
  vehicles: Vehicle[];
  vehiclesLoading: boolean;
  vehiclesError: string | null;
  createVehicle: ReturnType<typeof useVehicles>['createVehicle'];
  updateVehicle: ReturnType<typeof useVehicles>['updateVehicle'];
  deleteVehicle: ReturnType<typeof useVehicles>['deleteVehicle'];
  
  // Employees
  employees: Employee[];
  employeesLoading: boolean;
  employeesError: string | null;
  createEmployee: ReturnType<typeof useEmployees>['createEmployee'];
  updateEmployee: ReturnType<typeof useEmployees>['updateEmployee'];
  deleteEmployee: ReturnType<typeof useEmployees>['deleteEmployee'];
  
  // Work Orders
  workOrders: WorkOrder[];
  workOrdersLoading: boolean;
  workOrdersError: string | null;
  createWorkOrder: ReturnType<typeof useWorkOrders>['createWorkOrder'];
  updateWorkOrder: ReturnType<typeof useWorkOrders>['updateWorkOrder'];
  updateWorkOrderStatus: ReturnType<typeof useWorkOrders>['updateStatus'];
  deleteWorkOrder: ReturnType<typeof useWorkOrders>['deleteWorkOrder'];
  
  // Helper functions
  getClient: (id: string) => Client | undefined;
  getVehicle: (id: string) => Vehicle | undefined;
  getEmployee: (id: string) => Employee | undefined;
  getWorkOrder: (id: string) => WorkOrder | undefined;
  getClientVehicles: (clientId: string) => Vehicle[];
  getClientOrders: (clientId: string) => WorkOrder[];
}

const APIContext = createContext<APIContextType | undefined>(undefined);

/**
 * Provider для работы с API данными
 * Использует хуки для загрузки данных с бэкенда
 */
export function APIProvider({ children }: { children: ReactNode }) {
  // Загружаем данные
  const {
    clients,
    loading: clientsLoading,
    error: clientsError,
    createClient,
    updateClient,
    deleteClient,
  } = useClients({ autoFetch: false }); // Отключаем автозагрузку пока API не готов

  const {
    vehicles,
    loading: vehiclesLoading,
    error: vehiclesError,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  } = useVehicles({ autoFetch: false }); // Отключаем автозагрузку пока API не готов

  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployees({ autoFetch: false }); // Отключаем автозагрузку пока API не готов

  const {
    workOrders,
    loading: workOrdersLoading,
    error: workOrdersError,
    createWorkOrder,
    updateWorkOrder,
    updateStatus: updateWorkOrderStatus,
    deleteWorkOrder,
  } = useWorkOrders({ autoFetch: false }); // Отключаем автозагрузку пока API не готов

  // Helper functions
  const getClient = (id: string) => clients.find((c) => c.id === id);
  const getVehicle = (id: string) => vehicles.find((v) => v.id === id);
  const getEmployee = (id: string) => employees.find((e) => e.id === id);
  const getWorkOrder = (id: string) => workOrders.find((wo) => wo.id === id);
  
  const getClientVehicles = (clientId: string) =>
    vehicles.filter((v) => v.current_owner_id === clientId);
  
  const getClientOrders = (clientId: string) =>
    workOrders.filter((wo) => wo.client_id === clientId);

  const value: APIContextType = {
    // Clients
    clients,
    clientsLoading,
    clientsError,
    createClient,
    updateClient,
    deleteClient,
    
    // Vehicles
    vehicles,
    vehiclesLoading,
    vehiclesError,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    
    // Employees
    employees,
    employeesLoading,
    employeesError,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    
    // Work Orders
    workOrders,
    workOrdersLoading,
    workOrdersError,
    createWorkOrder,
    updateWorkOrder,
    updateWorkOrderStatus,
    deleteWorkOrder,
    
    // Helpers
    getClient,
    getVehicle,
    getEmployee,
    getWorkOrder,
    getClientVehicles,
    getClientOrders,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

/**
 * Hook для использования API Context
 */
export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
}

