
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAdminLanguage } from '../../../components/AdminLanguageProvider';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { language, setLanguage, t } = useAdminLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const isCheckingAuth = useRef(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Safe navigation function that ensures component is mounted
  const safeNavigate = useCallback((path: string) => {
    if (!isMounted || isCheckingAuth.current) return;

    // Clear any existing navigation timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Use setTimeout to ensure DOM is ready and avoid state update issues
    navigationTimeoutRef.current = setTimeout(() => {
      if (isMounted) {
        router.push(path);
      }
    }, 100);
  }, [router, isMounted]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      isCheckingAuth.current = false;
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // Enhanced authentication validation
  const validateAuthToken = useCallback(() => {
    if (!isMounted) return false;

    try {
      const tokenData = localStorage.getItem('admin_token');
      if (!tokenData) return false;

      // Check if it's new JSON format
      let parsedToken;
      try {
        parsedToken = JSON.parse(tokenData);
      } catch (e) {
        // If not JSON format, check if it's old string format
        if (tokenData === 'admin_logged_in') {
          // Convert to new format
          const newTokenData = {
            token: 'admin_logged_in',
            timestamp: Date.now(),
            sessionId: Math.random().toString(36).substr(2, 9)
          };
          localStorage.setItem('admin_token', JSON.stringify(newTokenData));
          return true;
        }
        return false;
      }

      // Validate token structure
      if (!parsedToken.token || !parsedToken.timestamp) {
        return false;
      }

      // Check if token is expired (optional: expires after 24 hours)
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (currentTime - parsedToken.timestamp > TWENTY_FOUR_HOURS) {
        // Token expired, clear login state
        localStorage.removeItem('admin_token');
        localStorage.removeItem('current_admin');
        return false;
      }

      return parsedToken.token === 'admin_logged_in';
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    let isCancelled = false;

    const checkAuth = async () => {
      if (isCheckingAuth.current || isCancelled) return;

      isCheckingAuth.current = true;

      try {
        // Add a small delay to ensure localStorage is available
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!isMounted || isCancelled) return;

        const isValidToken = validateAuthToken();
        const adminData = localStorage.getItem('current_admin');

        console.log('檢查認證狀態:', { isValidToken, adminData });

        if (!isValidToken) {
          console.log('沒有有效的登入令牌，重定向到登入頁面');

          if (!isCancelled) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }

          // Clear all login-related data
          localStorage.removeItem('admin_token');
          localStorage.removeItem('current_admin');

          // Only redirect if not already on login page
          if (pathname !== '/admin/login' && !isCancelled) {
            safeNavigate('/admin/login');
          }
        } else {
          // Further validate admin data
          if (!adminData) {
            console.log('沒有管理員資料，重定向到登入頁面');

            if (!isCancelled) {
              setIsAuthenticated(false);
              setIsLoading(false);
            }

            localStorage.removeItem('admin_token');

            if (pathname !== '/admin/login' && !isCancelled) {
              safeNavigate('/admin/login');
            }
            return;
          }

          console.log('認證成功，設定登入狀態');

          if (!isCancelled) {
            setIsAuthenticated(true);
          }

          try {
            const admin = JSON.parse(adminData);
            if (isMounted && !isCancelled) {
              setCurrentAdmin(admin);
            }
          } catch (e) {
            console.log('解析管理員資料失敗:', e);

            if (!isCancelled) {
              setIsAuthenticated(false);
            }

            localStorage.removeItem('admin_token');
            localStorage.removeItem('current_admin');

            if (pathname !== '/admin/login' && !isCancelled) {
              safeNavigate('/admin/login');
            }
            return;
          }

          if (isMounted && !isCancelled) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('認證檢查失敗:', error);

        if (isMounted && !isCancelled) {
          setIsAuthenticated(false);
          setIsLoading(false);

          // Clear potentially corrupted login data
          localStorage.removeItem('admin_token');
          localStorage.removeItem('current_admin');

          if (pathname !== '/admin/login') {
            safeNavigate('/admin/login');
          }
        }
      } finally {
        if (!isCancelled) {
          isCheckingAuth.current = false;
        }
      }
    };

    // Use a longer initial delay to ensure everything is ready
    const timer = setTimeout(() => {
      if (!isCancelled) {
        checkAuth();
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      isCheckingAuth.current = false;
    };
  }, [isMounted, pathname, safeNavigate, validateAuthToken]);

  const handleLogout = useCallback(() => {
    if (!isMounted) return;

    try {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('current_admin');
      setIsAuthenticated(false);
      setCurrentAdmin(null);

      safeNavigate('/admin/login');
    } catch (error) {
      console.error('登出失敗:', error);
      // Fallback to window.location for critical navigation
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
  }, [isMounted, safeNavigate]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setShowLanguageDropdown(false);
  };

  const menuItems = [
    {
      icon: 'ri-dashboard-line',
      label: t('websiteDashboard'),
      href: '/admin/dashboard',
      active: pathname === '/admin/dashboard'
    },
    {
      icon: 'ri-file-text-line',
      label: t('pageContentManagement'),
      href: '/admin/pages',
      active: pathname.startsWith('/admin/pages')
    },
    {
      icon: 'ri-star-line',
      label: t('portfolioManagement'),
      href: '/admin/portfolio',
      active: pathname.startsWith('/admin/portfolio')
    },
    {
      icon: 'ri-chat-3-line',
      label: t('testimonialsManagement'),
      href: '/admin/testimonials',
      active: pathname.startsWith('/admin/testimonials')
    },
    {
      icon: 'ri-image-line',
      label: t('bannerManagement'),
      href: '/admin/banners',
      active: pathname.startsWith('/admin/banners')
    },
    {
      icon: 'ri-mail-line',
      label: t('contactFormsManagement'),
      href: '/admin/contacts',
      active: pathname.startsWith('/admin/contacts')
    },
    {
      icon: 'ri-settings-line',
      label: t('systemSettings'),
      href: '/admin/settings',
      active: pathname.startsWith('/admin/settings')
    }
  ];

  // Show loading state while mounting or checking auth
  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50" suppressHydrationWarning={true}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">正在載入管理後台系統...</p>
        </div>
      </div>
    );
  }

  // Show auth failure state
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50" suppressHydrationWarning={true}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 mb-4">認證失敗，請重新登入</p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/admin/login';
              }
            }}
            className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 cursor-pointer"
          >
            返回登入頁面
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-pacifico)' }}>
            logo
          </div>
          <div className="text-lg font-semibold text-gray-800">CL Events</div>
          <p className="text-sm text-gray-600">管理後台系統</p>
          {currentAdmin && (
            <div className="mt-2 text-xs text-gray-500">
              歡迎, {currentAdmin.name} ({currentAdmin.role})
            </div>
          )}
        </div>

        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${
                item.active
                  ? 'bg-lime-50 text-lime-700 border-r-2 border-lime-500'
                  : 'text-gray-700 hover:bg-lime-50 hover:text-lime-700'
              }`}
            >
              <i className={`${item.icon} text-lg mr-3`}></i>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          {/* Language Switcher */}
          <div className="relative mb-4">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-lime-600 transition-colors cursor-pointer"
            >
              <div className="flex items-center">
                <i className="ri-global-line text-lg mr-3"></i>
                <span>{language === 'zh' ? '中文' : 'English'}</span>
              </div>
              <i className={`ri-arrow-${showLanguageDropdown ? 'up' : 'down'}-s-line`}></i>
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mb-2">
                <button
                  onClick={() => handleLanguageChange('zh')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer ${
                    language === 'zh' ? 'bg-lime-50 text-lime-700' : 'text-gray-700'
                  }`}
                >
                  中文
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer ${
                    language === 'en' ? 'bg-lime-50 text-lime-700' : 'text-gray-700'
                  }`}
                >
                  English
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            <i className="ri-logout-circle-line text-lg mr-3"></i>
            登出
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminLayoutContent>{children}</AdminLayoutContent>
  );
}
