import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScoreMeter = ({ score, shortlisted }) => {
  // Clamp score between 0 and 100
  const clampedScore = Math.min(Math.max(score, 0), 100);
  // Convert score to degrees (180deg = half circle)
  const degrees = (clampedScore * 180) / 100;

  // State for animated values (start from 0 for animation)
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedDegrees, setAnimatedDegrees] = useState(0);

  // Animate score and degrees on mount or score change
  useEffect(() => {
    // Animate score counter
    const scoreTimer = setTimeout(() => {
      setAnimatedScore(clampedScore);
    }, 300); // Delay to sync with arc animation

    // Animate degrees for pointer (clamped to ensure it doesn't exceed)
    setAnimatedDegrees(Math.min(degrees, 180)); // Explicitly cap at 180deg

    return () => clearTimeout(scoreTimer);
  }, [clampedScore, degrees]);

  // Circumference for stroke dash (π * radius * 2 / 2 for semicircle, approx 282 for r=90)
  const circumference = 282;
  const strokeDashoffset = circumference - (circumference * clampedScore) / 100;

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden">
      {/* Animated Meter */}
      <div className="relative w-72 h-36 flex items-center justify-center">
        {/* Background semicircle */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          <motion.path
            d="M10,100 A90,90 0 0,1 190,100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="16"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {/* Animated Foreground semicircle */}
          <motion.path
            d="M10,100 A90,90 0 0,1 190,100"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="16"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth progress
              delay: 0.2
            }}
            strokeLinecap="round"
          />
        </svg>


        {/* Center Label */}
        <motion.div
          className="absolute text-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="text-3xl font-bold text-gray-700 mb-1">
            {Math.round(animatedScore)}
          </div>
          <div className="text-sm text-gray-500">Match Score</div>
        </motion.div>
      </div>

      {/* Score + Status */}
      <div className="flex justify-center items-center w-full px-6">
        <motion.div
          className="text-xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Overall Score: <span className="text-purple-600">{Math.round(animatedScore)}%</span>
        </motion.div>
        
      </div>
         {shortlisted ? (
          <p className="text-green-600">🎉 Congratulations! You’ve been shortlisted.</p>
        ) : (
          <p className="text-red-600">
             Unfortunately, you are not shortlisted. Keep improving!
          </p>
        )}
        

      {/* Subtle glow effect on the meter (optional enhancement) */}
      <motion.div
        className="absolute inset-0 rounded-full bg-purple-500/5 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          top: '50%',
          left: '50%',
          width: '300px',
          height: '150px',
          transform: 'translate(-50%, -50%)',
          zIndex: -1
        }}
      />
    </div>
  );
};

export default ScoreMeter;
