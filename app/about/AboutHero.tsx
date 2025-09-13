
'use client';

import { useState, useEffect } from 'react';

export default function AboutHero() {
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
      title: '關於',
      titleHighlight: 'CL Events',
      subtitle: '深耕菲律賓在地資源，為華語客戶打造完美活動體驗',
      stat1: '成功案例',
      stat2: '深耕菲律賓',
      stat3: '客戶滿意度'
    },
    en: {
      title: 'About',
      titleHighlight: 'CL Events',
      subtitle: 'Deep-rooted local resources in the Philippines, creating perfect event experiences for Chinese-speaking clients',
      stat1: 'Success Cases',
      stat2: 'Years in Philippines',
      stat3: 'Client Satisfaction'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section 
      className="relative py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://readdy.ai/api/search-image?query=Professional%20diverse%20team%20of%20event%20planners%20working%20together%20in%20modern%20office%20space%20with%20event%20planning%20materials%20blueprints%20and%20creative%20workspace%20showing%20collaboration%20and%20expertise%20Philippines%20setting&width=1920&height=800&seq=about-hero&orientation=landscape')`
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          {t.title}<span className="text-lime-400">{t.titleHighlight}</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-lime-400 mb-2">500+</div>
            <div className="text-lg text-gray-200">{t.stat1}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-lime-400 mb-2">5{language === 'zh' ? '年' : ' Years'}</div>
            <div className="text-lg text-gray-200">{t.stat2}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-lime-400 mb-2">98%</div>
            <div className="text-lg text-gray-200">{t.stat3}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
