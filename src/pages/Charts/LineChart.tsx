import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";
import LineChartTwo from "../../components/charts/line/LineChartTwo";
import LineChartThree from "../../components/charts/line/LineChartThree";
import PageMeta from "../../components/common/PageMeta";

export default function LineChart() {
  return (
    <>
      <PageMeta
        title="Отчёт по выручке | planeta.marketing"
        description="Графики выручки автосервиса"
      />
      <PageBreadcrumb pageTitle="Выручка" />
      <div className="space-y-6">
        <ComponentCard title="Выручка за год">
          <LineChartOne />
        </ComponentCard>
        <ComponentCard title="Динамика по месяцам">
          <LineChartTwo />
        </ComponentCard>
        <ComponentCard title="Сравнение периодов">
          <LineChartThree />
        </ComponentCard>
      </div>
    </>
  );
}
