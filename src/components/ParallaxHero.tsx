import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

const TOTAL_FRAMES = 192;
const ASSET_PATH = '/hero_parallax/frame_';

const padNumber = (num: number) => num.toString().padStart(3, '0');

export function ParallaxHero({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Overlay kicks in as you scroll down so the very first frame (logo) is bright
  // Scaled to the first part of the parallax phase
  const overlayOpacity = useTransform(smoothProgress, [0.25, 0.45], [0, 1]);

  // Handle the initial fade-in (after HookHero fades out) and the final fade-out (shrink phase)
  const heroOpacity = useTransform(
    smoothProgress,
    [0.05, 0.2, 0.8, 1.0], // Start fading in as HookHero fades out, making it much smoother
    [0, 1, 1, 0]
  );

  // ── Shrink-back transforms (last 200vh of scroll: progress 0.714 → 1.0) ──
  const cardScale = useTransform(smoothProgress, [0.714, 0.9], [1, 0.6]);
  const cardBorderRadius = useTransform(smoothProgress, [0.714, 0.85], [0, 32]);
  const cardY = useTransform(smoothProgress, [0.714, 0.95], ['0%', '-12%']);
  const cardShadow = useTransform(
    smoothProgress,
    [0.714, 0.8, 0.95],
    [
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 40px 120px rgba(0,0,0,0.6)',
      '0px 20px 60px rgba(0,0,0,0.3)',
    ]
  );

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${ASSET_PATH}${padNumber(i)}_delay-0.041s.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const progress = smoothProgress.get();

      // Frame sequence begins after HookHero (0.17) and ends before Shrink phase (0.75)
      const start = 0.17;
      const end = 0.75;
      const frameProgress = progress < start ? 0 : Math.min((progress - start) / (end - start), 1.0);
      let frameIndex = Math.floor(frameProgress * (TOTAL_FRAMES - 1));
      if (frameIndex < 0) frameIndex = 0;
      if (frameIndex >= TOTAL_FRAMES) frameIndex = TOTAL_FRAMES - 1;

      const img = images[frameIndex];

      if (img && img.complete) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    render();
    const unsubscribe = smoothProgress.on('change', render);
    window.addEventListener('resize', render);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', render);
    };
  }, [loaded, smoothProgress, images]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-corporate-white font-sans opacity-50 z-10">
          Initializing nanoceramic layers...
        </div>
      )}

      {/* Motion wrapper — handles both the fade-in on mount AND the shrink-back on scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          scale: cardScale,
          borderRadius: cardBorderRadius,
          opacity: heroOpacity,
          y: cardY,
          boxShadow: cardShadow,
        }}
        className="absolute inset-0 z-0 w-full h-full overflow-hidden"
      >
        {/* The frame sequence canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-100"
        />
        {/* The darkening overlay to guarantee text legibility, fading in on scroll */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#0A0A0A]/50 pointer-events-none"
        />

        {/* Seamless transition gradient to scroll content */}
        <div className="absolute bottom-[-2px] left-0 w-full h-48 md:h-64 bg-gradient-to-t from-deep-space-dark to-transparent pointer-events-none z-10" />
      </motion.div>
    </div>
  );
}
