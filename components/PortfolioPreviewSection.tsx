
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuoteModal from './QuoteModal';

export default function PortfolioPreviewSection() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);

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
      title: '我們的實戰作品',
      subtitle: '每一場活動都是我們專業實力的展現，見證客戶夢想成真的美好時刻',
      viewMore: '查看更多案例',
      clickToView: '點擊查看詳細案例',
      interestedIn: '對這個案例感興趣？',
      wantToKnow: '想了解更多關於「%s」類似活動的策劃細節與服務內容嗎？',
      viewFullCase: '查看完整案例',
      telegramConsult: 'Telegram 即時諮詢',
      getSimilarQuote: '申請類似活動報價',
      relatedAdvantages: '相關服務優勢',
      richExperience: '豐富%s經驗',
      bilingualTeam: '中菲雙語專業團隊',
      transparentPricing: '透明報價品質保證',
      support247: '24小時客服支援',
      projectInfo: '專案資訊',
      client: '客戶',
      eventDate: '活動日期',
      venue: '活動場地',
      guests: '參與人數',
      budgetRange: '預算範圍',
      duration: '活動時長',
      challenges: '客戶面臨的挑戰',
      solution: '我們的解決方案',
      services: '提供的服務',
      highlights: '成果亮點',
      customerService: '專業諮詢'
    },
    en: {
      title: 'Our Portfolio',
      subtitle: 'Every event showcases our professional excellence, witnessing beautiful moments when client dreams come true',
      viewMore: 'View More Cases',
      clickToView: 'Click to view detailed case',
      interestedIn: 'Interested in this case?',
      wantToKnow: 'Want to know more about similar events like "%s" planning details and service content?',
      viewFullCase: 'View Full Case',
      telegramConsult: 'Telegram Instant Consultation',
      getSimilarQuote: 'Get Similar Event Quote',
      relatedAdvantages: 'Related Service Advantages',
      richExperience: 'Rich %s Experience',
      bilingualTeam: 'Chinese-Filipino Professional Team',
      transparentPricing: 'Transparent Pricing Quality Guarantee',
      support247: '24/7 Customer Support',
      projectInfo: 'Project Information',
      client: 'Client',
      eventDate: 'Event Date',
      venue: 'Venue',
      guests: 'Guests',
      budgetRange: 'Budget Range',
      duration: 'Duration',
      challenges: 'Client Challenges',
      solution: 'Our Solution',
      services: 'Services Provided',
      highlights: 'Result Highlights',
      customerService: 'Professional Consultation'
    }
  };

  const portfolioData = {
    zh: [
      {
        id: 1,
        title: 'XYZ科技開幕典禮',
        category: '企業活動',
        image: 'https://readdy.ai/api/search-image?query=Modern%20corporate%20grand%20opening%20ceremony%20with%20elegant%20stage%20setup%20business%20executives%20ribbon%20cutting%20professional%20lighting%20in%20luxury%20venue%20with%20company%20branding%20and%20flowers%20decorations%20in%20Philippines%20setting&width=600&height=400&seq=portfolio1&orientation=landscape',
        description: '200人規模的科技公司開幕慶典',
        services: ['整體策劃', '視覺設計', '媒體公關', '現場執行'],
        highlights: ['200+位業界精英出席', '15家媒體現場報導', '完美開幕儀式執行', '企業品牌形象大幅提升'],
        details: {
          client: 'XYZ科技股份有限公司',
          eventDate: '2024年3月15日',
          venue: '馬尼拉國際會議中心',
          guests: '200人',
          budget: '50-100萬台幣',
          duration: '1天',
          challenge: 'XYZ科技作為新進入菲律賓市場的科技公司，需要透過盛大的開幕典禮建立品牌知名度，吸引當地政商界關注，並展現公司的專業實力與發展潛力。',
          solution: '我們為XYZ科技量身打造了一場專業而隆重的開幕典禮，結合現代科技元素與在地文化特色，成功建立了公司在菲律賓市場的專業形象。'
        }
      },
      {
        id: 2,
        title: '長灘島海島婚禮',
        category: '婚禮策劃',
        image: 'https://readdy.ai/api/search-image?query=Romantic%20beach%20wedding%20ceremony%20at%20Boracay%20with%20white%20decorations%20flower%20arch%20sunset%20ocean%20view%20elegant%20setup%20with%20chairs%20and%20aisle%20tropical%20paradise%20wedding%20venue%20Philippines&width=600&height=400&seq=portfolio2&orientation=landscape',
        description: '夢幻海景婚禮，浪漫至極的完美典禮',
        services: ['婚禮策劃', '現場佈置', '攝影攝像', '賓客接待'],
        highlights: ['80位國際賓客', '完美日落時刻儀式', '800+張精美婚照', '終生難忘浪漫體驗'],
        details: {
          client: 'Michael & Sarah',
          eventDate: '2024年2月14日',
          venue: '長灘島白沙灘度假村',
          guests: '80人',
          budget: '100-200萬台幣',
          duration: '3天2夜',
          challenge: '新人希望在長灘島舉辦完美海島婚禮，需要協調國際賓客的住宿交通，並在熱帶氣候下確保婚禮順利進行，創造終生難忘的浪漫體驗。',
          solution: '我們精心選擇了長灘島最美的海灘位置，安排在完美的日落時刻舉行儀式，設計了白色奢華主題佈置與自然海景完美融合，為新人打造了夢幻般的海島婚禮。'
        }
      },
      {
        id: 3,
        title: 'ABC集團年會慶典',
        category: '企業活動',
        image: 'https://readdy.ai/api/search-image?query=Luxury%20corporate%20annual%20gala%20dinner%20with%20elegant%20ballroom%20setup%20round%20tables%20beautiful%20centerpieces%20stage%20lighting%20formal%20business%20celebration%20in%20five%20star%20hotel%20Philippines&width=600&height=400&seq=portfolio3&orientation=landscape',
        description: '300人企業年會，盛大而優雅的慶祝活動',
        services: ['慶典策劃', '晚宴設計', '娛樂節目', '獎項典禮'],
        highlights: ['300+位員工與貴賓', '50+位優秀員工表揚', '企業發展歷程展示', '團隊凝聚力大幅提升'],
        details: {
          client: 'ABC集團',
          eventDate: '2024年1月20日',
          venue: '馬尼拉五星級酒店',
          guests: '300人',
          budget: '100-150萬台幣',
          duration: '1晚',
          challenge: 'ABC集團年會需要展現企業成就與未來願景，在大規模的正式晚宴中平衡莊重與歡慶氛圍，強化員工向心力與品牌形象。',
          solution: '我們為ABC集團打造了一場既莊重又溫馨的年會慶典，透過企業發展歷程展示、傑出員工表揚典禮及精彩娛樂節目，成功提升了團隊凝聚力。'
        }
      },
      {
        id: 4,
        title: 'DEF產品發表會',
        category: '商務會議',
        image: 'https://readdy.ai/api/search-image?query=Modern%20product%20launch%20event%20with%20sleek%20stage%20design%20LED%20screens%20product%20display%20professional%20lighting%20business%20audience%20contemporary%20venue%20corporate%20branding%20in%20Manila%20Philippines&width=600&height=400&seq=portfolio4&orientation=landscape',
        description: '創新產品發表，媒體與客戶齊聚盛會',
        services: ['媒體策劃', '產品展示', '記者會執行', '公關服務'],
        highlights: ['50+家媒體出席', '3倍品牌知名度提升', '25+家投資機構關注', '200%網站流量增長'],
        details: {
          client: 'DEF創新科技',
          eventDate: '2024年4月10日',
          venue: '馬尼拉科技園區會議中心',
          guests: '150人',
          budget: '30-50萬台幣',
          duration: '半天',
          challenge: 'DEF創新科技需要在有限預算下成功發表新產品，吸引媒體關注並建立品牌知名度，同時獲得投資機構與潛在客戶的認可。',
          solution: '我們設計了現代簡約的發表會場突出產品創新特色，邀請重點科技媒體與業界意見領袖，並安排互動產品體驗區，成功為客戶建立了市場聲量。'
        }
      }
    ],
    en: [
      {
        id: 1,
        title: 'XYZ Tech Grand Opening',
        category: 'Corporate Events',
        image: 'https://readdy.ai/api/search-image?query=Modern%20corporate%20grand%20opening%20ceremony%20with%20elegant%20stage%20setup%20business%20executives%20ribbon%20cutting%20professional%20lighting%20in%20luxury%20venue%20with%20company%20branding%20and%20flowers%20decorations%20in%20Philippines%20setting&width=600&height=400&seq=portfolio1&orientation=landscape',
        description: '200-person scale tech company opening celebration',
        services: ['Overall Planning', 'Visual Design', 'Media PR', 'On-site Execution'],
        highlights: ['200+ industry elites attended', '15 media outlets covered', 'Perfect opening ceremony execution', 'Significant corporate brand image enhancement'],
        details: {
          client: 'XYZ Technology Corporation',
          eventDate: 'March 15, 2024',
          venue: 'Manila International Convention Center',
          guests: '200 people',
          budget: 'PHP 1,000,000 - 2,000,000',
          duration: '1 day',
          challenge: 'As a tech company newly entering the Philippine market, XYZ Technology needed to establish brand awareness through a grand opening ceremony, attract attention from local political and business circles, and demonstrate the company\'s professional strength and development potential.',
          solution: 'We created a professional and grand opening ceremony for XYZ Technology, combining modern tech elements with local cultural features, successfully establishing the company\'s professional image in the Philippine market.'
        }
      },
      {
        id: 2,
        title: 'Boracay Island Wedding',
        category: 'Wedding Planning',
        image: 'https://readdy.ai/api/search-image?query=Romantic%20beach%20wedding%20ceremony%20at%20Boracay%20with%20white%20decorations%20flower%20arch%20sunset%20ocean%20view%20elegant%20setup%20with%20chairs%20and%20aisle%20tropical%20paradise%20wedding%20venue%20Philippines&width=600&height=400&seq=portfolio2&orientation=landscape',
        description: 'Dream beach wedding, romantically perfect ceremony',
        services: ['Wedding Planning', 'Venue Decoration', 'Photography & Videography', 'Guest Reception'],
        highlights: ['80 international guests', 'Perfect sunset ceremony', '800+ beautiful wedding photos', 'Unforgettable romantic experience'],
        details: {
          client: 'Michael & Sarah',
          eventDate: 'February 14, 2024',
          venue: 'Boracay White Beach Resort',
          guests: '80 people',
          budget: 'PHP 2,000,000 - 4,000,000',
          duration: '3 days 2 nights',
          challenge: 'The couple wanted to hold a perfect island wedding in Boracay, needing to coordinate international guests\' accommodation and transportation, ensure the wedding runs smoothly in tropical climate, and create an unforgettable romantic experience.',
          solution: 'We carefully selected the most beautiful beach location in Boracay, arranged the ceremony at perfect sunset time, designed white luxury themed decorations that perfectly merged with natural seascape, creating a dream island wedding for the couple.'
        }
      },
      {
        id: 3,
        title: 'ABC Group Annual Gala',
        category: 'Corporate Events',
        image: 'https://readdy.ai/api/search-image?query=Luxury%20corporate%20annual%20gala%20dinner%20with%20elegant%20ballroom%20setup%20round%20tables%20beautiful%20centerpieces%20stage%20lighting%20formal%20business%20celebration%20in%20five%20star%20hotel%20Philippines&width=600&height=400&seq=portfolio3&orientation=landscape',
        description: '300-person corporate annual meeting, grand and elegant celebration',
        services: ['Gala Planning', 'Dinner Design', 'Entertainment Program', 'Award Ceremony'],
        highlights: ['300+ employees and VIPs', '50+ outstanding employees recognized', 'Corporate development showcase', 'Significantly enhanced team cohesion'],
        details: {
          client: 'ABC Group',
          eventDate: 'January 20, 2024',
          venue: 'Manila Five-Star Hotel',
          guests: '300 people',
          budget: 'PHP 2,000,000 - 3,000,000',
          duration: '1 evening',
          challenge: 'ABC Group\'s annual meeting needed to showcase corporate achievements and future vision, balance solemnity and celebration atmosphere in a large-scale formal dinner, and strengthen employee cohesion and brand image.',
          solution: 'We created a solemn yet warm annual celebration for ABC Group, successfully enhancing team cohesion through corporate development showcase, outstanding employee recognition ceremony, and exciting entertainment programs.'
        }
      },
      {
        id: 4,
        title: 'DEF Product Launch',
        category: 'Business Conference',
        image: 'https://readdy.ai/api/search-image?query=Modern%20product%20launch%20event%20with%20sleek%20stage%20design%20LED%20screens%20product%20display%20professional%20lighting%20business%20audience%20contemporary%20venue%20corporate%20branding%20in%20Manila%20Philippines&width=600&height=400&seq=portfolio4&orientation=landscape',
        description: 'Innovative product launch, media and clients gathering',
        services: ['Media Planning', 'Product Display', 'Press Conference', 'PR Services'],
        highlights: ['50+ media outlets attended', '3x brand awareness increase', '25+ investment institutions interested', '200% website traffic growth'],
        details: {
          client: 'DEF Innovation Technology',
          eventDate: 'April 10, 2024',
          venue: 'Manila Tech Park Conference Center',
          guests: '150 people',
          budget: 'PHP 600,000 - 1,000,000',
          duration: 'Half day',
          challenge: 'DEF Innovation Technology needed to successfully launch new products within limited budget, attract media attention and establish brand awareness, while gaining recognition from investment institutions and potential clients.',
          solution: 'We designed a modern minimalist launch venue highlighting product innovation features, invited key tech media and industry opinion leaders, and arranged interactive product experience areas, successfully building market presence for the client.'
        }
      }
    ]
  };

  const t = translations[language as keyof typeof translations];
  const portfolioItems = portfolioData[language as keyof typeof portfolioData];

  const handlePortfolioClick = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setShowContactModal(true);
  };

  const handleGetQuote = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setShowContactModal(false);
    window.location.href = '/contact';
  };

  const handleContactService = (portfolio) => {
    const message = language === 'zh'
      ? `您好！我對「${portfolio.title}」的活動策劃很感興趣，希望了解類似活動的詳細服務內容和報價。`
      : `Hello! I'm very interested in the event planning for "${portfolio.title}" and would like to learn more about detailed service content and quotes for similar events.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/CLevent88?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePortfolioClick(item)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="inline-block bg-lime-500 text-slate-900 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {item.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-200 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.services.slice(0, 2).map((service, serviceIndex) => (
                        <span key={serviceIndex} className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs">
                          {service}
                        </span>
                      ))}
                      {item.services.length > 2 && (
                        <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs">
                          +{item.services.length - 2}{language === 'zh' ? '項服務' : ' Services'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lime-400 font-medium text-sm">
                        {t.clickToView}
                      </span>
                      <i className="ri-arrow-right-up-line text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-lime-400 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap border border-lime-400"
            >
              {t.viewMore}
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* 案例詳情彈窗 */}
      {showContactModal && selectedPortfolio && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-lime-100 rounded-lg mr-4">
                    <i className="ri-trophy-line text-xl text-lime-600"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPortfolio.title}</h2>
                    <p className="text-lime-600 font-medium">{selectedPortfolio.category} • {selectedPortfolio.details.client}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* 案例圖片 */}
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                    <img
                      src={selectedPortfolio.image}
                      alt={selectedPortfolio.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* 專案資訊 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-information-line mr-2 text-lime-600"></i>
                      {t.projectInfo}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">{t.client}</h4>
                        <p className="text-gray-600 text-sm">{selectedPortfolio.details.client}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">{t.eventDate}</h4>
                        <p className="text-gray-600 text-sm">{selectedPortfolio.details.eventDate}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">{t.venue}</h4>
                        <p className="text-gray-600 text-sm">{selectedPortfolio.details.venue}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">{t.guests}</h4>
                        <p className="text-gray-600 text-sm">{selectedPortfolio.details.guests}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">{t.budgetRange}</h4>
                        <p className="text-gray-600 text-sm">{selectedPortfolio.details.budget}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">{t.duration}</h4>
                        <p className="text-gray-600 text-sm">{selectedPortfolio.details.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* 客戶挑戰 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-question-line mr-2 text-orange-600"></i>
                      {t.challenges}
                    </h3>
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{selectedPortfolio.details.challenge}</p>
                    </div>
                  </div>

                  {/* 解決方案 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-lightbulb-line mr-2 text-blue-600"></i>
                      {t.solution}
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{selectedPortfolio.details.solution}</p>
                    </div>
                  </div>

                  {/* 服務項目 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-service-line mr-2 text-purple-600"></i>
                      {t.services}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedPortfolio.services.map((service, index) => (
                        <div key={index} className="flex items-center bg-purple-50 p-3 rounded-lg">
                          <i className="ri-check-line text-purple-600 mr-3"></i>
                          <span className="text-gray-800 text-sm font-medium">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 成果亮點 */}
                  <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-award-line mr-2 text-green-600"></i>
                      {t.highlights}
                    </h3>
                    <ul className="space-y-3">
                      {selectedPortfolio.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 操作按鈕 */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-2xl text-white">
                    <h4 className="text-lg font-bold mb-4 flex items-center">
                      <i className="ri-customer-service-2-line mr-2"></i>
                      {t.interestedIn}
                    </h4>
                    <p className="text-slate-200 mb-6 text-sm">
                      {t.wantToKnow.replace('%s', selectedPortfolio.title)}
                    </p>
                    <div className="space-y-3">
                      <Link
                        href={`/portfolio/${selectedPortfolio.id}`}
                        className="w-full bg-lime-400 text-slate-900 px-4 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-colors cursor-pointer block text-center whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        {t.viewFullCase}
                      </Link>
                      <button
                        onClick={() => handleContactService(selectedPortfolio)}
                        className="w-full bg-transparent border-2 border-lime-400 text-lime-400 px-4 py-3 rounded-lg font-semibold hover:bg-lime-400 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-telegram-line mr-2"></i>
                        {t.telegramConsult}
                      </button>
                      <Link
                        href="/contact"
                        className="w-full bg-slate-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-slate-500 transition-colors cursor-pointer whitespace-nowrap text-center block"
                      >
                        <i className="ri-file-list-3-line mr-2"></i>
                        {t.getSimilarQuote}
                      </Link>
                    </div>
                  </div>

                  {/* 相關服務 */}
                  <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <i className="ri-star-line mr-2 text-yellow-600"></i>
                      {t.relatedAdvantages}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <i className="ri-shield-check-line text-green-500 mr-2"></i>
                        {t.richExperience.replace('%s', selectedPortfolio.category)}
                      </li>
                      <li className="flex items-center">
                        <i className="ri-global-line text-blue-500 mr-2"></i>
                        {t.bilingualTeam}
                      </li>
                      <li className="flex items-center">
                        <i className="ri-price-tag-3-line text-purple-500 mr-2"></i>
                        {t.transparentPricing}
                      </li>
                      <li className="flex items-center">
                        <i className="ri-time-line text-orange-500 mr-2"></i>
                        {t.support247}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
