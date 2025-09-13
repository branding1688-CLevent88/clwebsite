'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  zh: {
    // Header
    home: '首頁',
    about: '關於我們',
    services: '服務項目',
    portfolio: '成功案例',
    contact: '聯絡我們',
    quote: '免費索取報價',
    
    // Hero Section
    heroTitle: '專業活動策劃服務',
    heroSubtitle: '讓每一個特殊時刻都完美呈現',
    heroDescription: '從企業盛會到私人慶典，我們用心打造每一個難忘瞬間。專業團隊、創意策劃、完美執行，為您創造獨一無二的活動體驗。',
    heroButton1: '立即諮詢',
    heroButton2: '查看作品',
    
    // Services Section
    servicesTitle: '核心服務項目',
    servicesSubtitle: '從創意發想到完美執行，我們提供全方位的活動策劃服務',
    service1Title: '一站式活動策劃',
    service1Desc: '從無到有，打造專屬您的活動藍圖',
    service2Title: '多樣化活動執行',
    service2Desc: '精準執行企業商務或私人慶典的每個細節',
    service3Title: '在地供應鏈整合',
    service3Desc: '為您嚴選廠商，把關品質與預算',
    service4Title: '全方位視覺設計',
    service4Desc: '從主視覺到現場佈置，提升活動質感',
    service5Title: '中菲雙語溝通',
    service5Desc: '確保現場流程順暢，賓主盡歡',
    service6Title: '24小時客服支援',
    service6Desc: '隨時待命，即時解決您的需求',
    
    // Portfolio Section
    portfolioTitle: '精選成功案例',
    portfolioSubtitle: '每一個項目都是我們專業實力的最佳見證',
    portfolioButton: '查看更多案例',
    
    // Testimonials Section
    testimonialsTitle: '客戶好評見證',
    testimonialsSubtitle: '用心服務，贏得信任',
    
    // Footer
    footerTitle: '準備開始您的完美活動了嗎？',
    footerSubtitle: '立即聯繫我們，讓專業團隊為您量身打造難忘的活動體驗',
    footerButton: '開始規劃',
    
    // Common
    learnMore: '了解更多',
    contactUs: '聯絡我們',
    getStarted: '開始使用'
  },
  en: {
    // Header
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    portfolio: 'Portfolio',
    contact: 'Contact',
    quote: 'Get Free Quote',
    
    // Hero Section
    heroTitle: 'Professional Event Planning Services',
    heroSubtitle: 'Making Every Special Moment Perfect',
    heroDescription: 'From corporate events to private celebrations, we craft every memorable moment with care. Professional team, creative planning, perfect execution - creating unique event experiences for you.',
    heroButton1: 'Contact Now',
    heroButton2: 'View Portfolio',
    
    // Services Section
    servicesTitle: 'Core Services',
    servicesSubtitle: 'From creative concepts to perfect execution, we provide comprehensive event planning services',
    service1Title: 'Full-Service Event Planning',
    service1Desc: 'From scratch to reality, creating your exclusive event blueprint',
    service2Title: 'Diverse Event Execution',
    service2Desc: 'Precise execution of every detail for corporate or private celebrations',
    service3Title: 'Local Supply Chain Integration',
    service3Desc: 'Carefully selected vendors, quality and budget control',
    service4Title: 'Comprehensive Visual Design',
    service4Desc: 'From key visuals to venue decoration, enhancing event quality',
    service5Title: 'Chinese-Filipino Bilingual Communication',
    service5Desc: 'Ensuring smooth event flow and guest satisfaction',
    service6Title: '24/7 Customer Support',
    service6Desc: 'Always ready to solve your needs instantly',
    
    // Portfolio Section
    portfolioTitle: 'Featured Success Stories',
    portfolioSubtitle: 'Every project is the best testament to our professional excellence',
    portfolioButton: 'View More Cases',
    
    // Testimonials Section
    testimonialsTitle: 'Client Testimonials',
    testimonialsSubtitle: 'Heartfelt service, earned trust',
    
    // Footer
    footerTitle: 'Ready to Start Your Perfect Event?',
    footerSubtitle: 'Contact us now and let our professional team create an unforgettable event experience for you',
    footerButton: 'Start Planning',
    
    // Common
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    getStarted: 'Get Started'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
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

  const t = (key: string): string => {
    const languageTranslations = translations[language as keyof typeof translations];
    return languageTranslations?.[key as keyof typeof languageTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}