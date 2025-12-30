import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { useAuth } from "../../context/AuthContext";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authContext = useAuth();
  const { login } = authContext;
  const navigate = useNavigate();

  console.log('🔴 SignInForm mounted, auth context:', { 
    hasLogin: !!login, 
    contextKeys: Object.keys(authContext) 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🔴 handleSubmit called!');
    e.preventDefault();
    console.log('🔴 preventDefault done');
    setError("");
    setLoading(true);

    console.log('📝 Submitting login form with email:', email);
    console.log('📝 Password length:', password?.length);
    console.log('📝 Remember me:', isChecked);
    console.log('📝 Login function exists?', !!login);

    try {
      console.log('🔴 Calling login...');
      await login(email, password, isChecked); // Передаём значение "Запомнить меня"
      console.log('✅ Login successful, redirecting...');
      navigate("/");
    } catch (err: any) {
      console.error('❌ Login error:', err);
      
      // Более информативные сообщения об ошибках
      let errorMessage = "Ошибка входа";
      
      if (err.message === 'Failed to fetch') {
        // Проверяем в production ли мы
        const isProduction = !import.meta.env.DEV;
        if (isProduction) {
          errorMessage = "⚠️ Ошибка подключения к API. Возможные причины:\n" +
                        "1. Не настроен CORS на бэкенде для вашего домена\n" +
                        "2. Нет доступа к https://birson.tgapp.online\n" +
                        "3. Проблемы с интернетом\n\n" +
                        "Откройте консоль (F12) для подробностей.";
        } else {
          errorMessage = "Не удалось подключиться к серверу. Проверьте интернет.";
        }
      } else if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        errorMessage = "Неверный email или пароль";
      } else if (err.message.includes('CORS')) {
        errorMessage = "❌ Ошибка CORS: Бэкенд не разрешает запросы с вашего домена. Программист должен добавить ваш домен в CORS настройки.";
      } else {
        errorMessage = err.message || "Произошла ошибка. Откройте консоль (F12) для деталей.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Убрали кнопку "Вернуться на главную" т.к. она ведет на защищенный роут */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Вход
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Введите email и пароль для входа
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-error-700 bg-error-50 border border-error-200 rounded-lg dark:bg-error-900/20 dark:text-error-400 dark:border-error-800">
                    {error}
                  </div>
                )}
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    type="email"
                    placeholder="email@example.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Пароль <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Введите пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Запомнить меня
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Вход..." : "Войти"}
                  </button>
                </div>
              </div>
            </form>

            {/* Регистрация временно отключена */}
            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Нет аккаунта?{" "}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
