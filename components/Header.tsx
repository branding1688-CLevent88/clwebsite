
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [language, setLanguage] = useState('zh');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 從本地存儲獲取語言設置
    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setIsLanguageDropdownOpen(false);
    // 觸發全域語言變更事件
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  const translations = {
    zh: {
      home: '首頁',
      about: '關於我們',
      services: '服務項目',
      portfolio: '成功案例',
      contact: '聯絡我們',
      quote: '立即聯絡'
    },
    en: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
      quote: 'Contact Now'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <>
      <header className="fixed w-full top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40">
        <nav className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center cursor-pointer"
            >
              {isMounted ? (
                <img 
                  src="https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/31952d1c59d3e370fc4e2078c8ae56e3.png" 
                  alt="CL Events Logo" 
                  className="h-10 w-auto"
                />
              ) : (
                <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
              )}
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-800 hover:text-lime-600 transition-colors font-medium">
                {t.home}
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-lime-600 transition-colors font-medium">
                {t.about}
              </Link>
              <Link href="/services" className="text-gray-800 hover:text-lime-600 transition-colors font-medium">
                {t.services}
              </Link>
              <Link href="/portfolio" className="text-gray-800 hover:text-lime-600 transition-colors font-medium">
                {t.portfolio}
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-lime-600 transition-colors font-medium">
                {t.contact}
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* 語言選擇器 */}
              <div className="relative">
                <button 
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-lime-500 transition-colors cursor-pointer"
                >
                  <i className="ri-global-line text-lg"></i>
                  <span className="text-sm font-medium">{language === 'zh' ? '中文' : 'EN'}</span>
                  <i className={`ri-arrow-down-s-line text-sm transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]">
                    <button
                      onClick={() => handleLanguageChange('zh')}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${language === 'zh' ? 'bg-lime-50 text-lime-600' : 'text-gray-700'}`}
                    >
                      <span className="text-lg">🇹🇼</span>
                      <span className="text-sm font-medium">繁體中文</span>
                      {language === 'zh' && <i className="ri-check-line text-lime-600 ml-auto"></i>}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 ${language === 'en' ? 'bg-lime-50 text-lime-600' : 'text-gray-700'}`}
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span className="text-sm font-medium">English</span>
                      {language === 'en' && <i className="ri-check-line text-lime-600 ml-auto"></i>}
                    </button>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                suppressHydrationWarning={true}
                className="bg-slate-800 text-lime-400 px-6 py-2 rounded-full hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap border border-lime-400"
              >
                {t.quote}
              </Link>
              <button 
                className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="ri-menu-line text-xl text-gray-800"></i>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4 text-center pt-4">
                <Link href="/" className="text-gray-800 hover:text-lime-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                  {t.home}
                </Link>
                <Link href="/about" className="text-gray-800 hover:text-lime-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                  {t.about}
                </Link>
                <Link href="/services" className="text-gray-800 hover:text-lime-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                  {t.services}
                </Link>
                <Link href="/portfolio" className="text-gray-800 hover:text-lime-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                  {t.portfolio}
                </Link>
                <Link href="/contact" className="text-gray-800 hover:text-lime-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                  {t.contact}
                </Link>
                
                {/* 手機版語言選擇 */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="text-sm font-medium text-gray-600 mb-3">Language / 語言</div>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleLanguageChange('zh')}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${language === 'zh' ? 'bg-lime-50 text-lime-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="text-lg">🇹🇼</span>
                      <span className="text-sm font-medium">繁體中文</span>
                      {language === 'zh' && <i className="ri-check-line text-lime-600 ml-auto"></i>}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${language === 'en' ? 'bg-lime-50 text-lime-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span className="text-sm font-medium">English</span>
                      {language === 'en' && <i className="ri-check-line text-lime-600 ml-auto"></i>}
                    </button>
                  </div>
                </div>

                <Link
                  href="/contact"
                  suppressHydrationWarning={true}
                  className="bg-slate-800 text-lime-400 px-6 py-2 rounded-full hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap w-fit border border-lime-400"
                >
                  {t.quote}
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}