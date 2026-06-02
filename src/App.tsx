import { useRef, createContext, useContext, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { FloatingModel } from './components/FloatingModel';
import { ProductSection, ScienceSection, SpecsSection, ApplicationSection, ContactSection, Footer } from './components/Sections';
import { CategoriesSection, LandingPage } from './components/Categories';
import { ContactModal } from './components/ContactModal';

// ── Global scroll context ──
// Every component can read the current "theme progress" (0 = dark, 1 = light)
interface ScrollCtx {
  themeProgress: MotionValue<number>; // 0..1, 0=dark, 1=light
  openContact: () => void;
}
export const ScrollContext = createContext<ScrollCtx>({} as ScrollCtx);
export const useScrollCtx = () => useContext(ScrollContext);

function App() {
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

  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

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

  return (
    <ScrollContext.Provider value={{ themeProgress, openContact }}>
      <main className="relative w-full font-sans bg-[#0A0A0A]">
        {/* Fixed animated background — reads themeProgress for colors */}
        <AnimatedBackground />

        {/* 3D Model — fixed, z-index: 1, renders BEHIND content */}
        <FloatingModel />

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

          {/* Back to dark sections */}
          <ScienceSection />
          <SpecsSection />
          <ApplicationSection />
          
          {/* Categories Section */}
          <CategoriesSection onSelect={(category) => setCurrentCategory(category)} />
          
          <div ref={contactSectionRef}>
            <ContactSection />
          </div>
          <Footer />
        </div>

        {/* Full-screen Landing Page Overlay */}
        {currentCategory && (
          <LandingPage category={currentCategory} onBack={() => setCurrentCategory(null)} />
        )}

        {/* Contact Form Modal */}
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </main>
    </ScrollContext.Provider>
  );
}

export default App;
