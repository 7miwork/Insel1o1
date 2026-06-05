'use client';

import React, { useState, useMemo } from 'react';
import { usei18n } from '@/contexts/i18nContext';
import DashboardLayout from '@/components/professional/DashboardLayout';
import {
  mockChildren,
  mockSubjectProgress,
  mockTasks,
  mockRewards,
  mockAlerts,
  subjectLabels,
  taskStatusLabels,
  taskStatusColors,
  alertTypeColors,
  alertTypeIcons,
  Child,
  SubjectProgress,
  Task,
  Reward,
  Alert,
} from '@/data/parentDashboardMock';

export default function ParentDashboard() {
  const { t } = usei18n();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'children' | 'tasks' | 'progress' | 'settings'>('dashboard');
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');

  // Overall progress calculation
  const overallProgress = useMemo(() => {
    const avg = mockSubjectProgress.reduce((sum, s) => sum + s.progress, 0) / mockSubjectProgress.length;
    return Math.round(avg);
  }, []);

  const completedTasksToday = useMemo(() => {
    return mockTasks.filter(t => t.status === 'completed').length;
  }, []);

  const unreadAlerts = mockAlerts.length;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardTab();
      case 'children':
        return renderChildrenTab();
      case 'tasks':
        return renderTasksTab();
      case 'progress':
        return renderProgressTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderDashboardTab();
    }
  };

  // ──────────────── TAB: DASHBOARD (Overview) ────────────────
  const renderDashboardTab = () => (
    <div className="space-y-6">
      {/* Hero Overview Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{t('parentDashboard.overview.greeting')}</h2>
            <p className="text-blue-100">{t('parentDashboard.overview.subtitle')}</p>
          </div>
          <div className="text-center md:border-l border-blue-400/30 py-2 md:py-0">
            <p className="text-sm text-blue-100">{t('parentDashboard.overview.alerts')}</p>
            <p className="text-3xl font-bold">{unreadAlerts} {t('parentDashboard.overview.newAlerts')}</p>
          </div>
          <div className="text-center md:border-l border-blue-400/30 py-2 md:py-0">
            <p className="text-sm text-blue-100">{t('parentDashboard.overview.tasksCompleted')}</p>
            <p className="text-3xl font-bold">{completedTasksToday} {t('parentDashboard.overview.today')}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-blue-100">{t('parentDashboard.overview.overallProgress')}</p>
            <p className="text-3xl font-bold">{overallProgress}%</p>
          </div>
        </div>
      </div>

      {/* Child Overview Cards Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('parentDashboard.children.title')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {mockChildren.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('parentDashboard.progress.title')}</h3>
        <div className="space-y-4">
          {mockSubjectProgress.map((subject) => (
            <SubjectProgressBar key={subject.subject} subject={subject} />
          ))}
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('parentDashboard.alerts.title')}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${unreadAlerts > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
            {unreadAlerts} {t('parentDashboard.alerts.unread')}
          </span>
        </div>
        <div className="space-y-3">
          {mockAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

      {/* Rewards Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('parentDashboard.rewards.title')}</h3>
        <div className="space-y-3">
          {mockRewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </div>
    </div>
  );

  // ──────────────── TAB: CHILDREN ────────────────
  const renderChildrenTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('parentDashboard.children.title')}</h2>
        <button
          onClick={() => setShowAddChild(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
        >
          + {t('parentDashboard.children.addChild')}
        </button>
      </div>

      {showAddChild && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h3 className="font-medium text-gray-900 mb-3">{t('parentDashboard.children.addNewChild')}</h3>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="text"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder={t('parentDashboard.children.childNamePlaceholder')}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => { if (newChildName.trim()) { console.log('Add child:', newChildName); setNewChildName(''); setShowAddChild(false); }}}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              {t('common.save')}
            </button>
            <button
              onClick={() => { setNewChildName(''); setShowAddChild(false); }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {mockChildren.map((child) => (
          <ChildManagementCard key={child.id} child={child} />
        ))}
      </div>
    </div>
  );

  // ──────────────── TAB: TASKS ────────────────
  const renderTasksTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('parentDashboard.tasks.title')}</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('parentDashboard.tasks.task')}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('parentDashboard.tasks.child')}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('parentDashboard.tasks.status')}</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('parentDashboard.tasks.action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="font-medium text-gray-900">{task.title}</div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {task.child}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${taskStatusColors[task.status]}`}>
                    {t(`parentDashboard.tasks.${task.status}`)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  {task.status === 'completed' && (
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      {t('parentDashboard.tasks.review')}
                    </button>
                  )}
                  {task.status === 'inProgress' && (
                    <span className="text-sm text-blue-600 font-medium">{t('parentDashboard.tasks.inProgress')}</span>
                  )}
                  {task.status === 'pending' && (
                    <span className="text-sm text-gray-400">{t('parentDashboard.tasks.pending')}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ──────────────── TAB: PROGRESS ────────────────
  const renderProgressTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('parentDashboard.progress.title')}</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          {mockSubjectProgress.map((subject) => (
            <SubjectProgressDetail key={subject.subject} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );

  // ──────────────── TAB: SETTINGS ────────────────
  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('parentDashboard.settings.title')}</h2>

      {/* Module Toggles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('parentDashboard.settings.modules')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <SettingToggle label={t('parentDashboard.settings.showOverview')} defaultChecked />
          <SettingToggle label={t('parentDashboard.settings.showTasks')} defaultChecked />
          <SettingToggle label={t('parentDashboard.settings.showRewards')} defaultChecked />
          <SettingToggle label={t('parentDashboard.settings.advancedAnalytics')} defaultChecked={false} />
        </div>
      </div>

      {/* Children Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('parentDashboard.settings.children')}</h3>
          <button
            onClick={() => setShowAddChild(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            + {t('parentDashboard.settings.addChild')}
          </button>
        </div>

        <div className="space-y-3">
          {mockChildren.map((child) => (
            <div key={child.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <img src={child.avatar} alt={child.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium text-gray-900">{child.name}</p>
                  <p className="text-sm text-gray-500">{t('parentDashboard.settings.progress')}: {child.progress}%</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-600 text-sm">
                {t('parentDashboard.settings.edit')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ──────────────── MAIN RETURN ────────────────
  return (
    <DashboardLayout title={t('parentDashboard.title')}>
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation Tabs */}
        <nav className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-1" aria-label="Dashboard sections">
          <ul className="flex flex-wrap gap-1">
            {[
              { id: 'dashboard', label: t('parentDashboard.nav.dashboard') },
              { id: 'children', label: t('parentDashboard.nav.children') },
              { id: 'tasks', label: t('parentDashboard.nav.tasks') },
              { id: 'progress', label: t('parentDashboard.nav.progress') },
              { id: 'settings', label: t('parentDashboard.nav.settings') },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tab Content */}
        <div className="animate-fade-in">{renderTabContent()}</div>
      </div>
    </DashboardLayout>
  );
}

