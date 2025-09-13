
'use client';

import { useState, useEffect } from 'react';

export default function BrandIntroSection() {
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
      title: '您在菲律賓最可靠的',
      titleHighlight: '在地活動夥伴',
      description: '我們深知華語客戶在海外舉辦活動時面臨的挑戰：語言溝通障礙、對當地供應商不熟悉、擔心品質與預算控制。CL Events 專為解決這些痛點而生，憑藉深耕菲律賓多年的在地資源與專業的中文團隊，為您打造從策劃到執行的一站式活動解決方案。',
      brandMessage: '在地整合力 × 華語溝通力  您的完美活動體驗',
      subMessage: '我們不僅是活動策劃者，更是您在菲律賓的可信賴夥伴'
    },
    en: {
      title: 'Your Most Reliable',
      titleHighlight: 'Local Event Partner in the Philippines',
      description: 'We understand the challenges Chinese-speaking clients face when organizing events overseas: language barriers, unfamiliarity with local suppliers, and concerns about quality and budget control. CL Events was born to solve these pain points. With years of local resources in the Philippines and a professional Chinese-speaking team, we provide you with one-stop event solutions from planning to execution.',
      brandMessage: 'Local Integration × Chinese Communication = Your Perfect Event Experience',
      subMessage: 'We are not just event planners, but your trusted partner in the Philippines'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {t.title}
            <span className="text-lime-500">{t.titleHighlight}</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t.description}
          </p>
          
          <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-3xl font-bold text-lime-400 mb-4" style={{ fontFamily: 'Pacifico, serif' }}>
              {t.brandMessage}
            </div>
            <p className="text-gray-200">
              {t.subMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
