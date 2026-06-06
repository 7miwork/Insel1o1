'use client';

import React, { ReactNode, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usei18n } from '@/contexts/i18nContext';
import Link from 'next/link';

interface AdminDashboardLayoutProps {
  children: ReactNode;
  title?: string;
  activeSection?: string;
}

export default function AdminDashboardLayout({ children, title, activeSection = 'overview' }: AdminDashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = usei18n();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
  };

  const navigationSections = [
    { 
      id: 'overview', 
      label: 'Platform Overview', 
      icon: '📊',
      items: [
        { label: 'Dashboard', href: '/admin' },
      ]
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: '👥',
      items: [
        { label: 'User Management', href: '/admin/users' },
        { label: 'Roles', href: '/admin/roles' },
      ]
    },
    { 
      id: 'schools', 
      label: 'School Management', 
      icon: '🏫',
      items: [
        { label: 'Schools', href: '/admin/schools' },
        { label: 'Classes', href: '/admin/classes' },
      ]
    },
    { 
      id: 'content', 
      label: 'Content Management', 
      icon: '📚',
      items: [
        { label: 'Courses', href: '/admin/courses' },
        { label: 'Lessons', href: '/admin/lessons' },
        { label: 'Resources', href: '/admin/resources' },
      ]
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: '📈',
      items: [
        { label: 'Platform Analytics', href: '/admin/analytics' },
        { label: 'Reports', href: '/admin/reports' },
      ]
    },
    { 
      id: 'system', 
      label: 'System', 
      icon: '⚙️',
      items: [
        { label: 'System Health', href: '/admin/system' },
        { label: 'Security', href: '/admin/security' },
        { label: 'Settings', href: '/admin/settings' },
      ]
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-700">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'text-center'}`}>
            {sidebarOpen ? 'Admin Panel' : 'AP'}
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationSections.map((section) => (
            <div key={section.id} className="mb-2">
              <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-400">
                {section.icon}
                {sidebarOpen && section.label}
              </div>
              
              {sidebarOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                        activeSection === section.id 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'de' | 'zh-TW')}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded text-sm"
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="zh-TW">繁體中文</option>
          </select>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm"
          >
            {t('common.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-200 rounded-lg transition"
            >
              ☰
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{title || 'Admin Dashboard'}</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <img
              src={user?.avatarUrl || 'https://via.placeholder.com/40'}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}