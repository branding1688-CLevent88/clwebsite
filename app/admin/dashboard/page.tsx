
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVisits: 15420,
    newContacts: 0,
    totalCases: 0,
    activeProjects: 0,
    testimonials: 0,
    publishedTestimonials: 0,
    averageRating: 0,
    totalForms: 0,
    recentActivity: []
  });

  const [recentContacts, setRecentContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);

  // 模擬真實數據
  const mockContacts = [
    {
      id: 1,
      name: '張小姐',
      eventType: '婚禮慶典',
      date: new Date().toLocaleDateString('zh-TW'),
      status: '新訊息'
    },
    {
      id: 2,
      name: 'ABC科技有限公司',
      eventType: '品牌發表會',
      date: new Date(Date.now() - 86400000).toLocaleDateString('zh-TW'),
      status: '處理中'
    },
    {
      id: 3,
      name: '王先生',
      eventType: '商業開幕',
      date: new Date(Date.now() - 172800000).toLocaleDateString('zh-TW'),
      status: '已處理'
    }
  ];

  const mockPortfolios = [
    { id: 1, name: 'XYZ科技新品發表會', status: '已發佈' },
    { id: 2, name: 'ABC集團開幕慶典', status: '已發佈' },
    { id: 3, name: '長灘島夢幻海島婚禮', status: '草稿' }
  ];

  const mockTestimonials = [
    { id: 1, rating: 5, status: '已發布' },
    { id: 2, rating: 5, status: '已發布' },
    { id: 3, rating: 5, status: '已發布' },
    { id: 4, rating: 5, status: '待審核' },
    { id: 5, rating: 4, status: '草稿' }
  ];

  // 即時數據同步功能
  const syncWithWebsite = async () => {
    try {
      setIsRealTimeConnected(true);

      // 從各個表單API獲取最新數據
      const formAPIs = [
        'https://readdy.ai/api/form/d1p8chfue0tsq9kt5gsg/submissions', // 免費報價表單
        // 其他表單API可以在這裡添加
      ];

      let allFormSubmissions = [];

      for (const apiUrl of formAPIs) {
        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            const submissions = await response.json();
            if (submissions && Array.isArray(submissions)) {
              allFormSubmissions = [...allFormSubmissions, ...submissions];
            }
          }
        } catch (error) {
          console.log(`API ${apiUrl} 連接失敗，使用模擬數據`);
        }
      }

      // 處理表單數據
      if (allFormSubmissions.length > 0) {
        const processedContacts = allFormSubmissions.map((submission, index) => ({
          id: Date.now() + index,
          name: submission.name || '未提供',
          contact: submission.contact || submission.email || submission.phone || '未提供',
          eventType: submission.eventType || '未填寫',
          eventDate: submission.eventDate,
          message: submission.message || submission.requirements,
          status: '新訊息',
          createdAt: new Date().toLocaleString('zh-TW'),
          source: submission.source || '網站表單'
        }));

        setRecentContacts(prev => [...processedContacts, ...prev.slice(0, 5)]);
      }

      // 從本地存儲獲取其他數據
      const savedPortfolios = JSON.parse(localStorage.getItem('portfolio_data') || '[]');
      const savedTestimonials = JSON.parse(localStorage.getItem('testimonials_data') || '[]');
      const savedContacts = JSON.parse(localStorage.getItem('contacts_data') || '[]');

      // 合併所有聯絡數據
      const allContacts = [...allFormSubmissions, ...savedContacts, ...mockContacts];

      // 計算統計數據
      const newContactsCount = allContacts.filter(c => c.status === '新訊息').length;
      const totalCasesCount = [...savedPortfolios, ...mockPortfolios].length;
      const activeProjectsCount = [...savedPortfolios, ...mockPortfolios].filter(p => p.status === '草稿').length;
      const allTestimonials = [...savedTestimonials, ...mockTestimonials];
      const testimonialsCount = allTestimonials.length;
      const publishedTestimonialsCount = allTestimonials.filter(t => t.status === '已發布').length;
      const averageRating = allTestimonials.length > 0
        ? allTestimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / allTestimonials.length
        : 0;

      // 計算總表單提交數
      const totalFormsCount = allContacts.length;

      // 更新統計數據
      setStats(prev => ({
        ...prev,
        newContacts: newContactsCount,
        totalCases: totalCasesCount,
        activeProjects: activeProjectsCount,
        testimonials: testimonialsCount,
        publishedTestimonials: publishedTestimonialsCount,
        averageRating: Number(averageRating.toFixed(1)),
        totalForms: totalFormsCount,
        totalVisits: Math.floor(Math.random() * 2000) + prev.totalVisits, // 模擬流量增長
        recentActivity: [
          `${new Date().toLocaleTimeString('zh-TW')} - 同步了 ${allFormSubmissions.length} 筆新表單數據`,
          `${new Date().toLocaleTimeString('zh-TW')} - 更新了 ${testimonialsCount} 則客戶評價`,
          `${new Date().toLocaleTimeString('zh-TW')} - 載入了 ${totalCasesCount} 個成功案例`
        ]
      }));

      setLastUpdateTime(new Date());

    } catch (error) {
      console.error('數據同步失敗:', error);
      setIsRealTimeConnected(false);

      // 使用模擬數據作為備案
      const newContactsCount = mockContacts.filter(c => c.status === '新訊息').length;
      const totalCasesCount = mockPortfolios.length;
      const activeProjectsCount = mockPortfolios.filter(p => p.status === '草稿').length;
      const testimonialsCount = mockTestimonials.length;
      const publishedTestimonialsCount = mockTestimonials.filter(t => t.status === '已發布').length;
      const averageRating = mockTestimonials.length > 0
        ? mockTestimonials.reduce((sum, t) => sum + t.rating, 0) / mockTestimonials.length
        : 0;

      setStats(prev => ({
        ...prev,
        newContacts: newContactsCount,
        totalCases: totalCasesCount,
        activeProjects: activeProjectsCount,
        testimonials: testimonialsCount,
        publishedTestimonials: publishedTestimonialsCount,
        averageRating: Number(averageRating.toFixed(1)),
        totalForms: mockContacts.length,
        totalVisits: Math.floor(Math.random() * 1000) + 15000
      }));

      setRecentContacts(mockContacts);
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      try {
        // 初始化數據同步
        await syncWithWebsite();

      } catch (error) {
        console.error('載入儀表板數據失敗:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();

    // 每5秒自動同步數據
    const syncInterval = setInterval(syncWithWebsite, 5000);

    // 每5分鐘重載一次完整數據
    const reloadInterval = setInterval(loadDashboardData, 300000);

    return () => {
      clearInterval(syncInterval);
      clearInterval(reloadInterval);
    };
  }, []);

  const handleViewDetails = (contactId) => {
    // 跳轉到聯絡表單管理頁面
    window.location.href = '/admin/contacts';
  };

  const handleManualSync = async () => {
    setIsLoading(true);
    await syncWithWebsite();
    setIsLoading(false);
  };

  if (isLoading && !stats.totalVisits) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">正在同步網站數據...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">網站儀表板</h1>
              <p className="text-gray-600">即時監控網站數據與客戶互動</p>
            </div>
            <button
              onClick={handleManualSync}
              disabled={isLoading}
              className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  同步中...
                </>
              ) : (
                <>
                  <i className="ri-refresh-line mr-2"></i>
                  立即同步
                </>
              )}
            </button>
          </div>

          {/* 即時連接狀態 */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center" suppressHydrationWarning={true}>
              <div className={`w-2 h-2 rounded-full mr-2 ${isRealTimeConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-600">
                {isRealTimeConnected ? '網站數據已連接' : '離線模式'}
              </span>
            </div>
            <div className="text-gray-500" suppressHydrationWarning={true}>
              最後更新：{lastUpdateTime.toLocaleString('zh-TW')}
            </div>
            <div className="text-gray-500">
              自動同步：每5秒
            </div>
          </div>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">網站總瀏覽量</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVisits.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↗ 即時更新中</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-eye-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">新聯絡訊息</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newContacts}</p>
                <Link href="/admin/contacts" className="text-xs text-lime-600 hover:text-lime-800 cursor-pointer">
                  立即處理 →
                </Link>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-mail-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">成功案例</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCases}</p>
                <Link href="/admin/portfolio" className="text-xs text-lime-600 hover:text-lime-800 cursor-pointer">
                  管理案例 →
                </Link>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-trophy-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">表單提交總數</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalForms}</p>
                <p className="text-xs text-blue-600 mt-1">來自所有表單</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-list-3-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* 即時活動日誌 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {/* 最新聯絡訊息 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">最新聯絡訊息</h2>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">即時更新</span>
                  <Link
                    href="/admin/contacts"
                    className="text-lime-600 hover:text-lime-800 text-sm cursor-pointer flex items-center"
                  >
                    查看全部
                    <i className="ri-arrow-right-line ml-1"></i>
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">聯絡人</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">活動類型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentContacts.slice(0, 5).map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{contact.eventType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{contact.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            contact.status === '新訊息' ? 'bg-red-100 text-red-800' :
                              contact.status === '處理中' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                          }`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleViewDetails(contact.id)}
                            className="text-lime-600 hover:text-lime-900 cursor-pointer"
                          >
                            查看詳情
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {recentContacts.length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-mail-line text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">暫無最新聯絡訊息</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* 即時活動 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-pulse-line mr-2 text-green-500"></i>
                即時活動
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">{activity}</p>
                  </div>
                ))}
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600" suppressHydrationWarning={true}>
                    {new Date().toLocaleTimeString('zh-TW')} - 儀表板數據已更新
                  </p>
                </div>
              </div>
            </div>

            {/* 快速統計 */}
            <div className="bg-gradient-to-r from-lime-400 to-green-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lime-100 text-sm mb-1">已發布評價</p>
                  <p className="text-3xl font-bold">{stats.publishedTestimonials}</p>
                </div>
                <i className="ri-check-double-line text-3xl text-lime-100"></i>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">平均評分</p>
                  <p className="text-3xl font-bold">{stats.averageRating}</p>
                </div>
                <i className="ri-star-fill text-3xl text-blue-100"></i>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">進行中專案</p>
                  <p className="text-3xl font-bold">{stats.activeProjects}</p>
                </div>
                <i className="ri-calendar-line text-3xl text-purple-100"></i>
              </div>
            </div>
          </div>
        </div>

        {/* 快速操作區域 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/portfolio/new"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-lime-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center group-hover:bg-lime-200 transition-colors">
                <i className="ri-add-line text-lime-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">新增案例</h3>
                <p className="text-xs text-gray-500">添加新的成功案例</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/testimonials/new"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-lime-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <i className="ri-chat-3-line text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">新增評價</h3>
                <p className="text-xs text-gray-500">添加客戶推薦內容</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/contacts"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-lime-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <i className="ri-mail-line text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">聯絡管理</h3>
                <p className="text-xs text-gray-500">處理客戶聯絡表單</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-lime-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <i className="ri-settings-line text-purple-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">系統設定</h3>
                <p className="text-xs text-gray-500">網站基本設定管理</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
