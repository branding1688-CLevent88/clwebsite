
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PortfolioGrid() {
  const [activeEventFilter, setActiveEventFilter] = useState('全部');
  const [activeServiceFilter, setActiveServiceFilter] = useState('全部');
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
      filterByEvent: '依活動類型篩選',
      filterByService: '依服務項目篩選',
      client: '客戶：',
      noResults: '找不到符合條件的案例',
      adjustFilters: '請嘗試調整篩選條件'
    },
    en: {
      filterByEvent: 'Filter by Event Type',
      filterByService: 'Filter by Service Type',
      client: 'Client: ',
      noResults: 'No cases found matching the criteria',
      adjustFilters: 'Please try adjusting the filter conditions'
    }
  };

  const filterData = {
    zh: {
      eventTypes: ['全部', '商業開幕', '品牌發表會', '婚禮慶典', '私人派對', '企業年會'],
      serviceTypes: ['全部', '整體策劃', '視覺設計', '現場執行', '媒體公關']
    },
    en: {
      eventTypes: ['All', 'Business Opening', 'Brand Launch', 'Wedding Celebration', 'Private Party', 'Corporate Annual'],
      serviceTypes: ['All', 'Overall Planning', 'Visual Design', 'On-site Execution', 'Media PR']
    }
  };

  const portfolioData = {
    zh: [
      {
        id: 1,
        title: 'NEXUS科技5G新品全球發表會',
        eventType: '品牌發表會',
        serviceType: '整體策劃',
        image: 'https://readdy.ai/api/search-image?query=Futuristic%20high-tech%20product%20launch%20event%20with%20holographic%20displays%20LED%20screens%20modern%20minimalist%20stage%20design%20corporate%20executives%20presenting%205G%20technology%20professional%20lighting%20packed%20audience%20Manila%20Philippines%20sophisticated%20venue&width=500&height=600&seq=portfolio-nexus-tech&orientation=portrait',
        client: 'NEXUS科技集團',
        description: '600人規模的國際級科技發表會，結合AR互動體驗與全息投影技術，成功吸引全球媒體關注'
      },
      {
        id: 2,
        title: 'GOLDEN TOWER商業大樓盛大開幕',
        eventType: '商業開幕',
        serviceType: '視覺設計',
        image: 'https://readdy.ai/api/search-image?query=Luxurious%20corporate%20building%20grand%20opening%20ceremony%20with%20elegant%20red%20carpet%20entrance%20golden%20ribbon%20cutting%20VIP%20guests%20champagne%20reception%20crystal%20chandeliers%20formal%20business%20celebration%20Manila%20Philippines&width=500&height=700&seq=portfolio-golden-tower&orientation=portrait',
        client: 'GOLDEN TOWER地產',
        description: '馬尼拉地標性商業大樓開幕典禮，政商名流雲集，打造城市新地標的歷史時刻'
      },
      {
        id: 3,
        title: '薄荷島天堂海灘夢幻婚禮',
        eventType: '婚禮慶典',
        serviceType: '整體策劃',
        image: 'https://readdy.ai/api/search-image?query=Breathtaking%20tropical%20beach%20wedding%20ceremony%20Bohol%20island%20crystal%20clear%20turquoise%20water%20white%20sand%20pristine%20beach%20white%20floral%20arch%20sunset%20golden%20hour%20romantic%20atmosphere%20Philippines%20paradise%20destination%20wedding&width=500&height=650&seq=portfolio-bohol-wedding&orientation=portrait',
        client: '陳先生與李小姐',
        description: '在薄荷島私人海灘舉辦的奢華婚禮，80位賓客見證愛情誓言，創造終生難忘的浪漫回憶'
      },
      {
        id: 4,
        title: 'PACIFIC集團20週年慶典晚宴',
        eventType: '企業年會',
        serviceType: '現場執行',
        image: 'https://readdy.ai/api/search-image?query=Opulent%20corporate%20anniversary%20gala%20dinner%20with%20elegant%20ballroom%20setup%20crystal%20chandeliers%20round%20tables%20exquisite%20centerpieces%20live%20orchestra%20performance%20formal%20business%20celebration%20Manila%20five%20star%20hotel&width=500&height=600&seq=portfolio-pacific-gala&orientation=portrait',
        client: 'PACIFIC集團',
        description: '500人規模的企業週年慶典，結合文藝表演與頒獎典禮，展現企業20年輝煌成就'
      },
      {
        id: 5,
        title: 'SOPHIA名媛50歲生日派對',
        eventType: '私人派對',
        serviceType: '視覺設計',
        image: 'https://readdy.ai/api/search-image?query=Elegant%20sophisticated%20private%20birthday%20party%20celebration%20luxury%20venue%20crystal%20decorations%20champagne%20towers%20beautiful%20lighting%20intimate%20gathering%20upscale%20setting%20Manila%20Philippines%20refined%20atmosphere&width=500&height=700&seq=portfolio-sophia-party&orientation=portrait',
        client: 'SOPHIA女士',
        description: '奢華私人生日慶典，120位貴賓齊聚，精緻餐點與現場樂隊演出，完美詮釋優雅品味'
      },
      {
        id: 6,
        title: 'INNOVATE新創產品發表記者會',
        eventType: '品牌發表會',
        serviceType: '媒體公關',
        image: 'https://readdy.ai/api/search-image?query=Professional%20press%20conference%20with%20modern%20media%20wall%20backdrop%20journalists%20cameras%20innovative%20product%20display%20startup%20executives%20speaking%20podium%20tech%20conference%20room%20Manila%20Philippines%20contemporary%20atmosphere&width=500&height=650&seq=portfolio-innovate-press&orientation=portrait',
        client: 'INNOVATE新創',
        description: '突破性科技產品發表會，50家媒體出席，成功打造話題聲量，為新創公司奠定市場地位'
      },
      {
        id: 7,
        title: 'EMERALD酒店集團開業慶典',
        eventType: '商業開幕',
        serviceType: '整體策劃',
        image: 'https://readdy.ai/api/search-image?query=Luxury%20hotel%20grand%20opening%20ceremony%20elegant%20entrance%20with%20emerald%20green%20theme%20sophisticated%20decorations%20VIP%20ribbon%20cutting%20champagne%20reception%20five%20star%20hospitality%20Manila%20Philippines%20upscale%20celebration&width=500&height=600&seq=portfolio-emerald-hotel&orientation=portrait',
        client: 'EMERALD酒店集團',
        description: '五星級酒店開業盛典，結合時尚走秀與美食品鑑，成功建立頂級品牌形象'
      },
      {
        id: 8,
        title: '長灘島白沙灘浪漫求婚',
        eventType: '私人派對',
        serviceType: '現場執行',
        image: 'https://readdy.ai/api/search-image?query=Romantic%20beach%20proposal%20setup%20Boracay%20white%20sand%20beach%20sunset%20golden%20hour%20heart%20shaped%20rose%20petals%20candles%20elegant%20decorations%20intimate%20surprise%20proposal%20Philippines%20tropical%20paradise&width=500&height=650&seq=portfolio-boracay-proposal&orientation=portrait',
        client: '張先生',
        description: '在長灘島白沙灘精心策劃的驚喜求婚，浪漫燭光與玫瑰花瓣，見證愛情最美好的時刻'
      },
      {
        id: 9,
        title: 'SUMMIT銀行企業高峰論壇',
        eventType: '企業年會',
        serviceType: '媒體公關',
        image: 'https://readdy.ai/api/search-image?query=Professional%20corporate%20summit%20conference%20with%20modern%20auditorium%20setup%20business%20executives%20panel%20discussion%20banking%20industry%20leaders%20formal%20presentation%20Manila%20Philippines%20contemporary%20venue&width=500&height=700&seq=portfolio-summit-bank&orientation=portrait',
        client: 'SUMMIT銀行',
        description: '金融業高峰論壇，邀請國際專家演講，300位業界精英參與，促進產業交流合作'
      },
      {
        id: 10,
        title: 'CRYSTAL珠寶品牌旗艦店開幕',
        eventType: '品牌發表會',
        serviceType: '視覺設計',
        image: 'https://readdy.ai/api/search-image?query=Elegant%20jewelry%20store%20grand%20opening%20with%20crystal%20chandeliers%20luxury%20showcase%20displays%20sparkling%20diamond%20jewelry%20VIP%20guests%20champagne%20reception%20sophisticated%20lighting%20Manila%20Philippines%20upscale%20retail&width=500&height=600&seq=portfolio-crystal-jewelry&orientation=portrait',
        client: 'CRYSTAL珠寶',
        description: '頂級珠寶品牌旗艦店開幕，璀璨展示空間設計，成功吸引時尚名流與收藏家關注'
      },
      {
        id: 11,
        title: '巴拉望島私人度假村婚禮',
        eventType: '婚禮慶典',
        serviceType: '整體策劃',
        image: 'https://readdy.ai/api/search-image?query=Exclusive%20private%20resort%20wedding%20ceremony%20Palawan%20island%20pristine%20beach%20turquoise%20lagoon%20tropical%20luxury%20wedding%20arch%20palm%20trees%20paradise%20setting%20intimate%20celebration%20Philippines%20destination%20wedding&width=500&height=650&seq=portfolio-palawan-wedding&orientation=portrait',
        client: '王先生與林小姐',
        description: '在巴拉望島私人度假村舉辦的奢華婚禮，50位親友見證，享受無與倫比的私密浪漫'
      },
      {
        id: 12,
        title: 'PHOENIX集團年終尾牙晚會',
        eventType: '企業年會',
        serviceType: '現場執行',
        image: 'https://readdy.ai/api/search-image?query=Festive%20corporate%20year%20end%20party%20with%20colorful%20lighting%20stage%20entertainment%20employee%20celebration%20awards%20ceremony%20lucky%20draw%20exciting%20atmosphere%20Manila%20Philippines%20company%20gathering&width=500&height=700&seq=portfolio-phoenix-party&orientation=portrait',
        client: 'PHOENIX集團',
        description: '800人規模的企業尾牙晚會，結合表演娛樂與抽獎活動，為員工創造歡樂難忘的夜晚'
      }
    ],
    en: [
      {
        id: 1,
        title: 'NEXUS Tech 5G Product Global Launch Event',
        eventType: 'Brand Launch',
        serviceType: 'Overall Planning',
        image: 'https://readdy.ai/api/search-image?query=Futuristic%20high-tech%20product%20launch%20event%20with%20holographic%20displays%20LED%20screens%20modern%20minimalist%20stage%20design%20corporate%20executives%20presenting%205G%20technology%20professional%20lighting%20packed%20audience%20Manila%20Philippines%20sophisticated%20venue&width=500&height=600&seq=portfolio-nexus-tech&orientation=portrait',
        client: 'NEXUS Technology Group',
        description: 'International tech launch event for 600 people, combining AR interactive experiences and holographic projection technology, successfully attracting global media attention'
      },
      {
        id: 2,
        title: 'GOLDEN TOWER Commercial Building Grand Opening',
        eventType: 'Business Opening',
        serviceType: 'Visual Design',
        image: 'https://readdy.ai/api/search-image?query=Luxurious%20corporate%20building%20grand%20opening%20ceremony%20with%20elegant%20red%20carpet%20entrance%20golden%20ribbon%20cutting%20VIP%20guests%20champagne%20reception%20crystal%20chandeliers%20formal%20business%20celebration%20Manila%20Philippines&width=500&height=700&seq=portfolio-golden-tower&orientation=portrait',
        client: 'GOLDEN TOWER Real Estate',
        description: 'Manila landmark commercial building opening ceremony, gathering political and business celebrities, creating a historic moment for the new city landmark'
      },
      {
        id: 3,
        title: 'Bohol Paradise Beach Dream Wedding',
        eventType: 'Wedding Celebration',
        serviceType: 'Overall Planning',
        image: 'https://readdy.ai/api/search-image?query=Breathtaking%20tropical%20beach%20wedding%20ceremony%20Bohol%20island%20crystal%20clear%20turquoise%20water%20white%20sand%20pristine%20beach%20white%20floral%20arch%20sunset%20golden%20hour%20romantic%20atmosphere%20Philippines%20paradise%20destination%20wedding&width=500&height=650&seq=portfolio-bohol-wedding&orientation=portrait',
        client: 'Mr. Chen & Ms. Li',
        description: 'Luxury wedding held on Bohol private beach, with 80 guests witnessing love vows, creating lifelong unforgettable romantic memories'
      },
      {
        id: 4,
        title: 'PACIFIC Group 20th Anniversary Gala Dinner',
        eventType: 'Corporate Annual',
        serviceType: 'On-site Execution',
        image: 'https://readdy.ai/api/search-image?query=Opulent%20corporate%20anniversary%20gala%20dinner%20with%20elegant%20ballroom%20setup%20crystal%20chandeliers%20round%20tables%20exquisite%20centerpieces%20live%20orchestra%20performance%20formal%20business%20celebration%20Manila%20five%20star%20hotel&width=500&height=600&seq=portfolio-pacific-gala&orientation=portrait',
        client: 'PACIFIC Group',
        description: '500-person corporate anniversary celebration, combining artistic performances and award ceremonies, showcasing the company\'s 20-year brilliant achievements'
      },
      {
        id: 5,
        title: 'SOPHIA Lady\'s 50th Birthday Party',
        eventType: 'Private Party',
        serviceType: 'Visual Design',
        image: 'https://readdy.ai/api/search-image?query=Elegant%20sophisticated%20private%20birthday%20party%20celebration%20luxury%20venue%20crystal%20decorations%20champagne%20towers%20beautiful%20lighting%20intimate%20gathering%20upscale%20setting%20Manila%20Philippines%20refined%20atmosphere&width=500&height=700&seq=portfolio-sophia-party&orientation=portrait',
        client: 'Ms. SOPHIA',
        description: 'Luxury private birthday celebration, 120 VIP guests gathering, exquisite dining and live band performances, perfectly interpreting elegant taste'
      },
      {
        id: 6,
        title: 'INNOVATE Startup Product Launch Press Conference',
        eventType: 'Brand Launch',
        serviceType: 'Media PR',
        image: 'https://readdy.ai/api/search-image?query=Professional%20press%20conference%20with%20modern%20media%20wall%20backdrop%20journalists%20cameras%20innovative%20product%20display%20startup%20executives%20speaking%20podium%20tech%20conference%20room%20Manila%20Philippines%20contemporary%20atmosphere&width=500&height=650&seq=portfolio-innovate-press&orientation=portrait',
        client: 'INNOVATE Startup',
        description: 'Breakthrough tech product launch event, 50 media outlets attended, successfully creating buzz and establishing market position for the startup'
      },
      {
        id: 7,
        title: 'EMERALD Hotel Group Opening Celebration',
        eventType: 'Business Opening',
        serviceType: 'Overall Planning',
        image: 'https://readdy.ai/api/search-image?query=Luxury%20hotel%20grand%20opening%20ceremony%20elegant%20entrance%20with%20emerald%20green%20theme%20sophisticated%20decorations%20VIP%20ribbon%20cutting%20champagne%20reception%20five%20star%20hospitality%20Manila%20Philippines%20upscale%20celebration&width=500&height=600&seq=portfolio-emerald-hotel&orientation=portrait',
        client: 'EMERALD Hotel Group',
        description: 'Five-star hotel opening gala, combining fashion shows and gourmet tastings, successfully establishing premium brand image'
      },
      {
        id: 8,
        title: 'Boracay White Beach Romantic Proposal',
        eventType: 'Private Party',
        serviceType: 'On-site Execution',
        image: 'https://readdy.ai/api/search-image?query=Romantic%20beach%20proposal%20setup%20Boracay%20white%20sand%20beach%20sunset%20golden%20hour%20heart%20shaped%20rose%20petals%20candles%20elegant%20decorations%20intimate%20surprise%20proposal%20Philippines%20tropical%20paradise&width=500&height=650&seq=portfolio-boracay-proposal&orientation=portrait',
        client: 'Mr. Zhang',
        description: 'Carefully planned surprise proposal on Boracay White Beach, romantic candlelight and rose petals, witnessing the most beautiful moment of love'
      },
      {
        id: 9,
        title: 'SUMMIT Bank Corporate Summit Forum',
        eventType: 'Corporate Annual',
        serviceType: 'Media PR',
        image: 'https://readdy.ai/api/search-image?query=Professional%20corporate%20summit%20conference%20with%20modern%20auditorium%20setup%20business%20executives%20panel%20discussion%20banking%20industry%20leaders%20formal%20presentation%20Manila%20Philippines%20contemporary%20venue&width=500&height=700&seq=portfolio-summit-bank&orientation=portrait',
        client: 'SUMMIT Bank',
        description: 'Financial industry summit forum, inviting international experts to speak, 300 industry elites participating, promoting industry exchange and cooperation'
      },
      {
        id: 10,
        title: 'CRYSTAL Jewelry Brand Flagship Store Opening',
        eventType: 'Brand Launch',
        serviceType: 'Visual Design',
        image: 'https://readdy.ai/api/search-image?query=Elegant%20jewelry%20store%20grand%20opening%20with%20crystal%20chandeliers%20luxury%20showcase%20displays%20sparkling%20diamond%20jewelry%20VIP%20guests%20champagne%20reception%20sophisticated%20lighting%20Manila%20Philippines%20upscale%20retail&width=500&height=600&seq=portfolio-crystal-jewelry&orientation=portrait',
        client: 'CRYSTAL Jewelry',
        description: 'Top jewelry brand flagship store opening, brilliant display space design, successfully attracting fashion celebrities and collectors\' attention'
      },
      {
        id: 11,
        title: 'Palawan Private Resort Wedding',
        eventType: 'Wedding Celebration',
        serviceType: 'Overall Planning',
        image: 'https://readdy.ai/api/search-image?query=Exclusive%20private%20resort%20wedding%20ceremony%20Palawan%20island%20pristine%20beach%20turquoise%20lagoon%20tropical%20luxury%20wedding%20arch%20palm%20trees%20paradise%20setting%20intimate%20celebration%20Philippines%20destination%20wedding&width=500&height=650&seq=portfolio-palawan-wedding&orientation=portrait',
        client: 'Mr. Wang & Ms. Lin',
        description: 'Luxury wedding held at Palawan private resort, 50 family and friends witnessing, enjoying unparalleled private romance'
      },
      {
        id: 12,
        title: 'PHOENIX Group Year-End Party Gala',
        eventType: 'Corporate Annual',
        serviceType: 'On-site Execution',
        image: 'https://readdy.ai/api/search-image?query=Festive%20corporate%20year%20end%20party%20with%20colorful%20lighting%20stage%20entertainment%20employee%20celebration%20awards%20ceremony%20lucky%20draw%20exciting%20atmosphere%20Manila%20Philippines%20company%20gathering&width=500&height=700&seq=portfolio-phoenix-party&orientation=portrait',
        client: 'PHOENIX Group',
        description: '800-person corporate year-end party, combining performance entertainment and lucky draws, creating joyful unforgettable nights for employees'
      }
    ]
  };

  const t = translations[language as keyof typeof translations];
  const filters = filterData[language as keyof typeof filterData];
  const portfolioItems = portfolioData[language as keyof typeof portfolioData];

  // 根據語言更新篩選器狀態
  useEffect(() => {
    setActiveEventFilter(filters.eventTypes[0]);
    setActiveServiceFilter(filters.serviceTypes[0]);
  }, [language]);

  const filteredItems = portfolioItems.filter(item => {
    const eventMatch = activeEventFilter === filters.eventTypes[0] || item.eventType === activeEventFilter;
    const serviceMatch = activeServiceFilter === filters.serviceTypes[0] || item.serviceType === activeServiceFilter;
    return eventMatch && serviceMatch;
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* 篩選器區域 */}
        <div className="mb-12 space-y-6">
          {/* 活動類型篩選 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.filterByEvent}</h3>
            <div className="flex flex-wrap gap-3">
              {filters.eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveEventFilter(type)}
                  className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeEventFilter === type
                      ? 'bg-lime-500 text-slate-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 服務項目篩選 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.filterByService}</h3>
            <div className="flex flex-wrap gap-3">
              {filters.serviceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveServiceFilter(type)}
                  className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeServiceFilter === type
                      ? 'bg-slate-800 text-lime-400'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 案例網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Link 
              key={item.id}
              href={`/portfolio/${item.id}`}
              className="group block cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block bg-lime-500 text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
                      {item.eventType}
                    </span>
                    <span className="inline-block bg-slate-800 text-lime-400 px-3 py-1 rounded-full text-sm font-medium">
                      {item.serviceType}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-lime-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t.client}{item.client}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <i className="ri-arrow-right-up-line text-slate-800 text-xl"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-search-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noResults}</h3>
            <p className="text-gray-600">{t.adjustFilters}</p>
          </div>
        )}
      </div>
    </section>
  );
}
