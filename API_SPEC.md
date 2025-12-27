# API Спецификация для Ruby on Rails Backend

## Обзор

Этот документ описывает API, которое должно быть реализовано на Ruby on Rails для работы с фронтенд-приложением СТО CRM "Planeta".

**Базовый URL:** `/api/v1`
**Формат:** JSON
**Аутентификация:** JWT Token (Bearer)

---

## Модели данных

### Client (Клиент)
```ruby
# db/migrate/xxx_create_clients.rb
create_table :clients do |t|
  t.string :name, null: false
  t.string :phone, null: false
  t.string :email
  t.timestamps
end

add_index :clients, :phone, unique: true
```

**JSON Response:**
```json
{
  "id": "uuid",
  "name": "Иванов Алексей Петрович",
  "phone": "+7 (903) 123-45-67",
  "email": "ivanov@example.ru",
  "created_at": "2024-01-15T10:00:00Z",
  "vehicles": ["uuid1", "uuid2"]
}
```

### Vehicle (Автомобиль)
```ruby
# db/migrate/xxx_create_vehicles.rb
create_table :vehicles do |t|
  t.references :client, null: false, foreign_key: true
  t.string :brand, null: false
  t.string :model, null: false
  t.integer :year, null: false
  t.string :gos_number, null: false
  t.string :vin
  t.integer :mileage
  t.timestamps
end

add_index :vehicles, :gos_number, unique: true
add_index :vehicles, :vin, unique: true
```

**JSON Response:**
```json
{
  "id": "uuid",
  "client_id": "uuid",
  "brand": "Toyota",
  "model": "Camry",
  "year": 2020,
  "gos_number": "А123ВС77",
  "vin": "JT2BF22K1W0123456",
  "mileage": 45000
}
```

### Employee (Сотрудник)
```ruby
# db/migrate/xxx_create_employees.rb
create_table :employees do |t|
  t.string :name, null: false
  t.string :role, null: false  # enum: mechanic, diagnostician, electrician, manager, admin
  t.string :phone
  t.string :avatar
  t.boolean :is_active, default: true
  t.string :telegram_chat_id  # Для Telegram интеграции
  t.timestamps
end
```

**Роли сотрудников:**
- `mechanic` - Механик
- `diagnostician` - Диагност
- `electrician` - Электрик
- `manager` - Менеджер
- `admin` - Администратор

### WorkOrder (Заказ-наряд)
```ruby
# db/migrate/xxx_create_work_orders.rb
create_table :work_orders do |t|
  t.string :order_number, null: false
  t.references :client, null: false, foreign_key: true
  t.references :vehicle, null: false, foreign_key: true
  t.references :employee, foreign_key: true
  t.string :title, null: false
  t.text :description
  t.string :status, default: 'initial_contact'
  t.string :priority, default: 'medium'
  t.decimal :total_price, precision: 10, scale: 2, default: 0
  t.datetime :completed_at
  t.date :scheduled_date
  t.timestamps
end

add_index :work_orders, :order_number, unique: true
add_index :work_orders, :status
```

**Статусы заказа (в порядке прохождения):**
1. `initial_contact` - Первичный контакт
2. `diagnostics` - Диагностика
3. `estimate` - Оценка стоимости
4. `passed_to_work` - Передано в работу
5. `in_progress` - Взято в работу
6. `completed` - Готово

**Приоритеты:**
- `low` - Низкий
- `medium` - Средний
- `high` - Высокий
- `urgent` - Срочный

### Service (Услуга/Работа в заказе)
```ruby
# db/migrate/xxx_create_services.rb
create_table :services do |t|
  t.references :work_order, null: false, foreign_key: true
  t.string :name, null: false
  t.decimal :price, precision: 10, scale: 2, null: false
  t.integer :quantity, default: 1
  t.timestamps
end
```

### CalendarEvent (Событие календаря)
```ruby
# db/migrate/xxx_create_calendar_events.rb
create_table :calendar_events do |t|
  t.string :title, null: false
  t.date :start_date, null: false
  t.date :end_date
  t.references :work_order, foreign_key: true
  t.references :client, foreign_key: true
  t.references :vehicle, foreign_key: true
  t.string :event_type, default: 'appointment'  # appointment, reminder, task
  t.string :priority, default: 'Primary'  # Danger, Success, Primary, Warning
  t.timestamps
end
```

