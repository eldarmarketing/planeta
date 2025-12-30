# 🔧 Настройка CORS для работы с фронтендом

## ⚠️ ПРОБЛЕМА

После деплоя на Beget **вход не работает** из-за ошибки CORS:

```
Access to fetch at 'https://birson.tgapp.online/api/v1/login' from origin 'https://ваш-домен.ru' 
has been blocked by CORS policy
```

---

## ✅ РЕШЕНИЕ

Программист бэкенда должен добавить ваш домен в CORS настройки.

---

## 📝 Для программиста Rails:

### 1. Установите gem (если ещё нет):

```ruby
# Gemfile
gem 'rack-cors'
```

```bash
bundle install
```

### 2. Настройте CORS:

```ruby
# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Добавьте домен planeta.marketing
    origins 'https://planeta.marketing', 
            'http://planeta.marketing',
            'https://www.planeta.marketing',
            'http://localhost:3000'  # для разработки
    
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Authorization'],  # Важно для JWT токенов!
      credentials: true
  end
end
```

### 3. Перезапустите сервер:

```bash
# На production
systemctl restart puma
# или
touch tmp/restart.txt
```

---

## 🧪 Проверка CORS

После настройки проверьте что работает:

```bash
curl -I https://birson.tgapp.online/api/v1/login \
  -H "Origin: https://planeta.marketing" \
  -H "Access-Control-Request-Method: POST"
```

Должны увидеть заголовки:
```
Access-Control-Allow-Origin: https://planeta.marketing
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
Access-Control-Allow-Credentials: true
```

---

## 🎯 Какие домены нужно добавить?

Для вашего проекта используйте:

```ruby
origins 'https://planeta.marketing',
        'http://planeta.marketing',
        'https://www.planeta.marketing',
        'http://www.planeta.marketing',
        'http://localhost:3000'        # Для разработки
```

**Важно:** 
- Укажите протокол: `https://` или `http://`
- Без слеша в конце
- Можно указать несколько доменов через запятую

---

## 📋 Альтернатива: Разрешить всё (НЕ для продакшена!)

**Только для тестирования:**

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # ⚠️ Небезопасно! Только для теста!
    
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Authorization'],
      credentials: true
  end
end
```

---

## 🔍 Логи для отладки

Если не работает, включите логирование:

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors, debug: true do
  # ... настройки ...
end
```

И смотрите логи:
```bash
tail -f log/production.log
```

---

## 🎉 После настройки CORS

1. ✅ Вход на сайте заработает
2. ✅ Все API запросы будут работать
3. ✅ Токены будут сохраняться корректно

---

## 📞 Что передать программисту:

Отправьте программисту:
1. Этот файл (CORS_SETUP.md)
2. Ваш домен на Beget: `https://ваш-домен.ru`
3. Ошибку из консоли браузера (F12 → Console)

---

## ⚙️ Текущие настройки фронтенда:

```typescript
// В production запросы идут напрямую на:
const BASE_URL = 'https://birson.tgapp.online/api/v1'

// Все запросы автоматически добавляют:
Headers: {
  'Authorization': 'Bearer <токен>',
  'Content-Type': 'application/json'
}
```

---

## 🔗 Полезные ссылки:

- [rack-cors gem](https://github.com/cyu/rack-cors)
- [Rails CORS Guide](https://guides.rubyonrails.org/configuring.html#config-middleware)
- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Как только программист настроит CORS - вход заработает! 🚀**

