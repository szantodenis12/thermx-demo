export function IntroFeature() {
  return (
    <section className="py-32 md:py-64 px-6 md:px-24 bg-transparent relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center text-center mb-32 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-thermal-orange" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-thermal-orange">Evolution</span>
            <div className="w-8 h-[1px] bg-thermal-orange" />
          </div>
          <h2 className="text-display text-5xl md:text-9xl leading-none text-white">
            Schimbarea de <br /> <span className="text-white/20">Paradigmă.</span>
          </h2>
          <p className="text-white/40 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mt-6">
            Nu mai izolăm prin volum, ci prin inteligență moleculară. thermX transformă orice clădire într-un sistem termic eficient.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bento-item p-12 md:p-20 group transition-all duration-500">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Status_Quo</span>
              </div>
              <h3 className="text-display text-4xl md:text-6xl text-white/40 italic">Metoda <br /> Clasică.</h3>
              <p className="text-white/20 text-lg md:text-xl font-medium leading-relaxed">
                Izolații care absorb umiditatea, permit punți termice și își pierd eficiența structurală în timp.
              </p>
              <div className="pt-8 border-t border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/10 uppercase italic">Eficiență: 40-60%</span>
              </div>
            </div>
          </div>

          <div className="bento-item p-12 md:p-20 group transition-all duration-500 bg-white/[0.02]">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-insulation-blue" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-insulation-blue">New_Standard</span>
              </div>
              <h3 className="text-display text-4xl md:text-6xl text-white italic">Scut <br /> Nanoetic.</h3>
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                O barieră moleculară impenetrabilă, cu reflexie infraroșu și conductivitate minimă, garantată pe viață.
              </p>
              <div className="pt-8 border-t border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-insulation-blue uppercase italic">Eficiență: 99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

