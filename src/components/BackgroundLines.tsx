import { motion } from 'framer-motion';

export const BackgroundLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
      <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M-100 200 C 300 100, 800 500, 1500 300"
          stroke="url(#gradient-1)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M-50 400 C 400 600, 600 200, 1600 500"
          stroke="url(#gradient-2)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M100 100 C 500 300, 300 700, 1400 800"
          stroke="url(#gradient-1)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 5, delay: 1, ease: "easeInOut" }}
        />
        
        {/* Continuous floating animation for the paths */}
        <motion.g
          animate={{
            y: [0, -20, 0],
            rotate: [0, 1, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Duplicate some paths with high blur for a glow effect */}
          <path
            d="M-100 200 C 300 100, 800 500, 1500 300"
            stroke="#FF4500"
            strokeWidth="4"
            className="blur-xl opacity-20"
          />
        </motion.g>

        <defs>
          <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4500" />
            <stop offset="50%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#00EDFF" />
          </linearGradient>
          <linearGradient id="gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00EDFF" />
            <stop offset="100%" stopColor="#FF4500" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
