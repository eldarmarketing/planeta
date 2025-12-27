# API Спецификация для Ruby on Rails Backend

## Обзор

Этот документ описывает API для бэкенда СТО CRM "Planeta".

**Базовый URL:** `/api/v1`
**Формат:** JSON
**Версия Rails:** 7.1+
**Ruby:** 3.2+

---

## Аутентификация и Авторизация

### JWT Authentication

Используем `devise` + `devise-jwt` для stateless аутентификации.

```ruby
# app/models/user.rb
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  belongs_to :employee, optional: true
  
  enum :role, {
    viewer: 0,      # Только просмотр
    operator: 1,    # Создание заказов, работа с клиентами
    mechanic: 2,    # Механик - видит свои заказы
    manager: 3,     # Менеджер - полный доступ к заказам
    admin: 4        # Полный доступ + настройки
  }

  validates :email, presence: true, uniqueness: true
  validates :role, presence: true

  def can_manage_employees?
    admin?
  end

  def can_delete_orders?
    admin? || manager?
  end

  def can_change_order_status?
    !viewer?
  end
end

# db/migrate/xxx_create_users.rb
create_table :users do |t|
  t.string :email, null: false
  t.string :encrypted_password, null: false
  t.string :name, null: false
  t.integer :role, default: 0, null: false
  t.references :employee, foreign_key: true
  t.string :reset_password_token
  t.datetime :reset_password_sent_at
  t.datetime :remember_created_at
  t.integer :sign_in_count, default: 0
  t.datetime :current_sign_in_at
  t.datetime :last_sign_in_at
  t.string :current_sign_in_ip
  t.string :last_sign_in_ip
  t.timestamps
end

add_index :users, :email, unique: true
add_index :users, :reset_password_token, unique: true
```

### JWT Denylist (для logout)

```ruby
# app/models/jwt_denylist.rb
class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist
  self.table_name = 'jwt_denylists'
end

# db/migrate/xxx_create_jwt_denylists.rb
create_table :jwt_denylists do |t|
  t.string :jti, null: false
  t.datetime :exp, null: false
end
add_index :jwt_denylists, :jti
```

### Pundit Policies (Авторизация)

```ruby
# app/policies/application_policy.rb
class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    true
  end

  def show?
    true
  end

  def create?
    !user.viewer?
  end

  def update?
    !user.viewer?
  end

  def destroy?
    user.admin? || user.manager?
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end

    private

    attr_reader :user, :scope
  end
end

# app/policies/work_order_policy.rb
class WorkOrderPolicy < ApplicationPolicy
  def update_status?
    return false if user.viewer?
    return true if user.admin? || user.manager?
    
    # Механик может менять статус только своих заказов
    if user.mechanic? && user.employee.present?
      record.employee_id == user.employee.id
    else
      true
    end
  end

  def assign_employee?
    user.admin? || user.manager?
  end

  def destroy?
    user.admin?
  end

  class Scope < Scope
    def resolve
      if user.admin? || user.manager? || user.operator?
        scope.all
      elsif user.mechanic? && user.employee.present?
        scope.where(employee_id: user.employee.id)
      else
        scope.none
      end
    end
  end
end

# app/policies/employee_policy.rb
class EmployeePolicy < ApplicationPolicy
  def create?
    user.admin?
  end

  def update?
    user.admin?
  end

  def destroy?
    user.admin?
  end
end

# app/policies/client_policy.rb
class ClientPolicy < ApplicationPolicy
  def destroy?
    user.admin? || user.manager?
  end
end
```

### Auth Endpoints

```ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
        sessions: 'api/v1/sessions',
        registrations: 'api/v1/registrations',
        passwords: 'api/v1/passwords'
      }
      
      # Текущий пользователь
      get 'me', to: 'users#me'
      patch 'me', to: 'users#update_profile'
      patch 'me/password', to: 'users#update_password'
    end
  end
end

# app/controllers/api/v1/sessions_controller.rb
class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      user: UserSerializer.new(resource).as_json,
      message: 'Успешный вход'
    }
  end

  def respond_to_on_destroy
    if current_user
      render json: { message: 'Успешный выход' }
    else
      render json: { error: 'Не авторизован' }, status: :unauthorized
    end
  end
end
```

