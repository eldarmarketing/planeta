import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import TransactionList from "../../components/ecommerce/TransactionList";

export default function Transactions() {
  return (
    <>
      <PageMeta
        title="Касса | planeta.marketing"
        description="Финансовые операции автосервиса"
      />
      <PageBreadcrumb pageTitle="Касса" />
      <TransactionList />
    </>
  );
}
