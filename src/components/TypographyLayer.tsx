import { motion, MotionValue, useTransform } from 'framer-motion';

export function TypographyLayer({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
  
  // Layer 1: Headline
  const headlineOpacity = useTransform(smoothProgress, [0.18, 0.23, 0.33, 0.38], [0, 1, 1, 0]);
  const headlineY = useTransform(smoothProgress, [0.18, 0.23, 0.33, 0.38], [100, 0, -40, -150]);
  const headlineScale = useTransform(smoothProgress, [0.18, 0.23, 0.33, 0.38], [0.8, 1, 1, 1.2]);
  const headlineBlur = useTransform(smoothProgress, [0.18, 0.23, 0.33, 0.38], ["15px", "0px", "0px", "10px"]);

  // Layer 2: Sub-headline
  const subHeadlineOpacity = useTransform(smoothProgress, [0.40, 0.45, 0.55, 0.60], [0, 1, 1, 0]);
  const subHeadlineY = useTransform(smoothProgress, [0.40, 0.45, 0.55, 0.60], [100, 0, -40, -150]);
  const subHeadlineBlur = useTransform(smoothProgress, [0.40, 0.45, 0.55, 0.60], ["15px", "0px", "0px", "10px"]);

  // Layer 3: Benefit Tag
  const tagOpacity = useTransform(smoothProgress, [0.62, 0.67, 0.77, 0.82], [0, 1, 1, 0]);
  const tagY = useTransform(smoothProgress, [0.62, 0.67, 0.77, 0.82], [100, 0, -40, -150]);
  const tagBlur = useTransform(smoothProgress, [0.62, 0.67, 0.77, 0.82], ["20px", "0px", "0px", "10px"]);

  // Reveal Section (Phase Out)
  const introOpacity = useTransform(smoothProgress, [0.84, 0.90], [0, 1]);
  const introY = useTransform(smoothProgress, [0.84, 0.90], [100, 0]);
  const introBlur = useTransform(smoothProgress, [0.84, 0.90], ["blur(20px)", "blur(0px)"]);
 
  const introSubOpacity = useTransform(smoothProgress, [0.88, 0.94], [0, 1]);
  const introSubY = useTransform(smoothProgress, [0.88, 0.94], [60, 0]);
 
  const statsOpacity = useTransform(smoothProgress, [0.91, 0.97], [0, 1]);
  const statsY = useTransform(smoothProgress, [0.91, 0.97], [40, 0]);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-24 overflow-hidden">
        
        <motion.div className="relative w-full max-w-7xl flex flex-col items-center justify-center h-64">
        
        {/* Layer 1 */}
        <motion.div 
          style={{ opacity: headlineOpacity, y: headlineY, scale: headlineScale, filter: `blur(${headlineBlur})` }} 
          className="absolute z-10 w-full flex justify-center"
        >
          <h1 className="text-display text-4xl sm:text-7xl md:text-9xl text-white text-center text-balance max-w-6xl px-4">
            Milimetrul <br /> <span className="text-white/20">care contează.</span>
          </h1>
        </motion.div>

        {/* Layer 2 */}
        <motion.div 
          style={{ opacity: subHeadlineOpacity, y: subHeadlineY, filter: `blur(${subHeadlineBlur})` }} 
          className="absolute z-10 w-full flex justify-center"
        >
          <p className="text-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white max-w-5xl text-center text-balance px-6">
            Eficiență <span className="text-thermal-orange">Absolută.</span>
          </p>
        </motion.div>
        
        {/* Layer 3 */}
        <motion.div 
          style={{ opacity: tagOpacity, y: tagY, filter: `blur(${tagBlur})` }} 
          className="absolute z-10 w-full px-4 flex justify-center"
        >
          <h2 className="text-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white text-center text-balance max-w-5xl">
            Economie <span className="text-white/20">Permanenta.</span>
          </h2>
        </motion.div>

      </motion.div>

      {/* Intro reveal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-24">
        <div className="relative z-10 flex flex-col items-center text-center max-w-7xl">
          
          <motion.div style={{ opacity: introOpacity, y: introY, filter: introBlur }} className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-thermal-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-thermal-orange block">Paradigma Nouă</span>
              <div className="w-8 h-[1px] bg-thermal-orange" />
            </div>
            <h2 className="text-display text-4xl md:text-9xl leading-[0.9] text-white">
              0.5 mm <br /> <span className="text-white/20">Fără compromisuri.</span>
            </h2>
          </motion.div>

          <motion.p
            style={{ opacity: introSubOpacity, y: introSubY }}
            className="text-sm md:text-xl text-white/50 max-w-3xl leading-relaxed font-medium mt-12 px-4"
          >
            Se usucă și formează un strat continuu, fără rosturi — acoperind
            inclusiv geometrii complexe unde izolația clasică nu ajunge.
          </motion.p>

          <motion.div
            style={{ opacity: statsOpacity, y: statsY }}
            className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24"
          >
            {[
              { value: "≤ 0.001", unit: "W/(m·K)", label: "Lambda" },
              { value: "85%", unit: "", label: "Reflexie IR" },
              { value: "1 mm", unit: "", label: "Grosime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-display text-3xl md:text-6xl text-white group-hover:text-thermal-orange transition-colors duration-500">
                  {stat.value}
                  <span className="text-sm text-white/20 ml-2">{stat.unit}</span>
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-4 font-black">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      </div>
    </div>
  );
}

