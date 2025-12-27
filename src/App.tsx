import { BrowserRouter as Router, Routes, Route } from "react-router";
import Ecommerce from "./pages/Dashboard/Ecommerce";
import Analytics from "./pages/Dashboard/Analytics";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import FileManager from "./pages/FileManager";
import Calendar from "./pages/Calendar";
import Chats from "./pages/Chat/Chats";
import TaskKanban from "./pages/Task/TaskKanban";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Transactions from "./pages/Ecommerce/Transactions";
import Integrations from "./pages/OtherPage/Integrations";
import Clients from "./pages/Clients";
import WorkOrdersPage from "./pages/WorkOrders";
import Employees from "./pages/Employees";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* Главная */}
            <Route index path="/" element={<Ecommerce />} />

            {/* Заказ-наряды */}
            <Route path="/work-orders" element={<WorkOrdersPage />} />
            <Route path="/task-kanban" element={<TaskKanban />} />

            {/* Запись на сервис */}
            <Route path="/calendar" element={<Calendar />} />

            {/* Клиенты и сотрудники */}
            <Route path="/clients" element={<Clients />} />
            <Route path="/employees" element={<Employees />} />

            {/* Операции */}
            <Route path="/file-manager" element={<FileManager />} />
            <Route path="/transactions" element={<Transactions />} />

            {/* Отчёты */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

            {/* Прочее */}
            <Route path="/chat" element={<Chats />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/integrations" element={<Integrations />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
