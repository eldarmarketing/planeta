import { useState, useEffect, useCallback } from 'react';
import { vehiclesService, Vehicle, CreateVehicleRequest, UpdateVehicleRequest } from '../services/vehiclesService';

interface UseVehiclesOptions {
  autoFetch?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
}

export function useVehicles(options: UseVehiclesOptions = {}) {
  const { autoFetch = true, page = 1, per_page = 100, search } = options;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({ total: 0, currentPage: 1, totalPages: 1 });

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await vehiclesService.getAll({ page, per_page, search });
      setVehicles(response.data);
      setMeta({
        total: response.meta.total_count,
        currentPage: response.meta.current_page,
        totalPages: response.meta.total_pages,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки автомобилей');
      console.error('Failed to fetch vehicles:', err);
    } finally {
      setLoading(false);
    }
  }, [page, per_page, search]);

  useEffect(() => {
    if (autoFetch) {
      fetchVehicles();
    }
  }, [autoFetch, fetchVehicles]);

  const createVehicle = async (data: CreateVehicleRequest): Promise<Vehicle | null> => {
    setError(null);
    try {
      const newVehicle = await vehiclesService.create(data);
      setVehicles((prev) => [newVehicle, ...prev]);
      return newVehicle;
    } catch (err: any) {
      setError(err.message || 'Ошибка создания автомобиля');
      throw err;
    }
  };

  const updateVehicle = async (id: string, data: UpdateVehicleRequest): Promise<Vehicle | null> => {
    setError(null);
    try {
      const updatedVehicle = await vehiclesService.update(id, data);
      setVehicles((prev) => prev.map((v) => (v.id === id ? updatedVehicle : v)));
      return updatedVehicle;
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления автомобиля');
      throw err;
    }
  };

  const deleteVehicle = async (id: string): Promise<void> => {
    setError(null);
    try {
      await vehiclesService.delete(id);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления автомобиля');
      throw err;
    }
  };

  return {
    vehicles,
    loading,
    error,
    meta,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
}

