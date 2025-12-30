import apiClient, { PaginatedResponse } from '../lib/apiClient';

export interface Vehicle {
  id: string;
  vin?: string;
  brand: string;
  model: string;
  year: number;
  gos_number: string;
  mileage?: number;
  color?: string;
  fuel_type?: string;
  transmission?: string;
  current_owner_id?: string;
  current_owner?: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateVehicleRequest {
  vin?: string;
  brand: string;
  model: string;
  year: number;
  gos_number: string;
  mileage?: number;
  color?: string;
  fuel_type?: string;
  transmission?: string;
  owner_id?: string;
}

export interface UpdateVehicleRequest extends Partial<CreateVehicleRequest> {}

/**
 * Сервис работы с автомобилями
 */
export const vehiclesService = {
  /**
   * Получить список автомобилей
   * GET /api/v1/vehicles
   */
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    brand?: string;
    with_owner?: boolean;
    without_owner?: boolean;
  }): Promise<PaginatedResponse<Vehicle>> => {
    return await apiClient.get<PaginatedResponse<Vehicle>>('/vehicles', params);
  },

  /**
   * Получить автомобиль по ID
   * GET /api/v1/vehicles/:id
   */
  getById: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.get<{ data: Vehicle }>(`/vehicles/${id}`);
    return response.data;
  },

  /**
   * Создать автомобиль
   * POST /api/v1/vehicles
   */
  create: async (data: CreateVehicleRequest): Promise<Vehicle> => {
    const response = await apiClient.post<{ data: Vehicle }>('/vehicles', {
      vehicle: data,
    });
    return response.data;
  },

  /**
   * Обновить автомобиль
   * PATCH /api/v1/vehicles/:id
   */
  update: async (id: string, data: UpdateVehicleRequest): Promise<Vehicle> => {
    const response = await apiClient.patch<{ data: Vehicle }>(`/vehicles/${id}`, {
      vehicle: data,
    });
    return response.data;
  },

  /**
   * Удалить автомобиль
   * DELETE /api/v1/vehicles/:id
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/vehicles/${id}`);
  },

  /**
   * Поиск по VIN
   * GET /api/v1/vehicles/search_by_vin
   */
  searchByVin: async (vin: string): Promise<{ found: boolean; vehicle?: Vehicle }> => {
    return await apiClient.get<{ found: boolean; vehicle?: Vehicle }>(
      '/vehicles/search_by_vin',
      { vin }
    );
  },

  /**
   * Поиск по гос.номеру
   * GET /api/v1/vehicles/search_by_gos_number
   */
  searchByGosNumber: async (
    gosNumber: string
  ): Promise<{ found: boolean; vehicle?: Vehicle }> => {
    return await apiClient.get<{ found: boolean; vehicle?: Vehicle }>(
      '/vehicles/search_by_gos_number',
      { gos_number: gosNumber }
    );
  },
};

