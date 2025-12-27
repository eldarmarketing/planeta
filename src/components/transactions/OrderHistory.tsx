export default function OrderHistory() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
      <h2 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
        История заказ-наряда
      </h2>
      {/* <!-- Timeline item --> */}
      <div className="relative pb-7 pl-11">
        {/* <!-- Icon --> */}
        <div className="absolute top-0 left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-50 bg-white text-gray-700 ring ring-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800">
          {/* <!-- Car icon --> */}
          <svg
            className="size-5"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 12.75H2.25C1.83579 12.75 1.5 12.4142 1.5 12V9.75M14.25 12.75H15.75C16.1642 12.75 16.5 12.4142 16.5 12V9.75M1.5 9.75L3.21967 5.31802C3.39628 4.86066 3.83158 4.5 4.32107 4.5H13.6789C14.1684 4.5 14.6037 4.86066 14.7803 5.31802L16.5 9.75M1.5 9.75H16.5M4.5 10.5H6M12 10.5H13.5M4.5 15H6C6.41421 15 6.75 14.6642 6.75 14.25V13.5H11.25V14.25C11.25 14.6642 11.5858 15 12 15H13.5C13.9142 15 14.25 14.6642 14.25 14.25V12.75H3.75V14.25C3.75 14.6642 4.08579 15 4.5 15Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ml-4 flex justify-between">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white/90">
              Автомобиль принят
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Приёмка на СТО
            </p>
          </div>

          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              09:30
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              25 дек 2025
            </p>
          </div>
        </div>

        {/* <!-- Vertical line --> */}
        <div className="absolute top-8 left-6 h-full w-px border border-dashed border-gray-300 dark:border-gray-700"></div>
      </div>

      {/* <!-- Timeline item --> */}
      <div className="relative pb-7 pl-11">
        {/* <!-- Icon --> */}
        <div className="absolute top-0 left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-50 bg-white text-gray-700 ring ring-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800">
          {/* <!-- Wrench icon --> */}
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M10.5 7.5L15.75 2.25M16.5 3.75L15.75 2.25L14.25 1.5M6.75 3C4.67893 3 3 4.67893 3 6.75C3 8.82107 4.67893 10.5 6.75 10.5C7.49805 10.5 8.19568 10.2862 8.78033 9.90533L12.75 13.875L14.25 12.375L10.2803 8.40533C10.661 7.82074 10.875 7.12326 10.875 6.375C10.875 4.51104 9.36396 3 7.5 3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ml-4 flex justify-between">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white/90">
              Диагностика выполнена
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Мастер: Сергеев А.В.
            </p>
          </div>

          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              10:45
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              25 дек 2025
            </p>
          </div>
        </div>

        {/* <!-- Vertical line --> */}
        <div className="absolute top-8 left-6 h-full w-px border border-dashed border-gray-300 dark:border-gray-700"></div>
      </div>

      {/* <!-- Timeline item --> */}
      <div className="relative pb-7 pl-11">
        {/* <!-- Icon --> */}
        <div className="absolute top-0 left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-50 bg-white text-gray-700 ring ring-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800">
          {/* <!-- Check icon --> */}
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M3.75 9L7.5 12.75L14.25 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ml-4 flex justify-between">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white/90">
              Работы завершены
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ТО выполнено полностью
            </p>
          </div>

          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              14:20
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              25 дек 2025
            </p>
          </div>
        </div>

        {/* <!-- Vertical line --> */}
        <div className="absolute top-8 left-6 h-full w-px border border-dashed border-gray-300 dark:border-gray-700"></div>
      </div>

      {/* <!-- Timeline item --> */}
      <div className="relative pl-11">
        {/* <!-- Icon --> */}
        <div className="absolute top-0 left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-success-100 bg-success-50 text-success-600 ring ring-success-200 dark:border-success-900 dark:bg-success-500/15 dark:text-success-500 dark:ring-success-800">
          {/* <!-- Payment icon --> */}
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M2.0625 7.875V12.9375C2.0625 13.5588 2.56618 14.0625 3.1875 14.0625H6.97559M2.0625 7.875V6.75M2.0625 7.875H9.06152C9.06152 7.875 10.3431 6.7552 12.4698 6.75M2.0625 6.75V5.0625C2.0625 4.44118 2.56618 3.9375 3.1875 3.9375H14.8125C15.4338 3.9375 15.9375 4.44118 15.9375 5.0625V6.75M2.0625 6.75H12.4698M15.9375 6.75V7.92188C15.9375 7.92188 14.649 6.75526 12.4995 6.75M15.9375 6.75H12.4995M12.4698 6.75C12.4797 6.74998 12.4896 6.74998 12.4995 6.75M12.4698 6.75H12.4995M13.7812 10.8576C13.7812 10.3139 13.3405 9.87318 12.7968 9.87318H12.2812C11.6599 9.87318 11.1562 10.3769 11.1562 10.9982V11.197C11.1562 11.6659 11.4471 12.0857 11.8862 12.2503L13.0513 12.6873C13.4904 12.852 13.7812 13.2717 13.7812 13.7406V13.9395C13.7812 14.5608 13.2776 15.0645 12.6562 15.0645H12.1407C11.597 15.0645 11.1562 14.6237 11.1562 14.08M12.4688 15.0645V15.9375M12.4688 9V9.87318"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ml-4 flex justify-between">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white/90">
              Оплата получена
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Банковская карта • 27 850 ₽
            </p>
          </div>

          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              15:05
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              25 дек 2025
            </p>
          </div>
        </div>
      </div>

      {/* <!-- Action buttons --> */}
      <div className="mt-5 flex items-center justify-center gap-2">
        <button className="shadow-theme-xs rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          Печать
        </button>
        <button className="shadow-theme-xs rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          Отправить на email
        </button>
        <button className="shadow-theme-xs rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          Скачать PDF
        </button>
      </div>
    </div>
  );
}
