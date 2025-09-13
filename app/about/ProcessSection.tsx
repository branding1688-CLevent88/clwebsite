
'use client';

import { useState, useEffect } from 'react';

export default function ProcessSection() {
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
      title: '我們的合作流程',
      subtitle: '標準化的六步驟流程，確保每個環節都精準到位',
      whyChooseTitle: '為什麼選擇我們的服務流程？',
      transparency: '透明化',
      transparencyDesc: '每個環節都清楚說明，讓您安心放心',
      efficiency: '高效率',
      efficiencyDesc: '標準化流程，縮短溝通時間',
      professionalism: '專業化',
      professionalismDesc: '專業團隊全程跟進，品質有保障',
      customization: '客製化',
      customizationDesc: '根據需求靈活調整，滿足個別要求'
    },
    en: {
      title: 'Our Collaboration Process',
      subtitle: 'Standardized six-step process ensuring precision in every phase',
      whyChooseTitle: 'Why Choose Our Service Process?',
      transparency: 'Transparency',
      transparencyDesc: 'Every phase clearly explained for your peace of mind',
      efficiency: 'High Efficiency',
      efficiencyDesc: 'Standardized process, reduced communication time',
      professionalism: 'Professional',
      professionalismDesc: 'Professional team follow-up throughout, quality guaranteed',
      customization: 'Customization',
      customizationDesc: 'Flexible adjustments based on needs, meeting individual requirements'
    }
  };

  const processStepsData = {
    zh: [
      {
        step: '01',
        title: '初步諮詢',
        subtitle: 'Initial Consultation',
        description: '深入了解您的需求、預算與期望，提供專業建議與初步構想',
        icon: 'ri-chat-3-line',
        details: ['需求分析', '預算評估', '可行性討論', '初步建議']
      },
      {
        step: '02',
        title: '方案報價',
        subtitle: 'Proposal & Quote',
        description: '根據需求制定詳細方案，提供透明化報價與時程規劃',
        icon: 'ri-file-text-line',
        details: ['詳細方案', '透明報價', '時程安排', '風險評估']
      },
      {
        step: '03',
        title: '簽訂合約',
        subtitle: 'Contract Signing',
        description: '確認合作細節，簽署正式合約，建立雙方權益保障',
        icon: 'ri-contract-line',
        details: ['合約確認', '付款條件', '責任劃分', '變更條款']
      },
      {
        step: '04',
        title: '策劃與設計',
        subtitle: 'Planning & Design',
        description: '進入執行階段，進行詳細策劃、設計規劃與供應商協調',
        icon: 'ri-pencil-ruler-2-line',
        details: ['創意發想', '視覺設計', '供應商選擇', '細節規劃']
      },
      {
        step: '05',
        title: '活動執行',
        subtitle: 'Event Execution',
        description: '現場專業執行，即時問題處理，確保活動順利進行',
        icon: 'ri-play-circle-line',
        details: ['現場佈置', '流程控制', '即時調度', '品質把關']
      },
      {
        step: '06',
        title: '結案報告',
        subtitle: 'Post-Event Report',
        description: '活動結束後提供完整報告，包含成果分析與後續建議',
        icon: 'ri-bar-chart-box-line',
        details: ['成果報告', '數據分析', '客戶反饋', '改善建議']
      }
    ],
    en: [
      {
        step: '01',
        title: 'Initial Consultation',
        subtitle: 'Consultation Phase',
        description: 'Deep understanding of your needs, budget and expectations, providing professional advice and initial concepts',
        icon: 'ri-chat-3-line',
        details: ['Needs Analysis', 'Budget Assessment', 'Feasibility Discussion', 'Initial Recommendations']
      },
      {
        step: '02',
        title: 'Proposal & Quote',
        subtitle: 'Planning Phase',
        description: 'Develop detailed proposals based on requirements, providing transparent quotes and timeline planning',
        icon: 'ri-file-text-line',
        details: ['Detailed Proposal', 'Transparent Pricing', 'Timeline Arrangement', 'Risk Assessment']
      },
      {
        step: '03',
        title: 'Contract Signing',
        subtitle: 'Agreement Phase',
        description: 'Confirm collaboration details, sign formal contract, establish mutual benefit protection',
        icon: 'ri-contract-line',
        details: ['Contract Confirmation', 'Payment Terms', 'Responsibility Division', 'Change Clauses']
      },
      {
        step: '04',
        title: 'Planning & Design',
        subtitle: 'Design Phase',
        description: 'Enter execution phase, conduct detailed planning, design planning and vendor coordination',
        icon: 'ri-pencil-ruler-2-line',
        details: ['Creative Ideation', 'Visual Design', 'Vendor Selection', 'Detail Planning']
      },
      {
        step: '05',
        title: 'Event Execution',
        subtitle: 'Execution Phase',
        description: 'Professional on-site execution, real-time problem handling, ensuring smooth event progress',
        icon: 'ri-play-circle-line',
        details: ['Venue Setup', 'Process Control', 'Real-time Coordination', 'Quality Control']
      },
      {
        step: '06',
        title: 'Post-Event Report',
        subtitle: 'Completion Phase',
        description: 'Provide comprehensive report after event completion, including result analysis and follow-up recommendations',
        icon: 'ri-bar-chart-box-line',
        details: ['Result Report', 'Data Analysis', 'Client Feedback', 'Improvement Suggestions']
      }
    ]
  };

  const t = translations[language as keyof typeof translations];
  const processSteps = processStepsData[language as keyof typeof processStepsData];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((process, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-lime-400/10 rounded-bl-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-6xl font-bold text-lime-400/20">
                    {process.step}
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-2xl group-hover:bg-lime-400 transition-colors">
                    <i className={`${process.icon} text-xl text-lime-400 group-hover:text-slate-900`}></i>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-lime-600 font-medium mb-4">
                  {process.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {process.description}
                </p>
                
                <ul className="space-y-2">
                  {process.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-lime-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <div className="w-8 h-8 flex items-center justify-center bg-lime-400 rounded-full">
                    <i className="ri-arrow-right-line text-slate-900"></i>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">
              {t.whyChooseTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="w-16 h-16 flex items-center justify-center bg-lime-400 rounded-2xl mx-auto mb-4">
                  <i className="ri-shield-check-line text-2xl text-slate-900"></i>
                </div>
                <h4 className="text-lg font-semibold mb-2">{t.transparency}</h4>
                <p className="text-gray-300 text-sm">{t.transparencyDesc}</p>
              </div>
              <div>
                <div className="w-16 h-16 flex items-center justify-center bg-lime-400 rounded-2xl mx-auto mb-4">
                  <i className="ri-time-line text-2xl text-slate-900"></i>
                </div>
                <h4 className="text-lg font-semibold mb-2">{t.efficiency}</h4>
                <p className="text-gray-300 text-sm">{t.efficiencyDesc}</p>
              </div>
              <div>
                <div className="w-16 h-16 flex items-center justify-center bg-lime-400 rounded-2xl mx-auto mb-4">
                  <i className="ri-customer-service-2-line text-2xl text-slate-900"></i>
                </div>
                <h4 className="text-lg font-semibold mb-2">{t.professionalism}</h4>
                <p className="text-gray-300 text-sm">{t.professionalismDesc}</p>
              </div>
              <div>
                <div className="w-16 h-16 flex items-center justify-center bg-lime-400 rounded-2xl mx-auto mb-4">
                  <i className="ri-heart-line text-2xl text-slate-900"></i>
                </div>
                <h4 className="text-lg font-semibold mb-2">{t.customization}</h4>
                <p className="text-gray-300 text-sm">{t.customizationDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
