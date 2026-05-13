import { motion, MotionValue, useTransform } from 'framer-motion';

export function HookHero({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
  const opacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.1], [1, 1.05]);
  const y = useTransform(smoothProgress, [0, 0.1], [0, -30]);
  const blur = useTransform(smoothProgress, [0, 0.08], [0, 15]);

  return (
    <motion.div 
      style={{ opacity, scale, y, filter: `blur(${blur}px)` }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center gap-12 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative"
        >
          <img 
            src="/thermx-logo-white.png" 
            alt="Therm X" 
            className="h-28 md:h-48 w-auto mix-blend-plus-lighter opacity-90"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-6 overflow-hidden">
          <motion.h1 
            initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-display text-4xl md:text-8xl max-w-4xl tracking-tighter"
          >
            Membrana <span className="text-transparent bg-clip-text bg-gradient-to-r from-thermal-orange to-white">Nanoceramică</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/40 font-bold"
          >
            Viitorul Izolației Termice Permanente
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-16 flex flex-col items-center gap-4 text-white/20"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-black">Hold to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-thermal-orange to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