---

## Модели данных (с полной логикой)

### Client (Клиент)

```ruby
# app/models/client.rb
class Client < ApplicationRecord
  has_many :vehicles, dependent: :destroy
  has_many :work_orders, dependent: :restrict_with_error
  has_many :calendar_events, dependent: :nullify
  has_many :messages, as: :messageable, dependent: :destroy

  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :phone, presence: true, 
                    uniqueness: { case_sensitive: false },
                    format: { with: /\A\+?[\d\s\-\(\)]+\z/, message: 'неверный формат' }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true

  before_validation :normalize_phone
  
  scope :with_active_orders, -> { joins(:work_orders).where.not(work_orders: { status: 'ready' }).distinct }
  scope :search, ->(query) { 
    where('name ILIKE :q OR phone ILIKE :q OR email ILIKE :q', q: "%#{query}%") 
  }

  def active_orders_count
    work_orders.where.not(status: %w[ready cancelled]).count
  end

  def total_spent
    work_orders.where(status: 'ready').sum(:total_price)
  end

  def display_name
    name.presence || phone
  end

  private

  def normalize_phone
    self.phone = phone.to_s.gsub(/[^\d+]/, '') if phone.present?
  end
end

# db/migrate/xxx_create_clients.rb
create_table :clients do |t|
  t.string :name, null: false
  t.string :phone, null: false
  t.string :email
  t.string :telegram_chat_id
  t.text :notes
  t.date :birth_date
  t.integer :source, default: 0  # enum: walk_in, referral, advertising, repeat
  t.timestamps
end

add_index :clients, :phone, unique: true
add_index :clients, :telegram_chat_id, unique: true
add_index :clients, :email
add_index :clients, :name, using: :gin, opclass: :gin_trgm_ops  # для быстрого ILIKE поиска
```

### Vehicle (Автомобиль)

```ruby
# app/models/vehicle.rb
class Vehicle < ApplicationRecord
  belongs_to :client
  has_many :work_orders, dependent: :restrict_with_error
  has_many :calendar_events, dependent: :nullify

  validates :brand, presence: true, length: { maximum: 50 }
  validates :model, presence: true, length: { maximum: 50 }
  validates :year, presence: true, 
                   numericality: { 
                     only_integer: true, 
                     greater_than: 1900, 
                     less_than_or_equal_to: -> { Date.current.year + 1 } 
                   }
  validates :gos_number, presence: true, 
                         uniqueness: { case_sensitive: false },
                         format: { with: /\A[А-ЯA-Z0-9\s]+\z/i }
  validates :vin, uniqueness: { case_sensitive: false }, 
                  length: { is: 17 }, 
                  format: { with: /\A[A-HJ-NPR-Z0-9]+\z/ },
                  allow_blank: true
  validates :mileage, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true

  before_validation :normalize_gos_number, :normalize_vin

  scope :by_brand, ->(brand) { where(brand: brand) }
  scope :search, ->(query) { 
    where('brand ILIKE :q OR model ILIKE :q OR gos_number ILIKE :q OR vin ILIKE :q', q: "%#{query}%") 
  }

  def full_name
    "#{brand} #{model} (#{year})"
  end

  def display_name
    "#{brand} #{model} • #{gos_number}"
  end

  def last_service_date
    work_orders.where(status: 'ready').order(completed_at: :desc).first&.completed_at&.to_date
  end

  private

  def normalize_gos_number
    self.gos_number = gos_number.to_s.upcase.gsub(/\s+/, '') if gos_number.present?
  end

  def normalize_vin
    self.vin = vin.to_s.upcase.gsub(/[^A-HJ-NPR-Z0-9]/, '') if vin.present?
  end
end
```

### Employee (Сотрудник)

