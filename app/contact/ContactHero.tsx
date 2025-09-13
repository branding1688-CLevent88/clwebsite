
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactHero() {
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
      title: '讓我們一起創造您的精彩活動',
      subtitle: '感謝您對 CL Events 的關注。請填寫下方的表單，或透過您最方便的方式與我們聯繫。我們期待能為您服務！',
      home: '首頁',
      about: '關於我們',
      services: '服務項目',
      portfolio: '成功案例',
      contact: '聯絡我們'
    },
    en: {
      title: 'Let\'s Create Your Amazing Event Together',
      subtitle: 'Thank you for your interest in CL Events. Please fill out the form below or contact us through your most convenient method. We look forward to serving you!',
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact'
    }
  };

  const t = translations[language as keyof typeof translations];

  const navigationLinks = [
    { href: '/', label: t.home, icon: 'ri-home-line' },
    { href: '/about', label: t.about, icon: 'ri-team-line' },
    { href: '/services', label: t.services, icon: 'ri-service-line' },
    { href: '/portfolio', label: t.portfolio, icon: 'ri-image-line' },
    { href: '/contact', label: t.contact, icon: 'ri-mail-line', active: true }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* 頁面導航 */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  link.active
                    ? 'bg-lime-400 text-slate-900 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <i className={`${link.icon} text-lg`}></i>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 標題內容 */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-lime-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
