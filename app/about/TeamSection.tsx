
'use client';

import { useState, useEffect } from 'react';

export default function TeamSection() {
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
      title: '認識我們的團隊',
      subtitle: '專業、熱忱、經驗豐富的團隊成員，是您成功活動的最佳保障',
      advantagesTitle: '我們的團隊優勢',
      advantage1Title: '多元化背景',
      advantage1Desc: '融合華人與菲律賓文化，提供最適切的服務',
      advantage2Title: '豐富經驗',
      advantage2Desc: '團隊平均擁有5年以上活動策劃經驗',
      advantage3Title: '用心服務',
      advantage3Desc: '以客戶滿意為最高目標，用心對待每個細節',
      specialtiesLabel: '專長領域：'
    },
    en: {
      title: 'Meet Our Team',
      subtitle: 'Professional, passionate, and experienced team members are your best guarantee for successful events',
      advantagesTitle: 'Our Team Advantages',
      advantage1Title: 'Diverse Background',
      advantage1Desc: 'Integrating Chinese and Filipino cultures to provide the most appropriate services',
      advantage2Title: 'Rich Experience',
      advantage2Desc: 'Team members average over 5 years of event planning experience',
      advantage3Title: 'Dedicated Service',
      advantage3Desc: 'Client satisfaction as the highest goal, caring for every detail',
      specialtiesLabel: 'Specialties:'
    }
  };

  const teamMembersData = {
    zh: [
      {
        name: 'Ｌ',
        position: '創辦人 & 執行總監',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/c72db96cef9cdc9c7c304d110685f7fa.png',
        description: '深耕菲律賓活動策劃領域5年，成功策劃500+場活動',
        specialties: ['策略規劃', '客戶關係', '品質控管']
      },
      {
        name: 'Narasha',
        position: '創意總監',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/0b5f639b4f30e1f5796de3536ef0f8d4.png',
        description: '擁有豐富的視覺設計與空間規劃經驗，讓每場活動都成為藝術品',
        specialties: ['視覺設計', '空間規劃', '創意發想']
      },
      {
        name: 'CC',
        position: '營運總監',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/ecfaf83c325b4c71739fa996c6a45cb3.png',
        description: '專精供應鏈管理與現場執行，確保每個環節完美銜接',
        specialties: ['供應鏈管理', '現場執行', '成本控制']
      },
      {
        name: 'Maria Santos',
        position: '在地協調專員',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/e10c1ae612dd32c4f88c2f2d6b852ca5.png',
        description: '菲律賓當地專家，熟悉在地文化與法規，是文化溝通的橋樑',
        specialties: ['在地協調', '文化溝通', '法規諮詢']
      },
      {
        name: 'kendall',
        position: '客戶服務總監',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/de47df52a5e7afdc6a2bed50a9f9bd45.png',
        description: '24小時待命的貼心客服，讓客戶感受到賓至如歸的服務體驗',
        specialties: ['客戶服務', '需求分析', '關係維護']
      },
      {
        name: 'Ｍin',
        position: '技術總監',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/ec7732805e0adbb773459343cfa80ae9.png',
        description: '音響燈光技術專家，為活動提供專業的技術支持與創新解決方案',
        specialties: ['音響燈光', '技術支援', '設備管理']
      }
    ],
    en: [
      {
        name: 'L',
        position: 'Founder & Executive Director',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/c72db96cef9cdc9c7c304d110685f7fa.png',
        description: '5 years deep in Philippines event planning, successfully planned 500+ events',
        specialties: ['Strategic Planning', 'Client Relations', 'Quality Control']
      },
      {
        name: 'CC',
        position: 'Creative Director',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/0b5f639b4f30e1f5796de3536ef0f8d4.png',
        description: 'Rich experience in visual design and spatial planning, making every event a work of art',
        specialties: ['Visual Design', 'Space Planning', 'Creative Ideation']
      },
      {
        name: 'JAY',
        position: 'Operations Director',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/ecfaf83c325b4c71739fa996c6a45cb3.png',
        description: 'Expert in supply chain management and on-site execution, ensuring perfect coordination in every aspect',
        specialties: ['Supply Chain Management', 'On-site Execution', 'Cost Control']
      },
      {
        name: 'Maria Santos',
        position: 'Local Coordination Specialist',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/e10c1ae612dd32c4f88c2f2d6b852ca5.png',
        description: 'Philippines local expert, familiar with local culture and regulations, serving as a cultural communication bridge',
        specialties: ['Local Coordination', 'Cultural Communication', 'Regulatory Consultation']
      },
      {
        name: 'kendall',
        position: 'Customer Service Director',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/de47df52a5e7afdc6a2bed50a9f9bd45.png',
        description: '24-hour standby caring customer service, making clients feel at home',
        specialties: ['Customer Service', 'Needs Analysis', 'Relationship Maintenance']
      },
      {
        name: 'Min',
        position: 'Technical Director',
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/ec7732805e0adbb773459343cfa80ae9.png',
        description: 'Audio-visual technical expert, providing professional technical support and innovative solutions for events',
        specialties: ['Audio & Lighting', 'Technical Support', 'Equipment Management']
      }
    ]
  };

  const t = translations[language as keyof typeof translations];
  const teamMembers = teamMembersData[language as keyof typeof teamMembersData];

  return (
    <section className="py-20 bg-white">
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
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group border border-gray-100"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-lime-600 font-semibold mb-4">
                  {member.position}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {member.description}
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">{t.specialtiesLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, specialtyIndex) => (
                      <span
                        key={specialtyIndex}
                        className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">
            {t.advantagesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 flex items-center justify-center bg-lime-400 rounded-2xl mx-auto mb-4">
                <i className="ri-team-line text-2xl text-slate-900"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">{t.advantage1Title}</h4>
              <p className="text-gray-300">{t.advantage1Desc}</p>
            </div>
            <div>
              <div className="w-16 h-16 flex items-center justify-center bg-lime-400 rounded-2xl mx-auto mb-4">
                <i className="ri-medal-line text-2xl text-slate-900"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">{t.advantage2Title}</h4>
              <p className="text-gray-300">{t.advantage2Desc}</p>
            </div>
            <div>
              <div className="w-16 h-16 flex items-center justify-center bg-lime-400 rounded-2xl mx-auto mb-4">
                <i className="ri-heart-line text-2xl text-slate-900"></i>
              </div>
              <h4 className="text-xl font-semibold mb-2">{t.advantage3Title}</h4>
              <p className="text-gray-300">{t.advantage3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