```ruby
# app/models/employee.rb
class Employee < ApplicationRecord
  has_one :user, dependent: :nullify
  has_many :work_orders, dependent: :nullify
  has_many :assigned_orders, class_name: 'WorkOrder', foreign_key: :employee_id

  enum :role, {
    mechanic: 0,
    diagnostician: 1,
    electrician: 2,
    body_worker: 3,
    painter: 4,
    manager: 5,
    admin: 6
  }, prefix: true

  validates :name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :role, presence: true
  validates :phone, format: { with: /\A\+?[\d\s\-\(\)]+\z/ }, allow_blank: true
  validates :hourly_rate, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  scope :active, -> { where(is_active: true) }
  scope :available, -> { active.where.not(id: WorkOrder.active.select(:employee_id)) }
  scope :by_role, ->(role) { where(role: role) }

  def active_orders_count
    work_orders.active.count
  end

  def completed_orders_count
    work_orders.completed.count
  end

  def current_workload
    work_orders.where(status: %w[taken_to_work passed_to_work]).count
  end

  def available?
    is_active && current_workload < max_concurrent_orders
  end

  def max_concurrent_orders
    3 # можно сделать настраиваемым
  end

  def role_name
    I18n.t("employee.roles.#{role}")
  end
end

# db/migrate/xxx_create_employees.rb
create_table :employees do |t|
  t.string :name, null: false
  t.integer :role, null: false, default: 0
  t.string :phone
  t.string :avatar
  t.boolean :is_active, default: true, null: false
  t.string :telegram_chat_id
  t.decimal :hourly_rate, precision: 10, scale: 2
  t.date :hire_date
  t.text :notes
  t.timestamps
end

add_index :employees, :role
add_index :employees, :is_active
```

### WorkOrder (Заказ-наряд)

