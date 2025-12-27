import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import Column from "./Column";
import { Task } from "./types/types";
import { useWorkOrders } from "../../../context/STOContext";
import { getPlanetAvatar } from "../../../utils/planetAvatar";

// Detect if device is touch-enabled
const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Map work order status to task status
const statusMap: Record<string, string> = {
  initial_contact: "initial_contact",
  diagnostics: "diagnostics",
  estimate: "estimate",
  passed_to_work: "passed_to_work",
  taken_to_work: "taken_to_work",
  ready: "ready",
};

// Map reverse for updating
const reverseStatusMap: Record<string, "initial_contact" | "diagnostics" | "estimate" | "passed_to_work" | "taken_to_work" | "ready"> = {
  initial_contact: "initial_contact",
  diagnostics: "diagnostics",
  estimate: "estimate",
  passed_to_work: "passed_to_work",
  taken_to_work: "taken_to_work",
  ready: "ready",
};

// Get category based on work order title/services
const getCategory = (title: string): { name: string; color: string } => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("то") || lowerTitle.includes("масл") || lowerTitle.includes("фильтр")) {
    return { name: "ТО", color: "orange" };
  }
  if (lowerTitle.includes("диагност")) {
    return { name: "Диагностика", color: "default" };
  }
  if (lowerTitle.includes("шино") || lowerTitle.includes("колёс") || lowerTitle.includes("колес")) {
    return { name: "Шиномонтаж", color: "success" };
  }
  if (lowerTitle.includes("электр")) {
    return { name: "Электрика", color: "brand" };
  }
  return { name: "Ремонт", color: "brand" };
};

// Format date for display
const formatDueDate = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Сегодня";
  if (date.toDateString() === tomorrow.toDateString()) return "Завтра";

  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
};

// Column configuration
const columns = [
  { id: "initial_contact", title: "Первичный контакт", emoji: "📞" },
  { id: "diagnostics", title: "Диагностика", emoji: "🔍" },
  { id: "estimate", title: "Оценка", emoji: "💰" },
  { id: "passed_to_work", title: "Передано в работу", emoji: "📋" },
  { id: "taken_to_work", title: "Взято в работу", emoji: "🔧" },
  { id: "ready", title: "Готово", emoji: "✅" },
];

const KanbanBoard: React.FC = () => {
  const { workOrders, updateStatus, getVehicle, getEmployee } = useWorkOrders();
  const [isDragging, setIsDragging] = useState(false);
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll snap and active column detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / (containerWidth * 0.85));
      if (newIndex !== activeColumnIndex && newIndex >= 0 && newIndex < columns.length) {
        setActiveColumnIndex(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile, activeColumnIndex]);

  // Scroll to column when clicking on mobile navigation
  const scrollToColumn = (index: number) => {
    const container = scrollContainerRef.current;
    const column = columnRefs.current[index];
    if (container && column) {
      const scrollLeft = column.offsetLeft - 16;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      setActiveColumnIndex(index);
    }
  };

  // Transform work orders to tasks
  const tasks = useMemo((): Task[] => {
    return workOrders.map((wo) => {
      const vehicle = getVehicle(wo.vehicleId);
      const employee = getEmployee(wo.employeeId || "");

      const vehicleInfo = vehicle
        ? `${vehicle.brand} ${vehicle.model} ${vehicle.gosNumber}`
        : "";

      return {
        id: wo.id,
        title: `${vehicleInfo} — ${wo.title}`,
        projectDesc: wo.description,
        dueDate: formatDueDate(wo.scheduledDate),
        comments: wo.services.length,
        assignee: employee?.avatar || getPlanetAvatar(wo.id),
        status: statusMap[wo.status] || "todo",
        category: getCategory(wo.title),
        links: wo.priority === "urgent" ? 1 : undefined,
      };
    });
  }, [workOrders, getVehicle, getEmployee]);

  // Get task counts per column
  const taskCounts = useMemo(() => {
    return columns.reduce((acc, col) => {
      acc[col.id] = tasks.filter((t) => t.status === col.id).length;
      return acc;
    }, {} as Record<string, number>);
  }, [tasks]);

  const moveTask = useCallback((_dragIndex: number, _hoverIndex: number) => {
    // For now, we don't persist reordering within the same column
  }, []);

  const changeTaskStatus = useCallback(
    (taskId: string, newStatus: string) => {
      const woStatus = reverseStatusMap[newStatus];
      if (woStatus) {
        updateStatus(taskId, woStatus);
      }
    },
    [updateStatus]
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Choose backend based on device type
  const Backend = isTouchDevice() ? TouchBackend : HTML5Backend;
  const backendOptions = isTouchDevice()
    ? { enableMouseEvents: true, delayTouchStart: 150 }
    : undefined;

  return (
    <DndProvider backend={Backend} options={backendOptions}>
      <div className="flex flex-col">
        {/* Mobile Column Navigator */}
        <div className="lg:hidden sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 p-2">
            {columns.map((col, index) => (
              <button
                key={col.id}
                onClick={() => scrollToColumn(index)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                  transition-all duration-200 ease-out flex-shrink-0
                  ${
                    activeColumnIndex === index
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                <span className="text-base">{col.emoji}</span>
                <span className="hidden sm:inline">{col.title}</span>
                <span
                  className={`
                    inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold
                    ${
                      activeColumnIndex === index
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }
                  `}
                >
                  {taskCounts[col.id]}
                </span>
              </button>
            ))}
          </div>
          {/* Progress indicator */}
          <div className="flex gap-1 px-4 pb-2">
            {columns.map((_, index) => (
              <div
                key={index}
                className={`
                  h-1 flex-1 rounded-full transition-all duration-300
                  ${
                    index === activeColumnIndex
                      ? "bg-brand-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Kanban Columns Container */}
        <div
          ref={scrollContainerRef}
          className={`
            border-t border-gray-200 dark:border-white/[0.05] sm:mt-0
            ${
              isMobile
                ? "flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4"
                : "grid grid-cols-1 divide-x divide-gray-200 dark:divide-white/[0.05] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
            }
          `}
          style={isMobile ? { scrollPaddingLeft: "16px" } : undefined}
        >
          {columns.map((col, index) => (
            <div
              key={col.id}
              ref={(el) => { columnRefs.current[index] = el; }}
              className={`
                ${
                  isMobile
                    ? "snap-start flex-shrink-0 w-[85vw] max-w-[340px] first:ml-0 last:mr-4"
                    : ""
                }
              `}
            >
              <Column
                title={col.title}
                emoji={col.emoji}
                tasks={tasks.filter((task) => task.status === col.id)}
                status={col.id}
                moveTask={moveTask}
                changeTaskStatus={changeTaskStatus}
                isDragging={isDragging}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                isMobile={isMobile}
              />
            </div>
          ))}
        </div>

        {/* Mobile swipe hint (shows only once) */}
        <div className="lg:hidden flex items-center justify-center gap-2 py-3 text-xs text-gray-400 dark:text-gray-500">
          <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Свайпайте для навигации</span>
          <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
