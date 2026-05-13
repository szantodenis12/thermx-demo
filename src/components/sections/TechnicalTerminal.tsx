import { motion } from "framer-motion";

const CERTS = [
  {
    tag: "ISO_9001",
    title: "Management Calitate",
    desc: "Producție certificată ISO 9001 - control riguros al calității la fiecare lot fabricat."
  },
  {
    tag: "CE_EN_15824",
    title: "Conformitate UE",
    desc: "Marcaj CE conform EN 15824 - utilizare legală în orice stat membru UE."
  },
  {
    tag: "ASTM_C177",
    title: "American Standards",
    desc: "Teste de conductivitate termică și aderență conform standardelor internaționale."
  }
];

export const TechnicalTerminal = () => {
  return (
    <section className="py-32 md:py-64 px-6 md:px-24 bg-transparent relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          
          <div className="lg:col-span-12 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-insulation-blue" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-insulation-blue">Technical_Hub</span>
            </div>
            <h2 className="text-display text-5xl md:text-9xl leading-none text-white max-w-4xl">
              Validare <br /> <span className="text-white/20">Structurală.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {[
              { title: "Suport Tehnic", desc: "Inginer de proiect alocat pentru consultanță pe specificații și detalii de execuție." },
              { title: "Training Echipă", desc: "Training practic pentru execuție: echipament airless, tehnici de pulverizare și mentenanță." },
              { title: "Portal Arhitecți", desc: "Acces la librăria de detalii CAD și specificații de proiectare pentru integrare rapidă." }
            ].map((item, idx) => (
              <div key={idx} className="bento-item p-10 group transition-all duration-500">
                <div className="space-y-4">
                  <h4 className="text-display text-3xl text-white italic">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid md:grid-cols-1 gap-4">
              {CERTS.map((cert) => (
                <div key={cert.tag} className="bento-item p-12 group cursor-default flex flex-col md:flex-row gap-12 items-start md:items-center">
                  <div className="text-display text-4xl text-white/5 group-hover:text-insulation-blue transition-colors duration-500 shrink-0">
                    {cert.tag}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-display text-2xl text-white italic">{cert.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-medium">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bento-item p-12 bg-white/[0.02] border border-white/10 group cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-insulation-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="space-y-4">
                  <h3 className="text-display text-4xl text-white italic">Fișe Tehnice</h3>
                  <p className="text-white/40 text-sm font-medium">Agremente și Certificate de Performanță PDF.</p>
                </div>
                <button className="px-12 py-5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-insulation-blue hover:text-white transition-all duration-500 flex items-center gap-4">
                  Descarcă Arhivă
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

