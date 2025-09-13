
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
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
      title: '核心服務項目',
      subtitle: '從創意發想到完美執行，我們提供全方位的活動策劃服務',
      button: '立即聯絡我們',
      learnMore: '了解更多',
      // 新增彈出視窗翻譯
      serviceContent: '服務內容',
      referencePrice: '參考價格',
      actualPriceNote: '*實際價格依具體需求調整',
      serviceSchedule: '服務時程',
      scheduleNote: '*可配合客戶時程調整',
      professionalConsultation: '專業諮詢',
      consultationDesc: '想了解更多關於"{title}"的詳細資訊？我們的專業顧問隨時為您服務！',
      telegramConsult: 'Telegram 即時諮詢',
      contactUs: '聯絡我們',
      serviceAdvantages: '服務優勢',
      advantages: [
        '專業團隊，豐富經驗',
        '中菲雙語，溝通無礙',
        '透明報價，品質保證',
        '24小時客服支援'
      ],
      contactMessage: '您好！我對"{title}"很感興趣，希望了解更多詳細資訊和報價。'
    },
    en: {
      title: 'Core Services',
      subtitle: 'From creative concepts to perfect execution, we provide comprehensive event planning services',
      button: 'Contact Us Now',
      learnMore: 'Learn More',
      // 新增彈出視窗翻譯
      serviceContent: 'Service Content',
      referencePrice: 'Reference Price',
      actualPriceNote: '*Actual prices adjusted based on specific requirements',
      serviceSchedule: 'Service Schedule',
      scheduleNote: '*Schedule can be adjusted to client requirements',
      professionalConsultation: 'Professional Consultation',
      consultationDesc: 'Want to learn more about "{title}"? Our professional consultants are ready to serve you!',
      telegramConsult: 'Telegram Instant Consultation',
      contactUs: 'Contact Us',
      serviceAdvantages: 'Service Advantages',
      advantages: [
        'Professional team, rich experience',
        'Chinese-Filipino bilingual, seamless communication',
        'Transparent pricing, quality guarantee',
        '24-hour customer support'
      ],
      contactMessage: 'Hello! I am interested in "{title}" and would like to learn more details and pricing.'
    }
  };

  const servicesData = {
    zh: [
      {
        icon: 'ri-lightbulb-line',
        title: '一站式活動策劃',
        description: '從無到有，打造專屬您的活動藍圖',
        details: '創意發想、主題設計、流程規劃、預算控制，讓您的想法變成完美現實',
        features: [
          '活動概念策劃與主題設計',
          '詳細流程規劃與時程安排',
          '預算評估與成本控制',
          '供應商篩選與協調管理',
          '風險評估與應急預案'
        ],
        pricing: '依活動規模而定，提供客製化報價',
        duration: '策劃期：2-8週',
        category: '策劃服務'
      },
      {
        icon: 'ri-calendar-event-line',
        title: '多樣化活動執行',
        description: '精準執行企業商務或私人慶典的每個細節',
        details: '開幕典禮、品牌發表、年會尾牙、婚禮派對，無論規模大小都能完美呈現',
        features: [
          '企業年會與尾牙活動',
          '產品發表會與記者會',
          '開幕典禮與慶祝活動',
          '婚禮慶典與私人派對',
          '商務會議與研討會'
        ],
        pricing: '10萬-200萬台幣',
        duration: '執行期：1-3天',
        category: '執行服務'
      },
      {
        icon: 'ri-links-line',
        title: '在地供應鏈整合',
        description: '為您嚴選廠商，把關品質與預算',
        details: '場地、餐飲、音響、攝影、交通，整合優質在地資源，確保性價比最優',
        features: [
          '精選場地推薦與預訂',
          '專業餐飲服務安排',
          '音響燈光設備租賃',
          '攝影錄影團隊配置',
          '交通接駁服務協調'
        ],
        pricing: '代訂服務費：總預算5-15%',
        duration: '協調期：1-4週',
        category: '資源整合'
      },
      {
        icon: 'ri-palette-line',
        title: '全方位視覺設計',
        description: '從主視覺到現場佈置，提升活動質感',
        details: '平面設計、空間佈置、燈光音響、多媒體製作，打造令人印象深刻的視覺體驗',
        features: [
          '活動主視覺與Logo設計',
          '邀請函與宣傳物料製作',
          '現場佈置與背板設計',
          '燈光音響效果規劃',
          '多媒體內容製作'
        ],
        pricing: '3萬-50萬台幣',
        duration: '設計期：1-4週',
        category: '設計服務'
      },
      {
        icon: 'ri-translate-2',
        title: '中菲雙語溝通',
        description: '確保現場流程順暢，賓主盡歡',
        details: '專業翻譯、司儀主持、現場協調，消除語言障礙，讓活動進行無縫接軌',
        features: [
          '專業中英菲三語翻譯',
          '雙語司儀主持服務',
          '現場協調與溝通',
          '文件資料翻譯',
          '跨文化活動指導'
        ],
        pricing: '日薪：8,000-20,000台幣',
        duration: '服務期：活動當日',
        category: '語言服務'
      },
      {
        icon: 'ri-customer-service-2-line',
        title: '24小時客服支援',
        description: '隨時待命，即時解決您的需求',
        details: 'Telegram、WhatsApp、微信多平台支援，確保溝通無時差無障礙',
        features: [
          '24/7 即時線上客服',
          'Telegram 快速回應',
          'WhatsApp 語音支援',
          '微信專業諮詢',
          '緊急狀況處理'
        ],
        pricing: '免費基礎支援',
        duration: '全年無休',
        category: '客戶服務'
      }
    ],
    en: [
      {
        icon: 'ri-lightbulb-line',
        title: 'Full-Service Event Planning',
        description: 'From scratch to reality, creating your exclusive event blueprint',
        details: 'Creative conceptualization, theme design, process planning, budget control - turning your ideas into perfect reality',
        features: [
          'Event concept planning and theme design',
          'Detailed process planning and scheduling',
          'Budget assessment and cost control',
          'Vendor selection and coordination management',
          'Risk assessment and contingency planning'
        ],
        pricing: 'Customized quotes based on event scale',
        duration: 'Planning period: 2-8 weeks',
        category: 'Planning Services'
      },
      {
        icon: 'ri-calendar-event-line',
        title: 'Diverse Event Execution',
        description: 'Precise execution of every detail for corporate or private celebrations',
        details: 'Opening ceremonies, brand launches, annual parties, weddings - perfect presentation regardless of scale',
        features: [
          'Corporate annual meetings and parties',
          'Product launches and press conferences',
          'Opening ceremonies and celebrations',
          'Wedding celebrations and private parties',
          'Business meetings and seminars'
        ],
        pricing: 'PHP 200,000 - 4,000,000',
        duration: 'Execution period: 1-3 days',
        category: 'Execution Services'
      },
      {
        icon: 'ri-links-line',
        title: 'Local Supply Chain Integration',
        description: 'Carefully selected vendors, quality and budget control',
        details: 'Venues, catering, audio, photography, transportation - integrating quality local resources for optimal value',
        features: [
          'Premium venue recommendations and bookings',
          'Professional catering service arrangements',
          'Audio and lighting equipment rental',
          'Photography and videography team setup',
          'Transportation and shuttle service coordination'
        ],
        pricing: 'Booking service fee: 5-15% of total budget',
        duration: 'Coordination period: 1-4 weeks',
        category: 'Resource Integration'
      },
      {
        icon: 'ri-palette-line',
        title: 'Comprehensive Visual Design',
        description: 'From key visuals to venue decoration, enhancing event quality',
        details: 'Graphic design, space decoration, lighting and audio, multimedia production - creating impressive visual experiences',
        features: [
          'Event key visual and logo design',
          'Invitation and promotional material production',
          'Venue decoration and backdrop design',
          'Lighting and audio effect planning',
          'Multimedia content production'
        ],
        pricing: 'PHP 60,000 - 1,000,000',
        duration: 'Design period: 1-4 weeks',
        category: 'Design Services'
      },
      {
        icon: 'ri-translate-2',
        title: 'Chinese-Filipino Bilingual Communication',
        description: 'Ensuring smooth event flow and guest satisfaction',
        details: 'Professional translation, MC hosting, on-site coordination - eliminating language barriers for seamless events',
        features: [
          'Professional Chinese-English-Filipino translation',
          'Bilingual MC hosting services',
          'On-site coordination and communication',
          'Document and material translation',
          'Cross-cultural event guidance'
        ],
        pricing: 'Daily rate: PHP 16,000 - 40,000',
        duration: 'Service period: Event day',
        category: 'Language Services'
      },
      {
        icon: 'ri-customer-service-2-line',
        title: '24/7 Customer Support',
        description: 'Always ready to solve your needs instantly',
        details: 'Telegram, WhatsApp, WeChat multi-platform support ensuring seamless communication',
        features: [
          '24/7 instant online customer service',
          'Telegram quick response',
          'WhatsApp voice support',
          'WeChat professional consultation',
          'Emergency situation handling'
        ],
        pricing: 'Free basic support',
        duration: 'Year-round service',
        category: 'Customer Service'
      }
    ]
  };

  const t = translations[language as keyof typeof translations];
  const services = servicesData[language as keyof typeof servicesData];

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
  };

  const handleContactService = (serviceTitle: string) => {
    const message = t.contactMessage.replace('{title}', serviceTitle);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/CLevent88?text=${encodedMessage}`, '_blank');
  };

  return (
    <div>
      <section id="services" className="py-20 bg-gray-50">
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
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service)}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-lime-100 rounded-2xl mb-6 group-hover:bg-slate-800 transition-colors">
                  <i className={`${service.icon} text-2xl text-lime-600 group-hover:text-lime-400`}></i>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-slate-800 transition-colors">
                  {service.title}
                </h3>

                <p className="text-lime-600 font-semibold mb-4 group-hover:text-lime-500 transition-colors">
                  {service.description}
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.details}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                  <div className="flex items-center text-lime-600 font-medium group-hover:text-slate-800 transition-colors">
                    <span className="text-sm mr-2">{t.learnMore}</span>
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/contact">
              <button className="bg-slate-800 text-lime-400 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-700 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-xl">
                <i className="ri-phone-line mr-3"></i>
                {t.button}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-lime-100 rounded-lg mr-4">
                    <i className={`${selectedService.icon} text-xl text-lime-600`}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedService.title}</h2>
                    <p className="text-lime-600 font-medium">{selectedService.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-check-double-line mr-2 text-lime-600"></i>
                      {t.serviceContent}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{selectedService.details}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                          <i className="ri-check-line text-lime-600 mr-3"></i>
                          <span className="text-gray-800 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <i className="ri-money-dollar-circle-line mr-2 text-blue-600"></i>
                        {t.referencePrice}
                      </h4>
                      <p className="text-blue-800 font-semibold text-lg">{selectedService.pricing}</p>
                      <p className="text-blue-600 text-sm mt-2">{t.actualPriceNote}</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <i className="ri-time-line mr-2 text-green-600"></i>
                        {t.serviceSchedule}
                      </h4>
                      <p className="text-green-800 font-semibold text-lg">{selectedService.duration}</p>
                      <p className="text-green-600 text-sm mt-2">{t.scheduleNote}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-2xl text-white">
                    <h4 className="text-lg font-bold mb-4 flex items-center">
                      <i className="ri-customer-service-2-line mr-2"></i>
                      {t.professionalConsultation}
                    </h4>
                    <p className="text-slate-200 mb-6 text-sm">
                      {t.consultationDesc.replace('{title}', selectedService.title)}
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={() => handleContactService(selectedService.title)}
                        className="w-full bg-lime-400 text-slate-900 px-4 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-telegram-line mr-2"></i>
                        {t.telegramConsult}
                      </button>
                      <Link href="/contact">
                        <button className="w-full bg-transparent border-2 border-lime-400 text-lime-400 px-4 py-3 rounded-lg font-semibold hover:bg-lime-400 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-phone-line mr-2"></i>
                          {t.contactUs}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <i className="ri-lightbulb-line mr-2 text-yellow-600"></i>
                      {t.serviceAdvantages}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {t.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-center">
                          <i
                            className={`${index === 0 ? 'ri-shield-check-line text-green-500' :
                              index === 1 ? 'ri-global-line text-blue-500' :
                                index === 2 ? 'ri-price-tag-3-line text-purple-500' :
                                  'ri-time-line text-orange-500'
                              } mr-2`}
                          ></i>
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}