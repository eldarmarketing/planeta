import apiClient, { tokenManager, ApiResponse } from '../lib/apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  employee_id?: string;
}

/**
 * Сервис аутентификации
 */
export const authService = {
  /**
   * Вход в систему
   * POST /api/v1/login
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/login', {
      user: credentials,
    });
    return response.data!;
  },

  /**
   * Выход из системы
   * DELETE /api/v1/logout
   */
  logout: async (): Promise<void> => {
    await apiClient.delete('/logout');
    tokenManager.remove();
  },

  /**
   * Получить текущего пользователя
   * GET /api/v1/me
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>('/me');
    return response.data!.user;
  },

  /**
   * Проверить авторизацию
   */
  isAuthenticated: (): boolean => {
    return tokenManager.get() !== null;
  },
};


