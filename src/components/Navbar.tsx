import { motion, useTransform, useMotionValue } from 'framer-motion';
import { useScrollCtx } from '../App';

export const Navbar = () => {
  const { themeProgress } = useScrollCtx();
  const fallbackProgress = useMotionValue(0);
  const activeProgress = themeProgress || fallbackProgress;

  // Adapt colors to theme
  const logoColor = useTransform(activeProgress, [0, 1], ['#FFFFFF', '#0A0A0A']);
  const btnBorderColor = useTransform(activeProgress, [0, 1], ['rgba(255,69,0,0.3)', 'rgba(255,69,0,0.5)']);
  const btnBg = useTransform(activeProgress, [0, 1], ['transparent', 'rgba(255,69,0,0.06)']);

  return (
    <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-5 flex justify-between items-center z-50">
      {/* Logo */}
      <a href="#" className="flex items-center" id="nav-logo-anchor">
        <motion.span 
          id="nav-text-therm"
          className="font-display font-black text-xl tracking-tight opacity-0"
          style={{ color: logoColor }}
        >
          therm
        </motion.span>
        <span 
          id="nav-text-x"
          className="text-[#FF4500] text-2xl leading-none font-black ml-[1px] opacity-0"
        >
          X.
        </span>
      </a>

      {/* CTA */}
      <motion.a 
        href="#contact" 
        className="text-xs font-sans font-medium tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-500
                   hover:bg-[#FF4500] hover:text-white hover:border-[#FF4500] hover:shadow-[0_0_30px_rgba(255,69,0,0.3)]"
        style={{ 
          color: logoColor,
          borderColor: btnBorderColor,
          backgroundColor: btnBg,
        }}
      >
        Contact
      </motion.a>
    </nav>
  );
};
