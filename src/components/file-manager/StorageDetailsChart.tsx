import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const StorageDetailsChart: React.FC = () => {
  const isDarkMode = true;

  const options: ApexOptions = useMemo(
    () => ({
      colors: ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e", "#f97316", "#a855f7"],
      labels: ["Двигатель", "Тормоза", "Подвеска", "Фильтры", "Масла", "Электрика"],
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "donut",
      },
      stroke: {
        show: false,
        width: 4,
        colors: ["transparent"],
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: -10,
                color: isDarkMode ? "#ffffff" : "#1D2939",
                fontSize: "14px",
                fontWeight: "500",
              },
              value: {
                show: true,
                offsetY: 0,
                color: isDarkMode ? "#D1D5DB" : "#667085",
                fontSize: "16px",
                fontWeight: "400",
                formatter: () => "На складе",
              },
              total: {
                show: true,
                label: "6 576 000 ₽",
                color: isDarkMode ? "#ffffff" : "#000000",
                fontSize: "16px",
                fontWeight: "bold",
              },
            },
          },
          expandOnClick: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number) => `${val.toLocaleString('ru-RU')} шт.`,
        },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "left",
        fontFamily: "Outfit, sans-serif",
        fontSize: "14px",
        fontWeight: 400,
        markers: {
          size: 6,
          shape: "circle",
          strokeWidth: 0,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 6,
        },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 320,
            },
            legend: {
              itemMargin: {
                horizontal: 7,
                vertical: 5,
              },
              fontSize: "12px",
            },
          },
        },
      ],
    }),
    [isDarkMode]
  );

  // Количество запчастей по категориям
  const series = [1247, 892, 1056, 2340, 1580, 763];

  return (
    <div className="px-4 pt-6 pb-6 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-gray-900 sm:px-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Остатки на складе
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Всего 7 878 позиций
          </p>
        </div>
      </div>
      <div className="flex justify-center mx-auto" id="chartDarkStyle">
        <Chart options={options} series={series} type="donut" width="400" />
      </div>
    </div>
  );
};

export default StorageDetailsChart;
