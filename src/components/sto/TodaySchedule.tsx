import { Link } from "react-router";
import { useSTO } from "../../context/STOContext";
import { getPlanetAvatar } from "../../utils/planetAvatar";

export default function TodaySchedule() {
  const { state, getClient, getVehicle } = useSTO();
  const { calendarEvents } = state;

  const today = new Date().toISOString().split("T")[0];
  const todayEvents = calendarEvents.filter((event) => event.start === today);

  const priorityColors: Record<string, string> = {
    Danger: "bg-error-500",
    Warning: "bg-warning-500",
    Success: "bg-success-500",
    Primary: "bg-brand-500",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Записи на сегодня
        </h3>
        <Link
          to="/calendar"
          className="text-sm font-medium text-brand-500 hover:text-brand-600"
        >
          Календарь
        </Link>
      </div>

      <div className="p-5 space-y-4">
        {todayEvents.length > 0 ? (
          todayEvents.map((event) => {
            const client = event.clientId ? getClient(event.clientId) : null;
            const vehicle = event.vehicleId ? getVehicle(event.vehicleId) : null;

            return (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
              >
                <div
                  className={`w-1.5 h-12 rounded-full ${priorityColors[event.priority] || "bg-gray-400"}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 dark:text-white/90 truncate">
                    {event.title}
                  </p>
                  {client && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 p-0.5">
                        <img
                          src={getPlanetAvatar(client.name)}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {client.name}
                      </span>
                    </div>
                  )}
                  {vehicle && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {vehicle.gosNumber}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      event.priority === "Danger"
                        ? "bg-error-100 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                        : event.priority === "Warning"
                        ? "bg-warning-100 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500"
                        : event.priority === "Success"
                        ? "bg-success-100 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                        : "bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-500"
                    }`}
                  >
                    {event.priority === "Danger"
                      ? "Срочно"
                      : event.priority === "Warning"
                      ? "Важно"
                      : event.priority === "Success"
                      ? "Готово"
                      : "Обычный"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Нет записей на сегодня
            </p>
            <Link
              to="/calendar"
              className="inline-block mt-3 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              + Добавить запись
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

