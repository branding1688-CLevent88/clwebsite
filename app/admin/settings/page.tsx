
'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useAdminLanguage } from '../../../components/AdminLanguageProvider';

export default function SettingsPage() {
  const { t } = useAdminLanguage();
  const [admins, setAdmins] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'admin',
    status: 'active',
    password: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true,
    sessionTimeout: 30
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const savedAdmins = localStorage.getItem('admins');
    if (savedAdmins) {
      setAdmins(JSON.parse(savedAdmins));
    } else {
      const defaultAdmins = [
        {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'super_admin',
          status: 'active',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        },
        {
          id: 2,
          name: 'sasa',
          email: 'laolaomamau@gmail.com',
          role: 'super_admin',
          status: 'active',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
      ];
      setAdmins(defaultAdmins);
      localStorage.setItem('admins', JSON.stringify(defaultAdmins));
    }

    const savedSecuritySettings = localStorage.getItem('securitySettings');
    if (savedSecuritySettings) {
      setSecuritySettings(JSON.parse(savedSecuritySettings));
    }
  }, []);

  useEffect(() => {
    if (admins.length > 0) {
      localStorage.setItem('admins', JSON.stringify(admins));
    }
  }, [admins]);

  useEffect(() => {
    localStorage.setItem('securitySettings', JSON.stringify(securitySettings));
  }, [securitySettings]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < securitySettings.passwordMinLength) {
      errors.push(t('passwordTooShort'));
    }

    if (securitySettings.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push(t('passwordNeedUppercase'));
    }

    if (securitySettings.requireNumbers && !/\\d/.test(password)) {
      errors.push(t('passwordNeedNumbers'));
    }

    if (securitySettings.requireSymbols && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push(t('passwordNeedSymbols'));
    }

    return errors;
  };

  const showNotification = (message, type = 'success') => {
    const notification = {
      id: Date.now(),
      message,
      type
    };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 3000);
  };

  const handleAddAdmin = () => {
    console.log('Adding admin:', newAdmin);

    if (!newAdmin.name.trim()) {
      showNotification(t('pleaseEnterName'), 'error');
      return;
    }

    if (!validateEmail(newAdmin.email)) {
      showNotification(t('pleaseEnterValidEmail'), 'error');
      return;
    }

    if (admins.some(admin => admin.email === newAdmin.email)) {
      showNotification(t('emailAlreadyExists'), 'error');
      return;
    }

    const passwordErrors = validatePassword(newAdmin.password);
    if (passwordErrors.length > 0) {
      showNotification(passwordErrors[0], 'error');
      return;
    }

    const adminToAdd = {
      ...newAdmin,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    setAdmins(prev => [...prev, adminToAdd]);
    setNewAdmin({ name: '', email: '', role: 'admin', status: 'active', password: '' });
    setShowAddModal(false);
    showNotification(t('adminAddedSuccessfully'));
  };

  const handleEditAdmin = () => {
    console.log('Editing admin:', editingAdmin);

    if (!editingAdmin) {
      console.log('No admin to edit');
      return;
    }

    if (!editingAdmin.name.trim()) {
      showNotification(t('pleaseEnterName'), 'error');
      return;
    }

    if (!validateEmail(editingAdmin.email)) {
      showNotification(t('pleaseEnterValidEmail'), 'error');
      return;
    }

    if (admins.some(admin => admin.email === editingAdmin.email && admin.id !== editingAdmin.id)) {
      showNotification(t('emailAlreadyExists'), 'error');
      return;
    }

    if (editingAdmin.password && editingAdmin.password.trim()) {
      const passwordErrors = validatePassword(editingAdmin.password);
      if (passwordErrors.length > 0) {
        showNotification(passwordErrors[0], 'error');
        return;
      }
    }

    setAdmins(prev => prev.map(admin => 
      admin.id === editingAdmin.id 
        ? { ...admin, ...editingAdmin, password: editingAdmin.password || admin.password }
        : admin
    ));

    setShowEditModal(false);
    setEditingAdmin(null);
    showNotification(t('adminUpdatedSuccessfully'));
  };

  const handleDeleteAdmin = (adminId) => {
    if (admins.length === 1) {
      showNotification(t('cannotDeleteLastAdmin'), 'error');
      return;
    }

    setAdmins(prev => prev.filter(admin => admin.id !== adminId));
    showNotification(t('adminDeletedSuccessfully'));
  };

  const openEditAdminModal = (admin) => {
    setEditingAdmin({ ...admin, password: '' });
    setShowEditModal(true);
  };

  const handleSecuritySettingsChange = (setting, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    showNotification(t('securitySettingsUpdated'));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{t('settingsTitle')}</h1>

        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`px-4 py-2 rounded-lg text-white ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
            >
              {notification.message}
            </div>
          ))}
        </div>

        {/* Admin Management */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t('adminManagement')}</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line"></i>
              {t('addAdmin')}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">{t('name')}</th>
                  <th className="text-left py-2">{t('email')}</th>
                  <th className="text-left py-2">{t('role')}</th>
                  <th className="text-left py-2">{t('status')}</th>
                  <th className="text-left py-2">{t('created')}</th>
                  <th className="text-left py-2">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id} className="border-b">
                    <td className="py-2">{admin.name}</td>
                    <td className="py-2">{admin.email}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${admin.role === 'super_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {admin.role === 'super_admin' ? t('superAdmin') : t('admin')}
                      </span>
                    </td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {admin.status === 'active' ? t('active') : t('inactive')}
                      </span>
                    </td>
                    <td className="py-2">{new Date(admin.createdAt).toLocaleDateString()}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditAdminModal(admin)}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        >
                          <i className="ri-pencil-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
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
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">{t('securitySettings')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t('minPasswordLength')}</label>
              <input
                type="number"
                min="6"
                max="20"
                value={securitySettings.passwordMinLength}
                onChange={(e) => handleSecuritySettingsChange('passwordMinLength', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('sessionTimeout')}</label>
              <input
                type="number"
                min="5"
                max="240"
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSecuritySettingsChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">{t('passwordRequirements')}</h3>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.requireUppercase}
                  onChange={(e) => handleSecuritySettingsChange('requireUppercase', e.target.checked)}
                  className="rounded cursor-pointer"
                />
                <span className="text-sm">{t('requireUppercase')}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.requireNumbers}
                  onChange={(e) => handleSecuritySettingsChange('requireNumbers', e.target.checked)}
                  className="rounded cursor-pointer"
                />
                <span className="text-sm">{t('requireNumbers')}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.requireSymbols}
                  onChange={(e) => handleSecuritySettingsChange('requireSymbols', e.target.checked)}
                  className="rounded cursor-pointer"
                />
                <span className="text-sm">{t('requireSymbols')}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Add Admin Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">{t('addNewAdmin')}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('name')}</label>
                  <input
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={t('enterAdminName')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('email')}</label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={t('enterEmail')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('role')}</label>
                  <div className="relative">
                    <select
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg pr-8 appearance-none cursor-pointer"
                    >
                      <option value="admin">{t('admin')}</option>
                      <option value="super_admin">{t('superAdmin')}</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('status')}</label>
                  <div className="relative">
                    <select
                      value={newAdmin.status}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg pr-8 appearance-none cursor-pointer"
                    >
                      <option value="active">{t('active')}</option>
                      <option value="inactive">{t('inactive')}</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('password')}</label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={t('enterPassword')}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleAddAdmin}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap cursor-pointer"
                >
                  {t('addAdmin')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Admin Modal */}
        {showEditModal && editingAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">{t('editAdmin')}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('name')}</label>
                  <input
                    type="text"
                    value={editingAdmin.name}
                    onChange={(e) => setEditingAdmin(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={t('enterAdminName')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('email')}</label>
                  <input
                    type="email"
                    value={editingAdmin.email}
                    onChange={(e) => setEditingAdmin(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={t('enterEmail')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('role')}</label>
                  <div className="relative">
                    <select
                      value={editingAdmin.role}
                      onChange={(e) => setEditingAdmin(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg pr-8 appearance-none cursor-pointer"
                    >
                      <option value="admin">{t('admin')}</option>
                      <option value="super_admin">{t('superAdmin')}</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('status')}</label>
                  <div className="relative">
                    <select
                      value={editingAdmin.status}
                      onChange={(e) => setEditingAdmin(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg pr-8 appearance-none cursor-pointer"
                    >
                      <option value="active">{t('active')}</option>
                      <option value="inactive">{t('inactive')}</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('password')}</label>
                  <input
                    type="password"
                    value={editingAdmin.password}
                    onChange={(e) => setEditingAdmin(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={t('leaveBlankKeepCurrent')}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleEditAdmin}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 whitespace-nowrap cursor-pointer"
                >
                  {t('updateAdmin')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
