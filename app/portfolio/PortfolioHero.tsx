
'use client';

import { useState, useEffect } from 'react';

export default function PortfolioHero() {
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    // 從本地存儲獲取語言設置
    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);

    // 監聽語言變更事件
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const translations = {
    zh: {
      title: '我們引以為傲的成績',
      subtitle: '透過真實案例展示我們的執行能力、美學標準與為客戶帶來的卓越成果'
    },
    en: {
      title: 'Our Proudest Achievements',
      subtitle: 'Showcasing our execution capabilities, aesthetic standards, and outstanding results for clients through real cases'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
