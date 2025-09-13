
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/AdminLayout';
import Link from 'next/link';

interface EditTestimonialClientProps {
  testimonialId: string;
}

export default function EditTestimonialClient({ testimonialId }: EditTestimonialClientProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    content: '',
    rating: 5,
    eventType: '',
    status: '草稿',
    avatar: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mockTestimonials = {
    '1': {
      name: '張執行長',
      company: 'XYZ科技股份有限公司',
      content: '我們公司在馬尼拉的開幕記者會，從場地到媒體都由 CL 一手包辦，效率極高！整個活動流程順暢，賓客反應熱烈，完全超出我們的期待。CL 團隊的專業度和執行力讓我們非常安心。',
      rating: 5,
      eventType: '商業開幕',
      status: '已發布',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20executive%20CEO%20in%20formal%20business%20suit%20with%20confident%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar1&orientation=squarish'
    },
    '2': {
      name: '李總監',
      company: 'ABC貿易集團',
      content: '在宿霧舉辦的年會活動，CL Events 幫我們找到了絕佳的海景場地，現場佈置典雅大方，員工們都非常滿意。最重要的是溝通完全無障礙，讓我們這些不懂菲律賓文的主辦方安心許多。',
      rating: 5,
      eventType: '企業年會',
      status: '已發布',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20woman%20director%20in%20elegant%20business%20attire%20with%20warm%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar2&orientation=squarish'
    },
    '3': {
      name: '王小姐',
      company: '私人客戶',
      content: '在長灘島的海島婚禮，從佈置到攝影都美得像童話一樣！CL 團隊考慮到每個細節，讓我們在異國他鄉也能擁有夢幻的婚禮體驗。賓客們到現在還在稱讚這場婚禮的完美。',
      rating: 5,
      eventType: '婚禮慶典',
      status: '已發布',
      avatar: 'https://readdy.ai/api/search-image?query=Elegant%20Asian%20bride%20in%20beautiful%20white%20wedding%20dress%20with%20happy%20smile%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar3&orientation=squarish'
    },
    '4': {
      name: '陳經理',
      company: 'DEF製造業',
      content: '產品發表會的成功舉辦，讓我們在菲律賓市場的品牌知名度大幅提升。CL 不僅安排了當地媒體採訪，還協助我們與重要客戶建立了良好關係。真的是一次非常成功的合作！',
      rating: 5,
      eventType: '產品發表會',
      status: '待審核',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20business%20manager%20in%20formal%20shirt%20and%20tie%20with%20confident%20expression%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar4&orientation=squarish'
    },
    '5': {
      name: '林董事長',
      company: 'GHI建設集團',
      content: '集團的30週年慶典活動，CL Events 從策劃到執行都展現了極高的專業水準。現場的燈光音響效果震撼人心，讓所有與會者都留下深刻印象。',
      rating: 4,
      eventType: '週年慶典',
      status: '草稿',
      avatar: 'https://readdy.ai/api/search-image?query=Distinguished%20Asian%20business%20chairman%20in%20premium%20suit%20with%20authoritative%20presence%20studio%20portrait%20with%20clean%20white%20background%20high%20quality%20professional%20headshot&width=120&height=120&seq=avatar5&orientation=squarish'
    }
  };

  const eventTypes = [
    '商業開幕',
    '企業年會',
    '婚禮慶典',
    '產品發表會',
    '週年慶典',
    '品牌活動',
    '媒體發佈會',
    '展覽會議',
    '私人聚會',
    '其他'
  ];

  const statusOptions = [
    { value: '草稿', label: '草稿' },
    { value: '待審核', label: '待審核' },
    { value: '已發布', label: '已發布' }
  ];

  useEffect(() => {
    const loadTestimonial = () => {
      const testimonial = mockTestimonials[testimonialId];
      if (testimonial) {
        setFormData(testimonial);
      }
      setIsLoading(false);
    };

    loadTestimonial();
  }, [testimonialId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '請輸入客戶姓名';
    }

    if (!formData.company.trim()) {
      newErrors.company = '請輸入公司名稱';
    }

    if (!formData.content.trim()) {
      newErrors.content = '請輸入評價內容';
    } else if (formData.content.length < 20) {
      newErrors.content = '評價內容至少需要20個字';
    } else if (formData.content.length > 500) {
      newErrors.content = '評價內容不能超過500個字';
    }

    if (!formData.eventType) {
      newErrors.eventType = '請選擇活動類型';
    }

    if (!formData.avatar.trim()) {
      newErrors.avatar = '請輸入頭像圖片網址';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('更新評價:', formData);
      
      router.push('/admin/testimonials');
    } catch (error) {
      console.error('儲存失敗:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAvatarUrl = () => {
    const prompts = [
      'Professional Asian business person in formal attire with confident smile studio portrait with clean white background high quality professional headshot',
      'Elegant Asian client in business casual clothing with warm expression studio portrait with clean white background high quality professional headshot',
      'Distinguished Asian executive in premium suit with friendly demeanor studio portrait with clean white background high quality professional headshot'
    ];
    
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    const randomSeq = Math.random().toString(36).substring(7);
    
    const avatarUrl = `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28randomPrompt%29%7D&width=120&height=120&seq=${randomSeq}&orientation=squarish`;
    
    setFormData(prev => ({
      ...prev,
      avatar: avatarUrl
    }));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">載入中...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link
            href="/admin/testimonials"
            className="mr-4 p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">編輯客戶評價</h1>
            <p className="text-gray-600">修改客戶評價資訊</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* 客戶基本資訊 */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">客戶基本資訊</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    客戶姓名 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="請輸入客戶姓名"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公司名稱 *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="請輸入公司名稱"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 頭像設定 */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">頭像設定</h3>
              
              <div className="flex items-start space-x-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    頭像圖片網址 *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors ${
                        errors.avatar ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="請輸入圖片網址"
                    />
                    <button
                      type="button"
                      onClick={generateAvatarUrl}
                      className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      重新生成
                    </button>
                  </div>
                  {errors.avatar && (
                    <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
                  )}
                </div>
                
                {formData.avatar && (
                  <div className="flex-shrink-0">
                    <img
                      src={formData.avatar}
                      alt="頭像預覽"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 評價內容 */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">評價內容</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  評價內容 * 
                  <span className="text-xs text-gray-500 ml-2">
                    ({formData.content.length}/500)
                  </span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={6}
                  maxLength={500}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="請輸入客戶的詳細評價內容..."
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    評分等級
                  </label>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="cursor-pointer"
                      >
                        <i className={`text-2xl ${
                          star <= formData.rating 
                            ? 'ri-star-fill text-yellow-400' 
                            : 'ri-star-line text-gray-300'
                        }`}></i>
                      </button>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {formData.rating} 顆星
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    活動類型 *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors pr-8 ${
                      errors.eventType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">請選擇活動類型</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventType}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 發布設定 */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">發布設定</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  發布狀態
                </label>
                <div className="flex space-x-4">
                  {statusOptions.map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={handleInputChange}
                        className="mr-2 text-lime-500 focus:ring-lime-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 提交按鈕 */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/admin/testimonials"
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                取消
              </Link>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSubmitting}
                className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    更新中...
                  </div>
                ) : (
                  '儲存變更'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
