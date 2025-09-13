
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [language, setLanguage] = useState('zh');
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isMounted]);

  const translations = {
    zh: {
      title: '專業活動策劃服務',
      subtitle: '讓每一個特殊時刻都完美呈現',
      description: '從企業盛會到私人慶典，我們用心打造每一個難忘瞬間。專業團隊、創意策劃、完美執行，為您創造獨一無二的活動體驗。',
      button1: '立即諮詢',
      button2: '查看作品'
    },
    en: {
      title: 'Professional Event Planning Services',
      subtitle: 'Making Every Special Moment Perfect',
      description: 'From corporate events to private celebrations, we craft every memorable moment with care. Professional team, creative planning, perfect execution - creating unique event experiences for you.',
      button1: 'Contact Now',
      button2: 'View Portfolio'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleVideoLoad = () => {
    if (isMounted) {
      setVideoLoaded(true);
      setVideoError(false);
    }
  };

  const handleVideoError = () => {
    if (isMounted) {
      setVideoError(true);
      setVideoLoaded(false);
    }
  };

  if (!isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="text-center text-white space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-pulse">載入中...</h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: 'center center' }}
      >
        <source src="https://public.readdy.ai/ai/video_res/6c770e25-df31-478b-8945-1ea42906d869.mp4" type="video/mp4" />
        <source src="https://readdy.ai/api/video?query=Professional event planning team setting up elegant corporate gala with beautiful lighting and floral arrangements in luxury venue. Cinematic quality with warm golden lighting showcasing attention to detail and premium service. Modern sophisticated atmosphere with people working professionally in background.&width=1920&height=1080&duration=15&seq=hero-video-001" type="video/mp4" />
      </video>

      {(videoError || !videoLoaded) && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectPosition: 'center center' }}
        >
          <source src="https://public.readdy.ai/ai/video_res/6c770e25-df31-478b-8945-1ea42906d869.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-lime-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-lime-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-lime-400/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-lime-400/25 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <h1 className={`text-5xl md:text-7xl font-bold text-white leading-tight animate-pulse transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {t.title}
            </h1>
            <h2 className={`text-2xl md:text-3xl text-lime-400 font-semibold mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {t.subtitle}
            </h2>
            <p className={`text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {t.description}
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              href="/contact"
              className="bg-lime-400 text-slate-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-lime-300 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-2xl flex items-center justify-center group"
            >
              <i className="ri-phone-line mr-3 text-xl group-hover:animate-bounce"></i>
              {t.button1}
            </Link>

            <Link
              href="/portfolio"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap flex items-center justify-center group"
            >
              <i className="ri-image-line mr-3 text-xl group-hover:rotate-12 transition-transform"></i>
              {t.button2}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <i className="ri-arrow-down-line text-white text-3xl animate-pulse"></i>
      </div>

      {!videoLoaded && !videoError && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-40">
          <i className="ri-movie-line mr-1"></i>
          Video Loading...
        </div>
      )}
    </section>
  );
}
