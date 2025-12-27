import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

// Иконка автомобиля
const CarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 17H21V15H20.72C20.37 14.35 19.78 13.84 19.05 13.55L17.55 9.55C17.19 8.63 16.32 8 15.35 8H8.65C7.68 8 6.81 8.63 6.45 9.55L4.95 13.55C4.22 13.84 3.63 14.35 3.28 15H3V17H5C5 18.1 5.9 19 7 19C8.1 19 9 18.1 9 17H15C15 18.1 15.9 19 17 19C18.1 19 19 18.1 19 17ZM7.68 10H16.32L17.5 13H6.5L7.68 10ZM7 17C6.45 17 6 16.55 6 16C6 15.45 6.45 15 7 15C7.55 15 8 15.45 8 16C8 16.55 7.55 17 7 17ZM17 17C16.45 17 16 16.55 16 16C16 15.45 16.45 15 17 15C17.55 15 18 15.45 18 16C18 16.55 17.55 17 17 17Z" fill="currentColor"/>
  </svg>
);

// Иконка гаечного ключа
const WrenchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z" fill="currentColor"/>
  </svg>
);

// Иконка рублей
const RubleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 21H8V18H11V16H8V14H13C15.76 14 18 11.76 18 9C18 6.24 15.76 4 13 4H8V8H6V10H8V12H6V14H8V16H6V18H8V21H6ZM10 6H13C14.65 6 16 7.35 16 9C16 10.65 14.65 12 13 12H10V6Z" fill="currentColor"/>
  </svg>
);

// Иконка чека/квитанции
const ReceiptIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2V22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5ZM19 19.09H9V17H19V19.09ZM19 15H9V13H19V15ZM19 11H9V9H19V11Z" fill="currentColor"/>
  </svg>
);

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Авто в работе */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl dark:bg-blue-500/10">
          <CarIcon className="text-blue-600 size-6 dark:text-blue-400" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Авто в работе
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              12
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            3 новых
          </Badge>
        </div>
      </div>

      {/* Заказ-наряды за месяц */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-xl dark:bg-orange-500/10">
          <WrenchIcon className="text-orange-600 size-6 dark:text-orange-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Заказ-наряды
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              847
            </h4>
          </div>

          <Badge color="success">
            <ArrowUpIcon />
            12.5%
          </Badge>
        </div>
      </div>

      {/* Выручка за месяц */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl dark:bg-green-500/10">
          <RubleIcon className="text-green-600 size-6 dark:text-green-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Выручка за месяц
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              4.2 млн ₽
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            8.2%
          </Badge>
        </div>
      </div>

      {/* Средний чек */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl dark:bg-purple-500/10">
          <ReceiptIcon className="text-purple-600 size-6 dark:text-purple-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Средний чек
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              4 960 ₽
            </h4>
          </div>
          <Badge color="error">
            <ArrowDownIcon />
            3.1%
          </Badge>
        </div>
      </div>
    </div>
  );
}
