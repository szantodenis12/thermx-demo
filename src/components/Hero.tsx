import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useScrollCtx } from '../App';

export const Hero = () => {
  const { openContact } = useScrollCtx();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track this section's scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Spring-smoothed for buttery parallax
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });

  // PARALLAX: Content stays visible at load and fades out on scroll
  const tagY = useTransform(smooth, [0, 1], [0, -250]);
  const tagOpacity = useTransform(smooth, [0, 0.35], [1, 0]);

  const titleY = useTransform(smooth, [0, 1], [0, -120]);
  const titleOpacity = useTransform(smooth, [0, 0.5], [1, 0]);
  const titleScale = useTransform(smooth, [0, 1], [1, 0.92]);

  const subtitleY = useTransform(smooth, [0, 1], [0, -60]);
  const subtitleOpacity = useTransform(smooth, [0, 0.4], [1, 0]);

  const ctaY = useTransform(smooth, [0, 1], [0, -30]);
  const ctaOpacity = useTransform(smooth, [0, 0.3], [1, 0]);

  const scrollIndicatorOpacity = useTransform(smooth, [0, 0.15], [1, 0]);

  // Structured word list with global index offsets to prevent individual character wrapping
  const wordsData = [
    { word: "IZOLAȚIA", startIdx: 0, hasSpaceAfter: true },
    { word: "NU", startIdx: 9, hasSpaceAfter: true },
    { word: "ÎNSEAMNĂ", startIdx: 12, hasSpaceAfter: true, hasBrAfter: true },
    { word: "DOAR", startIdx: 21, hasSpaceAfter: true },
    { word: "GROSIME", startIdx: 26, hasSpaceAfter: true },
    { word: ".", startIdx: 34, hasSpaceAfter: false }
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 h-[130vh] flex flex-col items-center justify-center overflow-visible"
    >
      <div className="text-center px-4 relative z-10 max-w-7xl mx-auto">

        {/* Tag line — fastest parallax (disappears first) */}
        <motion.span
          className="block text-[#FF4500] uppercase tracking-[0.35em] text-[10px] md:text-xs font-sans font-semibold mb-6 md:mb-10"
          style={{ y: tagY, opacity: tagOpacity }}
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          MEMBRANĂ NANOCERAMICĂ TERMOIZOLANTĂ
        </motion.span>

        {/* Title — word-by-word wrapping, char-by-char reveal */}
        <motion.h1
          className="mb-6 md:mb-10 perspective-[1000px] leading-[1.18]"
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
        >
          <span className="flex flex-wrap justify-center gap-x-2 md:gap-x-5 gap-y-1.5 md:gap-y-0">
            {wordsData.map((wordObj, wIdx) => (
              <span key={wIdx} className="inline-flex items-center whitespace-nowrap">
                {wordObj.word.split("").map((char, charIdx) => {
                  const globalIdx = wordObj.startIdx + charIdx;
                  return (
                    <motion.span
                      key={charIdx}
                      id={globalIdx === 34 ? "hero-dot" : undefined}
                      className="inline-block text-white font-display font-black text-[clamp(1.5rem,6vw,4.5rem)] leading-[1.18] tracking-[0.01em]"
                      initial={{ opacity: 0, y: 40, rotateX: -50, filter: 'blur(10px)' }}
                      animate={{ opacity: globalIdx === 34 ? 0 : 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + globalIdx * 0.025,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {wordObj.hasBrAfter && <br className="hidden md:inline" />}
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle — medium parallax speed */}
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg lg:text-xl font-sans font-light leading-relaxed"
          style={{ y: subtitleY, opacity: subtitleOpacity }}
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          O parte importantă din căldură se pierde prin radiație, pe care grosimea nu o oprește. thermX o reflectă într-un strat de <span className="text-white font-medium">1–3 mm</span>.
        </motion.p>

        {/* Proof chips strip */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mt-6"
          style={{ y: subtitleY, opacity: subtitleOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {['reflexie 85%', 'economie până la 40%', 'λ 0,001 W/mK', 'garanție 20 de ani'].map((chip) => (
            <span key={chip} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white/70 backdrop-blur-sm">
              <span className="text-[#FF4500]">{chip.split(' ')[0]}</span>{' '}{chip.split(' ').slice(1).join(' ')}
            </span>
          ))}
        </motion.div>

        {/* CTA — slowest parallax (stays longest) */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-14"
          style={{ y: ctaY, opacity: ctaOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#produs"
            className="group relative px-8 py-4 bg-[#FF4500] text-white font-sans font-medium text-sm tracking-wide rounded-full overflow-hidden
                       transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,69,0,0.4)] hover:scale-105"
          >
            <span className="relative z-10">Descoperă produsul</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FF4500] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              openContact();
            }}
            className="px-8 py-4 text-gray-300 font-sans font-medium text-sm tracking-wide border border-white/10 rounded-full
                       hover:border-white/30 hover:text-white transition-all duration-500 hover:scale-105 cursor-pointer"
          >
            Solicită ofertă →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-sans">Scroll</span>
        <div className="w-[1px] h-14 bg-gray-800/50 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF4500] to-transparent rounded-full"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
