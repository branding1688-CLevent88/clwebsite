
'use client';

import { useState, useEffect } from 'react';

export default function StorySection() {
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
      title: '我們的故事',
      question: '「為什麼要在菲律賓為華人做活動策劃？」',
      answer1: '這個問題，我被問過無數次。答案其實很簡單：',
      answer1Bold: '因為我深深體會過在異國他鄉舉辦活動的無助感。',
      story1: '2019年，我跟隨家人移居菲律賓，第一次需要在馬尼拉舉辦公司的產品發表會。明明是熟悉的工作，卻因為語言不通、對當地供應商不熟悉，讓整個籌備過程充滿挫折。不是被莫名其妙地加價，就是溝通出現偏差，導致現場佈置與預期完全不符。',
      moment: '那一刻我想：',
      momentBold: '「如果有一個懂中文、了解華人需求，又熟悉菲律賓在地資源的團隊該多好！」',
      birth: '於是，CL Events 誕生了。我們不只是活動策劃公司，更是每一位海外華人客戶的貼心夥伴。我們理解您對品質的堅持、對細節的要求，以及對完美活動的期待。',
      quote: '「讓每一位華語客戶在菲律賓都能輕鬆舉辦夢想中的活動，這就是我們存在的意義。」',
      quoteAuthor: '— CL Events 創辦人',
      tagline1: '從挫折到使命',
      tagline2: '成就您的完美活動'
    },
    en: {
      title: 'Our Story',
      question: '"Why do event planning for Chinese speakers in the Philippines?"',
      answer1: 'I\'ve been asked this question countless times. The answer is actually simple:',
      answer1Bold: 'Because I deeply experienced the helplessness of organizing events in a foreign country.',
      story1: 'In 2019, I moved to the Philippines with my family and needed to organize our company\'s product launch in Manila for the first time. What should have been familiar work became frustrating due to language barriers and unfamiliarity with local suppliers. Either we were inexplicably overcharged, or miscommunication led to venue setups completely different from expectations.',
      moment: 'At that moment I thought:',
      momentBold: '"How wonderful it would be to have a team that understands Chinese, knows Chinese needs, and is familiar with local Philippine resources!"',
      birth: 'Thus, CL Events was born. We are not just an event planning company, but a caring partner for every overseas Chinese client. We understand your insistence on quality, attention to detail, and expectations for perfect events.',
      quote: '"Enabling every Chinese-speaking client in the Philippines to easily organize their dream events - this is the reason for our existence."',
      quoteAuthor: '— CL Events Founder',
      tagline1: 'From Frustration to Mission',
      tagline2: 'Creating Your Perfect Events'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t.title}
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl text-lime-600 font-semibold">
                {t.question}
              </p>
              
              <p>
                {t.answer1}<strong>{t.answer1Bold}</strong>
              </p>
              
              <p>
                {t.story1}
              </p>
              
              <p>
                {t.moment}<strong className="text-slate-800">{t.momentBold}</strong>
              </p>
              
              <p>
                {t.birth}
              </p>
              
              <blockquote className="bg-slate-50 border-l-4 border-lime-400 p-6 italic">
                {t.quote}
                <footer className="text-right mt-4 text-slate-600 font-semibold">
                  {t.quoteAuthor}
                </footer>
              </blockquote>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://static.readdy.ai/image/9444ec662aa7b2fd032cedbc3a4aefb7/c72db96cef9cdc9c7c304d110685f7fa.png"
              alt="CL Events 創辦人"
              className="w-full rounded-2xl shadow-2xl object-cover object-top"
            />
            <div className="absolute -bottom-8 -left-8 bg-lime-400 text-slate-900 p-6 rounded-2xl shadow-xl">
              <div className="text-2xl font-bold">{t.tagline1}</div>
              <div className="text-sm">{t.tagline2}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