```ruby
# app/models/work_order.rb
class WorkOrder < ApplicationRecord
  include AASM

  belongs_to :client
  belongs_to :vehicle
  belongs_to :employee, optional: true
  has_many :services, class_name: 'WorkOrderService', dependent: :destroy
  has_many :calendar_events, dependent: :destroy
  has_many :status_changes, class_name: 'WorkOrderStatusChange', dependent: :destroy
  has_one :invoice, dependent: :nullify

  accepts_nested_attributes_for :services, allow_destroy: true, 
    reject_if: proc { |attrs| attrs['name'].blank? }

  enum :priority, {
    low: 0,
    medium: 1,
    high: 2,
    urgent: 3
  }, prefix: true

  validates :title, presence: true, length: { maximum: 200 }
  validates :client, :vehicle, presence: true
  validate :vehicle_belongs_to_client
  validate :employee_is_active, if: :employee_id_changed?

  before_create :generate_order_number
  before_save :calculate_total_price
  after_save :create_calendar_event, if: :saved_change_to_scheduled_date?
  after_update :notify_status_change, if: :saved_change_to_status?
  after_update :notify_employee_assignment, if: :saved_change_to_employee_id?

  scope :active, -> { where.not(status: %w[ready cancelled]) }
  scope :completed, -> { where(status: 'ready') }
  scope :today, -> { where(scheduled_date: Date.current) }
  scope :overdue, -> { active.where('scheduled_date < ?', Date.current) }
  scope :by_status, ->(status) { where(status: status) }
  scope :by_employee, ->(employee_id) { where(employee_id: employee_id) }
  scope :by_client, ->(client_id) { where(client_id: client_id) }
  scope :created_between, ->(from, to) { where(created_at: from..to) }
  scope :search, ->(query) { 
    joins(:client, :vehicle)
      .where('work_orders.order_number ILIKE :q OR work_orders.title ILIKE :q OR clients.name ILIKE :q OR vehicles.gos_number ILIKE :q', q: "%#{query}%") 
  }

  # AASM State Machine
  aasm column: :status, whiny_transitions: false do
    state :initial_contact, initial: true
    state :diagnostics
    state :estimate
    state :passed_to_work
    state :taken_to_work
    state :ready
    state :cancelled

    event :start_diagnostics do
      transitions from: :initial_contact, to: :diagnostics
    end

    event :create_estimate do
      transitions from: :diagnostics, to: :estimate
    end

    event :pass_to_work do
      transitions from: :estimate, to: :passed_to_work
    end

    event :take_to_work do
      transitions from: :passed_to_work, to: :taken_to_work
    end

    event :complete do
      transitions from: :taken_to_work, to: :ready
      after do
        self.completed_at = Time.current
      end
    end

    event :cancel do
      transitions from: [:initial_contact, :diagnostics, :estimate, :passed_to_work], to: :cancelled
    end

    event :reopen do
      transitions from: [:ready, :cancelled], to: :initial_contact
      after do
        self.completed_at = nil
      end
    end
  end

  def status_label
    I18n.t("work_order.statuses.#{status}")
  end

  def priority_label
    I18n.t("work_order.priorities.#{priority}")
  end

  def overdue?
    scheduled_date.present? && scheduled_date < Date.current && !ready? && !cancelled?
  end

  def duration_days
    return nil unless completed_at
    (completed_at.to_date - created_at.to_date).to_i
  end

  private

  def generate_order_number
    year = Time.current.strftime('%y')
    month = Time.current.strftime('%m')
    
    last_order = WorkOrder.where('created_at >= ?', Time.current.beginning_of_month)
                          .order(created_at: :desc)
                          .lock
                          .first
    
    next_number = last_order ? last_order.order_number.last(4).to_i + 1 : 1
    self.order_number = "ЗН-#{year}#{month}#{next_number.to_s.rjust(4, '0')}"
  end

  def calculate_total_price
    self.total_price = services.reject(&:marked_for_destruction?).sum { |s| s.price * s.quantity }
  end

  def vehicle_belongs_to_client
    return unless vehicle && client
    errors.add(:vehicle, 'не принадлежит клиенту') unless vehicle.client_id == client_id
  end

  def employee_is_active
    return unless employee
    errors.add(:employee, 'неактивен') unless employee.is_active?
  end

  def create_calendar_event
    return unless scheduled_date.present?
    
    calendar_events.find_or_create_by(start_date: scheduled_date) do |event|
      event.title = "#{vehicle.display_name} — #{title}"
      event.client = client
      event.vehicle = vehicle
      event.event_type = 'appointment'
      event.priority = priority_urgent? ? 'Danger' : 'Primary'
    end
  end

  def notify_status_change
    WorkOrderStatusChange.create!(
      work_order: self,
      from_status: status_before_last_save,
      to_status: status,
      user: Current.user
    )

    # Уведомление клиенту
    NotificationService.notify_client(client, self) if client.telegram_chat_id.present?
    
    # Уведомление мастеру
    NotificationService.notify_employee(employee, self) if employee&.telegram_chat_id.present?
  end

  def notify_employee_assignment
    return unless employee.present?
    NotificationService.employee_assigned(employee, self)
  end
end

# db/migrate/xxx_create_work_orders.rb
create_table :work_orders do |t|
  t.string :order_number, null: false
  t.references :client, null: false, foreign_key: true
  t.references :vehicle, null: false, foreign_key: true
  t.references :employee, foreign_key: true
  t.string :title, null: false
  t.text :description
  t.string :status, default: 'initial_contact', null: false
  t.integer :priority, default: 1, null: false
  t.decimal :total_price, precision: 12, scale: 2, default: 0
  t.datetime :completed_at
  t.date :scheduled_date
  t.text :internal_notes  # заметки для сотрудников
  t.integer :estimated_hours
  t.timestamps
end

add_index :work_orders, :order_number, unique: true
add_index :work_orders, :status
add_index :work_orders, :priority
add_index :work_orders, :scheduled_date
add_index :work_orders, [:status, :scheduled_date]
```

### WorkOrderService (Услуга в заказе)

```ruby
# app/models/work_order_service.rb
class WorkOrderService < ApplicationRecord
  self.table_name = 'services'
  
  belongs_to :work_order
  belongs_to :service_template, optional: true  # каталог услуг

  validates :name, presence: true, length: { maximum: 200 }
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }

  after_save :update_work_order_total
  after_destroy :update_work_order_total

  scope :parts, -> { where(is_part: true) }
  scope :labor, -> { where(is_part: false) }

  def total
    price * quantity
  end

  private

  def update_work_order_total
    work_order.update_column(:total_price, work_order.services.sum('price * quantity'))
  end
end

# db/migrate/xxx_create_services.rb
create_table :services do |t|
  t.references :work_order, null: false, foreign_key: true
  t.references :service_template, foreign_key: true
  t.string :name, null: false
  t.decimal :price, precision: 10, scale: 2, null: false
  t.integer :quantity, default: 1, null: false
  t.boolean :is_part, default: false  # true = запчасть, false = работа
  t.string :part_number  # артикул запчасти
  t.timestamps
end

add_index :services, :is_part
```

