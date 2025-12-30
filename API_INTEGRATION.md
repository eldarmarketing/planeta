# Документация по API интеграции

## Обзор

Проект подключен к бэкенд API на базе Ruby on Rails с использованием JWT аутентификации.

**Базовый URL:** `https://birson.tgapp.online/api/v1`

---

## 🔐 Аутентификация

### 1. JWT Token

Токен сохраняется в `localStorage` под ключом `planeta_auth_token`.

```typescript
import { tokenManager } from './lib/apiClient';

// Получить токен
const token = tokenManager.get();

// Установить токен
tokenManager.set('your_jwt_token');

// Удалить токен
tokenManager.remove();
```

### 2. Автоматическая подстановка токена

API клиент автоматически добавляет заголовок `Authorization: Bearer <token>` ко всем запросам.

### 3. Обработка 401 Unauthorized

При получении 401 ошибки:
1. Токен автоматически удаляется из `localStorage`
2. Пользователь перенаправляется на `/signin`

---

## 📁 Структура API слоя

```
src/
├── lib/
│   └── apiClient.ts          # Базовый HTTP клиент
├── services/
│   ├── authService.ts         # Аутентификация
│   ├── clientsService.ts      # Клиенты
│   ├── vehiclesService.ts     # Автомобили
│   ├── employeesService.ts    # Сотрудники
│   ├── workOrdersService.ts   # Заказ-наряды
│   └── dashboardService.ts    # Dashboard метрики
├── hooks/
│   ├── useClients.ts          # React hook для клиентов
│   ├── useVehicles.ts         # React hook для автомобилей
│   ├── useEmployees.ts        # React hook для сотрудников
│   ├── useWorkOrders.ts       # React hook для заказ-нарядов
│   └── useDashboard.ts        # React hook для dashboard
└── context/
    ├── AuthContext.tsx        # Context аутентификации
    └── APIContext.tsx         # Context для API данных
```

---

## 🎯 Использование

### Вариант 1: Прямое использование сервисов

```typescript
import { clientsService } from '../services/clientsService';

// Получить всех клиентов
const clients = await clientsService.getAll({ page: 1, per_page: 20 });

// Создать клиента
const newClient = await clientsService.create({
  name: 'Иванов Иван',
  phone: '+79991234567',
  email: 'ivanov@example.ru'
});
```

### Вариант 2: Использование React хуков

```typescript
import { useClients } from '../hooks/useClients';

function ClientsPage() {
  const { 
    clients, 
    loading, 
    error, 
    createClient, 
    updateClient, 
    deleteClient 
  } = useClients();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      {clients.map(client => (
        <div key={client.id}>{client.name}</div>
      ))}
    </div>
  );
}
```

### Вариант 3: Использование APIContext

```typescript
import { useAPI } from '../context/APIContext';

function MyComponent() {
  const { 
    clients, 
    clientsLoading, 
    clientsError,
    createClient 
  } = useAPI();

  // Использование данных
}
```

---

## 📋 Доступные API endpoints

### Аутентификация

| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | `/login` | Вход в систему |
| DELETE | `/logout` | Выход из системы |
| GET | `/me` | Получить текущего пользователя |

### Клиенты

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/clients` | Список клиентов |
| GET | `/clients/:id` | Получить клиента |
| POST | `/clients` | Создать клиента |
| PATCH | `/clients/:id` | Обновить клиента |
| DELETE | `/clients/:id` | Удалить клиента |

### Автомобили

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/vehicles` | Список автомобилей |
| GET | `/vehicles/:id` | Получить автомобиль |
| POST | `/vehicles` | Создать автомобиль |
| PATCH | `/vehicles/:id` | Обновить автомобиль |
| DELETE | `/vehicles/:id` | Удалить автомобиль |
| GET | `/vehicles/search_by_vin` | Поиск по VIN |
| GET | `/vehicles/search_by_gos_number` | Поиск по гос.номеру |