// ──────────────── Sub-components ────────────────

interface ChildCardProps {
  child: Child;
}

function ChildCard({ child }: ChildCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={child.avatar} alt={child.name} className="w-12 h-12 rounded-full" />
          <div>
            <h4 className="font-semibold text-gray-900">{child.name}</h4>
            <p className="text-sm text-gray-500">{child.lastActivity}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{child.progress}%</p>
          <p className="text-xs text-gray-400">{child.status}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${child.progress}%` }}
        ></div>
      </div>
    </div>
  );
}

interface SubjectProgressBarProps {
  subject: SubjectProgress;
}

function SubjectProgressBar({ subject }: SubjectProgressBarProps) {
  const colors: Record<string, string> = {
    math: 'bg-blue-600',
    german: 'bg-green-600',
    english: 'bg-purple-600',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900 capitalize">{subjectLabels[subject.subject] || subject.subject}</span>
        <span className="text-lg font-bold text-gray-900">{subject.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${colors[subject.subject] || 'bg-blue-600'} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${subject.progress}%` }}
        ></div>
      </div>
    </div>
  );
}

interface SubjectProgressDetailProps {
  subject: SubjectProgress;
}

function SubjectProgressDetail({ subject }: SubjectProgressDetailProps) {
  const colors: Record<string, string> = {
    math: 'bg-blue-100 text-blue-800',
    german: 'bg-green-100 text-green-800',
    english: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="p-4 rounded-lg border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 capitalize">{subjectLabels[subject.subject] || subject.subject}</h4>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${colors[subject.subject]}`}>
          {subject.progress}% {t('parentDashboard.progress.complete')}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${colors[subject.subject].replace('100', '600')} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${subject.progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

interface AlertCardProps {
  alert: Alert;
}

function AlertCard({ alert }: AlertCardProps) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${alertTypeColors[alert.type]}`}>
      <span className="text-xl mt-0.5">{alertTypeIcons[alert.type]}</span>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{alert.title}</p>
        <p className="text-sm text-gray-600 mt-0.5">{alert.message}</p>
      </div>
    </div>
  );
}

interface RewardCardProps {
  reward: Reward;
}

function RewardCard({ reward }: RewardCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
        🎁
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{reward.title}</p>
        <p className="text-sm text-gray-500">{reward.child}</p>
      </div>
      <div className="text-right">
        <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
          +{reward.points} {t('parentDashboard.rewards.points')}
        </span>
      </div>
    </div>
  );
}

interface ChildManagementCardProps {
  child: Child;
}

function ChildManagementCard({ child }: ChildManagementCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-4 mb-4">
        <img src={child.avatar} alt={child.name} className="w-14 h-14 rounded-full" />
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">{child.name}</h4>
          <p className="text-sm text-gray-500">{t('parentDashboard.settings.overallProgress')}: {child.progress}%</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${child.progress}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{child.lastActivity}</span>
        <span className="font-medium text-gray-700">{child.status}</span>
      </div>
    </div>
  );
}

interface SettingToggleProps {
  label: string;
  defaultChecked?: boolean;
}

function SettingToggle({ label, defaultChecked = true }: SettingToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => setChecked(!checked)}
        role="switch"
        aria-checked={checked}
        className={`relative w-11 h-6 rounded-full transition ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}