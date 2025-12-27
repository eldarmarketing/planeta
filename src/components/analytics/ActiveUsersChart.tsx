import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState } from "react";

export default function ActiveUsersChart() {
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 140,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      title: {
        text: undefined,
      },
    },
  };

  const series = [
    {
      name: "Заказы",
      data: [120, 145, 132, 168, 155, 172, 165, 182, 178, 195, 186, 203],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Механики в работе
        </h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Подробнее
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Экспорт
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-1.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-5 h-5 rounded-full ripple bg-success-500/10">
            <div className="h-1.5 w-1.5 rounded-full bg-success-500 "></div>
          </div>

          <span className="font-semibold text-gray-800 activeUsers text-title-sm dark:text-white/90">
            5 / 6
          </span>
        </div>
        <span className="block mb-1 text-gray-500 text-theme-sm dark:text-gray-400">
          сейчас работают
        </span>
      </div>

      <div className="my-5 min-h-[155px] rounded-xl bg-gray-50 dark:bg-gray-900">
        <div className="-ml-[22px] -mr-2.5 h-full">
          <Chart options={options} series={series} type="area" height={140} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div>
          <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90">
            5.2
          </p>
          <p className="mt-0.5 text-center text-theme-xs text-gray-500 dark:text-gray-400">
            Заказов/день
          </p>
        </div>

        <div className="w-px bg-gray-200 h-11 dark:bg-gray-800"></div>

        <div>
          <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90">
            32
          </p>
          <p className="mt-0.5 text-center text-theme-xs text-gray-500 dark:text-gray-400">
            Заказов/неделя
          </p>
        </div>

        <div className="w-px bg-gray-200 h-11 dark:bg-gray-800"></div>

        <div>
          <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90">
            156
          </p>
          <p className="mt-0.5 text-center text-theme-xs text-gray-500 dark:text-gray-400">
            Заказов/месяц
          </p>
        </div>
      </div>
    </div>
  );
}
