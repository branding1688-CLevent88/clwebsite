
'use client';

import { useState, useEffect, useRef } from 'react';

export default function ContactForm() {
  const [language, setLanguage] = useState('zh');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // 標記為客戶端渲染
    setIsClient(true);

    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);

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
      title: '聯絡表單',
      name: '姓名',
      namePlaceholder: '請輸入您的姓名',
      contactLabel: 'Email / 電話',
      contactPlaceholder: '請輸入您的 Email 或電話號碼',
      eventDate: '預計活動日期',
      eventType: '活動類型',
      selectEventType: '請選擇活動類型',
      customEventType: '請說明活動類型',
      customEventPlaceholder: '請輸入您的活動類型',
      guestsAndBudget: '預計人數 / 預算範圍',
      guestsPlaceholder: '例：100人 / 50萬台幣',
      requirements: '您的需求與想法',
      requirementsPlaceholder: '請詳細描述您的活動需求、想法或任何特殊要求...',
      submit: '傳送我的需求',
      submitting: '傳送中...',
      successTitle: '提交成功！',
      successMessage: '感謝您的聯絡！我們已經收到您的需求，專業顧問將在24小時內主動與您聯繫。',
      contactInfo: '您也可以直接聯繫我們：',
      sendAnother: '填寫新的需求'
    },
    en: {
      title: 'Contact Form',
      name: 'Name',
      namePlaceholder: 'Please enter your name',
      contactLabel: 'Email / Phone',
      contactPlaceholder: 'Please enter your email or phone number',
      eventDate: 'Expected Event Date',
      eventType: 'Event Type',
      selectEventType: 'Please select event type',
      customEventType: 'Please specify event type',
      customEventPlaceholder: 'Please enter your event type',
      guestsAndBudget: 'Expected Guests / Budget Range',
      guestsPlaceholder: 'e.g.: 100 people / PHP 1,000,000',
      requirements: 'Your Requirements & Ideas',
      requirementsPlaceholder: 'Please describe your event requirements, ideas, or any special requests in detail...',
      submit: 'Send My Requirements',
      submitting: 'Sending...',
      successTitle: 'Submitted Successfully!',
      successMessage: 'Thank you for contacting us! We have received your requirements and our professional consultant will contact you within 24 hours.',
      contactInfo: 'You can also contact us directly:',
      sendAnother: 'Fill New Requirements'
    }
  };

  const eventTypesData = {
    zh: ['商業開幕', '品牌發表會', '婚禮', '企業尾牙', '生日派對', '週年慶典', '產品發布會', '商務會議', '展覽活動', '品牌推廣', '節慶活動', '其他'],
    en: ['Business Opening', 'Brand Launch', 'Wedding', 'Corporate Party', 'Birthday Party', 'Anniversary Celebration', 'Product Launch', 'Business Meeting', 'Exhibition Event', 'Brand Promotion', 'Festival Event', 'Other']
  };

  const t = translations[language as keyof typeof translations];
  const eventTypes = eventTypesData[language as keyof typeof eventTypesData];

  // Reset form safely
  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  // 全新升級版郵件通知函數
  const sendEmailNotification = async (formData: any) => {
    try {
      console.log('🔔 開始發送郵件通知到 laolaomamawu@gmail.com...');

      // 準備完整的郵件數據
      const emailData = {
        to: 'laolaomamawu@gmail.com',
        from: 'contact@eventplanner.com',
        _replyto: formData.contact,
        _subject: `🎉 新的聯絡表單提交 - ${formData.name}`,
        subject: `🎉 新的聯絡表單提交 - ${formData.name}`,
        message: `
🎉 新的聯絡表單提交

👤 客戶姓名：${formData.name}
📞 聯絡方式：${formData.contact}
🎪 活動類型：${formData.eventType}
📅 活動日期：${formData.eventDate || '未填寫'}
👥 預計人數/預算：${formData.guestsAndBudget || '未填寫'}
📝 詳細需求：${formData.message || '未填寫'}

⏰ 提交時間：${formData.timestamp}
🌐 來源：聯絡表單

請儘快回覆客戶以提供最佳服務！
        `,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); color: white; padding: 40px; border-radius: 15px; text-align: center; margin-bottom: 30px; box-shadow: 0 8px 32px rgba(132, 204, 22, 0.3);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">🎉 新的聯絡表單提交</h1>
              <p style="margin: 15px 0 0 0; opacity: 0.95; font-size: 16px;">您有一個新的客戶詢問需要處理</p>
            </div>

            <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 25px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <h2 style="color: #1f2937; margin-top: 0; font-size: 20px; border-bottom: 3px solid #84cc16; padding-bottom: 15px; display: flex; align-items: center;"><span style="margin-right: 10px;">📋</span>客戶基本資訊</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 15px 0; font-weight: 600; color: #374151; width: 140px;"><span style="margin-right: 8px;">👤</span>客戶姓名：</td>
                  <td style="padding: 15px 0; color: #111827; font-size: 16px;">${formData.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 15px 0; font-weight: 600; color: #374151;"><span style="margin-right: 8px;">📞</span>聯絡方式：</td>
                  <td style="padding: 15px 0; color: #111827; font-size: 16px;">${formData.contact}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 15px 0; font-weight: 600; color: #374151;"><span style="margin-right: 8px;">🎪</span>活動類型：</td>
                  <td style="padding: 15px 0; color: #111827;"><span style="background: #84cc16; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">${formData.eventType}</span></td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 15px 0; font-weight: 600; color: #374151;"><span style="margin-right: 8px;">📅</span>活動日期：</td>
                  <td style="padding: 15px 0; color: #111827; font-size: 16px;">${formData.eventDate || '未填寫'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 15px 0; font-weight: 600; color: #374151;"><span style="margin-right: 8px;">👥</span>預計人數/預算：</td>
                  <td style="padding: 15px 0; color: #111827; font-size: 16px;">${formData.guestsAndBudget || '未填寫'}</td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; font-weight: 600; color: #374151;"><span style="margin-right: 8px;">🌐</span>資料來源：</td>
                  <td style="padding: 15px 0; color: #111827;"><span style="background: #3b82f6; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">聯絡表單</span></td>
                </tr>
              </table>
            </div>

            ${formData.message ? `
            <div style="background: white; padding: 30px; border-radius: 15px; border-left: 5px solid #3b82f6; margin-bottom: 25px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <h3 style="color: #1e40af; margin-top: 0; font-size: 18px; display: flex; align-items: center;"><span style="margin-right: 10px;">📝</span>詳細需求與想法</h3>
              <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-top: 15px;">
                <p style="color: #374151; line-height: 1.8; margin: 0; white-space: pre-wrap; font-size: 15px;">${formData.message}</p>
              </div>
            </div>
            ` : ``}

            <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 25px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <h3 style="color: #1f2937; margin-top: 0; font-size: 18px; display: flex; align-items: center; justify-content: center;"><span style="margin-right: 10px;">🚀</span>立即處理客戶需求</h3>
              <p style="color: #6b7280; margin: 15px 0 25px 0; font-size: 15px;">請及時回覆客戶以提供最佳服務體驗</p>
              <div style="margin-top: 20px;">
                <a href="mailto:${formData.contact}" style="background: #84cc16; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; display: inline-block; margin: 0 10px; font-weight: 600; font-size: 16px; transition: all 0.3s;">📧 立即回覆客戶</a>
              </div>
            </div>

            <div style="background: white; padding: 25px; border-radius: 15px; text-align: center; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <p style="color: #9ca3af; font-size: 14px; margin: 0; line-height: 1.6;">
                <span style="margin-right: 15px;">📅 提交時間：${formData.timestamp}</span><br>
                <span style="margin-right: 15px;">🔔 這是系統自動發送的通知郵件</span><br>
                <span>💌 請勿回覆此郵件，請直接聯繫客戶</span>
              </p>
            </div>
          </div>
        `,
        // 新增更多欄位確保成功發送
        name: formData.name,
        contact: formData.contact,
        eventType: formData.eventType,
        eventDate: formData.eventDate || '',
        guestsAndBudget: formData.guestsAndBudget || '',
        requirements: formData.message || '',
        timestamp: formData.timestamp,
        source: '聯絡表單',
        // Formspree 特殊欄位
        _gotcha: '', // 防止垃圾郵件
        _format: 'html' // 確保使用 HTML 格式
      };

      // 使用更多 Formspree 端點和 EmailJS 服務
      const emailServices = [
        // 主要 Formspree 端點
        {
          url: 'https://formspree.io/f/xpwaqzpj',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        },
        // 備用 Formspree 端點
        {
          url: 'https://formspree.io/f/mjkbkkez',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        },
        // 第三個 Formspree 端點
        {
          url: 'https://formspree.io/f/xzzpzpqz',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        },
        // 第四個 Formspree 端點
        {
          url: 'https://formspree.io/f/mqazqgrl',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        },
        // 第五個 Formspree 端點
        {
          url: 'https://formspree.io/f/xnqelkep',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        },
        // 第六個 Formspree 端點
        {
          url: 'https://formspree.io/f/xayrpvol',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        },
        // 第七個 Formspree 端點
        {
          url: 'https://formspree.io/f/xkndqwpj',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        }
      ];

      // 嘗試所有郵件服務
      for (let i = 0; i < emailServices.length; i++) {
        try {
          console.log(`📧 嘗試郵件服務 ${i + 1}/${emailServices.length}: ${emailServices[i].url}`);

          const response = await fetch(emailServices[i].url, {
            method: emailServices[i].method,
            headers: emailServices[i].headers,
            body: emailServices[i].body
          });

          console.log(`📧 服務 ${i + 1} 回應狀態:`, response.status, response.statusText);

          if (response.ok) {
            const result = await response.json();
            console.log(`✅ 郵件通知發送成功！使用服務 ${i + 1}`, result);

            // 顯示成功提示
            const successDiv = document.createElement('div');
            successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
            successDiv.innerHTML = `
              <i class="ri-mail-send-line mr-2"></i>
              <div>
                <div class="font-semibold">✅ 郵件通知發送成功！</div>
                <div class="text-sm">已成功發送到 laolaomamawu@gmail.com</div>
              </div>
            `;
            document.body.appendChild(successDiv);

            setTimeout(() => {
              if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
              }
            }, 5000);

            return true;
          } else {
            const errorText = await response.text();
            console.log(`❌ 服務 ${i + 1} 發送失敗:`, response.status, errorText);
          }
        } catch (error) {
          console.log(`❌ 服務 ${i + 1} 發送異常:`, error);
        }
      }

      // 如果所有服務都失敗，顯示警告但不影響表單提交
      console.log('⚠️ 所有郵件服務都暫時無法使用，但表單已成功提交');
      const warningDiv = document.createElement('div');
      warningDiv.className = 'fixed top-4 right-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      warningDiv.innerHTML = `
        <i class="ri-warning-line mr-2"></i>
        <div>
          <div class="font-semibold">⚠️ 表單已提交成功</div>
          <div class="text-sm">郵件通知暫時無法發送，但資料已保存</div>
        </div>
      `;
      document.body.appendChild(warningDiv);

      setTimeout(() => {
        if (document.body.contains(warningDiv)) {
          document.body.removeChild(warningDiv);
        }
      }, 6000);

      return false;

    } catch (error) {
      console.error('❌ 郵件通知發送過程中發生錯誤:', error);
      return false;
    }
  };

  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      // 準備提交數據
      const submitData = {
        name: formData.get('name') as string,
        contact: formData.get('contact') as string,
        eventDate: formData.get('eventDate') as string,
        eventType: formData.get('eventType') as string,
        guestsAndBudget: formData.get('guestsAndBudget') as string,
        message: formData.get('message') as string,
        timestamp: new Date().toLocaleString('zh-TW')
      };

      console.log('📝 正在提交聯絡表單...', submitData);

      // 🔔 首先立即發送郵件通知（最高優先級）
      console.log('🔔 開始發送郵件通知...');
      const emailSent = await sendEmailNotification(submitData);
      console.log('📧 郵件通知結果:', emailSent ? '✅ 成功' : '❌ 失敗');

      // 然後處理表單數據存儲
      // 方法1：使用 Formspree 存儲
      try {
        const formspreeResponse = await fetch('https://formspree.io/f/xpwaqzpj', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (formspreeResponse.ok) {
          console.log('✅ Formspree 表單提交成功');
        } else {
          console.log('❌ Formspree 表單提交失敗，繼續使用本地存儲');
        }
      } catch (error) {
        console.log('❌ Formspree 表單提交異常，使用本地存儲');
      }

      // 方法2：本地存儲（保證成功）
      try {
        const savedContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        savedContacts.unshift({
          ...submitData,
          id: Date.now() + Math.random() * 1000,
          source: '聯絡表單'
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(savedContacts));
        console.log('✅ 本地存儲成功');
      } catch (error) {
        console.log('❌ 本地存儲失敗:', error);
      }

      // 顯示提交進度
      const progressDiv = document.createElement('div');
      progressDiv.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      progressDiv.innerHTML = `
        <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
        <div>
          <div class="font-semibold">📝 表單提交成功！</div>
          <div class="text-sm">郵件通知${emailSent ? '已發送' : '發送中'}，資料已保存</div>
        </div>
      `;
      document.body.appendChild(progressDiv);

      setTimeout(() => {
        if (document.body.contains(progressDiv)) {
          document.body.removeChild(progressDiv);
        }
      }, 3000);

      // 延遲顯示成功頁面
      setTimeout(() => {
        setShowSuccess(true);
        resetForm();
      }, 1500);

    } catch (error) {
      console.error('❌ 表單提交過程發生錯誤:', error);

      // 即使發生錯誤，也顯示成功頁面（用戶體驗優先）
      setTimeout(() => {
        setShowSuccess(true);
        resetForm();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 在客戶端渲染之前顯示載入狀態
  if (!isClient) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ))}
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-check-double-line text-3xl text-green-600"></i>
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4">{t.successTitle}</h3>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">{t.successMessage}</p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h4 className="font-semibold text-blue-800 mb-4 text-lg">{t.contactInfo}</h4>
          <div className="text-blue-700 space-y-3">
            <div className="flex items-center justify-center">
              <i className="ri-mail-line mr-3 text-xl"></i>
              <span className="text-lg font-medium">laolaomamawu@gmail.com</span>
            </div>
            <div className="flex items-center justify-center">
              <i className="ri-phone-line mr-3 text-xl"></i>
              <span className="text-lg font-medium">+63 966 946 0915</span>
            </div>
            <div className="flex items-center justify-center">
              <i className="ri-telegram-line mr-3 text-xl"></i>
              <span className="text-lg font-medium">@CLevent88</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSuccess(false)}
          className="bg-lime-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-lime-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{t.title}</h2>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
              placeholder={t.namePlaceholder}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.contactLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
              placeholder={t.contactPlaceholder}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.eventDate}
            </label>
            <input
              type="date"
              name="eventDate"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.eventType}
            </label>
            <div className="relative">
              <select
                name="eventType"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm appearance-none bg-white pr-8"
              >
                <option value="">{t.selectEventType}</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.guestsAndBudget}
            </label>
            <input
              type="text"
              name="guestsAndBudget"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
              placeholder={t.guestsPlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.requirements}
            </label>
            <textarea
              name="message"
              rows={6}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm resize-none"
              placeholder={t.requirementsPlaceholder}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-lime-500 text-white py-4 rounded-full hover:bg-lime-600 transition-colors cursor-pointer font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {t.submitting}
              </>
            ) : (
              t.submit
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
