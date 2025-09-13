
import PortfolioHero from './PortfolioHero';
import PortfolioGrid from './PortfolioGrid';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '成功案例 - CL在菲活動策劃 | 精彩活動策劃作品集',
    description: '瀏覽 CL在菲活動策劃 500+精彩的活動策劃案例作品集，包含豪華婚禮策劃、企業年會、商業開幕慶典、品牌發表會、生日派對等成功項目。專業團隊深耕菲律賓5年，打造的獨特活動體驗，是您選擇我們的最佳證明。',
    keywords: '活動策劃案例,成功案例,婚禮案例,企業活動案例,商業開幕案例,品牌發表會案例,活動作品集,菲律賓活動策劃,豪華婚禮,企業年會,生日派對,CL Events portfolio,Philippines event portfolio',
    alternates: {
      languages: {
        'zh-TW': '/portfolio',
        'en': '/portfolio'
      }
    },
    openGraph: {
      title: '成功案例 - CL在菲活動策劃 | 精彩活動策劃作品集',
      description: '瀏覽 CL在菲活動策劃 500+精彩的活動策劃案例，包含豪華婚禮、企業年會、商業開幕等成功項目。',
      type: 'website',
      url: 'https://cleventsphilippines.com/portfolio',
      images: [
        {
          url: 'https://readdy.ai/api/search-image?query=Elegant%20luxury%20wedding%20ceremony%20and%20corporate%20event%20portfolio%20showcase%20Philippines%20professional%20event%20planning%20beautiful%20venues&width=1200&height=630&seq=portfolio-og&orientation=landscape',
          width: 1200,
          height: 630,
          alt: 'CL Events Philippines 成功案例作品集'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: '成功案例 - CL在菲活動策劃',
      description: '瀏覽 CL在菲活動策劃 500+精彩的活動策劃案例，專業團隊打造的獨特活動體驗。'
    }
  };
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PortfolioHero />
      <PortfolioGrid />
      <Footer />
    </div>
  );
}
