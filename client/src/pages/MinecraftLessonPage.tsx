import React, { useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { RewardAnimation } from '@/components/RewardAnimation';
import { calculateQuizReward, calculateLessonReward } from '@/lib/reward-system';
import { MINECRAFT_LESSONS, Lesson } from '@/data/minecraft-island';

export const MinecraftLessonPage: React.FC = () => {
  const [, params] = useRoute('/lesson/:id');
  const lessonId = parseInt(params?.id || '1');
  const [, setLocation] = useLocation();

  const lesson = MINECRAFT_LESSONS.find((l) => l.id === lessonId) as Lesson | undefined;
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [rewardData, setRewardData] = useState({ xp: 0, coins: 0 });
  const [quizComplete, setQuizComplete] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Lesson Not Found</h1>
          <button
            onClick={() => setLocation('/archipelago')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
          >
            Back to Archipelago
          </button>
        </div>
      </div>
    );
  }

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (currentQuizIndex < (lesson.quiz?.length || 0) - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      completeQuiz(newAnswers);
    }
  };

  const completeQuiz = (answers: number[]) => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === lesson.quiz?.[index]?.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / (lesson.quiz?.length || 1)) * 100);

    const difficulty = lesson.difficulty === 'beginner' ? 'easy' : lesson.difficulty === 'intermediate' ? 'medium' : 'hard';
    const quizReward = calculateQuizReward(score, difficulty);
    const lessonReward = calculateLessonReward(lesson.difficulty, 1800);

    const totalXP = quizReward.baseXP + quizReward.bonusXP + lessonReward.xp;
    const totalCoins = quizReward.coinReward + lessonReward.coins;

    setRewardData({ xp: totalXP, coins: totalCoins });
    setShowReward(true);
    setQuizComplete(true);
    setLessonComplete(true);
  };

  const currentQuestion = lesson.quiz?.[currentQuizIndex];
  const phaseColors: Record<string, string> = {
    'getting-started': 'from-green-400 to-green-600',
    'loops': 'from-blue-400 to-blue-600',
    'conditionals': 'from-orange-400 to-orange-600',
    'creative': 'from-purple-400 to-purple-600',
    'final-project': 'from-yellow-400 to-yellow-600',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {showReward && (
        <RewardAnimation
          xp={rewardData.xp}
          coins={rewardData.coins}
          onComplete={() => setShowReward(false)}
        />
      )}

      {/* Header */}
      <div className={`bg-gradient-to-r ${phaseColors[lesson.phase]} p-8`}>
        <button
          onClick={() => setLocation('/archipelago')}
          className="mb-4 text-white hover:text-gray-200 flex items-center gap-2"
        >
          ← Back to Archipelago
        </button>
        <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-lg opacity-90">{lesson.description}</p>
        <div className="mt-4 flex gap-4 text-sm">
          <span>⏱️ {lesson.duration} minutes</span>
          <span>📊 {lesson.difficulty}</span>
          <span>⭐ {lesson.xpReward} XP</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        {!quizComplete ? (
          <>
            {/* Lesson Content */}
            <div className="bg-gray-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">📚 Lesson Content</h2>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-300">{lesson.content}</p>
              </div>

              {/* Code Blocks */}
              {lesson.codeBlocks && lesson.codeBlocks.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">💻 Code Blocks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lesson.codeBlocks.map((block, idx) => (
                      <div key={idx} className="bg-gray-700 p-4 rounded-lg">
                        <div className="text-2xl mb-2">{block.icon}</div>
                        <h4 className="font-bold mb-2">{block.name}</h4>
                        <p className="text-sm text-gray-300 mb-3">{block.description}</p>
                        <code className="bg-black px-3 py-2 rounded text-sm text-green-400">
                          {block.example}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Student Activity */}
              {lesson.studentActivity && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">👨‍💻 Student Activity</h3>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap text-gray-300">{lesson.studentActivity}</p>
                  </div>
                </div>
              )}

              {/* Teacher Tip */}
              {lesson.teacherTip && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">💡 Teacher Tip</h3>
                  <div className="bg-blue-900 border-l-4 border-blue-400 p-4 rounded">
                    <p className="text-gray-300">{lesson.teacherTip}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Start Quiz Button */}
            <button
              onClick={() => setCurrentQuizIndex(0)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg"
            >
              ✅ Start Quiz & Earn Rewards
            </button>
          </>
        ) : (
          <>
            {/* Quiz Complete */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-center">
              <h2 className="text-4xl font-bold mb-4">🎉 Lesson Complete!</h2>
              <p className="text-xl mb-6">Great job! You've earned rewards:</p>
              <div className="flex justify-center gap-8 mb-8">
                <div className="bg-black bg-opacity-30 px-6 py-4 rounded-lg">
                  <div className="text-3xl font-bold">+{rewardData.xp}</div>
                  <div className="text-sm">XP</div>
                </div>
                <div className="bg-black bg-opacity-30 px-6 py-4 rounded-lg">
                  <div className="text-3xl font-bold">+{rewardData.coins}</div>
                  <div className="text-sm">Coins</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setLocation('/archipelago')}
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg"
                >
                  Back to Archipelago
                </button>
                {lesson.unlocks && lesson.unlocks.length > 0 && (
                  <button
                    onClick={() => setLocation(`/lesson/${lesson.unlocks?.[0]}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
                  >
                    Next Lesson →
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Quiz Section */}
        {currentQuestion && !quizComplete && (
          <div className="mt-8 bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Question {currentQuizIndex + 1} of {lesson.quiz?.length}
            </h2>
            <p className="text-lg mb-6">{currentQuestion.question}</p>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(idx)}
                  className="w-full text-left bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{
                  width: `${((currentQuizIndex + 1) / (lesson.quiz?.length || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinecraftLessonPage;
