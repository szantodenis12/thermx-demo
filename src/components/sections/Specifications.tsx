import { Counter } from "../ui/Counter";

export function Specifications() {
  return (
    <section className="relative min-h-[80vh] bg-transparent py-32 md:py-64 px-4 md:px-24 z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Analytics</span>
            <div className="w-8 h-[1px] bg-white/20" />
          </div>
          <h2 className="text-display text-5xl md:text-9xl leading-none tracking-[-0.05em]">
            Cifre <span className="text-white/20">Atestate.</span>
          </h2>
          <p className="text-sm md:text-lg text-white/40 max-w-xl font-medium leading-relaxed">
            Performanță verificată în laborator și în condiții industriale dure. Fără compromisuri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[40px] overflow-hidden">
          
          <div className="bg-deep-space-dark/80 backdrop-blur-xl p-12 flex flex-col gap-8 hover:bg-white/[0.03] transition-colors duration-500">
            <div className="text-6xl font-black text-thermal-orange tracking-tighter font-sans lowercase">
              <Counter value={0.001} decimals={3} delay={0.3} />
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">Lambda W/(m·K)</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Conductivitate termică formidabilă oferită de matricea nanoceramică.
              </p>
            </div>
          </div>

          <div className="bg-deep-space-dark/80 backdrop-blur-xl p-12 flex flex-col gap-8 hover:bg-white/[0.03] transition-colors duration-500">
            <div className="text-6xl font-black text-white tracking-tighter font-sans">
              <Counter value={1.84} decimals={2} delay={0.4} />
              <span className="text-2xl text-white/20 ml-1">MPa</span>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">Aderență Structurală</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                De peste 7 ori minimul cerut standard. Nu necesită prinderi mecanice.
              </p>
            </div>
          </div>

          <div className="bg-deep-space-dark/80 backdrop-blur-xl p-12 flex flex-col gap-8 hover:bg-white/[0.03] transition-colors duration-500">
            <div className="text-6xl font-black text-white tracking-tighter font-sans">
              <Counter value={260} suffix="°C" delay={0.5} />
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">Interval Termic</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Rezistență absolută. Izolația clasică crapă la -20°C și degradează peste 80°C.
              </p>
            </div>
          </div>

          <div className="bg-deep-space-dark/80 backdrop-blur-xl p-12 flex flex-col gap-8 hover:bg-white/[0.03] transition-colors duration-500">
            <div className="text-6xl font-black text-thermal-orange tracking-tighter font-sans">
              <Counter value={35} suffix="+" delay={0.7} />
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">Ani Durabilitate</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Polimerizarea continuă în timp crește rezistența mecanică stabilă.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

