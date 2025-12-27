import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { UserCircleIcon, GroupIcon } from "../../../icons";

interface Car {
  id: number;
  owner: {
    name: string;
    phone: string;
  };
  car: string;
  gosNumber: string;
  mechanicsCount: number;
  status: string;
  lastService: string;
}

// Данные автомобилей
const tableData: Car[] = [
  {
    id: 1,
    owner: {
      name: "Алексей Иванов",
      phone: "+7 (903) 123-45-67",
    },
    car: "Toyota Camry 2021",
    gosNumber: "А123ВС77",
    mechanicsCount: 2,
    lastService: "15.12.2024",
    status: "На обслуживании",
  },
  {
    id: 2,
    owner: {
      name: "Мария Петрова",
      phone: "+7 (916) 234-56-78",
    },
    car: "BMW X5 2022",
    gosNumber: "В456МН99",
    mechanicsCount: 1,
    lastService: "10.12.2024",
    status: "Ожидает запчасти",
  },
  {
    id: 3,
    owner: {
      name: "Дмитрий Сидоров",
      phone: "+7 (926) 345-67-89",
    },
    car: "Mercedes E-Class 2020",
    gosNumber: "К789ОР177",
    mechanicsCount: 2,
    lastService: "05.12.2024",
    status: "Готов к выдаче",
  },
  {
    id: 4,
    owner: {
      name: "Елена Козлова",
      phone: "+7 (985) 456-78-90",
    },
    car: "Audi A6 2019",
    gosNumber: "С012ТУ50",
    mechanicsCount: 3,
    lastService: "01.12.2024",
    status: "Выдан",
  },
  {
    id: 5,
    owner: {
      name: "Сергей Николаев",
      phone: "+7 (909) 567-89-01",
    },
    car: "Lexus RX 2023",
    gosNumber: "Е345КМ777",
    mechanicsCount: 2,
    lastService: "20.12.2024",
    status: "На обслуживании",
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Владелец
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Автомобиль
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Гос. номер
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Механики
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Статус
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Последнее ТО
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
                      <UserCircleIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {car.owner.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {car.owner.phone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-300 font-medium">
                  {car.car}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-xs">
                    {car.gosNumber}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <GroupIcon className="w-5 h-5 text-gray-400" />
                    <span>{car.mechanicsCount}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      car.status === "На обслуживании"
                        ? "warning"
                        : car.status === "Готов к выдаче"
                        ? "success"
                        : car.status === "Выдан"
                        ? "success"
                        : "error"
                    }
                  >
                    {car.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {car.lastService}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
