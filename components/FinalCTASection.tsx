
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FinalCTASection() {
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);

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
      title: '準備好開始規劃',
      titleHighlight: '精彩活動',
      subtitle: '無論是企業慶典、浪漫婚禮還是私人派對，讓我們為您打造一場难忘的完美體驗',
      contactUs: '立即聯絡我們',
      telegramConsult: 'Telegram 即時諮詢',
      phone: '+63 966 946 0915',
      feature1Title: '24小時內回覆',
      feature1Desc: '快速響應您的需求',
      feature2Title: '品質保證',
      feature2Desc: '500+ 成功案例見證',
      feature3Title: '中文服務',
      feature3Desc: '溝通無障礙，合作更放心'
    },
    en: {
      title: 'Ready to Start Planning',
      titleHighlight: 'Your Amazing Event',
      subtitle: 'Whether it\'s corporate celebrations, romantic weddings, or private parties, let us create an unforgettable perfect experience for you',
      contactUs: 'Contact Us Now',
      telegramConsult: 'Telegram Instant Consultation',
      phone: '+63 966 946 0915',
      feature1Title: 'Reply Within 24 Hours',
      feature1Desc: 'Quick response to your needs',
      feature2Title: 'Quality Guaranteed',
      feature2Desc: '500+ successful cases testimony',
      feature3Title: 'Chinese Service',
      feature3Desc: 'No language barriers, worry-free cooperation'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
          {t.title}
          <br />
          {language === 'zh' ? '您的下一場' : ''}<span className="text-lime-400">{t.titleHighlight}</span>{language === 'zh' ? '了嗎？' : '?'}
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          {t.subtitle}
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8 mb-16">
          <Link
            href="/contact"
            className="bg-lime-400 hover:bg-lime-500 text-slate-900 px-10 py-4 rounded-full text-xl font-bold transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-xl"
          >
            <i className="ri-phone-line mr-3"></i>
            {t.contactUs}
          </Link>

          <a
            href="https://t.me/CLevent88"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-slate-900 px-10 py-4 rounded-full text-xl font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-telegram-line mr-3"></i>
            {t.telegramConsult}
          </a>

          <a
            href="tel:+639669460915"
            className="bg-transparent border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-slate-900 px-10 py-4 rounded-full text-xl font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-phone-line mr-3"></i>
            {t.phone}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-4">
              <i className="ri-time-line text-2xl text-lime-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feature1Title}</h3>
            <p className="text-gray-300">{t.feature1Desc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-4">
              <i className="ri-shield-check-line text-2xl text-lime-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feature2Title}</h3>
            <p className="text-gray-300">{t.feature2Desc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-4">
              <i className="ri-customer-service-2-line text-2xl text-lime-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">{t.feature3Title}</h3>
            <p className="text-gray-300">{t.feature3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
