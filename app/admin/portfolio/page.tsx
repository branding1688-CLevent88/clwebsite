
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';
import { useAdminLanguage } from '../../../components/AdminLanguageProvider';

export default function PortfolioManagement() {
  const { t } = useAdminLanguage();
  
  const [portfolios, setPortfolios] = useState([
    {
      id: 1,
      name: 'NEXUS科技5G新品全球發表會',
      type: '品牌發表會',
      date: '2024-01-15',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Futuristic%20high-tech%20product%20launch%20event%20with%20holographic%20displays%20LED%20screens%20modern%20minimalist%20stage%20design%20corporate%20executives%20presenting%205G%20technology%20professional%20lighting%20packed%20audience%20Manila%20Philippines%20sophisticated%20venue&width=400&height=300&seq=tech1&orientation=landscape'
    },
    {
      id: 2,
      name: 'GOLDEN TOWER商業大樓盛大開幕',
      type: '商業開幕',
      date: '2024-01-20',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Luxurious%20corporate%20building%20grand%20opening%20ceremony%20with%20elegant%20red%20carpet%20entrance%20golden%20ribbon%20cutting%20VIP%20guests%20champagne%20reception%20crystal%20chandeliers%20formal%20business%20celebration%20Manila%20Philippines&width=400&height=300&seq=opening1&orientation=landscape'
    },
    {
      id: 3,
      name: '薄荷島天堂海灘夢幻婚禮',
      type: '婚禮慶典',
      date: '2024-02-01',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Breathtaking%20tropical%20beach%20wedding%20ceremony%20Bohol%20island%20crystal%20clear%20turquoise%20water%20white%20sand%20pristine%20beach%20white%20floral%20arch%20sunset%20golden%20hour%20romantic%20atmosphere%20Philippines%20paradise%20destination%20wedding&width=400&height=300&seq=wedding1&orientation=landscape'
    },
    {
      id: 4,
      name: 'PACIFIC集團20週年慶典晚宴',
      type: '企業年會',
      date: '2024-02-05',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Opulent%20corporate%20anniversary%20gala%20dinner%20with%20elegant%20ballroom%20setup%20crystal%20chandeliers%20round%20tables%20exquisite%20centerpieces%20live%20orchestra%20performance%20formal%20business%20celebration%20Manila%20five%20star%20hotel&width=400&height=300&seq=gala1&orientation=landscape'
    },
    {
      id: 5,
      name: 'SOPHIA名媛50歲生日派對',
      type: '私人派對',
      date: '2024-02-10',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20sophisticated%20private%20birthday%20party%20celebration%20luxury%20venue%20crystal%20decorations%20champagne%20towers%20beautiful%20lighting%20intimate%20gathering%20upscale%20setting%20Manila%20Philippines%20refined%20atmosphere&width=400&height=300&seq=party1&orientation=landscape'
    },
    {
      id: 6,
      name: 'INNOVATE新創產品發表記者會',
      type: '品牌發表會',
      date: '2024-02-15',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Professional%20press%20conference%20with%20modern%20media%20wall%20backdrop%20journalists%20cameras%20innovative%20product%20display%20startup%20executives%20speaking%20podium%20tech%20conference%20room%20Manila%20Philippines%20contemporary%20atmosphere&width=400&height=300&seq=press1&orientation=landscape'
    },
    {
      id: 7,
      name: 'EMERALD酒店集團開業慶典',
      type: '商業開幕',
      date: '2024-02-20',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Luxury%20hotel%20grand%20opening%20ceremony%20elegant%20entrance%20with%20emerald%20green%20theme%20sophisticated%20decorations%20VIP%20ribbon%20cutting%20champagne%20reception%20five%20star%20hospitality%20Manila%20Philippines%20upscale%20celebration&width=400&height=300&seq=hotel1&orientation=landscape'
    },
    {
      id: 8,
      name: '長灘島白沙灘浪漫求婚',
      type: '私人派對',
      date: '2024-02-25',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Romantic%20beach%20proposal%20setup%20Boracay%20white%20sand%20beach%20sunset%20golden%20hour%20heart%20shaped%20rose%20petals%20candles%20elegant%20decorations%20intimate%20surprise%20proposal%20Philippines%20tropical%20paradise&width=400&height=300&seq=proposal1&orientation=landscape'
    },
    {
      id: 9,
      name: 'SUMMIT銀行企業高峰論壇',
      type: '企業年會',
      date: '2024-03-01',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Professional%20corporate%20summit%20conference%20with%20modern%20auditorium%20setup%20business%20executives%20panel%20discussion%20banking%20industry%20leaders%20formal%20presentation%20Manila%20Philippines%20contemporary%20venue&width=400&height=300&seq=summit1&orientation=landscape'
    },
    {
      id: 10,
      name: 'CRYSTAL珠寶品牌旗艦店開幕',
      type: '品牌發表會',
      date: '2024-03-05',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20jewelry%20store%20grand%20opening%20with%20crystal%20chandeliers%20luxury%20showcase%20displays%20sparkling%20diamond%20jewelry%20VIP%20guests%20champagne%20reception%20sophisticated%20lighting%20Manila%20Philippines%20upscale%20retail&width=400&height=300&seq=jewelry1&orientation=landscape'
    },
    {
      id: 11,
      name: '巴拉望島私人度假村婚禮',
      type: '婚禮慶典',
      date: '2024-03-10',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Exclusive%20private%20resort%20wedding%20ceremony%20Palawan%20island%20pristine%20beach%20turquoise%20lagoon%20tropical%20luxury%20wedding%20arch%20palm%20trees%20paradise%20setting%20intimate%20celebration%20Philippines%20destination%20wedding&width=400&height=300&seq=palawan1&orientation=landscape'
    },
    {
      id: 12,
      name: 'PHOENIX集團年終尾牙晚會',
      type: '企業年會',
      date: '2024-03-15',
      status: '已發佈',
      image: 'https://readdy.ai/api/search-image?query=Festive%20corporate%20year%20end%20party%20with%20colorful%20lighting%20stage%20entertainment%20employee%20celebration%20awards%20ceremony%20lucky%20draw%20exciting%20atmosphere%20Manila%20Philippines%20company%20gathering&width=400&height=300&seq=yearend1&orientation=landscape'
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setPortfolios(portfolios.filter(p => p.id !== id));
    setShowDeleteModal(null);
  };

  const eventTypes = ['全部', '商業開幕', '品牌發表會', '婚禮慶典', '私人派對', '企業年會'];
  const [selectedType, setSelectedType] = useState('全部');

  const filteredPortfolios = selectedType === '全部' 
    ? portfolios 
    : portfolios.filter(p => p.type === selectedType);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('portfolioTitle')}</h1>
            <p className="text-gray-600">{t('portfolioSubtitle')}</p>
          </div>
          <Link
            href="/admin/portfolio/new"
            className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            {t('addCase')}
          </Link>
        </div>

        {/* 篩選器 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-lime-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 案例列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredPortfolios.map((portfolio) => (
              <div key={portfolio.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={portfolio.image}
                  alt={portfolio.name}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{portfolio.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      portfolio.status === '已發佈' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {portfolio.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{portfolio.type}</p>
                  <p className="text-sm text-gray-500 mb-4">{portfolio.date}</p>
                  
                  <div className="flex justify-between">
                    <Link
                      href={`/portfolio/${portfolio.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
                    >
                      <i className="ri-eye-line mr-1"></i>
                      查看
                    </Link>
                    <Link
                      href={`/admin/portfolio/edit/${portfolio.id}`}
                      className="text-lime-600 hover:text-lime-800 text-sm cursor-pointer"
                    >
                      <i className="ri-edit-line mr-1"></i>
                      {t('edit')}
                    </Link>
                    <button
                      onClick={() => setShowDeleteModal(portfolio.id)}
                      className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
                    >
                      <i className="ri-delete-bin-line mr-1"></i>
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPortfolios.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-folder-open-line text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500">{t('noMatchingCases')}</p>
            </div>
          )}
        </div>

        {/* 刪除確認對話框 */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('confirmDelete')}</h3>
              <p className="text-gray-600 mb-6">{t('confirmDeleteMessage')}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer whitespace-nowrap"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap"
                >
                  {t('confirmDeleteAction')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
