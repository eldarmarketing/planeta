import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

/**
 * Компонент для защиты приватных роутов
 * Если пользователь не авторизован - редирект на страницу входа
 */
export default function ProtectedRoute() {
  const { isAuthenticated, loading, user } = useAuth();

  console.log('🛡️ ProtectedRoute:', { isAuthenticated, loading, user: user ? user.email : null });

  // Показываем loader пока проверяется авторизация
  if (loading) {
    console.log('⏳ ProtectedRoute: Проверка аутентификации...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Если не авторизован - редирект на страницу входа
  if (!isAuthenticated) {
    console.log('❌ ProtectedRoute: Пользователь НЕ авторизован, редирект на /signin');
    return <Navigate to="/signin" replace />;
  }

  // Если авторизован - рендерим дочерние роуты
  console.log('✅ ProtectedRoute: Пользователь авторизован, доступ разрешен');
  return <Outlet />;
}

