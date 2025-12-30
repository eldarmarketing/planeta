import { useState, useEffect, useCallback } from 'react';
import { clientsService, Client, CreateClientRequest, UpdateClientRequest } from '../services/clientsService';

interface UseClientsOptions {
  autoFetch?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
}

export function useClients(options: UseClientsOptions = {}) {
  const { autoFetch = true, page = 1, per_page = 100, search } = options;

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({ total: 0, currentPage: 1, totalPages: 1 });

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await clientsService.getAll({ page, per_page, search });
      setClients(response.data);
      setMeta({
        total: response.meta.total_count,
        currentPage: response.meta.current_page,
        totalPages: response.meta.total_pages,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки клиентов');
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  }, [page, per_page, search]);

  useEffect(() => {
    if (autoFetch) {
      fetchClients();
    }
  }, [autoFetch, fetchClients]);

  const createClient = async (data: CreateClientRequest): Promise<Client | null> => {
    setError(null);
    try {
      const newClient = await clientsService.create(data);
      setClients((prev) => [newClient, ...prev]);
      return newClient;
    } catch (err: any) {
      setError(err.message || 'Ошибка создания клиента');
      throw err;
    }
  };

  const updateClient = async (id: string, data: UpdateClientRequest): Promise<Client | null> => {
    setError(null);
    try {
      const updatedClient = await clientsService.update(id, data);
      setClients((prev) => prev.map((c) => (c.id === id ? updatedClient : c)));
      return updatedClient;
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления клиента');
      throw err;
    }
  };

  const deleteClient = async (id: string): Promise<void> => {
    setError(null);
    try {
      await clientsService.delete(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления клиента');
      throw err;
    }
  };

  return {
    clients,
    loading,
    error,
    meta,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
}

