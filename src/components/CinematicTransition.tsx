import { useRef } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

// The last frame of the parallax hero sequence
const LAST_FRAME_SRC = "/hero_parallax/frame_191_delay-0.041s.jpg";

interface Props {
  /** The parent smoothProgress so we can read where the hero left off */
  parentProgress: MotionValue<number>;
}

export function CinematicTransition({ parentProgress }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll across this 200vh container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  // ── Hero Card Shrink ──────────────────────────────────────
  const cardScale = useTransform(smooth, [0, 0.5], [1, 0.6]);
  const cardBorderRadius = useTransform(smooth, [0, 0.4], [0, 32]);
  const cardOpacity = useTransform(smooth, [0.4, 0.9], [1, 0]);
  const cardY = useTransform(smooth, [0, 0.7], ["0%", "-15%"]);
  // Subtle shadow that appears as the card lifts off
  const cardShadow = useTransform(
    smooth,
    [0, 0.3, 0.7],
    [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 40px 100px rgba(0,0,0,0.5)",
      "0px 20px 60px rgba(0,0,0,0.3)",
    ]
  );

  // ── Text Reveal ────────────────────────────────────────────
  const textOpacity = useTransform(smooth, [0.25, 0.5], [0, 1]);
  const textY = useTransform(smooth, [0.25, 0.5], [80, 0]);
  const textBlur = useTransform(
    smooth,
    [0.25, 0.5],
    ["blur(16px)", "blur(0px)"]
  );

  // Sub-headline stagger
  const subOpacity = useTransform(smooth, [0.35, 0.6], [0, 1]);
  const subY = useTransform(smooth, [0.35, 0.6], [60, 0]);

  // CTA / stats row
  const ctaOpacity = useTransform(smooth, [0.5, 0.75], [0, 1]);
  const ctaY = useTransform(smooth, [0.5, 0.75], [40, 0]);

  // Only show this section once the hero parallax is essentially complete
  const sectionOpacity = useTransform(parentProgress, [0.85, 1], [0, 1]);

  return (
    <div ref={sectionRef} className="relative w-full h-[200vh]">
      {/* Sticky viewport */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-deep-space-dark"
      >
        {/* ── Shrinking Hero Card ── */}
        <motion.div
          style={{
            scale: cardScale,
            borderRadius: cardBorderRadius,
            opacity: cardOpacity,
            y: cardY,
            boxShadow: cardShadow,
          }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <img
            src={LAST_FRAME_SRC}
            alt="thermX hero"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-space-dark via-deep-space-dark/60 to-transparent" />
        </motion.div>

        {/* ── Ambient Glow ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-thermal-orange/10 rounded-full blur-[200px]" />
        </div>

        {/* ── Text Content ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
          {/* Headline */}
          <motion.div
            style={{ opacity: textOpacity, y: textY, filter: textBlur }}
          >
            <span className="text-corporate-white/50 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6 block font-display">
              Ce este thermX
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-corporate-white tracking-tighter leading-[1.05] text-balance font-display">
              O membrană termoizolantă de doar{" "}
              <span className="text-thermal-orange">0,5 – 1 mm</span>, aplicată
              prin pulverizare.
            </h2>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="text-xl md:text-2xl text-corporate-white/70 max-w-3xl leading-relaxed font-light text-balance mt-8"
          >
            Se usucă și formează un strat continuu, fără rosturi — acoperind
            inclusiv geometrii complexe unde izolația clasică nu ajunge.
          </motion.p>

          {/* Stats row */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: "≤ 0.001", unit: "W/(m·K)", label: "Lambda echivalent" },
              { value: "85%", unit: "", label: "Reflexie IR" },
              { value: "1 mm", unit: "", label: "Grosime aplicare" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-corporate-white">
                  {stat.value}
                  <span className="text-sm text-corporate-white/40 ml-1">
                    {stat.unit}
                  </span>
                </div>
                <div className="text-[10px] md:text-xs text-corporate-white/30 uppercase tracking-widest mt-1 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Scroll indicator at very bottom ── */}
        <motion.div
          style={{ opacity: useTransform(smooth, [0, 0.1, 0.6, 0.8], [0, 0.6, 0.6, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-corporate-white/40 text-[10px] tracking-[0.3em] uppercase font-sans">
            Continuă
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg
              className="w-4 h-4 text-corporate-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
