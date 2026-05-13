import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Counter } from "../ui/Counter";

interface MaterialProps {
  name: string;
  range: string;
  value: number;
  isPremium?: boolean;
  delay?: number;
}

const MaterialRow = ({ name, range, value, isPremium, delay = 0 }: MaterialProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <div ref={ref} className="group py-8 first:pt-0 last:pb-0 border-b last:border-0 border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isPremium ? "text-thermal-orange" : "text-white/20"}`}>
            {isPremium ? "Nanotechnology_v2.0" : "Traditional_System"}
          </span>
          <h3 className={`text-display text-2xl md:text-4xl ${isPremium ? "text-white" : "text-white/40"}`}>
            {name}
          </h3>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <div className={`text-display text-3xl md:text-5xl tabular-nums ${isPremium ? "text-thermal-orange" : "text-white/20"}`}>
            {isPremium ? (
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl text-thermal-orange/40">≤</span>
                <Counter value={0.001} decimals={3} />
              </div>
            ) : (
              range
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">W/(m·K)</span>
        </div>
      </div>

      <div className="relative h-2 w-full bg-white/[0.03] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay }}
          className={`h-full relative rounded-full ${
            isPremium 
              ? "bg-thermal-orange shadow-[0_0_20px_rgba(255,69,0,0.5)]" 
              : "bg-white/10"
          }`}
        />
      </div>
    </div>
  );
};

export function LambdaComparison() {
  const materials = [
    { name: "Vată Bazaltică", range: "0.035 - 0.045", value: 95 },
    { name: "EPS 80 (Polistiren)", range: "0.035 - 0.040", value: 85 },
    { name: "PIR / PUR (Poliuretan)", range: "0.022 - 0.028", value: 65 },
    { name: "thermX Nanoceramic", range: "≤ 0.001", value: 8, isPremium: true },
  ];

  return (
    <section className="py-32 md:py-64 px-6 md:px-24 bg-transparent relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          
          <div className="lg:col-span-4 space-y-12">
            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-[1px] bg-thermal-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-thermal-orange">Benchmark</span>
            </div>
            <h2 className="text-display text-5xl md:text-8xl leading-[0.85] text-white">
              Analiza <br /> <span className="text-white/20">Lambda.</span>
            </h2>
            <p className="text-white/40 text-lg font-medium leading-relaxed max-w-sm">
              Lambda măsoară cât de ușor trece căldura printr-un material. Cu cât valoarea e mai mică, cu atât materialul izolează mai bine.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-white/40">
              Standard: EN 12667
            </div>
          </div>

          <div className="lg:col-span-8 bento-item p-12 md:p-20">
            <div className="space-y-4">
              {materials.map((m, i) => (
                <MaterialRow key={m.name} {...m} delay={i * 0.15} />
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 italic leading-relaxed">
                * thermX este echivalent - combină conducția redusă prin microsfere cu reflexia de 85% a IR.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

