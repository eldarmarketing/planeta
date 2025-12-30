import { useState, useEffect, useCallback } from 'react';
import {
  workOrdersService,
  WorkOrder,
  WorkOrderStatus,
  CreateWorkOrderRequest,
  UpdateWorkOrderRequest,
} from '../services/workOrdersService';

interface UseWorkOrdersOptions {
  autoFetch?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
  status?: WorkOrderStatus;
  employee_id?: string;
  client_id?: string;
}

export function useWorkOrders(options: UseWorkOrdersOptions = {}) {
  const { autoFetch = true, page = 1, per_page = 100, search, status, employee_id, client_id } =
    options;

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({ total: 0, currentPage: 1, totalPages: 1 });

  const fetchWorkOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await workOrdersService.getAll({
        page,
        per_page,
        search,
        status,
        employee_id,
        client_id,
      });
      setWorkOrders(response.data);
      setMeta({
        total: response.meta.total_count,
        currentPage: response.meta.current_page,
        totalPages: response.meta.total_pages,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки заказ-нарядов');
      console.error('Failed to fetch work orders:', err);
    } finally {
      setLoading(false);
    }
  }, [page, per_page, search, status, employee_id, client_id]);

  useEffect(() => {
    if (autoFetch) {
      fetchWorkOrders();
    }
  }, [autoFetch, fetchWorkOrders]);

  const createWorkOrder = async (data: CreateWorkOrderRequest): Promise<WorkOrder | null> => {
    setError(null);
    try {
      const newWorkOrder = await workOrdersService.create(data);
      setWorkOrders((prev) => [newWorkOrder, ...prev]);
      return newWorkOrder;
    } catch (err: any) {
      setError(err.message || 'Ошибка создания заказ-наряда');
      throw err;
    }
  };

  const updateWorkOrder = async (
    id: string,
    data: UpdateWorkOrderRequest
  ): Promise<WorkOrder | null> => {
    setError(null);
    try {
      const updatedWorkOrder = await workOrdersService.update(id, data);
      setWorkOrders((prev) => prev.map((wo) => (wo.id === id ? updatedWorkOrder : wo)));
      return updatedWorkOrder;
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления заказ-наряда');
      throw err;
    }
  };

  const updateStatus = async (id: string, status: WorkOrderStatus): Promise<WorkOrder | null> => {
    setError(null);
    try {
      const updatedWorkOrder = await workOrdersService.updateStatus(id, status);
      setWorkOrders((prev) => prev.map((wo) => (wo.id === id ? updatedWorkOrder : wo)));
      return updatedWorkOrder;
    } catch (err: any) {
      setError(err.message || 'Ошибка изменения статуса');
      throw err;
    }
  };

  const deleteWorkOrder = async (id: string): Promise<void> => {
    setError(null);
    try {
      await workOrdersService.delete(id);
      setWorkOrders((prev) => prev.filter((wo) => wo.id !== id));
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления заказ-наряда');
      throw err;
    }
  };

  return {
    workOrders,
    loading,
    error,
    meta,
    fetchWorkOrders,
    createWorkOrder,
    updateWorkOrder,
    updateStatus,
    deleteWorkOrder,
  };
}

