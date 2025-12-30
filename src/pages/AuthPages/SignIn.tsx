import { useEffect } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Если пользователь уже авторизован - редирект на главную
  useEffect(() => {
    if (!loading && isAuthenticated) {
      console.log('✅ SignIn: Пользователь уже авторизован, редирект на главную');
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Показываем loader пока проверяется авторизация
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Вход | Planeta СТО"
        description="Страница входа в систему Planeta СТО"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
