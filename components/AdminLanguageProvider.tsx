
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminLanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const AdminLanguageContext = createContext<AdminLanguageContextType | undefined>(undefined);

export const useAdminLanguage = () => {
  const context = useContext(AdminLanguageContext);
  if (!context) {
    throw new Error('useAdminLanguage must be used within an AdminLanguageProvider');
  }
  return context;
};

const adminTranslations = {
  zh: {
    // Layout & Navigation
    adminSystem: 'CL Events Admin System',
    websiteDashboard: '網站儀表板',
    pageContentManagement: '頁面內容管理',
    portfolioManagement: '成功案例管理',
    testimonialsManagement: '客戶推薦管理',
    bannerManagement: '橫幅管理',
    contactFormsManagement: '聯絡表單管理',
    systemSettings: '系統設定',
    logout: '登出',
    welcome: '歡迎',

    // Settings translations
    settingsTitle: '系統設定',
    adminManagement: '管理員管理',
    addAdmin: '新增管理員',
    securitySettings: '安全設定',
    adminName: '管理員姓名',
    email: '電子信箱',
    role: '角色',
    status: '狀態',
    created: '建立時間',
    actions: '操作',
    superAdmin: '超級管理員',
    admin: '管理員',
    active: '啟用',
    inactive: '停用',
    addNewAdmin: '新增管理員',
    editAdmin: '編輯管理員',
    enterAdminName: '請輸入管理員姓名',
    enterEmail: '請輸入電子信箱',
    enterPassword: '請輸入密碼',
    leaveBlankKeepCurrent: '留空保持現有密碼',
    updateAdmin: '更新管理員',
    minPasswordLength: '密碼最小長度',
    sessionTimeout: '會話超時（分鐘）',
    passwordRequirements: '密碼要求',
    requireUppercase: '需要大寫字母',
    requireNumbers: '需要數字',
    requireSymbols: '需要特殊字符',

    // Error messages
    pleaseEnterName: '請輸入管理員姓名',
    pleaseEnterValidEmail: '請輸入有效的電子信箱',
    emailAlreadyExists: '電子信箱已存在',
    passwordTooShort: '密碼長度不足',
    passwordNeedUppercase: '密碼需要包含大寫字母',
    passwordNeedNumbers: '密碼需要包含數字',
    passwordNeedSymbols: '密碼需要包含特殊字符',
    cannotDeleteLastAdmin: '不能刪除最後一個管理員',

    // Success messages
    adminAddedSuccessfully: '管理員新增成功',
    adminUpdatedSuccessfully: '管理員更新成功',
    adminDeletedSuccessfully: '管理員刪除成功',
    securitySettingsUpdated: '安全設定已更新',

    // Dashboard
    dashboardTitle: '網站儀表板',
    dashboardSubtitle: '即時監控網站數據與客戶互動',
    websiteVisits: '網站總瀏覽量',
    newContacts: '新聯絡訊息',
    successCases: '成功案例',
    totalForms: '表單提交總數',
    realtimeUpdate: '即時更新中',
    processNow: '立即處理',
    manageCases: '管理案例',
    fromAllForms: '來自所有表單',
    systemNormal: '系統運作正常',
    lastSync: '最後同步',
    autoSync: '自動同步：每30秒',
    instantSync: '立即同步',
    syncing: '同步中...',

    // Latest Contact Messages
    latestContacts: '最新聯絡訊息',
    realtimeUpdates: '即時更新',
    viewAll: '查看全部',
    contactPerson: '聯絡人',
    eventType: '活動類型',
    date: '日期',
    status: '狀態',
    actions: '操作',
    viewDetails: '查看詳情',
    newMessage: '新訊息',
    processing: '處理中',
    processed: '已處理',
    noLatestMessages: '暫無最新聯絡訊息',

    // Quick Stats
    realtimeActivity: '即時活動',
    publishedReviews: '已發布評價',
    averageRating: '平均評分',
    activeProjects: '進行中專案',

    // Quick Actions
    addCase: '新增案例',
    addNewSuccessCase: '添加新的成功案例',
    addReview: '新增評價',
    addCustomerRecommendation: '添加客戶推薦內容',
    contactManagement: '聯絡管理',
    processContactForms: '處理客戶聯絡表單',
    systemSettings: '系統設定',
    websiteBasicSettings: '網站基本設定管理',

    // Contact Management
    contactFormManagement: '聯絡表單管理',
    contactFormSubtitle: '即時監控和管理來自網站的表單提交',
    realtimeSync: '即時同步中，每45秒自動檢查新表單',
    offlineMode: '離線模式，顯示本地數據',
    connectionFailed: '連接失敗，請點擊同步重試',
    syncNow: '立即同步',
    exportExcel: '匯出 Excel',

    // Contact Status
    allStatus: '全部',
    searchPlaceholder: '搜尋姓名或聯絡方式...',
    contactInfo: '聯絡人',
    eventInfo: '活動資訊',
    contactMethod: '聯絡方式',
    source: '來源',
    createTime: '建立時間',
    eventDate: '活動日期',
    eventDays: '活動天數',
    eventLocation: '活動地點',
    expectedGuests: '預計人數',
    budgetRange: '預算範圍',
    notFilled: '未填寫',
    lastContact: '最後聯絡時間',
    none: '無',
    viewFullContent: '查看完整內容',

    // Contact Detail Modal
    fullContactDetails: '完整聯絡詳情',
    basicInfo: '基本資訊',
    contactName: '聯絡人姓名',
    dataSource: '資料來源',
    contactMethods: '聯絡方式',
    phoneNumber: '電話號碼',
    emailAddress: '電子信箱',
    eventDetails: '活動詳情',
    processingStatus: '處理狀態',
    currentStatus: '目前狀態',
    createdTime: '建立時間',
    lastContactTime: '最後聯絡時間',
    detailedRequirements: '詳細需求與想法',
    markAsProcessing: '標記為處理中',
    markAsProcessed: '標記為已處理',

    // Portfolio Management
    portfolioTitle: '成功案例管理',
    portfolioSubtitle: '新增、編輯或刪除成功案例作品',
    addCase: '新增案例',
    businessOpening: '商業開幕',
    brandLaunch: '品牌發表會',
    weddingCelebration: '婚禮慶典',
    privateParty: '私人派對',
    edit: '編輯',
    delete: '刪除',
    published: '已發佈',
    draft: '草稿',
    noMatchingCases: '尚無符合條件的案例',
    confirmDelete: '確認刪除',
    confirmDeleteMessage: '您確定要刪除這个案例嗎？此操作無法復原。',
    cancel: '取消',
    confirmDeleteAction: '確認刪除',

    // Testimonials Management
    testimonialsTitle: '客戶推薦管理',
    testimonialsSubtitle: '管理客戶評價與推薦內容',
    addReview: '新增評價',
    totalReviews: '總評價數',
    published: '已發布',
    pendingReview: '待審核',
    averageRating: '平均評分',
    customerInfo: '客戶資訊',
    reviewContent: '評價內容',
    rating: '評分',
    noMatchingReviews: '目前沒有符合條件的評價',
    cannotUndo: '此操作無法復原',
    confirmDeleteReview: '您確定要刪除這則客戶評價嗎？',

    // Page Management
    pageManagementTitle: '頁面內容管理',
    pageManagementSubtitle: '管理網站各個固定頁面的文字與圖片內容',
    homeManagement: '首頁管理',
    aboutUs: '關於我們',
    serviceContent: '服務內容',
    contentUpdated: '內容已成功更新！',
    mainSlogan: '主標語',
    subSlogan: '副標語',
    brandIntroText: '品牌介紹文案',
    saveChanges: '儲存變更',
    saving: '儲存中...',
    pageTitle: '頁面標題',
    subtitle: '副標題',
    companyBackground: '公司背景介紹',
    servicePageTitle: '服務頁面標題',
    serviceSubtitle: '服務副標題',
    serviceItems: '服務項目',
    serviceName: '服務名稱',
    serviceDescription: '服務描述',

    // Login
    loginTitle: '後台管理系統',
    loginSubtitle: 'Admin Management System',
    loginPrompt: '請輸入您的管理員憑證',
    adminEmail: '管理員電子郵件',
    enterAdminEmail: '請輸入管理員信箱',
    password: '密碼',
    enterPassword: '請輸入密碼',
    loginToAdmin: '登入後台管理系統',
    loggingIn: '登入中...',
    loginSuccess: '登入成功！',
    redirectingToDashboard: '正在跳轉到管理儀表板...',
    autoRedirectNote: '如果沒有自動跳轉，請點擊這裡',
    forgotPassword: '忘記密碼？',
    availableTestAccounts: '可用的測試帳號：',
    lastLogin: '最後登入',
    autoSyncNote: '這些帳號會自動同步您在「系統設定」中新增的管理員',

    // Common
    loading: '載入中...',
    loadingAdminSystem: '正在載入管理系統...',
    authFailed: '認證失敗，正在重新導向...',
    returnToLogin: '返回登入頁面',
    name: '姓名',
    company: '公司',
    phone: '電話',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    message: '訊息',
    requirements: '需求',
    all: '全部',
    close: '關閉',
    save: '儲存',
    update: '更新',
    add: '新增',
    search: '搜尋',
    filter: '篩選',
    export: '匯出',
    import: '匯入',
    refresh: '重新整理',
    confirm: '確認',
    success: '成功',
    error: '錯誤',
    warning: '警告',
    info: '資訊'
  },
  en: {
    // Layout & Navigation
    adminSystem: 'CL Events Admin System',
    websiteDashboard: 'Website Dashboard',
    pageContentManagement: 'Page Content Management',
    portfolioManagement: 'Portfolio Management',
    testimonialsManagement: 'Testimonials Management',
    bannerManagement: 'Banner Management',
    contactFormsManagement: 'Contact Forms Management',
    systemSettings: 'System Settings',
    logout: 'Logout',
    welcome: 'Welcome',

    // Settings translations
    settingsTitle: 'System Settings',
    adminManagement: 'Admin Management',
    addAdmin: 'Add Admin',
    securitySettings: 'Security Settings',
    adminName: 'Admin Name',
    email: 'Email',
    role: 'Role',
    status: 'Status',
    created: 'Created',
    actions: 'Actions',
    superAdmin: 'Super Admin',
    admin: 'Admin',
    active: 'Active',
    inactive: 'Inactive',
    addNewAdmin: 'Add New Admin',
    editAdmin: 'Edit Admin',
    enterAdminName: 'Enter admin name',
    enterEmail: 'Enter email address',
    enterPassword: 'Enter password',
    leaveBlankKeepCurrent: 'Leave blank to keep current password',
    updateAdmin: 'Update Admin',
    minPasswordLength: 'Minimum Password Length',
    sessionTimeout: 'Session Timeout (minutes)',
    passwordRequirements: 'Password Requirements',
    requireUppercase: 'Require uppercase letters',
    requireNumbers: 'Require numbers',
    requireSymbols: 'Require special characters',

    // Error messages
    pleaseEnterName: 'Please enter admin name',
    pleaseEnterValidEmail: 'Please enter a valid email address',
    emailAlreadyExists: 'Email already exists',
    passwordTooShort: 'Password is too short',
    passwordNeedUppercase: 'Password must contain uppercase letters',
    passwordNeedNumbers: 'Password must contain numbers',
    passwordNeedSymbols: 'Password must contain special characters',
    cannotDeleteLastAdmin: 'Cannot delete the last admin',

    // Success messages
    adminAddedSuccessfully: 'Admin added successfully',
    adminUpdatedSuccessfully: 'Admin updated successfully',
    adminDeletedSuccessfully: 'Admin deleted successfully',
    securitySettingsUpdated: 'Security settings updated',

    // Dashboard
    dashboardTitle: 'Website Dashboard',
    dashboardSubtitle: 'Real-time monitoring of website data and customer interactions',
    websiteVisits: 'Total Website Visits',
    newContacts: 'New Contact Messages',
    successCases: 'Success Cases',
    totalForms: 'Total Form Submissions',
    realtimeUpdate: 'Real-time Updates',
    processNow: 'Process Now',
    manageCases: 'Manage Cases',
    fromAllForms: 'From All Forms',
    systemNormal: 'System Operating Normally',
    lastSync: 'Last Sync',
    autoSync: 'Auto Sync: Every 30 seconds',
    instantSync: 'Instant Sync',
    syncing: 'Syncing...',

    // Latest Contact Messages
    latestContacts: 'Latest Contact Messages',
    realtimeUpdates: 'Real-time Updates',
    viewAll: 'View All',
    contactPerson: 'Contact Person',
    eventType: 'Event Type',
    date: 'Date',
    status: 'Status',
    actions: 'Actions',
    viewDetails: 'View Details',
    newMessage: 'New Message',
    processing: 'Processing',
    processed: 'Processed',
    noLatestMessages: 'No Latest Messages',

    // Quick Stats
    realtimeActivity: 'Real-time Activity',
    publishedReviews: 'Published Reviews',
    averageRating: 'Average Rating',
    activeProjects: 'Active Projects',

    // Quick Actions
    addCase: 'Add Case',
    addNewSuccessCase: 'Add New Success Case',
    addReview: 'Add Review',
    addCustomerRecommendation: 'Add Customer Recommendation',
    contactManagement: 'Contact Management',
    processContactForms: 'Process Customer Contact Forms',
    systemSettings: 'System Settings',
    websiteBasicSettings: 'Website Basic Settings Management',

    // Contact Management
    contactFormManagement: 'Contact Form Management',
    contactFormSubtitle: 'Real-time monitoring and management of website form submissions',
    realtimeSync: 'Real-time sync, auto-check new forms every 45 seconds',
    offlineMode: 'Offline mode, displaying local data',
    connectionFailed: 'Connection failed, please click sync to retry',
    syncNow: 'Sync Now',
    exportExcel: 'Export Excel',

    // Contact Status
    allStatus: 'All',
    searchPlaceholder: 'Search name or contact info...',
    contactInfo: 'Contact Info',
    eventInfo: 'Event Info',
    contactMethod: 'Contact Method',
    source: 'Source',
    createTime: 'Create Time',
    eventDate: 'Event Date',
    eventDays: 'Event Days',
    eventLocation: 'Event Location',
    expectedGuests: 'Expected Guests',
    budgetRange: 'Budget Range',
    notFilled: 'Not Filled',
    lastContact: 'Last Contact Time',
    none: 'None',
    viewFullContent: 'View Full Content',

    // Contact Detail Modal
    fullContactDetails: 'Full Contact Details',
    basicInfo: 'Basic Information',
    contactName: 'Contact Name',
    dataSource: 'Data Source',
    contactMethods: 'Contact Methods',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    eventDetails: 'Event Details',
    processingStatus: 'Processing Status',
    currentStatus: 'Current Status',
    createdTime: 'Created Time',
    lastContactTime: 'Last Contact Time',
    detailedRequirements: 'Detailed Requirements & Ideas',
    markAsProcessing: 'Mark as Processing',
    markAsProcessed: 'Mark as Processed',

    // Portfolio Management
    portfolioTitle: 'Portfolio Management',
    portfolioSubtitle: 'Add, edit or delete portfolio works',
    addCase: 'Add Case',
    businessOpening: 'Business Opening',
    brandLaunch: 'Brand Launch',
    weddingCelebration: 'Wedding Celebration',
    privateParty: 'Private Party',
    edit: 'Edit',
    delete: 'Delete',
    published: 'Published',
    draft: 'Draft',
    noMatchingCases: 'No matching cases',
    confirmDelete: 'Confirm Delete',
    confirmDeleteMessage: 'Are you sure you want to delete this case? This action cannot be undone.',
    cancel: 'Cancel',
    confirmDeleteAction: 'Confirm Delete',

    // Testimonials Management
    testimonialsTitle: 'Testimonials Management',
    testimonialsSubtitle: 'Manage customer reviews and testimonials',
    addReview: 'Add Review',
    totalReviews: 'Total Reviews',
    published: 'Published',
    pendingReview: 'Pending Review',
    averageRating: 'Average Rating',
    customerInfo: 'Customer Info',
    reviewContent: 'Review Content',
    rating: 'Rating',
    noMatchingReviews: 'No matching reviews',
    cannotUndo: 'This action cannot be undone',
    confirmDeleteReview: 'Are you sure you want to delete this customer review?',

    // Page Management
    pageManagementTitle: 'Page Content Management',
    pageManagementSubtitle: 'Manage text and image content for fixed website pages',
    homeManagement: 'Home Management',
    aboutUs: 'About Us',
    serviceContent: 'Service Content',
    contentUpdated: 'Content updated successfully!',
    mainSlogan: 'Main Slogan',
    subSlogan: 'Sub Slogan',
    brandIntroText: 'Brand Introduction Text',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    pageTitle: 'Page Title',
    subtitle: 'Subtitle',
    companyBackground: 'Company Background',
    servicePageTitle: 'Service Page Title',
    serviceSubtitle: 'Service Subtitle',
    serviceItems: 'Service Items',
    serviceName: 'Service Name',
    serviceDescription: 'Service Description',

    // Login
    loginTitle: 'Admin Management System',
    loginSubtitle: 'Admin Management System',
    loginPrompt: 'Please enter your admin credentials',
    adminEmail: 'Admin Email',
    enterAdminEmail: 'Enter admin email',
    password: 'Password',
    enterPassword: 'Enter password',
    loginToAdmin: 'Login to Admin System',
    loggingIn: 'Logging in...',
    loginSuccess: 'Login Successful!',
    redirectingToDashboard: 'Redirecting to admin dashboard...',
    autoRedirectNote: 'If not automatically redirected, please click here',
    forgotPassword: 'Forgot Password?',
    availableTestAccounts: 'Available Test Accounts:',
    lastLogin: 'Last Login',
    autoSyncNote: 'These accounts will automatically sync with admins you add in "System Settings"',
    // Common
    loading: 'Loading...',
    loadingAdminSystem: 'Loading admin system...',
    authFailed: 'Authentication failed, redirecting...',
    returnToLogin: 'Return to Login',
    name: 'Name',
    company: 'Company',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    message: 'Message',
    requirements: 'Requirements',
    all: 'All',
    close: 'Close',
    save: 'Save',
    update: 'Update',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    refresh: 'Refresh',
    confirm: 'Confirm',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info'
  }
};

interface AdminLanguageProviderProps {
  children: ReactNode;
}

export function AdminLanguageProvider({ children }: AdminLanguageProviderProps) {
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    // 從本地存儲獲取語言設置
    const savedLanguage = localStorage.getItem('admin_language') || 'zh';
    setLanguage(savedLanguage);

    // 監聽語言變更事件
    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail;
      setLanguage(newLanguage);
      localStorage.setItem('admin_language', newLanguage);
    };

    window.addEventListener('adminLanguageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('adminLanguageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('admin_language', newLanguage);

    // 發送語言變更事件
    const event = new CustomEvent('adminLanguageChange', { detail: newLanguage });
    window.dispatchEvent(event);
  };

  const t = (key: string): string => {
    const languageTranslations = adminTranslations[language as keyof typeof adminTranslations];
    return languageTranslations?.[key as keyof typeof languageTranslations] || key;
  };

  return (
    <AdminLanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </AdminLanguageContext.Provider>
  );
}
