import React from "react";
import Badge from "../ui/badge/Badge";

const mockData = [
  {
    id: 1,
    title: "Заказ-наряды",
    value: "156",
    change: "+12%",
    direction: "up",
    comparisonText: "К прошлому месяцу",
  },
  {
    id: 2,
    title: "Выручка",
    value: "2.4М ₽",
    change: "+8%",
    direction: "up",
    comparisonText: "К прошлому месяцу",
  },
  {
    id: 3,
    title: "Средний чек",
    value: "15 400 ₽",
    change: "+3%",
    direction: "up",
    comparisonText: "К прошлому месяцу",
  },
  {
    id: 4,
    title: "Загрузка СТО",
    value: "87%",
    change: "+5%",
    direction: "up",
    comparisonText: "К прошлому месяцу",
  },
];

const AnalyticsMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {/* <!-- Metric Item Start --> */}
      {mockData.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <p className="text-gray-500 text-theme-sm dark:text-gray-400">
            {item.title}
          </p>
          <div className="flex items-end justify-between mt-3">
            <div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                {item.value}
              </h4>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                color={
                  item.direction === "up"
                    ? "success"
                    : item.direction === "down"
                    ? "error"
                    : "warning"
                }
              >
                <span className="text-xs"> {item.change}</span>
              </Badge>
              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                {item.comparisonText}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* <!-- Metric Item End --> */}
    </div>
  );
};

export default AnalyticsMetrics;
