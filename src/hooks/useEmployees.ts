import { useState, useEffect, useCallback } from 'react';
import { employeesService, Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../services/employeesService';

interface UseEmployeesOptions {
  autoFetch?: boolean;
  page?: number;
  per_page?: number;
}

export function useEmployees(options: UseEmployeesOptions = {}) {
  const { autoFetch = true, page = 1, per_page = 100 } = options;

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({ total: 0, currentPage: 1, totalPages: 1 });

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeesService.getAll({ page, per_page });
      setEmployees(response.data);
      setMeta({
        total: response.meta.total_count,
        currentPage: response.meta.current_page,
        totalPages: response.meta.total_pages,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки сотрудников');
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  }, [page, per_page]);

  useEffect(() => {
    if (autoFetch) {
      fetchEmployees();
    }
  }, [autoFetch, fetchEmployees]);

  const createEmployee = async (data: CreateEmployeeRequest): Promise<Employee | null> => {
    setError(null);
    try {
      const newEmployee = await employeesService.create(data);
      setEmployees((prev) => [newEmployee, ...prev]);
      return newEmployee;
    } catch (err: any) {
      setError(err.message || 'Ошибка создания сотрудника');
      throw err;
    }
  };

  const updateEmployee = async (id: string, data: UpdateEmployeeRequest): Promise<Employee | null> => {
    setError(null);
    try {
      const updatedEmployee = await employeesService.update(id, data);
      setEmployees((prev) => prev.map((e) => (e.id === id ? updatedEmployee : e)));
      return updatedEmployee;
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления сотрудника');
      throw err;
    }
  };

  const deleteEmployee = async (id: string): Promise<void> => {
    setError(null);
    try {
      await employeesService.delete(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления сотрудника');
      throw err;
    }
  };

  return {
    employees,
    loading,
    error,
    meta,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}

