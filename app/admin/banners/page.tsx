'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

export default function BannersManagement() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: '主頁橫幅 - 活動策劃專家',
      description: '展示CL Events專業活動策劃服務的主要橫幅',
      imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20event%20planning%20company%20banner%20with%20elegant%20design%2C%20corporate%20style%2C%20modern%20layout%2C%20premium%20quality%20business%20atmosphere%20with%20clean%20background&width=1200&height=400&seq=banner1&orientation=landscape',
      link: '/services',
      position: '首頁頂部',
      status: '啟用',
      displayOrder: 1,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      clickCount: 1245,
      createdAt: '2024-01-15 10:30'
    },
    {
      id: 2,
      title: '成功案例展示橫幅',
      description: '展示我們的成功案例作品集',
      imageUrl: 'https://readdy.ai/api/search-image?query=Event%20portfolio%20showcase%20banner%20with%20multiple%20successful%20events%20collage%2C%20professional%20photography%2C%20elegant%20design%2C%20premium%20corporate%20style%20with%20clean%20background&width=1200&height=400&seq=banner2&orientation=landscape',
      link: '/portfolio',
      position: '首頁中段',
      status: '啟用',
      displayOrder: 2,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      clickCount: 890,
      createdAt: '2024-01-20 14:15'
    },
    {
      id: 3,
      title: '聯絡我們 CTA 橫幅',
      description: '鼓勵客戶聯絡我們的行動呼籲橫幅',
      imageUrl: 'https://readdy.ai/api/search-image?query=Contact%20us%20call%20to%20action%20banner%20with%20professional%20design%2C%20modern%20style%2C%20elegant%20layout%2C%20business%20communication%20theme%20with%20clean%20background&width=1200&height=400&seq=banner3&orientation=landscape',
      link: '/contact',
      position: '頁面底部',
      status: '啟用',
      displayOrder: 3,
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      clickCount: 567,
      createdAt: '2024-02-01 09:00'
    },
    {
      id: 4,
      title: '特殊優惠活動橫幅',
      description: '限時優惠活動宣傳橫幅',
      imageUrl: 'https://readdy.ai/api/search-image?query=Special%20promotion%20banner%20with%20attractive%20design%2C%20limited%20time%20offer%20theme%2C%20modern%20corporate%20style%2C%20professional%20quality%20with%20clean%20background&width=1200&height=400&seq=banner4&orientation=landscape',
      link: '/services',
      position: '首頁頂部',
      status: '暫停',
      displayOrder: 4,
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      clickCount: 234,
      createdAt: '2024-02-10 16:45'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [filterStatus, setFilterStatus] = useState('全部');
  const [newBanner, setNewBanner] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    position: '首頁頂部',
    status: '啟用',
    displayOrder: 1,
    startDate: '',
    endDate: ''
  });

  // 儲存橫幅資料到 localStorage
  useEffect(() => {
    const savedBanners = localStorage.getItem('banners_data');
    if (savedBanners) {
      try {
        setBanners(JSON.parse(savedBanners));
      } catch (error) {
        console.error('無法載入橫幅資料:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('banners_data', JSON.stringify(banners));
  }, [banners]);

  const statusOptions = ['全部', '啟用', '暫停', '已過期'];
  const positionOptions = ['首頁頂部', '首頁中段', '頁面底部', '關於我們頁面', '服務頁面', '聯絡頁面'];

  const filteredBanners = banners.filter(banner => 
    filterStatus === '全部' || banner.status === filterStatus
  );

  const handleAddBanner = () => {
    if (!newBanner.title.trim() || !newBanner.imageUrl.trim()) {
      alert('請填寫橫幅標題和圖片網址');
      return;
    }

    const bannerToAdd = {
      ...newBanner,
      id: Date.now(),
      clickCount: 0,
      createdAt: new Date().toLocaleString('zh-TW')
    };

    setBanners(prev => [...prev, bannerToAdd].sort((a, b) => a.displayOrder - b.displayOrder));
    setNewBanner({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      position: '首頁頂部',
      status: '啟用',
      displayOrder: 1,
      startDate: '',
      endDate: ''
    });
    setShowAddModal(false);

    // 顯示成功訊息
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = '橫幅已成功新增！';
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  };

  const handleEditBanner = () => {
    if (!selectedBanner.title.trim() || !selectedBanner.imageUrl.trim()) {
      alert('請填寫橫幅標題和圖片網址');
      return;
    }

    setBanners(prev => prev.map(banner => 
      banner.id === selectedBanner.id ? selectedBanner : banner
    ).sort((a, b) => a.displayOrder - b.displayOrder));
    
    setShowEditModal(false);
    setSelectedBanner(null);

    // 顯示成功訊息
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = '橫幅已成功更新！';
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  };

  const handleDeleteBanner = () => {
    setBanners(prev => prev.filter(banner => banner.id !== selectedBanner.id));
    setShowDeleteModal(false);
    setSelectedBanner(null);

    // 顯示成功訊息
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = '橫幅已成功刪除！';
    document.body.appendChild(successMsg);
    setTimeout(() => document.body.removeChild(successMsg), 3000);
  };

  const openEditModal = (banner) => {
    setSelectedBanner({ ...banner });
    setShowEditModal(true);
  };

  const openDeleteModal = (banner) => {
    setSelectedBanner(banner);
    setShowDeleteModal(true);
  };

  const toggleBannerStatus = (bannerId) => {
    setBanners(prev => prev.map(banner => 
      banner.id === bannerId 
        ? { ...banner, status: banner.status === '啟用' ? '暫停' : '啟用' }
        : banner
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '啟用':
        return 'bg-green-100 text-green-800';
      case '暫停':
        return 'bg-yellow-100 text-yellow-800';
      case '已過期':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">橫幅管理</h1>
            <p className="text-gray-600">管理網站各個頁面的橫幅圖片與連結</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            新增橫幅
          </button>
        </div>

        {/* 統計概覽 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">總橫幅數</p>
                <p className="text-2xl font-bold text-gray-900">{banners.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-image-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">啟用中</p>
                <p className="text-2xl font-bold text-gray-900">
                  {banners.filter(b => b.status === '啟用').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">總點擊數</p>
                <p className="text-2xl font-bold text-gray-900">
                  {banners.reduce((sum, b) => sum + b.clickCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-cursor-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">平均點擊率</p>
                <p className="text-2xl font-bold text-gray-900">
                  {banners.length > 0 ? Math.round(banners.reduce((sum, b) => sum + b.clickCount, 0) / banners.length) : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-bar-chart-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* 篩選器 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-lime-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* 橫幅列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">橫幅預覽</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">標題與描述</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">位置</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">點擊數</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排序</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBanners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="w-24 h-16 object-cover object-top rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{banner.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{banner.description}</div>
                        {banner.link && (
                          <div className="text-xs text-blue-600 mt-1">
                            <i className="ri-external-link-line mr-1"></i>
                            {banner.link}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded-full">
                        {banner.position}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(banner.status)}`}>
                          {banner.status}
                        </span>
                        <button
                          onClick={() => toggleBannerStatus(banner.id)}
                          className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                          title={banner.status === '啟用' ? '點擊暫停' : '點擊啟用'}
                        >
                          <i className={`ri-${banner.status === '啟用' ? 'pause' : 'play'}-line`}></i>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{banner.clickCount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-mono">{banner.displayOrder}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => openEditModal(banner)}
                          className="text-blue-600 hover:text-blue-900 cursor-pointer"
                          title="編輯橫幅"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => openDeleteModal(banner)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          title="刪除橫幅"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBanners.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-image-line text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">目前沒有符合條件的橫幅</p>
            </div>
          )}
        </div>

        {/* 新增橫幅彈窗 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">新增橫幅</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">橫幅標題</label>
                    <input
                      type="text"
                      value={newBanner.title}
                      onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="輸入橫幅標題"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                    <textarea
                      value={newBanner.description}
                      onChange={(e) => setNewBanner({...newBanner, description: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="輸入橫幅描述"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">圖片網址</label>
                    <input
                      type="url"
                      value={newBanner.imageUrl}
                      onChange={(e) => setNewBanner({...newBanner, imageUrl: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="輸入圖片網址"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">連結網址</label>
                    <input
                      type="url"
                      value={newBanner.link}
                      onChange={(e) => setNewBanner({...newBanner, link: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="輸入點擊後的連結網址（可選）"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">顯示位置</label>
                      <select
                        value={newBanner.position}
                        onChange={(e) => setNewBanner({...newBanner, position: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent pr-8"
                      >
                        {positionOptions.map(position => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">狀態</label>
                      <select
                        value={newBanner.status}
                        onChange={(e) => setNewBanner({...newBanner, status: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent pr-8"
                      >
                        <option value="啟用">啟用</option>
                        <option value="暫停">暫停</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">顯示順序</label>
                      <input
                        type="number"
                        min="1"
                        value={newBanner.displayOrder}
                        onChange={(e) => setNewBanner({...newBanner, displayOrder: parseInt(e.target.value) || 1})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">開始日期</label>
                      <input
                        type="date"
                        value={newBanner.startDate}
                        onChange={(e) => setNewBanner({...newBanner, startDate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">結束日期</label>
                      <input
                        type="date"
                        value={newBanner.endDate}
                        onChange={(e) => setNewBanner({...newBanner, endDate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAddBanner}
                    className="px-6 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    新增橫幅
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 編輯橫幅彈窗 */}
        {showEditModal && selectedBanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">編輯橫幅</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">橫幅標題</label>
                    <input
                      type="text"
                      value={selectedBanner.title}
                      onChange={(e) => setSelectedBanner({...selectedBanner, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                    <textarea
                      value={selectedBanner.description}
                      onChange={(e) => setSelectedBanner({...selectedBanner, description: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">圖片網址</label>
                    <input
                      type="url"
                      value={selectedBanner.imageUrl}
                      onChange={(e) => setSelectedBanner({...selectedBanner, imageUrl: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">連結網址</label>
                    <input
                      type="url"
                      value={selectedBanner.link}
                      onChange={(e) => setSelectedBanner({...selectedBanner, link: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">顯示位置</label>
                      <select
                        value={selectedBanner.position}
                        onChange={(e) => setSelectedBanner({...selectedBanner, position: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent pr-8"
                      >
                        {positionOptions.map(position => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">狀態</label>
                      <select
                        value={selectedBanner.status}
                        onChange={(e) => setSelectedBanner({...selectedBanner, status: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent pr-8"
                      >
                        <option value="啟用">啟用</option>
                        <option value="暫停">暫停</option>
                        <option value="已過期">已過期</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">顯示順序</label>
                      <input
                        type="number"
                        min="1"
                        value={selectedBanner.displayOrder}
                        onChange={(e) => setSelectedBanner({...selectedBanner, displayOrder: parseInt(e.target.value) || 1})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">開始日期</label>
                      <input
                        type="date"
                        value={selectedBanner.startDate}
                        onChange={(e) => setSelectedBanner({...selectedBanner, startDate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">結束日期</label>
                      <input
                        type="date"
                        value={selectedBanner.endDate}
                        onChange={(e) => setSelectedBanner({...selectedBanner, endDate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleEditBanner}
                    className="px-6 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    更新橫幅
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 刪除確認彈窗 */}
        {showDeleteModal && selectedBanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-delete-bin-line text-red-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">確認刪除</h3>
                  <p className="text-sm text-gray-500">此操作無法復原</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">您確定要刪除橫幅「{selectedBanner.title}」嗎？</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  取消
                </button>
                <button
                  onClick={handleDeleteBanner}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  確認刪除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}