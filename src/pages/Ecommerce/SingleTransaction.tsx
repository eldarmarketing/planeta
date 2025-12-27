import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TransactionHeader from "../../components/transactions/TransactionHeader";
import CustomerDetails from "../../components/transactions/CustomerDetails";
import OrderHistory from "../../components/transactions/OrderHistory";
import OrderDetailsTable from "../../components/transactions/OrderDetailsTable";

export default function SingleTransaction() {
  return (
    <>
      <PageMeta
        title="Детали заказ-наряда | AutoCRM"
        description="Детальная информация по заказ-наряду автосервиса"
      />
      <PageBreadcrumb pageTitle="Детали заказ-наряда" />
      <div className="space-y-6">
        <TransactionHeader />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 2xl:col-span-9">
            <OrderDetailsTable />
          </div>
          <div className="space-y-6 lg:col-span-4 2xl:col-span-3">
            <CustomerDetails />
            <OrderHistory />
          </div>
        </div>
      </div>
    </>
  );
}
