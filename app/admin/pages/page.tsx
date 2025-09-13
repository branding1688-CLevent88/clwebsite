
'use client';
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

export default function PagesManagement() {
  const [activeTab, setActiveTab] = useState('home');
  const [homeContent, setHomeContent] = useState({
    // Hero 區塊
    heroTitle: '專業活動策劃服務',
    heroSubtitle: '讓每一個特殊時刻都完美呈現',
    heroDescription: '從企業盛會到私人慶典，我們用心打造每一個難忘瞬間。專業團隊、創意策劃、完美執行，為您創造獨一無二的活動體驗。',
    heroButton1: '立即諮詢',
    heroButton2: '查看作品',
    heroImage: 'https://readdy.ai/api/search-image?query=Professional%20event%20planning%20company%20hero%20banner%20with%20elegant%20design%20modern%20office%20setting%20team%20collaboration%20creative%20workspace%20with%20clean%20background%20business%20atmosphere&width=1200&height=600&seq=hero1&orientation=landscape',

    // 品牌介紹區塊
    brandTitle: '您在菲律賓最可靠的',
    brandTitleHighlight: '在地活動夥伴',
    brandDescription: '我們深知華語客戶在海外舉辦活動時面臨的挑戰：語言溝通障礙、對當地供應商不熟悉、擔心品質與預算控制。CL Events 專為解決這些痛點而生，憑藉深耕菲律賓多年的在地資源與專業的中文團隊，為您打造從策劃到執行的一站式活動解決方案。',
    brandMessage: '在地整合力 × 華語溝通力  您的完美活動體驗',
    brandSubMessage: '我們不僅是活動策劃者，更是您在菲律賓的可信賴夥伴',
    brandImage: 'https://readdy.ai/api/search-image?query=Professional%20event%20planning%20team%20collaborating%20in%20modern%20Manila%20office%20with%20Philippines%20elements%20showcasing%20local%20expertise%20and%20international%20standards%20business%20meeting%20atmosphere&width=800&height=600&seq=brand1&orientation=landscape',

    // 服務區塊
    servicesTitle: '核心服務項目',
    servicesSubtitle: '從創意發想到完美執行，我們提供全方位的活動策劃服務',
    servicesButton: '立即獲取專屬報價',
    servicesImage: 'https://readdy.ai/api/search-image?query=Event%20planning%20services%20showcase%20with%20elegant%20venue%20setup%20professional%20lighting%20sound%20equipment%20stage%20design%20wedding%20corporate%20events%20Philippines&width=800&height=600&seq=services1&orientation=landscape',

    // 客戶見證區塊
    testimonialsTitle: '客戶真實回饋',
    testimonialsSubtitle: '超過 500+ 場成功活動，客戶滿意度 98%',
    testimonialsImage: 'https://readdy.ai/api/search-image?query=Happy%20clients%20testimonials%20at%20successful%20events%20in%20Philippines%20weddings%20corporate%20gatherings%20satisfied%20customers%20celebrating%20memorable%20moments&width=800&height=600&seq=testimonials1&orientation=landscape',

    // 作品展示區塊
    portfolioTitle: '我們的實戰作品',
    portfolioSubtitle: '每一場活動都是我們專業實力的展現，見證客戶夢想成真的美好時刻',
    portfolioButton: '查看更多案例',
    portfolioImage: 'https://readdy.ai/api/search-image?query=Event%20portfolio%20showcase%20with%20multiple%20successful%20events%20collage%20professional%20photography%20elegant%20venues%20beautiful%20decorations%20Philippines%20locations&width=800&height=600&seq=portfolio1&orientation=landscape',

    // 底部CTA區塊
    ctaTitle: '準備開始您的完美活動了嗎？',
    ctaSubtitle: '立即聯繫我們，讓專業團隊為您量身打造難忘的活動體驗',
    ctaButton: '開始規劃',
    ctaImage: 'https://readdy.ai/api/search-image?query=Call%20to%20action%20banner%20with%20professional%20event%20planning%20team%20ready%20to%20help%20elegant%20office%20setting%20modern%20design%20Philippines%20business%20atmosphere&width=800&height=400&seq=cta1&orientation=landscape'
  });

  const [aboutContent, setAboutContent] = useState({
    // Hero 區塊
    heroTitle: '我們的故事',
    heroSubtitle: '用心打造每一個精彩時刻',
    heroDescription: 'CL Events 成立於2020年，致力於為華語客戶在菲律賓提供專業的活動策劃服務。我們深知每一個特殊時刻都值得被完美呈現。',
    heroImage: 'https://readdy.ai/api/search-image?query=About%20us%20company%20story%20with%20professional%20team%20members%20in%20elegant%20office%20setting%20Manila%20Philippines%20modern%20workspace%20collaborative%20environment%20business%20meeting&width=1200&height=600&seq=abouthero1&orientation=landscape',

    // 我們的故事區塊
    storyTitle: '我們的故事',
    storySubtitle: '從夢想到現實的創業歷程',
    storyContent: 'CL Events 成立於2020年，由一群充滿熱忱的活動策劃專家創立。我們深知華語客戶在菲律賓舉辦活動時所面臨的挑戰：語言溝通、文化差異、對當地供應商的不熟悉等。因此，我們致力於成為客戶最可信賴的在地夥伴，結合專業的活動策劃能力與深度的在地資源，為每一位客戶創造難忘的活動體驗。',
    storyImage: 'https://readdy.ai/api/search-image?query=Company%20founding%20story%20with%20founders%20team%20meeting%20in%20modern%20office%20startup%20journey%20professional%20collaboration%20Manila%20Philippines%20business%20development&width=800&height=600&seq=story1&orientation=landscape',

    // 我們的團隊區塊
    teamTitle: '我們的團隊',
    teamSubtitle: '專業、創新、用心的服務團隊',
    teamDescription: '我們的核心團隊由經驗豐富的活動策劃專家、創意設計師、現場執行人員組成。每位成員都擁有豐富的行業經驗，並且精通中文溝通，確保為客戶提供最貼心的服務。',
    teamImage: 'https://readdy.ai/api/search-image?query=Professional%20event%20planning%20team%20group%20photo%20in%20modern%20office%20setting%20diverse%20talented%20members%20collaborative%20workspace%20Manila%20Philippines%20business%20portrait&width=800&height=600&seq=team1&orientation=landscape',

    // 團隊成員資料
    teamMembers: [
      {
        name: '陳凱倫',
        position: '創辦人 & 執行總監',
        description: '深耕菲律賓活動策劃領域5年，成功策劃500+場活動',
        specialties: ['策略規劃', '客戶關係', '品質控管'],
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/c72db96cef9cdc9c7c304d110685f7fa.png'
      },
      {
        name: '林雅婷',
        position: '創意總監',
        description: '擁有豐富的視覺設計與空間規劃經驗，讓每場活動都成為藝術品',
        specialties: ['視覺設計', '空間規劃', '創意發想'],
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/0b5f639b4f30e1f5796de3536ef0f8d4.png'
      },
      {
        name: '王志明',
        position: '營運總監',
        description: '專精供應鏈管理與現場執行，確保每個環節完美銜接',
        specialties: ['供應鏈管理', '現場執行', '成本控制'],
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/ecfaf83c325b4c71739fa996c6a45cb3.png'
      },
      {
        name: 'Maria Santos',
        position: '在地協調專員',
        description: '菲律賓當地專家，熟悉在地文化與法規，是文化溝通的橋樑',
        specialties: ['在地協調', '文化溝通', '法規諮詢'],
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/e10c1ae612dd32c4f88c2f2d6b852ca5.png'
      },
      {
        name: '張心怡',
        position: '客戶服務總監',
        description: '24小時待命的貼心客服，讓客戶感受到賓至如歸的服務體驗',
        specialties: ['客戶服務', '需求分析', '關係維護'],
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/de47df52a5e7afdc6a2bed50a9f9bd45.png'
      },
      {
        name: '李俊傑',
        position: '技術總監',
        description: '音響燈光技術專家，為活動提供專業的技術支持與創新解決方案',
        specialties: ['音響燈光', '技術支援', '設備管理'],
        image: 'https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/ec7732805e0adbb773459343cfa80ae9.png'
      }
    ],

    // 公司理念區塊
    philosophyTitle: '我們的理念',
    philosophySubtitle: '品質至上，創新不止',
    philosophyContent: '我們相信每一個活動都應該是獨一無二的，因此我們致力於為客戶提供個性化的策劃方案。從前期的創意發想到現場的完美執行，我們始終堅持品質至上的原則，確保每一個細節都經過精心安排。',
    philosophyImage: 'https://readdy.ai/api/search-image?query=Company%20philosophy%20and%20values%20with%20elegant%20design%20modern%20office%20setting%20professional%20workspace%20inspiration%20creativity%20teamwork%20Philippines%20business&width=800&height=600&seq=philosophy1&orientation=landscape',

    // 服務流程區塊
    processTitle: '服務流程',
    processSubtitle: '從諮詢到執行的完整服務體驗',
    processDescription: '我們建立了標準化的服務流程，確保每一個專案都能順利進行。從初步諮詢、方案設計、準備階段到現場執行，每個環節都有專業團隊負責，讓客戶享受無憂的活動體驗。',
    processImage: 'https://readdy.ai/api/search-image?query=Event%20planning%20process%20workflow%20with%20professional%20team%20coordination%20planning%20stages%20execution%20steps%20modern%20office%20Philippines%20business%20process&width=800&height=600&seq=process1&orientation=landscape'
  });

  const [servicesContent, setServicesContent] = useState({
    title: '我們的服務',
    subtitle: '一站式活動解決方案',
    servicesImage: 'https://readdy.ai/api/search-image?query=Comprehensive%20event%20services%20showcase%20with%20venue%20setup%20coordination%20planning%20execution%20professional%20team%20Philippines%20events&width=800&height=600&seq=servicespage1&orientation=landscape',
    services: [
      {
        name: '整體策劃',
        description: '從概念發想到完美執行',
        image: 'https://readdy.ai/api/search-image?query=Event%20planning%20coordination%20with%20professional%20planners%20working%20on%20event%20concepts%20creative%20brainstorming%20session%20modern%20office&width=400&height=300&seq=planning1&orientation=landscape'
      },
      {
        name: '視覺設計',
        description: '打造令人印象深刻的視覺體驗',
        image: 'https://readdy.ai/api/search-image?query=Visual%20design%20and%20decoration%20for%20events%20with%20elegant%20floral%20arrangements%20lighting%20design%20stage%20setup%20beautiful%20venue%20Philippines&width=400&height=300&seq=design1&orientation=landscape'
      },
      {
        name: '現場執行',
        description: '專業團隊確保活動順利進行',
        image: 'https://readdy.ai/api/search-image?query=Professional%20event%20execution%20team%20coordinating%20successful%20event%20with%20guests%20enjoying%20elegant%20venue%20setup%20Philippines%20celebration&width=400&height=300&seq=execution1&orientation=landscape'
      }
    ]
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const generateImageUrl = (description, width = 800, height = 600) => {
    const randomSeq = Math.random().toString(36).substring(7);
    return `https://readdy.ai/api/search-image?query=${encodeURIComponent(description)}&width=${width}&height=${height}&seq=${randomSeq}&orientation=landscape`;
  };

  const handleSave = async (section) => {
    setIsSaving(true);
    // 模擬保存過程
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveMessage('內容已成功更新!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const tabs = [
    { id: 'home', label: '首頁管理', icon: 'ri-home-line' },
    { id: 'about', label: '關於我們', icon: 'ri-team-line' },
    { id: 'services', label: '服務內容', icon: 'ri-customer-service-line' }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">頁面內容管理</h1>
          <p className="text-gray-600">管理網站各個固定頁面的文字與圖片內容</p>
        </div>

        {saveMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {saveMessage}
          </div>
        )}

        {/* 標籤切換 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-lime-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* 首頁管理 */}
            {activeTab === 'home' && (
              <div className="space-y-8">
                {/* Hero 區塊 */}
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <i className="ri-trophy-line mr-2 text-lime-600"></i>
                    Hero 主視覺區塊
                  </h3>

                  {/* Hero 圖片設定 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero 背景圖片
                    </label>
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <input
                          type="url"
                          value={homeContent.heroImage}
                          onChange={(e) => setHomeContent({ ...homeContent, heroImage: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          placeholder="請輸入圖片網址"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImage = generateImageUrl('Professional event planning company hero banner with elegant design modern office setting team collaboration creative workspace with clean background business atmosphere');
                            setHomeContent({ ...homeContent, heroImage: newImage });
                          }}
                          className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                        >
                          <i className="ri-refresh-line mr-2"></i>
                          重新生成圖片
                        </button>
                      </div>
                      {homeContent.heroImage && (
                        <div className="w-32 h-20 flex-shrink-0">
                          <img
                            src={homeContent.heroImage}
                            alt="Hero 預覽"
                            className="w-full h-full object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          主標題
                        </label>
                        <input
                          type="text"
                          value={homeContent.heroTitle}
                          onChange={(e) => setHomeContent({ ...homeContent, heroTitle: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          副標題
                        </label>
                        <input
                          type="text"
                          value={homeContent.heroSubtitle}
                          onChange={(e) => setHomeContent({ ...homeContent, heroSubtitle: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        描述文字
                      </label>
                      <textarea
                        value={homeContent.heroDescription}
                        onChange={(e) => setHomeContent({ ...homeContent, heroDescription: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          按鈕文字 1
                        </label>
                        <input
                          type="text"
                          value={homeContent.heroButton1}
                          onChange={(e) => setHomeContent({ ...homeContent, heroButton1: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          按鈕文字 2
                        </label>
                        <input
                          type="text"
                          value={homeContent.heroButton2}
                          onChange={(e) => setHomeContent({ ...homeContent, heroButton2: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 品牌介紹區塊 */}
                  <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-building-line mr-2 text-lime-600"></i>
                      品牌介紹區塊
                    </h3>

                    {/* 品牌介紹圖片設定 */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        品牌介紹圖片
                      </label>
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <input
                            type="url"
                            value={homeContent.brandImage}
                            onChange={(e) => setHomeContent({ ...homeContent, brandImage: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            placeholder="請輸入圖片網址"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImage = generateImageUrl('Professional event planning team collaborating in modern Manila office with Philippines elements showcasing local expertise and international standards business meeting atmosphere');
                              setHomeContent({ ...homeContent, brandImage: newImage });
                            }}
                            className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-refresh-line mr-2"></i>
                            重新生成圖片
                          </button>
                        </div>
                        {homeContent.brandImage && (
                          <div className="w-32 h-20 flex-shrink-0">
                            <img
                              src={homeContent.brandImage}
                              alt="品牌介紹預覽"
                              className="w-full h-full object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            標題前半部
                          </label>
                          <input
                            type="text"
                            value={homeContent.brandTitle}
                            onChange={(e) => setHomeContent({ ...homeContent, brandTitle: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            標題亮點部分
                          </label>
                          <input
                            type="text"
                            value={homeContent.brandTitleHighlight}
                            onChange={(e) => setHomeContent({ ...homeContent, brandTitleHighlight: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          品牌介紹文字
                        </label>
                        <textarea
                          value={homeContent.brandDescription}
                          onChange={(e) => setHomeContent({ ...homeContent, brandDescription: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            品牌標語
                          </label>
                          <input
                            type="text"
                            value={homeContent.brandMessage}
                            onChange={(e) => setHomeContent({ ...homeContent, brandMessage: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            品牌副標語
                          </label>
                          <input
                            type="text"
                            value={homeContent.brandSubMessage}
                            onChange={(e) => setHomeContent({ ...homeContent, brandSubMessage: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 服務區塊 */}
                    <div className="border-b border-gray-200 pb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <i className="ri-customer-service-line mr-2 text-lime-600"></i>
                        服務區塊
                      </h3>

                      {/* 服務區塊圖片設定 */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          服務區塊圖片
                        </label>
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <input
                              type="url"
                              value={homeContent.servicesImage}
                              onChange={(e) => setHomeContent({ ...homeContent, servicesImage: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              placeholder="請輸入圖片網址"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImage = generateImageUrl('Event planning services showcase with elegant venue setup professional lighting sound equipment stage design wedding corporate events Philippines');
                                setHomeContent({ ...homeContent, servicesImage: newImage });
                              }}
                              className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                            >
                              <i className="ri-refresh-line mr-2"></i>
                              重新生成圖片
                            </button>
                          </div>
                          {homeContent.servicesImage && (
                            <div className="w-32 h-20 flex-shrink-0">
                              <img
                                src={homeContent.servicesImage}
                                alt="服務區塊預覽"
                                className="w-full h-full object-cover rounded-lg border border-gray-200"
                              />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              服務標題
                            </label>
                            <input
                              type="text"
                              value={homeContent.servicesTitle}
                              onChange={(e) => setHomeContent({ ...homeContent, servicesTitle: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              服務按鈕文字
                            </label>
                            <input
                              type="text"
                              value={homeContent.servicesButton}
                              onChange={(e) => setHomeContent({ ...homeContent, servicesButton: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            服務副標題
                          </label>
                          <input
                            type="text"
                            value={homeContent.servicesSubtitle}
                            onChange={(e) => setHomeContent({ ...homeContent, servicesSubtitle: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* 客戶見證區塊 */}
                      <div className="border-b border-gray-200 pb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <i className="ri-user-star-line mr-2 text-lime-600"></i>
                          客戶見證區塊
                        </h3>

                        {/* 客戶見證圖片設定 */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            客戶見證圖片
                          </label>
                          <div className="flex items-start space-x-4">
                            <div className="flex-1">
                              <input
                                type="url"
                                value={homeContent.testimonialsImage}
                                onChange={(e) => setHomeContent({ ...homeContent, testimonialsImage: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                placeholder="請輸入圖片網址"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImage = generateImageUrl('Happy clients testimonials at successful events in Philippines weddings corporate gatherings satisfied customers celebrating memorable moments');
                                  setHomeContent({ ...homeContent, testimonialsImage: newImage });
                                }}
                                className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                              >
                                <i className="ri-refresh-line mr-2"></i>
                                重新生成圖片
                              </button>
                            </div>
                            {homeContent.testimonialsImage && (
                              <div className="w-32 h-20 flex-shrink-0">
                                <img
                                  src={homeContent.testimonialsImage}
                                  alt="客戶見證預覽"
                                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                                />
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                見證標題
                              </label>
                              <input
                                type="text"
                                value={homeContent.testimonialsTitle}
                                onChange={(e) => setHomeContent({ ...homeContent, testimonialsTitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                見證副標題
                              </label>
                              <input
                                type="text"
                                value={homeContent.testimonialsSubtitle}
                                onChange={(e) => setHomeContent({ ...homeContent, testimonialsSubtitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 作品展示區塊 */}
                        <div className="border-b border-gray-200 pb-8">
                          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <i className="ri-image-line mr-2 text-lime-600"></i>
                            作品展示區塊
                          </h3>

                          {/* 作品展示圖片設定 */}
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              作品展示圖片
                            </label>
                            <div className="flex items-start space-x-4">
                              <div className="flex-1">
                                <input
                                  type="url"
                                  value={homeContent.portfolioImage}
                                  onChange={(e) => setHomeContent({ ...homeContent, portfolioImage: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                  placeholder="請輸入圖片網址"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newImage = generateImageUrl('Event portfolio showcase with multiple successful events collage professional photography elegant venues beautiful decorations Philippines locations');
                                    setHomeContent({ ...homeContent, portfolioImage: newImage });
                                  }}
                                  className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                                >
                                  <i className="ri-refresh-line mr-2"></i>
                                  重新生成圖片
                                </button>
                              </div>
                              {homeContent.portfolioImage && (
                                <div className="w-32 h-20 flex-shrink-0">
                                  <img
                                    src={homeContent.portfolioImage}
                                    alt="作品展示預覽"
                                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  作品標題
                                </label>
                                <input
                                  type="text"
                                  value={homeContent.portfolioTitle}
                                  onChange={(e) => setHomeContent({ ...homeContent, portfolioTitle: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  作品按鈕文字
                                </label>
                                <input
                                  type="text"
                                  value={homeContent.portfolioButton}
                                  onChange={(e) => setHomeContent({ ...homeContent, portfolioButton: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                作品副標題
                              </label>
                              <input
                                type="text"
                                value={homeContent.portfolioSubtitle}
                                onChange={(e) => setHomeContent({ ...homeContent, portfolioSubtitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          {/* 底部CTA區塊 */}
                          <div className="pb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                              <i className="ri-megaphone-line mr-2 text-lime-600"></i>
                              底部CTA區塊
                            </h3>

                            {/* CTA圖片設定 */}
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CTA區塊圖片
                              </label>
                              <div className="flex items-start space-x-4">
                                <div className="flex-1">
                                  <input
                                    type="url"
                                    value={homeContent.ctaImage}
                                    onChange={(e) => setHomeContent({ ...homeContent, ctaImage: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                    placeholder="請輸入圖片網址"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newImage = generateImageUrl('Call to action banner with professional event planning team ready to help elegant office setting modern design Philippines business atmosphere', 800, 400);
                                      setHomeContent({ ...homeContent, ctaImage: newImage });
                                    }}
                                    className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                                  >
                                    <i className="ri-refresh-line mr-2"></i>
                                    重新生成圖片
                                  </button>
                                </div>
                                {homeContent.ctaImage && (
                                  <div className="w-32 h-20 flex-shrink-0">
                                    <img
                                      src={homeContent.ctaImage}
                                      alt="CTA區塊預覽"
                                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CTA標題
                                  </label>
                                  <input
                                    type="text"
                                    value={homeContent.ctaTitle}
                                    onChange={(e) => setHomeContent({ ...homeContent, ctaTitle: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CTA按鈕文字
                                  </label>
                                  <input
                                    type="text"
                                    value={homeContent.ctaButton}
                                    onChange={(e) => setHomeContent({ ...homeContent, ctaButton: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  CTA副標題
                                </label>
                                <input
                                  type="text"
                                  value={homeContent.ctaSubtitle}
                                  onChange={(e) => setHomeContent({ ...homeContent, ctaSubtitle: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleSave('home')}
                            disabled={isSaving}
                            className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                          >
                            {isSaving ? '儲存中...' : '儲存變更'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 關於我們 */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                {/* Hero 區塊 */}
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <i className="ri-trophy-line mr-2 text-lime-600"></i>
                    關於我們 Hero 區塊
                  </h3>

                  {/* Hero 圖片設定 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero 背景圖片
                    </label>
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <input
                          type="url"
                          value={aboutContent.heroImage}
                          onChange={(e) => setAboutContent({ ...aboutContent, heroImage: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          placeholder="請輸入圖片網址"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImage = generateImageUrl('About us company story with professional team members in elegant office setting Manila Philippines modern workspace collaborative environment business meeting', 1200, 600);
                            setAboutContent({ ...aboutContent, heroImage: newImage });
                          }}
                          className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                        >
                          <i className="ri-refresh-line mr-2"></i>
                          重新生成圖片
                        </button>
                      </div>
                      {aboutContent.heroImage && (
                        <div className="w-32 h-20 flex-shrink-0">
                          <img
                            src={aboutContent.heroImage}
                            alt="Hero 預覽"
                            className="w-full h-full object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hero 標題
                        </label>
                        <input
                          type="text"
                          value={aboutContent.heroTitle}
                          onChange={(e) => setAboutContent({ ...aboutContent, heroTitle: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hero 副標題
                        </label>
                        <input
                          type="text"
                          value={aboutContent.heroSubtitle}
                          onChange={(e) => setAboutContent({ ...aboutContent, heroSubtitle: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero 描述文字
                      </label>
                      <textarea
                        value={aboutContent.heroDescription}
                        onChange={(e) => setAboutContent({ ...aboutContent, heroDescription: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* 我們的故事區塊 */}
                  <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-book-open-line mr-2 text-lime-600"></i>
                      我們的故事區塊
                    </h3>

                    {/* 故事區塊圖片設定 */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        故事區塊圖片
                      </label>
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <input
                            type="url"
                            value={aboutContent.storyImage}
                            onChange={(e) => setAboutContent({ ...aboutContent, storyImage: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            placeholder="請輸入圖片網址"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImage = generateImageUrl('Company founding story with founders team meeting in modern office startup journey professional collaboration Manila Philippines business development');
                              setAboutContent({ ...aboutContent, storyImage: newImage });
                            }}
                            className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-refresh-line mr-2"></i>
                            重新生成圖片
                          </button>
                        </div>
                        {aboutContent.storyImage && (
                          <div className="w-32 h-20 flex-shrink-0">
                            <img
                              src={aboutContent.storyImage}
                              alt="故事區塊預覽"
                              className="w-full h-full object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            故事標題
                          </label>
                          <input
                            type="text"
                            value={aboutContent.storyTitle}
                            onChange={(e) => setAboutContent({ ...aboutContent, storyTitle: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            故事副標題
                          </label>
                          <input
                            type="text"
                            value={aboutContent.storySubtitle}
                            onChange={(e) => setAboutContent({ ...aboutContent, storySubtitle: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          故事內容
                        </label>
                        <textarea
                          value={aboutContent.storyContent}
                          onChange={(e) => setAboutContent({ ...aboutContent, storyContent: e.target.value })}
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* 我們的團隊區塊 */}
                    <div className="border-b border-gray-200 pb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <i className="ri-team-line mr-2 text-lime-600"></i>
                        我們的團隊區塊
                      </h3>

                      {/* 團隊區塊圖片設定 */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          團隊區塊圖片
                        </label>
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <input
                              type="url"
                              value={aboutContent.teamImage}
                              onChange={(e) => setAboutContent({ ...aboutContent, teamImage: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              placeholder="請輸入圖片網址"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImage = generateImageUrl('Professional event planning team group photo in modern office setting diverse talented members collaborative workspace Manila Philippines business portrait');
                                setAboutContent({ ...aboutContent, teamImage: newImage });
                              }}
                              className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                            >
                              <i className="ri-refresh-line mr-2"></i>
                              重新生成圖片
                            </button>
                          </div>
                          {aboutContent.teamImage && (
                            <div className="w-32 h-20 flex-shrink-0">
                              <img
                                src={aboutContent.teamImage}
                                alt="團隊區塊預覽"
                                className="w-full h-full object-cover rounded-lg border border-gray-200"
                              />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              團隊標題
                            </label>
                            <input
                              type="text"
                              value={aboutContent.teamTitle}
                              onChange={(e) => setAboutContent({ ...aboutContent, teamTitle: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              團隊副標題
                            </label>
                            <input
                              type="text"
                              value={aboutContent.teamSubtitle}
                              onChange={(e) => setAboutContent({ ...aboutContent, teamSubtitle: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            團隊介紹
                          </label>
                          <textarea
                            value={aboutContent.teamDescription}
                            onChange={(e) => setAboutContent({ ...aboutContent, teamDescription: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                          />
                        </div>

                        {/* 團隊成員管理 */}
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            團隊成員管理
                          </label>
                          <div className="space-y-6">
                            {aboutContent.teamMembers.map((member, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-lg font-medium text-gray-900">
                                    成員 {index + 1}
                                  </h4>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newMembers = aboutContent.teamMembers.filter((_, i) => i !== index);
                                      setAboutContent({ ...aboutContent, teamMembers: newMembers });
                                    }}
                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                  >
                                    <i className="ri-delete-bin-line"></i>
                                  </button>
                                </div>

                                {/* 成員照片設定 */}
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    成員照片
                                  </label>
                                  <div className="flex items-start space-x-4">
                                    <div className="flex-1">
                                      <input
                                        type="url"
                                        value={member.image}
                                        onChange={(e) => {
                                          const newMembers = [...aboutContent.teamMembers];
                                          newMembers[index].image = e.target.value;
                                          setAboutContent({ ...aboutContent, teamMembers: newMembers });
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                        placeholder="請輸入成員照片網址"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const prompts = [
                                            'Professional Asian business founder CEO in elegant business suit with confident warm smile modern office background professional headshot portrait high quality',
                                            'Professional Asian creative director woman in stylish business attire with artistic background creative workspace with warm smile confident expression professional portrait',
                                            'Professional Asian operations manager man in formal business shirt with organized office background logistics planning materials confident smile professional headshot',
                                            'Professional Filipino local coordinator woman in business attire with warm friendly smile cultural bridge background Philippines setting professional portrait confident expression',
                                            'Professional Asian customer service director woman with warm welcoming smile modern office reception area professional business attire confident expression service oriented',
                                            'Professional Asian technical director man with modern audiovisual equipment background technology setup professional business attire confident smile tech expertise'
                                          ];
                                          const newImage = generateImageUrl(prompts[index % prompts.length], 400, 400);
                                          const newMembers = [...aboutContent.teamMembers];
                                          newMembers[index].image = newImage;
                                          setAboutContent({ ...aboutContent, teamMembers: newMembers });
                                        }}
                                        className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                                      >
                                        <i className="ri-refresh-line mr-2"></i>
                                        重新生成圖片
                                      </button>
                                    </div>
                                    {member.image && (
                                      <div className="w-20 h-20 flex-shrink-0">
                                        <img
                                          src={member.image}
                                          alt={`${member.name}預覽`}
                                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      姓名
                                    </label>
                                    <input
                                      type="text"
                                      value={member.name}
                                      onChange={(e) => {
                                        const newMembers = [...aboutContent.teamMembers];
                                        newMembers[index].name = e.target.value;
                                        setAboutContent({ ...aboutContent, teamMembers: newMembers });
                                      }}
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                      placeholder="請輸入姓名"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      職位
                                    </label>
                                    <input
                                      type="text"
                                      value={member.position}
                                      onChange={(e) => {
                                        const newMembers = [...aboutContent.teamMembers];
                                        newMembers[index].position = e.target.value;
                                        setAboutContent({ ...aboutContent, teamMembers: newMembers });
                                      }}
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                      placeholder="請輸入職位"
                                    />
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    個人介紹
                                  </label>
                                  <textarea
                                    value={member.description}
                                    onChange={(e) => {
                                      const newMembers = [...aboutContent.teamMembers];
                                      newMembers[index].description = e.target.value;
                                      setAboutContent({ ...aboutContent, teamMembers: newMembers });
                                    }}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                    placeholder="請輸入個人介紹"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    專長領域 (用逗號分隔)
                                  </label>
                                  <input
                                    type="text"
                                    value={member.specialties.join(', ')}
                                    onChange={(e) => {
                                      const newMembers = [...aboutContent.teamMembers];
                                      newMembers[index].specialties = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                                      setAboutContent({ ...aboutContent, teamMembers: newMembers });
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                    placeholder="例如：策略規劃, 客戶關係, 品質控管"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* 添加新成員按鈕 */}
                          <button
                            type="button"
                            onClick={() => {
                              const newMember = {
                                name: '',
                                position: '',
                                description: '',
                                specialties: [],
                                image: ''
                              };
                              setAboutContent({
                                ...aboutContent,
                                teamMembers: [...aboutContent.teamMembers, newMember]
                              });
                            }}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap text-sm flex items-center"
                          >
                            <i className="ri-add-line mr-2"></i>
                            新增團隊成員
                          </button>
                        </div>
                      </div>

                      {/* 公司理念區塊 */}
                      <div className="border-b border-gray-200 pb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <i className="ri-lightbulb-line mr-2 text-lime-600"></i>
                          公司理念區塊
                        </h3>

                        {/* 理念區塊圖片設定 */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            理念區塊圖片
                          </label>
                          <div className="flex items-start space-x-4">
                            <div className="flex-1">
                              <input
                                type="url"
                                value={aboutContent.philosophyImage}
                                onChange={(e) => setAboutContent({ ...aboutContent, philosophyImage: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                placeholder="請輸入圖片網址"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImage = generateImageUrl('Company philosophy and values with elegant design modern office setting professional workspace inspiration creativity teamwork Philippines business');
                                  setAboutContent({ ...aboutContent, philosophyImage: newImage });
                                }}
                                className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                              >
                                <i className="ri-refresh-line mr-2"></i>
                                重新生成圖片
                              </button>
                            </div>
                            {aboutContent.philosophyImage && (
                              <div className="w-32 h-20 flex-shrink-0">
                                <img
                                  src={aboutContent.philosophyImage}
                                  alt="理念區塊預覽"
                                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                                />
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                理念標題
                              </label>
                              <input
                                type="text"
                                value={aboutContent.philosophyTitle}
                                onChange={(e) => setAboutContent({ ...aboutContent, philosophyTitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                理念副標題
                              </label>
                              <input
                                type="text"
                                value={aboutContent.philosophySubtitle}
                                onChange={(e) => setAboutContent({ ...aboutContent, philosophySubtitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              理念內容
                            </label>
                            <textarea
                              value={aboutContent.philosophyContent}
                              onChange={(e) => setAboutContent({ ...aboutContent, philosophyContent: e.target.value })}
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        {/* 服務流程區塊 */}
                        <div className="pb-8">
                          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <i className="ri-route-line mr-2 text-lime-600"></i>
                            服務流程區塊
                          </h3>

                          {/* 流程區塊圖片設定 */}
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              流程區塊圖片
                            </label>
                            <div className="flex items-start space-x-4">
                              <div className="flex-1">
                                <input
                                  type="url"
                                  value={aboutContent.processImage}
                                  onChange={(e) => setAboutContent({ ...aboutContent, processImage: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                  placeholder="請輸入圖片網址"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newImage = generateImageUrl('Event planning process workflow with professional team coordination planning stages execution steps modern office Philippines business process');
                                    setAboutContent({ ...aboutContent, processImage: newImage });
                                  }}
                                  className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                                >
                                  <i className="ri-refresh-line mr-2"></i>
                                  重新生成圖片
                                </button>
                              </div>
                              {aboutContent.processImage && (
                                <div className="w-32 h-20 flex-shrink-0">
                                  <img
                                    src={aboutContent.processImage}
                                    alt="流程區塊預覽"
                                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  流程標題
                                </label>
                                <input
                                  type="text"
                                  value={aboutContent.processTitle}
                                  onChange={(e) => setAboutContent({ ...aboutContent, processTitle: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  流程副標題
                                </label>
                                <input
                                  type="text"
                                  value={aboutContent.processSubtitle}
                                  onChange={(e) => setAboutContent({ ...aboutContent, processSubtitle: e.target.value })}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                />
                              </div>
                            </div>

                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                流程描述
                              </label>
                              <textarea
                                value={aboutContent.processDescription}
                                onChange={(e) => setAboutContent({ ...aboutContent, processDescription: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSave('about')}
                          disabled={isSaving}
                          className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                        >
                          {isSaving ? '儲存中...' : '儲存變更'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 服務內容 */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                {/* 服務頁面主圖片設定 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    服務頁面主圖片
                  </label>
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={servicesContent.servicesImage}
                        onChange={(e) => setServicesContent({ ...servicesContent, servicesImage: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder="請輸入圖片網址"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImage = generateImageUrl('Comprehensive event services showcase with venue setup coordination planning execution professional team Philippines events');
                          setServicesContent({ ...servicesContent, servicesImage: newImage });
                        }}
                        className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                      >
                        <i className="ri-refresh-line mr-2"></i>
                        重新生成圖片
                      </button>
                    </div>
                    {servicesContent.servicesImage && (
                      <div className="w-32 h-20 flex-shrink-0">
                        <img
                          src={servicesContent.servicesImage}
                          alt="服務頁面預覽"
                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    服務頁面標題
                  </label>
                  <input
                    type="text"
                    value={servicesContent.title}
                    onChange={(e) => setServicesContent({ ...servicesContent, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    服務副標題
                  </label>
                  <input
                    type="text"
                    value={servicesContent.subtitle}
                    onChange={(e) => setServicesContent({ ...servicesContent, subtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    服務項目
                  </label>
                  <div className="space-y-4">
                    {servicesContent.services.map((service, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => {
                              const newServices = [...servicesContent.services];
                              newServices[index].name = e.target.value;
                              setServicesContent({ ...servicesContent, services: newServices });
                            }}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            placeholder="服務名稱"
                          />
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => {
                              const newServices = [...servicesContent.services];
                              newServices[index].description = e.target.value;
                              setServicesContent({ ...servicesContent, services: newServices });
                            }}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            placeholder="服務描述"
                          />
                        </div>

                        {/* 服務項目圖片設定 */}
                        <div className="flex items-start space-x-4">
                          <div className="flex-1">
                            <input
                              type="url"
                              value={service.image}
                              onChange={(e) => {
                                const newServices = [...servicesContent.services];
                                newServices[index].image = e.target.value;
                                setServicesContent({ ...servicesContent, services: newServices });
                              }}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                              placeholder="請輸入服務圖片網址"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const descriptions = [
                                  'Event planning coordination with professional planners working on event concepts creative brainstorming session modern office',
                                  'Visual design and decoration for events with elegant floral arrangements lighting design stage setup beautiful venue Philippines',
                                  'Professional event execution team coordinating successful event with guests enjoying elegant venue setup Philippines celebration'
                                ];
                                const newImage = generateImageUrl(descriptions[index % descriptions.length], 400, 300);
                                const newServices = [...servicesContent.services];
                                newServices[index].image = newImage;
                                setServicesContent({ ...servicesContent, services: newServices });
                              }}
                              className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap text-sm"
                            >
                              <i className="ri-refresh-line mr-2"></i>
                              重新生成圖片
                            </button>
                          </div>
                          {service.image && (
                            <div className="w-24 h-16 flex-shrink-0">
                              <img
                                src={service.image}
                                alt={`${service.name}預覽`}
                                className="w-full h-full object-cover rounded-lg border border-gray-200"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSave('services')}
                  disabled={isSaving}
                  className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  {isSaving ? '儲存中...' : '儲存變更'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
