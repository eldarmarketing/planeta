import { useState } from "react";
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
import { useEmployees, useWorkOrders } from "../context/STOContext";
import { Employee } from "../types/sto";
import { getPlanetAvatar } from "../utils/planetAvatar";

const roleLabels: Record<Employee["role"], string> = {
  mechanic: "Механик",
  diagnostician: "Диагност",
  electrician: "Электрик",
  manager: "Менеджер",
  admin: "Администратор",
};

const roleColors: Record<Employee["role"], "primary" | "success" | "warning" | "error"> = {
  mechanic: "primary",
  diagnostician: "warning",
  electrician: "success",
  manager: "primary",
  admin: "error",
};

export default function Employees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { workOrders } = useWorkOrders();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "mechanic" as Employee["role"],
    isActive: true,
  });

  const handleOpenNew = () => {
    setSelectedEmployee(null);
    setFormData({ name: "", phone: "", role: "mechanic", isActive: true });
    openModal();
  };

  const handleOpenEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      phone: employee.phone || "",
      role: employee.role,
      isActive: employee.isActive,
    });
    openModal();
  };

  const handleSave = () => {
    if (selectedEmployee) {
      updateEmployee({
        ...selectedEmployee,
        name: formData.name,
        phone: formData.phone || undefined,
        role: formData.role,
        isActive: formData.isActive,
      });
    } else {
      addEmployee({
        name: formData.name,
        phone: formData.phone || undefined,
        role: formData.role,
        isActive: formData.isActive,
        avatar: getPlanetAvatar(formData.name),
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee.id);
      closeModal();
    }
  };

  // Get active orders count for employee
  const getActiveOrdersCount = (employeeId: string) => {
    return workOrders.filter(
      (wo) => wo.employeeId === employeeId && wo.status !== "ready" && wo.status !== "cancelled"
    ).length;
  };

  // Get completed orders count for employee
  const getCompletedOrdersCount = (employeeId: string) => {
    return workOrders.filter(
      (wo) => wo.employeeId === employeeId && wo.status === "ready"
    ).length;
  };

  return (
    <>
      <PageMeta
        title="Сотрудники | planeta"
        description="Управление сотрудниками автосервиса"
      />
      <PageBreadcrumb pageTitle="Сотрудники" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Сотрудники
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Всего: {employees.length} | Активных: {employees.filter((e) => e.isActive).length}
            </p>
          </div>
          <button
            onClick={handleOpenNew}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить сотрудника
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 border-y dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Сотрудник
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Телефон
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Должность
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  В работе
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Выполнено
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Статус
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Действия
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {employees.map((employee) => {
                const activeOrders = getActiveOrdersCount(employee.id);
                const completedOrders = getCompletedOrdersCount(employee.id);

                return (
                  <TableRow key={employee.id}>
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 p-1.5">
                          <img
                            src={employee.avatar || getPlanetAvatar(employee.name)}
                            alt={employee.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90">
                            {employee.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {employee.phone || "—"}
                      </p>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <Badge size="sm" color={roleColors[employee.role]}>
                        {roleLabels[employee.role]}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {activeOrders}
                        </span>
                        {activeOrders > 2 && (
                          <Badge size="sm" color="warning">
                            Загружен
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {completedOrders}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <Badge size="sm" color={employee.isActive ? "success" : "error"}>
                        {employee.isActive ? "Активен" : "Неактивен"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <button
                        onClick={() => handleOpenEdit(employee)}
                        className="text-sm text-brand-500 hover:text-brand-600 font-medium"
                      >
                        Редактировать
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Employee Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          {selectedEmployee ? "Редактировать сотрудника" : "Новый сотрудник"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              ФИО
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Иванов Иван Иванович"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Телефон
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+7 (999) 123-45-67"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">
              Должность
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as Employee["role"] })}
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="mechanic">Механик</option>
              <option value="diagnostician">Диагност</option>
              <option value="electrician">Электрик</option>
              <option value="manager">Менеджер</option>
              <option value="admin">Администратор</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
              Активен (доступен для назначения на заказы)
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          {selectedEmployee ? (
            <button
              onClick={handleDelete}
              className="text-sm text-error-500 hover:text-error-600 font-medium"
            >
              Удалить сотрудника
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
              disabled={!formData.name}
              className="px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedEmployee ? "Сохранить" : "Создать"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

