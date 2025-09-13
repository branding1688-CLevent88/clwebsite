
'use client';

import { useState, useEffect } from 'react';

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
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
      title: '客戶真實回饋',
      subtitle: '超過 500+ 場成功活動，客戶滿意度 98%'
    },
    en: {
      title: 'Client Testimonials',
      subtitle: 'Over 500+ successful events, 98% client satisfaction rate'
    }
  };

  const testimonialsData = {
    zh: [
      {
        name: '張執行長',
        company: 'XYZ科技股份有限公司',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20executive%20CEO%20in%20formal%20business%20suit%20with%20confident%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar1&orientation=squarish',
        content: '我們公司在馬尼拉的開幕記者會，從場地到媒體都由 CL 一手包辦，效率極高！整個活動流程順暢，賓客反應熱烈，完全超出我們的期待。CL 團隊的專業度和執行力讓我們非常安心。',
        rating: 5
      },
      {
        name: '李總監',
        company: 'ABC貿易集團',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20woman%20director%20in%20elegant%20business%20attire%20with%20warm%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar2&orientation=squarish',
        content: '在宿霧舉辦的年會活動，CL Events 幫我們找到了絕佳的海景場地，現場佈置典雅大方，員工們都非常滿意。最重要的是溝通完全無障礙，讓我們這些不懂菲律賓文的主辦方安心許多。',
        rating: 5
      },
      {
        name: '王小姐',
        company: '私人客戶',
        avatar: 'https://readdy.ai/api/search-image?query=Elegant%20Asian%20bride%20in%20beautiful%20white%20wedding%20dress%20with%20happy%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar3&orientation=squarish',
        content: '在長灘島的海島婚禮，從佈置到攝影都美得像童話一樣！CL 團隊考慮到每個細節，讓我們在異國他鄉也能擁有夢幻的婚禮體驗。賓客們到現在還在稱讚這場婚禮的完美。',
        rating: 5
      },
      {
        name: '陳經理',
        company: 'DEF製造業',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20manager%20in%20formal%20shirt%20and%20tie%20with%20confident%20expression%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar4&orientation=squarish',
        content: '產品發表會的成功舉辦，讓我們在菲律賓市場的品牌知名度大幅提升。CL 不僅安排了當地媒體採訪，還協助我們與重要客戶建立了良好關係。真的是一次非常成功的合作！',
        rating: 5
      }
    ],
    en: [
      {
        name: 'CEO Zhang',
        company: 'XYZ Technology Corporation',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20executive%20CEO%20in%20formal%20business%20suit%20with%20confident%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar1&orientation=squarish',
        content: 'CL handled everything from venue to media for our company\'s opening press conference in Manila with exceptional efficiency! The entire event flow was smooth, guests responded enthusiastically, completely exceeding our expectations. CL team\'s professionalism and execution gave us great peace of mind.',
        rating: 5
      },
      {
        name: 'Director Li',
        company: 'ABC Trading Group',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20woman%20director%20in%20elegant%20business%20attire%20with%20warm%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar2&orientation=squarish',
        content: 'For our annual meeting in Cebu, CL Events found us an excellent oceanview venue with elegant decorations that made all employees very satisfied. Most importantly, communication was completely barrier-free, giving us organizers who don\'t speak Filipino much peace of mind.',
        rating: 5
      },
      {
        name: 'Ms. Wang',
        company: 'Private Client',
        avatar: 'https://readdy.ai/api/search-image?query=Elegant%20Asian%20bride%20in%20beautiful%20white%20wedding%20dress%20with%20happy%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar3&orientation=squarish',
        content: 'Our beach wedding in Boracay was beautiful like a fairy tale from decorations to photography! The CL team considered every detail, allowing us to have a dream wedding experience in a foreign country. Guests are still praising the perfection of this wedding.',
        rating: 5
      },
      {
        name: 'Manager Chen',
        company: 'DEF Manufacturing',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20manager%20in%20formal%20shirt%20and%20tie%20with%20confident%20expression%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar4&orientation=squarish',
        content: 'The successful product launch significantly boosted our brand awareness in the Philippine market. CL not only arranged local media interviews but also helped us establish good relationships with important clients. It was truly a very successful collaboration!',
        rating: 5
      }
    ]
  };

  const t = translations[language as keyof typeof translations];
  const testimonials = testimonialsData[language as keyof typeof testimonialsData];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-3xl p-12 text-center border border-lime-200">
            <div className="mb-8">
              <img 
                src={testimonials[currentSlide].avatar}
                alt={testimonials[currentSlide].name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-lime-400 text-xl"></i>
                ))}
              </div>
            </div>
            
            <blockquote className="text-xl text-gray-800 leading-relaxed mb-8 italic">
              "{testimonials[currentSlide].content}"
            </blockquote>
            
            <div>
              <div className="font-bold text-lg text-gray-900">
                {testimonials[currentSlide].name}
              </div>
              <div className="text-lime-600 font-medium">
                {testimonials[currentSlide].company}
              </div>
            </div>
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer border border-lime-200"
          >
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer border border-lime-200"
          >
            <i className="ri-arrow-right-line text-xl text-gray-600"></i>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  index === currentSlide ? 'bg-lime-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