### WorkOrderStatusChange (История статусов)

```ruby
# app/models/work_order_status_change.rb
class WorkOrderStatusChange < ApplicationRecord
  belongs_to :work_order
  belongs_to :user, optional: true

  validates :from_status, :to_status, presence: true

  scope :recent, -> { order(created_at: :desc).limit(10) }
end

# db/migrate/xxx_create_work_order_status_changes.rb
create_table :work_order_status_changes do |t|
  t.references :work_order, null: false, foreign_key: true
  t.references :user, foreign_key: true
  t.string :from_status, null: false
  t.string :to_status, null: false
  t.text :comment
  t.timestamps
end
```

---

## Сервисы

### NotificationService

```ruby
# app/services/notification_service.rb
class NotificationService
  class << self
    def notify_client(client, work_order)
      return unless client.telegram_chat_id.present?

      message = build_client_message(work_order)
      TelegramService.send_message(client.telegram_chat_id, message)
      
      create_notification(client, work_order, message)
    end

    def notify_employee(employee, work_order)
      return unless employee.telegram_chat_id.present?

      message = build_employee_message(work_order)
      TelegramService.send_message(employee.telegram_chat_id, message)
    end

    def employee_assigned(employee, work_order)
      return unless employee.telegram_chat_id.present?

      message = "🔧 Вам назначен заказ #{work_order.order_number}\n"
      message += "#{work_order.vehicle.display_name}\n"
      message += "#{work_order.title}"
      
      TelegramService.send_message(employee.telegram_chat_id, message)
    end

    private

    def build_client_message(work_order)
      status_emoji = {
        'initial_contact' => '📞',
        'diagnostics' => '🔍',
        'estimate' => '💰',
        'passed_to_work' => '📋',
        'taken_to_work' => '🔧',
        'ready' => '✅',
        'cancelled' => '❌'
      }

      emoji = status_emoji[work_order.status] || '📌'
      
      "#{emoji} Статус заказа #{work_order.order_number} изменён:\n" \
      "#{work_order.status_label}\n\n" \
      "🚗 #{work_order.vehicle.display_name}"
    end

    def build_employee_message(work_order)
      "📋 Заказ #{work_order.order_number} обновлён\n" \
      "Статус: #{work_order.status_label}\n" \
      "#{work_order.vehicle.display_name}"
    end

    def create_notification(client, work_order, message)
      Notification.create!(
        title: "Заказ #{work_order.order_number}",
        message: message,
        notification_type: 'info',
        notifiable: client,
        link: "/work-orders/#{work_order.id}"
      )
    end
  end
end
```

### TelegramService

```ruby
# app/services/telegram_service.rb
class TelegramService
  include Singleton

  def self.send_message(chat_id, text, **options)
    instance.send_message(chat_id, text, **options)
  end

  def self.bot
    instance.bot
  end

  def bot
    @bot ||= Telegram::Bot::Client.new(Rails.application.credentials.telegram[:bot_token])
  end

  def send_message(chat_id, text, parse_mode: 'HTML', **options)
    return if Rails.env.test?
    
    SendTelegramMessageJob.perform_later(chat_id, text, parse_mode: parse_mode, **options)
  rescue StandardError => e
    Rails.logger.error "Telegram send error: #{e.message}"
    Sentry.capture_exception(e) if defined?(Sentry)
  end
end

# app/jobs/send_telegram_message_job.rb
class SendTelegramMessageJob < ApplicationJob
  queue_as :notifications
  retry_on Telegram::Bot::Exceptions::ResponseError, wait: 5.seconds, attempts: 3

  def perform(chat_id, text, **options)
    TelegramService.bot.api.send_message(
      chat_id: chat_id,
      text: text,
      **options
    )
  end
end
```