### Сотрудники

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/employees` | Список сотрудников |
| GET | `/employees/:id` | Получить сотрудника |
| POST | `/employees` | Создать сотрудника |
| PATCH | `/employees/:id` | Обновить сотрудника |
| DELETE | `/employees/:id` | Удалить сотрудника |

### Заказ-наряды

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/work_orders` | Список заказ-нарядов |
| GET | `/work_orders/:id` | Получить заказ-наряд |
| POST | `/work_orders` | Создать заказ-наряд |
| PATCH | `/work_orders/:id` | Обновить заказ-наряд |
| DELETE | `/work_orders/:id` | Удалить заказ-наряд |
| PATCH | `/work_orders/:id/update_status` | Изменить статус |

### Dashboard

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/dashboard/metrics` | Получить метрики |
| GET | `/dashboard/today_schedule` | Расписание на сегодня |
| GET | `/dashboard/recent_orders` | Последние заказы |

---

## ⚙️ Состояния загрузки и ошибок

Все хуки возвращают состояния `loading` и `error`:

```typescript
const { clients, loading, error } = useClients();

if (loading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

// Рендер данных
return <ClientsList clients={clients} />;
```

---

## 🔄 Обратная совместимость

Старый `STOContext` остается работать для компонентов, которые ещё не мигрировали на API.

### Миграция компонента:

**Было:**
```typescript
import { useClients } from '../context/STOContext';

function MyComponent() {
  const { clients, addClient } = useClients();
}
```

**Стало:**
```typescript
import { useAPI } from '../context/APIContext';

function MyComponent() {
  const { clients, createClient } = useAPI();
}
```

---

## 🚀 Запуск и тестирование

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск dev сервера

```bash
npm run dev
```

Приложение запустится на `http://localhost:3000`

### 3. Тестирование API

1. Перейдите на `/signin`
2. Введите credentials (если бэкенд доступен)
3. После успешного входа токен сохранится и все запросы будут автоматически авторизованы

---

## ⚠️ Важно

1. **Токен передается через заголовок**: `Authorization: Bearer <token>`
2. **401 ошибка = автоматический logout** и редирект на `/signin`
3. **Все приватные роуты защищены** через `ProtectedRoute` компонент
4. **Данные кэшируются** в React state внутри хуков

---

## 🐛 Troubleshooting

### Проблема: 401 Unauthorized

**Решение:**
- Проверьте что токен сохранен в localStorage
- Проверьте срок действия токена (JWT expiration)
- Попробуйте выйти и войти заново

### Проблема: CORS ошибка

**Решение:**
- Убедитесь что бэкенд настроил CORS для вашего домена
- В Rails должен быть настроен `rack-cors`

### Проблема: Network Error

**Решение:**
- Проверьте что бэкенд доступен по адресу `https://birson.tgapp.online/api/v1`
- Проверьте интернет соединение

---

## 📝 TODO (требует реализации на бэкенде)

- [ ] Calendar Events API endpoints
- [ ] Messages/Chat API endpoints
- [ ] Notifications API endpoints
- [ ] File Upload для аватаров

---

## 🎨 Примеры использования

### Создание клиента

```typescript
const handleCreateClient = async () => {
  try {
    const newClient = await createClient({
      name: 'Иванов Иван',
      phone: '+79991234567',
      email: 'ivanov@example.ru'
    });
    console.log('Клиент создан:', newClient);
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
```

### Обновление статуса заказа

```typescript
const handleUpdateStatus = async (orderId: string) => {
  try {
    await updateWorkOrderStatus(orderId, 'taken_to_work');
    console.log('Статус обновлен');
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
```

### Поиск по VIN

```typescript
import { vehiclesService } from '../services/vehiclesService';

const handleSearchByVin = async (vin: string) => {
  const result = await vehiclesService.searchByVin(vin);
  if (result.found) {
    console.log('Автомобиль найден:', result.vehicle);
  }
};
```


