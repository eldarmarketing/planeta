import { useModal } from "../../hooks/useModal";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

export default function AddIntegrationModal() {
  const addIntegrationModal = useModal();
  return (
    <>
      <Button onClick={addIntegrationModal.openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 10.0002H15.0006M10.0002 5V15.0006"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Добавить интеграцию
      </Button>
      <Modal
        isOpen={addIntegrationModal.isOpen}
        onClose={addIntegrationModal.closeModal}
        className="relative w-full max-w-[558px] m-5 sm:m-0 rounded-3xl bg-white p-6 lg:p-10 dark:bg-gray-900"
      >
        <div>
          <h4 className="text-title-xs mb-1 font-semibold text-gray-800 dark:text-white/90">
            Новая интеграция
          </h4>
          <p className="mb-7 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Настройте подключение к внешнему сервису для автоматизации работы.
          </p>
          <form action="#">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Выберите сервис
                </label>
                <div
                  x-data="{ isOptionSelected: false }"
                  className="relative z-20 bg-transparent"
                >
                  <select className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                    <option
                      value=""
                      className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                      Выберите сервис
                    </option>
                    <option
                      value="1c"
                      className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                      1С:Бухгалтерия
                    </option>
                    <option
                      value="whatsapp"
                      className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                      WhatsApp Business
                    </option>
                    <option
                      value="telegram"
                      className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                      Telegram-бот
                    </option>
                    <option
                      value="emex"
                      className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                      Emex / Exist
                    </option>
                    <option
                      value="sbp"
                      className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                      СБП (Система быстрых платежей)
                    </option>
                    <option
                      value="yclients"
                      className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                    >
                      YCLIENTS
                    </option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <svg
                      className="stroke-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  API-ключ / Client ID
                </label>
                <input
                  type="text"
                  placeholder="Введите API-ключ"
                  className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Секретный ключ
                </label>
                <input
                  type="text"
                  placeholder="Введите секретный ключ"
                  className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  URL для подключения (webhook)
                </label>
                <input
                  type="text"
                  placeholder="https://api.service.ru/webhook"
                  className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              API-ключи можно получить в личном кабинете выбранного сервиса.
            </p>
          </form>
          <div className="mt-8 flex w-full flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={addIntegrationModal.closeModal}
              className="w-full"
            >
              Отмена
            </Button>
            <Button className="w-full">Подключить</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
