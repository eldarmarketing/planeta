"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { TrashBinIcon } from "../../../icons";
import AvatarText from "../../ui/avatar/AvatarText";

import Checkbox from "../../form/input/Checkbox";
import Badge from "../../ui/badge/Badge";

// Interface for the table row data
interface ServiceOrder {
  id: string;
  client: {
    initials: string;
    name: string;
    phone: string;
  };
  car: {
    model: string;
    gosNumber: string;
  };
  service: string;
  price: string;
  date: string;
  status: "Выполнен" | "В работе" | "Отменён" | "Ожидает";
}

const tableRowData: ServiceOrder[] = [
  {
    id: "ЗН-001245",
    client: {
      initials: "АИ",
      name: "Алексей Иванов",
      phone: "+7 (903) 123-45-67",
    },
    car: {
      model: "Toyota Camry",
      gosNumber: "А123ВС77",
    },
    service: "Замена масла + фильтры",
    price: "8 500 ₽",
    date: "25.12.2024",
    status: "Выполнен",
  },
  {
    id: "ЗН-001246",
    client: {
      initials: "МП",
      name: "Мария Петрова",
      phone: "+7 (916) 234-56-78",
    },
    car: {
      model: "BMW X5",
      gosNumber: "В456МН99",
    },
    service: "Диагностика подвески",
    price: "3 500 ₽",
    date: "25.12.2024",
    status: "В работе",
  },
  {
    id: "ЗН-001247",
    client: {
      initials: "ДС",
      name: "Дмитрий Сидоров",
      phone: "+7 (926) 345-67-89",
    },
    car: {
      model: "Mercedes E-Class",
      gosNumber: "К789ОР177",
    },
    service: "Замена тормозных колодок",
    price: "12 800 ₽",
    date: "24.12.2024",
    status: "Отменён",
  },
  {
    id: "ЗН-001248",
    client: {
      initials: "ЕК",
      name: "Елена Козлова",
      phone: "+7 (985) 456-78-90",
    },
    car: {
      model: "Audi A6",
      gosNumber: "С012ТУ50",
    },
    service: "Полное ТО",
    price: "25 000 ₽",
    date: "24.12.2024",
    status: "Ожидает",
  },
  {
    id: "ЗН-001249",
    client: {
      initials: "СН",
      name: "Сергей Николаев",
      phone: "+7 (909) 567-89-01",
    },
    car: {
      model: "Lexus RX",
      gosNumber: "Е345КМ777",
    },
    service: "Замена ремня ГРМ",
    price: "35 000 ₽",
    date: "23.12.2024",
    status: "Выполнен",
  },
];

export default function BasicTableTwo() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(tableRowData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Последние заказ-наряды
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Фильтр
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Все заказы
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="px-6 py-3.5 border-t border-gray-100 border-y bg-gray-50 dark:border-white/[0.05] dark:bg-gray-900">
            <TableRow>
              <TableCell className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                <div className="flex items-center gap-3">
                  <div>
                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                      № Заказа
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                Клиент
              </TableCell>
              <TableCell className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                Автомобиль
              </TableCell>
              <TableCell className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                Услуга
              </TableCell>
              <TableCell className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                Сумма
              </TableCell>
              <TableCell className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                Дата
              </TableCell>
              <TableCell className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                Статус
              </TableCell>
              <TableCell className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                Действия
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRowData.map((row: ServiceOrder) => (
              <TableRow key={row.id}>
                <TableCell className="px-4 sm:px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                        {row.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <AvatarText name={row.client.name} className="w-10 h-10" />
                    <div>
                      <span className="mb-0.5 block text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                        {row.client.name}
                      </span>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {row.client.phone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-3.5">
                  <p className="text-gray-700 text-theme-sm dark:text-gray-400 font-medium">
                    {row.car.model}
                  </p>
                  <p className="text-gray-500 text-theme-xs dark:text-gray-500">
                    {row.car.gosNumber}
                  </p>
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-3.5">
                  <p className="text-gray-700 text-theme-sm dark:text-gray-400">
                    {row.service}
                  </p>
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-3.5">
                  <p className="text-gray-700 text-theme-sm dark:text-gray-400 font-semibold">
                    {row.price}
                  </p>
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-3.5">
                  <p className="text-gray-700 text-theme-sm dark:text-gray-400">
                    {row.date}
                  </p>
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-3.5">
                  <Badge
                    variant="light"
                    color={
                      row.status === "Выполнен"
                        ? "success"
                        : row.status === "В работе"
                        ? "warning"
                        : row.status === "Ожидает"
                        ? "warning"
                        : "error"
                    }
                    size="sm"
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-3.5">
                  <button>
                    <TrashBinIcon className="text-gray-700 cursor-pointer size-5 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
