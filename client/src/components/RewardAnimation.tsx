import React, { useState, useEffect } from 'react';

interface RewardAnimationProps {
  xp: number;
  coins: number;
  achievement?: string;
  onComplete?: () => void;
}

export const RewardAnimation: React.FC<RewardAnimationProps> = ({
  xp,
  coins,
  achievement,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<Array<{ id: number; type: 'xp' | 'coin' }>>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: Array<{ id: number; type: 'xp' | 'coin' }> = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: i,
        type: i % 2 === 0 ? 'xp' : 'coin',
      });
    }
    setParticles(newParticles);

    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
      {/* Main reward card */}
      <div
        className="animate-bounce bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-6 rounded-lg shadow-2xl text-center z-50"
        style={{
          animation: 'fadeInScale 0.5s ease-out',
        }}
      >
        <div className="text-4xl font-bold mb-2">+{xp} XP</div>
        <div className="text-2xl font-semibold flex items-center justify-center gap-2">
          <span>💰</span> +{coins} Coins
        </div>
        {achievement && (
          <div className="mt-3 text-sm font-semibold bg-black bg-opacity-30 px-3 py-1 rounded">
            🏆 Achievement Unlocked!
          </div>
        )}
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-3xl"
          style={{
            animation: `floatUp ${2 + Math.random()}s ease-out forwards`,
            left: `${50 + (Math.random() - 0.5) * 200}px`,
            top: '50%',
            opacity: 0,
          }}
        >
          {particle.type === 'xp' ? '⭐' : '💛'}
        </div>
      ))}

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) translateX(${(Math.random() - 0.5) * 100}px);
          }
        }
      `}</style>
    </div>
  );
};

export default RewardAnimation;
