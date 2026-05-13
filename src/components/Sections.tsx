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
          className="inline-block overflow-hidden pb-[0.08em] mr-[0.28em] last:mr-0 align-top"
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
  const subtextColor = useTransform(themeProgress, [0, 1], ['#9CA3AF', '#1A1A1A']);
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
    <section ref={sectionRef} id="produs" className="relative z-10 h-[400vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 w-full h-[400px]">
          
          {/* Title Area */}
          <div 
            ref={titleRef} 
            className="absolute inset-0 flex flex-col justify-center"
          >
            <span className="text-[#FF4500] uppercase tracking-[0.3em] text-[11px] font-sans font-semibold block mb-6">
              Ce este
            </span>
            <motion.h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] max-w-4xl" style={{ color: textColor }}>
              O membrană termoizolantă de doar 0,5–1 mm, aplicată prin pulverizare.
            </motion.h2>
          </div>

          {/* Content Area */}
          <div 
            ref={contentRef} 
            className="absolute inset-0 flex flex-col justify-center"
          >
            <motion.p className="text-lg md:text-xl leading-relaxed max-w-3xl font-sans font-light" style={{ color: subtextColor }}>
              Se usucă și formează un strat continuu, fără rosturi — acoperind inclusiv geometrii complexe unde izolația clasică nu ajunge. Blochează toate cele trei mecanisme de transfer termic:
              <motion.span className="font-medium" style={{ color: textColor }}> conducție, convecție și radiație infraroșie</motion.span>.
              Rezultatul: performanță de izolație comparabilă cu 8–10 cm de polistiren, într-un singur milimetru.
            </motion.p>
          </div>

          {/* Stats Area */}
          <div 
            ref={statsRef} 
            className="absolute inset-0 flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { value: "40%", label: "Economie energie", desc: "Membrana reflectă 85% din radiația infraroșie și elimină punțile termice." },
                { value: "80%", label: "Timp mai scurt", desc: "O casă de 150 m² se finalizează în 2–3 zile cu 1–2 operatori." },
                { value: "30%", label: "Cost mai mic", desc: "Fără schelă, fără ancore mecanice, fără profil de pornire." },
              ].map((stat) => (
                <motion.div
                  key={stat.value}
                  className="group relative p-8 rounded-2xl transition-all duration-500 cursor-default backdrop-blur-md"
                  style={{ borderWidth: 1, borderStyle: 'solid', borderColor: cardBorder, backgroundColor: cardBg }}
                >
                  <span className="text-[#FF4500] font-display font-black text-5xl md:text-6xl block mb-3">
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
// SECTION: Science
// ═══════════════════════════════════════════════════
export const ScienceSection = () => {
  const mechanisms = [
    {
      title: "Radiație infraroșie",
      percentage: "40%",
      subtitle: "din energia pierdută",
      description: "Orice suprafață caldă emite radiație infraroșie — invizibilă, dar responsabilă pentru până la 40% din energia pierdută. EPS și vata minerală o ignoră complet.",
      solution: "thermX reflectă 85% din radiația infraroșie. De aceea 1 mm e suficient.",
    },
    {
      title: "Conducție",
      percentage: "~35%",
      subtitle: "transfer prin solide",
      description: "Căldura trece direct prin materiale solide — pereți, beton, metal, lemn. Cu cât materialul e mai dens, cu atât pierderea e mai mare.",
      solution: "Microsferele ceramice cu gaz rarefiat creează un traseu sinuos. Lambda echivalent de 0,001 W/mK.",
    },
    {
      title: "Convecție",
      percentage: "~25%",
      subtitle: "prin fisuri și rosturi",
      description: "Aerul cald se scurge prin fisuri, rosturi, joncțiuni neștanșe. Fiecare rost e o cale de evacuare a căldurii.",
      solution: "thermX se pulverizează ca un strat fluid continuu. Nu există plăci, nu există rosturi.",
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
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
          <SectionTag>Ce trebuie să blocheze izolația</SectionTag>

          <TextReveal
            text="Izolația clasică ignoră 40% din pierderile termice."
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-white mb-6 max-w-5xl"
            delay={0.1}
          />

          <FadeReveal delay={0.2}>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl font-sans font-light mb-12">
              Izolația clasică blochează conducția și parțial convecția — dar ignoră radiația, responsabilă pentru până la 40% din pierderile termice. thermX le blochează pe toate trei.
            </p>
          </FadeReveal>

          <div className="relative h-[400px] mt-12">
            {mechanisms.map((mech) => (
              <div
                key={mech.title}
                className="mech-row absolute inset-0 flex flex-col md:flex-row items-center justify-between gap-12"
              >
                {/* Left: Title and Description */}
                <div className="md:w-2/3">
                  <h3 className="font-display font-bold text-3xl text-white mb-4">{mech.title}</h3>
                  <p className="text-gray-400 font-sans text-base leading-relaxed mb-4">{mech.description}</p>
                  <p className="text-white font-sans text-base leading-relaxed font-medium border-l-2 border-[#FF4500] pl-4">{mech.solution}</p>
                </div>

                {/* Right: Big Percentage */}
                <div className="min-h-screen relative flex items-center justify-center py-24">
                  <span className="text-[#FF4500] font-display font-black text-8xl md:text-9xl block">
                    {mech.percentage}
                  </span>
                  <span className="text-gray-500 font-sans text-sm mt-2">{mech.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
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
      { label: "Interval de operare", value: "-60°C / +260°C", note: "Funcționează de la depozite frigorifice la conducte industriale cu abur." },
      { label: "Reflexie infraroșu", value: "85%", note: "Până la 40% economie pe factura de energie." },
    ]},
    { category: "Rezistență Mecanică", items: [
      { label: "Aderență la substrat", value: "1,84 MPa", note: "De peste 7 ori minimul cerut de standarde (0,25 MPa)." },
      { label: "Elongație la rupere", value: ">12%", note: "Un metru de membrană se întinde cu 12 cm înainte de cedare." },
    ]},
    { category: "Siguranță și Structură", items: [
      { label: "Densitate", value: "380–410 kg/m³", note: "La 1 mm grosime, doar 0,4 kg/m²." },
      { label: "Reacție la foc", value: "Clasa A", note: "Material necombustibil. Nu propagă focul, nu se topește." },
    ]},
    { category: "Proprietăți Material", items: [
      { label: "Permeabilitate vapori", value: "Da", note: "Permite peretelui să respire. Umiditatea se evaporă natural." },
      { label: "Durabilitate", value: "35+ ani", note: "Polimerizarea continuă în primii ani. Aderența crește de la 2,0 la 3,0 MPa." },
    ]},
  ];

  return (
    <ParallaxSection id="specificații" className="py-40 md:py-56" speed={0.18}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionTag>Specificații tehnice</SectionTag>

        <TextReveal
          text="Ce spun cifrele."
          className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-white mb-24 max-w-4xl"
          delay={0.1}
        />

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
    { num: "01", title: "Pregătire suprafață", desc: "Curățare, uscare, substrat stabil." },
    { num: "02", title: "Aplicare airless spray", desc: "Pulverizare uniformă — 0,5 mm per strat." },
    { num: "03", title: "Polimerizare", desc: "Membrană continuă în ore." },
  ];
  const surfaces = ["Beton", "Metal", "Lemn", "Cărămidă", "Tencuială", "Fibrociment"];

  return (
    <ParallaxSection id="aplicare" className="py-40 md:py-56" speed={0.12}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionTag>Proces de aplicare</SectionTag>

        <TextReveal
          text="Simplu. Rapid. Definitiv."
          className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-white mb-24 max-w-4xl"
          delay={0.1}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden mb-24">
          {steps.map((step, i) => (
            <FadeReveal key={step.num} delay={0.15 * i}>
              <motion.div
                className="bg-[#0A0A0A]/80 backdrop-blur-md p-10 md:p-14 group cursor-default hover:bg-white/[0.02] transition-colors duration-700"
                whileHover={{ y: -6 }}
              >
                <motion.span
                  className="text-[#FF4500]/20 font-display font-black text-7xl md:text-8xl block mb-6
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

        <FadeReveal delay={0.2}>
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-gray-500 mb-8">Se aplică pe</h3>
            <div className="flex flex-wrap gap-3">
              {surfaces.map((surface, si) => (
                <motion.span
                  key={surface}
                  className="px-5 py-2.5 rounded-full border border-white/[0.06] text-gray-400 font-sans text-sm
                             hover:border-[#FF4500]/30 hover:text-white transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + si * 0.06 }}
                >
                  {surface}
                </motion.span>
              ))}
            </div>
          </div>
        </FadeReveal>
      </div>
    </ParallaxSection>
  );
};

// ═══════════════════════════════════════════════════
// SECTION: Contact
// ═══════════════════════════════════════════════════
export const ContactSection = () => {
  const { themeProgress } = useScrollCtx();
  const textColor = useTransform(themeProgress, [0, 1], ['#FFFFFF', '#0A0A0A']);
  const subtextColor = useTransform(themeProgress, [0, 1], ['#9CA3AF', '#1A1A1A']);

  return (
    <ParallaxSection id="contact" className="pt-[220px] pb-20 md:py-56" speed={0.1}>
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <SectionTag delay={0}>Contact</SectionTag>

        <TextReveal
          text="Calcul termic personalizat în 48h."
          className="font-display font-black text-2xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] mb-4"
          style={{ color: textColor }}
          delay={0.1}
        />

        <FadeReveal delay={0.25}>
          <motion.p className="text-sm sm:text-lg font-sans font-light mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: subtextColor }}>
            Specificați tipul proiectului, suprafața estimată și locația. Echipa noastră vă va contacta cu o ofertă personalizată.
          </motion.p>
        </FadeReveal>

        <FadeReveal delay={0.35}>
          <a
            href="mailto:contact@nanorevolution.ro"
            className="group inline-flex items-center gap-3 px-5 py-2.5 sm:px-10 sm:py-5 bg-[#FF4500] text-white font-sans font-medium text-xs sm:text-base tracking-wide rounded-full
                       hover:shadow-[0_0_60px_rgba(255,69,0,0.4)] transition-all duration-500 hover:scale-105"
          >
            <span>Trimite proiectul</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </a>
        </FadeReveal>

        <FadeReveal delay={0.45}>
          <motion.p className="mt-20 font-sans text-sm" style={{ color: subtextColor }}>
            Nano Revolution SRL — Str. Ogorului, Nr 3, Oradea, Bihor 410554
          </motion.p>
        </FadeReveal>
      </div>
    </ParallaxSection>
  );
};

// ═══════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════
export const Footer = () => (
  <footer className="relative py-12 border-t border-white/[0.04]">
    <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center">
        <span className="text-white font-display font-bold text-lg">thermX</span>
        <span className="text-[#FF4500] text-xl leading-none font-bold ml-[1px]">.</span>
      </div>
      <span className="text-gray-600 font-sans text-xs">
        © {new Date().getFullYear()} Nano Revolution SRL. Toate drepturile rezervate.
      </span>
      <div className="flex items-center gap-6">
        <a href="#" className="text-gray-600 font-sans text-xs hover:text-white transition-colors">Fișă Tehnică</a>
        <a href="#" className="text-gray-600 font-sans text-xs hover:text-white transition-colors">Certificări</a>
      </div>
    </div>
  </footer>
);
