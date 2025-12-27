import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BarChartOne from "../../components/charts/bar/BarChartOne";
import BarChartTwo from "../../components/charts/bar/BarChartTwo";
import PageMeta from "../../components/common/PageMeta";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="Загрузка постов | planeta.marketing"
        description="Статистика загрузки постов автосервиса"
      />
      <PageBreadcrumb pageTitle="Загрузка постов" />
      <div className="space-y-6">
        <ComponentCard title="Загрузка по дням недели">
          <BarChartOne />
        </ComponentCard>
        <ComponentCard title="Загрузка по механикам">
          <BarChartTwo />
        </ComponentCard>
      </div>
    </div>
  );
}
