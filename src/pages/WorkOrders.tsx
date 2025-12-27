import { useState, useMemo } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import { useWorkOrders, useClients, useVehicles, useEmployees } from "../context/STOContext";
import { WorkOrder, Service } from "../types/sto";
import { getPlanetAvatar } from "../utils/planetAvatar";

const statusLabels: Record<WorkOrder["status"], string> = {
  initial_contact: "Первичный контакт",
  diagnostics: "Диагностика",
  estimate: "Оценка",
  passed_to_work: "Передано в работу",
  taken_to_work: "Взято в работу",
  ready: "Готово",
  cancelled: "Отменено",
};

const statusColors: Record<WorkOrder["status"], "warning" | "primary" | "success" | "error"> = {
  initial_contact: "warning",
  diagnostics: "primary",
  estimate: "warning",
  passed_to_work: "primary",
  taken_to_work: "primary",
  ready: "success",
  cancelled: "error",
};

const priorityLabels: Record<WorkOrder["priority"], string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
  urgent: "Срочно",
};

export default function WorkOrdersPage() {
  const { workOrders, addWorkOrder, updateWorkOrder, deleteWorkOrder, updateStatus } = useWorkOrders();
  const { clients } = useClients();
  const { vehicles } = useVehicles();
  const { employees } = useEmployees();
  const { isOpen, openModal, closeModal } = useModal();

  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Form state
  const [formData, setFormData] = useState({
    clientId: "",
    vehicleId: "",
    employeeId: "",
    title: "",
    description: "",
    priority: "medium" as WorkOrder["priority"],
    scheduledDate: "",
    services: [] as Service[],
  });

  const [newService, setNewService] = useState({ name: "", price: 0, quantity: 1 });

  // Filter orders
  const filteredOrders = useMemo(() => {
    if (filterStatus === "all") return workOrders;
    return workOrders.filter((o) => o.status === filterStatus);
  }, [workOrders, filterStatus]);

  // Get vehicles for selected client
  const clientVehicles = formData.clientId
    ? vehicles.filter((v) => v.clientId === formData.clientId)
    : [];

  const handleOpenNew = () => {
    setSelectedOrder(null);
    setFormData({
      clientId: "",
      vehicleId: "",
      employeeId: "",
      title: "",
      description: "",
      priority: "medium",
      scheduledDate: new Date().toISOString().split("T")[0],
      services: [],
    });
    openModal();
  };

  const handleOpenEdit = (order: WorkOrder) => {
    setSelectedOrder(order);
    setFormData({
      clientId: order.clientId,
      vehicleId: order.vehicleId,
      employeeId: order.employeeId || "",
      title: order.title,
      description: order.description || "",
      priority: order.priority,
      scheduledDate: order.scheduledDate || "",
      services: [...order.services],
    });
    openModal();
  };

  const handleAddService = () => {
    if (newService.name && newService.price > 0) {
      setFormData({
        ...formData,
        services: [
          ...formData.services,
          { ...newService, id: Date.now().toString() },
        ],
      });
      setNewService({ name: "", price: 0, quantity: 1 });
    }
  };

  const handleRemoveService = (id: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s.id !== id),
    });
  };

  const totalPrice = formData.services.reduce((sum, s) => sum + s.price * s.quantity, 0);

  const handleSave = () => {
    if (selectedOrder) {
      updateWorkOrder({
        ...selectedOrder,
        clientId: formData.clientId,
        vehicleId: formData.vehicleId,
        employeeId: formData.employeeId || undefined,
        title: formData.title,
        description: formData.description || undefined,
        priority: formData.priority,
        scheduledDate: formData.scheduledDate || undefined,
        services: formData.services,
        totalPrice,
      });
    } else {
      addWorkOrder({
        clientId: formData.clientId,
        vehicleId: formData.vehicleId,
        employeeId: formData.employeeId || undefined,
        title: formData.title,
        description: formData.description || undefined,
        status: "initial_contact",
        priority: formData.priority,
        scheduledDate: formData.scheduledDate || undefined,
        services: formData.services,
        totalPrice,
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedOrder) {
      deleteWorkOrder(selectedOrder.id);
      closeModal();
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client?.name || "—";
  };

  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.brand} ${vehicle.model} • ${vehicle.gosNumber}` : "—";
  };

  const getEmployeeName = (employeeId?: string) => {
    if (!employeeId) return "—";
    const employee = employees.find((e) => e.id === employeeId);
    return employee?.name || "—";
  };

  return (
    <>
      <PageMeta
        title="Заказ-наряды | planeta"
        description="Управление заказ-нарядами автосервиса"
      />
      <PageBreadcrumb pageTitle="Заказ-наряды" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Заказ-наряды
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Всего: {workOrders.length} | Активных: {workOrders.filter(o => o.status !== "ready" && o.status !== "cancelled").length}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="all">Все статусы</option>
              <option value="initial_contact">Первичный контакт</option>
              <option value="diagnostics">Диагностика</option>
              <option value="estimate">Оценка</option>
              <option value="passed_to_work">Передано в работу</option>
              <option value="taken_to_work">Взято в работу</option>
              <option value="ready">Готово</option>
            </select>

            <button
              onClick={handleOpenNew}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Новый заказ
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 border-y dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  № / Дата
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Клиент / Авто
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Работы
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Мастер
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Статус
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Сумма
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Действия
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 p-1">
                        <img
                          src={getPlanetAvatar(getClientName(order.clientId))}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {getClientName(order.clientId)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {getVehicleInfo(order.vehicleId)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {order.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {order.services.length} позиций
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {getEmployeeName(order.employeeId)}
                    </p>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <Badge size="sm" color={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                      {order.priority === "urgent" && (
                        <Badge size="sm" color="error">
                          Срочно!
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {order.totalPrice.toLocaleString("ru-RU")} ₽
                    </p>
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(order)}
                        className="text-sm text-brand-500 hover:text-brand-600 font-medium"
                      >
                        Открыть
                      </button>
                      {order.status !== "ready" && order.status !== "cancelled" && (
                        <button
                          onClick={() => {
                            const nextStatus: Record<string, WorkOrder["status"]> = {
                              initial_contact: "diagnostics",
                              diagnostics: "estimate",
                              estimate: "passed_to_work",
                              passed_to_work: "taken_to_work",
                              taken_to_work: "ready",
                            };
                            updateStatus(order.id, nextStatus[order.status] || "ready");
                          }}
                          className="text-sm text-success-500 hover:text-success-600 font-medium"
                        >
                          →
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Work Order Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          {selectedOrder ? `Заказ-наряд ${selectedOrder.orderNumber}` : "Новый заказ-наряд"}
        </h3>

        <div className="space-y-4">
          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Клиент
            </label>
            <select
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value, vehicleId: "" })}
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="">Выберите клиента</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name} • {c.phone}</option>
              ))}
            </select>
          </div>

          {/* Vehicle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Автомобиль
            </label>
            <select
              value={formData.vehicleId}
              onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
              disabled={!formData.clientId}
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white disabled:opacity-50"
            >
              <option value="">Выберите автомобиль</option>
              {clientVehicles.map((v) => (
                <option key={v.id} value={v.id}>{v.brand} {v.model} • {v.gosNumber}</option>
              ))}
            </select>
          </div>

          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Мастер
            </label>
            <select
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="">Назначить позже</option>
              {employees.filter(e => e.isActive).map((e) => (
                <option key={e.id} value={e.id}>{e.name} • {e.role === 'mechanic' ? 'Механик' : e.role === 'diagnostician' ? 'Диагност' : e.role === 'electrician' ? 'Электрик' : e.role}</option>
              ))}
            </select>
          </div>

          {/* Title & Description */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
                Название работ
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Например: ТО + замена масла"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
                Дата записи
              </label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Приоритет
            </label>
            <div className="flex gap-3">
              {(["low", "medium", "high", "urgent"] as const).map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={formData.priority === p}
                    onChange={() => setFormData({ ...formData, priority: p })}
                    className="w-4 h-4 text-brand-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{priorityLabels[p]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Описание / Комментарий
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Описание проблемы или пожелания клиента..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Services */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800 dark:text-white">
                Работы и запчасти
              </h4>
            </div>

            {/* Add service form */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Название"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="flex-1 h-10 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white"
              />
              <input
                type="number"
                placeholder="Цена"
                value={newService.price || ""}
                onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value) || 0 })}
                className="w-24 h-10 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white"
              />
              <input
                type="number"
                placeholder="Кол-во"
                value={newService.quantity}
                onChange={(e) => setNewService({ ...newService, quantity: parseInt(e.target.value) || 1 })}
                className="w-16 h-10 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white"
              />
              <button
                onClick={handleAddService}
                className="h-10 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
              >
                +
              </button>
            </div>

            {/* Services list */}
            {formData.services.length > 0 ? (
              <div className="space-y-2">
                {formData.services.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <span className="text-sm text-gray-800 dark:text-white">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {s.quantity} × {s.price.toLocaleString("ru-RU")} ₽
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {(s.quantity * s.price).toLocaleString("ru-RU")} ₽
                      </span>
                      <button
                        onClick={() => handleRemoveService(s.id)}
                        className="text-error-500 hover:text-error-600"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-800 dark:text-white">Итого:</span>
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    {totalPrice.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                Добавьте работы или запчасти
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          {selectedOrder ? (
            <button
              onClick={handleDelete}
              className="text-sm text-error-500 hover:text-error-600 font-medium"
            >
              Удалить заказ
            </button>
          ) : (
            <div></div>
          )}
          <div className="flex gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.clientId || !formData.vehicleId || !formData.title}
              className="px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedOrder ? "Сохранить" : "Создать заказ"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

