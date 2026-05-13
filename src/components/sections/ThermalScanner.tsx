import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const ThermalScanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  
  const sliderPos = useMotionValue(50);
  const smoothSliderPos = useSpring(sliderPos, { stiffness: 100, damping: 20 });

  const clipWidth = useTransform(smoothSliderPos, (v) => `${v}%`);
  const lineLeft = useTransform(smoothSliderPos, (v) => `${v}%`);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderPos.set(position);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };
    const onMouseUp = () => { isDragging.current = false; };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      sliderPos.set(70);
      setTimeout(() => sliderPos.set(30), 1000);
      setTimeout(() => sliderPos.set(50), 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-32 md:py-64 px-6 md:px-24 bg-transparent relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-start mb-24 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-thermal-orange" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-thermal-orange">Diagnostics</span>
          </div>
          <h2 className="text-display text-5xl md:text-8xl leading-none text-white">
            Vizualizare <br /> <span className="text-white/20">Termografică.</span>
          </h2>
        </div>

        <div className="bento-item p-4 md:p-8 overflow-hidden">
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            className="relative aspect-video rounded-[32px] overflow-hidden bg-black/40 cursor-ew-resize select-none"
          >
            {/* Base layer (Heat) */}
            <div className="absolute inset-0 bg-[#121212] flex items-center justify-center">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,#ff3300_0%,transparent_50%)]" />
               <h3 className="text-display text-2xl md:text-6xl text-white/5 uppercase italic">Standard Wall / Heat Leak</h3>
            </div>

            {/* Scanned layer (Shield) */}
            <motion.div 
              className="absolute inset-0 z-10 overflow-hidden border-r-2 border-thermal-orange/50 shadow-[10px_0_40px_rgba(255,69,0,0.2)]"
              style={{ width: clipWidth }}
            >
              <div className="absolute inset-0 w-[1400px] bg-[#000810]">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#00edff_0%,transparent_50%)]" />
                 <h3 className="absolute top-1/2 left-20 -translate-y-1/2 text-display text-2xl md:text-6xl text-thermal-orange/20 uppercase italic">thermX Shield / Thermal Lock</h3>
              </div>
            </motion.div>

            {/* Handle */}
            <motion.div 
              className="absolute inset-y-0 z-20 w-px bg-thermal-orange"
              style={{ left: lineLeft }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/50 backdrop-blur-3xl border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="flex gap-1.5">
                  <div className="w-1 h-4 bg-thermal-orange rounded-full" />
                  <div className="w-1 h-4 bg-thermal-orange rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            <div className="absolute bottom-8 left-8 z-30 flex gap-4">
               <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-[10px] font-black tracking-widest text-white/40 uppercase">
                  Convențional
               </div>
               <div className="px-6 py-3 rounded-full bg-thermal-orange/10 backdrop-blur-xl border border-thermal-orange/30 text-[10px] font-black tracking-widest text-thermal-orange uppercase">
                  Scut thermX
               </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
           <div className="bento-item p-12 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Metric_01</span>
              <h4 className="text-display text-4xl text-white italic">Pierderi Massive</h4>
              <p className="text-white/40 text-sm leading-relaxed font-medium">
                 Sistemul convențional absoarbe și transmite radiația infraroșie, transformând fațada într-un radiator uriaș.
              </p>
           </div>
           <div className="bento-item p-12 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-thermal-orange">Metric_02</span>
              <h4 className="text-display text-4xl text-white italic">Scut Nanoceramic</h4>
              <p className="text-white/40 text-sm leading-relaxed font-medium">
                 Sfera ceramică reflectă 85% din spectrul IR. Temperatura la nivelul substratului scade drastic.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

