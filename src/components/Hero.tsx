import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const Hero = () => {
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

  // Character-by-character animation for the title
  const title = "Milimetrul care contează.";
  const chars = title.split("");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 h-[130vh] flex flex-col items-center justify-center overflow-visible"
    >
      <div className="text-center px-4 relative z-10 max-w-7xl mx-auto">

        {/* Tag line — fastest parallax (disappears first) */}
        <motion.span
          className="block text-[#FF4500] uppercase tracking-[0.35em] text-[11px] md:text-xs font-sans font-semibold mb-10"
          style={{ y: tagY, opacity: tagOpacity }}
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Membrană termoizolantă nanoceramică
        </motion.span>

        {/* Title — character by character reveal with blur */}
        <motion.h1
          className="mb-10 perspective-[1000px]"
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
        >
          <span className="inline-block">
            {chars.map((char, i) => (
              <span key={i}>
                <motion.span
                  className="inline-block text-white font-display font-black text-[clamp(3rem,10vw,11rem)] leading-[0.88] tracking-[-0.05em]"
                  initial={{ opacity: 0, y: 40, rotateX: -50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.025,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    // Preserve whitespace for spaces
                    whiteSpace: char === ' ' ? 'pre' : undefined,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
                {i === 14 && <br />}
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle — medium parallax speed */}
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg lg:text-xl font-sans font-light leading-relaxed"
          style={{ y: subtitleY, opacity: subtitleOpacity }}
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Lambda echivalent <span className="text-white font-medium">0,001 W/(m·K)</span>.
          1 mm grosime. Până la <span className="text-[#FF4500] font-semibold">40% economie</span> pe factura de energie.
        </motion.p>

        {/* CTA — slowest parallax (stays longest) */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
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
            className="px-8 py-4 text-gray-300 font-sans font-medium text-sm tracking-wide border border-white/10 rounded-full
                       hover:border-white/30 hover:text-white transition-all duration-500 hover:scale-105"
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
