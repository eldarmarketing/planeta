import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";

export default function IntegrationDetailsModal() {
  const detailsModal = useModal();
  return (
    <>
      <button
        onClick={detailsModal.openModal}
        className="shadow-theme-xs inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-400"
      >
        Детали
      </button>

      <Modal
        isOpen={detailsModal.isOpen}
        onClose={detailsModal.closeModal}
        className=" relative w-full max-w-[558px] m-5 sm:m-0 rounded-3xl bg-white p-6 overflow-hidden lg:p-10 dark:bg-gray-900"
      >
        <div>
          <h4 className="text-title-xs mb-1 font-semibold text-gray-800 dark:text-white/90">
            Информация о подключении
          </h4>
          <p className="mb-7 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Данные для подключения и статус интеграции.
          </p>
          <ul>
            <li className="flex justify-between border-b border-gray-100 py-2.5 dark:border-gray-800">
              <span className="w-1/2 text-sm text-gray-500 dark:text-gray-400">
                Название сервиса
              </span>
              <span className="w-1/2 break-words text-gray-700 dark:text-gray-400">
                1С:Бухгалтерия
              </span>
            </li>
            <li className="flex justify-between border-b border-gray-100 py-2.5 dark:border-gray-800">
              <span className="w-1/2 text-sm text-gray-500 dark:text-gray-400">
                Статус
              </span>
              <span className="w-1/2 break-words text-success-500 font-medium">
                Подключено
              </span>
            </li>
            <li className="flex justify-between border-b border-gray-100 py-2.5 dark:border-gray-800">
              <span className="w-1/2 text-sm text-gray-500 dark:text-gray-400">
                API-ключ
              </span>
              <span className="w-1/2 break-words text-gray-700 dark:text-gray-400 font-mono text-xs">
                ****-****-****-3f2a
              </span>
            </li>
            <li className="flex justify-between border-b border-gray-100 py-2.5 dark:border-gray-800">
              <span className="w-1/2 text-sm text-gray-500 dark:text-gray-400">
                Последняя синхронизация
              </span>
              <span className="w-1/2 break-words text-gray-700 dark:text-gray-400">
                26 дек 2025, 14:32
              </span>
            </li>
            <li className="flex justify-between border-b border-gray-100 py-2.5 dark:border-gray-800">
              <span className="w-1/2 text-sm text-gray-500 dark:text-gray-400">
                Передано документов
              </span>
              <span className="w-1/2 break-words text-gray-700 dark:text-gray-400">
                1 247
              </span>
            </li>
            <li className="flex justify-between py-2.5">
              <span className="w-1/2 text-sm text-gray-500 dark:text-gray-400">
                Ошибок
              </span>
              <span className="w-1/2 break-words text-gray-700 dark:text-gray-400">
                0
              </span>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}
