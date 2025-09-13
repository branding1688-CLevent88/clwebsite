
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import BrandIntroSection from '../components/BrandIntroSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PortfolioPreviewSection from '../components/PortfolioPreviewSection';
import FinalCTASection from '../components/FinalCTASection';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // 獲取當前語言設定
    const currentLanguage = localStorage.getItem('language') || 'zh';
    
    if (currentLanguage === 'zh') {
      document.title = 'CL在菲活動策劃 - 菲律賓專業活動策劃 | 婚禮策劃 | 企業活動';
      document.documentElement.lang = 'zh-TW';
      
      // 更新 meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', '菲律賓頂級活動策劃公司，專業提供婚禮策劃、企業年會、商業開幕、品牌發表會等全方位活動規劃服務。深耕菲律賓5年，500+成功案例，為華語客戶打造獨特難忘的活動體驗。24小時中文客服支援。');
      
      // 添加 keywords meta
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', '菲律賓活動策劃,婚禮策劃,企業活動,商業開幕,品牌發表會,活動規劃,馬尼拉活動策劃,華語活動策劃,CL Events,Philippines event planning,專業活動策劃,菲律賓婚禮');
      
      // 添加結構化數據
      let structuredData = document.querySelector('#structured-data');
      if (!structuredData) {
        structuredData = document.createElement('script');
        structuredData.id = 'structured-data';
        structuredData.type = 'application/ld+json';
        document.head.appendChild(structuredData);
      }
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CL在菲活動策劃",
        "alternateName": "CL Events Philippines",
        "description": "菲律賓頂級活動策劃公司，專業提供婚禮策劃、企業活動等全方位活動規劃服務",
        "url": "https://cleventsphilippines.com",
        "logo": "https://cleventsphilippines.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+63-xxx-xxx-xxxx",
          "contactType": "customer service",
          "availableLanguage": ["Chinese", "English", "Filipino"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PH",
          "addressLocality": "Manila"
        },
        "sameAs": [
          "https://facebook.com/cleventsphilippines",
          "https://instagram.com/cleventsphilippines"
        ]
      });
    } else {
      document.title = 'CL Events Philippines - Premier Event Planning Company | Wedding Planning | Corporate Events';
      document.documentElement.lang = 'en';
      
      // 更新 meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', 'Premier event planning company in the Philippines, specializing in wedding planning, corporate events, business launches, and brand launches. 5 years of local expertise, 500+ successful events, creating unique and unforgettable experiences for Chinese-speaking clients. 24/7 Chinese customer support.');
      
      // 添加 keywords meta
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', 'Philippines event planning,wedding planning,corporate events,business launch,brand launch,event planning,Manila event planning,Chinese event planning,CL Events Philippines,professional event planning,Philippines wedding');
      
      // 添加結構化數據
      let structuredData = document.querySelector('#structured-data');
      if (!structuredData) {
        structuredData = document.createElement('script');
        structuredData.id = 'structured-data';
        structuredData.type = 'application/ld+json';
        document.head.appendChild(structuredData);
      }
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CL Events Philippines",
        "alternateName": "CL在菲活動策劃",
        "description": "Premier event planning company in the Philippines, specializing in wedding planning and corporate events",
        "url": "https://cleventsphilippines.com",
        "logo": "https://cleventsphilippines.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+63-xxx-xxx-xxxx",
          "contactType": "customer service",
          "availableLanguage": ["Chinese", "English", "Filipino"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PH",
          "addressLocality": "Manila"
        },
        "sameAs": [
          "https://facebook.com/cleventsphilippines",
          "https://instagram.com/cleventsphilippines"
        ]
      });
    }

    // 監聽語言變更事件
    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail;
      if (newLanguage === 'zh') {
        document.title = 'CL在菲活動策劃 - 菲律賓專業活動策劃 | 婚禮策劃 | 企業活動';
        document.documentElement.lang = 'zh-TW';
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', '菲律賓頂級活動策劃公司，專業提供婚禮策劃、企業年會、商業開幕、品牌發表會等全方位活動規劃服務。深耕菲律賓5年，500+成功案例，為華語客戶打造獨特難忘的活動體驗。24小時中文客服支援。');
        }
        
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', '菲律賓活動策劃,婚禮策劃,企業活動,商業開幕,品牌發表會,活動規劃,馬尼拉活動策劃,華語活動策劃,CL Events,Philippines event planning,專業活動策劃,菲律賓婚禮');
        }
      } else {
        document.title = 'CL Events Philippines - Premier Event Planning Company | Wedding Planning | Corporate Events';
        document.documentElement.lang = 'en';
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', 'Premier event planning company in the Philippines, specializing in wedding planning, corporate events, business launches, and brand launches. 5 years of local expertise, 500+ successful events, creating unique and unforgettable experiences for Chinese-speaking clients. 24/7 Chinese customer support.');
        }
        
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', 'Philippines event planning,wedding planning,corporate events,business launch,brand launch,event planning,Manila event planning,Chinese event planning,CL Events Philippines,professional event planning,Philippines wedding');
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
      <HeroSection />
      <BrandIntroSection />
      <ServicesSection />
      <TestimonialsSection />
      <PortfolioPreviewSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
