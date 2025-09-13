
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../components/AdminLayout';
import Link from 'next/link';

export default function NewPortfolio() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    client: '',
    services: '',
    challenge: '',
    solution: '',
    results: ['', '', ''],
    description: ''
  });

  const [mainImage, setMainImage] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    '商業開幕',
    '品牌發表會', 
    '婚禮慶典',
    '私人派對',
    '企業活動',
    '產品發布'
  ];

  const handleSave = async () => {
    setIsSubmitting(true);
    
    // 模擬保存過程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 這裡會保存到資料庫
    console.log('Saving portfolio:', { ...formData, mainImage, galleryImages });
    
    setIsSubmitting(false);
    router.push('/admin/portfolio');
  };

  const handleImageUpload = (type: 'main' | 'gallery') => {
    // 模擬圖片上傳，實際使用時會處理真實的檔案上傳
    if (type === 'main') {
      const sampleImage = `https://readdy.ai/api/search-image?query=professional%20event%20photography%20showcasing%20elegant%20venue%20setup%20with%20beautiful%20lighting%20and%20decor%2C%20high%20quality%20event%20documentation&width=800&height=600&seq=portfolio${Date.now()}&orientation=landscape`;
      setMainImage(sampleImage);
    } else {
      const newImages = Array.from({length: 5}, (_, i) => 
        `https://readdy.ai/api/search-image?query=event%20photography%20gallery%20showing%20different%20aspects%20of%20professional%20event%20execution%2C%20beautiful%20venue%20details%20and%20guest%20interactions&width=600&height=400&seq=gallery${Date.now()}${i}&orientation=landscape`
      );
      setGalleryImages([...galleryImages, ...newImages]);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link
            href="/admin/portfolio"
            className="mr-4 p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">新增成功案例</h1>
            <p className="text-gray-600">建立新的案例展示頁面</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 space-y-6">
            {/* 基本資訊 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活動名稱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="例如：SIGMA 2025 新品發表會"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活動類型 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent pr-8"
                >
                  <option value="">請選擇活動類型</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活動日期
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  客戶名稱
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="例如：XYZ 科技"
                />
              </div>
            </div>

            {/* 服務項目 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                提供服務
              </label>
              <input
                type="text"
                value={formData.services}
                onChange={(e) => setFormData({...formData, services: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="例如：整體策劃、視覺設計、媒體公關"
              />
            </div>

            {/* 挑戰與解決方案 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  客戶的挑戰
                </label>
                <textarea
                  value={formData.challenge}
                  onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="簡述客戶面臨的挑戰或需求..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  我們的解決方案
                </label>
                <textarea
                  value={formData.solution}
                  onChange={(e) => setFormData({...formData, solution: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  placeholder="說明如何解決客戶的問題..."
                />
              </div>
            </div>

            {/* 成果亮點 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                成果與亮點
              </label>
              <div className="space-y-3">
                {formData.results.map((result, index) => (
                  <input
                    key={index}
                    type="text"
                    value={result}
                    onChange={(e) => {
                      const newResults = [...formData.results];
                      newResults[index] = e.target.value;
                      setFormData({...formData, results: newResults});
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder={`亮點 ${index + 1}：例如 30+ 家媒體出席報導`}
                  />
                ))}
              </div>
            </div>

            {/* 詳細說明 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                執行項目說明
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={6}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="詳細描述活動執行過程、特色亮點等..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 字</p>
            </div>

            {/* 圖片上傳 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  案例主圖
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {mainImage ? (
                    <div className="relative">
                      <img src={mainImage} alt="主圖預覽" className="w-full h-48 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => setMainImage('')}
                        className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <i className="ri-image-line text-4xl text-gray-400 mb-2"></i>
                      <p className="text-gray-600 mb-2">點擊此處上傳主圖</p>
                      <button
                        type="button"
                        onClick={() => handleImageUpload('main')}
                        className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 cursor-pointer whitespace-nowrap"
                      >
                        選擇圖片
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  案例照片集
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {galleryImages.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img src={image} alt={`照片 ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = galleryImages.filter((_, i) => i !== index);
                              setGalleryImages(newImages);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm cursor-pointer"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center mb-4">
                      <i className="ri-gallery-line text-4xl text-gray-400 mb-2"></i>
                      <p className="text-gray-600">可拖曳多張圖片至此處上傳</p>
                    </div>
                  )}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => handleImageUpload('gallery')}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer whitespace-nowrap"
                    >
                      {galleryImages.length > 0 ? '新增更多照片' : '上傳照片集'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
            <Link
              href="/admin/portfolio"
              className="px-6 py-3 text-gray-600 hover:text-gray-800 cursor-pointer whitespace-nowrap"
            >
              取消
            </Link>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting}
              className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              {isSubmitting ? '發佈中...' : '發佈案例'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
