import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

import PageMeta from "../../components/common/PageMeta";
import DataTableOne from "../../components/tables/DataTables/TableOne/DataTableOne";
import DataTableTwo from "../../components/tables/DataTables/TableTwo/DataTableTwo";
import DataTableThree from "../../components/tables/DataTables/TableThree/DataTableThree";

export default function DataTables() {
  return (
    <>
      <PageMeta
        title="База клиентов | planeta.marketing"
        description="База клиентов автосервиса"
      />
      <PageBreadcrumb pageTitle="База клиентов" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Клиенты с автомобилями">
          <DataTableOne />
        </ComponentCard>
        <ComponentCard title="История обращений">
          <DataTableTwo />
        </ComponentCard>
        <ComponentCard title="VIP клиенты">
          <DataTableThree />
        </ComponentCard>
      </div>
    </>
  );
}
