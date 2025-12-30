import apiClient, { PaginatedResponse } from '../lib/apiClient';

export interface Employee {
  id: string;
  name: string;
  role: 'mechanic' | 'diagnostician' | 'electrician' | 'body_worker' | 'painter' | 'manager' | 'admin';
  phone?: string;
  avatar?: string;
  is_active: boolean;
  hourly_rate?: number;
  hire_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEmployeeRequest {
  name: string;
  role: Employee['role'];
  phone?: string;
  is_active?: boolean;
  hourly_rate?: number;
  hire_date?: string;
  notes?: string;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {}

/**
 * Сервис работы с сотрудниками
 */
export const employeesService = {
  /**
   * Получить список сотрудников
   * GET /api/v1/employees
   */
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    role?: string;
  }): Promise<PaginatedResponse<Employee>> => {
    return await apiClient.get<PaginatedResponse<Employee>>('/employees', params);
  },

  /**
   * Получить сотрудника по ID
   * GET /api/v1/employees/:id
   */
  getById: async (id: string): Promise<Employee> => {
    const response = await apiClient.get<{ data: Employee }>(`/employees/${id}`);
    return response.data;
  },

  /**
   * Создать сотрудника
   * POST /api/v1/employees
   */
  create: async (data: CreateEmployeeRequest): Promise<Employee> => {
    const response = await apiClient.post<{ data: Employee }>('/employees', {
      employee: data,
    });
    return response.data;
  },

  /**
   * Обновить сотрудника
   * PATCH /api/v1/employees/:id
   */
  update: async (id: string, data: UpdateEmployeeRequest): Promise<Employee> => {
    const response = await apiClient.patch<{ data: Employee }>(`/employees/${id}`, {
      employee: data,
    });
    return response.data;
  },

  /**
   * Удалить сотрудника
   * DELETE /api/v1/employees/:id
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },
};


