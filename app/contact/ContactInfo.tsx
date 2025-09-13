
'use client';

import { useState, useEffect } from 'react';

export default function ContactInfo() {
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
      title: '其他聯絡方式',
      socialMedia: '社群媒體',
      companyInfo: '公司資訊'
    },
    en: {
      title: 'Other Contact Methods',
      socialMedia: 'Social Media',
      companyInfo: 'Company Information'
    }
  };

  const contactMethods = [
    {
      icon: 'ri-mail-line',
      label: 'Email',
      value: 'laolaomamawu@gmail.com',
      link: 'mailto:laolaomamawu@gmail.com'
    },
    {
      icon: 'ri-telegram-line',
      label: 'Telegram',
      value: '@CLevent88',
      link: 'https://t.me/CLEventsPH'
    },
    {
      icon: 'ri-phone-line',
      label: language === 'zh' ? '電話' : 'Phone',
      value: '+63 966 946 0915',
      link: 'tel:+639171234567'
    }
  ];

  const socialMedia = [
    {
      icon: 'ri-instagram-line',
      name: 'Instagram',
      link: 'https://instagram.com/clevents.ph',
      color: 'hover:bg-pink-500'
    },
    {
      icon: 'ri-xiaohongshu-line',
      name: language === 'zh' ? '小紅書' : 'XiaoHongShu',
      link: 'https://xiaohongshu.com/clevents',
      color: 'hover:bg-red-500'
    }
  ];

  const t = translations[language as keyof typeof translations];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6">{t.title}</h3>

      <div className="space-y-4 mb-8">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center group-hover:bg-lime-200 transition-colors">
              <i className={`${method.icon} text-lime-600`}></i>
            </div>
            <div>
              <div className="text-sm text-gray-500">{method.label}</div>
              <div className="font-medium text-slate-800">{method.value}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h4 className="font-semibold text-slate-800 mb-4">{t.socialMedia}</h4>
        <div className="flex space-x-3">
          {socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center transition-colors cursor-pointer hover:text-white ${social.color}`}
              title={social.name}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 mt-6">
        <h4 className="font-semibold text-slate-800 mb-3">{t.companyInfo}</h4>
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 flex items-center justify-center mt-0.5">
            <i className="ri-map-pin-line text-lime-600"></i>
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium text-slate-800 mb-1">CL Events Philippines</div>
            <div>Makati City, Metro Manila</div>
            <div>Philippines 1200</div>
          </div>
        </div>
      </div>
    </div>
  );
}
