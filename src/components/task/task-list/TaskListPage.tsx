import React, { useState } from "react";
import { Task } from "./types/Task";
import TaskHeader from "../TaskHeader";
import TaskLane from "./TaskLane";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Toyota Camry А123МН — ТО + замена масла",
    isChecked: false,
    dueDate: "Сегодня",
    commentCount: 1,
    category: "ТО",
    userAvatar: "/images/user/user-01.jpg",
    status: "todo",
    toggleChecked: () => {},
  },
  {
    id: "2",
    title: "BMW X5 К789ОР — Диагностика двигателя",
    isChecked: false,
    dueDate: "Завтра",
    commentCount: 2,
    category: "Диагностика",
    userAvatar: "/images/user/user-02.jpg",
    status: "todo",
    toggleChecked: () => {},
  },
  {
    id: "3",
    title: "Mercedes E-Class Х555ХХ — Заказ запчастей",
    isChecked: true,
    dueDate: "25 дек",
    commentCount: 1,
    category: "Запчасти",
    userAvatar: "/images/user/user-03.jpg",
    status: "todo",
    toggleChecked: () => {},
  },
  {
    id: "4",
    title: "Kia Sportage М321СТ — Ремонт подвески",
    isChecked: false,
    dueDate: "Сегодня",
    commentCount: 2,
    category: "Ремонт",
    userAvatar: "/images/user/user-04.jpg",
    status: "in-progress",
    toggleChecked: () => {},
  },
  {
    id: "5",
    title: "Volkswagen Tiguan Е999ЕЕ — Шиномонтаж",
    isChecked: false,
    dueDate: "Сегодня",
    commentCount: 2,
    userAvatar: "/images/user/user-05.jpg",
    status: "in-progress",
    toggleChecked: () => {},
  },
  {
    id: "6",
    title: "Hyundai Tucson В777ВВ — Замена ремня ГРМ",
    isChecked: true,
    dueDate: "26 дек",
    commentCount: 2,
    userAvatar: "/images/user/user-06.jpg",
    status: "in-progress",
    toggleChecked: () => {},
  },
  {
    id: "7",
    title: "Nissan Qashqai О123ОО — Замена свечей",
    isChecked: false,
    dueDate: "27 дек",
    commentCount: 2,
    userAvatar: "/images/user/user-07.jpg",
    status: "in-progress",
    toggleChecked: () => {},
  },
  {
    id: "8",
    title: "Skoda Octavia Р456РР — Замена масла АКПП",
    isChecked: false,
    dueDate: "24 дек",
    commentCount: 1,
    category: "ТО",
    userAvatar: "/images/user/user-08.jpg",
    status: "completed",
    toggleChecked: () => {},
  },
  {
    id: "9",
    title: "Mazda CX-5 С111СС — Чистка форсунок",
    isChecked: false,
    dueDate: "23 дек",
    commentCount: 1,
    category: "Диагностика",
    userAvatar: "/images/user/user-09.jpg",
    status: "completed",
    toggleChecked: () => {},
  },
  {
    id: "10",
    title: "Audi A4 Т222ТТ — Замена тормозных дисков",
    isChecked: false,
    dueDate: "22 дек",
    commentCount: 1,
    category: "Ремонт",
    userAvatar: "/images/user/user-10.jpg",
    status: "completed",
    toggleChecked: () => {},
  },
  {
    id: "11",
    title: "Ford Focus У333УУ — Балансировка колёс",
    isChecked: false,
    dueDate: "21 дек",
    commentCount: 1,
    category: "Шиномонтаж",
    userAvatar: "/images/user/user-11.jpg",
    status: "completed",
    toggleChecked: () => {},
  },
];

const lanes = ["todo", "in-progress", "completed"];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.map((task) => ({
      ...task,
      toggleChecked: () => toggleChecked(task.id),
    }))
  );
  const [dragging, setDragging] = useState<string | null>(null);

  const handleDragStart = (
    _: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    setDragging(taskId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    if (dragging === null) return;

    const updatedTasks = tasks.map((task) =>
      task.id === dragging ? { ...task, status } : task
    );

    // Sort tasks within the same status
    const statusTasks = updatedTasks.filter((task) => task.status === status);
    const otherTasks = updatedTasks.filter((task) => task.status !== status);

    const dropY = e.clientY;
    const droppedIndex = statusTasks.findIndex((task) => {
      const taskElement = document.getElementById(`task-${task.id}`);
      if (!taskElement) return false;
      const rect = taskElement.getBoundingClientRect();
      const taskMiddleY = rect.top + rect.height / 2;
      return dropY < taskMiddleY;
    });

    if (droppedIndex !== -1) {
      const draggedTask = statusTasks.find((task) => task.id === dragging);
      if (draggedTask) {
        statusTasks.splice(statusTasks.indexOf(draggedTask), 1);
        statusTasks.splice(droppedIndex, 0, draggedTask);
      }
    }

    setTasks([...otherTasks, ...statusTasks]);
    setDragging(null);
  };

  const toggleChecked = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <TaskHeader />

        <div className="p-4 space-y-8 border-t border-gray-200 mt-7 dark:border-gray-800 sm:mt-0 xl:p-6">
          {lanes.map((lane) => (
            <TaskLane
              key={lane}
              lane={lane}
              tasks={tasks.filter((task) => task.status === lane)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, lane)}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
    </>
  );
}
