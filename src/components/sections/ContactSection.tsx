import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to send email');
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error('Email submission error:', error);
      alert('A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou sau să ne contactezi direct.');
      setStatus("idle");
    }
  };

  return (
    <section className="py-32 md:py-64 px-6 md:px-24 bg-transparent relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-24">
          
          <div className="lg:col-span-12 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-thermal-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-thermal-orange">Connection</span>
            </div>
            <h2 className="text-display text-5xl md:text-9xl leading-none text-white max-w-4xl">
              Hai să <br /> <span className="text-white/20">Construim.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <p className="text-white/40 text-xl font-medium leading-relaxed max-w-md">
              Echipă dedicată pentru consultanță tehnică, măsurători și execuție profesională.
            </p>

            <div className="space-y-8 pt-8">
              {[
                { label: "Direct", value: "contact@thermx.ro" },
                { label: "Support", value: "+40 766 525 918" },
                { label: "Studio", value: "București, România" }
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">{item.label}</span>
                  <span className="text-display text-3xl text-white italic">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bento-item p-8 md:p-16 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-20"
                  >
                    <div className="w-24 h-24 rounded-full bg-insulation-blue/10 flex items-center justify-center mb-10 border border-insulation-blue/20">
                      <svg className="w-10 h-10 text-insulation-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-display text-4xl text-white mb-4 italic">Mesaj Trimis.</h3>
                    <p className="text-white/40 font-medium">Revenim cu diagnosticul tehnic în 24h.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 italic ml-4">Nume</label>
                        <input 
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your Name"
                          className="w-full bg-white/[0.02] border border-white/5 rounded-full px-8 py-5 text-white outline-none focus:border-thermal-orange transition-all duration-500 font-medium placeholder:text-white/10"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 italic ml-4">Email</label>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="hello@world.com"
                          className="w-full bg-white/[0.02] border border-white/5 rounded-full px-8 py-5 text-white outline-none focus:border-thermal-orange transition-all duration-500 font-medium placeholder:text-white/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20 italic ml-4">Mesaj</label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Project details..."
                        className="w-full bg-white/[0.02] border border-white/5 rounded-[40px] px-8 py-8 text-white outline-none focus:border-thermal-orange transition-all duration-500 font-medium placeholder:text-white/10 resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] py-6 rounded-full hover:bg-thermal-orange hover:text-white transition-all duration-500 disabled:opacity-50 overflow-hidden relative group"
                    >
                      <span className="relative z-10">{status === "submitting" ? "Protocoling..." : "Initializare Contact"}</span>
                      <div className="absolute inset-0 bg-white group-hover:bg-thermal-orange transition-colors" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

