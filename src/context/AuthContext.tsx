import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services/authService';
import { tokenManager } from '../lib/apiClient';
import apiClient from '../lib/apiClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Функция для декодирования JWT токена (без проверки подписи)
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

// Функция для получения данных пользователя из API
async function fetchUserData(userId: number): Promise<User | null> {
  try {
    console.log('🔍 Fetching user data for ID:', userId);
    const response = await apiClient.get<{ users: any[] }>('/users');
    console.log('📦 Users response:', response);
    
    const userData = response.users.find((u: any) => u.id === userId);
    console.log('👤 Found user:', userData);
    
    if (!userData) {
      console.error('❌ User not found in response. Available users:', response.users.map((u: any) => ({ id: u.id, email: u.email })));
      return null;
    }
    
    return {
      id: String(userData.id),
      email: userData.email,
      name: userData.full_name || userData.email.split('@')[0],
      role: userData.role || 'admin',
    };
  } catch (error) {
    console.error('❌ Failed to fetch user data:', error);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Проверка авторизации при загрузке приложения
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    console.log('🔐 AuthContext: Проверка аутентификации при загрузке...');
    const token = tokenManager.get();
    console.log('🔐 Token найден?', token ? 'ДА' : 'НЕТ');
    
    if (!token) {
      console.log('❌ AuthContext: Токен не найден, пользователь не авторизован');
      setLoading(false);
      return;
    }

    try {
      console.log('🔓 Декодируем токен...');
      // Декодируем токен для получения user_id
      const decoded = decodeJWT(token);
      
      if (!decoded || !decoded.user_id) {
        console.error('❌ Токен невалиден или не содержит user_id');
        throw new Error('Invalid token structure');
      }

      // Проверяем срок действия токена
      if (decoded.exp) {
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
          console.error('❌ Токен истек. exp:', decoded.exp, 'now:', now);
          throw new Error('Token expired');
        }
        console.log('✅ Токен валиден, истекает:', new Date(decoded.exp * 1000).toLocaleString());
      }

      console.log('👤 User ID из токена:', decoded.user_id);

      // Загружаем данные пользователя из API
      const userData = await fetchUserData(decoded.user_id);
      
      if (!userData) {
        console.error('❌ Пользователь не найден в базе');
        throw new Error('User not found');
      }

      setUser(userData);
      console.log('✅ AuthContext: Пользователь авторизован:', userData.email);
    } catch (error) {
      console.error('❌ AuthContext: Ошибка проверки авторизации:', error);
      // ВАЖНО: Очищаем невалидный токен
      tokenManager.remove();
      localStorage.removeItem('planeta_refresh_token');
      sessionStorage.removeItem('planeta_refresh_token');
      setUser(null);
    } finally {
      setLoading(false);
      console.log('🔐 AuthContext: Проверка завершена');
    }
  };

  const login = async (email: string, password: string, remember: boolean = true) => {
    try {
      console.log('🔐 Attempting login for:', email);
      console.log('🔐 Remember me:', remember);
      console.log('🔐 Environment:', import.meta.env.DEV ? 'DEVELOPMENT' : 'PRODUCTION');
      
      // В разработке используем proxy, в продакшене - полный URL
      const loginUrl = import.meta.env.DEV 
        ? '/api/v1/login' 
        : 'https://birson.tgapp.online/api/v1/login';
      
      console.log('🌐 Login URL:', loginUrl);
      
      // Выполняем запрос на вход
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', {
        contentType: response.headers.get('content-type'),
        cors: response.headers.get('access-control-allow-origin')
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Server error response:', errorData);
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      // Получаем токены из тела ответа
      const data = await response.json();
      console.log('📦 Response data:', data);
      
      const { access_token, refresh_token } = data;
      
      if (!access_token) {
        throw new Error('Токен не получен от сервера');
      }

      // Сохраняем токены с учетом "Запомнить меня"
      tokenManager.set(access_token, remember);
      if (refresh_token) {
        if (remember) {
          localStorage.setItem('planeta_refresh_token', refresh_token);
        } else {
          sessionStorage.setItem('planeta_refresh_token', refresh_token);
        }
      }
      console.log('✅ Tokens saved to:', remember ? 'localStorage (permanent)' : 'sessionStorage (session only)');

      // Декодируем токен для получения user_id
      const decoded = decodeJWT(access_token);
      console.log('🔓 Decoded token:', decoded);
      
      if (!decoded || !decoded.user_id) {
        throw new Error('Invalid token structure');
      }

      console.log('📋 User ID from token:', decoded.user_id);

      // Загружаем данные пользователя из API
      const userData = await fetchUserData(decoded.user_id);
      
      if (!userData) {
        throw new Error('User data not found');
      }
      
      setUser(userData);
      console.log('✅ Login successful:', userData);
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      tokenManager.remove();
      setUser(null);
      window.location.href = '/signin';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
