
'use client';

import { useState, useEffect } from 'react';

export default function PhilosophySection() {
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
      title: '我們的理念與優勢',
      subtitle: '三大核心優勢，成就您在菲律賓的完美活動體驗',
      corePhilosophyTitle: '我們的核心理念',
      philosophy1: '「以客為尊，品質至上」',
      philosophy1Desc: '每一場活動都是客戶夢想的實現，我們用心對待每個細節。',
      philosophy2: '「專業整合，完美執行」',
      philosophy2Desc: '整合優質資源，提供一站式解決方案，讓客戶省心省力。',
      philosophy3: '「文化橋樑，信任夥伴」',
      philosophy3Desc: '成為華語客戶在菲律賓最可靠的活動策劃夥伴。',
      founderQuote: '— CL Events 創辦人'
    },
    en: {
      title: 'Our Philosophy & Advantages',
      subtitle: 'Three core advantages, creating perfect event experiences for you in the Philippines',
      corePhilosophyTitle: 'Our Core Philosophy',
      philosophy1: '"Client First, Quality Supreme"',
      philosophy1Desc: 'Every event is the realization of our clients\' dreams, we care for every detail with heart.',
      philosophy2: '"Professional Integration, Perfect Execution"',
      philosophy2Desc: 'Integrating quality resources, providing one-stop solutions, making it easy for clients.',
      philosophy3: '"Cultural Bridge, Trusted Partner"',
      philosophy3Desc: 'Becoming the most reliable event planning partner for Chinese-speaking clients in the Philippines.',
      founderQuote: '— CL Events Founder'
    }
  };

  const advantagesData = {
    zh: [
      {
        icon: 'ri-translate-2',
        title: '語言優勢',
        subtitle: '溝通無障礙',
        description: '中菲雙語團隊，確保每個細節都能精準傳達，讓您的想法完美實現。',
        features: ['專業中文客服', '即時翻譯服務', '文化差異調適', '24小時中文支援'],
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
        borderColor: 'border-blue-200'
      },
      {
        icon: 'ri-map-pin-line',
        title: '在地資源',
        subtitle: '深耕五年優勢',
        description: '整合菲律賓優質供應商網絡，為您精選最適合的場地、廠商與服務。',
        features: ['精選場地資源', '優質供應商網絡', '當地法規熟悉', '成本控制優化'],
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
        borderColor: 'border-green-200'
      },
      {
        icon: 'ri-shield-check-line',
        title: '專案控管',
        subtitle: '品質保證執行',
        description: '嚴格的專案管理流程，從策劃到執行全程把關，確保活動完美呈現。',
        features: ['專業專案管理', '品質控制標準', '風險預案準備', '現場即時調度'],
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
        borderColor: 'border-purple-200'
      }
    ],
    en: [
      {
        icon: 'ri-translate-2',
        title: 'Language Advantage',
        subtitle: 'Seamless Communication',
        description: 'Chinese-Filipino bilingual team ensures every detail is accurately conveyed, making your ideas perfectly realized.',
        features: ['Professional Chinese Customer Service', 'Real-time Translation Service', 'Cultural Adaptation', '24-hour Chinese Support'],
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
        borderColor: 'border-blue-200'
      },
      {
        icon: 'ri-map-pin-line',
        title: 'Local Resources',
        subtitle: '5-Year Deep Roots Advantage',
        description: 'Integrating Philippines quality supplier network, selecting the most suitable venues, vendors and services for you.',
        features: ['Premium Venue Resources', 'Quality Supplier Network', 'Local Regulation Familiarity', 'Cost Control Optimization'],
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
        borderColor: 'border-green-200'
      },
      {
        icon: 'ri-shield-check-line',
        title: 'Project Management',
        subtitle: 'Quality Assured Execution',
        description: 'Strict project management process, comprehensive oversight from planning to execution, ensuring perfect event presentation.',
        features: ['Professional Project Management', 'Quality Control Standards', 'Risk Contingency Planning', 'On-site Real-time Coordination'],
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
        borderColor: 'border-purple-200'
      }
    ]
  };

  const t = translations[language as keyof typeof translations];
  const advantages = advantagesData[language as keyof typeof advantagesData];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className={`${advantage.bgColor} ${advantage.borderColor} border-2 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="text-center mb-8">
                <div className={`w-20 h-20 flex items-center justify-center bg-white rounded-2xl mx-auto mb-6 shadow-lg`}>
                  <i className={`${advantage.icon} text-3xl ${advantage.iconColor}`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-lime-600 font-semibold text-lg">
                  {advantage.subtitle}
                </p>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {advantage.description}
              </p>
              
              <ul className="space-y-3">
                {advantage.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {t.corePhilosophyTitle}
            </h3>
            <div className="text-xl text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong className="text-slate-800">{t.philosophy1}</strong> — 
                {t.philosophy1Desc}
              </p>
              <p>
                <strong className="text-slate-800">{t.philosophy2}</strong> — 
                {t.philosophy2Desc}
              </p>
              <p>
                <strong className="text-slate-800">{t.philosophy3}</strong> — 
                {t.philosophy3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
