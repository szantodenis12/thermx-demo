import { motion, useTransform, useMotionValue } from 'framer-motion';
import { useScrollCtx } from '../App';

/*
  ALWAYS-VISIBLE flowing curves with gentle continuous float.
  No dash animation — the lines are permanently drawn and just undulate vertically.
  This ensures there are NEVER gaps or empty areas.
*/

const LINES = [
  "M-100 80 C 200 40, 500 140, 720 60 S 1100 140, 1300 80 S 1600 40, 1900 100",
  "M-60 160 C 180 220, 400 120, 680 200 S 1000 120, 1280 190 S 1500 230, 1900 170",
  "M-120 260 C 250 200, 480 310, 740 240 S 1050 330, 1320 260 S 1550 200, 1900 280",
  "M-80 360 C 300 310, 520 410, 760 340 S 1080 430, 1340 360 S 1580 310, 1900 380",
  "M-140 440 C 160 500, 440 380, 700 470 S 1020 380, 1260 460 S 1520 510, 1900 450",
  "M-50 530 C 220 480, 460 580, 730 510 S 1060 600, 1310 530 S 1560 480, 1900 550",
  "M-110 620 C 280 680, 530 570, 780 650 S 1100 560, 1350 640 S 1580 690, 1900 630",
  "M-70 710 C 240 660, 490 760, 750 700 S 1070 790, 1330 720 S 1560 670, 1900 730",
  "M-90 800 C 200 850, 450 760, 710 830 S 1040 750, 1300 820 S 1540 860, 1900 810",
  "M-130 130 C 170 80, 420 190, 690 110 S 1030 200, 1290 130 S 1530 80, 1900 150",
  "M-60 490 C 240 540, 480 440, 740 520 S 1060 430, 1310 510 S 1560 550, 1900 500",
  "M-100 850 C 300 800, 500 880, 780 830 S 1100 900, 1360 840 S 1600 790, 1900 860",
];

export const AnimatedBackground = () => {
  const { themeProgress } = useScrollCtx();
  const fallbackProgress = useMotionValue(0);
  const activeProgress = themeProgress || fallbackProgress;

  const bgColor = useTransform(activeProgress, [0, 1], ['#0A0A0A', '#F5F5F0']);
  const gridStroke = useTransform(activeProgress, [0, 1], ['rgba(255,255,255,0.02)', 'rgba(0,0,0,0.035)']);
  const glowOpacity = useTransform(activeProgress, [0, 1], [1, 0.3]);
  const strokeOrange = useTransform(activeProgress, [0, 1], ['rgba(255,69,0,0.15)', 'rgba(0,0,0,0.06)']);
  const strokeCyan = useTransform(activeProgress, [0, 1], ['rgba(0,237,255,0.08)', 'rgba(0,0,0,0.035)']);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: bgColor }}
    >
      {/* Radial glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
        style={{
          opacity: glowOpacity,
        }}
      >
        <div className="w-full h-full rounded-full bg-glow" />
      </motion.div>

      {/* Always-visible SVG curves with continuous float */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {LINES.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            strokeWidth={i % 3 === 0 ? 1.2 : 0.8}
            strokeLinecap="round"
            stroke={i % 2 === 0 ? strokeOrange : strokeCyan}
            className={`svg-float-${i % 4}`}
          />
        ))}
      </svg>

      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bg-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <motion.path d="M 80 0 L 0 0 0 80" fill="none" stroke={gridStroke} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid)" />
      </svg>
    </motion.div>
  );
};