### DashboardService

```ruby
# app/services/dashboard_service.rb
class DashboardService
  def initialize(date_range: nil)
    @date_range = date_range || (Date.current.beginning_of_month..Date.current)
  end

  def metrics
    {
      active_orders: active_orders_count,
      completed_this_month: completed_this_month,
      completed_change_percent: completed_change_percent,
      revenue_this_month: revenue_this_month,
      revenue_change_percent: revenue_change_percent,
      average_check: average_check,
      average_check_change_percent: average_check_change_percent,
      total_clients: Client.count,
      total_vehicles: Vehicle.count,
      overdue_orders: WorkOrder.overdue.count
    }
  end

  def today_schedule
    WorkOrder.includes(:client, :vehicle, :employee)
             .where(scheduled_date: Date.current)
             .order(:created_at)
  end

  def recent_orders(limit: 5)
    WorkOrder.includes(:client, :vehicle)
             .order(created_at: :desc)
             .limit(limit)
  end

  private

  def active_orders_count
    WorkOrder.active.count
  end

  def completed_this_month
    WorkOrder.completed.where(completed_at: current_month_range).count
  end

  def completed_change_percent
    calculate_change(completed_this_month, completed_last_month)
  end

  def completed_last_month
    WorkOrder.completed.where(completed_at: last_month_range).count
  end

  def revenue_this_month
    WorkOrder.completed.where(completed_at: current_month_range).sum(:total_price)
  end

  def revenue_change_percent
    calculate_change(revenue_this_month, revenue_last_month)
  end

  def revenue_last_month
    WorkOrder.completed.where(completed_at: last_month_range).sum(:total_price)
  end

  def average_check
    count = completed_this_month
    count.zero? ? 0 : (revenue_this_month / count).round
  end

  def average_check_change_percent
    last_avg = completed_last_month.zero? ? 0 : (revenue_last_month / completed_last_month).round
    calculate_change(average_check, last_avg)
  end

  def current_month_range
    Date.current.beginning_of_month.beginning_of_day..Date.current.end_of_day
  end

  def last_month_range
    1.month.ago.beginning_of_month.beginning_of_day..1.month.ago.end_of_month.end_of_day
  end

  def calculate_change(current, previous)
    return 0 if previous.zero?
    (((current - previous).to_f / previous) * 100).round
  end
end
```

---

## API Controllers

### Base Controller

```ruby
# app/controllers/api/v1/base_controller.rb
module Api
  module V1
    class BaseController < ApplicationController
      include Pundit::Authorization
      
      before_action :authenticate_user!
      after_action :verify_authorized, except: :index
      after_action :verify_policy_scoped, only: :index

      rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
      rescue_from ActiveRecord::RecordNotFound, with: :not_found
      rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
      rescue_from ActionController::ParameterMissing, with: :bad_request

      private

      def user_not_authorized
        render json: { error: 'Недостаточно прав' }, status: :forbidden
      end

      def not_found
        render json: { error: 'Запись не найдена' }, status: :not_found
      end

      def unprocessable_entity(exception)
        render json: { 
          error: 'Ошибка валидации', 
          details: exception.record.errors.full_messages 
        }, status: :unprocessable_entity
      end

      def bad_request(exception)
        render json: { error: exception.message }, status: :bad_request
      end

      def pagination_meta(collection)
        {
          current_page: collection.current_page,
          total_pages: collection.total_pages,
          total_count: collection.total_count,
          per_page: collection.limit_value
        }
      end
    end
  end
end
```

### WorkOrders Controller

