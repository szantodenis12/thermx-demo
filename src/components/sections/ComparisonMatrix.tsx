import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ComparisonData {
  parameter: string;
  thermx: string;
  eps: string;
  wool: string;
  highlight?: boolean;
}

interface CategoryData {
  id: string;
  label: string;
  rows: ComparisonData[];
}

const comparisonData: CategoryData[] = [
  {
    id: "residential",
    label: "Rezidențial",
    rows: [
      { parameter: "Grosime aplicată", thermx: "0,5 - 1 mm", eps: "8 - 10 cm", wool: "10 - 15 cm", highlight: true },
      { parameter: "Greutate / m²", thermx: "0,4 kg", eps: "1,5 - 3 kg", wool: "5 - 8 kg", highlight: true },
      { parameter: "Punți termice", thermx: "Eliminate", eps: "Existente", wool: "Moderate" },
      { parameter: "Necesită schelă", thermx: "Nu", eps: "Da", wool: "Da" },
      { parameter: "Timp montaj", thermx: "Ore", eps: "Săptămâni", wool: "Zile" },
      { parameter: "Durabilitate", thermx: "35+ ani", eps: "10 - 15 ani", wool: "15 - 25 ani" },
    ]
  },
  {
    id: "industrial",
    label: "Industrial",
    rows: [
      { parameter: "Grosime", thermx: "1 - 2 mm", eps: "N/A", wool: "15 - 20 cm", highlight: true },
      { parameter: "Rezistență temp.", thermx: "+250°C", eps: "> 80°C", wool: "400°C+", highlight: true },
      { parameter: "Aderentă", thermx: "Chimică", eps: "Adeziv", wool: "Mecanică" },
      { parameter: "Coroziune", thermx: "Inhibată", eps: "Neutru", wool: "Risc CUI" },
      { parameter: "Zone dificile", thermx: "Acces Total", eps: "Imposibil", wool: "Dificil" },
    ]
  }
];

export const ComparisonMatrix = () => {
  const [activeTab, setActiveTab] = useState(comparisonData[0].id);
  const activeData = comparisonData.find((d) => d.id === activeTab)!;

  return (
    <section className="py-32 md:py-64 px-6 md:px-24 bg-transparent relative z-20">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex flex-col items-center text-center mb-24 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-thermal-orange" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-thermal-orange">Comparison</span>
            <div className="w-8 h-[1px] bg-thermal-orange" />
          </div>
          <h2 className="text-display text-5xl md:text-9xl leading-none text-white">
            Eficiență <span className="text-white/20">Radicală.</span>
          </h2>
        </div>

        <div className="flex justify-center gap-4 mb-16">
          {comparisonData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${
                activeTab === cat.id
                  ? "bg-thermal-orange text-black border-thermal-orange"
                  : "bg-white/[0.02] text-white/40 border-white/10 hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bento-item p-1 md:p-12 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-white/20">Metrică Control</th>
                  <th className="py-8 px-6 text-display text-2xl text-thermal-orange italic">thermX System</th>
                  <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-white/20 italic">Sistem EPS/XPS</th>
                  <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-white/20 italic">Vată Minerală</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                <AnimatePresence mode="wait">
                  {activeData.rows.map((row, idx) => (
                    <motion.tr
                      key={`${activeTab}-${row.parameter}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group"
                    >
                      <td className="py-8 px-6 text-white/40 font-medium text-sm">{row.parameter}</td>
                      <td className="py-8 px-6">
                        <span className={`text-display text-xl md:text-3xl ${row.highlight ? "text-white italic" : "text-white/80"}`}>
                          {row.thermx}
                        </span>
                      </td>
                      <td className="py-8 px-6 text-white/20 text-sm font-medium">{row.eps}</td>
                      <td className="py-8 px-6 text-white/20 text-sm font-medium">{row.wool}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 italic">
              * Analiză bazată pe teste standardizate și fișe tehnice oficiale (TDS).
            </p>
        </div>
      </div>
    </section>
  );
};

