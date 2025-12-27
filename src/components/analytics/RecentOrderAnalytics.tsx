import Button from "../ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

// Интерфейс для заказ-нарядов
interface Order {
  id: number;
  carModel: string;
  service: string;
  mechanic: string;
  status: string;
  amount: string;
}

// Данные заказ-нарядов
const tableData: Order[] = [
  {
    id: 1,
    carModel: "Toyota Camry",
    service: "Замена масла",
    mechanic: "Иванов А.",
    status: "Завершён",
    amount: "4 500",
  },
  {
    id: 2,
    carModel: "BMW X5",
    service: "Диагностика ходовой",
    mechanic: "Петров С.",
    status: "В работе",
    amount: "8 200",
  },
  {
    id: 3,
    carModel: "Kia Rio",
    service: "Замена колодок",
    mechanic: "Сидоров В.",
    status: "Завершён",
    amount: "6 800",
  },
  {
    id: 4,
    carModel: "Mercedes E-class",
    service: "ТО-60000",
    mechanic: "Иванов А.",
    status: "В работе",
    amount: "28 500",
  },
  {
    id: 5,
    carModel: "Hyundai Tucson",
    service: "Шиномонтаж",
    mechanic: "Козлов Д.",
    status: "Завершён",
    amount: "3 200",
  },
  {
    id: 6,
    carModel: "Audi A4",
    service: "Замена ремня ГРМ",
    mechanic: "Петров С.",
    status: "Ожидание",
    amount: "15 400",
  },
  {
    id: 7,
    carModel: "Volkswagen Polo",
    service: "Развал-схождение",
    mechanic: "Сидоров В.",
    status: "Завершён",
    amount: "2 800",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Завершён":
      return "text-success-600";
    case "В работе":
      return "text-warning-600";
    case "Ожидание":
      return "text-gray-500";
    default:
      return "text-gray-500";
  }
};

export default function RecentOrderAnalytics() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white  dark:border-white/[0.05] dark:bg-white/[0.03] ">
      <div className="px-4 pt-4 sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Последние заказ-наряды
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline">
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
            </Button>
            <Button size="sm" variant="outline">
              Все заказы
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-full ">
        <div className="overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 border-y dark:border-white/[0.05]">
              <TableRow>
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
                  Услуга
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                >
                  Механик
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                >
                  Статус
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-start text-theme-xs dark:text-gray-400"
                >
                  Сумма
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-4 py-3 font-medium text-gray-800 sm:px-6 text-start text-theme-sm dark:text-white/90">
                    {order.carModel}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                    {order.service}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                    {order.mechanic}
                  </TableCell>
                  <TableCell className={`px-4 py-3 sm:px-6 text-start text-theme-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </TableCell>
                  <TableCell className="px-4 text-theme-sm sm:px-6 text-start text-success-600">
                    {order.amount} ₽
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
