import apiClient, { PaginatedResponse } from '../lib/apiClient';

export type WorkOrderStatus =
  | 'initial_contact'
  | 'diagnostics'
  | 'estimate'
  | 'passed_to_work'
  | 'taken_to_work'
  | 'ready'
  | 'cancelled';

export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface WorkOrderService {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  is_part?: boolean;
  part_number?: string;
  _destroy?: boolean;
}

export interface WorkOrder {
  id: string;
  order_number: string;
  client_id: string;
  vehicle_id: string;
  employee_id?: string;
  title: string;
  description?: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  total_price: number;
  services: WorkOrderService[];
  created_at: string;
  updated_at: string;
  completed_at?: string;
  scheduled_date?: string;
  // Вложенные данные
  client?: {
    id: string;
    name: string;
    phone: string;
  };
  vehicle?: {
    id: string;
    brand: string;
    model: string;
    gos_number: string;
  };
  employee?: {
    id: string;
    name: string;
    role: string;
  };
}

export interface CreateWorkOrderRequest {
  client_id: string;
  vehicle_id: string;
  employee_id?: string;
  title: string;
  description?: string;
  priority?: WorkOrderPriority;
  scheduled_date?: string;
  internal_notes?: string;
  estimated_hours?: number;
  services_attributes?: WorkOrderService[];
}

export interface UpdateWorkOrderRequest extends Partial<CreateWorkOrderRequest> {}

/**
 * Сервис работы с заказ-нарядами
 */
export const workOrdersService = {
  /**
   * Получить список заказ-нарядов
   * GET /api/v1/work_orders
   */
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: WorkOrderStatus;
    employee_id?: string;
    client_id?: string;
    date_from?: string;
    date_to?: string;
  }): Promise<PaginatedResponse<WorkOrder>> => {
    return await apiClient.get<PaginatedResponse<WorkOrder>>('/work_orders', params);
  },

  /**
   * Получить заказ-наряд по ID
   * GET /api/v1/work_orders/:id
   */
  getById: async (id: string): Promise<WorkOrder> => {
    const response = await apiClient.get<{ data: WorkOrder }>(`/work_orders/${id}`);
    return response.data;
  },

  /**
   * Создать заказ-наряд
   * POST /api/v1/work_orders
   */
  create: async (data: CreateWorkOrderRequest): Promise<WorkOrder> => {
    const response = await apiClient.post<{ data: WorkOrder }>('/work_orders', {
      work_order: data,
    });
    return response.data;
  },

  /**
   * Обновить заказ-наряд
   * PATCH /api/v1/work_orders/:id
   */
  update: async (id: string, data: UpdateWorkOrderRequest): Promise<WorkOrder> => {
    const response = await apiClient.patch<{ data: WorkOrder }>(`/work_orders/${id}`, {
      work_order: data,
    });
    return response.data;
  },

  /**
   * Удалить заказ-наряд
   * DELETE /api/v1/work_orders/:id
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/work_orders/${id}`);
  },

  /**
   * Изменить статус заказ-наряда
   * PATCH /api/v1/work_orders/:id/update_status
   */
  updateStatus: async (id: string, status: WorkOrderStatus): Promise<WorkOrder> => {
    const response = await apiClient.patch<{ data: WorkOrder }>(
      `/work_orders/${id}/update_status`,
      { status }
    );
    return response.data;
  },
};


