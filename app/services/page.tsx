
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServicesSection from '../../components/ServicesSection';

export default function ServicesPage() {
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    // 從本地存儲獲取語言設置
    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);

    // 設定頁面 SEO
    if (savedLanguage === 'en') {
      document.title = 'Services - CL Events Philippines | Professional Event Planning | Wedding & Corporate Events';
      document.documentElement.lang = 'en';

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', 'Comprehensive event planning services in the Philippines, including luxury wedding planning, corporate events, business launches, brand launches, birthday parties, and anniversary celebrations. Professional Chinese-speaking team with 5 years of local expertise and 500+ successful events.');

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', 'event planning services,wedding planning Philippines,corporate events Manila,business launch,brand launch,birthday party planning,anniversary celebration,professional event planning,Chinese event planning,Manila event services,Philippines wedding planner');
    } else {
      document.title = '服務項目 - CL在菲活動策劃 | 專業活動策劃 | 婚禮與企業活動';
      document.documentElement.lang = 'zh-TW';

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', '菲律賓全方位專業活動策劃服務，包含豪華婚禮策劃、企業活動、商業開幕、品牌發表會、生日派對、週年慶典等。專業中文團隊深耕當地5年，成功策劃500+場活動，提供一站式活動策劃解決方案。');

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', '服務項目,活動策劃服務,婚禮策劃,企業活動,商業開幕,品牌發表會,生日派對,週年慶典,專業活動策劃,菲律賓活動策劃,華語活動策劃,馬尼拉活動策劃');
    }

    // 監聽語言變更事件
    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail;
      setLanguage(newLanguage);

      if (newLanguage === 'en') {
        document.title = 'Services - CL Events Philippines | Professional Event Planning | Wedding & Corporate Events';
        document.documentElement.lang = 'en';

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', 'Comprehensive event planning services in the Philippines, including luxury wedding planning, corporate events, business launches, brand launches, birthday parties, and anniversary celebrations. Professional Chinese-speaking team with 5 years of local expertise and 500+ successful events.');
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', 'event planning services,wedding planning Philippines,corporate events Manila,business launch,brand launch,birthday party planning,anniversary celebration,professional event planning,Chinese event planning,Manila event services,Philippines wedding planner');
        }
      } else {
        document.title = '服務項目 - CL在菲活動策劃 | 專業活動策劃 | 婚禮與企業活動';
        document.documentElement.lang = 'zh-TW';

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', '菲律賓全方位專業活動策劃服務，包含豪華婚禮策劃、企業活動、商業開幕、品牌發表會、生日派對、週年慶典等。專業中文團隊深耕當地5年，成功策劃500+場活動，提供一站式活動策劃解決方案。');
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', '服務項目,活動策劃服務,婚禮策劃,企業活動,商業開幕,品牌發表會,生日派對,週年慶典,專業活動策劃,菲律賓活動策劃,華語活動策劃,馬尼拉活動策劃');
        }
      }
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
}
