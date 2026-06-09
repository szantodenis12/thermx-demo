import { useRef, createContext, useContext, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, MotionValue, useMotionValue, AnimatePresence, motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { FloatingModel } from './components/FloatingModel';
import { ProductSection, VideoSection, ScienceSection, SpecsSection, ApplicationSection, ContactSection, Footer } from './components/Sections';
import { CategoriesSection, LandingPage } from './components/Categories';
import { ContactModal } from './components/ContactModal';
import { NanoRevolution } from './components/NanoRevolution';

// ── Global scroll context ──
// Every component can read the current "theme progress" (0 = dark, 1 = light)
interface ScrollCtx {
  themeProgress: MotionValue<number>; // 0..1, 0=dark, 1=light
  openContact: () => void;
  currentPath: string;
  navigateTo: (path: string) => void;
}
export const ScrollContext = createContext<ScrollCtx>({} as ScrollCtx);
export const useScrollCtx = () => useContext(ScrollContext);

// ── Thermx Layout Wrapper ──
// This component only mounts when route is /thermx.
// Because of this, target refs are guaranteed to exist when hooks mount,
// allowing useScroll to bind correctly to the DOM elements instead of window/null.
function ThermxLayout({
  globalThemeProgress,
  setCurrentCategory,
}: {
  globalThemeProgress: MotionValue<number>;
  setCurrentCategory: (category: string | null) => void;
}) {
  const [isTimeoutDone, setIsTimeoutDone] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    setIsTimeoutDone(false);
    setIsModelLoaded(false);

    const timer = setTimeout(() => {
      setIsTimeoutDone(true);
    }, 2000); // 2 seconds minimum loader duration

    return () => clearTimeout(timer);
  }, []);

  const isLoading = !isTimeoutDone || !isModelLoaded;

  const lightSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  // Track when the light section enters/exits the viewport
  const { scrollYProgress: lightProgress } = useScroll({
    target: lightSectionRef,
    offset: ["start end", "end start"],
  });

  // Track when the contact section enters/exits the viewport
  const { scrollYProgress: contactProgress } = useScroll({
    target: contactSectionRef,
    offset: ["start end", "end start"],
  });

  const p1 = useTransform(lightProgress, [0, 0.2, 0.55, 0.75], [0, 1, 1, 0]);
  const p2 = useTransform(contactProgress, [0, 0.2, 1], [0, 1, 1]);
  
  // Combine both progresses so that either one makes the theme light
  const combinedProgress = useTransform([p1, p2], ([v1, v2]) => Math.max(v1 as number, v2 as number));

  // Smooth it with spring physics for that buttery feel
  const themeProgress = useSpring(
    combinedProgress,
    { stiffness: 120, damping: 30, mass: 0.3 }
  );

  // Sync local spring progress with the stable global MotionValue
  useEffect(() => {
    globalThemeProgress.set(themeProgress.get());
    
    const unsubscribe = themeProgress.on("change", (latest) => {
      globalThemeProgress.set(latest);
    });
    
    return () => {
      unsubscribe();
      globalThemeProgress.set(0); // Reset global progress to 0 (dark mode) on unmount
    };
  }, [themeProgress, globalThemeProgress]);

  return (
    <>
      {/* Dynamic Animated Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="thermx-loader"
            initial={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0,
              y: -40,
              scale: 0.97,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Radial glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-glow opacity-30 blur-3xl pointer-events-none" />

            {/* Icon Container */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" }
              }}
              className="relative flex items-center justify-center"
            >
              {/* Pulsing ring around icon */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-32 h-32 rounded-full border border-[#FF4500]/25 pointer-events-none"
              />
              
              {/* The Favicon SVG */}
              <motion.img 
                src="/favicon-nano.svg" 
                alt="Nano Icon" 
                className="w-20 h-20 relative z-10"
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Subtle loading line */}
            <div className="mt-12 w-36 h-[1px] bg-white/5 rounded-full overflow-hidden relative z-10">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-[#FF4500]"
                initial={{ width: "0%" }}
                animate={{ 
                  width: isLoading ? "75%" : "100%",
                  transition: { duration: 2, ease: "easeInOut" }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Model — fixed, z-index: 1, renders BEHIND content */}
      <FloatingModel onLoaded={() => setIsModelLoaded(true)} />

      {/* Content wrapper — z-index 5 ensures all text renders ABOVE the 3D model */}
      <div className="relative z-[5]">
        {/* Navbar — reads themeProgress for logo/text color */}
        <Navbar />

        {/* Hero (dark) */}
        <Hero />

        {/* This wrapper is what we track for the dark→light→dark transition */}
        <div ref={lightSectionRef}>
          <ProductSection />
        </div>

        {/* Video Demonstration (Ice Test) */}
        <VideoSection />

        {/* Back to dark sections */}
        <ScienceSection />
        <SpecsSection />
        <ApplicationSection />
        
        {/* Categories Section */}
        <CategoriesSection onSelect={setCurrentCategory} />
        
        <div ref={contactSectionRef}>
          <ContactSection />
        </div>
        <Footer />
      </div>
    </>
  );
}

function App() {
  const globalThemeProgress = useMotionValue(0);

  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const openContact = () => setIsContactOpen(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validCategories = ['proprietari', 'constructori', 'arhitecti', 'industrial', 'instalatori'];
      if (validCategories.includes(hash)) {
        setCurrentCategory(hash);
      } else {
        setCurrentCategory(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const isThermx = currentPath.toLowerCase() === '/thermx';

  useEffect(() => {
    if (isThermx) {
      document.title = 'thermX';
    } else {
      document.title = 'NANO REVOLUTION';
    }
  }, [isThermx]);

  return (
    <ScrollContext.Provider value={{ themeProgress: globalThemeProgress, openContact, currentPath, navigateTo }}>
      <main className="relative w-full font-sans bg-[#0A0A0A]">
        {/* Fixed animated background — reads themeProgress for colors */}
        <AnimatedBackground />

        {isThermx ? (
          <ThermxLayout 
            globalThemeProgress={globalThemeProgress} 
            setCurrentCategory={setCurrentCategory} 
          />
        ) : (
          <div className="relative z-[5]">
            <NanoRevolution />
          </div>
        )}

        {/* Full-screen Landing Page Overlay */}
        {isThermx && currentCategory && (
          <LandingPage category={currentCategory} onBack={() => setCurrentCategory(null)} />
        )}

        {/* Contact Form Modal */}
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </main>
    </ScrollContext.Provider>
  );
}

export default App;
