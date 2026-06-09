import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, type ReactNode, useEffect } from 'react';
import { useScrollCtx } from '../App';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════
// PARALLAX WRAPPER — every section gets depth
// ═══════════════════════════════════════════════════
const ParallaxSection = ({
  children,
  className = "",
  speed = 0.15,
  id,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  id?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.4 });
  // Even larger range for very visible parallax depth
  const y = useTransform(smooth, [0, 1], [800 * speed, -800 * speed]);

  return (
    <section ref={ref} id={id} className={`relative z-10 ${className}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </section>
  );
};

// ═══════════════════════════════════════════════════
// TEXT REVEAL — word-by-word with mask clip
// ═══════════════════════════════════════════════════
const TextReveal = ({
  text,
  className = "",
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties | Record<string, any>;
}) => {
  const words = text.split(" ");
  return (
    <motion.h2 className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden py-[0.2em] my-[-0.2em] px-[0.1em] mx-[-0.1em] mr-[0.28em] last:mr-0 align-top"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: false, margin: "-20px" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
};

// ═══════════════════════════════════════════════════
// FADE REVEAL — for paragraphs and smaller elements
// ═══════════════════════════════════════════════════
const FadeReveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 30 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════
// SECTION TAG — the small orange labels
// ═══════════════════════════════════════════════════
const SectionTag = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <FadeReveal delay={delay}>
    <span className="text-[#FF4500] uppercase tracking-[0.3em] text-[11px] font-sans font-semibold block mb-6">
      {children}
    </span>
  </FadeReveal>
);

// ═══════════════════════════════════════════════════
// SECTION: Product (light zone)
// ═══════════════════════════════════════════════════
export const ProductSection = () => {
  const { themeProgress } = useScrollCtx();

  const textColor = useTransform(themeProgress, [0, 1], ['#FFFFFF', '#0A0A0A']);
  const subtextColor = useTransform(themeProgress, [0, 1], ['#FFFFFF', '#1A1A1A']);
  const cardBorder = useTransform(themeProgress, [0, 1], ['rgba(255,255,255,0.06)', 'rgba(0,0,0,0.08)']);
  const cardBg = useTransform(themeProgress, [0, 1], ['rgba(255,255,255,0.02)', 'rgba(0,0,0,0.03)']);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Initial state
      gsap.set([titleRef.current, contentRef.current, statsRef.current], { opacity: 0, y: 50 });

      // Timeline sequence
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.4 })
        .to(titleRef.current, { opacity: 0, y: -40, duration: 0.4 }, "+=1.5") // stay longer
        
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.4 })
        .to(contentRef.current, { opacity: 0, y: -40, duration: 0.4 }, "+=1.5")
        
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.4 })
        .to(statsRef.current, { opacity: 1, y: 0, duration: 1 }); // stay visible
        
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="produs" className="relative z-10 h-[300vh] md:h-[400vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 w-full h-[480px] sm:h-[450px] md:h-[400px]">
          
          {/* Title Area */}
          <div 
            ref={titleRef} 
            className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-start pt-16 md:justify-center md:pt-0"
          >
            <span className="text-[#FF4500] uppercase tracking-[0.3em] text-[11px] font-sans font-semibold block mb-6">
              Ce este
            </span>
            <motion.h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[-0.03em] leading-[1.05] max-w-[88%] sm:max-w-4xl mb-4 sm:mb-6" style={{ color: textColor }}>
              Membrană termoizolantă nanoceramică, aplicată prin pulverizare într-o grosime controlată de 1–3 mm.
            </motion.h2>
          </div>

          {/* Content Area */}
          <div 
            ref={contentRef} 
            className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-start pt-16 md:justify-center md:pt-0"
          >
            <motion.p className="text-sm sm:text-base md:text-xl leading-relaxed max-w-[88%] sm:max-w-3xl font-sans font-light" style={{ color: subtextColor }}>
              thermX folosește nanosfere ceramice vidate, integrate într-un strat nanoceramic reflectiv aplicat direct pe suprafață. După uscare, formează o membrană continuă, fără rosturi și fără îmbinări între plăci.
              <br /><br />
              Punctul forte al tehnologiei este reducerea transferului termic prin
              <motion.span className="font-medium" style={{ color: textColor }}> radiație</motion.span>.
              În același timp, continuitatea membranei limitează pierderile apărute la întreruperi, microfisuri și zone greu de acoperit.
            </motion.p>
          </div>

          {/* Stats Area */}
          <div 
            ref={statsRef} 
            className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-end pb-12 md:justify-center md:pb-0"
          >
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory w-full">
              {[
                { prefix: "PÂNĂ LA", value: "40%", label: "Economie de energie", desc: "Prin reflexia radiației și reducerea pierderilor termice la nivelul suprafeței." },
                { prefix: "PÂNĂ LA", value: "80%", label: "Timp de aplicare redus", desc: "Pulverizare rapidă, fără montaj de plăci, dibluri sau elemente mecanice suplimentare." },
                { prefix: "PÂNĂ LA", value: "30%", label: "Costuri de execuție reduse", desc: "Mai puține materiale auxiliare, mai puține etape și adaptare mai ușoară la suprafețe complexe." },
              ].map((stat) => (
                <motion.div
                  key={stat.value}
                  className="group relative p-5 sm:p-8 rounded-2xl transition-all duration-500 cursor-default backdrop-blur-md min-w-[270px] sm:min-w-0 snap-center"
                  style={{ borderWidth: 1, borderStyle: 'solid', borderColor: cardBorder, backgroundColor: cardBg }}
                >
                  <span className="block mb-1">
                    <span className="text-[#FF4500] font-display font-bold text-sm md:text-base uppercase tracking-widest">{stat.prefix}</span>
                  </span>
                  <span className="text-[#FF4500] font-display font-black text-4xl sm:text-5xl md:text-6xl block mb-3">
                    {stat.value}
                  </span>
                  <motion.h3 className="font-display font-bold text-lg mb-2" style={{ color: textColor }}>{stat.label}</motion.h3>
                  <motion.p className="text-sm leading-relaxed font-sans" style={{ color: subtextColor }}>{stat.desc}</motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════
// SECTION: Science (Mechanism)
// ═══════════════════════════════════════════════════
export const ScienceSection = () => {
  const mechanisms = [
    {
      title: "Radiație",
      percentage: "40%",
      subtitle: "din energia pierdută",
      description: "Invizibilă, dar importantă în bilanțul termic al unei clădiri. Aici intervine thermX: reflectă până la 85% din radiație, în loc să o lase absorbită de suprafață.",
      solution: "Reflexia radiației până la 85% — reducerea transferului termic radiant la nivelul suprafeței tratate.",
    },
    {
      title: "Conducție",
      percentage: "~35%",
      subtitle: "transfer prin solide",
      description: "Căldura trece direct prin materiale solide: beton, metal, cărămidă, tencuială. Nanosferele ceramice vidate din stratul thermX întrerup acest traseu termic.",
      solution: "Nanosferele ceramice vidate din stratul thermX întrerup traseul termic prin stratul aplicat.",
    },
    {
      title: "Convecție",
      percentage: "~25%",
      subtitle: "prin fisuri și rosturi",
      description: "Aerul cald scapă prin fisuri, rosturi și îmbinări neetanșe, frecvent la margini și colțuri. Fiind un strat continuu, thermX nu lasă astfel de întreruperi în strat.",
      solution: "Membrana continuă a thermX elimină întreruperile prin care aerul transportă energia termică.",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      const rows = gsap.utils.toArray<HTMLElement>('.mech-row');

      rows.forEach((row, i) => {
        if (i === 0) {
          gsap.set(row, { opacity: 1, y: 0 });
        } else {
          gsap.set(row, { opacity: 0, y: 100 });
        }

        if (i > 0) {
          tl.to(rows[i-1], { opacity: 0, y: -50, duration: 0.5 })
            .to(row, { opacity: 1, y: 0, duration: 0.5 });
        }
        
        tl.to({}, { duration: 0.5 }); // Stay time
      });
        
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="știință" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center gap-y-2 md:gap-y-0 pt-16 md:pt-0 pb-6 md:pb-0">
          <SectionTag>Ce trebuie să blocheze izolația</SectionTag>

          <TextReveal
            text="Nu toată căldura se pierde prin grosime."
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-white mb-4 sm:mb-6 max-w-[88%] sm:max-w-5xl"
            delay={0.1}
          />

          <FadeReveal delay={0.2}>
            <p className="text-white text-sm sm:text-base md:text-xl leading-relaxed max-w-[88%] sm:max-w-3xl font-sans font-light mb-6 md:mb-12">
              Izolațiile clasice lucrează prin masă și grosime. thermX lucrează la nivelul suprafeței: o membrană reflectivă care acționează direct asupra căilor prin care se pierde căldura.
            </p>
          </FadeReveal>

          <div className="relative h-[260px] sm:h-[300px] md:h-[400px] mt-4 md:mt-12">
            {mechanisms.map((mech) => (
              <div
                key={mech.title}
                className="mech-row absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12"
              >
                {/* Left: Title and Description */}
                <div className="md:w-2/3">
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3 md:mb-4">{mech.title}</h3>
                  <p className="text-white font-sans text-sm md:text-base leading-relaxed mb-3 md:mb-4">{mech.description}</p>
                  <p className="text-white font-sans text-sm md:text-base leading-relaxed font-medium border-l-2 border-[#FF4500] pl-4">{mech.solution}</p>
                </div>

                {/* Right: Big Percentage */}
                <div className="flex items-center md:flex-col md:items-center justify-start md:justify-center py-2 md:py-24">
                  <span className="text-[#FF4500] font-display font-black text-6xl md:text-8xl lg:text-9xl block">
                    {mech.percentage}
                  </span>
                  <span className="text-white font-sans text-xs md:text-sm ml-3 md:ml-0 md:mt-2">{mech.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full py-12 md:py-20 bg-transparent flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <video
            ref={videoRef}
            src="/ThermX-TestGheata.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════
// SECTION: Specifications
// ═══════════════════════════════════════════════════
export const SpecsSection = () => {
  const specs = [
    { category: "Performanță Termică", items: [
      { label: "Conductivitate termică (λ)", value: "0,001 W/mK", note: "Coeficient de transfer termic redus, valoarea centrală a performanței termice." },
      { label: "Interval de operare", value: "-60°C / +260°C", note: "Stabil în aplicații cu temperaturi foarte joase sau ridicate, de la spații frigorifice până la suprafețe industriale." },
      { label: "Reflexia radiației", value: "până la 85%", note: "Reducerea transferului termic radiant la nivelul suprafeței tratate." },
    ]},
    { category: "REZISTENȚĂ PE SUPORT", items: [
      { label: "Aderență la suport", value: "1,53–1,84 MPa", note: "Valori documentate pentru metal, beton și lemn, în funcție de tipul substratului." },
      { label: "Elongație la rupere", value: ">12%", note: "Membrana poate prelua dilatări și micro-mișcări ale suportului, menținând continuitatea stratului." },
    ]},
    { category: "STRUCTURĂ ȘI SIGURANȚĂ", items: [
      { label: "Densitate", value: "380–410 kg/m³", note: "Structură ușoară după uscare. La 1 mm grosime, adaugă aproximativ 0,4 kg/m²." },
      { label: "Reacție la foc", value: "Clasa A1", note: "Material incombustibil în stare uscată/polimerizată (Clasa A1), și Clasa C pentru material în stare lichidă, înainte de aplicare." },
    ]},
    { category: "COMPORTAMENT ÎN TIMP", items: [
      { label: "Permeabilitate la vapori", value: "0,0014 mg/(m·h·Pa)", note: "Comportament controlat la vapori, contribuind la gestionarea umidității la nivelul stratului aplicat." },
      { label: "Durabilitate", value: "35+ ani", note: "Conceput pentru utilizare pe termen lung, cu stabilitate a membranei în condiții normale de exploatare." },
    ]},
  ];

  return (
    <ParallaxSection id="specificații" className="py-20 sm:py-28 md:py-40 lg:py-56" speed={0.18}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionTag>Specificații tehnice</SectionTag>

        <TextReveal
          text="Performanță într-un strat subțire."
          className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-white mb-6 sm:mb-8 max-w-4xl"
          delay={0.1}
        />

        <FadeReveal delay={0.2}>
          <p className="text-gray-400 text-sm sm:text-base md:text-xl leading-relaxed max-w-3xl font-sans font-light mb-10 sm:mb-20">
            După aplicare, thermX rămâne un strat subțire, dar trebuie să reziste la solicitări reale: temperatură, mișcări ale suportului, vapori și expunere în timp. Valorile de mai jos arată cum se comportă la fiecare.
          </p>
        </FadeReveal>

        <div className="space-y-20">
          {specs.map((group, gi) => (
            <FadeReveal key={group.category} delay={0.06 * gi}>
              <div>
                <h3 className="font-display font-bold text-xs uppercase tracking-[0.25em] text-gray-500 mb-10 pb-4 border-b border-white/[0.06]">
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {group.items.map((item, ii) => (
                    <motion.div
                      key={item.label}
                      className="group p-6 rounded-2xl border border-white/[0.04] bg-white/[0.04] backdrop-blur-lg
                                 hover:border-[#FF4500]/20 hover:bg-white/[0.06] transition-all duration-500"
                      whileHover={{ y: -4, scale: 1.01 }}
                    >
                      <span className="text-gray-500 font-sans text-sm block mb-2">{item.label}</span>
                      <motion.span
                        className="text-white font-display font-black text-3xl md:text-4xl block mb-3
                                   group-hover:text-[#FF4500] transition-colors duration-500"
                        whileInView={{ scale: [0.85, 1.03, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + ii * 0.1 }}
                      >
                        {item.value}
                      </motion.span>
                      <p className="text-gray-500 font-sans text-sm leading-relaxed">{item.note}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeReveal>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
};

// ═══════════════════════════════════════════════════
// SECTION: Application
// ═══════════════════════════════════════════════════
export const ApplicationSection = () => {
  const steps = [
    { num: "01", title: "Pregătirea suportului", desc: "Suprafața se curăță, se usucă și se stabilizează înainte de aplicare. Aderentă membranei depinde de calitatea suportului." },
    { num: "02", title: "Pulverizare airless", desc: "Membrana se aplică uniform, în straturi controlate, până la grosimea finală recomandată pentru proiect." },
    { num: "03", title: "Uscare și formarea membranei", desc: "După uscare, thermX formează un strat continuu, adaptat la geometria suprafeței tratate." },
  ];

  const row1 = [
    "Beton",
    "Cărămidă",
    "BCA / zidărie celulară",
    "Tencuială existentă",
    "Fibrociment",
    "Metal",
    "Tablă / acoperișuri metalice"
  ];

  const row2 = [
    "Lemn",
    "OSB / placaj",
    "Panouri sandwich",
    "Gips-carton",
    "Conducte",
    "Rezervoare / containere / silozuri"
  ];

  const marquee1 = [...row1, ...row1, ...row1, ...row1];
  const marquee2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <ParallaxSection id="aplicare" className="py-20 sm:py-28 md:py-40 lg:py-56" speed={0.12}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionTag>Proces de aplicare</SectionTag>

        <TextReveal
          text="Aplicare controlată, în straturi succesive."
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-white mb-8 max-w-4xl"
          delay={0.1}
        />

        <FadeReveal delay={0.2}>
          <p className="text-gray-400 text-sm sm:text-base md:text-xl leading-relaxed max-w-3xl font-sans font-light mb-20">
            thermX se aplică după pregătirea suportului, în grosimea recomandată pentru proiect. Procesul urmărește aderența corectă, distribuția uniformă a materialului și formarea unei membrane continue după uscare.
          </p>
        </FadeReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden mb-32">
          {steps.map((step, i) => (
            <FadeReveal key={step.num} delay={0.15 * i}>
              <motion.div
                className="bg-[#0A0A0A]/80 backdrop-blur-md p-6 sm:p-10 md:p-14 group cursor-default hover:bg-white/[0.02] transition-colors duration-700"
                whileHover={{ y: -6 }}
              >
                <motion.span
                  className="text-[#FF4500]/20 font-display font-black text-5xl sm:text-7xl md:text-8xl block mb-4 md:mb-6
                           group-hover:text-[#FF4500]/50 transition-colors duration-700"
                  whileInView={{ y: [30, 0], opacity: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                >
                  {step.num}
                </motion.span>
                <h3 className="font-display font-bold text-xl text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            </FadeReveal>
          ))}
        </div>

        <div className="pt-24 border-t border-white/[0.06] mt-32 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center mb-16 px-6">
            <FadeReveal delay={0.1}>
              <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FF4500] mb-6 block font-semibold">
                Suprafețe compatibile
              </span>
              <h4 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-[1.1] tracking-[-0.03em] uppercase">
                SUPORTURI MINERALE, METALICE ȘI LEMNOASE
              </h4>
              <p className="text-gray-300 font-sans text-sm sm:text-base md:text-xl leading-relaxed font-light max-w-4xl mx-auto">
                thermX poate fi aplicat pe mai multe tipuri de suport, în funcție de compatibilitatea materialului, pregătirea suprafeței și condițiile proiectului.
              </p>
            </FadeReveal>
          </div>

          <FadeReveal delay={0.25}>
            <div className="w-full relative py-4 space-y-5 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

              {/* Row 1: Leftward Marquee */}
              <div className="flex gap-4 animate-marquee whitespace-nowrap min-w-max">
                {marquee1.map((item, index) => (
                  <motion.div
                    key={`marquee1-${index}`}
                    className="relative overflow-hidden px-6 py-4 rounded-2xl border border-white/[0.04] bg-[#0C0C0C]/80 backdrop-blur-md hover:border-[#FF4500]/30 transition-all duration-500 group cursor-default inline-flex items-center gap-3"
                    whileHover={{ 
                      y: -4, 
                      scale: 1.02, 
                      boxShadow: "0 10px 30px -10px rgba(255, 69, 0, 0.15)"
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-tr from-[#FF4500]/05 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]/40 group-hover:bg-[#FF4500] group-hover:scale-125 transition-all duration-500 flex-shrink-0" />
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-500 font-sans text-xs sm:text-sm font-light tracking-wide relative z-10">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Row 2: Rightward Marquee */}
              <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap min-w-max">
                {marquee2.map((item, index) => (
                  <motion.div
                    key={`marquee2-${index}`}
                    className="relative overflow-hidden px-6 py-4 rounded-2xl border border-white/[0.04] bg-[#0C0C0C]/80 backdrop-blur-md hover:border-[#FF4500]/30 transition-all duration-500 group cursor-default inline-flex items-center gap-3"
                    whileHover={{ 
                      y: -4, 
                      scale: 1.02, 
                      boxShadow: "0 10px 30px -10px rgba(255, 69, 0, 0.15)"
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-tr from-[#FF4500]/05 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]/40 group-hover:bg-[#FF4500] group-hover:scale-125 transition-all duration-500 flex-shrink-0" />
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-500 font-sans text-xs sm:text-sm font-light tracking-wide relative z-10">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeReveal>

          <FadeReveal delay={0.3}>
            <div className="mt-12 text-center max-w-4xl mx-auto px-6">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#FF4500]/15 bg-[#FF4500]/05 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
                <span className="text-gray-300 font-sans text-xs sm:text-sm font-light tracking-wide">
                  <strong className="text-white font-medium">Geometrii complexe:</strong> muchii, colțuri, racorduri, suprafețe curbe
                </span>
              </div>
            </div>
          </FadeReveal>
        </div>
      </div>
    </ParallaxSection>
  );
};

// ═══════════════════════════════════════════════════
// SECTION: Contact
// ═══════════════════════════════════════════════════
export const ContactSection = () => {
  const { themeProgress, openContact } = useScrollCtx();
  const textColor = useTransform(themeProgress, [0, 1], ['#FFFFFF', '#0A0A0A']);
  const subtextColor = useTransform(themeProgress, [0, 1], ['#9CA3AF', '#1A1A1A']);
  const boxBg = useTransform(themeProgress, [0, 1], ['rgba(255, 255, 255, 0.03)', 'rgba(0, 0, 0, 0.03)']);
  const boxBorder = useTransform(themeProgress, [0, 1], ['rgba(255, 255, 255, 0.08)', 'rgba(0, 0, 0, 0.08)']);

  return (
    <section id="contact" className="relative z-10 pt-[150px] sm:pt-[200px] md:pt-[300px] lg:pt-[400px] pb-16 md:pb-24">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <SectionTag delay={0}>CONTACT</SectionTag>

        <TextReveal
          text="Ai o suprafață de izolat?"
          className="font-display font-black text-3xl sm:text-3xl md:text-4xl lg:text-6xl tracking-[-0.03em] leading-[1.2] mb-2 sm:mb-3"
          style={{ color: textColor }}
          delay={0.1}
        />

        <TextReveal
          text="Începem cu datele proiectului."
          className="font-display font-black text-2xl sm:text-2xl md:text-3xl lg:text-5xl tracking-[-0.02em] leading-[1.2] mb-4 sm:mb-6"
          style={{ color: textColor }}
          delay={0.2}
        />

        <FadeReveal delay={0.25}>
          <motion.p className="text-sm sm:text-base md:text-lg font-sans font-light mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: subtextColor }}>
            Trimite tipul proiectului, suprafața estimată și materialul suport. Echipa thermX îți va recomanda grosimea, aplicarea și pașii potriviți.
          </motion.p>
        </FadeReveal>

        <FadeReveal delay={0.35}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              openContact();
            }}
            className="group inline-flex items-center gap-3 px-5 py-2.5 sm:px-10 sm:py-5 bg-[#FF4500] text-white font-sans font-medium text-xs sm:text-base tracking-wide rounded-full
                       hover:shadow-[0_0_60px_rgba(255,69,0,0.4)] transition-all duration-500 hover:scale-105 cursor-pointer"
          >
            <span>Cere recomandare</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </FadeReveal>

        <FadeReveal delay={0.45}>
          <motion.div 
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-md mt-[60px] md:mt-[100px]"
            style={{ 
              backgroundColor: boxBg,
              borderColor: boxBorder
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse flex-shrink-0" />
            <motion.p className="font-sans text-xs sm:text-sm font-light tracking-wide m-0" style={{ color: subtextColor }}>
              Nano Revolution SRL — Str. Ogorului, Nr 3, Oradea, Bihor 410554
            </motion.p>
          </motion.div>
        </FadeReveal>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════
export const Footer = () => (
  <footer className="relative py-12 border-t border-black/[0.04]">
    <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 flex-wrap">
        <div className="flex items-center">
          <span className="text-black font-display font-bold text-lg">thermX</span>
          <span className="text-[#FF4500] text-xl leading-none font-bold ml-[1px]">.</span>
        </div>
        <span className="text-gray-600 font-sans text-xs">
          © {new Date().getFullYear()} Nano Revolution SRL. Toate drepturile rezervate.
        </span>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          <a href="/docs/specificatie-tip-thermx.pdf" download target="_blank" rel="noopener noreferrer" className="text-gray-600 font-sans text-xs hover:text-black transition-colors">Fișă Tehnică</a>
          <a href="/docs/ghid-aplicare-thermx.pdf" download target="_blank" rel="noopener noreferrer" className="text-gray-600 font-sans text-xs hover:text-black transition-colors">Ghid de Aplicare</a>
          <a href="/docs/fisa-securitate-thermx.pdf" download target="_blank" rel="noopener noreferrer" className="text-gray-600 font-sans text-xs hover:text-black transition-colors">Fișă Securitate</a>
          <a href="/docs/garantie-standard-thermx.pdf" download target="_blank" rel="noopener noreferrer" className="text-gray-600 font-sans text-xs hover:text-black transition-colors">Garanție Standard</a>
          <a href="/docs/agrement-tehnic-thermx.pdf" download target="_blank" rel="noopener noreferrer" className="text-gray-600 font-sans text-xs hover:text-black transition-colors">Agrement Tehnic</a>
          <a href="/docs/declaratie-performanta-thermx.pdf" download target="_blank" rel="noopener noreferrer" className="text-gray-600 font-sans text-xs hover:text-black transition-colors">Declarație de Performanță</a>
        </div>
      </div>
      <div className="text-gray-600 font-sans text-xs">
        Site realizat de <a href="https://epicdigitalhub.ro/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#FF4500] transition-colors">Epic Digital Hub</a>
      </div>
    </div>
  </footer>
);
