import apiClient from '../lib/apiClient';

export interface DashboardMetrics {
  active_orders: number;
  completed_this_month: number;
  completed_change_percent: number;
  revenue_this_month: number;
  revenue_change_percent: number;
  average_check: number;
  average_check_change_percent: number;
  total_clients: number;
  total_vehicles: number;
  overdue_orders: number;
}

export interface TodaySchedule {
  id: string;
  order_number: string;
  title: string;
  scheduled_date: string;
  status: string;
  priority: string;
  client: {
    id: string;
    name: string;
  };
  vehicle: {
    id: string;
    brand: string;
    model: string;
    gos_number: string;
  };
  employee?: {
    id: string;
    name: string;
  };
}

/**
 * Сервис для Dashboard
 */
export const dashboardService = {
  /**
   * Получить метрики для Dashboard
   * GET /api/v1/dashboard/metrics
   */
  getMetrics: async (): Promise<DashboardMetrics> => {
    return await apiClient.get<DashboardMetrics>('/dashboard/metrics');
  },

  /**
   * Получить сегодняшнее расписание
   * GET /api/v1/dashboard/today_schedule
   */
  getTodaySchedule: async (): Promise<TodaySchedule[]> => {
    const response = await apiClient.get<{ data: TodaySchedule[] }>(
      '/dashboard/today_schedule'
    );
    return response.data;
  },

  /**
   * Получить последние заказы
   * GET /api/v1/dashboard/recent_orders
   */
  getRecentOrders: async (limit?: number): Promise<any[]> => {
    const response = await apiClient.get<{ data: any[] }>('/dashboard/recent_orders', {
      limit: limit || 5,
    });
    return response.data;
  },
};

