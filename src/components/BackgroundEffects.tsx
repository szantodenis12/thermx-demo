import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

export function BackgroundEffects() {
  const { scrollYProgress } = useScroll();
  
  // Double buffer state for seamless looping
  const [activeBuffer, setActiveBuffer] = useState(0);
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const FADE_TIME = 0.8; // seconds for the cross-fade

  useEffect(() => {
    // Initial play
    if (videoRef0.current) videoRef0.current.play();
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    // When current video is near the end, trigger the other buffer
    if (video.duration > 0 && video.currentTime >= video.duration - FADE_TIME) {
      const nextBuffer = activeBuffer === 0 ? 1 : 0;
      const nextVideo = nextBuffer === 0 ? videoRef0.current : videoRef1.current;
      
      if (nextVideo && nextVideo.paused) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch((err: any) => console.error("Video play failed:", err));
        setActiveBuffer(nextBuffer);
      }
    }
  };

  const handleEnded = () => {
    // Ensure the finished video is paused and ready for next cycle
    const currentVideo = activeBuffer === 0 ? videoRef1.current : videoRef0.current;
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }
  };

  // Dynamic visibility based on Hook phase
  const videoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [0.8, 0.5, 0.2]);
  const videoBrightness = useTransform(scrollYProgress, [0, 0.1, 0.15], [1.2, 1.0, 0.7]);
  const brightnessTemplate = useMotionTemplate`brightness(${videoBrightness})`;

  // They move extremely slowly (0.2x speed)
  const y1 = useTransform(scrollYProgress, [0, 0.5], ['0%', '-5%']);
  const y2 = useTransform(scrollYProgress, [0, 0.5], ['0%', '-2%']);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-deep-space-dark">
      
      {/* Buffer 0 */}
      <motion.video
        ref={videoRef0}
        onTimeUpdate={activeBuffer === 0 ? handleTimeUpdate : undefined}
        onEnded={handleEnded}
        muted
        playsInline
        style={{ 
          opacity: activeBuffer === 0 ? videoOpacity : 0,
          filter: brightnessTemplate
        }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/back-video.mp4" type="video/mp4" />
      </motion.video>

      {/* Buffer 1 */}
      <motion.video
        ref={videoRef1}
        onTimeUpdate={activeBuffer === 1 ? handleTimeUpdate : undefined}
        onEnded={handleEnded}
        muted
        playsInline
        style={{ 
          opacity: activeBuffer === 1 ? videoOpacity : 0,
          filter: brightnessTemplate
        }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/back-video.mp4" type="video/mp4" />
      </motion.video>

      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] bg-thermal-orange/10 rounded-full blur-[150px] opacity-40 mix-blend-screen"
      />
      
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[40%] -right-[20%] w-[60%] h-[80%] bg-insulation-blue/10 rounded-full blur-[200px] opacity-30 mix-blend-screen"
      />
    </div>
  );
}