### Message (Сообщение чата)
```ruby
# db/migrate/xxx_create_messages.rb
create_table :messages do |t|
  t.string :sender_id, null: false      # ID клиента или сотрудника
  t.string :sender_type, null: false    # 'Client' или 'Employee'
  t.string :receiver_id, null: false
  t.string :receiver_type, null: false
  t.text :content, null: false
  t.boolean :is_read, default: false
  t.string :telegram_message_id        # Для синхронизации с Telegram
  t.timestamps
end

add_index :messages, [:sender_id, :sender_type]
add_index :messages, [:receiver_id, :receiver_type]
```

### Notification (Уведомление)
```ruby
# db/migrate/xxx_create_notifications.rb
create_table :notifications do |t|
  t.string :title, null: false
  t.text :message, null: false
  t.string :notification_type, default: 'info'  # info, success, warning, error
  t.boolean :is_read, default: false
  t.string :link
  t.references :user, polymorphic: true
  t.timestamps
end
```

---

## API Endpoints

### Аутентификация

#### POST /api/v1/auth/login
Авторизация пользователя.

**Request:**
```json
{
  "email": "admin@planeta.sto",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "Админ",
    "email": "admin@planeta.sto",
    "role": "admin"
  }
}
```

---

### Клиенты (Clients)

#### GET /api/v1/clients
Список всех клиентов с пагинацией.

**Query params:**
- `page` - номер страницы (default: 1)
- `per_page` - элементов на страницу (default: 25)
- `search` - поиск по имени/телефону

**Response:**
```json
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 120
  }
}
```

#### GET /api/v1/clients/:id
Получить клиента с автомобилями и заказами.

#### POST /api/v1/clients
Создать клиента.

**Request:**
```json
{
  "client": {
    "name": "Иванов Иван",
    "phone": "+7 (999) 123-45-67",
    "email": "ivan@example.ru"
  }
}
```

#### PATCH /api/v1/clients/:id
Обновить клиента.

#### DELETE /api/v1/clients/:id
Удалить клиента (soft delete).

#### GET /api/v1/clients/:id/vehicles
Автомобили клиента.

#### GET /api/v1/clients/:id/work_orders
Заказы клиента.

---

### Автомобили (Vehicles)

#### GET /api/v1/vehicles
Список автомобилей.

#### GET /api/v1/vehicles/:id
Получить автомобиль.

#### POST /api/v1/vehicles
Создать автомобиль.

**Request:**
```json
{
  "vehicle": {
    "client_id": "uuid",
    "brand": "Toyota",
    "model": "Camry",
    "year": 2020,
    "gos_number": "А123ВС77",
    "vin": "JT2BF22K1W0123456",
    "mileage": 45000
  }
}
```

#### PATCH /api/v1/vehicles/:id
Обновить автомобиль.

#### DELETE /api/v1/vehicles/:id
Удалить автомобиль.

---

### Сотрудники (Employees)

#### GET /api/v1/employees
Список сотрудников.

**Query params:**
- `active_only` - только активные (default: false)
- `role` - фильтр по роли

#### GET /api/v1/employees/:id
Получить сотрудника.

#### POST /api/v1/employees
Создать сотрудника.

#### PATCH /api/v1/employees/:id
Обновить сотрудника.

#### DELETE /api/v1/employees/:id
Удалить сотрудника.

#### GET /api/v1/employees/:id/work_orders
Заказы сотрудника.

---

### Заказ-наряды (WorkOrders)

#### GET /api/v1/work_orders
Список заказов.

**Query params:**
- `status` - фильтр по статусу
- `employee_id` - фильтр по сотруднику
- `client_id` - фильтр по клиенту
- `date_from`, `date_to` - диапазон дат

#### GET /api/v1/work_orders/:id
Получить заказ со всеми связями.

