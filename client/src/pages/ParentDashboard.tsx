import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockParentChildren } from '@/data/dashboard-data';
import { useI18n } from '@/contexts/I18nContext';

export const ParentDashboard: React.FC = () => {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedChild, setSelectedChild] = useState(mockParentChildren[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'grades' | 'purchase'>('overview');

  // Calculate statistics
  const averageQuizScore = selectedChild.quizAttempts.length > 0
    ? Math.round(selectedChild.quizAttempts.reduce((sum, q) => sum + q.score, 0) / selectedChild.quizAttempts.length)
    : 0;

  const totalLessonTime = selectedChild.lessonTimeSpent.reduce((sum, l) => sum + l.timeSpent, 0);

  // Prepare chart data
  const progressData = selectedChild.lessonTimeSpent.map(lesson => ({
    name: lesson.lessonTitle.substring(0, 15),
    time: lesson.timeSpent,
    attempts: lesson.attempts,
  }));

  const gradeData = selectedChild.grades.map((grade, index) => ({
    name: `Grade ${index + 1}`,
    score: grade.grade,
  }));

  const quizProgressData = selectedChild.quizAttempts.map(attempt => ({
    name: `Lesson ${attempt.lessonId}`,
    score: attempt.score,
    attempt: attempt.attemptNumber,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Parent Dashboard</h1>
              <p className="text-slate-600 mt-1">Monitor your children's learning progress</p>
            </div>
            <button
              onClick={() => setLocation('/')}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Child Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Select Child</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockParentChildren.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedChild.id === child.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{child.avatar}</span>
                  <div className="text-left">
                    <p className="font-semibold text-slate-900">{child.name}</p>
                    <p className="text-sm text-slate-600">{child.grade} • Level {child.currentLevel}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {(['overview', 'progress', 'grades', 'purchase'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-sm font-medium">Current Level</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{selectedChild.currentLevel}</p>
                <p className="text-xs text-slate-500 mt-2">{selectedChild.totalXP} XP</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-sm font-medium">Average Grade</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{selectedChild.averageGrade}%</p>
                <p className="text-xs text-slate-500 mt-2">Based on {selectedChild.grades.length} grades</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-sm font-medium">Quiz Average</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{averageQuizScore}%</p>
                <p className="text-xs text-slate-500 mt-2">{selectedChild.quizAttempts.length} attempts</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-sm font-medium">Attendance</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{selectedChild.attendanceRate}%</p>
                <p className="text-xs text-slate-500 mt-2">Last active today</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Quiz Attempts</h3>
              <div className="space-y-3">
                {selectedChild.quizAttempts.slice(0, 5).map(attempt => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{attempt.lessonTitle}</p>
                      <p className="text-sm text-slate-600">Attempt {attempt.attemptNumber} • {attempt.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${attempt.score >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
                        {attempt.score}%
                      </p>
                      <p className="text-xs text-slate-500">{Math.round(attempt.timeSpent / 60)} min</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Lesson Time Spent</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="time" fill="#4f46e5" name="Time (min)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quiz Performance Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={quizProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#4f46e5" name="Score %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Detailed Lesson Progress</h3>
              <div className="space-y-3">
                {selectedChild.lessonTimeSpent.map(lesson => (
                  <div key={lesson.lessonId} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-slate-900">{lesson.lessonTitle}</p>
                      <span className="text-sm font-semibold text-indigo-600">{lesson.timeSpent} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: '100%' }} />
                      </div>
                      <span className="text-sm text-slate-600">{lesson.attempts} attempt(s)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Grade Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'A (90-100)', value: selectedChild.grades.filter(g => g.grade >= 90).length },
                        { name: 'B (80-89)', value: selectedChild.grades.filter(g => g.grade >= 80 && g.grade < 90).length },
                        { name: 'C (70-79)', value: selectedChild.grades.filter(g => g.grade >= 70 && g.grade < 80).length },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Grade Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={gradeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#10b981" name="Grade" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">All Grades</h3>
              <div className="space-y-3">
                {selectedChild.grades.map(grade => (
                  <div key={grade.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">{grade.subject}</p>
                        <p className="text-sm text-slate-600">{grade.date} • Given by {grade.givenBy}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{grade.grade}</p>
                        <p className="text-sm font-semibold text-slate-600">{grade.gradeLetterGrade}</p>
                      </div>
                    </div>
                    {grade.comment && (
                      <p className="text-sm text-slate-600 italic mt-2">"{grade.comment}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Purchase Tab */}
        {activeTab === 'purchase' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Unlock Premium Content</h3>
              <p className="text-indigo-100">Purchase additional lessons and courses for {selectedChild.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Package */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-slate-900">Basic Package</h4>
                  <p className="text-3xl font-bold text-indigo-600 mt-2">$9.99</p>
                  <p className="text-sm text-slate-600 mt-1">per month</p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> 5 Courses
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> Basic Support
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> Progress Tracking
                  </li>
                </ul>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                  Subscribe
                </button>
              </div>

              {/* Premium Package */}
              <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-indigo-500 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">POPULAR</span>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-slate-900">Premium Package</h4>
                  <p className="text-3xl font-bold text-indigo-600 mt-2">$19.99</p>
                  <p className="text-sm text-slate-600 mt-1">per month</p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> All Courses
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> Priority Support
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> Advanced Analytics
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> Certificate
                  </li>
                </ul>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                  Subscribe
                </button>
              </div>

              {/* Advanced Package */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-slate-900">Advanced Package</h4>
                  <p className="text-3xl font-bold text-indigo-600 mt-2">$29.99</p>
                  <p className="text-sm text-slate-600 mt-1">per month</p>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> Everything in Premium
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> 1-on-1 Tutoring
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> Custom Learning Path
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <span className="text-green-500">✓</span> Lifetime Access
                  </li>
                </ul>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Purchased Lessons */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Purchased Lessons</h3>
              {selectedChild.purchasedLessons.length > 0 ? (
                <div className="space-y-3">
                  {selectedChild.purchasedLessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{lesson.lessonTitle}</p>
                        <p className="text-sm text-slate-600">Purchased on {lesson.purchaseDate}</p>
                      </div>
                      <span className="text-sm font-semibold text-green-600">✓ Active</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No purchased lessons yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
