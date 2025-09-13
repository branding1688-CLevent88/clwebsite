
'use client';
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Link from 'next/link';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: '張執行長',
      company: 'XYZ科技股份有限公司',
      content: '我們公司在馬尼拉的開幕記者會，從場地到媒體都由 CL 一手包辦，效率極高！整個活動流程順暢，賓客反應熱烈，完全超出我們的期待。CL 團隊的專業度和執行力讓我們非常安心。',
      rating: 5,
      eventType: '商業開幕',
      date: '2024-01-15',
      status: '已發布',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20executive%20CEO%20in%20formal%20business%20suit%20with%20confident%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar1&orientation=squarish'
    },
    {
      id: 2,
      name: '李總監',
      company: 'ABC貿易集團',
      content: '在宿霧舉辦的年會活動，CL Events 幫我們找到了絕佳的海景場地，現場佈置典雅大方，員工們都非常滿意。最重要的是溝通完全無障礙，讓我們這些不懂菲律賓文的主辦方安心許多。',
      rating: 5,
      eventType: '企業年會',
      date: '2024-01-20',
      status: '已發布',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20woman%20director%20in%20elegant%20business%20attire%20with%20warm%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar2&orientation=squarish'
    },
    {
      id: 3,
      name: '王小姐',
      company: '私人客戶',
      content: '在長灘島的海島婚禮，從佈置到攝影都美得像童話一樣！CL 團隊考慮到每個細節，讓我們在異國他鄉也能擁有夢幻的婚禮體驗。賓客們到現在還在稱讚這場婚禮的完美。',
      rating: 5,
      eventType: '婚禮慶典',
      date: '2024-02-01',
      status: '已發布',
      avatar: 'https://readdy.ai/api/search-image?query=Elegant%20Asian%20bride%20in%20beautiful%20white%20wedding%20dress%20with%20happy%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar3&orientation=squarish'
    },
    {
      id: 4,
      name: '陳經理',
      company: 'DEF製造業',
      content: '產品發表會的成功舉辦，讓我們在菲律賓市場的品牌知名度大幅提升。CL 不僅安排了當地媒體採訪，還協助我們與重要客戶建立了良好關係。真的是一次非常成功的合作！',
      rating: 5,
      eventType: '產品發表會',
      date: '2024-02-10',
      status: '待審核',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20manager%20in%20formal%20shirt%20and%20tie%20with%20confident%20expression%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar4&orientation=squarish'
    },
    {
      id: 5,
      name: '林董事長',
      company: 'GHI建設集團',
      content: '集團的30週年慶典活動，CL Events 從策劃到執行都展現了極高的專業水準。現場的燈光音響效果震撼人心，讓所有與會者都留下深刻印象。',
      rating: 4,
      eventType: '週年慶典',
      date: '2024-02-05',
      status: '草稿',
      avatar: 'https://readdy.ai/api/search-image?query=Distinguished%20Asian%20business%20chairman%20in%20premium%20suit%20with%20authoritative%20presence%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar5&orientation=squarish'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('全部');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const statusOptions = ['全部', '已發布', '待審核', '草稿'];

  const filteredTestimonials = testimonials.filter(testimonial => 
    statusFilter === '全部' || testimonial.status === statusFilter
  );

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setTestimonials(testimonials.filter(t => t.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '已發布':
        return 'bg-green-100 text-green-800';
      case '待審核':
        return 'bg-yellow-100 text-yellow-800';
      case '草稿':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">客戶推薦管理</h1>
            <p className="text-gray-600">管理客戶評價與推薦內容</p>
          </div>
          <Link
            href="/admin/testimonials/new"
            className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap flex items-center"
          >
            <i className="ri-add-line mr-2"></i>
            新增評價
          </Link>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">總評價數</p>
                <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-chat-3-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">已發布</p>
                <p className="text-2xl font-bold text-gray-900">
                  {testimonials.filter(t => t.status === '已發布').length}
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
                <p className="text-sm font-medium text-gray-600 mb-1">待審核</p>
                <p className="text-2xl font-bold text-gray-900">
                  {testimonials.filter(t => t.status === '待審核').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-yellow-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">平均評分</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-star-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* 篩選按鈕 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-lime-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* 評價列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">客戶資訊</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">評價內容</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">評分</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">活動類型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {testimonial.content.length > 100 
                          ? `${testimonial.content.substring(0, 100)}...`
                          : testimonial.content
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{testimonial.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{testimonial.eventType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={testimonial.status}
                        onChange={(e) => handleStatusChange(testimonial.id, e.target.value)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border-0 pr-8 cursor-pointer ${getStatusColor(testimonial.status)}`}
                      >
                        <option value="已發布">已發布</option>
                        <option value="待審核">待審核</option>
                        <option value="草稿">草稿</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{testimonial.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/testimonials/edit/${testimonial.id}`}
                          className="text-lime-600 hover:text-lime-900 cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(testimonial.id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
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

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-chat-3-line text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">目前沒有符合條件的評價</p>
            </div>
          )}
        </div>

        {/* 刪除確認彈窗 */}
        {showDeleteModal && (
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
              <p className="text-gray-700 mb-6">您確定要刪除這則客戶評價嗎？</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  取消
                </button>
                <button
                  onClick={handleDeleteConfirm}
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
