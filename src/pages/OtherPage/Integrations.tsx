import PageMeta from "../../components/common/PageMeta";
import {
  Icon1C,
  IconMoySklad,
  IconSBP,
  IconYandexPay,
  IconOnlineKassa,
  IconTelegram,
  IconMangoTelefon,
  IconSMS,
  IconEmex,
  IconAutodoc,
  IconTecDoc,
  IconYandexMaps,
  Icon2GIS,
  IconYClients,
  IconOnlineZapis,
  IconYandexMetrika,
  IconRoistat,
  IconEDO,
  IconVKAds,
  IconYandexDirect,
  IconVIN,
  IconGIBDD,
  IconLoyalty,
  IconEmail,
  IconMAX,
} from "../../components/integration/icon";
import IntegrationBreadcrumb from "../../components/integration/IntegrationBreadcrumb";
import IntegrationCard from "../../components/integration/IntegrationCard";

const integrationData = [
  // === БУХГАЛТЕРИЯ И УЧЁТ ===
  {
    id: "1c",
    title: "1С:Бухгалтерия",
    description:
      "Автоматическая выгрузка актов, счетов и заказ-нарядов в 1С. Синхронизация остатков склада и взаиморасчётов.",
    icon: <Icon1C />,
    connect: true,
    category: "accounting",
  },
  {
    id: "moysklad",
    title: "МойСклад",
    description:
      "Облачный учёт товаров и запчастей. Автоматическое списание при продаже и оприходование при поступлении.",
    icon: <IconMoySklad />,
    connect: false,
    category: "accounting",
  },

  // === ПЛАТЕЖИ И ЭКВАЙРИНГ ===
  {
    id: "sbp",
    title: "СБП (Система быстрых платежей)",
    description:
      "Приём оплаты по QR-коду без терминала. Комиссия всего 0.4-0.7% вместо 1.5-2.5% по эквайрингу.",
    icon: <IconSBP />,
    connect: true,
    category: "payments",
  },
  {
    id: "yandex-pay",
    title: "Яндекс Пэй / SberPay",
    description:
      "Быстрая оплата в одно касание. Интеграция с популярными платёжными сервисами для удобства клиентов.",
    icon: <IconYandexPay />,
    connect: false,
    category: "payments",
  },
  {
    id: "online-kassa",
    title: "Онлайн-касса (АТОЛ / Эвотор)",
    description:
      "Автоматическая печать чеков по 54-ФЗ. Отправка электронных чеков клиентам на email или по SMS.",
    icon: <IconOnlineKassa />,
    connect: true,
    category: "payments",
  },

  // === КОММУНИКАЦИИ ===
  {
    id: "telegram",
    title: "Telegram-бот",
    description:
      "Бот для уведомлений механиков о новых заказах. Клиенты могут узнать статус ремонта через бота. Рассылки и чаты.",
    icon: <IconTelegram />,
    connect: true,
    category: "communication",
  },
  {
    id: "mango",
    title: "IP-телефония (Манго / UIS)",
    description:
      "Запись всех звонков, всплывающая карточка клиента при входящем. Аналитика по пропущенным.",
    icon: <IconMangoTelefon />,
    connect: false,
    category: "communication",
  },
  {
    id: "sms",
    title: "SMS-уведомления",
    description:
      "Автоматические SMS о готовности авто, напоминания о записи и акциях. Интеграция с SMS.ru, SMSC.",
    icon: <IconSMS />,
    connect: true,
    category: "communication",
  },
  {
    id: "email",
    title: "Email-рассылки",
    description:
      "Автоматические письма с актами выполненных работ, напоминания о ТО и специальные предложения.",
    icon: <IconEmail />,
    connect: false,
    category: "communication",
  },

  // === КАТАЛОГИ ЗАПЧАСТЕЙ ===
  {
    id: "emex",
    title: "Emex / Exist",
    description:
      "Поиск запчастей по VIN и кроссам. Автоматический заказ у поставщиков с лучшими ценами и сроками.",
    icon: <IconEmex />,
    connect: true,
    category: "parts",
  },
  {
    id: "autodoc",
    title: "Autodoc API",
    description:
      "Интеграция с крупнейшим маркетплейсом запчастей. Актуальные цены и наличие в реальном времени.",
    icon: <IconAutodoc />,
    connect: false,
    category: "parts",
  },
  {
    id: "tecdoc",
    title: "TecDoc",
    description:
      "Официальный каталог применимости запчастей. Подбор по VIN с гарантией совместимости.",
    icon: <IconTecDoc />,
    connect: false,
    category: "parts",
  },

  // === КАРТЫ И ГЕОСЕРВИСЫ ===
  {
    id: "yandex-maps",
    title: "Яндекс Бизнес",
    description:
      "Ваш СТО на Яндекс Картах с отзывами. Ответы на отзывы, фото, акции и онлайн-запись прямо с карты.",
    icon: <IconYandexMaps />,
    connect: true,
    category: "maps",
  },
  {
    id: "2gis",
    title: "2ГИС для бизнеса",
    description:
      "Размещение в справочнике 2ГИС. Более 50 млн пользователей ежемесячно ищут автосервисы.",
    icon: <Icon2GIS />,
    connect: true,
    category: "maps",
  },

  // === ОНЛАЙН-ЗАПИСЬ ===
  {
    id: "yclients",
    title: "YCLIENTS",
    description:
      "Профессиональная система онлайн-записи. Виджет для сайта, напоминания клиентам, учёт загрузки постов.",
    icon: <IconYClients />,
    connect: false,
    category: "booking",
  },
  {
    id: "online-zapis",
    title: "Виджет онлайн-записи",
    description:
      "Встраиваемый виджет для вашего сайта. Клиенты выбирают услугу, дату и время без звонка.",
    icon: <IconOnlineZapis />,
    connect: true,
    category: "booking",
  },

  // === АНАЛИТИКА ===
  {
    id: "metrika",
    title: "Яндекс Метрика",
    description:
      "Отслеживание заявок с сайта, звонков и конверсий. Понимание какая реклама приводит клиентов.",
    icon: <IconYandexMetrika />,
    connect: false,
    category: "analytics",
  },
  {
    id: "roistat",
    title: "Roistat / Calltouch",
    description:
      "Сквозная аналитика от рекламы до выручки. ROI каждого рекламного канала в одном отчёте.",
    icon: <IconRoistat />,
    connect: false,
    category: "analytics",
  },

  // === ДОКУМЕНТООБОРОТ ===
  {
    id: "edo",
    title: "ЭДО (Диадок / СБИС)",
    description:
      "Электронный документооборот с поставщиками. УПД, акты сверки без бумаги с юридической силой.",
    icon: <IconEDO />,
    connect: false,
    category: "docs",
  },

  // === МАРКЕТИНГ ===
  {
    id: "vk-ads",
    title: "VK Реклама",
    description:
      "Таргетированная реклама на автовладельцев вашего района. Ретаргетинг по базе клиентов.",
    icon: <IconVKAds />,
    connect: false,
    category: "marketing",
  },
  {
    id: "yandex-direct",
    title: "Яндекс Директ",
    description:
      "Контекстная реклама по запросам «автосервис рядом», «ремонт BMW» и др. Автоматическая UTM-разметка.",
    icon: <IconYandexDirect />,
    connect: false,
    category: "marketing",
  },

  // === ГИБДД И VIN ===
  {
    id: "vin",
    title: "Проверка VIN",
    description:
      "Автоматическое определение комплектации по VIN. История обслуживания, пробег, ДТП из баз данных.",
    icon: <IconVIN />,
    connect: true,
    category: "auto",
  },
  {
    id: "gibdd",
    title: "База ГИБДД",
    description:
      "Проверка штрафов, ограничений, залогов и розыска по госномеру. Информирование клиентов о штрафах.",
    icon: <IconGIBDD />,
    connect: false,
    category: "auto",
  },

  // === ЛОЯЛЬНОСТЬ ===
  {
    id: "loyalty",
    title: "Программа лояльности",
    description:
      "Бонусные баллы за визиты и рекомендации. Накопительные скидки, дни рождения, реферальная программа.",
    icon: <IconLoyalty />,
    connect: true,
    category: "loyalty",
  },

  // === АВТОДИЛЕР / MAX ===
  {
    id: "max",
    title: "MAX (Автодилер)",
    description:
      "Полная автоматизация автосервиса: запись клиентов, заказ-наряды, склад, зарплата механиков, аналитика.",
    icon: <IconMAX />,
    connect: true,
    category: "autocrm",
  },
];

