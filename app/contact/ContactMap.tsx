
'use client';

import { useState, useEffect } from 'react';

export default function ContactMap() {
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
      title: '我們的位置',
      businessHours: '營業時間',
      hours: '週一至週六 9:00-18:00'
    },
    en: {
      title: 'Our Location',
      businessHours: 'Business Hours',
      hours: 'Monday to Saturday 9:00-18:00'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 pb-0">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{t.title}</h3>
      </div>
      <div className="h-64">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2436!2d121.0244!3d14.5547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90312f0c957%3A0x3b5c9e6b8a5b1f2a!2sMakati%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2s!4v1629876543210!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{t.businessHours}</span>
          <span className="font-medium text-slate-800">{t.hours}</span>
        </div>
      </div>
    </div>
  );
}
