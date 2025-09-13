
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

interface PortfolioDetailProps {
  portfolioId: string;
}

export default function PortfolioDetail({ portfolioId }: PortfolioDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      overview: '專案總覽',
      client: '客戶',
      eventType: '活動',
      services: '服務',
      challenge: '客戶的挑戰',
      solution: '我們的解決方案',
      results: '成果與亮點',
      gallery: '活動照片集錦',
      backToList: '返回案例列表'
    },
    en: {
      overview: 'Project Overview',
      client: 'Client',
      eventType: 'Event Type',
      services: 'Services',
      challenge: 'Client Challenge',
      solution: 'Our Solution',
      results: 'Results & Highlights',
      gallery: 'Event Photo Gallery',
      backToList: 'Back to Portfolio'
    }
  };

  const t = translations[language as keyof typeof translations];

  const portfolioData = {
    zh: {
      '1': {
        title: 'NEXUS科技5G新品全球發表會',
        client: 'NEXUS科技',
        eventType: '科技產品發表會',
        services: ['整體策劃', '視覺設計', '媒體公關', '技術支援'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Spectacular%20high-tech%205G%20product%20launch%20event%20main%20stage%20with%20giant%20holographic%20displays%20advanced%20technology%20presentation%20corporate%20executives%20announcing%20revolutionary%205G%20innovation%20Manila%20Philippines%20modern%20conference%20center%20packed%20international%20audience%20professional%20lighting&width=1400&height=600&seq=nexus-banner-1&orientation=landscape',
        challenge: 'NEXUS科技需要在菲律賓首次發表革命性5G技術產品，要求在600人規模的國際發表會中展現技術領先地位，吸引全球媒體關注並建立品牌權威。',
        solution: [
          '選擇馬尼拉頂級國際會議中心，打造科技感十足的發表舞台',
          '運用全息投影技術展示5G產品特色，創造震撼視覺效果',
          '邀請國際科技媒體、業界專家及政府官員，提升活動權威性',
          '設計互動體驗區，讓來賓親身體驗5G技術的革命性應用'
        ],
        results: [
          { icon: 'ri-global-line', number: '50+', text: '國際媒體報導' },
          { icon: 'ri-user-line', number: '600+', text: '業界精英出席' },
          { icon: 'ri-trophy-line', number: '95%', text: '客戶滿意度' },
          { icon: 'ri-eye-line', number: '5M+', text: '全球媒體觸及' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=High-tech%205G%20product%20launch%20main%20stage%20with%20holographic%20displays%20advanced%20lighting%20systems%20corporate%20executives%20presenting%20cutting-edge%20technology%20Manila%20Philippines%20international%20conference%20center%20professional%20atmosphere&width=800&height=600&seq=nexus-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Corporate%20CEO%20presenting%205G%20innovation%20on%20futuristic%20stage%20with%20LED%20screens%20audience%20applauding%20business%20formal%20setting%20technology%20conference%20Philippines%20professional%20photography&width=800&height=600&seq=nexus-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Interactive%205G%20technology%20demonstration%20booth%20with%20visitors%20testing%20products%20hands-on%20experience%20modern%20displays%20corporate%20branding%20Philippines%20tech%20exhibition&width=800&height=600&seq=nexus-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=International%20media%20interview%20area%20with%20branded%20backdrop%20journalists%20interviewing%20executives%20professional%20setup%205G%20technology%20launch%20Philippines%20press%20conference&width=800&height=600&seq=nexus-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=VIP%20networking%20reception%20area%20with%20elegant%20setup%20branded%20displays%20business%20professionals%20mingling%20modern%20venue%20Philippines%20technology%20event&width=800&height=600&seq=nexus-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Award%20ceremony%20moment%20with%20NEXUS%20executives%20receiving%20technology%20innovation%20recognition%20professional%20photography%20corporate%20celebration%20Philippines%20formal%20setting&width=800&height=600&seq=nexus-gallery-6&orientation=landscape'
        ]
      },
      '2': {
        title: 'GOLDEN TOWER商業大樓盛大開幕',
        client: 'GOLDEN TOWER地產集團',
        eventType: '商業地標開幕典禮',
        services: ['開幕典禮策劃', 'VIP接待', '媒體公關', '現場執行'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Magnificent%20commercial%20tower%20grand%20opening%20ceremony%20with%20red%20carpet%20entrance%20ribbon%20cutting%20VIP%20guests%20elegant%20golden%20decorations%20luxury%20skyscraper%20Manila%20Philippines%20landmark%20building%20celebration&width=1400&height=600&seq=golden-banner-2&orientation=landscape',
        challenge: 'GOLDEN TOWER作為馬尼拉新地標需要舉辦盛大開幕典禮，要展現建築奢華品質，吸引政商界重要人士參與，建立高端商業形象。',
        solution: [
          '設計金色主題視覺，搭配紅毯迎賓儀式展現奢華氛圍',
          '邀請市長、商會主席等重要人士出席剪綵典禮',
          '安排專業攝影團隊記錄歷史性開幕時刻',
          '規劃VIP導覽行程，展示大樓頂級設施與服務'
        ],
        results: [
          { icon: 'ri-vip-crown-line', number: '200+', text: '政商界VIP出席' },
          { icon: 'ri-camera-line', number: '25+', text: '媒體現場報導' },
          { icon: 'ri-building-line', number: '100%', text: '租賃率達成' },
          { icon: 'ri-star-line', number: '5星', text: '客戶評價滿分' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Luxurious%20commercial%20tower%20ribbon%20cutting%20ceremony%20with%20mayor%20and%20executives%20golden%20decorations%20red%20carpet%20professional%20photography%20Philippines%20landmark%20opening&width=800&height=600&seq=golden-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Elegant%20VIP%20reception%20lobby%20with%20golden%20theme%20decorations%20flower%20arrangements%20luxury%20furniture%20political%20and%20business%20leaders%20networking%20Philippines%20formal%20setting&width=800&height=600&seq=golden-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Guided%20building%20tour%20showing%20premium%20office%20spaces%20modern%20facilities%20city%20views%20executives%20presenting%20to%20VIP%20guests%20Philippines%20commercial%20property&width=800&height=600&seq=golden-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Media%20interview%20corner%20with%20corporate%20branding%20backdrop%20journalists%20interviewing%20property%20executives%20professional%20setup%20Philippines%20real%20estate%20event&width=800&height=600&seq=golden-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Celebration%20toast%20moment%20with%20champagne%20glasses%20VIP%20guests%20congratulating%20successful%20opening%20luxury%20commercial%20building%20Philippines%20business%20celebration&width=800&height=600&seq=golden-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Spectacular%20building%20exterior%20illumination%20at%20night%20with%20golden%20lighting%20landmark%20tower%20against%20Manila%20skyline%20opening%20celebration%20Philippines%20architecture&width=800&height=600&seq=golden-gallery-6&orientation=landscape'
        ]
      },
      '3': {
        title: '薄荷島天堂海灘夢幻婚禮',
        client: 'Michael & Sarah',
        eventType: '奢華海島婚禮',
        services: ['婚禮策劃', '現場佈置', '攝影攝像', '賓客接待'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Breathtaking%20luxury%20beach%20wedding%20ceremony%20Bohol%20island%20sunset%20golden%20hour%20white%20elegant%20floral%20arch%20crystal%20turquoise%20water%20palm%20trees%20paradise%20tropical%20setting%20romantic%20atmosphere%20Philippines%20destination%20wedding&width=1400&height=600&seq=bohol-banner-3&orientation=landscape',
        challenge: '新人希望在薄荷島舉辦完美海島婚禮，需要協調80位國際賓客的住宿交通，並在熱帶氣候下確保婚禮順利進行，創造終生難忘的浪漫體驗。',
        solution: [
          '選擇薄荷島最美海灘位置，安排完美日落時刻的儀式',
          '設計白色奢華主題佈置，與自然海景完美融合',
          '協調五星級度假村住宿，提供賓客完整接待服務',
          '安排專業婚攝團隊，記錄每個珍貴浪漫瞬間'
        ],
        results: [
          { icon: 'ri-heart-line', number: '80', text: '位國際賓客' },
          { icon: 'ri-sun-line', number: '完美', text: '日落婚禮時刻' },
          { icon: 'ri-camera-2-line', number: '800+', text: '張精美婚照' },
          { icon: 'ri-emotion-happy-line', number: '永恆', text: '美好回憶' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Romantic%20beach%20wedding%20ceremony%20white%20elegant%20floral%20arch%20crystal%20turquoise%20ocean%20sunset%20golden%20light%20intimate%20gathering%20Bohol%20Philippines%20paradise%20tropical%20setting&width=800&height=600&seq=bohol-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Luxury%20beach%20wedding%20reception%20elegant%20white%20table%20settings%20with%20ocean%20view%20candles%20flowers%20tropical%20decorations%20Bohol%20Philippines%20romantic%20dinner%20paradise&width=800&height=600&seq=bohol-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Wedding%20couple%20walking%20barefoot%20on%20pristine%20white%20sand%20beach%20sunset%20romantic%20moment%20Bohol%20Philippines%20tropical%20paradise%20celebration%20love&width=800&height=600&seq=bohol-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Wedding%20guests%20enjoying%20cocktail%20hour%20on%20beach%20resort%20elegant%20casual%20tropical%20attire%20Bohol%20Philippines%20paradise%20celebration%20social%20gathering&width=800&height=600&seq=bohol-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Bride%20and%20groom%20exchanging%20vows%20under%20white%20floral%20arch%20with%20ocean%20backdrop%20emotional%20moment%20tropical%20paradise%20Bohol%20Philippines%20romantic%20ceremony&width=800&height=600&seq=bohol-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Wedding%20party%20celebration%20dancing%20on%20beach%20under%20starry%20night%20with%20fairy%20lights%20tropical%20paradise%20Bohol%20Philippines%20romantic%20celebration&width=800&height=600&seq=bohol-gallery-6&orientation=landscape'
        ]
      },
      '4': {
        title: 'PACIFIC集團20週年慶典晚宴',
        client: 'PACIFIC集團',
        eventType: '企業週年慶典',
        services: ['慶典策劃', '晚宴設計', '娛樂節目', '獎項典禮'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Elegant%20corporate%2020th%20anniversary%20gala%20dinner%20luxury%20ballroom%20golden%20decorations%20corporate%20branding%20five-star%20hotel%20Manila%20Philippines%20formal%20business%20celebration&width=1400&height=600&seq=pacific-banner-4&orientation=landscape',
        challenge: 'PACIFIC集團20週年慶典需要展現企業成就與未來願景，在500人規模的正式晚宴中平衡莊重與歡慶氛圍，強化員工向心力與品牌形象。',
        solution: [
          '選擇五星級酒店豪華宴會廳，打造企業黃金主題裝潢',
          '規劃企業發展歷程展示，回顧20年重要里程碑',
          '安排傑出員工表揚典禮，提升內部凝聚力',
          '邀請知名表演團體，營造溫馨而專業的慶祝氛围'
        ],
        results: [
          { icon: 'ri-trophy-line', number: '500+', text: '位員工與貴賓' },
          { icon: 'ri-award-line', number: '50+', text: '位優秀員工表揚' },
          { icon: 'ri-time-line', number: '20年', text: '企業發展歷程' },
          { icon: 'ri-team-line', number: '100%', text: '團隊凝聚力提升' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Elegant%20corporate%20anniversary%20gala%20dinner%20with%20golden%20theme%20decorations%20five-star%20hotel%20formal%20business%20celebration%20Manila%20Philippines&width=800&height=600&seq=pacific-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Corporate%20CEO%20giving%20anniversary%20speech%20on%20stage%20with%20company%20logo%20backdrop%20formal%20business%20attire%20Philippines%20professional%20celebration&width=800&height=600&seq=pacific-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Employee%20recognition%20award%20ceremony%20with%20trophy%20presentation%20corporate%20executives%20congratulating%20outstanding%20staff%20Philippines%20business%20celebration&width=800&height=600&seq=pacific-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Corporate%20anniversary%20timeline%20display%20showcasing%2020%20years%20development%20milestones%20with%20professional%20exhibition%20setup%20Philippines%20business%20event&width=800&height=600&seq=pacific-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Elegant%20corporate%20dinner%20setting%20with%20round%20tables%20fine%20dining%20professional%20entertainment%20performance%20Philippines%20formal%20business%20celebration&width=800&height=600&seq=pacific-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Corporate%20team%20toast%20celebration%20with%20champagne%20glasses%20employees%20and%20executives%20celebrating%2020th%20anniversary%20Philippines%20business%20milestone&width=800&height=600&seq=pacific-gallery-6&orientation=landscape'
        ]
      },
      '5': {
        title: 'SOPHIA名媛50歲生日派對',
        client: 'SOPHIA女士',
        eventType: '奢華私人生日派對',
        services: ['主題策劃', '場地佈置', '賓客服務', '娛樂安排'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Luxurious%2050th%20birthday%20party%20elegant%20gold%20and%20white%20theme%20decorations%20upscale%20venue%20sophisticated%20celebration%20high-end%20social%20event%20Manila%20Philippines%20glamorous%20setting&width=1400&height=600&seq=sophia-banner-5&orientation=landscape',
        challenge: 'SOPHIA女士希望為50歲生日舉辦難忘的奢華派對，需要在優雅氛圍中接待120位社交圈貴賓，展現個人品味與社會地位。',
        solution: [
          '設計金白色奢華主題，融合現代與經典元素',
          '選擇頂級私人會所，提供專屬貴賓級服務',
          '安排精緻法式料理與香檳酒會，滿足挑剔味蕾',
          '邀請爵士樂團現場演奏，營造優雅社交氛圍'
        ],
        results: [
          { icon: 'ri-vip-diamond-line', number: '120', text: '位社交界貴賓' },
          { icon: 'ri-music-line', number: '現場', text: '爵士樂團演奏' },
          { icon: 'ri-restaurant-line', number: '米其林', text: '級別料理服務' },
          { icon: 'ri-emotion-laugh-line', number: '完美', text: '生日慶祝體驗' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Luxurious%2050th%20birthday%20party%20elegant%20gold%20and%20white%20decorations%20sophisticated%20guests%20in%20formal%20attire%20Manila%20Philippines%20upscale%20social%20celebration&width=800&height=600&seq=sophia-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Elegant%20birthday%20cake%20presentation%20ceremony%20with%20candles%20sophisticated%20party%20setup%20luxury%20venue%20Philippines%20glamorous%20celebration&width=800&height=600&seq=sophia-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Jazz%20band%20performance%20at%20luxury%20birthday%20party%20sophisticated%20guests%20enjoying%20live%20music%20elegant%20venue%20Manila%20Philippines%20social%20event&width=800&height=600&seq=sophia-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Elegant%20cocktail%20reception%20with%20champagne%20service%20sophisticated%20guests%20networking%20luxury%20birthday%20party%20Manila%20Philippines%20upscale%20social%20gathering&width=800&height=600&seq=sophia-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Birthday%20celebration%20toast%20moment%20with%20elegant%20guests%20raising%20glasses%20sophisticated%20party%20atmosphere%20Manila%20Philippines%20luxury%20social%20event&width=800&height=600&seq=sophia-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Luxury%20birthday%20party%20photo%20booth%20area%20with%20elegant%20decorations%20guests%20taking%20memorable%20photos%20Manila%20Philippines%20sophisticated%20celebration&width=800&height=600&seq=sophia-gallery-6&orientation=landscape'
        ]
      },
      '6': {
        title: 'INNOVATE新創產品發表記者會',
        client: 'INNOVATE新創公司',
        eventType: '科技產品發表會',
        services: ['媒體策劃', '產品展示', '記者會執行', '公關服務'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Modern%20startup%20product%20launch%20press%20conference%20sleek%20presentation%20stage%20innovative%20technology%20display%20media%20reporters%20professional%20atmosphere%20Manila%20Philippines%20tech%20event&width=1400&height=600&seq=innovate-banner-6&orientation=landscape',
        challenge: 'INNOVATE新創公司首次產品發表需要在有限預算下吸引50家媒體關注，建立品牌知名度並獲得市場認可。',
        solution: [
          '設計現代簡約發表會場，突出產品創新特色',
          '邀請科技媒體與業界意見領袖，確保有效傳播',
          '安排產品體驗區，讓媒體親身感受產品價值',
          '提供詳細新聞資料包，協助媒體深度報導'
        ],
        results: [
          { icon: 'ri-newspaper-line', number: '50+', text: '家媒體出席' },
          { icon: 'ri-rocket-line', number: '3倍', text: '品牌知名度提升' },
          { icon: 'ri-hand-heart-line', number: '25+', text: '家投資機構關注' },
          { icon: 'ri-trending-up-line', number: '200%', text: '網站流量增長' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Modern%20startup%20product%20launch%20press%20conference%20with%20CEO%20presenting%20innovative%20technology%20to%20media%20reporters%20professional%20stage%20Manila%20Philippines%20tech%20event&width=800&height=600&seq=innovate-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Product%20demonstration%20booth%20with%20interactive%20displays%20startup%20innovation%20showcase%20media%20trying%20products%20tech%20press%20conference%20Philippines&width=800&height=600&seq=innovate-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Media%20interview%20session%20with%20startup%20founders%20journalists%20asking%20questions%20professional%20setup%20Philippines%20tech%20press%20conference&width=800&height=600&seq=innovate-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Networking%20session%20with%20media%20representatives%20and%20startup%20team%20business%20cards%20exchange%20Philippines%20tech%20industry%20event&width=800&height=600&seq=innovate-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Product%20showcase%20area%20with%20detailed%20information%20displays%20media%20taking%20photos%20startup%20innovation%20Philippines%20tech%20press%20conference&width=800&height=600&seq=innovate-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Startup%20team%20celebration%20after%20successful%20product%20launch%20press%20conference%20team%20photo%20with%20media%20Philippines%20tech%20achievement&width=800&height=600&seq=innovate-gallery-6&orientation=landscape'
        ]
      }
    },
    en: {
      '1': {
        title: 'NEXUS Tech 5G Product Global Launch Event',
        client: 'NEXUS Technology',
        eventType: 'Tech Product Launch',
        services: ['Overall Planning', 'Visual Design', 'Media PR', 'Technical Support'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Spectacular%20high-tech%205G%20product%20launch%20event%20main%20stage%20with%20giant%20holographic%20displays%20advanced%20technology%20presentation%20corporate%20executives%20announcing%20revolutionary%205G%20innovation%20Manila%20Philippines%20modern%20conference%20center%20packed%20international%20audience%20professional%20lighting&width=1400&height=600&seq=nexus-banner-1&orientation=landscape',
        challenge: 'NEXUS Technology needed to launch revolutionary 5G technology products for the first time in the Philippines, requiring demonstration of technological leadership at an international launch event for 600 people, attracting global media attention and establishing brand authority.',
        solution: [
          'Selected Manila\'s top international conference center to create a tech-savvy launch stage',
          'Utilized holographic projection technology to showcase 5G product features, creating stunning visual effects',
          'Invited international tech media, industry experts, and government officials to enhance event authority',
          'Designed interactive experience zones for guests to personally experience revolutionary 5G technology applications'
        ],
        results: [
          { icon: 'ri-global-line', number: '50+', text: 'International Media Coverage' },
          { icon: 'ri-user-line', number: '600+', text: 'Industry Elites Attended' },
          { icon: 'ri-trophy-line', number: '95%', text: 'Client Satisfaction' },
          { icon: 'ri-eye-line', number: '5M+', text: 'Global Media Reach' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=High-tech%205G%20product%20launch%20main%20stage%20with%20holographic%20displays%20advanced%20lighting%20systems%20corporate%20executives%20presenting%20cutting-edge%20technology%20Manila%20Philippines%20international%20conference%20center%20professional%20atmosphere&width=800&height=600&seq=nexus-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Corporate%20CEO%20presenting%205G%20innovation%20on%20futuristic%20stage%20with%20LED%20screens%20audience%20applauding%20business%20formal%20setting%20technology%20conference%20Philippines%20professional%20photography&width=800&height=600&seq=nexus-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Interactive%205G%20technology%20demonstration%20booth%20with%20visitors%20testing%20products%20hands-on%20experience%20modern%20displays%20corporate%20branding%20Philippines%20tech%20exhibition&width=800&height=600&seq=nexus-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=International%20media%20interview%20area%20with%20branded%20backdrop%20journalists%20interviewing%20executives%20professional%20setup%205G%20technology%20launch%20Philippines%20press%20conference&width=800&height=600&seq=nexus-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=VIP%20networking%20reception%20area%20with%20elegant%20setup%20branded%20displays%20business%20professionals%20mingling%20modern%20venue%20Philippines%20technology%20event&width=800&height=600&seq=nexus-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Award%20ceremony%20moment%20with%20NEXUS%20executives%20receiving%20technology%20innovation%20recognition%20professional%20photography%20corporate%20celebration%20Philippines%20formal%20setting&width=800&height=600&seq=nexus-gallery-6&orientation=landscape'
        ]
      },
      '2': {
        title: 'GOLDEN TOWER Commercial Building Grand Opening',
        client: 'GOLDEN TOWER Real Estate Group',
        eventType: 'Commercial Landmark Opening Ceremony',
        services: ['Opening Ceremony Planning', 'VIP Reception', 'Media PR', 'On-site Execution'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Magnificent%20commercial%20tower%20grand%20opening%20ceremony%20with%20red%20carpet%20entrance%20ribbon%20cutting%20VIP%20guests%20elegant%20golden%20decorations%20luxury%20skyscraper%20Manila%20Philippines%20landmark%20building%20celebration&width=1400&height=600&seq=golden-banner-2&orientation=landscape',
        challenge: 'GOLDEN TOWER as Manila\'s new landmark needed to hold a grand opening ceremony to showcase the building\'s luxury quality, attract important figures from political and business circles, and establish a high-end commercial image.',
        solution: [
          'Designed golden themed visuals with red carpet welcoming ceremony to showcase luxury atmosphere',
          'Invited mayor, chamber of commerce chairman and other important figures to attend the ribbon cutting ceremony',
          'Arranged professional photography team to record the historic opening moment',
          'Planned VIP tour program to showcase the building\'s top-tier facilities and services'
        ],
        results: [
          { icon: 'ri-vip-crown-line', number: '200+', text: 'Political & Business VIPs Attended' },
          { icon: 'ri-camera-line', number: '25+', text: 'On-site Media Coverage' },
          { icon: 'ri-building-line', number: '100%', text: 'Occupancy Rate Achieved' },
          { icon: 'ri-star-line', number: '5 Star', text: 'Perfect Client Rating' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Luxurious%20commercial%20tower%20ribbon%20cutting%20ceremony%20with%20mayor%20and%20executives%20golden%20decorations%20red%20carpet%20professional%20photography%20Philippines%20landmark%20opening&width=800&height=600&seq=golden-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Elegant%20VIP%20reception%20lobby%20with%20golden%20theme%20decorations%20flower%20arrangements%20luxury%20furniture%20political%20and%20business%20leaders%20networking%20Philippines%20formal%20setting&width=800&height=600&seq=golden-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Guided%20building%20tour%20showing%20premium%20office%20spaces%20modern%20facilities%20city%20views%20executives%20presenting%20to%20VIP%20guests%20Philippines%20commercial%20property&width=800&height=600&seq=golden-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Media%20interview%20corner%20with%20corporate%20branding%20backdrop%20journalists%20interviewing%20property%20executives%20professional%20setup%20Philippines%20real%20estate%20event&width=800&height=600&seq=golden-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Celebration%20toast%20moment%20with%20champagne%20glasses%20VIP%20guests%20congratulating%20successful%20opening%20luxury%20commercial%20building%20Philippines%20business%20celebration&width=800&height=600&seq=golden-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Spectacular%20building%20exterior%20illumination%20at%20night%20with%20golden%20lighting%20landmark%20tower%20against%20Manila%20skyline%20opening%20celebration%20Philippines%20architecture&width=800&height=600&seq=golden-gallery-6&orientation=landscape'
        ]
      },
      '3': {
        title: 'Bohol Paradise Beach Dream Wedding',
        client: 'Michael & Sarah',
        eventType: 'Luxury Island Wedding',
        services: ['Wedding Planning', 'Venue Decoration', 'Photography & Videography', 'Guest Reception'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Breathtaking%20luxury%20beach%20wedding%20ceremony%20Bohol%20island%20sunset%20golden%20hour%20white%20elegant%20floral%20arch%20crystal%20turquoise%20water%20palm%20trees%20paradise%20tropical%20setting%20romantic%20atmosphere%20Philippines%20destination%20wedding&width=1400&height=600&seq=bohol-banner-3&orientation=landscape',
        challenge: 'The couple wanted to hold a perfect island wedding in Bohol, needing to coordinate accommodation and transportation for 80 international guests, ensure smooth wedding proceedings under tropical climate, and create unforgettable romantic experiences.',
        solution: [
          'Selected the most beautiful beach location in Bohol, arranged ceremony at perfect sunset time',
          'Designed white luxury themed decorations perfectly integrated with natural seascape',
          'Coordinated five-star resort accommodation, providing complete guest reception services',
          'Arranged professional wedding photography team to capture every precious romantic moment'
        ],
        results: [
          { icon: 'ri-heart-line', number: '80', text: 'International Guests' },
          { icon: 'ri-sun-line', number: 'Perfect', text: 'Sunset Wedding Moment' },
          { icon: 'ri-camera-2-line', number: '800+', text: 'Beautiful Wedding Photos' },
          { icon: 'ri-emotion-happy-line', number: 'Eternal', text: 'Beautiful Memories' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Romantic%20beach%20wedding%20ceremony%20white%20elegant%20floral%20arch%20crystal%20turquoise%20ocean%20sunset%20golden%20light%20intimate%20gathering%20Bohol%20Philippines%20paradise%20tropical%20setting&width=800&height=600&seq=bohol-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Luxury%20beach%20wedding%20reception%20elegant%20white%20table%20settings%20with%20ocean%20view%20candles%20flowers%20tropical%20decorations%20Bohol%20Philippines%20romantic%20dinner%20paradise&width=800&height=600&seq=bohol-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Wedding%20couple%20walking%20barefoot%20on%20pristine%20white%20sand%20beach%20sunset%20romantic%20moment%20Bohol%20Philippines%20tropical%20paradise%20celebration%20love&width=800&height=600&seq=bohol-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Wedding%20guests%20enjoying%20cocktail%20hour%20on%20beach%20resort%20elegant%20casual%20tropical%20attire%20Bohol%20Philippines%20paradise%20celebration%20social%20gathering&width=800&height=600&seq=bohol-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Bride%20and%20groom%20exchanging%20vows%20under%20white%20floral%20arch%20with%20ocean%20backdrop%20emotional%20moment%20tropical%20paradise%20Bohol%20Philippines%20romantic%20ceremony&width=800&height=600&seq=bohol-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Wedding%20party%20celebration%20dancing%20on%20beach%20under%20starry%20night%20with%20fairy%20lights%20tropical%20paradise%20Bohol%20Philippines%20romantic%20celebration&width=800&height=600&seq=bohol-gallery-6&orientation=landscape'
        ]
      },
      '4': {
        title: 'PACIFIC Group 20th Anniversary Gala Dinner',
        client: 'PACIFIC Group',
        eventType: 'Corporate Anniversary Celebration',
        services: ['Gala Planning', 'Dinner Design', 'Entertainment Program', 'Award Ceremony'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Elegant%20corporate%2020th%20anniversary%20gala%20dinner%20luxury%20ballroom%20golden%20decorations%20corporate%20branding%20five-star%20hotel%20Manila%20Philippines%20formal%20business%20celebration&width=1400&height=600&seq=pacific-banner-4&orientation=landscape',
        challenge: 'PACIFIC Group\'s 20th anniversary celebration needed to showcase corporate achievements and future vision, balance solemnity and celebration atmosphere in a 500-person formal dinner, and strengthen employee cohesion and brand image.',
        solution: [
          'Selected five-star hotel luxury ballroom, created corporate golden themed decoration',
          'Planned corporate development history showcase, reviewing 20 years of important milestones',
          'Arranged outstanding employee recognition ceremony to enhance internal cohesion',
          'Invited renowned performance groups to create warm yet professional celebration atmosphere'
        ],
        results: [
          { icon: 'ri-trophy-line', number: '500+', text: 'Employees & VIPs' },
          { icon: 'ri-award-line', number: '50+', text: 'Outstanding Employees Recognized' },
          { icon: 'ri-time-line', number: '20 Years', text: 'Corporate Development History' },
          { icon: 'ri-team-line', number: '100%', text: 'Enhanced Team Cohesion' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Elegant%20corporate%20anniversary%20gala%20dinner%20with%20golden%20theme%20decorations%20five-star%20hotel%20formal%20business%20celebration%20Manila%20Philippines&width=800&height=600&seq=pacific-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Corporate%20CEO%20giving%20anniversary%20speech%20on%20stage%20with%20company%20logo%20backdrop%20formal%20business%20attire%20Philippines%20professional%20celebration&width=800&height=600&seq=pacific-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Employee%20recognition%20award%20ceremony%20with%20trophy%20presentation%20corporate%20executives%20congratulating%20outstanding%20staff%20Philippines%20business%20celebration&width=800&height=600&seq=pacific-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Corporate%20anniversary%20timeline%20display%20showcasing%2020%20years%20development%20milestones%20with%20professional%20exhibition%20setup%20Philippines%20business%20event&width=800&height=600&seq=pacific-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Elegant%20corporate%20dinner%20setting%20with%20round%20tables%20fine%20dining%20professional%20entertainment%20performance%20Philippines%20formal%20business%20celebration&width=800&height=600&seq=pacific-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Corporate%20team%20toast%20celebration%20with%20champagne%20glasses%20employees%20and%20executives%20celebrating%2020th%20anniversary%20Philippines%20business%20milestone&width=800&height=600&seq=pacific-gallery-6&orientation=landscape'
        ]
      },
      '5': {
        title: 'SOPHIA Lady\'s 50th Birthday Party',
        client: 'Ms. SOPHIA',
        eventType: 'Luxury Private Birthday Party',
        services: ['Theme Planning', 'Venue Decoration', 'Guest Services', 'Entertainment Arrangement'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Luxurious%2050th%20birthday%20party%20elegant%20gold%20and%20white%20theme%20decorations%20upscale%20venue%20sophisticated%20celebration%20high-end%20social%20event%20Manila%20Philippines%20glamorous%20setting&width=1400&height=600&seq=sophia-banner-5&orientation=landscape',
        challenge: 'Ms. SOPHIA wanted to hold an unforgettable luxury party for her 50th birthday, needing to receive 120 social circle VIPs in an elegant atmosphere, showcasing personal taste and social status.',
        solution: [
          'Designed gold and white luxury theme, blending modern and classic elements',
          'Selected top private club, providing exclusive VIP-level services',
          'Arranged exquisite French cuisine and champagne reception to satisfy discerning tastes',
          'Invited jazz band for live performance, creating elegant social atmosphere'
        ],
        results: [
          { icon: 'ri-vip-diamond-line', number: '120', text: 'Social Circle VIPs' },
          { icon: 'ri-music-line', number: 'Live', text: 'Jazz Band Performance' },
          { icon: 'ri-restaurant-line', number: 'Michelin', text: 'Level Culinary Service' },
          { icon: 'ri-emotion-laugh-line', number: 'Perfect', text: 'Birthday Celebration Experience' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Luxurious%2050th%20birthday%20party%20elegant%20gold%20and%20white%20decorations%20sophisticated%20guests%20in%20formal%20attire%20Manila%20Philippines%20upscale%20social%20celebration&width=800&height=600&seq=sophia-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Elegant%20birthday%20cake%20presentation%20ceremony%20with%20candles%20sophisticated%20party%20setup%20luxury%20venue%20Philippines%20glamorous%20celebration&width=800&height=600&seq=sophia-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Jazz%20band%20performance%20at%20luxury%20birthday%20party%20sophisticated%20guests%20enjoying%20live%20music%20elegant%20venue%20Manila%20Philippines%20social%20event&width=800&height=600&seq=sophia-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Elegant%20cocktail%20reception%20with%20champagne%20service%20sophisticated%20guests%20networking%20luxury%20birthday%20party%20Manila%20Philippines%20upscale%20social%20gathering&width=800&height=600&seq=sophia-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Birthday%20celebration%20toast%20moment%20with%20elegant%20guests%20raising%20glasses%20sophisticated%20party%20atmosphere%20Manila%20Philippines%20luxury%20social%20event&width=800&height=600&seq=sophia-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Luxury%20birthday%20party%20photo%20booth%20area%20with%20elegant%20decorations%20guests%20taking%20memorable%20photos%20Manila%20Philippines%20sophisticated%20celebration&width=800&height=600&seq=sophia-gallery-6&orientation=landscape'
        ]
      },
      '6': {
        title: 'INNOVATE Startup Product Launch Press Conference',
        client: 'INNOVATE Startup Company',
        eventType: 'Tech Product Launch',
        services: ['Media Planning', 'Product Display', 'Press Conference Execution', 'PR Services'],
        bannerImage: 'https://readdy.ai/api/search-image?query=Modern%20startup%20product%20launch%20press%20conference%20sleek%20presentation%20stage%20innovative%20technology%20display%20media%20reporters%20professional%20atmosphere%20Manila%20Philippines%20tech%20event&width=1400&height=600&seq=innovate-banner-6&orientation=landscape',
        challenge: 'INNOVATE startup company\'s first product launch needed to attract 50 media outlets\' attention within limited budget, establish brand awareness and gain market recognition.',
        solution: [
          'Designed modern minimalist launch venue highlighting product innovation features',
          'Invited tech media and industry opinion leaders to ensure effective communication',
          'Arranged product experience area for media to personally experience product value',
          'Provided detailed press kits to assist media in in-depth reporting'
        ],
        results: [
          { icon: 'ri-newspaper-line', number: '50+', text: 'Media Outlets Attended' },
          { icon: 'ri-rocket-line', number: '3x', text: 'Brand Awareness Increase' },
          { icon: 'ri-hand-heart-line', number: '25+', text: 'Investment Institutions Interested' },
          { icon: 'ri-trending-up-line', number: '200%', text: 'Website Traffic Growth' }
        ],
        gallery: [
          'https://readdy.ai/api/search-image?query=Modern%20startup%20product%20launch%20press%20conference%20with%20CEO%20presenting%20innovative%20technology%20to%20media%20reporters%20professional%20stage%20Manila%20Philippines%20tech%20event&width=800&height=600&seq=innovate-gallery-1&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Product%20demonstration%20booth%20with%20interactive%20displays%20startup%20innovation%20showcase%20media%20trying%20products%20tech%20press%20conference%20Philippines&width=800&height=600&seq=innovate-gallery-2&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Media%20interview%20session%20with%20startup%20founders%20journalists%20asking%20questions%20professional%20setup%20Philippines%20tech%20press%20conference&width=800&height=600&seq=innovate-gallery-3&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Networking%20session%20with%20media%20representatives%20and%20startup%20team%20business%20cards%20exchange%20Philippines%20tech%20industry%20event&width=800&height=600&seq=innovate-gallery-4&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Product%20showcase%20area%20with%20detailed%20information%20displays%20media%20taking%20photos%20startup%20innovation%20Philippines%20tech%20press%20conference&width=800&height=600&seq=innovate-gallery-5&orientation=landscape',
          'https://readdy.ai/api/search-image?query=Startup%20team%20celebration%20after%20successful%20product%20launch%20press%20conference%20team%20photo%20with%20media%20Philippines%20tech%20achievement&width=800&height=600&seq=innovate-gallery-6&orientation=landscape'
        ]
      }
    }
  };

  const languagePortfolioData = portfolioData[language as keyof typeof portfolioData];
  const currentPortfolio = languagePortfolioData[portfolioId] || languagePortfolioData['1'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentPortfolio.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentPortfolio.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Banner區域 */}
      <section className="pt-20 relative">
        <div className="h-96 md:h-[500px] relative overflow-hidden">
          <img 
            src={currentPortfolio.bannerImage}
            alt={currentPortfolio.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-8 left-6 right-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {currentPortfolio.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {currentPortfolio.services.map((service: string, index: number) => (
                  <span 
                    key={index}
                    className="bg-lime-500 text-slate-900 px-4 py-2 rounded-full font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 專案總覽 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* 專案資訊 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-lime-500 pl-4">
                  {t.overview}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t.client}</h3>
                    <p className="text-gray-600">{currentPortfolio.client}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t.eventType}</h3>
                    <p className="text-gray-600">{currentPortfolio.eventType}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t.services}</h3>
                    <p className="text-gray-600">{currentPortfolio.services.join('、')}</p>
                  </div>
                </div>
              </div>

              {/* 客戶挑戰 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-lime-500 pl-4">
                  {t.challenge}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentPortfolio.challenge}
                </p>
              </div>

              {/* 解決方案 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-lime-500 pl-4">
                  {t.solution}
                </h2>
                <ul className="space-y-4">
                  {currentPortfolio.solution.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 flex items-center justify-center bg-lime-500 rounded-full text-slate-900 font-bold text-sm mr-4 mt-1 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 成果亮點 */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {t.results}
                </h2>
                <div className="space-y-6">
                  {currentPortfolio.results.map((result: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-lime-500 rounded-full mx-auto mb-3">
                        <i className={`${result.icon} text-2xl text-slate-900`}></i>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {result.number}
                      </div>
                      <div className="text-gray-600">
                        {result.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 活動照片集錦 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.gallery}
          </h2>
          
          {/* 主要輪播 */}
          <div className="relative mb-8">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden">
              <img 
                src={currentPortfolio.gallery[currentImageIndex]}
                alt={`${language === 'zh' ? '活動照片' : 'Event Photo'} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            {/* 輪播控制 */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all cursor-pointer"
            >
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all cursor-pointer"
            >
              <i className="ri-arrow-right-line text-xl text-gray-700"></i>
            </button>

            {/* 圖片指示器 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {currentPortfolio.gallery.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    index === currentImageIndex ? 'bg-lime-500' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 縮圖網格 */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {currentPortfolio.gallery.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                  index === currentImageIndex ? 'ring-4 ring-lime-500' : 'hover:opacity-80'
                }`}
              >
                <img 
                  src={image}
                  alt={`${language === 'zh' ? '縮圖' : 'Thumbnail'} ${index + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 返回按鈕 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link 
            href="/portfolio"
            className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-lime-400 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap border border-lime-400"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            {t.backToList}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
