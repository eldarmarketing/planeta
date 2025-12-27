import { useState, useEffect } from "react";

export default function SidebarWidget() {
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAI((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    "Полный исходный код",
    "Неограниченные проекты",
    "Пожизненные обновления",
    "Премиум поддержка",
  ];

  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950`}
    >
      {/* Guarantee Badge */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-xs font-semibold text-white">Гарантия возврата 14 дней</span>
        </div>
      </div>

      <div className="px-4 py-5">
        {/* Interactive AI Comparison */}
        <div 
          className="mb-4 cursor-pointer rounded-xl bg-slate-800/50 p-3 transition-all duration-500"
          onClick={() => setShowAI(!showAI)}
        >
          <div className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-slate-500">
            {showAI ? "Теперь" : "Раньше"}
          </div>
          
          <div className="relative h-16 overflow-hidden">
            {/* Old Way - Employee */}
            <div 
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                showAI ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0088cc]/20">
                  <svg className="h-4 w-4 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
              </div>
              <span className="text-xs text-rose-400">Сотрудник в Telegram</span>
              <span className="text-[10px] text-slate-500">~5 мин на диагностику</span>
            </div>

            {/* New Way - AI */}
            <div 
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                showAI ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-emerald-400">ИИ-ассистент</span>
              <span className="text-[10px] text-slate-500">Мгновенно по фото</span>
            </div>
          </div>

          {/* Toggle indicator */}
          <div className="mt-2 flex justify-center gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${!showAI ? 'bg-rose-400 w-3' : 'bg-slate-600'}`} />
            <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${showAI ? 'bg-emerald-400 w-3' : 'bg-slate-600'}`} />
          </div>
        </div>

        {/* Social Proof */}
        <div className="mb-4 flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-slate-400">47 отзывов</span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-center font-bold text-white">
          Полная лицензия для бизнеса
        </h3>

        {/* Price */}
        <div className="mb-1 text-center">
          <span className="text-sm text-slate-500 line-through">180 000 ₽</span>
        </div>
        <div className="mb-2 flex items-baseline justify-center gap-2">
          <span className="text-3xl font-extrabold text-white">120 000</span>
          <span className="text-lg font-medium text-slate-400">₽</span>
        </div>

        {/* Badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Единоразовый платёж
          </span>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Features */}
        <ul className="mb-5 space-y-2.5">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
              <svg className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="https://t.me/eldar.marketing"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/30"
        >
          <span className="relative z-10">Получить сейчас</span>
          <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>

        {/* Trust Indicators */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Безопасно</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Мгновенно</span>
          </div>
        </div>
      </div>
    </div>
  );
}
