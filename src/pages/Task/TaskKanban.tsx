import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TaskHeader from "../../components/task/TaskHeader";
import KanbanBoard from "../../components/task/kanban/KanbanBoard";
import PageMeta from "../../components/common/PageMeta";

export default function TaskKanban() {
  return (
    <div>
      <PageMeta
        title="Канбан заказов | planeta.marketing"
        description="Канбан доска заказ-нарядов автосервиса"
      />
      <PageBreadcrumb pageTitle="Канбан доска" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <TaskHeader />
        <KanbanBoard />
      </div>
    </div>
  );
}
