import { Link } from "react-router";
import { useSTO } from "../../context/STOContext";
import Badge from "../ui/badge/Badge";
import { getPlanetAvatar } from "../../utils/planetAvatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

const statusLabels: Record<string, string> = {
  initial_contact: "Первичный контакт",
  diagnostics: "Диагностика",
  estimate: "Оценка",
  passed_to_work: "Передано в работу",
  in_progress: "В работе",
  completed: "Готово",
};

const statusColors: Record<string, "warning" | "primary" | "success" | "error"> = {
  initial_contact: "warning",
  diagnostics: "primary",
  estimate: "warning",
  passed_to_work: "primary",
  in_progress: "primary",
  completed: "success",
};

export default function RecentWorkOrders() {
  const { state, getClient, getVehicle, getEmployee } = useSTO();
  const { workOrders } = state;

  // Get 5 most recent orders
  const recentOrders = [...workOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Последние заказы
        </h3>
        <Link
          to="/work-orders"
          className="text-sm font-medium text-brand-500 hover:text-brand-600"
        >
          Смотреть все
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 border-b dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Заказ
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Клиент / Авто
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Мастер
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Сумма
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Статус
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {recentOrders.map((order) => {
              const client = getClient(order.clientId);
              const vehicle = getVehicle(order.vehicleId);
              const employee = getEmployee(order.employeeId || "");

              return (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {order.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 p-1">
                        <img
                          src={getPlanetAvatar(client?.name || "")}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90 truncate max-w-[120px]">
                          {client?.name || "—"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {vehicle ? `${vehicle.brand} ${vehicle.model}` : "—"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {employee?.name || "—"}
                    </p>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {order.totalPrice.toLocaleString("ru-RU")} ₽
                    </p>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <Badge size="sm" color={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