```ruby
# app/controllers/api/v1/work_orders_controller.rb
module Api
  module V1
    class WorkOrdersController < BaseController
      before_action :set_work_order, only: [:show, :update, :destroy, :update_status]

      def index
        @work_orders = policy_scope(WorkOrder)
                        .includes(:client, :vehicle, :employee, :services)
                        .search(params[:search])
        
        @work_orders = @work_orders.by_status(params[:status]) if params[:status].present?
        @work_orders = @work_orders.by_employee(params[:employee_id]) if params[:employee_id].present?
        @work_orders = @work_orders.by_client(params[:client_id]) if params[:client_id].present?
        
        if params[:date_from].present? && params[:date_to].present?
          @work_orders = @work_orders.created_between(params[:date_from], params[:date_to])
        end

        @work_orders = @work_orders.order(created_at: :desc).page(params[:page]).per(params[:per_page] || 25)

        render json: {
          data: WorkOrderSerializer.new(@work_orders).serializable_hash,
          meta: pagination_meta(@work_orders)
        }
      end

      def show
        authorize @work_order
        render json: WorkOrderSerializer.new(@work_order, include: [:client, :vehicle, :employee, :services]).serializable_hash
      end

      def create
        @work_order = WorkOrder.new(work_order_params)
        authorize @work_order

        if @work_order.save
          render json: WorkOrderSerializer.new(@work_order).serializable_hash, status: :created
        else
          render json: { errors: @work_order.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        authorize @work_order

        if @work_order.update(work_order_params)
          render json: WorkOrderSerializer.new(@work_order).serializable_hash
        else
          render json: { errors: @work_order.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @work_order
        @work_order.destroy
        head :no_content
      end

      def update_status
        authorize @work_order, :update_status?
        
        new_status = params[:status]
        event_name = status_to_event(new_status)

        if event_name && @work_order.send("may_#{event_name}?")
          @work_order.send("#{event_name}!")
          render json: WorkOrderSerializer.new(@work_order).serializable_hash
        else
          render json: { error: 'Невозможно изменить статус' }, status: :unprocessable_entity
        end
      end

      private

      def set_work_order
        @work_order = WorkOrder.find(params[:id])
      end

      def work_order_params
        params.require(:work_order).permit(
          :client_id, :vehicle_id, :employee_id, :title, :description,
          :priority, :scheduled_date, :internal_notes, :estimated_hours,
          services_attributes: [:id, :name, :price, :quantity, :is_part, :part_number, :_destroy]
        )
      end

      def status_to_event(status)
        {
          'diagnostics' => 'start_diagnostics',
          'estimate' => 'create_estimate',
          'passed_to_work' => 'pass_to_work',
          'taken_to_work' => 'take_to_work',
          'ready' => 'complete',
          'cancelled' => 'cancel',
          'initial_contact' => 'reopen'
        }[status]
      end
    end
  end
end
```

---

## Актуальные Gems (2024-2025)

```ruby
# Gemfile

source 'https://rubygems.org'
ruby '3.2.2'

gem 'rails', '~> 7.1'
gem 'pg', '~> 1.5'           # PostgreSQL
gem 'puma', '~> 6.4'         # Web server

# API & Serialization
gem 'jsonapi-serializer'      # Быстрый JSON serializer (замена active_model_serializers)
gem 'oj'                      # Быстрый JSON парсер
gem 'pagy', '~> 6.2'          # Быстрая пагинация (замена kaminari)
gem 'ransack', '~> 4.1'       # Поиск и фильтрация

# Authentication & Authorization
gem 'devise', '~> 4.9'
gem 'devise-jwt', '~> 0.11'   # JWT для Devise
gem 'pundit', '~> 2.3'        # Authorization

# State Machine
gem 'aasm', '~> 5.5'          # State machine для статусов

# Background Jobs
gem 'sidekiq', '~> 7.2'       # Background jobs
gem 'sidekiq-scheduler'       # Scheduled jobs

# Caching & Performance
gem 'redis', '~> 5.1'
gem 'hiredis-client'          # Быстрый Redis драйвер
gem 'connection_pool'

# Telegram
gem 'telegram-bot-ruby', '~> 1.0'

# File uploads (если нужно)
gem 'shrine', '~> 3.5'        # File uploads (современная альтернатива CarrierWave)
gem 'image_processing', '~> 1.12'

# Monitoring & Errors
gem 'sentry-ruby'
gem 'sentry-rails'

# CORS
gem 'rack-cors'

# Utilities
gem 'bootsnap', require: false
gem 'tzinfo-data'

group :development, :test do
  gem 'rspec-rails', '~> 6.1'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry-rails'
  gem 'dotenv-rails'
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
  gem 'rubocop-performance', require: false
end

group :test do
  gem 'shoulda-matchers'
  gem 'database_cleaner-active_record'
  gem 'webmock'
  gem 'vcr'
  gem 'simplecov', require: false
end

group :development do
  gem 'annotate'              # Аннотации моделей
  gem 'bullet'                # N+1 queries detection
  gem 'brakeman', require: false  # Security scanner
end
```

