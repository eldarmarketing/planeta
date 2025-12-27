import { useMemo } from "react";
import { useSTO } from "../../context/STOContext";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";

export default function STOMetrics() {
  const { state } = useSTO();
  const { workOrders, clients, vehicles } = state;

  const metrics = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // This month orders
    const thisMonthOrders = workOrders.filter((wo) => {
      const date = new Date(wo.createdAt);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    // Last month orders (for comparison)
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const lastMonthOrders = workOrders.filter((wo) => {
      const date = new Date(wo.createdAt);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    });

    // Revenue
    const thisMonthRevenue = thisMonthOrders
      .filter((wo) => wo.status === "ready")
      .reduce((sum, wo) => sum + wo.totalPrice, 0);

    const lastMonthRevenue = lastMonthOrders
      .filter((wo) => wo.status === "ready")
      .reduce((sum, wo) => sum + wo.totalPrice, 0);

    const revenueChange = lastMonthRevenue
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 0;

    // Active orders (all except ready/cancelled)
    const activeOrders = workOrders.filter(
      (wo) => wo.status !== "ready" && wo.status !== "cancelled"
    ).length;

    // Completed this month
    const completedThisMonth = thisMonthOrders.filter(
      (wo) => wo.status === "ready"
    ).length;

    const completedLastMonth = lastMonthOrders.filter(
      (wo) => wo.status === "ready"
    ).length;

    const completedChange = completedLastMonth
      ? ((completedThisMonth - completedLastMonth) / completedLastMonth) * 100
      : 0;

    // Average check
    const avgCheck = completedThisMonth
      ? thisMonthRevenue / completedThisMonth
      : 0;

    const avgCheckLast = completedLastMonth
      ? lastMonthRevenue / completedLastMonth
      : 0;

    const avgCheckChange = avgCheckLast
      ? ((avgCheck - avgCheckLast) / avgCheckLast) * 100
      : 0;

    return {
      activeOrders,
      completedThisMonth,
      completedChange,
      revenue: thisMonthRevenue,
      revenueChange,
      avgCheck,
      avgCheckChange,
      totalClients: clients.length,
      totalVehicles: vehicles.length,
    };
  }, [workOrders, clients, vehicles]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Active Orders */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              В работе
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metrics.activeOrders}
            </h4>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            заказов
          </span>
        </div>
      </div>

      {/* Completed This Month */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg className="size-6 text-gray-800 dark:text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Завершено (мес.)
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metrics.completedThisMonth}
            </h4>
          </div>
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              metrics.completedChange >= 0
                ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
            }`}
          >
            {metrics.completedChange >= 0 ? (
              <ArrowUpIcon className="size-3" />
            ) : (
              <ArrowDownIcon className="size-3" />
            )}
            {Math.abs(metrics.completedChange).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Revenue */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg className="size-6 text-gray-800 dark:text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Выручка (мес.)
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metrics.revenue.toLocaleString("ru-RU")} ₽
            </h4>
          </div>
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              metrics.revenueChange >= 0
                ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
            }`}
          >
            {metrics.revenueChange >= 0 ? (
              <ArrowUpIcon className="size-3" />
            ) : (
              <ArrowDownIcon className="size-3" />
            )}
            {Math.abs(metrics.revenueChange).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Average Check */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg className="size-6 text-gray-800 dark:text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Средний чек
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metrics.avgCheck.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽
            </h4>
          </div>
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              metrics.avgCheckChange >= 0
                ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
            }`}
          >
            {metrics.avgCheckChange >= 0 ? (
              <ArrowUpIcon className="size-3" />
            ) : (
              <ArrowDownIcon className="size-3" />
            )}
            {Math.abs(metrics.avgCheckChange).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Clients */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Клиентов
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metrics.totalClients}
            </h4>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-500">
            в базе
          </span>
        </div>
      </div>

      {/* Vehicles */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg className="size-6 text-gray-800 dark:text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h8M8 17v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2m4 0V8m8 9v2a1 1 0 001 1h2a1 1 0 001-1v-2m-4 0V8m-8 0h8M5 8h14l-2-4H7L5 8z" />
          </svg>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Автомобилей
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {metrics.totalVehicles}
            </h4>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            в базе
          </span>
        </div>
      </div>
    </div>
  );
}

