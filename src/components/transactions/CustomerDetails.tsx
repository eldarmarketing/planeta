export default function CustomerDetails() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
      <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
        Данные клиента
      </h2>
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        <li className="flex items-start gap-5 py-2.5">
          <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
            ФИО
          </span>
          <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
            Иванов Алексей Петрович
          </span>
        </li>
        <li className="flex items-start gap-5 py-2.5">
          <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
            Email
          </span>
          <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
            ivanov@example.com
          </span>
        </li>
        <li className="flex items-start gap-5 py-2.5">
          <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
            Телефон
          </span>
          <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
            +7 (999) 123-45-67
          </span>
        </li>
        <li className="flex items-start gap-5 py-2.5">
          <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
            Автомобиль
          </span>
          <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
            BMW X5 (А123ВС77)
          </span>
        </li>
        <li className="flex items-start gap-5 py-2.5">
          <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
            VIN
          </span>
          <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
            WBAPH5C55BA123456
          </span>
        </li>
        <li className="flex items-start gap-5 py-2.5">
          <span className="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">
            Пробег
          </span>
          <span className="w-1/2 text-sm text-gray-700 sm:w-2/3 dark:text-gray-400">
            87 540 км
          </span>
        </li>
      </ul>
    </div>
  );
}
