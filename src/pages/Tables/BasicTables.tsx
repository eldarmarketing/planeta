import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import BasicTableTwo from "../../components/tables/BasicTables/BasicTableTwo";
import BasicTableThree from "../../components/tables/BasicTables/BasicTableThree";
import BasicTableFour from "../../components/tables/BasicTables/BasicTableFour";
import BasicTableFive from "../../components/tables/BasicTables/BasicTableFive";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="База автомобилей | planeta.marketing"
        description="База автомобилей автосервиса"
      />
      <PageBreadcrumb pageTitle="База автомобилей" />
      <div className="space-y-6">
        <ComponentCard title="Все автомобили">
          <BasicTableOne />
        </ComponentCard>
        <ComponentCard title="По маркам">
          <BasicTableTwo />
        </ComponentCard>
        <ComponentCard title="История обслуживания">
          <BasicTableThree />
        </ComponentCard>
        <ComponentCard title="Ожидают запчасти">
          <BasicTableFour />
        </ComponentCard>
        <ComponentCard title="Постоянные клиенты">
          <BasicTableFive />
        </ComponentCard>
      </div>
    </>
  );
}