**Response:**
```json
{
  "id": "uuid",
  "order_number": "ЗН-2412001",
  "client": {...},
  "vehicle": {...},
  "employee": {...},
  "services": [...],
  "status": "in_progress",
  "priority": "high",
  "total_price": 15000,
  "created_at": "...",
  "updated_at": "..."
}
```

#### POST /api/v1/work_orders
Создать заказ.

**Request:**
```json
{
  "work_order": {
    "client_id": "uuid",
    "vehicle_id": "uuid",
    "employee_id": "uuid",
    "title": "Замена масла + фильтры",
    "description": "Плановое ТО",
    "priority": "medium",
    "scheduled_date": "2024-12-30",
    "services": [
      {"name": "Замена масла", "price": 2500, "quantity": 1},
      {"name": "Масляный фильтр", "price": 800, "quantity": 1}
    ]
  }
}
```

#### PATCH /api/v1/work_orders/:id
Обновить заказ.

#### DELETE /api/v1/work_orders/:id
Удалить заказ.

#### PATCH /api/v1/work_orders/:id/status
Изменить статус заказа.

**Request:**
```json
{
  "status": "in_progress"
}
```

**Бизнес-логика:**
- При переходе в `completed` - установить `completed_at`
- При смене статуса - создать уведомление
- При назначении/смене мастера - уведомить мастера

---

### Услуги заказа (Services)

#### POST /api/v1/work_orders/:work_order_id/services
Добавить услугу в заказ.

#### PATCH /api/v1/work_orders/:work_order_id/services/:id
Обновить услугу.

#### DELETE /api/v1/work_orders/:work_order_id/services/:id
Удалить услугу.

---

### Календарь (CalendarEvents)

#### GET /api/v1/calendar_events
Получить события.

**Query params:**
- `start_date` - начало периода
- `end_date` - конец периода

#### GET /api/v1/calendar_events/:id
Получить событие.

#### POST /api/v1/calendar_events
Создать событие.

**Request:**
```json
{
  "calendar_event": {
    "title": "Toyota Camry — ТО",
    "start_date": "2024-12-30",
    "end_date": "2024-12-30",
    "client_id": "uuid",
    "vehicle_id": "uuid",
    "work_order_id": "uuid",
    "event_type": "appointment",
    "priority": "Warning"
  }
}
```

#### PATCH /api/v1/calendar_events/:id
Обновить событие.

#### DELETE /api/v1/calendar_events/:id
Удалить событие.

---

### Чат (Messages)

#### GET /api/v1/messages/contacts
Получить список контактов с последними сообщениями.

**Response:**
```json
{
  "contacts": [
    {
      "id": "uuid",
      "name": "Иванов Сергей",
      "type": "Client",
      "role": "Клиент",
      "avatar": "/images/planets/earth.svg",
      "last_message": {...},
      "unread_count": 2
    }
  ]
}
```

#### GET /api/v1/messages
Сообщения с конкретным контактом.

**Query params:**
- `contact_id` - ID контакта
- `contact_type` - Client или Employee
- `page`, `per_page` - пагинация

#### POST /api/v1/messages
Отправить сообщение.

**Request:**
```json
{
  "message": {
    "receiver_id": "uuid",
    "receiver_type": "Client",
    "content": "Ваш автомобиль готов к выдаче!"
  }
}
```

**Бизнес-логика:**
- При отправке сообщению клиенту - отправить через Telegram Bot (если есть telegram_chat_id)

#### PATCH /api/v1/messages/mark_read
Пометить сообщения как прочитанные.

**Request:**
```json
{
  "contact_id": "uuid",
  "contact_type": "Client"
}
```

---

### Уведомления (Notifications)

#### GET /api/v1/notifications
Список уведомлений текущего пользователя.

#### PATCH /api/v1/notifications/:id/read
Пометить как прочитанное.

#### DELETE /api/v1/notifications/clear_all
Очистить все уведомления.

---

### Статистика (Dashboard)

#### GET /api/v1/dashboard/metrics
Метрики для главной страницы.

