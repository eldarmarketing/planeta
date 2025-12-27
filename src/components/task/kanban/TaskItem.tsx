import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Task, DropResult } from "./types/types";

interface TaskItemProps {
  task: Task;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  changeTaskStatus: (taskId: string, newStatus: string) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isMobile?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  moveTask,
  changeTaskStatus,
  onDragStart,
  onDragEnd,
  isMobile = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    Task,
    DropResult,
    { handlerId: string | symbol | null }
  >({
    accept: "task",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: () => ({ name: task.status }),
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<
    Task,
    DropResult,
    { isDragging: boolean }
  >({
    type: "task",
    item: () => {
      onDragStart?.();
      return { ...task, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      onDragEnd?.();
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        changeTaskStatus(item.id, dropResult.name);
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`
        relative bg-white border border-gray-200 task rounded-xl 
        dark:border-gray-800 dark:bg-white/[0.03]
        transition-all duration-200 ease-out
        ${isDragging 
          ? "opacity-50 scale-[0.98] rotate-1 shadow-2xl ring-2 ring-brand-500/50" 
          : "opacity-100 hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-300 dark:hover:border-gray-700"
        }
        ${isMobile ? "active:scale-[0.98]" : ""}
        touch-manipulation
      `}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
      }}
      data-handler-id={handlerId}
    >
      {/* Drag handle indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className={`${isMobile ? "p-3.5" : "p-4 xl:p-5"}`}>
        {/* Header with assignee */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h4 className={`font-medium text-gray-800 dark:text-white/90 leading-snug ${isMobile ? "text-sm" : "text-base"}`}>
            {task.title}
          </h4>
          <div className={`flex-shrink-0 overflow-hidden rounded-full border-2 border-white dark:border-gray-800 shadow-sm bg-gray-100 dark:bg-gray-800 ${isMobile ? "w-7 h-7" : "w-8 h-8"}`}>
            <img src={task.assignee} alt="user" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Description */}
        {task.projectDesc && (
          <p className={`text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 ${isMobile ? "text-xs" : "text-sm"}`}>
            {task.projectDesc}
          </p>
        )}

        {/* Project image */}
        {task.projectImg && (
          <div className="mb-3">
            <img
              src={task.projectImg}
              alt="task"
              className="w-full h-auto overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
            />
          </div>
        )}

        {/* Category badge */}
        <div className="mb-3">
          <span
            className={`
              inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
              ${getCategoryStyles(task.category.color)}
            `}
          >
            {task.category.name}
          </span>
        </div>

        {/* Footer meta */}
        <div className={`flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800 ${isMobile ? "gap-2" : ""}`}>
          {/* Due date */}
          {task.dueDate && (
            <span className={`flex items-center gap-1.5 text-gray-500 dark:text-gray-400 ${isMobile ? "text-xs" : "text-sm"}`}>
              <svg
                className="fill-current flex-shrink-0"
                width={isMobile ? "14" : "16"}
                height={isMobile ? "14" : "16"}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.33329 1.0835C5.74751 1.0835 6.08329 1.41928 6.08329 1.8335V2.25016L9.91663 2.25016V1.8335C9.91663 1.41928 10.2524 1.0835 10.6666 1.0835C11.0808 1.0835 11.4166 1.41928 11.4166 1.8335V2.25016L12.3333 2.25016C13.2998 2.25016 14.0833 3.03366 14.0833 4.00016V6.00016L14.0833 12.6668C14.0833 13.6333 13.2998 14.4168 12.3333 14.4168L3.66663 14.4168C2.70013 14.4168 1.91663 13.6333 1.91663 12.6668L1.91663 6.00016L1.91663 4.00016C1.91663 3.03366 2.70013 2.25016 3.66663 2.25016L4.58329 2.25016V1.8335C4.58329 1.41928 4.91908 1.0835 5.33329 1.0835ZM5.33329 3.75016L3.66663 3.75016C3.52855 3.75016 3.41663 3.86209 3.41663 4.00016V5.25016L12.5833 5.25016V4.00016C12.5833 3.86209 12.4714 3.75016 12.3333 3.75016L10.6666 3.75016L5.33329 3.75016ZM12.5833 6.75016L3.41663 6.75016L3.41663 12.6668C3.41663 12.8049 3.52855 12.9168 3.66663 12.9168L12.3333 12.9168C12.4714 12.9168 12.5833 12.8049 12.5833 12.6668L12.5833 6.75016Z"
                  fill=""
                />
              </svg>
              <span className="truncate">{task.dueDate}</span>
            </span>
          )}

          {/* Comments/Services count */}
          {task.comments !== undefined && (
            <span className={`flex items-center gap-1.5 text-gray-500 dark:text-gray-400 ${isMobile ? "text-xs" : "text-sm"}`}>
              <svg
                className="stroke-current flex-shrink-0"
                width={isMobile ? "14" : "16"}
                height={isMobile ? "14" : "16"}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 15.6343C12.6244 15.6343 15.5625 12.6961 15.5625 9.07178C15.5625 5.44741 12.6244 2.50928 9 2.50928C5.37563 2.50928 2.4375 5.44741 2.4375 9.07178C2.4375 10.884 3.17203 12.5246 4.35961 13.7122L2.4375 15.6343H9Z"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{task.comments}</span>
            </span>
          )}

          {/* Urgent/Links indicator */}
          {task.links && (
            <span className={`flex items-center gap-1.5 text-red-500 dark:text-red-400 font-medium ${isMobile ? "text-xs" : "text-sm"}`}>
              <svg
                className="fill-current flex-shrink-0 animate-pulse"
                width={isMobile ? "14" : "16"}
                height={isMobile ? "14" : "16"}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11Z"
                  fill=""
                />
              </svg>
              <span>Срочно</span>
            </span>
          )}
        </div>
      </div>

      {/* Touch feedback ripple effect on mobile */}
      {isMobile && (
        <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-brand-500/0 active:bg-brand-500/10 transition-colors duration-150" />
        </div>
      )}
    </div>
  );
};

const getCategoryStyles = (color: string) => {
  switch (color) {
    case "error":
      return "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-500/30";
    case "success":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-500/30";
    case "brand":
      return "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400 ring-1 ring-brand-200 dark:ring-brand-500/30";
    case "orange":
      return "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-500/30";
    case "purple":
      return "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400 ring-1 ring-purple-200 dark:ring-purple-500/30";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400 ring-1 ring-gray-200 dark:ring-gray-500/30";
  }
};

export default TaskItem;
