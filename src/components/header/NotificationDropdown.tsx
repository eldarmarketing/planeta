import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Link } from "react-router";

// Иконки для разных типов уведомлений СТО
const CarIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/15">
    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill="currentColor"/>
    </svg>
  </div>
);

const WrenchIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/15">
    <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z" fill="currentColor"/>
    </svg>
  </div>
);

const BoxIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/15">
    <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
    </svg>
  </div>
);

const MoneyIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 dark:bg-green-500/15">
    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 21H8V18H11V16H8V14H13C15.76 14 18 11.76 18 9C18 6.24 15.76 4 13 4H8V8H6V10H8V12H6V14H8V16H6V18H8V21H6ZM10 6H13C14.65 6 16 7.35 16 9C16 10.65 14.65 12 13 12H10V6Z" fill="currentColor"/>
    </svg>
  </div>
);

const AlertIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/15">
    <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
    </svg>
  </div>
);

// Данные уведомлений для СТО
const notifications = [
  {
    id: 1,
    icon: <CarIcon />,
    title: "Новая запись на сервис",
    message: "Toyota Camry А123МН на 10:00 — ТО + замена масла",
    category: "Запись",
    time: "5 мин назад",
    isNew: true,
  },
  {
    id: 2,
    icon: <WrenchIcon />,
    title: "Заказ-наряд готов",
    message: "BMW X5 К789ОР — работы завершены, можно выдавать",
    category: "Заказ",
    time: "15 мин назад",
    isNew: true,
  },
  {
    id: 3,
    icon: <BoxIcon />,
    title: "Поступление запчастей",
    message: "Прибыла партия: фильтры BMW (24 шт.), колодки (12 шт.)",
    category: "Склад",
    time: "30 мин назад",
    isNew: false,
  },
  {
    id: 4,
    icon: <MoneyIcon />,
    title: "Оплата получена",
    message: "Иванов Алексей оплатил ЗН-2847 — 45 000 ₽",
    category: "Касса",
    time: "1 час назад",
    isNew: false,
  },
  {
    id: 5,
    icon: <AlertIcon />,
    title: "Требуется внимание",
    message: "Mercedes E-Class Х555ХХ — ожидает запчасти 3+ дней",
    category: "Важно",
    time: "2 часа назад",
    isNew: false,
  },
  {
    id: 6,
    icon: <WrenchIcon />,
    title: "Механик завершил работу",
    message: "Петров А. завершил диагностику Kia Sportage",
    category: "Заказ",
    time: "3 часа назад",
    isNew: false,
  },
  {
    id: 7,
    icon: <CarIcon />,
    title: "Напоминание клиенту",
    message: "Отправлено SMS: Volkswagen Tiguan — готов к выдаче",
    category: "Запись",
    time: "4 часа назад",
    isNew: false,
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  const newCount = notifications.filter(n => n.isNew).length;

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Уведомления
            </h5>
            {newCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs font-medium text-white rounded-full bg-brand-500">
                {newCount}
              </span>
            )}
          </div>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {notifications.map((notification) => (
            <li key={notification.id}>
              <DropdownItem
                onItemClick={closeDropdown}
                className={`flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 ${
                  notification.isNew ? "bg-brand-50/50 dark:bg-brand-500/5" : ""
                }`}
              >
                {notification.icon}
                <span className="block flex-1">
                  <span className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {notification.title}
                    </span>
                    {notification.isNew && (
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
                    )}
                  </span>
                  <span className="block mb-1.5 text-theme-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </span>
                  <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      notification.category === "Важно" 
                        ? "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
                        : notification.category === "Касса"
                        ? "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400"
                        : notification.category === "Склад"
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}>
                      {notification.category}
                    </span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{notification.time}</span>
                  </span>
                </span>
              </DropdownItem>
            </li>
          ))}
        </ul>
        <Link
          to="/task-list"
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Все уведомления
        </Link>
      </Dropdown>
    </div>
  );
}
