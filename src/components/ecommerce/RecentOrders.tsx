import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Типы статусов заказ-наряда
type OrderStatus = "В работе" | "Ожидает запчасти" | "Готов" | "Выдан";

// Интерфейс для заказ-наряда СТО
interface WorkOrder {
  id: number;
  orderNumber: string;
  car: {
    brand: string;
    model: string;
    plate: string;
    year: number;
  };
  client: string;
  phone: string;
  workType: string;
  status: OrderStatus;
  amount: string;
  mechanic: string;
  postNumber: number;
}

// Данные заказ-нарядов
const workOrders: WorkOrder[] = [
  {
    id: 1,
    orderNumber: "ЗН-2847",
    car: {
      brand: "Toyota",
      model: "Camry",
      plate: "А123МН 77",
      year: 2021,
    },
    client: "Иванов Сергей",
    phone: "+7 (926) 555-12-34",
    workType: "ТО + замена масла",
    status: "В работе",
    amount: "12 500 ₽",
    mechanic: "Петров А.",
    postNumber: 3,
  },
  {
    id: 2,
    orderNumber: "ЗН-2846",
    car: {
      brand: "BMW",
      model: "X5",
      plate: "К789ОР 99",
      year: 2020,
    },
    client: "Козлова Анна",
    phone: "+7 (903) 444-56-78",
    workType: "Замена тормозных колодок",
    status: "Ожидает запчасти",
    amount: "28 900 ₽",
    mechanic: "Сидоров В.",
    postNumber: 1,
  },
  {
    id: 3,
    orderNumber: "ЗН-2845",
    car: {
      brand: "Mercedes",
      model: "E-Class",
      plate: "Х555ХХ 177",
      year: 2022,
    },
    client: "Михайлов Дмитрий",
    phone: "+7 (915) 333-99-00",
    workType: "Диагностика ходовой",
    status: "Готов",
    amount: "4 500 ₽",
    mechanic: "Кузнецов И.",
    postNumber: 2,
  },
  {
    id: 4,
    orderNumber: "ЗН-2844",
    car: {
      brand: "Kia",
      model: "Sportage",
      plate: "М321СТ 50",
      year: 2019,
    },
    client: "Новикова Елена",
    phone: "+7 (977) 222-11-33",
    workType: "Ремонт подвески",
    status: "В работе",
    amount: "45 200 ₽",
    mechanic: "Петров А.",
    postNumber: 4,
  },
  {
    id: 5,
    orderNumber: "ЗН-2843",
    car: {
      brand: "Volkswagen",
      model: "Tiguan",
      plate: "Е999ЕЕ 77",
      year: 2023,
    },
    client: "Смирнов Алексей",
    phone: "+7 (916) 777-88-99",
    workType: "Шиномонтаж + балансировка",
    status: "Выдан",
    amount: "6 800 ₽",
    mechanic: "Волков Д.",
    postNumber: 5,
  },
];

// Цвета для статусов
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "В работе":
      return "primary";
    case "Ожидает запчасти":
      return "warning";
    case "Готов":
      return "success";
    case "Выдан":
      return "light";
    default:
      return "light";
  }
};

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Заказ-наряды
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Текущие автомобили в работе
          </p>
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
            + Новый заказ
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                № / Автомобиль
              </TableCell>
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
                Вид работ
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Пост
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Сумма
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Статус
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {workOrders.map((order) => (
              <TableRow key={order.id} className="">
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-brand-500 text-theme-sm dark:text-brand-400">
                      {order.orderNumber}
                    </p>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {order.car.brand} {order.car.model}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      {order.car.plate} • {order.car.year}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {order.client}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      {order.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <div>
                    <p className="text-gray-700 text-theme-sm dark:text-gray-300">
                      {order.workType}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      Механик: {order.mechanic}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 font-semibold text-theme-sm dark:bg-gray-800 dark:text-white/90">
                    {order.postNumber}
                  </span>
                </TableCell>
                <TableCell className="py-3 font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {order.amount}
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={getStatusColor(order.status)}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
