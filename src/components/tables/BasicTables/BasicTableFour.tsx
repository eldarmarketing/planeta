"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { MoreDotIcon } from "../../../icons";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";

interface WaitingParts {
  id: number;
  owner: {
    image: string;
    name: string;
  };
  car: {
    image: string;
    model: string;
    part: string;
  };
  status: string;
  daysWaiting: number;
}

const waitingPartsData: WaitingParts[] = [
  {
    id: 1,
    owner: {
      image: "/images/planets/mercury.svg",
      name: "Алексей Иванов",
    },
    car: {
      image: "/images/brand/brand-01.svg",
      model: "Toyota Camry",
      part: "Масляный фильтр OEM",
    },
    status: "Заказана",
    daysWaiting: 2,
  },
  {
    id: 2,
    owner: {
      image: "/images/planets/venus.svg",
      name: "Мария Петрова",
    },
    car: {
      image: "/images/brand/brand-02.svg",
      model: "BMW X5",
      part: "Тормозные колодки передние",
    },
    status: "В пути",
    daysWaiting: 5,
  },
  {
    id: 3,
    owner: {
      image: "/images/planets/earth.svg",
      name: "Дмитрий Сидоров",
    },
    car: {
      image: "/images/brand/brand-03.svg",
      model: "Mercedes E-Class",
      part: "Ремень ГРМ + ролики",
    },
    status: "На складе",
    daysWaiting: 0,
  },
  {
    id: 4,
    owner: {
      image: "/images/planets/mars.svg",
      name: "Елена Козлова",
    },
    car: {
      image: "/images/brand/brand-04.svg",
      model: "Audi A6",
      part: "Амортизатор задний",
    },
    status: "Задержка",
    daysWaiting: 12,
  },
  {
    id: 5,
    owner: {
      image: "/images/planets/jupiter.svg",
      name: "Сергей Николаев",
    },
    car: {
      image: "/images/brand/brand-05.svg",
      model: "Lexus RX",
      part: "Катализатор",
    },
    status: "Заказана",
    daysWaiting: 1,
  },
  {
    id: 6,
    owner: {
      image: "/images/planets/saturn.svg",
      name: "Ольга Смирнова",
    },
    car: {
      image: "/images/brand/brand-06.svg",
      model: "Volkswagen Tiguan",
      part: "Радиатор охлаждения",
    },
    status: "В пути",
    daysWaiting: 7,
  },
];

export default function BasicTableFour() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pb-3 pt-4 dark:border-white/[0.05] dark:bg-white/[0.03] sm:px-6">
      <div className="flex justify-between gap-2 mb-4 sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ожидают запчасти
          </h3>
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
              Все запчасти
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

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 border-y dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Клиент
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Автомобиль / Запчасть
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Статус
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ожидание
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {waitingPartsData.map((item) => (
              <TableRow key={item.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-[18px]">
                    <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 p-1.5">
                      <img
                        width={40}
                        height={40}
                        className="w-full h-full"
                        src={item.owner.image}
                        alt="user"
                      />
                    </div>
                    <div>
                      <p className="text-gray-700 text-theme-sm dark:text-gray-400">
                        {item.owner.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center w-full gap-5">
                    <div className="w-full max-w-8">
                      <img
                        width={32}
                        height={32}
                        className="w-full size-8"
                        src={item.car.image}
                        alt="brand"
                      />
                    </div>
                    <div className="truncate">
                      <p className="mb-0.5 truncate text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                        {item.car.model}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {item.car.part}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      item.status === "На складе"
                        ? "success"
                        : item.status === "В пути"
                        ? "warning"
                        : item.status === "Заказана"
                        ? "warning"
                        : "error"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <span className={`text-theme-sm font-medium ${
                    item.daysWaiting === 0 
                      ? "text-success-600" 
                      : item.daysWaiting > 7 
                      ? "text-error-600" 
                      : "text-gray-700 dark:text-gray-400"
                  }`}>
                    {item.daysWaiting === 0 ? "Готово" : `${item.daysWaiting} дн.`}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
