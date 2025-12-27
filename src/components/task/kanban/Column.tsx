import { Task } from "./types/types";
import TaskItem from "./TaskItem";
import { HorizontaLDots } from "../../../icons";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { useState, useRef } from "react";
import { useDrop } from "react-dnd";

interface ColumnProps {
  title: string;
  emoji?: string;
  tasks: Task[];
  status: string;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  changeTaskStatus: (taskId: string, newStatus: string) => void;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isMobile?: boolean;
}

const Column: React.FC<ColumnProps> = ({
  title,
  emoji,
  tasks,
  status,
  moveTask,
  changeTaskStatus,
  isDragging = false,
  onDragStart,
  onDragEnd,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "task",
    drop: () => ({ name: status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(ref);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Get status color for header accent
  const getStatusColor = () => {
    switch (status) {
      case "initial_contact":
        return "from-blue-500/20 to-transparent";
      case "diagnostics":
        return "from-purple-500/20 to-transparent";
      case "estimate":
        return "from-amber-500/20 to-transparent";
      case "passed_to_work":
        return "from-orange-500/20 to-transparent";
      case "in_progress":
        return "from-cyan-500/20 to-transparent";
      case "completed":
        return "from-emerald-500/20 to-transparent";
      default:
        return "from-gray-500/20 to-transparent";
    }
  };

  const getStatusBadgeColor = () => {
    switch (status) {
      case "initial_contact":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400";
      case "diagnostics":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400";
      case "estimate":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400";
      case "passed_to_work":
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400";
      case "in_progress":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400";
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80";
    }
  };

  return (
    <div
      ref={ref}
      className={`
        flex flex-col swim-lane transition-all duration-200 relative h-full
        ${isMobile ? "rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 mx-1" : ""}
        ${
          isOver && canDrop
            ? "bg-blue-50/80 dark:bg-blue-500/10 ring-2 ring-blue-400/50 ring-inset"
            : canDrop && isDragging
            ? "bg-gray-50/50 dark:bg-gray-500/5"
            : isDragging
            ? "opacity-80"
            : ""
        }
      `}
    >
      {/* Gradient accent at top */}
      <div
        className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${getStatusColor()} pointer-events-none ${
          isMobile ? "rounded-t-2xl" : ""
        }`}
      />

      {/* Drop zone indicator overlay */}
      {isOver && canDrop && (
        <div className="absolute inset-2 bg-blue-500/10 dark:bg-blue-400/10 z-10 pointer-events-none rounded-xl border-2 border-dashed border-blue-400/50 flex items-center justify-center">
          <div className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
            Отпустите здесь
          </div>
        </div>
      )}

      {/* Column header */}
      <div
        className={`
          sticky top-0 z-10 backdrop-blur-sm
          ${isMobile ? "bg-white/80 dark:bg-gray-900/80 rounded-t-2xl" : "bg-white/90 dark:bg-gray-900/90"}
        `}
      >
        <div className={`flex items-center justify-between p-4 ${isMobile ? "" : "xl:p-6"}`}>
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-white/90">
            {emoji && <span className="text-lg">{emoji}</span>}
            <span className={isMobile ? "text-sm" : ""}>{title}</span>
            <span
              className={`
                inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-semibold
                ${getStatusBadgeColor()}
              `}
            >
              {tasks.length}
            </span>
          </h3>
          <div className="relative">
            <button 
              onClick={toggleDropdown} 
              className="dropdown-toggle p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <HorizontaLDots className="text-gray-400 hover:text-gray-700 size-5 dark:hover:text-gray-300" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="absolute right-0 top-full z-40 w-[140px] space-y-1 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 text-sm py-2 px-3"
              >
                Редактировать
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 text-sm py-2 px-3"
              >
                Скрыть
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-red-500 rounded-lg hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 text-sm py-2 px-3"
              >
                Очистить
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Tasks container */}
      <div
        className={`
          flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar
          ${isMobile ? "p-3 pb-4 max-h-[60vh]" : "p-4 xl:p-6 pt-0 xl:pt-0"}
        `}
      >
        {tasks.length === 0 ? (
          <div
            className={`
              flex flex-col items-center justify-center py-8 text-center
              ${isDragging ? "border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30" : ""}
            `}
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isDragging ? "Перетащите сюда" : "Нет заказов"}
            </p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              moveTask={moveTask}
              changeTaskStatus={changeTaskStatus}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isMobile={isMobile}
            />
          ))
        )}
      </div>

      {/* Add task button */}
      <div className={`p-3 ${isMobile ? "" : "xl:px-6 xl:pb-6"}`}>
        <button
          className={`
            w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
            border-2 border-dashed border-gray-200 dark:border-gray-700
            text-gray-500 dark:text-gray-400 text-sm font-medium
            hover:border-brand-300 hover:text-brand-500 hover:bg-brand-50/50
            dark:hover:border-brand-700 dark:hover:text-brand-400 dark:hover:bg-brand-500/5
            transition-all duration-200
          `}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default Column;
