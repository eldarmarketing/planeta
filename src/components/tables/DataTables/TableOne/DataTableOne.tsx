"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../ui/table";

import PaginationWithIcon from "./PaginationWithIcon";

// Car brand colors and initials
const carBrandStyles: Record<string, { bg: string; text: string; initial: string }> = {
  "BMW": { bg: "bg-blue-600", text: "text-white", initial: "B" },
  "Mercedes": { bg: "bg-gray-800", text: "text-white", initial: "M" },
  "Audi": { bg: "bg-gray-700", text: "text-white", initial: "A" },
  "Toyota": { bg: "bg-red-500", text: "text-white", initial: "T" },
  "Lexus": { bg: "bg-gray-900", text: "text-white", initial: "L" },
  "Volkswagen": { bg: "bg-blue-700", text: "text-white", initial: "VW" },
  "Porsche": { bg: "bg-red-600", text: "text-white", initial: "P" },
  "Kia": { bg: "bg-red-600", text: "text-white", initial: "K" },
  "Land Rover": { bg: "bg-green-700", text: "text-white", initial: "LR" },
  "Hyundai": { bg: "bg-blue-500", text: "text-white", initial: "H" },
};

// Car brand icon component
function CarBrandIcon({ brand }: { brand: string }) {
  const brandKey = Object.keys(carBrandStyles).find(key => brand.includes(key)) || "";
  const style = carBrandStyles[brandKey] || { bg: "bg-gray-500", text: "text-white", initial: brand[0] };
  
  return (
    <div className={`w-10 h-10 rounded-lg ${style.bg} ${style.text} flex items-center justify-center font-bold text-xs shadow-md`}>
      {style.initial}
    </div>
  );
}

const tableRowData = [
  {
    id: 1,
    user: {
      image: "/images/planets/mars.svg",
      name: "Иванов Алексей",
    },
    car: "BMW X5 2021",
    phone: "+7 (999) 123-45-67",
    lastService: "15 дек, 2024",
    totalSpent: "₽ 285,000",
    visits: 12,
  },
  {
    id: 2,
    user: {
      image: "/images/planets/venus.svg",
      name: "Петрова Мария",
    },
    car: "Mercedes E-Class 2022",
    phone: "+7 (916) 234-56-78",
    lastService: "20 дек, 2024",
    totalSpent: "₽ 156,500",
    visits: 8,
  },
  {
    id: 3,
    user: {
      image: "/images/planets/jupiter.svg",
      name: "Сидоров Дмитрий",
    },
    car: "Audi Q7 2020",
    phone: "+7 (903) 345-67-89",
    lastService: "10 дек, 2024",
    totalSpent: "₽ 423,200",
    visits: 15,
  },
  {
    id: 4,
    user: {
      image: "/images/planets/saturn.svg",
      name: "Козлова Анна",
    },
    car: "Toyota Camry 2023",
    phone: "+7 (925) 456-78-90",
    lastService: "25 дек, 2024",
    totalSpent: "₽ 89,000",
    visits: 4,
  },
  {
    id: 5,
    user: {
      image: "/images/planets/neptune.svg",
      name: "Морозов Сергей",
    },
    car: "Lexus RX 2021",
    phone: "+7 (977) 567-89-01",
    lastService: "18 дек, 2024",
    totalSpent: "₽ 312,700",
    visits: 11,
  },
  {
    id: 6,
    user: {
      image: "/images/planets/earth.svg",
      name: "Новикова Елена",
    },
    car: "Volkswagen Tiguan 2022",
    phone: "+7 (915) 678-90-12",
    lastService: "22 дек, 2024",
    totalSpent: "₽ 178,400",
    visits: 7,
  },
  {
    id: 7,
    user: {
      image: "/images/planets/mercury.svg",
      name: "Волков Андрей",
    },
    car: "Porsche Cayenne 2020",
    phone: "+7 (926) 789-01-23",
    lastService: "05 дек, 2024",
    totalSpent: "₽ 567,800",
    visits: 18,
  },
  {
    id: 8,
    user: {
      image: "/images/planets/uranus.svg",
      name: "Соколова Ольга",
    },
    car: "Kia Sportage 2023",
    phone: "+7 (905) 890-12-34",
    lastService: "28 дек, 2024",
    totalSpent: "₽ 67,300",
    visits: 3,
  },
  {
    id: 9,
    user: {
      image: "/images/planets/pluto.svg",
      name: "Лебедев Николай",
    },
    car: "Land Rover Discovery 2021",
    phone: "+7 (919) 901-23-45",
    lastService: "12 дек, 2024",
    totalSpent: "₽ 445,600",
    visits: 14,
  },
  {
    id: 10,
    user: {
      image: "/images/planets/mars.svg",
      name: "Федорова Татьяна",
    },
    car: "Hyundai Tucson 2022",
    phone: "+7 (901) 012-34-56",
    lastService: "23 дек, 2024",
    totalSpent: "₽ 124,900",
    visits: 6,
  },
];

