/**
 * API Client для planeta СТО CRM
 * Базовый URL: https://birson.tgapp.online/api/v1
 * Автоматическое добавление токена авторизации
 */

// В разработке используем proxy, в продакшене - полный URL
const BASE_URL = import.meta.env.DEV 
  ? '/api/v1' 
  : 'https://birson.tgapp.online/api/v1';
const TOKEN_KEY = 'planeta_auth_token';

// Типы для ответов API
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}

// Управление токеном
export const tokenManager = {
  get: (): string | null => {
    // Проверяем и в localStorage и в sessionStorage
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },
  set: (token: string, remember: boolean = true): void => {
    if (remember) {
      // Запомнить меня - сохраняем постоянно в localStorage
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.removeItem(TOKEN_KEY); // Очищаем sessionStorage
    } else {
      // Не запоминать - сохраняем только на сессию
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY); // Очищаем localStorage
    }
  },
  remove: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },
};

// HTTP методы
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}

/**
 * Базовая функция для выполнения запросов к API
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = { method: 'GET' }
): Promise<T> {
  const token = tokenManager.get();
  
  // Формируем URL (поддержка относительных путей для proxy)
  let url: string;
  const fullPath = `${BASE_URL}${endpoint}`;
  
  // Добавляем query параметры
  if (options.params) {
    const params = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    url = `${fullPath}?${params.toString()}`;
  } else {
    url = fullPath;
  }

  // Формируем заголовки
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Добавляем токен авторизации
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Формируем конфигурацию запроса
  const config: RequestInit = {
    method: options.method,
    headers,
  };

  // Добавляем тело запроса для POST/PUT/PATCH
  if (options.body && ['POST', 'PUT', 'PATCH'].includes(options.method)) {
    config.body = JSON.stringify(options.body);
  }

  try {
    console.log(`🌐 API Request: ${options.method} ${url}`);
    const response = await fetch(url, config);
    console.log(`📡 API Response: ${response.status} ${options.method} ${url}`);

    // Обработка 401 - очистка токена и редирект на логин
    if (response.status === 401) {
      tokenManager.remove();
      window.location.href = '/signin';
      throw new Error('Unauthorized');
    }

    // Проверка на успешность ответа
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
    }

    // Для DELETE может не быть тела ответа
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();
    console.log(`✅ API Data:`, data);
    return data as T;
  } catch (error) {
    console.error(`❌ API Error [${options.method} ${endpoint}]:`, error);
    throw error;
  }
}

// Экспортируемые методы
export const apiClient = {
  get: <T>(endpoint: string, params?: Record<string, string | number | boolean>) =>
    request<T>(endpoint, { method: 'GET', params }),

  post: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, { method: 'POST', body }),

  put: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, { method: 'PUT', body }),

  patch: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, { method: 'PATCH', body }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};

export default apiClient;