---

## Конфигурация

### config/initializers/cors.rb

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch('FRONTEND_URL', 'http://localhost:3000')
    
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Authorization'],
      credentials: true
  end
end
```

### config/initializers/devise.rb (JWT часть)

```ruby
Devise.setup do |config|
  # ... стандартная конфигурация ...

  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.devise_jwt_secret_key!
    jwt.dispatch_requests = [
      ['POST', %r{^/api/v1/login$}]
    ]
    jwt.revocation_requests = [
      ['DELETE', %r{^/api/v1/logout$}]
    ]
    jwt.expiration_time = 7.days.to_i
  end
end
```

### config/initializers/pagy.rb

```ruby
require 'pagy/extras/metadata'
require 'pagy/extras/overflow'

Pagy::DEFAULT[:items] = 25
Pagy::DEFAULT[:overflow] = :last_page
```

---

## Тесты (RSpec)

```ruby
# spec/models/work_order_spec.rb
require 'rails_helper'

RSpec.describe WorkOrder, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:client) }
    it { should validate_presence_of(:vehicle) }
  end

  describe 'associations' do
    it { should belong_to(:client) }
    it { should belong_to(:vehicle) }
    it { should belong_to(:employee).optional }
    it { should have_many(:services).dependent(:destroy) }
  end

  describe 'state machine' do
    let(:work_order) { create(:work_order) }

    it 'starts in initial_contact state' do
      expect(work_order).to be_initial_contact
    end

    it 'transitions through states correctly' do
      expect(work_order.may_start_diagnostics?).to be true
      work_order.start_diagnostics!
      expect(work_order).to be_diagnostics

      work_order.create_estimate!
      expect(work_order).to be_estimate

      work_order.pass_to_work!
      expect(work_order).to be_passed_to_work

      work_order.take_to_work!
      expect(work_order).to be_taken_to_work

      work_order.complete!
      expect(work_order).to be_ready
      expect(work_order.completed_at).to be_present
    end
  end

  describe '#generate_order_number' do
    it 'generates unique order number' do
      work_order = create(:work_order)
      expect(work_order.order_number).to match(/^ЗН-\d{6}$/)
    end
  end

  describe '#calculate_total_price' do
    let(:work_order) { create(:work_order) }
    
    it 'calculates total from services' do
      create(:service, work_order: work_order, price: 1000, quantity: 2)
      create(:service, work_order: work_order, price: 500, quantity: 1)
      
      work_order.reload
      expect(work_order.total_price).to eq(2500)
    end
  end
end
```

---

## Docker

```dockerfile
# Dockerfile
FROM ruby:3.2.2-slim

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs npm && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

COPY . .

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: password

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis
    environment:
      DATABASE_URL: postgres://postgres:password@db/planeta_production
      REDIS_URL: redis://redis:6379/0
    volumes:
      - .:/app

  sidekiq:
    build: .
    command: bundle exec sidekiq
    depends_on:
      - db
      - redis
    environment:
      DATABASE_URL: postgres://postgres:password@db/planeta_production
      REDIS_URL: redis://redis:6379/0

volumes:
  postgres_data:
  redis_data:
```

---

## Важные бизнес-правила

1. **Номер заказа** — генерируется автоматически: `ЗН-ГГММ0001` с блокировкой для избежания дублей
2. **Статусы заказа** — строгий порядок через AASM state machine
3. **При удалении клиента** — нельзя удалить если есть незавершённые заказы
4. **При смене статуса** — автоматическое уведомление через Telegram
5. **Цена заказа** — автоматический пересчёт при изменении услуг
6. **Только активные сотрудники** могут быть назначены на заказы
7. **Механики** видят только свои заказы
8. **История изменений статуса** сохраняется для аудита
