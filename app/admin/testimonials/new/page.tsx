
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../components/AdminLayout';
import Link from 'next/link';

export default function NewTestimonial() {
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
      
      console.log('新增評價:', formData);
      
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">新增客戶評價</h1>
            <p className="text-gray-600">填寫客戶評價資訊</p>
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
                      自動生成
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
                    新增中...
                  </div>
                ) : (
                  '新增評價'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
