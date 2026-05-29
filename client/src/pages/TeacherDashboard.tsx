import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockTeacherClasses, mockTeacherStudents } from '@/data/dashboard-data';
import { useI18n } from '@/contexts/I18nContext';

export const TeacherDashboard: React.FC = () => {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [selectedClass, setSelectedClass] = useState(mockTeacherClasses[0]);
  const [selectedStudent, setSelectedStudent] = useState<typeof mockTeacherStudents[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'analytics' | 'grading'>('overview');
  const [gradeComment, setGradeComment] = useState('');
  const [gradeValue, setGradeValue] = useState(85);

  const classStudents = mockTeacherStudents.slice(0, 4);

  // Prepare chart data
  const classPerformanceData = classStudents.map(student => ({
    name: student.name.split(' ')[0],
    xp: student.totalXP,
    grade: student.averageGrade,
  }));

  const quizAttemptData = selectedStudent?.quizAttempts.map((attempt, index) => ({
    name: `Attempt ${index + 1}`,
    score: attempt.score,
    timeSpent: Math.round(attempt.timeSpent / 60),
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
              <p className="text-slate-600 mt-1">Manage classes and track student progress</p>
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
        {/* Class Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Select Class</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTeacherClasses.map(cls => (
              <button
                key={cls.classId}
                onClick={() => setSelectedClass(cls)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedClass.classId === cls.classId
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <p className="font-semibold text-slate-900">{cls.className}</p>
                <p className="text-sm text-slate-600 mt-1">{cls.studentCount} students • Avg Grade: {cls.averageGrade}%</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {(['overview', 'students', 'analytics', 'grading'] as const).map(tab => (
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
            {/* Class Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{selectedClass.studentCount}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-sm font-medium">Average Grade</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{selectedClass.averageGrade}%</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-sm font-medium">Average XP</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{selectedClass.averageXP}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-sm font-medium">Lessons Completed</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{selectedClass.lessonsCompleted}/{selectedClass.totalLessonsAssigned}</p>
              </div>
            </div>

            {/* Top Performer */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performer</h3>
              <div className="flex items-center gap-4">
                <div className="text-4xl">⭐</div>
                <div>
                  <p className="text-lg font-bold text-slate-900">{selectedClass.topStudent.name}</p>
                  <p className="text-slate-600">{selectedClass.topStudent.xp} XP • Leading the class</p>
                </div>
              </div>
            </div>

            {/* Class Performance Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Class Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="xp" name="XP" />
                  <YAxis dataKey="grade" name="Grade" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Students" data={classPerformanceData} fill="#4f46e5" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student List */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Class Students</h3>
                <div className="space-y-2">
                  {classStudents.map(student => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedStudent?.id === student.id
                          ? 'bg-indigo-50 border-2 border-indigo-500'
                          : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-600">Level {student.currentLevel} • {student.totalXP} XP</p>
                        </div>
                        <span className="text-lg font-bold text-indigo-600">{student.averageGrade}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Details */}
              {selectedStudent && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Student Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Name</p>
                      <p className="font-semibold text-slate-900">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Grade</p>
                      <p className="font-semibold text-slate-900">{selectedStudent.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Current Level</p>
                      <p className="font-semibold text-slate-900">{selectedStudent.currentLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Total XP</p>
                      <p className="font-semibold text-slate-900">{selectedStudent.totalXP}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Attendance</p>
                      <p className="font-semibold text-slate-900">{selectedStudent.attendanceRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Last Active</p>
                      <p className="font-semibold text-slate-900">{new Date(selectedStudent.lastActive).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && selectedStudent && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quiz Performance - {selectedStudent.name}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={quizAttemptData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#4f46e5" name="Score %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quiz Attempts Details</h3>
              <div className="space-y-4">
                {selectedStudent.quizAttempts.map(attempt => (
                  <div key={attempt.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-slate-900">{attempt.lessonTitle}</p>
                        <p className="text-sm text-slate-600">Attempt {attempt.attemptNumber} • {attempt.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${attempt.score >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
                          {attempt.score}%
                        </p>
                        <p className="text-xs text-slate-500">{Math.round(attempt.timeSpent / 60)} min</p>
                      </div>
                    </div>

                    {/* Answer Details */}
                    <div className="space-y-2">
                      {attempt.answers.map((answer, idx) => (
                        <div key={idx} className={`p-2 rounded text-sm ${answer.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                          <p className="font-medium text-slate-900">Q{idx + 1}: {answer.question}</p>
                          <p className={`text-sm ${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            Student: {answer.studentAnswer === answer.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grading Tab */}
        {activeTab === 'grading' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Grade Entry Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Give Grade</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Select Student</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      {classStudents.map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Grade (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradeValue}
                      onChange={e => setGradeValue(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Comment</label>
                    <textarea
                      value={gradeComment}
                      onChange={e => setGradeComment(e.target.value)}
                      placeholder="Add feedback for the student..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                    />
                  </div>
                  <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                    Submit Grade
                  </button>
                </div>
              </div>

              {/* Grade Distribution */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Class Grade Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="grade" fill="#4f46e5" name="Grade %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Grades */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Grades Given</h3>
              <div className="space-y-3">
                {classStudents.flatMap(student => student.grades).map(grade => (
                  <div key={grade.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">{grade.studentName}</p>
                        <p className="text-sm text-slate-600">{grade.subject} • {grade.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{grade.grade}</p>
                        <p className="text-sm font-semibold text-slate-600">{grade.gradeLetterGrade}</p>
                      </div>
                    </div>
                    {grade.comment && (
                      <p className="text-sm text-slate-600 italic">"{grade.comment}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
