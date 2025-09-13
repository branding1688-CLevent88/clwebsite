
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutHero from './AboutHero';
import StorySection from './StorySection';
import PhilosophySection from './PhilosophySection';
import TeamSection from './TeamSection';
import ProcessSection from './ProcessSection';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '關於我們 - CL在菲活動策劃 | 菲律賓專業活動策劃團隊',
    description: '了解 CL在菲活動策劃 的品牌故事、專業團隊和服務理念。深耕菲律賓5年，擁有豐富活動策劃經驗的專業團隊，為華語客戶提供語言無障礙的活動策劃服務。成功策劃500+場活動，客戶滿意度98%。',
    keywords: '關於CL在菲活動策劃,活動策劃團隊,菲律賓活動公司,專業策劃師,活動策劃經驗,品牌故事,華語活動策劃,菲律賓在地資源,專業團隊,About CL Events Philippines',
    alternates: {
      languages: {
        'zh-TW': '/about',
        'en': '/about'
      }
    },
    openGraph: {
      title: '關於我們 - CL在菲活動策劃 | 菲律賓專業活動策劃團隊',
      description: '了解 CL在菲活動策劃 的品牌故事、專業團隊和服務理念。深耕菲律賓5年，為華語客戶提供專業活動策劃服務。',
      type: 'website',
      url: 'https://cleventsphilippines.com/about',
      images: [
        {
          url: 'https://readdy.ai/api/search-image?query=Professional%20diverse%20team%20of%20event%20planners%20working%20together%20in%20modern%20office%20space%20showing%20collaboration%20and%20expertise%20Philippines%20setting&width=1200&height=630&seq=about-og&orientation=landscape',
          width: 1200,
          height: 630,
          alt: 'CL Events Philippines 專業團隊'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: '關於我們 - CL在菲活動策劃',
      description: '了解 CL在菲活動策劃 的品牌故事和專業團隊。深耕菲律賓5年，為華語客戶提供專業活動策劃服務。'
    }
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutHero />
      <StorySection />
      <PhilosophySection />
      <TeamSection />
      <ProcessSection />
      <Footer />
    </div>
  );
}