// Группировка по категориям
const categories = [
  { id: "accounting", name: "💼 Бухгалтерия и учёт", color: "text-yellow-600" },
  { id: "payments", name: "💳 Платежи и эквайринг", color: "text-green-600" },
  { id: "communication", name: "💬 Коммуникации", color: "text-blue-600" },
  { id: "parts", name: "🔧 Каталоги запчастей", color: "text-red-600" },
  { id: "maps", name: "📍 Карты и геосервисы", color: "text-orange-600" },
  { id: "booking", name: "📅 Онлайн-запись", color: "text-purple-600" },
  { id: "analytics", name: "📊 Аналитика", color: "text-cyan-600" },
  { id: "docs", name: "📄 Документооборот", color: "text-teal-600" },
  { id: "marketing", name: "📢 Маркетинг", color: "text-pink-600" },
  { id: "auto", name: "🚗 ГИБДД и VIN", color: "text-gray-600" },
  { id: "loyalty", name: "❤️ Лояльность", color: "text-rose-600" },
  { id: "autocrm", name: "🚘 Автодилер CRM", color: "text-slate-600" },
];

export default function Integrations() {
  return (
    <div>
      <PageMeta
        title="Интеграции | planeta.marketing"
        description="Подключите сервисы для полного контроля автобизнеса"
      />
      <IntegrationBreadcrumb pageTitle="Интеграции" />
      
      {/* Статистика подключений */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-2xl font-bold text-brand-500">{integrationData.filter(i => i.connect).length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Подключено</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{integrationData.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Всего доступно</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-2xl font-bold text-success-500">{categories.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Категорий</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-2xl font-bold text-warning-500">2025</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Актуально</p>
        </div>
      </div>

      {/* Рекомендуемые интеграции */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
          ⭐ Рекомендуем подключить в первую очередь
        </h3>
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-900/20">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">1С:Бухгалтерия</span>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">СБП</span>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">Telegram</span>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">Онлайн-касса</span>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">Яндекс Бизнес</span>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">Emex/Exist</span>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">MAX</span>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Эти интеграции покрывают 80% потребностей типичного автосервиса в России
          </p>
        </div>
      </div>

      {/* Все интеграции по категориям */}
      {categories.map((category) => {
        const categoryItems = integrationData.filter(i => i.category === category.id);
        if (categoryItems.length === 0) return null;
        
        return (
          <div key={category.id} className="mb-8">
            <h3 className={`mb-4 text-lg font-semibold ${category.color} dark:text-white/90`}>
              {category.name}
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {categoryItems.map((item) => (
                <IntegrationCard
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  description={item.description}
                  connect={item.connect}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

