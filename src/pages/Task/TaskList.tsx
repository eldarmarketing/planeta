import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TaskListPage from "../../components/task/task-list/TaskListPage";

export default function TaskList() {
  return (
    <>
      <PageMeta
        title="Заказ-наряды | planeta.marketing"
        description="Список заказ-нарядов автосервиса"
      />
      <PageBreadcrumb pageTitle="Заказ-наряды" />
      <TaskListPage />
    </>
  );
}