type SortKey = "name" | "car" | "phone" | "visits" | "lastService" | "totalSpent";
type SortOrder = "asc" | "desc";

export default function DataTableOne() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedData = useMemo(() => {
    return tableRowData
      .filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (sortKey === "name") {
          return sortOrder === "asc"
            ? a.user.name.localeCompare(b.user.name)
            : b.user.name.localeCompare(a.user.name);
        }
        if (sortKey === "totalSpent") {
          const spentA = Number.parseInt(a[sortKey].replace(/₽|\s|,/g, ""));
          const spentB = Number.parseInt(b[sortKey].replace(/₽|\s|,/g, ""));
          return sortOrder === "asc" ? spentA - spentB : spentB - spentA;
        }
        if (sortKey === "visits") {
          return sortOrder === "asc" ? a.visits - b.visits : b.visits - a.visits;
        }
        return sortOrder === "asc"
          ? String(a[sortKey]).localeCompare(String(b[sortKey]))
          : String(b[sortKey]).localeCompare(String(a[sortKey]));
      });
  }, [sortKey, sortOrder, searchTerm]);

  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden bg-white dark:bg-white/[0.03] rounded-xl">
      <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400"> Показать </span>
          <div className="relative z-20 bg-transparent">
            <select
              className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {[5, 8, 10].map((value) => (
                <option
                  key={value}
                  value={value}
                  className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                >
                  {value}
                </option>
              ))}
            </select>
            <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
              <svg
                className="stroke-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400"> записей </span>
        </div>

        <div className="relative">
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div>
          <Table>
            <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  { key: "name", label: "Клиент" },
                  { key: "car", label: "Автомобиль" },
                  { key: "phone", label: "Телефон" },
                  { key: "visits", label: "Визиты" },
                  { key: "lastService", label: "Последний визит" },
                  { key: "totalSpent", label: "Общая сумма" },
                ].map(({ key, label }) => (
                  <TableCell
                    key={key}
                    isHeader
                    className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleSort(key as SortKey)}
                    >
                      <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                        {label}
                      </p>
                      <button className="flex flex-col gap-0.5">
                        <svg
                          className={`text-gray-300 dark:text-gray-700  ${
                            sortKey === key && sortOrder === "asc"
                              ? "text-brand-500"
                              : ""
                          }`}
                          width="8"
                          height="5"
                          viewBox="0 0 8 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                            fill="currentColor"
                          />
                        </svg>
                        <svg
                          className={`text-gray-300 dark:text-gray-700  ${
                            sortKey === key && sortOrder === "desc"
                              ? "text-brand-500"
                              : ""
                          }`}
                          width="8"
                          height="5"
                          viewBox="0 0 8 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item, i) => (
                <TableRow key={i + 1}>
                  <TableCell className="px-4 py-3 border border-gray-100 dark:border-white/[0.05] whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          src={item.user.image}
                          className="size-10"
                          alt="avatar"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {item.user.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CarBrandIcon brand={item.car} />
                      <span>{item.car}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                    {item.phone}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400 font-medium">
                      {item.visits}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 font-normal dark:text-gray-400/90 text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                    {item.lastService}
                  </TableCell>
                  <TableCell className="px-4 py-3 font-semibold text-success-600 dark:text-success-400 border border-gray-100 dark:border-white/[0.05] text-theme-sm whitespace-nowrap">
                    {item.totalSpent}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          {/* Left side: Showing entries */}
          <div className="pb-3 xl:pb-0">
            <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
              Показано с {startIndex + 1} по {endIndex} из {totalItems} записей
            </p>
          </div>
          <PaginationWithIcon
            totalPages={totalPages}
            initialPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
