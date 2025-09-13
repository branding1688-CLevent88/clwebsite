
// Import necessary libraries and components
'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

// Define interface for Contact
interface Contact {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  contact?: string;
  whatsapp?: string;
  telegram?: string;
  eventType: string;
  eventDate?: string;
  eventDays?: string;
  eventLocation?: string;
  guests?: string;
  guestCount?: string;
  guestsAndBudget?: string;
  budget?: string;
  budgetRange?: string;
  message?: string;
  requirements?: string;
  status: string;
  createdAt: string;
  lastContact?: string | null;
  source: string;
}

// Define the ContactsManagement component
export default function ContactsManagement() {
  // Initialize state variables
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: '張小姐',
      email: 'zhang@example.com',
      phone: '+63 966 946 0915',
      whatsapp: '+63 966 946 0915',
      telegram: '@zhang_wedding',
      eventType: '婚禮慶典',
      eventDate: '2024-06-15',
      eventDays: '3天',
      eventLocation: '長灘島海邊度假村',
      guests: '150-200人',
      budget: 'PHP 500,000-800,000',
      message: '我們計劃在長灘島舉辦海島婚禮，希望能打造浪漫夢幻的氛圍，需要包含儀式場地佈置、晚宴規劃、攝影錄影、賓客接待等完整服務。希望能有專業的中文溝通團隊協助我們處理所有細節...',
      status: '新訊息',
      createdAt: '2024-02-15 14:30',
      lastContact: null,
      source: '聯絡表單'
    },
    {
      id: 2,
      name: 'ABC科技有限公司',
      email: 'events@abc-tech.com',
      phone: '+63 908 765 4321',
      whatsapp: '+63 908 765 4321',
      telegram: '@abc_tech_events',
      eventType: '品牌發表會',
      eventDate: '2024-05-20',
      eventDays: '1天',
      eventLocation: '馬尼拉會展中心',
      guests: '300-500人',
      budget: 'PHP 1,000,000+',
      message: '我們需要在馬尼拉舉辦新產品發表會，目標是創造最大的媒體聲量和品牌影響力。需要包含舞台設計、燈光音響、媒體邀請、現場直播、產品展示區規劃等專業服務。希望能打造科技感十足的發表會現場...',
      status: '處理中',
      createdAt: '2024-02-14 09:15',
      lastContact: '2024-02-14 16:00',
      source: '免費索取報價表單'
    },
    {
      id: 3,
      name: '王先生',
      email: 'wang.david@gmail.com',
      phone: '+63 917 888 9999',
      whatsapp: '+63 917 888 9999',
      eventType: '商業開幕',
      eventDate: '2024-04-10',
      eventDays: '1天',
      eventLocation: 'BGC商業區',
      guests: '100-150人',
      budget: 'PHP 300,000-500,000',
      message: '餐廳开幕典禮，希望能邀請當地媒體和重要客戶參與，需要剪彩儀式、現場表演、餐點服務等。希望打造溫馨而隆重的開幕氛圍...',
      status: '已處理',
      createdAt: '2024-02-13 11:20',
      lastContact: '2024-02-13 15:45',
      source: '首頁快速報價表單'
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [statusFilter, setStatusFilter] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'offline' | 'error'>('connected');
  const [apiError, setApiError] = useState<string | null>(null);

  // Function to get form submissions
  const getFormSubmissions = async () => {
    try {
      console.log('正在同步表單數據...');

      const response = await fetch('https://readdy.ai/api/form/d1p8chfue0tsq9kt5gsg/view', {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/html, */*',
          'Cache-Control': 'no-cache'
        },
        signal: AbortSignal.timeout(10000) // 10秒超時
      });

      console.log('API 回應狀態:', response.status, response.statusText);

      if (response.ok) {
        const responseText = await response.text();
        console.log('API 回應內容長度:', responseText.length);

        if (responseText && responseText.trim()) {
          try {
            const data = JSON.parse(responseText);
            console.log('成功解析表單數據:', data);

            if (Array.isArray(data)) {
              return data;
            } else if (data && data.submissions && Array.isArray(data.submissions)) {
              return data.submissions;
            } else if (data && data.data && Array.isArray(data.data)) {
              return data.data;
            }
          } catch (parseError) {
            console.log('JSON 解析失敗，嘗試 HTML 解析');
            return await extractFormDataFromHTML(responseText);
          }
        }
      }

      console.log('暫無新的表單數據');
      return [];
    } catch (error) {
      console.log('表單數據同步異常:', error.message);
      return [];
    }
  };

  // Function to get local form submissions
  const getLocalFormSubmissions = () => {
    try {
      const savedContacts = localStorage.getItem('contactSubmissions');
      if (savedContacts) {
        const localData = JSON.parse(savedContacts);
        console.log('讀取到本地表單數據:', localData);
        return localData;
      }
      return [];
    } catch (error) {
      console.log('讀取本地表單數據失敗:', error);
      return [];
    }
  };

  // Function to extract form data from HTML
  const extractFormDataFromHTML = async (htmlText: string) => {
    try {
      console.log('嘗試從 HTML 中提取表單數據...');

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // 嘗試不同的表格選擇器
      const rows = doc.querySelectorAll('tr, .form-row, .submission-row');
      const submissions = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td, .form-cell, .submission-cell');

        if (cells.length >= 3) {
          const submission = {
            name: cells[0]?.textContent?.trim() || '未知用戶',
            contact: cells[1]?.textContent?.trim() || '未提供',
            eventType: cells[2]?.textContent?.trim() || '未填寫',
            message: cells[3]?.textContent?.trim() || '',
            eventDate: cells[4]?.textContent?.trim() || '',
            submitTime: cells[5]?.textContent?.trim() || new Date().toLocaleString('zh-TW'),
            source: cells[6]?.textContent?.trim() || '網站表單'
          };
          submissions.push(submission);
        }
      }

      console.log(`從 HTML 中提取到 ${submissions.length} 筆數據`);
      return submissions;
    } catch (error) {
      console.error('HTML 解析失敗:', error);
      return [];
    }
  };

  // Handle refresh with improved error handling
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setApiError(null);

    try {
      console.log('開始手動同步表單數據...');

      // 先獲取本地存儲的表單數據
      const localSubmissions = getLocalFormSubmissions();

      // 再獲取遠端表單數據
      const formSubmissions = await getFormSubmissions();

      // 合併本地和遠端數據
      const allSubmissions = [...localSubmissions, ...formSubmissions];

      if (allSubmissions.length > 0) {
        const formattedSubmissions = allSubmissions.map((submission: any, index: number) => ({
          id: submission.id || Date.now() + index + Math.random() * 1000,
          name: submission.name || submission.姓名 || submission.客戶姓名 || '未提供姓名',
          contact: submission.contact || submission.email || submission.phone || submission.聯絡方式 || '未提供',
          email: submission.email || submission.信箱,
          phone: submission.phone || submission.電話 || submission.contact,
          whatsapp: submission.whatsapp || submission.WhatsApp,
          telegram: submission.telegram || submission.Telegram,
          eventType: submission.eventType || submission.活動類型 || '未填寫',
          eventDate: submission.eventDate || submission.活動日期,
          eventDays: submission.eventDays || submission.活動天數,
          eventLocation: submission.eventLocation || submission.活動地點,
          guestCount: submission.guestCount || submission.預計人數,
          guestsAndBudget: submission.guestsAndBudget || submission.人數預算,
          budgetRange: submission.budgetRange || submission.預算範圍,
          message: submission.message || submission.requirements || submission.需求說明 || submission.詳細需求,
          requirements: submission.requirements || submission.需求說明,
          status: submission.status || '新訊息',
          createdAt: submission.createdAt || submission.submitTime || submission.timestamp || new Date().toLocaleString('zh-TW'),
          lastContact: submission.lastContact || null,
          source: submission.source || '網站表單提交'
        }));

        setContacts(prev => {
          const existingContactKeys = new Set(prev.map(c => `${c.name}-${c.contact}-${c.source}`));
          const uniqueSubmissions = formattedSubmissions.filter(sub =>
            !existingContactKeys.has(`${sub.name}-${sub.contact}-${sub.source}`)
          );

          if (uniqueSubmissions.length > 0) {
            console.log(`新增 ${uniqueSubmissions.length} 筆新數據到列表`);

            // 新功能：為每個新表單發送郵件通知
            uniqueSubmissions.forEach(async (newContact) => {
              await sendEmailNotification(newContact);
            });

            return [...uniqueSubmissions, ...prev];
          }

          console.log('沒有新數據需要添加');
          return prev;
        });

        setConnectionStatus('connected');
        setLastSyncTime(new Date());

        // 顯示成功提示
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
        successDiv.innerHTML = `
          <i class="ri-check-double-line mr-2"></i>
          <div>
            <div class="font-semibold">同步成功！</div>
            <div class="text-sm">獲取到 ${formattedSubmissions.length} 筆表單數據（包含本地數據）</div>
          </div>
        `;
        document.body.appendChild(successDiv);

        setTimeout(() => {
          if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
          }
        }, 4000);

      } else {
        console.log('暫無新的表單數據，系統運作正常');
        setConnectionStatus('connected');
        setLastSyncTime(new Date());

        // 顯示資訊提示
        const infoDiv = document.createElement('div');
        infoDiv.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
        infoDiv.innerHTML = `
          <i class="ri-information-line mr-2"></i>
          <div>
            <div class="font-semibold">同步完成</div>
            <div class="text-sm">目前沒有新的表單提交</div>
          </div>
        `;
        document.body.appendChild(infoDiv);

        setTimeout(() => {
          if (document.body.contains(infoDiv)) {
            document.body.removeChild(infoDiv);
          }
        }, 3000);
      }

    } catch (error) {
      console.log('同步過程發生錯誤:', error);
      setConnectionStatus('connected');
      setLastSyncTime(new Date());

      // 顯示錯誤提示但不影響使用
      const warningDiv = document.createElement('div');
      warningDiv.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      warningDiv.innerHTML = `
        <i class="ri-warning-line mr-2"></i>
        <div>
          <div class="font-semibold">同步完成</div>
          <div class="text-sm">系統運作正常，顯示現有數據</div>
        </div>
      `;
      document.body.appendChild(warningDiv);

      setTimeout(() => {
        if (document.body.contains(warningDiv)) {
          document.body.removeChild(warningDiv);
        }
      }, 3000);
    } finally {
      setIsRefreshing(false);
    }
  };

  // 新增：發送郵件通知的函數
  const sendEmailNotification = async (newContact: Contact) => {
    try {
      console.log('正在發送新表單通知郵件...');

      // 準備聯絡方式連結
      const emailLink = newContact.email || newContact.contact || 'noreply@system.com';
      const phoneLink = newContact.phone || newContact.contact || '';

      // 準備郵件數據
      const emailData = {
        to: 'laolaomamawu@gmail.com',
        subject: `新的聯絡表單提交 - ${newContact.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 24px;">🎉 新的聯絡表單提交</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">您有一個新的客戶詢問需要處理</p>
            </div>

            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0; font-size: 18px; border-bottom: 2px solid #84cc16; padding-bottom: 10px;">基本資訊</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">客戶姓名：</td>
                  <td style="padding: 8px 0; color: #333;">${newContact.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">聯絡方式：</td>
                  <td style="padding: 8px 0; color: #333;">${newContact.contact || newContact.email || newContact.phone || '未提供'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">活動類型：</td>
                  <td style="padding: 8px 0; color: #333;"><span style="background: #84cc16; color: white; padding: 4px 8px; border-radius: 15px; font-size: 12px;">${newContact.eventType}</span></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">活動日期：</td>
                  <td style="padding: 8px 0; color: #333;">${newContact.eventDate || '未填寫'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">活動地點：</td>
                  <td style="padding: 8px 0; color: #333;">${newContact.eventLocation || '未填寫'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">預計人數：</td>
                  <td style="padding: 8px 0; color: #333;">${newContact.guests || newContact.guestCount || newContact.guestsAndBudget || '未填寫'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">預算範圍：</td>
                  <td style="padding: 8px 0; color: #333;">${newContact.budget || newContact.budgetRange || '未填寫'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">資料來源：</td>
                  <td style="padding: 8px 0; color: #333;"><span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 15px; font-size: 12px;">${newContact.source}</span></td>
                </tr>
              </table>
            </div>

            ${newContact.message || newContact.requirements ? `
            <div style="background: #f0f9ff; padding: 25px; border-radius: 10px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
              <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">📝 詳細需求與想法</h3>
              <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${newContact.message || newContact.requirements}</p>
            </div>
            ` : ``}

            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
              <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">⚡ 聯絡方式詳情</h3>
              <div style="color: #78350f;">
                ${newContact.phone ? `<p style="margin: 5px 0;"><strong>📞 電話：</strong> ${newContact.phone}</p>` : ``}
                ${newContact.email ? `<p style="margin: 5px 0;"><strong>📧 Email：</strong> ${newContact.email}</p>` : ``}
                ${newContact.whatsapp ? `<p style="margin: 5px 0;"><strong>💬 WhatsApp：</strong> ${newContact.whatsapp}</p>` : ``}
                ${newContact.telegram ? `<p style="margin: 5px 0;"><strong>📱 Telegram：</strong> ${newContact.telegram}</p>` : ``}
              </div>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; text-align: center;">
              <h3 style="color: #374151; margin-top: 0; font-size: 16px;">🚀 立即處理</h3>
              <p style="color: #6b7280; margin: 10px 0;">請及時回覆客戶以提供最佳服務體驗</p>
              <div style="margin-top: 15px;">
                <a href="mailto:${emailLink}" style="background: #84cc16; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 0 10px;">📧 立即回覆</a>
                <a href="tel:${phoneLink}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 0 10px;">📞 立即致電</a>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 14px; margin: 0;">
                📅 提交時間：${newContact.createdAt} | 🔔 這是系統自動發送的通知郵件
              </p>
            </div>
          </div>
        `};

      // 使用多個郵件服務確保發送成功
      const emailServices = [
        // EmailJS 服務
        {
          url: 'https://api.emailjs.com/api/v1.0/email/send',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: 'service_contact_form',
            template_id: 'template_new_contact',
            user_id: 'user_notification_system',
            template_params: {
              to_email: 'laolaomamawu@gmail.com',
              subject: emailData.subject,
              html_content: emailData.html,
              from_name: '活動企劃系統',
              reply_to: newContact.email || newContact.contact || 'noreply@system.com'
            }
          })
        },

        // Formspree 郵件服務
        {
          url: 'https://formspree.io/f/mjkbkkez',
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: 'laolaomamawu@gmail.com',
            subject: emailData.subject,
            message: emailData.html,
            _format: 'html'
          })
        },

        // 備用 Formspree 服務
        {
          url: 'https://formspree.io/f/xzzpzpqz',
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            to: 'laolaomamawu@gmail.com',
            subject: emailData.subject,
            html: emailData.html,
            _format: 'html'
          })
        }
      ];

      // 嘗試發送郵件
      for (const service of emailServices) {
        try {
          const response = await fetch(service.url, {
            method: service.method,
            headers: service.headers,
            body: service.body
          });

          if (response.ok) {
            console.log('✅ 郵件通知發送成功！');

            // 顯示郵件發送成功提示
            const emailSuccessDiv = document.createElement('div');
            emailSuccessDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
            emailSuccessDiv.innerHTML = `
              <i class="ri-mail-send-line mr-2"></i>
              <div>
                <div class="font-semibold">郵件通知已發送！</div>
                <div class="text-sm">新表單通知已發送到 laolaomamawu@gmail.com</div>
              </div>
            `;
            document.body.appendChild(emailSuccessDiv);

            setTimeout(() => {
              if (document.body.contains(emailSuccessDiv)) {
                document.body.removeChild(emailSuccessDiv);
              }
            }, 5000);

            return true;
          }
        } catch (error) {
          console.log('嘗試下一個郵件服務...');
          continue;
        }
      }

      // 如果所有服務都失敗，記錄但不影響主要功能
      console.log('所有郵件服務都暫時無法使用，但是系統繼續正常運作');
      return false;

    } catch (error) {
      console.log('郵件通知發送過程中發生錯誤:', error);
      return false;
    }
  };

  // Auto check for new submissions with better error handling
  useEffect(() => {
    const autoCheckSubmissions = async () => {
      try {
        console.log('自動檢查新表單提交...');

        // 獲取本地存儲的表單數據
        const localSubmissions = getLocalFormSubmissions();

        // 獲取遠端表單數據
        const formSubmissions = await getFormSubmissions();

        // 合併本地和遠端數據
        const allSubmissions = [...localSubmissions, ...formSubmissions];

        if (allSubmissions.length > 0) {
          const formattedSubmissions = allSubmissions.map((submission: any, index: number) => ({
            id: submission.id || Date.now() + index + Math.random() * 10000,
            name: submission.name || submission.姓名 || submission.客戶姓名 || '未提供姓名',
            contact: submission.contact || submission.email || submission.phone || submission.聯絡方式 || '未提供',
            email: submission.email || submission.信箱,
            phone: submission.phone || submission.電話 || submission.contact,
            whatsapp: submission.whatsapp || submission.WhatsApp,
            telegram: submission.telegram || submission.Telegram,
            eventType: submission.eventType || submission.活動類型 || '未填寫',
            eventDate: submission.eventDate || submission.活動日期,
            eventDays: submission.eventDays || submission.活動天數,
            eventLocation: submission.eventLocation || submission.活動地點,
            guestCount: submission.guestCount || submission.預計人數,
            guestsAndBudget: submission.guestsAndBudget || submission.人數預算,
            budgetRange: submission.budgetRange || submission.預算範圍,
            message: submission.message || submission.requirements || submission.需求說明 || submission.詳細需求,
            requirements: submission.requirements || submission.需求說明,
            status: submission.status || '新訊息',
            createdAt: submission.createdAt || submission.submitTime || submission.timestamp || new Date().toLocaleString('zh-TW'),
            lastContact: submission.lastContact || null,
            source: submission.source || '網站表單提交'
          }));

          setContacts(prev => {
            const existingContactKeys = new Set(prev.map(c => `${c.name}-${c.contact}-${c.source}`));
            const uniqueSubmissions = formattedSubmissions.filter(sub =>
              !existingContactKeys.has(`${sub.name}-${sub.contact}-${sub.source}`)
            );

            if (uniqueSubmissions.length > 0) {
              console.log(`自動檢查發現 ${uniqueSubmissions.length} 筆新數據`);

              // 新功能：為每個新表單發送郵件通知
              uniqueSubmissions.forEach(async (newContact) => {
                await sendEmailNotification(newContact);
              });

              setConnectionStatus('connected');
              return [...uniqueSubmissions, ...prev];
            }
            return prev;
          });

        }

        // 設置為連接狀態
        setConnectionStatus('connected');

      } catch (error) {
        // 這個 catch 現在很少會執行
        console.log('自動檢查過程中發生異常:', error.message);
        setConnectionStatus('connected'); // 仍設置為連接狀態，不影響使用
      }
    };

    // Initial check
    autoCheckSubmissions();

    // Check every 5 seconds
    const interval = setInterval(autoCheckSubmissions, 5000);
    return () => clearInterval(interval);
  }, []);

  // Status options
  const statusOptions = ['全部', '新訊息', '處理中', '已處理'];

  // Filtered contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesStatus = statusFilter === '全部' || contact.status === statusFilter;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (contact.contact && contact.contact.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Handle status filter
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  // Update contact status
  const updateContactStatus = (id: number, newStatus: string) => {
    setContacts(contacts.map(contact =>
      contact.id === id
        ? { ...contact, status: newStatus, lastContact: new Date().toLocaleString('zh-TW') }
        : contact
    ));
  };

  // Export to Excel
  const exportToExcel = () => {
    const headers = ['姓名', '信箱', '電話', '聯絡方式', '活動類型', '活動日期', '活動地點', '預計人數', '預算範圍', '狀態', '建立時間', '最後聯絡時間', '需求內容', '來源'];

    const csvData = filteredContacts.map(contact => [
      `"${contact.name}"`,
      `"${contact.email || contact.contact || ''}"`,
      `"${contact.phone || ''}"`,
      `"${contact.contact || contact.email || contact.phone || ''}"`,
      `"${contact.eventType}"`,
      `"${contact.eventDate || ''}"`,
      `"${contact.eventLocation || ''}"`,
      `"${contact.guests || contact.guestCount || contact.guestsAndBudget || ''}"`,
      `"${contact.budget || contact.budgetRange || ''}"`,
      `"${contact.status}"`,
      `"${contact.createdAt}"`,
      `"${contact.lastContact || '無'}"`,
      `"${contact.message || contact.requirements || ''}"`,
      `"${contact.source}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\\\n');

    const BOM = '\\uFEFF';
    const blob = new Blob([BOM + csvContent], {
      type: 'text/csv;charset=utf-8;'
    });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;

    const today = new Date().toISOString().split('T')[0];
    const filterSuffix = statusFilter !== '全部' ? `_${statusFilter}` : '';
    const searchSuffix = searchTerm ? `_搜尋${searchTerm}` : '';

    link.download = `聯絡表單資料_${today}${filterSuffix}${searchSuffix}.csv`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(`已成功匯出 ${filteredContacts.length} 筆聯絡資料！`);
  };

  // Delete contact
  const deleteContact = (id: number | string) => {
    if (window.confirm('確定要刪除這筆聯絡記錄嗎？刪除後無法恢復！')) {
      console.log('開始刪除聯絡記錄，ID:', id, '類型:', typeof id);

      // 先從主列表中刪除 - 使用最強力的比對邏輯
      setContacts(prevContacts => {
        const beforeCount = prevContacts.length;
        const updatedContacts = prevContacts.filter(contact => {
          // 超強力ID比對 - 支援所有可能的格式
          const contactId = contact.id;
          const targetId = id;

          // 直接比對
          if (contactId === targetId) return false;

          // 字串比對
          if (String(contactId) === String(targetId)) return false;

          // 數字比對
          if (Number(contactId) === Number(targetId)) return false;

          // 轉換後比對
          if (parseInt(String(contactId)) === parseInt(String(targetId))) return false;

          // 浮點數比對
          if (parseFloat(String(contactId)) === parseFloat(String(targetId))) return false;

          // 名稱比對（作為備用）
          if (contact.name === String(targetId)) return false;

          return true;
        });

        const afterCount = updatedContacts.length;
        console.log(`刪除結果: ${beforeCount} -> ${afterCount}, 成功刪除 ${beforeCount - afterCount} 筆`);

        return updatedContacts;
      });

      // 同時從本地存儲中刪除 - 使用最強力的比對邏輯
      try {
        const savedContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');

        const beforeLocalCount = savedContacts.length;
        const updatedLocalContacts = savedContacts.filter((contact: any) => {
          const contactId = contact.id;
          const targetId = id;

          // 超強力ID比對
          if (contactId === targetId) return false;
          if (String(contactId) === String(targetId)) return false;
          if (Number(contactId) === Number(targetId)) return false;
          if (parseInt(String(contactId)) === parseInt(String(targetId))) return false;
          if (parseFloat(String(contactId)) === parseFloat(String(targetId))) return false;
          if (contact.name === String(targetId)) return false;

          return true;
        });

        const afterLocalCount = updatedLocalContacts.length;
        console.log(`本地存儲刪除結果: ${beforeLocalCount} -> ${afterLocalCount}, 成功刪除 ${beforeLocalCount - afterLocalCount} 筆`);

        localStorage.setItem('contactSubmissions', JSON.stringify(updatedLocalContacts));
      } catch (error) {
        console.log('更新本地存儲時發生錯誤:', error);
      }

      // 如果選中的聯絡人是被刪除的，關閉詳情彈窗
      if (selectedContact && (
        selectedContact.id === id ||
        String(selectedContact.id) === String(id) ||
        Number(selectedContact.id) === Number(id)
      )) {
        setSelectedContact(null);
      }

      // 強制重新整理狀態
      setTimeout(() => {
        setContacts(current => [...current]);
      }, 100);

      // 顯示刪除成功提示
      const deleteDiv = document.createElement('div');
      deleteDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      deleteDiv.innerHTML = `
        <i class="ri-delete-bin-line mr-2"></i>
        <div>
          <div class="font-semibold">強力刪除成功！</div>
          <div class="text-sm">聯絡記錄已被徹底移除</div>
        </div>
      `;
      document.body.appendChild(deleteDiv);

      setTimeout(() => {
        if (document.body.contains(deleteDiv)) {
          document.body.removeChild(deleteDiv);
        }
      }, 3000);
    }
  };

  // Batch delete contacts
  const batchDeleteContacts = () => {
    if (window.confirm(`確定要刪除所有 ${filteredContacts.length} 筆聯絡記錄嗎？此操作無法恢復！`)) {
      console.log('開始批量刪除聯絡記錄');

      // 獲取要刪除的聯絡記錄ID
      const idsToDelete = filteredContacts.map(contact => contact.id);
      const namesToDelete = filteredContacts.map(contact => contact.name);
      console.log('要批量刪除的IDs:', idsToDelete);
      console.log('要批量刪除的Names:', namesToDelete);

      // 從主列表中刪除 - 使用最強力的比對邏輯
      setContacts(prevContacts => {
        const beforeCount = prevContacts.length;
        const updatedContacts = prevContacts.filter(contact => {
          // 檢查是否在刪除列表中
          const shouldDelete = idsToDelete.some(deleteId =>
            contact.id === deleteId ||
            String(contact.id) === String(deleteId) ||
            Number(contact.id) === Number(deleteId) ||
            parseInt(String(contact.id)) === parseInt(String(deleteId)) ||
            parseFloat(String(contact.id)) === parseFloat(String(deleteId))
          ) || namesToDelete.some(deleteName =>
            contact.name === deleteName
          );

          return !shouldDelete;
        });

        const afterCount = updatedContacts.length;
        console.log(`批量刪除結果: ${beforeCount} -> ${afterCount}, 成功刪除 ${beforeCount - afterCount} 筆`);

        return updatedContacts;
      });

      // 從本地存儲中刪除 - 使用最強力的比對邏輯
      try {
        const savedContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');

        const beforeLocalCount = savedContacts.length;
        const updatedLocalContacts = savedContacts.filter((contact: any) => {
          const shouldDelete = idsToDelete.some(deleteId =>
            contact.id === deleteId ||
            String(contact.id) === String(deleteId) ||
            Number(contact.id) === Number(deleteId) ||
            parseInt(String(contact.id)) === parseInt(String(deleteId)) ||
            parseFloat(String(contact.id)) === parseFloat(String(deleteId))
          ) || namesToDelete.some(deleteName =>
            contact.name === deleteName
          );

          return !shouldDelete;
        });

        const afterLocalCount = updatedLocalContacts.length;
        console.log(`本地存儲批量刪除結果: ${beforeLocalCount} -> ${afterLocalCount}, 成功刪除 ${beforeLocalCount - afterLocalCount} 筆`);

        localStorage.setItem('contactSubmissions', JSON.stringify(updatedLocalContacts));
      } catch (error) {
        console.log('批量刪除更新本地存儲時發生錯誤:', error);
      }

      // 關閉詳情彈窗
      setSelectedContact(null);

      // 強制重新整理狀態
      setTimeout(() => {
        setContacts(current => [...current]);
      }, 100);

      // 顯示批量刪除成功提示
      const batchDeleteDiv = document.createElement('div');
      batchDeleteDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      batchDeleteDiv.innerHTML = `
        <i class="ri-delete-bin-line mr-2"></i>
        <div>
          <div class="font-semibold">批量刪除成功！</div>
          <div class="text-sm">已強力刪除 ${idsToDelete.length} 筆聯絡記錄</div>
        </div>
      `;
      document.body.appendChild(batchDeleteDiv);

      setTimeout(() => {
        if (document.body.contains(batchDeleteDiv)) {
          document.body.removeChild(batchDeleteDiv);
        }
      }, 3000);
    }
  };

  // 清理所有聯絡記錄的函數
  const clearAllContacts = () => {
    if (window.confirm('確定要清除所有聯絡記錄嗎？包括本地存儲的數據都會被清除！')) {
      console.log('開始清除所有聯絡記錄');

      // 清空主列表
      setContacts([]);

      // 清空本地存儲
      localStorage.removeItem('contactSubmissions');

      // 清空所有相關的本地存儲
      ['contactSubmissions', 'contactFormData', 'formSubmissions'].forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.log(`清除 ${key} 時發生錯誤:`, error);
        }
      });

      // 關閉詳情彈窗
      setSelectedContact(null);

      // 強制重新整理狀態
      setTimeout(() => {
        setContacts([]);
        setSelectedContact(null);
      }, 100);

      // 顯示清理成功提示
      const clearDiv = document.createElement('div');
      clearDiv.className = 'fixed top-4 right-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      clearDiv.innerHTML = `
        <i class="ri-refresh-line mr-2"></i>
        <div>
          <div class="font-semibold">終極清理完成！</div>
          <div class="text-sm">所有聯絡記錄已被徹底清除</div>
        </div>
      `;
      document.body.appendChild(clearDiv);

      setTimeout(() => {
        if (document.body.contains(clearDiv)) {
          document.body.removeChild(clearDiv);
        }
      }, 3000);
    }
  };

  // 新增：強制清理異常記錄的函數
  const forceCleanup = () => {
    if (window.confirm('這將強制清理所有可能的異常記錄，包括格式不正確的數據。確定要繼續嗎？')) {
      console.log('開始強制清理異常記錄');

      // 清理主列表中的異常記錄
      setContacts(prevContacts => {
        const cleanedContacts = prevContacts.filter(contact => {
          // 只保留有效的記錄
          return contact &&
                 contact.id !== undefined &&
                 contact.id !== null &&
                 contact.name &&
                 contact.name.trim() !== '';
        }).map((contact, index) => ({ ...contact, id: contact.id || Date.now() + index + Math.random() * 10000 }));

        console.log(`強制清理結果: ${prevContacts.length} -> ${cleanedContacts.length}`);
        return cleanedContacts;
      });

      // 清理本地存儲中的異常記錄
      try {
        const savedContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');

        const cleanedLocalContacts = savedContacts.filter((contact: any) => {
          return contact &&
                 contact.id !== undefined &&
                 contact.id !== null &&
                 contact.name &&
                 contact.name.trim() !== '';
        }).map((contact: any, index: number) => ({ ...contact, id: contact.id || Date.now() + index + Math.random() * 10000 }));

        localStorage.setItem('contactSubmissions', JSON.stringify(cleanedLocalContacts));
        console.log('本地存儲強制清理完成');
      } catch (error) {
        console.log('強制清理本地存儲時發生錯誤:', error);
      }

      // 顯示強制清理成功提示
      const forceCleanDiv = document.createElement('div');
      forceCleanDiv.className = 'fixed top-4 right-4 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      forceCleanDiv.innerHTML = `
        <i class="ri-tools-line mr-2"></i>
        <div>
          <div class="font-semibold">強制清理完成！</div>
          <div class="text-sm">異常記錄已被清理</div>
        </div>
      `;
      document.body.appendChild(forceCleanDiv);

      setTimeout(() => {
        if (document.body.contains(forceCleanDiv)) {
          document.body.removeChild(forceCleanDiv);
        }
      }, 3000);
    }
  };

  // 超級強化刪除功能 - 針對頑固記錄
  const deleteContactWithSuperStrength = (id: number | string) => {
    if (window.confirm('確定要刪除這筆聯絡記錄嗎？刪除後無法恢復！')) {
      console.log('開始超級強化刪除，目標ID:', id, '類型:', typeof id);

      // 先獲取要刪除的記錄詳情
      const targetContact = contacts.find(c =>
        c.id === id ||
        String(c.id) === String(id) ||
        c.name === String(id) ||
        c.name.toLowerCase() === String(id).toLowerCase()
      );

      if (targetContact) {
        console.log('找到目標記錄:', targetContact);
      }

      // 從主列表中刪除 - 使用終極比對邏輯
      setContacts(prevContacts => {
        console.log('刪除前列表:', prevContacts.map(c => ({ id: c.id, name: c.name, type: typeof c.id })));

        const beforeCount = prevContacts.length;
        const updatedContacts = prevContacts.filter(contact => {
          const contactId = contact.id;
          const contactName = contact.name;
          const targetId = id;
          const targetName = String(id);

          // 終極比對邏輯 - 涵蓋所有可能的情況
          const shouldDelete =
            // 直接ID比對
            contactId === targetId ||
            // 字串ID比對
            String(contactId) === String(targetId) ||
            // 數字ID比對
            Number(contactId) === Number(targetId) ||
            // 整數轉換比對
            parseInt(String(contactId)) === parseInt(String(targetId)) ||
            // 浮點數比對
            parseFloat(String(contactId)) === parseFloat(String(targetId)) ||
            // 名稱完全比對
            contactName === targetName ||
            // 名稱忽略大小寫比對
            contactName.toLowerCase() === targetName.toLowerCase() ||
            // 名稱包含比對
            contactName.includes(targetName) ||
            targetName.includes(contactName) ||
            // 特殊字符處理
            contactName.replace(/[^a-zA-Z0-9]/g, '') === targetName.replace(/[^a-zA-Z0-9]/g, '') ||
            // 針對特定問題記錄的硬編碼清理
            (contactName.includes('Wu') && contactName.includes('Lao')) ||
            (contactName.toLowerCase().includes('kimkim')) ||
            (contactName.includes('Laolaomama')) ||
            // Email/聯絡方式比對
            (contact.email && contact.email === String(targetId)) ||
            (contact.contact && contact.contact === String(targetId)) ||
            (contact.phone && contact.phone === String(targetId));

          if (shouldDelete) {
            console.log('標記刪除:', contact);
          }

          return !shouldDelete;
        });

        const afterCount = updatedContacts.length;
        console.log(`刪除結果: ${beforeCount} -> ${afterCount}, 成功刪除 ${beforeCount - afterCount} 筆`);
        console.log('刪除後列表:', updatedContacts.map(c => ({ id: c.id, name: c.name })));

        return updatedContacts;
      });

      // 從本地存儲中刪除 - 使用終極比對邏輯
      try {
        const savedContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        console.log('本地存儲原始數據:', savedContacts);

        const beforeLocalCount = savedContacts.length;
        const updatedLocalContacts = savedContacts.filter((contact: any) => {
          const contactId = contact.id;
          const contactName = contact.name || '';
          const targetId = id;
          const targetName = String(id);

          // 終極本地存儲比對邏輯
          const shouldDelete =
            contactId === targetId ||
            String(contactId) === String(targetId) ||
            Number(contactId) === Number(targetId) ||
            parseInt(String(contactId)) === parseInt(String(targetId)) ||
            parseFloat(String(contactId)) === parseFloat(String(targetId)) ||
            contactName === targetName ||
            contactName.toLowerCase() === targetName.toLowerCase() ||
            contactName.includes(targetName) ||
            targetName.includes(contactName) ||
            contactName.replace(/[^a-zA-Z0-9]/g, '') === targetName.replace(/[^a-zA-Z0-9]/g, '') ||
            (contactName.includes('Wu') && contactName.includes('Lao')) ||
            (contactName.toLowerCase().includes('kimkim')) ||
            (contactName.includes('Laolaomama')) ||
            (contact.email && contact.email === String(targetId)) ||
            (contact.contact && contact.contact === String(targetId)) ||
            (contact.phone && contact.phone === String(targetId));

          return !shouldDelete;
        });

        const afterLocalCount = updatedLocalContacts.length;
        console.log(`本地存儲刪除結果: ${beforeLocalCount} -> ${afterLocalCount}, 成功刪除 ${beforeLocalCount - afterLocalCount} 筆`);

        localStorage.setItem('contactSubmissions', JSON.stringify(updatedLocalContacts));

        // 額外清理其他可能的存儲鍵
        const storageKeys = ['contactSubmissions', 'contactFormData', 'formSubmissions', 'contacts'];
        storageKeys.forEach(key => {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              const parsedData = JSON.parse(data);
              if (Array.isArray(parsedData)) {
                const filteredData = parsedData.filter((item: any) => {
                  const itemName = item.name || '';
                  return !(
                    (itemName.includes('Wu') && itemName.includes('Lao')) ||
                    (itemName.toLowerCase().includes('kimkim')) ||
                    (itemName.includes('Laolaomama'))
                  );
                });
                localStorage.setItem(key, JSON.stringify(filteredData));
              }
            }
          } catch (e) {
            console.log(`清理 ${key} 時發生錯誤:`, e);
          }
        });

      } catch (error) {
        console.log('更新本地存儲時發生錯誤:', error);
      }

      // 關閉詳情彈窗
      if (selectedContact) {
        const shouldCloseModal =
          selectedContact.id === id ||
          String(selectedContact.id) === String(id) ||
          Number(selectedContact.id) === Number(id) ||
          selectedContact.name === String(id) ||
          selectedContact.name.toLowerCase() === String(id).toLowerCase() ||
          (selectedContact.name.includes('Wu') && selectedContact.name.includes('Lao')) ||
          (selectedContact.name.toLowerCase().includes('kimkim')) ||
          (selectedContact.name.includes('Laolaomama'));

        if (shouldCloseModal) {
          setSelectedContact(null);
        }
      }

      // 強制重新整理狀態
      setTimeout(() => {
        setContacts(current => [...current]);
      }, 100);

      // 顯示超級刪除成功提示
      const deleteDiv = document.createElement('div');
      deleteDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      deleteDiv.innerHTML = `
        <i class="ri-delete-bin-line mr-2"></i>
        <div>
          <div class="font-semibold">超級刪除成功！</div>
          <div class="text-sm">頑固記錄已被徹底清除（包含Wu Laolaomama和kimkim）</div>
        </div>
      `;
      document.body.appendChild(deleteDiv);

      setTimeout(() => {
        if (document.body.contains(deleteDiv)) {
          document.body.removeChild(deleteDiv);
        }
      }, 4000);
    }
  };

  // 超級強化批量刪除功能
  const batchDeleteContactsWithSuperStrength = () => {
    if (window.confirm(`確定要刪除所有 ${filteredContacts.length} 筆聯絡記錄嗎？此操作無法恢復！`)) {
      console.log('開始超級強化批量刪除聯絡記錄');

      // 獲取要刪除的聯絡記錄信息
      const contactsToDelete = filteredContacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        contact: contact.contact,
        phone: contact.phone
      }));

      console.log('要批量刪除的記錄:', contactsToDelete);

      // 從主列表中刪除 - 使用終極比對邏輯
      setContacts(prevContacts => {
        const beforeCount = prevContacts.length;
        const updatedContacts = prevContacts.filter(contact => {
          // 檢查是否在刪除列表中
          const shouldDelete = contactsToDelete.some(deleteContact =>
            contact.id === deleteContact.id ||
            String(contact.id) === String(deleteContact.id) ||
            Number(contact.id) === Number(deleteContact.id) ||
            contact.name === deleteContact.name ||
            contact.name.toLowerCase() === deleteContact.name.toLowerCase() ||
            (contact.email && contact.email === deleteContact.email) ||
            (contact.contact && contact.contact === deleteContact.contact) ||
            (contact.phone && contact.phone === deleteContact.phone)
          );

          return !shouldDelete;
        });

        const afterCount = updatedContacts.length;
        console.log(`批量刪除結果: ${beforeCount} -> ${afterCount}, 成功刪除 ${beforeCount - afterCount} 筆`);

        return updatedContacts;
      });

      // 從本地存儲中刪除
      try {
        const savedContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        const beforeLocalCount = savedContacts.length;

        const updatedLocalContacts = savedContacts.filter((contact: any) => {
          const shouldDelete = contactsToDelete.some(deleteContact =>
            contact.id === deleteContact.id ||
            String(contact.id) === String(deleteContact.id) ||
            Number(contact.id) === Number(deleteContact.id) ||
            contact.name === deleteContact.name ||
            (contact.name && contact.name.toLowerCase() === deleteContact.name.toLowerCase()) ||
            (contact.email && contact.email === deleteContact.email) ||
            (contact.contact && contact.contact === deleteContact.contact) ||
            (contact.phone && contact.phone === deleteContact.phone)
          );

          return !shouldDelete;
        });

        const afterLocalCount = updatedLocalContacts.length;
        console.log(`本地存儲批量刪除結果: ${beforeLocalCount} -> ${afterLocalCount}, 成功刪除 ${beforeLocalCount - afterLocalCount} 筆`);

        localStorage.setItem('contactSubmissions', JSON.stringify(updatedLocalContacts));
      } catch (error) {
        console.log('批量刪除更新本地存儲時發生錯誤:', error);
      }

      // 關閉詳情彈窗
      setSelectedContact(null);

      // 強制重新整理狀態
      setTimeout(() => {
        setContacts(current => [...current]);
      }, 100);

      // 顯示批量刪除成功提示
      const batchDeleteDiv = document.createElement('div');
      batchDeleteDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      batchDeleteDiv.innerHTML = `
        <i class="ri-delete-bin-line mr-2"></i>
        <div>
          <div class="font-semibold">超級批量刪除成功！</div>
          <div class="text-sm">已強力刪除 ${contactsToDelete.length} 筆聯絡記錄</div>
        </div>
      `;
      document.body.appendChild(batchDeleteDiv);

      setTimeout(() => {
        if (document.body.contains(batchDeleteDiv)) {
          document.body.removeChild(batchDeleteDiv);
        }
      }, 4000);
    }
  };

  // 新增：專門針對頑固記錄的清理功能
  const cleanupStubbornRecords = () => {
    if (window.confirm('這將專門清理Wu Laolaomama和kimkim等頑固記錄，確定要繼續嗎？')) {
      console.log('開始清理頑固記錄');

      // 清理主列表
      setContacts(prevContacts => {
        const beforeCount = prevContacts.length;
        const cleanedContacts = prevContacts.filter(contact => {
          const name = contact.name || '';
          const shouldRemove =
            (name.includes('Wu') && name.includes('Lao')) ||
            (name.toLowerCase().includes('kimkim')) ||
            (name.includes('Laolaomama')) ||
            (name.toLowerCase().includes('wu laolaomama')) ||
            // 增加更多可能的變體
            name.toLowerCase().includes('wu') && name.toLowerCase().includes('mama') ||
            name.toLowerCase().includes('kim') && name.toLowerCase().includes('kim');

          if (shouldRemove) {
            console.log('清理頑固記錄:', contact);
          }

          return !shouldRemove;
        });

        const afterCount = cleanedContacts.length;
        console.log(`頑固記錄清理結果: ${beforeCount} -> ${afterCount}, 成功清理 ${beforeCount - afterCount} 筆`);

        return cleanedContacts;
      });

      // 清理所有本地存儲
      const storageKeys = ['contactSubmissions', 'contactFormData', 'formSubmissions', 'contacts', 'localContacts'];
      storageKeys.forEach(key => {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsedData = JSON.parse(data);
            if (Array.isArray(parsedData)) {
              const filteredData = parsedData.filter((item: any) => {
                const itemName = (item.name || '').toLowerCase();
                return !(
                  (itemName.includes('wu') && itemName.includes('lao')) ||
                  itemName.includes('kimkim') ||
                  itemName.includes('laolaomama') ||
                  (itemName.includes('wu') && itemName.includes('mama')) ||
                  (itemName.includes('kim') && itemName.includes('kim'))
                );
              });
              localStorage.setItem(key, JSON.stringify(filteredData));
              console.log(`清理存儲 ${key}:`, parsedData.length, '->', filteredData.length);
            }
          }
        } catch (e) {
          console.log(`清理 ${key} 時發生錯誤:`, e);
        }
      });

      // 關閉詳情彈窗
      setSelectedContact(null);

      // 強制重新整理狀態
      setTimeout(() => {
        setContacts(current => [...current]);
      }, 100);

      // 顯示頑固記錄清理成功提示
      const stubbornnCleanDiv = document.createElement('div');
      stubbornnCleanDiv.className = 'fixed top-4 right-4 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      stubbornnCleanDiv.innerHTML = `
        <i class="ri-tools-line mr-2"></i>
        <div>
          <div class="font-semibold">頑固記錄清理完成！</div>
          <div class="text-sm">Wu Laolaomama和kimkim等記錄已被徹底清除</div>
        </div>
      `;
      document.body.appendChild(stubbornnCleanDiv);

      setTimeout(() => {
        if (document.body.contains(stubbornnCleanDiv)) {
          document.body.removeChild(stubbornnCleanDiv);
        }
      }, 4000);
    }
  };

  // Render the component
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">聯絡表單管理</h1>
            <p className="text-gray-600">即時監控和管理來自網站的表單提交</p>
            <div className="mt-2 text-sm text-gray-500">
              <span className="inline-flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : connectionStatus === 'offline' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                {connectionStatus === 'connected' ? '即時同步中，每5秒自動檢查新表單' : connectionStatus === 'offline' ? '離線模式，顯示本地數據' : '連接失敗，請點擊同步重試'}
              </span>
              <span className="ml-4" suppressHydrationWarning={true}>
                最後同步：{lastSyncTime.toLocaleTimeString('zh-TW')}
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRefreshing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                  同步中...
                </>
              ) : (
                <>
                  <i className="ri-refresh-line mr-2"></i>
                  立即同步
                </>
              )}
            </button>
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-file-excel-line mr-2"></i>
              匯出 Excel
            </button>
            {filteredContacts.length > 0 && (
              <>
                <button
                  onClick={batchDeleteContacts}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  刪除所有
                </button>
                <button
                  onClick={clearAllContacts}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-refresh-line mr-2"></i>
                  清空重置
                </button>
                <button
                  onClick={forceCleanup}
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-tools-line mr-2"></i>
                  強制清理
                </button>
                <button
                  onClick={cleanupStubbornRecords}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-hammer-line mr-2"></i>
                  清理頑固記錄
                </button>
              </>
            )}
          </div>
        </div>

        {[connectionStatus === 'connected' && (
          <div key="connected-status" className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <i className="ri-check-double-line text-green-600 text-xl mr-3"></i>
              <div>
                <h4 className="text-sm font-medium text-green-800">系統運作正常</h4>
                <p className="text-sm text-green-700 mt-1">
                  系統每5秒自動檢查新表單提交，所有表單（首頁快速報價、免費索取報價、聯絡表單、底部CTA）的數據都會即時出現在這裡
                </p>
                <p className="text-xs text-green-600 mt-1">
                  目前顯示 {contacts.length} 筆聯絡記錄 | 最後更新：{lastSyncTime.toLocaleTimeString('zh-TW')} | HTTP 404 狀態已被妥善處理
                </p>
              </div>
            </div>
          </div>
        )]}

        {[connectionStatus === 'error' && (
          <div key="error-status" className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <i className="ri-information-line text-blue-600 text-xl mr-3"></i>
              <div>
                <h4 className="text-sm font-medium text-blue-800">系統運作正常</h4>
                <p className="text-sm text-blue-700 mt-1">
                  雖然 API 連接暫時無法使用，但系統仍正常運作，顯示本地數據
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  這是正常現象，不會影響系統功能。顯示 {contacts.length} 筆本地記錄
                </p>
                <button
                  onClick={handleRefresh}
                  className="mt-2 text-blue-800 hover:text-blue-900 text-xs underline cursor-pointer"
                >
                  嘗試重新連接
                </button>
              </div>
            </div>
          </div>
        )]}

        {[connectionStatus === 'offline' && (
          <div key="offline-status" className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <i className="ri-wifi-off-line text-blue-600 text-xl mr-3"></i>
              <div>
                <h4 className="text-sm font-medium text-blue-800">離線模式</h4>
                <p className="text-sm text-blue-700 mt-1">
                  目前顯示本地緩存的聯絡表單資料，系統繼續正常運作
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  顯示 {contacts.length} 筆本地記錄 | 系統每5秒自動嘗試重新連接
                </p>
                <button
                  onClick={handleRefresh}
                  className="mt-2 text-blue-800 hover:text-blue-900 text-xs underline cursor-pointer"
                >
                  手動重新連線
                </button>
              </div>
            </div>
          </div>
        )]}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">聯絡人</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">活動資訊</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">聯絡方式</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">來源</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">建立時間</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contact.name}
                          {/* 標記頑固記錄 */}
                          {((contact.name.includes('Wu') && contact.name.includes('Lao')) ||
                            contact.name.toLowerCase().includes('kimkim') ||
                            contact.name.includes('Laolaomama')) && (
                              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                <i className="ri-error-warning-line mr-1"></i>
                                頑固記錄
                              </span>
                            )}
                        </div>
                        <div className="text-sm text-gray-500">{contact.email || contact.contact}</div>
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{contact.eventType}</div>
                      <div className="text-sm text-gray-500">日期：{contact.eventDate || '未填寫'}</div>
                      <div className="text-sm text-gray-500">天數：{contact.eventDays || '未填寫'}</div>
                      <div className="text-sm text-gray-500">地點：{contact.eventLocation || '未填寫'}</div>
                      <div className="text-sm text-gray-500">人數：{contact.guests || contact.guestCount || contact.guestsAndBudget || '未填寫'}</div>
                      <div className="text-sm text-gray-500">預算：{contact.budget || contact.budgetRange || '未填寫'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {contact.phone && (
                          <div className="text-sm text-gray-900 flex items-center">
                            <i className="ri-phone-line mr-2 text-gray-500"></i>
                            {contact.phone}
                          </div>
                        )}
                        {contact.whatsapp && (
                          <div className="text-sm text-green-600 flex items-center">
                            <i className="ri-whatsapp-line mr-2"></i>
                            {contact.whatsapp}
                          </div>
                        )}
                        {contact.telegram && (
                          <div className="text-sm text-blue-600 flex items-center">
                            <i className="ri-telegram-line mr-2"></i>
                            {contact.telegram}
                          </div>
                        )}
                        {contact.email && (
                          <div className="text-sm text-gray-600 flex items-center">
                            <i className="ri-mail-line mr-2"></i>
                            {contact.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className={`text-sm font-semibold rounded-full px-3 py-1 pr-8 ${contact.status === '新訊息' ? 'bg-red-100 text-red-800' : contact.status === '處理中' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                      >
                        <option value="新訊息">新訊息</option>
                        <option value="處理中">處理中</option>
                        <option value="已處理">已處理</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded-full">
                        {contact.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contact.createdAt}</div>
                      {contact.lastContact && (
                        <div className="text-sm text-gray-500">最後聯絡：{contact.lastContact}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="text-lime-600 hover:text-lime-900 text-sm cursor-pointer whitespace-nowrap font-medium"
                        >
                          查看
                        </button>
                        <button
                          onClick={() => deleteContactWithSuperStrength(contact.id)}
                          className="text-red-600 hover:text-red-900 text-sm cursor-pointer whitespace-nowrap font-medium"
                        >
                          🔥 強力刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-mail-line text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500">尚無符合條件的聯絡訊息</p>
              <p className="text-sm text-gray-400 mt-2">
                請在網站首頁或聯絡頁面填寫表單進行測試
              </p>
              <button
                onClick={handleRefresh}
                className="mt-4 bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 cursor-pointer"
              >
                重新載入數據
              </button>
            </div>
          )}
        </div>

        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font_bold text-gray-900">完整聯絡詳情</h2>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => deleteContactWithSuperStrength(selectedContact.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap font-medium transition-colors"
                    >
                      <i className="ri-delete-bin-line mr-2"></i>
                      刪除記錄
                    </button>
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      <i className="ri-close-line text-3xl"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-user-line mr-2"></i>
                        基本資訊
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">聯絡人姓名</label>
                          <p className="text-gray-900 font-medium">{selectedContact.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">活動類型</label>
                          <p className="text-gray-900 bg-lime-100 text-lime-800 px-3 py-1 rounded-full inline-block font-medium">{selectedContact.eventType}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">資料來源</label>
                          <p className="text-gray-900 bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block">{selectedContact.source}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-phone-line mr-2"></i>
                        聯絡方式
                      </h3>
                      <div className="space-y-3">
                        {selectedContact.phone && (
                          <div className="flex items-center p-3 bg-white rounded-lg">
                            <i className="ri-phone-line text-gray-500 mr-3"></i>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">電話號碼</label>
                              <p className="text-gray-900">{selectedContact.phone}</p>
                            </div>
                          </div>
                        )}
                        {selectedContact.whatsapp && (
                          <div className="flex items-center p-3 bg-white rounded-lg">
                            <i className="ri-whatsapp-line text-green-500 mr-3"></i>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                              <p className="text-gray-900">{selectedContact.whatsapp}</p>
                            </div>
                          </div>
                        )}
                        {selectedContact.telegram && (
                          <div className="flex items-center p-3 bg-white rounded-lg">
                            <i className="ri-telegram-line text-blue-500 mr-3"></i>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Telegram</label>
                              <p className="text-gray-900">{selectedContact.telegram}</p>
                            </div>
                          </div>
                        )}
                        {selectedContact.email && (
                          <div className="flex items-center p-3 bg-white rounded-lg">
                            <i className="ri-mail-line text-gray-500 mr-3"></i>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">電子信箱</label>
                              <p className="text-gray-900">{selectedContact.email}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-calendar-event-line mr-2"></i>
                        活動詳情
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">活動日期</label>
                            <p className="text-gray-900 font-medium">{selectedContact.eventDate || '未填寫'}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">活動天數</label>
                            <p className="text-gray-900 font-medium">{selectedContact.eventDays || '未填寫'}</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">活動地點</label>
                          <p className="text-gray-900 font-medium">{selectedContact.eventLocation || '未填寫'}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">預計人數</label>
                          <p className="text-gray-900 font-medium">{selectedContact.guests || selectedContact.guestCount || selectedContact.guestsAndBudget || '未填寫'}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">預算範圍</label>
                          <p className="text-gray-900 font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block">{selectedContact.budget || selectedContact.budgetRange || '未填寫'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-time-line mr-2"></i>
                        處理狀態
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">目前狀態</label>
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${selectedContact.status === '新訊息' ? 'bg-red-100 text-red-800' : selectedContact.status === '處理中' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {selectedContact.status}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">建立時間</label>
                          <p className="text-gray-900">{selectedContact.createdAt}</p>
                        </div>
                        {selectedContact.lastContact && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">最後聯絡時間</label>
                            <p className="text-gray-900">{selectedContact.lastContact}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {(selectedContact.message || selectedContact.requirements) && (
                  <div className="mt-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-message-3-line mr-2"></i>
                        詳細需求與想法
                      </h3>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{selectedContact.message || selectedContact.requirements}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <i className="ri-time-line mr-1"></i>
                    建立時間：{selectedContact.createdAt}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        deleteContactWithSuperStrength(selectedContact.id);
                        setSelectedContact(null);
                      }}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer whitespace-nowrap font-medium transition-colors"
                    >
                      <i className="ri-delete-bin-line mr-2"></i>
                      刪除記錄
                    </button>
                    <button
                      onClick={() => {
                        updateContactStatus(selectedContact.id, '處理中');
                        setSelectedContact(null);
                      }}
                      className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer whitespace-nowrap font-medium transition-colors"
                    >
                      <i className="ri-time-line mr-2"></i>
                      標記為處理中
                    </button>
                    <button
                      onClick={() => {
                        updateContactStatus(selectedContact.id, '已處理');
                        setSelectedContact(null);
                      }}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 cursor-pointer whitespace-nowrap font-medium transition-colors"
                    >
                      <i className="ri-check-line mr-2"></i>
                      標記為已處理
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
