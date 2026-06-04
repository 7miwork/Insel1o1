import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Play, CheckCircle, Zap, Award, Wind, Compass, Treasure, Target, CheckCircle2, ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Lesson {
  id: number;
  title: string;
  emoji: string;
  description: string;
  duration: number;
  videoUrl: string;
  content: string;
  xpReward: number;
  questions: Question[];
}

const lessonData: Record<number, Lesson> = {
  101: {
    id: 101,
    title: "Algebra Basics",
    emoji: "📐",
    description: "Learn the fundamentals of algebra including variables, equations, and solving techniques.",
    duration: 15,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: `
# Algebra Basics

Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.

## Key Concepts:
- **Variables**: Letters that represent unknown numbers
- **Equations**: Mathematical statements showing equality
- **Operations**: Addition, subtraction, multiplication, division

## Example:
If x + 5 = 12, then x = 7

## Practice:
Solve these equations:
1. x + 3 = 10
2. 2x = 16
3. x - 5 = 3
    `,
    xpReward: 50,
    questions: [
      {
        id: 1,
        text: "What is the value of x in the equation: x + 5 = 12?",
        options: ["5", "7", "12", "17"],
        correctAnswer: 1,
        explanation: "Subtract 5 from both sides: x = 12 - 5 = 7",
      },
      {
        id: 2,
        text: "Solve: 2x = 16",
        options: ["8", "14", "18", "32"],
        correctAnswer: 0,
        explanation: "Divide both sides by 2: x = 16 / 2 = 8",
      },
      {
        id: 3,
        text: "What is x - 5 = 3?",
        options: ["2", "8", "-2", "-8"],
        correctAnswer: 1,
        explanation: "Add 5 to both sides: x = 3 + 5 = 8",
      },
    ],
  },
};

