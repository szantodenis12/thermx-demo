import { motion } from 'framer-motion';
import { useScrollCtx } from '../App';
import { ArrowRight } from 'lucide-react';

export const NanoRevolution = () => {
  const { navigateTo, openContact } = useScrollCtx();

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden flex flex-col justify-between">
      
      {/* ── NAVBAR ── */}
      <nav className="w-full z-50 bg-transparent transition-all duration-300">
        <div className="w-full px-6 md:px-12 lg:px-16 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/nano-revolution-logo-white.png" 
              alt="Nano Revolution Logo" 
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer"
              onClick={() => navigateTo('/')}
            />
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo('/thermx')}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#FF4500] text-white font-sans font-bold text-xs sm:text-sm tracking-wide rounded-full overflow-hidden
                         hover:shadow-[0_0_40px_rgba(255,69,0,0.4)] transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10">Vizitează thermX</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FF4500] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative py-12 px-6 max-w-7xl mx-auto text-center flex flex-col items-center justify-center flex-grow">
        <motion.h1
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.12] mb-8 max-w-5xl text-white uppercase"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          TRANSFORMĂM VIITORUL <br /> PAS CU PAS
        </motion.h1>

        <motion.p
          className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Dezvoltăm și implementăm tehnologii nanoceramice avansate pentru eficiență energetică extremă, durabilitate sporită și protecție termică în sectoarele civil, industrial și militar.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              openContact();
            }}
            className="px-8 py-4 text-gray-300 font-sans font-bold text-sm tracking-wide border border-white/10 rounded-full
                       hover:border-white/30 hover:text-white transition-all duration-500 hover:scale-105 w-full sm:w-auto cursor-pointer"
          >
            Solicită consultanță →
          </button>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full py-6 md:py-10 bg-transparent">
        <div className="w-full px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/nano-revolution-logo-white.png" alt="Nano Revolution Logo" className="h-8 w-auto object-contain md:hidden" />
            <p className="text-gray-500 font-sans text-xs text-center md:text-left">
              © {new Date().getFullYear()} Nano Revolution SRL. Toate drepturile rezervate.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://x.com/Nan0_Revolution" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/SC.NANO.REVOLUTION.SRL/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/nano.revolution/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
