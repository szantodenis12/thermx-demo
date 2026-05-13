import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-32 px-6 md:px-24 bg-transparent border-t border-white/5 relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-24">
          
          <div className="space-y-12 max-w-xl">
             <div className="space-y-6">
                <h3 className="text-display text-4xl text-white">therm<span className="text-thermal-orange">X</span></h3>
                <p className="text-white/40 text-lg font-medium leading-relaxed">
                  Revoluționăm izolarea termică prin tehnologia moleculară. <br />
                  Aplicat o singură dată, protejat pentru totdeauna.
                </p>
             </div>
             
             <div className="flex gap-12">
               {[
                 { label: "Instagram", href: "#" },
                 { label: "LinkedIn", href: "#" },
                 { label: "Twitter", href: "#" }
               ].map((social) => (
                 <a 
                   key={social.label} 
                   href={social.href}
                   className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-thermal-orange transition-colors duration-500 italic"
                 >
                   {social.label}
                 </a>
               ))}
             </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-12 text-right">
             <div className="flex flex-col md:flex-row gap-12 text-[10px] font-black uppercase tracking-widest text-white/20">
                <a href="#" className="hover:text-white transition-colors duration-500 italic">Privacy_Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-500 italic">Terms_of_Service</a>
                <a href="#" className="hover:text-white transition-colors duration-500 italic">Technical_DTS</a>
             </div>
             
             <div className="space-y-2">
                <p className="text-display text-xl text-white/10 uppercase">extreme_performance</p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/5 italic">
                  © {currentYear} THERMX TECHNOLOGY. ALL RIGHTS RESERVED.
                </p>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

