import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Check, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    telefon: '',
    mesaj: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nume,
          email: formData.email,
          phone: formData.telefon,
          message: formData.mesaj,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to send email');
      }

      setIsSuccess(true);
      setFormData({ nume: '', email: '', telefon: '', mesaj: '' });
    } catch (error) {
      console.error('Email submission error:', error);
      alert('A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou sau să ne contactezi direct.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-6 overflow-y-auto scrollbar-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0 cursor-default" onClick={handleClose} />

          <motion.div
            className="relative w-full max-w-2xl min-h-screen sm:min-h-0 sm:h-auto bg-[#0A0A0A] border-0 sm:border border-white/[0.08] sm:rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-10 md:p-12 text-white font-sans flex flex-col justify-between z-10"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/[0.05] bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 z-20"
              aria-label="Închide formularul"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col h-full justify-center"
                >
                  {/* Contact Info Header */}
                  <div className="text-center text-xs sm:text-sm text-gray-400 font-light leading-relaxed border-b border-white/[0.08] pb-6 mb-8 pt-8 sm:pt-0">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 mb-2 font-medium">
                      <a href="tel:+40771445577" className="flex items-center gap-2 hover:text-[#FF4500] transition-colors">
                        <Phone className="w-3.5 h-3.5 text-[#FF4500]" />
                        <span>Mobil: +40 771 445 577</span>
                      </a>
                      <span className="hidden sm:inline text-white/20">•</span>
                      <a href="mailto:contact@nanorevolution.ro" className="flex items-center gap-2 hover:text-[#FF4500] transition-colors">
                        <Mail className="w-3.5 h-3.5 text-[#FF4500]" />
                        <span>E-mail: contact@nanorevolution.ro</span>
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 px-4">
                      <MapPin className="w-3.5 h-3.5 text-[#FF4500] flex-shrink-0" />
                      <span>Mun. Oradea, Str. Ogorului, Nr. 3, jud. Bihor, România</span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    {/* Nume */}
                    <div className="flex flex-col">
                      <label className="text-white font-display font-medium text-sm sm:text-base mb-1">Nume</label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="Numele tău"
                        value={formData.nume}
                        onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
                        className="bg-transparent border-0 border-b border-white/10 py-2.5 text-sm sm:text-base text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#FF4500] transition-colors font-light disabled:opacity-50"
                      />
                    </div>

                    {/* E-mail */}
                    <div className="flex flex-col">
                      <label className="text-white font-display font-medium text-sm sm:text-base mb-1">E-mail</label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        placeholder="Adresa ta de email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-transparent border-0 border-b border-white/10 py-2.5 text-sm sm:text-base text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#FF4500] transition-colors font-light disabled:opacity-50"
                      />
                    </div>

                    {/* Telefon */}
                    <div className="flex flex-col">
                      <label className="text-white font-display font-medium text-sm sm:text-base mb-1">Telefon</label>
                      <input
                        type="tel"
                        required
                        disabled={isSubmitting}
                        placeholder="Număr tău de telefon"
                        value={formData.telefon}
                        onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                        className="bg-transparent border-0 border-b border-white/10 py-2.5 text-sm sm:text-base text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#FF4500] transition-colors font-light disabled:opacity-50"
                      />
                    </div>

                    {/* Mesaj */}
                    <div className="flex flex-col">
                      <label className="text-white font-display font-medium text-sm sm:text-base mb-1">Mesaj</label>
                      <textarea
                        required
                        rows={3}
                        disabled={isSubmitting}
                        placeholder="Mesajul tău"
                        value={formData.mesaj}
                        onChange={(e) => setFormData({ ...formData, mesaj: e.target.value })}
                        className="bg-transparent border-0 border-b border-white/10 py-2.5 text-sm sm:text-base text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#FF4500] transition-colors font-light resize-none scrollbar-none disabled:opacity-50"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative flex items-center justify-center gap-3 py-4 sm:py-5 bg-[#FF4500] text-white font-display font-bold text-sm tracking-wide rounded-full overflow-hidden
                                   hover:shadow-[0_0_55px_rgba(255,69,0,0.45)] transition-all duration-500 hover:scale-[1.02] disabled:opacity-75 disabled:pointer-events-none"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Se trimite...</span>
                          </>
                        ) : (
                          <>
                            <span>Trimite mesajul</span>
                            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-16 sm:py-24"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-4">
                    Mesaj trimis cu succes!
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base font-light max-w-md mx-auto leading-relaxed mb-10">
                    Îți mulțumim! Datele tale au fost înregistrate, iar echipa thermX te va contacta în cel mai scurt timp pentru recomandări sau calcul tehnic.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3.5 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Închide fereastra
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