**Response:**
```json
{
  "active_orders": 5,
  "completed_this_month": 23,
  "completed_change_percent": 15,
  "revenue_this_month": 450000,
  "revenue_change_percent": 8,
  "average_check": 19565,
  "average_check_change_percent": -3,
  "total_clients": 120,
  "total_vehicles": 145
}
```

#### GET /api/v1/dashboard/today_schedule
Записи на сегодня.

#### GET /api/v1/dashboard/recent_orders
Последние 5 заказов.

---

## Telegram Bot Integration

### Webhook для входящих сообщений

#### POST /api/v1/telegram/webhook
Получение сообщений от Telegram Bot API.

**Обработка:**
1. Определить клиента по telegram_chat_id
2. Если клиент найден - создать сообщение в системе
3. Если новый - предложить регистрацию

### Отправка сообщений клиенту

Использовать Telegram Bot API для отправки:
- При создании/изменении заказа
- При смене статуса заказа
- При отправке сообщения из чата CRM

```ruby
# app/services/telegram_service.rb
class TelegramService
  def send_message(client, text)
    return unless client.telegram_chat_id.present?
    
    Telegram::Bot::Client.run(ENV['TELEGRAM_BOT_TOKEN']) do |bot|
      bot.api.send_message(
        chat_id: client.telegram_chat_id,
        text: text,
        parse_mode: 'HTML'
      )
    end
  end
end
```

### Команды бота

- `/start` - Регистрация/привязка аккаунта
- `/status` - Статус текущих заказов
- `/history` - История заказов
- `/contact` - Связаться с менеджером

---

## WebSocket Events (ActionCable)

Для real-time обновлений использовать ActionCable:

### Channels:

#### WorkOrdersChannel
```ruby
# Подписка на обновления заказов
stream_from "work_orders"
```

Events:
- `work_order.created`
- `work_order.updated`
- `work_order.status_changed`

#### MessagesChannel
```ruby
# Подписка на сообщения
stream_for current_user
```

Events:
- `message.received`
- `message.read`

#### NotificationsChannel
```ruby
stream_for current_user
```

Events:
- `notification.new`

---

## Генерация номера заказа

```ruby
# app/models/work_order.rb
before_create :generate_order_number

def generate_order_number
  year = Time.current.strftime('%y')
  month = Time.current.strftime('%m')
  count = WorkOrder.where('created_at >= ?', Time.current.beginning_of_month).count + 1
  self.order_number = "ЗН-#{year}#{month}#{count.to_s.rjust(4, '0')}"
end
```

---

## Рекомендуемые Gems

```ruby
# Gemfile
gem 'devise'           # Аутентификация
gem 'jwt'              # JWT токены
gem 'pundit'           # Авторизация
gem 'kaminari'         # Пагинация
gem 'ransack'          # Поиск и фильтрация
gem 'active_model_serializers'  # JSON сериализация
gem 'telegram-bot-ruby'  # Telegram Bot
gem 'sidekiq'          # Background jobs
gem 'redis'            # Для ActionCable и Sidekiq
gem 'rack-cors'        # CORS для API
```

---

## Переменные окружения

```bash
# .env
DATABASE_URL=postgres://user:pass@localhost/planeta_sto_production
SECRET_KEY_BASE=xxx
JWT_SECRET=xxx
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_WEBHOOK_URL=https://api.planeta.sto/api/v1/telegram/webhook
REDIS_URL=redis://localhost:6379/0
```

---

## Миграция данных с фронтенда

Начальные данные находятся в `src/data/initialData.ts` и могут быть использованы для seed-файла:

```ruby
# db/seeds.rb
# Создание демо-данных аналогичных фронтенду
```

---

## Важные бизнес-правила

1. **Номер заказа** - генерируется автоматически в формате ЗН-ГГММ0001
2. **При удалении клиента** - удалять связанные автомобили
3. **При смене статуса заказа** - создавать уведомление и отправлять в Telegram
4. **Цена заказа** - автоматически пересчитывается при изменении услуг
5. **Календарь** - автоматически создавать событие при создании заказа с датой
6. **Активные сотрудники** - только активные сотрудники могут быть назначены на заказы