export default function LessonPage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<"intro" | "video" | "content" | "quiz" | "complete">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const { t } = useI18n();

  // Get lesson ID from URL
  const lessonId = 101; // In real app, get from URL params
  const lesson = lessonData[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lesson not found</h1>
          <Button onClick={() => setLocation("/archipelago")}>Back to Archipelago</Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lesson.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      lesson.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      setScore(correctCount);
      setCurrentStep("complete");
    }
  };

  const handleBack = () => {
    setLocation("/archipelago");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {lesson.emoji} {lesson.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
            <Zap className="w-5 h-5" />
            +{lesson.xpReward} XP
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {currentStep === "intro" && (
          <div className="space-y-6">
            {/* Hero Section - Island Station */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-blue-50 to-teal-50 dark:from-amber-950 dark:via-blue-950 dark:to-teal-950 p-8 sm:p-12 border-2 border-amber-200 dark:border-amber-700">
              {/* Decorative compass background */}
              <div className="absolute -right-16 -top-16 opacity-5">
                <div className="w-64 h-64 border-8 border-amber-900 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 border-4 border-amber-900 rounded-full" />
                </div>
              </div>

              <div className="relative z-10 text-center space-y-4">
                <div className="text-7xl mb-2 drop-shadow-lg">{lesson.emoji}</div>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-900 to-blue-900 bg-clip-text text-transparent">
                  {lesson.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                  {lesson.description}
                </p>

                {/* Island Stats */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y-2 border-amber-300 dark:border-amber-700">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">⏱️ Duration</p>
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{lesson.duration} min</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">❓ Challenges</p>
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{lesson.questions.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">⚡ Reward</p>
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{lesson.xpReward} XP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Objectives */}
            <div className="card-modern p-6 space-y-4 border-2 border-teal-300 dark:border-teal-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                🗺️ Adventure Awaits
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete all challenges to unlock the next island in your journey.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setCurrentStep("video")}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-6 text-lg font-bold shadow-lg transform hover:scale-105 transition-all"
              >
                <Wind className="w-5 h-5 mr-2" />
                Begin Your Adventure
              </Button>
              <Button
                onClick={() => setCurrentStep("quiz")}
                variant="outline"
                className="w-full py-6 text-lg font-bold border-2 border-amber-400 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                ⚡ Skip to Challenge
              </Button>
            </div>
          </div>
        )}

        {currentStep === "video" && (
          <div className="space-y-6">
            {/* Captain's Briefing - Video Deck */}
            <div className="card-modern p-6 overflow-hidden rounded-2xl border-2 border-teal-300 dark:border-teal-700 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                📺 Captain's Briefing
              </h3>
              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-amber-300/30">
                <iframe
                  width="100%"
                  height="100%"
                  src={lesson.videoUrl}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Watch carefully - this information will help you complete your challenges!
              </p>
            </div>

            {/* Learning Materials - Scroll Content */}
            <div className="card-modern p-6 space-y-4 border-2 border-blue-300 dark:border-blue-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                📖 Study Materials
              </h3>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400">
                {lesson.content}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep("intro")}
                variant="outline"
                className="flex-1 border-2 border-amber-400 text-amber-700 dark:text-amber-400"
              >
                ← Return to Start
              </Button>
              <Button
                onClick={() => setCurrentStep("quiz")}
                className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold shadow-lg"
              >
                Ready for Challenge →
              </Button>
            </div>
          </div>
        )}

        {currentStep === "quiz" && (
          <div className="space-y-6">
            {/* Quiz Header - Knowledge Challenge */}
            <div className="card-modern p-6 border-2 border-purple-300 dark:border-purple-700">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  ⚔️ Knowledge Challenge
                </h3>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Question {currentQuestion + 1} of {lesson.questions.length}
                    </span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {Math.round(((currentQuestion + 1) / lesson.questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border border-purple-300">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / lesson.questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="card-modern p-8 border-2 border-purple-200 dark:border-purple-800 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-relaxed">
                {lesson.questions[currentQuestion].text}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {lesson.questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left font-medium ${
                      selectedAnswers[currentQuestion] === idx
                        ? "border-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 shadow-lg"
                        : "border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === idx
                            ? "border-purple-600 bg-purple-600"
                            : "border-gray-400 dark:border-gray-500"
                        }`}
                      >
                        {selectedAnswers[currentQuestion] === idx && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-bold disabled:opacity-50 shadow-lg transform hover:scale-105 transition-all"
            >
              {currentQuestion === lesson.questions.length - 1 ? (
                <>
                  <Trophy className="w-5 h-5 mr-2" />
                  Complete Challenge
                </>
              ) : (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}

        {currentStep === "complete" && (
          <div className="space-y-6">
            {/* Treasure Chest - Rewards */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950 p-8 sm:p-12 border-2 border-amber-400 dark:border-amber-600">
              {/* Decorative compass */}
              <div className="absolute -right-20 -bottom-20 opacity-5">
                <Compass className="w-96 h-96 text-amber-900" />
              </div>

              <div className="relative z-10 text-center space-y-4">
                <div className="text-8xl mb-4 animate-bounce">
                  {score === lesson.questions.length ? "🎉" : score >= lesson.questions.length * 0.7 ? "🏆" : "✨"}
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent">
                  Challenge Complete!
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Excellent work, captain! Your voyage continues...
                </p>
              </div>
            </div>

            {/* Stats & Rewards Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card-modern p-6 text-center border-2 border-purple-300 dark:border-purple-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">📊 Score</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round((score / lesson.questions.length) * 100)}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {score} of {lesson.questions.length} correct
                </p>
              </div>

              <div className="card-modern p-6 text-center border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">⚡ XP Reward</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  +{lesson.xpReward}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Explorer Experience
                </p>
              </div>

              <div className="card-modern p-6 text-center border-2 border-emerald-300 dark:border-emerald-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-2">✅ Status</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {score === lesson.questions.length ? "Perfect!" : score >= lesson.questions.length * 0.7 ? "Passed!" : "Try Again"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Island Unlocked
                </p>
              </div>
            </div>

            {/* Encouragement Message */}
            <div className="card-modern p-6 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border-2 border-teal-300 dark:border-teal-700">
              <p className="text-center text-gray-700 dark:text-gray-300 text-lg font-semibold">
                {score === lesson.questions.length
                  ? "⭐ Perfect score! You're a master explorer!"
                  : score >= lesson.questions.length * 0.7
                  ? "🌟 Great job! You've earned this reward!"
                  : "💪 Good effort! Keep improving your skills!"}
              </p>
            </div>

            {/* Navigation Button */}
            <Button
              onClick={() => setLocation("/archipelago")}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-6 text-lg font-bold shadow-lg transform hover:scale-105 transition-all"
            >
              <Wind className="w-5 h-5 mr-2" />
              Set Sail to Next Island
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
