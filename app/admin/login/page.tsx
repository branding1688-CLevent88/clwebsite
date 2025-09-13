
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const adminCredentials = {
  email: 'laolaomamawu@gmail.com',
  password: 'j6h93ru,6'
};

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 模擬登入驗證
    if (email === adminCredentials.email && password === adminCredentials.password) {
      // 設定登入狀態到 localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUser', JSON.stringify({
        email: email,
        role: 'superadmin',
        name: '超級管理員'
      }));
      
      // 跳轉到後台首頁
      router.push('/admin/dashboard');
    } else {
      setError('電子信箱或密碼無效，或帳戶已被禁用');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-['Pacifico'] text-green-600 mb-2">logo</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">CL Events</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">後台管理系統</h2>
          <p className="text-sm text-gray-500 mb-1">Admin Management System</p>
          <p className="text-xs text-gray-400">請輸入您的管理員帳號</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              管理員電子郵件
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="請輸入電子郵件"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              密碼
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="請輸入密碼"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              <i className="ri-error-warning-line mr-2"></i>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? '登入中...' : '登入後台管理系統'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            忘記密碼？
          </p>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">管理員帳號資訊：</h3>
          <p className="text-sm text-blue-700">帳號：laolaomamawu@gmail.com</p>
          <p className="text-sm text-blue-700 mb-2">密碼：j6h93ru,6</p>
          <p className="text-xs text-blue-600">其他管理員帳號請透過後台系統設定新增</p>
        </div>
      </div>
    </div>
  );
}
