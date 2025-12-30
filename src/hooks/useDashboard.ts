import { useState, useEffect, useCallback } from 'react';
import { dashboardService, DashboardMetrics, TodaySchedule } from '../services/dashboardService';

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [todaySchedule, setTodaySchedule] = useState<TodaySchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getMetrics();
      setMetrics(data);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки метрик');
      console.error('Failed to fetch metrics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTodaySchedule = useCallback(async () => {
    setError(null);
    try {
      const data = await dashboardService.getTodaySchedule();
      setTodaySchedule(data);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки расписания');
      console.error('Failed to fetch today schedule:', err);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    fetchTodaySchedule();
  }, [fetchMetrics, fetchTodaySchedule]);

  return {
    metrics,
    todaySchedule,
    loading,
    error,
    fetchMetrics,
    fetchTodaySchedule,
  };
}

