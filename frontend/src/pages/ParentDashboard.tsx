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
  mockActivity,
  subjectLabels,
  subjectIcons,
  taskStatusLabels,
  taskStatusColors,
  Child,
  SubjectProgress,
  Task,
  Reward,
  Alert,
  Activity,
} from '@/data/parentDashboardMock';

export default function ParentDashboard() {
  const { t } = usei18n();
  const [selectedChildId, setSelectedChildId] = useState<string>(mockChildren[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'tasks' | 'rewards' | 'settings'>('overview');
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');

  const selectedChild = useMemo(
    () => mockChildren.find((c) => c.id === selectedChildId),
    [selectedChildId]
  );

  const childTasks = useMemo(
    () => mockTasks.filter((task) => task.childId === selectedChildId),
    [selectedChildId]
  );

  const childRewards = useMemo(
    () => mockRewards.filter((r) => r.childId === selectedChildId),
    [selectedChildId]
  );

  const childActivity = useMemo(
    () => mockActivity.filter((a) => a.childId === selectedChildId),
    [selectedChildId]
  );

  const childAlerts = useMemo(
    () => mockAlerts.filter((a) => a.childId === selectedChildId),
    [selectedChildId]
  );

  // Statistics
  const avgScore = useMemo(() => {
    const scores = mockSubjectProgress.map((s) => s.averageScore);
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  }, []);

  const totalLessonsThisWeek = useMemo(() => {
    return mockActivity.filter((a) => a.type === 'lesson' && a.childId === selectedChildId).length;
  }, [selectedChildId]);

  const handleMarkReviewed = (taskId: string) => {
    // In a real app, this would call an API
    console.log('Mark reviewed:', taskId);
  };

  const handleAddChild = () => {
    if (newChildName.trim()) {
      console.log('Add child:', newChildName);
      setNewChildName('');
      setShowAddChild(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'progress':
        return renderProgress();
      case 'tasks':
        return renderTasks();
      case 'rewards':
        return renderRewards();
      case 'settings':
        return renderSettings();
      default:
        return null;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title={t('parentDashboard.overviewStats.activeChildren')}
          value={mockChildren.length}
          icon="👨‍👩‍👧‍👦"
          color="bg-blue-500"
        />
        <StatCard
          title={t('parentDashboard.overviewStats.lessonsThisWeek')}
          value={totalLessonsThisWeek}
          icon="📚"
          color="bg-green-500"
        />
        <StatCard
          title={t('parentDashboard.overviewStats.averageScore')}
          value={`${avgScore}%`}
          icon="📊"
          color="bg-purple-500"
        />
        <StatCard
          title={t('parentDashboard.overviewStats.streak')}
          value={selectedChild ? `${selectedChild.streak} ${t('parentDashboard.overviewStats.days')}` : '—'}
          icon="🔥"
          color="bg-orange-500"
        />
      </div>

      {/* Child Selector */}
      {mockChildren.length > 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('parentDashboard.childSelector')}
          </label>
          <div className="flex flex-wrap gap-3">
            {mockChildren.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition ${
                  selectedChildId === child.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={child.avatar} alt={child.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium text-gray-900">{child.name}</p>
                  <p className="text-xs text-gray-500">
                    {child.age} yrs • {child.grade} • Level {child.level}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Alerts */}
      {childAlerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">{t('parentDashboard.alerts.title')}</h3>
          <div className="space-y-2">
            {childAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">{t('parentDashboard.activity.title')}</h3>
        {childActivity.length > 0 ? (
          <div className="space-y-3">
            {childActivity.slice(0, 5).map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">{t('parentDashboard.activity.title')}: No recent activity</p>
        )}
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">{t('parentDashboard.subjects.title')}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSubjectProgress.map((subject) => (
          <SubjectProgressCard key={subject.subject} subject={subject} />
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">{t('parentDashboard.tasks.title')}</h3>
      {childTasks.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('parentDashboard.tasks.title')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('parentDashboard.tasks.due')}</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {childTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-500">Assigned: {task.assignedDate}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {subjectIcons[task.subject] || '📝'} {subjectLabels[task.subject] || task.subject}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${taskStatusColors[task.status]}`}>
                      {t(`parentDashboard.tasks.${task.status}`)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{task.dueDate}</td>
                  <td className="px-4 py-3 text-right">
                    {task.status === 'completed' && (
                      <button
                        onClick={() => handleMarkReviewed(task.id)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {t('parentDashboard.tasks.markReviewed')}
                      </button>
                    )}
                    {task.status === 'reviewed' && (
                      <span className="text-sm text-green-600 font-medium">{t('parentDashboard.tasks.reviewed')}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-500">{t('parentDashboard.tasks.noTasks')}</p>
        </div>
      )}
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title={t('parentDashboard.rewards.totalPoints')}
          value={selectedChild?.totalXP.toLocaleString() || '—'}
          icon="⭐"
          color="bg-yellow-500"
        />
        <StatCard
          title={t('parentDashboard.rewards.level')}
          value={selectedChild?.level || '—'}
          icon="🏆"
          color="bg-purple-500"
        />
        <StatCard
          title={t('parentDashboard.rewards.badges')}
          value={childRewards.filter((r) => r.type === 'badge').length}
          icon="🏅"
          color="bg-pink-500"
        />
      </div>

      {/* Reward History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">{t('parentDashboard.rewards.recentHistory')}</h3>
        </div>
        {childRewards.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {childRewards.map((reward) => (
              <RewardItem key={reward.id} reward={reward} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">{t('parentDashboard.rewards.noHistory')}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Display Toggles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('parentDashboard.settings.title')}</h3>
        <div className="space-y-4">
          <SettingToggle label={t('parentDashboard.settings.showProgress')} defaultChecked />
          <SettingToggle label={t('parentDashboard.settings.showTasks')} defaultChecked />
          <SettingToggle label={t('parentDashboard.settings.showRewards')} defaultChecked />
        </div>
      </div>

      {/* Child Profiles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('parentDashboard.settings.childProfiles')}</h3>
          <button
            onClick={() => setShowAddChild(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            + {t('parentDashboard.settings.addChild')}
          </button>
        </div>

        {showAddChild && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <input
              type="text"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder={t('parentDashboard.settings.childName')}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleAddChild} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                {t('parentDashboard.settings.save')}
              </button>
              <button onClick={() => setShowAddChild(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {mockChildren.map((child) => (
            <div key={child.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <img src={child.avatar} alt={child.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-medium text-gray-900">{child.name}</p>
                  <p className="text-sm text-gray-500">{child.age} yrs • {child.grade}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-600">
                ✏️ Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title={t('parentDashboard.title')}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('parentDashboard.title')}</h1>
          <p className="text-gray-600 mt-1">
            {t('parentDashboard.welcome')}, {selectedChild ? selectedChild.name : 'Parent'} 👋
          </p>
        </div>

        {/* Tab Navigation */}
        <nav className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-1" aria-label="Dashboard sections">
          <ul className="flex flex-wrap gap-1">
            {[
              { id: 'overview', label: t('parentDashboard.overview') },
              { id: 'progress', label: t('parentDashboard.learningProgress') },
              { id: 'tasks', label: t('parentDashboard.tasks') },
              { id: 'rewards', label: t('parentDashboard.rewards') },
              { id: 'settings', label: t('parentDashboard.settings') },
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

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface AlertCardProps {
  alert: Alert;
}

function AlertCard({ alert }: AlertCardProps) {
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    new: 'bg-purple-50 border-purple-200 text-purple-800',
  };

  const icons = {
    success: '✅',
    warning: '⚠️',
    info: 'ℹ️',
    new: '🆕',
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${colors[alert.type]}`}>
      <span className="text-lg mt-0.5">{icons[alert.type]}</span>
      <div className="flex-1">
        <p className="font-medium">{alert.title}</p>
        <p className="text-sm mt-0.5">{alert.message}</p>
        <p className="text-xs opacity-70 mt-1">
          {new Date(alert.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const icons = {
    lesson: '📚',
    quest: '🗺️',
    badge: '🏅',
    streak: '🔥',
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
      <span className="text-xl">{icons[activity.type]}</span>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{activity.title}</p>
        <p className="text-sm text-gray-500">{activity.description}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-green-600">+{activity.points} XP</p>
        <p className="text-xs text-gray-400">
          {new Date(activity.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

interface SubjectProgressCardProps {
  subject: SubjectProgress;
}

function SubjectProgressCard({ subject }: SubjectProgressCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{subjectIcons[subject.subject] || '📝'}</span>
          <h4 className="font-semibold text-gray-900 capitalize">{subjectLabels[subject.subject] || subject.subject}</h4>
        </div>
        <span className="text-sm font-medium text-gray-600">{subject.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${subject.progress}%` }}
        ></div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500">Lessons</p>
          <p className="font-medium">{subject.lessonsCompleted}/{subject.totalLessons}</p>
        </div>
        <div>
          <p className="text-gray-500">Avg Score</p>
          <p className="font-medium">{subject.averageScore}%</p>
        </div>
      </div>
    </div>
  );
}

interface RewardItemProps {
  reward: Reward;
}

function RewardItem({ reward }: RewardItemProps) {
  const typeIcons = {
    badge: '🏅',
    xp: '⭐',
    streak: '🔥',
    level: '🏆',
  };

  const typeColors = {
    badge: 'bg-pink-100 text-pink-800',
    xp: 'bg-yellow-100 text-yellow-800',
    streak: 'bg-orange-100 text-orange-800',
    level: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl">
        {typeIcons[reward.type]}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{reward.title}</p>
        <p className="text-sm text-gray-500">{reward.description}</p>
        <p className="text-xs text-gray-400 mt-1">{new Date(reward.earnedAt).toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${typeColors[reward.type]}`}>
          +{reward.points} pts
        </span>
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
    <label className="flex items-center justify-between cursor-pointer">
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