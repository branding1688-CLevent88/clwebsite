
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [language, setLanguage] = useState('zh');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
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
      title: '準備開始您的完美活動了嗎？',
      subtitle: '立即聯繫我們，讓專業團隊為您量身打造難忘的活動體驗',
      button: '立即聯絡我們',
      telegramButton: 'Telegram 即時諮詢',
      phoneButton: '電話聯絡',
      home: '首頁',
      about: '關於我們',
      services: '服務項目',
      portfolio: '成功案例',
      contact: '聯絡我們',
      quickLinks: '快速連結',
      contactInfo: '聯絡資訊',
      followUs: '關注我們',
      copyright: '版權所有',
      allRightsReserved: '保留所有權利',
      phone: '電話',
      email: '電子郵件',
      address: '地址',
      businessHours: '營業時間',
      mondayFriday: '週一至週五 9:00-18:00',
      weekends: '週末 10:00-16:00'
    },
    en: {
      title: 'Ready to Start Your Perfect Event?',
      subtitle: 'Contact us now and let our professional team create an unforgettable event experience for you',
      button: 'Contact Us Now',
      telegramButton: 'Telegram Instant Chat',
      phoneButton: 'Phone Contact',
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Information',
      followUs: 'Follow Us',
      copyright: 'Copyright',
      allRightsReserved: 'All Rights Reserved',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      businessHours: 'Business Hours',
      mondayFriday: 'Monday-Friday 9:00-18:00',
      weekends: 'Weekends 10:00-16:00'
    }
  };

  const t = translations[language as keyof typeof translations];

  // Show loading state during hydration
  if (!isClient) {
    return (
      <>
        <section className="bg-slate-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="h-12 bg-slate-700 rounded mb-6 animate-pulse"></div>
            <div className="h-6 bg-slate-700 rounded mb-10 max-w-3xl mx-auto animate-pulse"></div>
            <div className="h-12 bg-slate-700 rounded-full w-40 mx-auto animate-pulse"></div>
          </div>
        </section>

        <footer className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-2">
                <div className="h-12 bg-slate-700 rounded mb-6 w-32 animate-pulse"></div>
                <div className="h-20 bg-slate-700 rounded mb-6 animate-pulse"></div>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 bg-slate-700 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-6 bg-slate-700 rounded mb-6 w-24 animate-pulse"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 bg-slate-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-6 bg-slate-700 rounded mb-6 w-32 animate-pulse"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-slate-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }

  return (
    <>
      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-lime-400 text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-lime-300 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-2xl"
            >
              <i className="ri-mail-line mr-3"></i>
              {t.button}
            </Link>
            <a
              href="https://t.me/CLevent88"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-400 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-2xl"
            >
              <i className="ri-telegram-line mr-3"></i>
              {t.telegramButton}
            </a>
            <a
              href="tel:+639669460915"
              className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-400 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-2xl"
            >
              <i className="ri-phone-line mr-3"></i>
              {t.phoneButton}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-6 cursor-pointer">
                <img
                  src="https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/31952d1c59d3e370fc4e2078c8ae56e3.png"
                  alt="CL Events Logo"
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                {language === 'zh'
                  ? '專業活動策劃團隊，致力於為每位客戶打造獨一無二的完美活動體驗。從創意發想到完美執行，讓每個特殊時刻都值得回味。'
                  : 'Professional event planning team dedicated to creating unique and perfect event experiences for every client. From creative concepts to flawless execution, making every special moment memorable.'
                }
              </p>
              <div className="flex space-x-4">
                <a href="https://t.me/CLevent88" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-lime-400 text-slate-900 rounded-full hover:bg-lime-300 transition-colors cursor-pointer">
                  <i className="ri-telegram-line text-xl"></i>
                </a>
                <a href="https://wa.me/639669460915" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-400 transition-colors cursor-pointer">
                  <i className="ri-whatsapp-line text-xl"></i>
                </a>
                <a href="https://laolaomamawu@gmail.com" className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors cursor-pointer">
                  <i className="ri-mail-line text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">{t.quickLinks}</h3>
              <div className="space-y-4">
                <Link href="/" className="block text-gray-400 hover:text-lime-400 transition-colors cursor-pointer">
                  {t.home}
                </Link>
                <Link href="/about" className="block text-gray-400 hover:text-lime-400 transition-colors cursor-pointer">
                  {t.about}
                </Link>
                <Link href="/services" className="block text-gray-400 hover:text-lime-400 transition-colors cursor-pointer">
                  {t.services}
                </Link>
                <Link href="/portfolio" className="block text-gray-400 hover:text-lime-400 transition-colors cursor-pointer">
                  {t.portfolio}
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-lime-400 transition-colors cursor-pointer">
                  {t.contact}
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">{t.contactInfo}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="ri-phone-line text-lime-400 mr-3 mt-1"></i>
                  <div>
                    <p className="text-gray-400 text-sm">{t.phone}</p>
                    <p className="text-white" suppressHydrationWarning={true}>+63 966 946 0915</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="ri-mail-line text-lime-400 mr-3 mt-1"></i>
                  <div>
                    <p className="text-gray-400 text-sm">{t.email}</p>
                    <p className="text-white" suppressHydrationWarning={true}>laolaomamawu@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="ri-map-pin-line text-lime-400 mr-3 mt-1"></i>
                  <div>
                    <p className="text-gray-400 text-sm">{t.address}</p>
                    <p className="text-white">
                      {language === 'zh'
                        ? 'BGC, Taguig City, Metro Manila, Philippines'
                        : 'BGC, Taguig City, Metro Manila, Philippines'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="ri-time-line text-lime-400 mr-3 mt-1"></i>
                  <div>
                    <p className="text-gray-400 text-sm">{t.businessHours}</p>
                    <p className="text-white text-sm">{t.mondayFriday}</p>
                    <p className="text-white text-sm">{t.weekends}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              2024 CL Events. {t.allRightsReserved}.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}