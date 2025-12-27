import { useState } from "react";
import { MoreDotIcon } from "../../icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

// Иконки для марок автомобилей
const ToyotaLogo = () => (
  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
    <span className="text-red-600 dark:text-red-400 font-bold text-xs">T</span>
  </div>
);

const BMWLogo = () => (
  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
    <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">B</span>
  </div>
);

const MercedesLogo = () => (
  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
    <span className="text-gray-700 dark:text-gray-300 font-bold text-xs">M</span>
  </div>
);

const KiaLogo = () => (
  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
    <span className="text-orange-600 dark:text-orange-400 font-bold text-xs">K</span>
  </div>
);

const VWLogo = () => (
  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">VW</span>
  </div>
);

// Данные по маркам
const carBrands = [
  { name: "Toyota", logo: <ToyotaLogo />, count: 245, percent: 28 },
  { name: "BMW", logo: <BMWLogo />, count: 189, percent: 22 },
  { name: "Mercedes", logo: <MercedesLogo />, count: 156, percent: 18 },
  { name: "Kia", logo: <KiaLogo />, count: 134, percent: 15 },
  { name: "Volkswagen", logo: <VWLogo />, count: 123, percent: 14 },
];

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Популярные марки
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Статистика по обслуживаемым автомобилям
          </p>
        </div>
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

      {/* Круговая диаграмма - простая визуализация */}
      <div className="my-6 flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
              className="dark:stroke-gray-700"
            />
            {/* Toyota - красный */}
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeDasharray="28 72"
              strokeDashoffset="25"
              className="transition-all duration-300"
            />
            {/* BMW - синий */}
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="22 78"
              strokeDashoffset="-3"
              className="transition-all duration-300"
            />
            {/* Mercedes - серый */}
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#6b7280"
              strokeWidth="3"
              strokeDasharray="18 82"
              strokeDashoffset="-25"
              className="transition-all duration-300"
            />
            {/* Kia - оранжевый */}
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              strokeDasharray="15 85"
              strokeDashoffset="-43"
              className="transition-all duration-300"
            />
            {/* VW - индиго */}
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              strokeDasharray="14 86"
              strokeDashoffset="-58"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-white/90">847</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">авто</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {carBrands.map((brand, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {brand.logo}
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {brand.name}
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {brand.count} авто
                </span>
              </div>
            </div>

            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div 
                  className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                  style={{ width: `${brand.percent}%` }}
                ></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {brand.percent}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
