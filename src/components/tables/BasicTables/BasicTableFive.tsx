import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

// Define the TypeScript interface for the table rows
interface RegularClient {
  id: number;
  name: string;
  car: string;
  visitCount: number;
  lastVisit: string;
  totalSpent: string;
}

// Define the table data using the interface
const tableData: RegularClient[] = [
  {
    id: 1,
    name: "Алексей Иванов",
    car: "Toyota Camry",
    visitCount: 15,
    lastVisit: "25.12.2024",
    totalSpent: "185 000",
  },
  {
    id: 2,
    name: "Мария Петрова",
    car: "BMW X5",
    visitCount: 12,
    lastVisit: "20.12.2024",
    totalSpent: "320 000",
  },
  {
    id: 3,
    name: "Дмитрий Сидоров",
    car: "Mercedes E-Class",
    visitCount: 8,
    lastVisit: "15.12.2024",
    totalSpent: "245 000",
  },
  {
    id: 4,
    name: "Елена Козлова",
    car: "Audi A6",
    visitCount: 22,
    lastVisit: "24.12.2024",
    totalSpent: "410 000",
  },
  {
    id: 5,
    name: "Сергей Николаев",
    car: "Lexus RX",
    visitCount: 6,
    lastVisit: "10.12.2024",
    totalSpent: "156 000",
  },
  {
    id: 6,
    name: "Ольга Смирнова",
    car: "Volkswagen Tiguan",
    visitCount: 18,
    lastVisit: "22.12.2024",
    totalSpent: "198 000",
  },
  {
    id: 7,
    name: "Андрей Кузнецов",
    car: "Hyundai Tucson",
    visitCount: 9,
    lastVisit: "18.12.2024",
    totalSpent: "89 000",
  },
];

export default function BasicTableFive() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white  dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="px-4 pt-4 sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Постоянные клиенты
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
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
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              Все клиенты
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 border-y dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
              >
                Клиент
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
              >
                Автомобиль
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
              >
                Визитов
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
              >
                Последний визит
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
              >
                Всего потрачено
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="px-4 py-3 font-medium text-gray-800 sm:px-6 text-start text-theme-sm dark:text-white/90">
                  {client.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  {client.car}
                </TableCell>
                <TableCell className="px-4 py-3 sm:px-6 text-start">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-theme-sm font-semibold ${
                    client.visitCount >= 15 
                      ? "bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400" 
                      : client.visitCount >= 10 
                      ? "bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                  }`}>
                    {client.visitCount}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  {client.lastVisit}
                </TableCell>
                <TableCell className="px-4 text-theme-sm sm:px-6 text-start text-success-600 font-semibold">
                  {client.totalSpent} ₽
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
