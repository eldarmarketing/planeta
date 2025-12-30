import apiClient, { PaginatedResponse } from '../lib/apiClient';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  client_type: 'individual' | 'company' | 'dealer';
  source?: string;
  notes?: string;
  is_vip: boolean;
  discount_percent?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateClientRequest {
  name: string;
  phone: string;
  email?: string;
  client_type?: 'individual' | 'company' | 'dealer';
  notes?: string;
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> {
  is_vip?: boolean;
  discount_percent?: number;
}

/**
 * Сервис работы с клиентами
 */
export const clientsService = {
  /**
   * Получить список клиентов
   * GET /api/v1/clients
   */
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
  }): Promise<PaginatedResponse<Client>> => {
    return await apiClient.get<PaginatedResponse<Client>>('/clients', params);
  },

  /**
   * Получить клиента по ID
   * GET /api/v1/clients/:id
   */
  getById: async (id: string): Promise<Client> => {
    const response = await apiClient.get<{ data: Client }>(`/clients/${id}`);
    return response.data;
  },

  /**
   * Создать клиента
   * POST /api/v1/clients
   */
  create: async (data: CreateClientRequest): Promise<Client> => {
    const response = await apiClient.post<{ data: Client }>('/clients', {
      client: data,
    });
    return response.data;
  },

  /**
   * Обновить клиента
   * PATCH /api/v1/clients/:id
   */
  update: async (id: string, data: UpdateClientRequest): Promise<Client> => {
    const response = await apiClient.patch<{ data: Client }>(`/clients/${id}`, {
      client: data,
    });
    return response.data;
  },

  /**
   * Удалить клиента
   * DELETE /api/v1/clients/:id
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/clients/${id}`);
  },
};

