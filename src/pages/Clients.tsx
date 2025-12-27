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
import { useClients, useVehicles } from "../context/STOContext";
import { Client } from "../types/sto";
import { getPlanetAvatar } from "../utils/planetAvatar";

export default function Clients() {
  const { clients, addClient, updateClient, deleteClient, getClientVehicles, getClientOrders } = useClients();
  const { addVehicle, deleteVehicle } = useVehicles();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Vehicle form
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    gosNumber: "",
    vin: "",
    mileage: 0,
  });

  const handleOpenNew = () => {
    setSelectedClient(null);
    setFormData({ name: "", phone: "", email: "" });
    setShowVehicleForm(false);
    openModal();
  };

  const handleOpenEdit = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      name: client.name,
      phone: client.phone,
      email: client.email || "",
    });
    setShowVehicleForm(false);
    openModal();
  };

  const handleSave = () => {
    if (selectedClient) {
      updateClient({
        ...selectedClient,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
      });
    } else {
      addClient({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedClient) {
      // Delete associated vehicles
      const clientVehicles = getClientVehicles(selectedClient.id);
      clientVehicles.forEach(v => deleteVehicle(v.id));
      deleteClient(selectedClient.id);
      closeModal();
    }
  };

  const handleAddVehicle = () => {
    if (selectedClient && vehicleData.brand && vehicleData.model && vehicleData.gosNumber) {
      addVehicle({
        clientId: selectedClient.id,
        brand: vehicleData.brand,
        model: vehicleData.model,
        year: vehicleData.year,
        gosNumber: vehicleData.gosNumber,
        vin: vehicleData.vin || undefined,
        mileage: vehicleData.mileage || undefined,
      });
      setVehicleData({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        gosNumber: "",
        vin: "",
        mileage: 0,
      });
      setShowVehicleForm(false);
    }
  };

  const clientVehicles = selectedClient ? getClientVehicles(selectedClient.id) : [];

  return (
    <>
      <PageMeta
        title="Клиенты | planeta"
        description="Управление клиентами автосервиса"
      />
      <PageBreadcrumb pageTitle="Клиенты" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              База клиентов
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Всего клиентов: {clients.length}
            </p>
          </div>
          <button
            onClick={handleOpenNew}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить клиента
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 border-y dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Клиент
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Контакты
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Автомобили
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Заказы
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Действия
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {clients.map((client) => {
                const clientVehicles = getClientVehicles(client.id);
                const clientOrders = getClientOrders(client.id);
                const activeOrders = clientOrders.filter(o => o.status !== 'ready' && o.status !== 'cancelled');

                return (
                  <TableRow key={client.id}>
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 p-1.5">
                          <img
                            src={getPlanetAvatar(client.name)}
                            alt={client.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90">
                            {client.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            с {new Date(client.createdAt).toLocaleDateString("ru-RU")}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{client.phone}</p>
                        {client.email && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{client.email}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      {clientVehicles.length > 0 ? (
                        <div className="space-y-1">
                          {clientVehicles.slice(0, 2).map((v) => (
                            <p key={v.id} className="text-sm text-gray-700 dark:text-gray-300">
                              {v.brand} {v.model} • {v.gosNumber}
                            </p>
                          ))}
                          {clientVehicles.length > 2 && (
                            <p className="text-xs text-gray-500">+{clientVehicles.length - 2} ещё</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {clientOrders.length}
                        </span>
                        {activeOrders.length > 0 && (
                          <Badge size="sm" color="warning">
                            {activeOrders.length} активных
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <button
                        onClick={() => handleOpenEdit(client)}
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

      {/* Client Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          {selectedClient ? "Редактировать клиента" : "Новый клиент"}
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
              Email (необязательно)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.ru"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Vehicles section (only for existing clients) */}
        {selectedClient && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white">
                Автомобили ({clientVehicles.length})
              </h4>
              <button
                onClick={() => setShowVehicleForm(!showVehicleForm)}
                className="text-sm text-brand-500 hover:text-brand-600 font-medium"
              >
                + Добавить авто
              </button>
            </div>

            {showVehicleForm && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Марка"
                    value={vehicleData.brand}
                    onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Модель"
                    value={vehicleData.model}
                    onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Гос. номер"
                    value={vehicleData.gosNumber}
                    onChange={(e) => setVehicleData({ ...vehicleData, gosNumber: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Год"
                    value={vehicleData.year}
                    onChange={(e) => setVehicleData({ ...vehicleData, year: parseInt(e.target.value) })}
                    className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-sm"
                  />
                </div>
                <button
                  onClick={handleAddVehicle}
                  className="w-full h-10 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
                >
                  Добавить автомобиль
                </button>
              </div>
            )}

            {clientVehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {v.brand} {v.model} ({v.year})
                  </p>
                  <p className="text-xs text-gray-500">
                    {v.gosNumber} {v.vin && `• VIN: ${v.vin}`}
                  </p>
                </div>
                <button
                  onClick={() => deleteVehicle(v.id)}
                  className="text-xs text-error-500 hover:text-error-600"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          {selectedClient ? (
            <button
              onClick={handleDelete}
              className="text-sm text-error-500 hover:text-error-600 font-medium"
            >
              Удалить клиента
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
              disabled={!formData.name || !formData.phone}
              className="px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedClient ? "Сохранить" : "Создать"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

