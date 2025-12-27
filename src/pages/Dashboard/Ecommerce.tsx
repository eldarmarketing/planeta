import PageMeta from "../../components/common/PageMeta";
import STOMetrics from "../../components/sto/STOMetrics";
import RecentWorkOrders from "../../components/sto/RecentWorkOrders";
import TodaySchedule from "../../components/sto/TodaySchedule";

export default function Ecommerce() {
  return (
    <>
      <PageMeta
        title="Панель управления | planeta"
        description="CRM система для автосервиса — управление заказ-нарядами, клиентами и выручкой"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Metrics */}
        <div className="col-span-12 xl:col-span-8">
          <STOMetrics />
        </div>

        {/* Today Schedule */}
        <div className="col-span-12 xl:col-span-4">
          <TodaySchedule />
        </div>

        {/* Recent Orders */}
        <div className="col-span-12">
          <RecentWorkOrders />
        </div>
      </div>
    </>
  );
}
