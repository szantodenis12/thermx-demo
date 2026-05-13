"use client";

import { useState } from "react";
import { FadeUp } from "../ui/FadeUp";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Pregătire",
    description: "Curățare, uscare și asigurarea unui substrat stabil pentru aderență maximă.",
    details: [
      "Degresarea suprafeței și eliminarea resturilor de praf/ulei.",
      "Verificarea umidității suportului (max. 10%).",
      "Aplicare amorsă specifică pentru suprafețe neporoase.",
      "Protejarea zonelor ce nu necesită izolare."
    ]
  },
  {
    number: "02",
    title: "Aplicare",
    description: "Pulverizare uniformă - 0,5 mm per strat. Simplitate și viteză record.",
    details: [
      "Utilizarea echipamentului Airless (presiune 180-220 bari).",
      "Duză recomandată: 517 sau 519 pentru debit optim.",
      "Aplicare în straturi succesive de max. 0.5mm.",
      "Timp de uscare între straturi: 2-4 ore la 20°C."
    ]
  },
  {
    number: "03",
    title: "Polimerizare",
    description: "Formarea membranei nanoceramice continue în câteva ore de la aplicare.",
    details: [
      "Formare peliculă elastică rezistentă la microfisuri.",
      "Atingerea proprietăților termice de vârf după 24 de ore.",
      "Rezistență totală la UV și intemperii.",
      "Posibilitate de vopsire peste membrană."
    ]
  }
];

export const ApplicationProcess = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-32 md:py-64 px-4 bg-transparent overflow-hidden relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center mb-24 gap-6 text-center">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-thermal-orange" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-thermal-orange">Workflow</span>
          </div>
          <h2 className="text-display text-5xl md:text-9xl leading-none">
            Proces <span className="text-white/20">Rapid.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className="group cursor-pointer bento-item p-12 min-h-[400px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-display text-4xl text-white/10 group-hover:text-thermal-orange transition-colors duration-500">{step.number}</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-display text-3xl text-white italic">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeStep !== null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveStep(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[100] cursor-pointer"
              />
              <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 40 }}
                  className="w-full max-w-2xl bento-item p-10 md:p-16 pointer-events-auto bg-deep-space-dark border-white/10"
                >
                  <button 
                    onClick={() => setActiveStep(null)}
                    className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-thermal-orange hover:text-black transition-all duration-500 group"
                  >
                    <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6" /></svg>
                  </button>

                  <div className="relative z-10">
                    <span className="text-display text-6xl text-thermal-orange mb-8 block">{STEPS[activeStep].number}</span>
                    <h3 className="text-display text-5xl text-white mb-10 italic">{STEPS[activeStep].title}</h3>

                    <div className="grid gap-4">
                      {STEPS[activeStep].details.map((detail, dIdx) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (dIdx * 0.1) }}
                          key={dIdx} 
                          className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/5"
                        >
                           <div className="w-1.5 h-1.5 rounded-full bg-thermal-orange" />
                           <p className="text-white/70 text-lg leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        <div className="mt-24 flex justify-center">
            <div className="inline-flex items-center gap-6 px-10 py-5 rounded-full bento-item bg-white/[0.02]">
               <div className="relative">
                 <div className="w-3 h-3 rounded-full bg-insulation-blue animate-ping absolute inset-0" />
                 <div className="w-3 h-3 rounded-full bg-insulation-blue relative" />
               </div>
               <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">Randament: Până la 500m² / zi / echipă</span>
            </div>
        </div>
      </div>
    </section>
  );
};


