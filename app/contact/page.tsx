
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactMap from './ContactMap';

export default function ContactPage() {
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    // 從本地存儲獲取語言設置
    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);

    // 設定頁面 SEO
    if (savedLanguage === 'en') {
      document.title = 'Contact Us - CL Events Philippines | Free Event Planning Consultation & Quote';
      document.documentElement.lang = 'en';
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', 'Contact CL Events Philippines for free event planning consultation and quotes. Professional event planning services in the Philippines with 24/7 Chinese customer support. Get expert advice for weddings, corporate events, and business launches in Manila and throughout the Philippines.');
      
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', 'contact CL Events,event planning consultation,free consultation,Philippines event planning,wedding planning consultation,corporate event consultation,Manila event planning,Chinese customer service,event planning quote');
    } else {
      document.title = '聯絡我們 - CL在菲活動策劃 | 免費活動策劃諮詢與報價';
      document.documentElement.lang = 'zh-TW';
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', '聯絡 CL在菲活動策劃 獲得免費活動策劃諮詢與報價。菲律賓專業活動策劃服務，提供24小時中文客服支援。無論是婚禮策劃、企業活動還是商業開幕，我們都能為您在馬尼拉及菲律賓各地提供專業建議。');
      
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', '聯絡CL在菲活動策劃,活動策劃諮詢,免費諮詢,菲律賓活動策劃,婚禮策劃諮詢,企業活動諮詢,馬尼拉活動策劃,中文客服,活動策劃報價');
    }

    // 監聽語言變更事件
    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail;
      setLanguage(newLanguage);
      
      if (newLanguage === 'en') {
        document.title = 'Contact Us - CL Events Philippines | Free Event Planning Consultation & Quote';
        document.documentElement.lang = 'en';
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', 'Contact CL Events Philippines for free event planning consultation and quotes. Professional event planning services in the Philippines with 24/7 Chinese customer support. Get expert advice for weddings, corporate events, and business launches in Manila and throughout the Philippines.');
        }
        
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', 'contact CL Events,event planning consultation,free consultation,Philippines event planning,wedding planning consultation,corporate event consultation,Manila event planning,Chinese customer service,event planning quote');
        }
      } else {
        document.title = '聯絡我們 - CL在菲活動策劃 | 免費活動策劃諮詢與報價';
        document.documentElement.lang = 'zh-TW';
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', '聯絡 CL在菲活動策劃 獲得免費活動策劃諮詢與報價。菲律賓專業活動策劃服務，提供24小時中文客服支援。無論是婚禮策劃、企業活動還是商業開幕，我們都能為您在馬尼拉及菲律賓各地提供專業建議。');
        }
        
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', '聯絡CL在菲活動策劃,活動策劃諮詢,免費諮詢,菲律賓活動策劃,婚禮策劃諮詢,企業活動諮詢,馬尼拉活動策劃,中文客服,活動策劃報價');
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
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <ContactForm />
        <ContactInfo />
      </div>
      <ContactMap />
      <Footer />
    </div>
  );
}
