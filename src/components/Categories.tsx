import { motion } from 'framer-motion';
import { Home, HardHat, Ruler, Factory, ArrowLeft, CheckCircle2, AlertTriangle, Zap, Shield, Sparkles } from 'lucide-react';

// ═══════════════════════════════════════════════════
// CATEGORIES SECTION (Buttons to Landing Pages)
// ═══════════════════════════════════════════════════
export const CategoriesSection = ({ onSelect }: { onSelect?: (category: string) => void }) => {
  const categories = [
    {
      id: 'proprietari',
      title: 'Proprietari',
      subtitle: 'Persoane Fizice',
      icon: Home,
      description: 'Economii masive la facturi și confort sporit pentru casa ta. Soluția ideală pentru spații moderne.',
      color: 'from-[#FF4500] to-[#FF4500]',
    },
    {
      id: 'constructori',
      title: 'Constructori',
      subtitle: 'Echipe de Execuție',
      icon: HardHat,
      description: 'Viteză extremă de aplicare și costuri reduse pe șantier. Eficiență maximă în execuție.',
      color: 'from-[#FF4500] to-[#FF4500]',
    },
    {
      id: 'arhitecti',
      title: 'Arhitecți',
      subtitle: 'Proiectanți & Ingineri',
      icon: Ruler,
      description: 'Conformitate nZEB și integrare BIM facilă în proiecte. Libertate totală de design.',
      color: 'from-[#FF4500] to-[#FF4500]',
    },
    {
      id: 'industrial',
      title: 'Industrial',
      subtitle: 'Sectorul B2B',
      icon: Factory,
      description: 'Performanță extremă pentru conducte, rezervoare și echipamente în medii dure.',
      color: 'from-[#FF4500] to-[#FF4500]',
    },
  ];

  const handleSelect = (id: string) => {
    window.location.hash = id;
    if (onSelect) onSelect(id);
  };

  return (
    <section className="py-40 md:py-56 relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <span className="text-[#FF4500] uppercase tracking-[0.3em] text-[11px] font-sans font-semibold block mb-6 text-center">
          Aplicații Specifice
        </span>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-center text-white mb-6 tracking-[-0.03em]">
          Alege categoria care te interesează
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-3xl mx-auto mb-20 font-sans font-light">
          Informațiile de care ai nevoie, structurate special pentru profilul tău. Descoperă cum thermX revoluționează domeniul tău prin tehnologia nanoceramică.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="group relative h-[350px] rounded-3xl overflow-hidden cursor-pointer border border-white/[0.08] bg-white/[0.05] backdrop-blur-md hover:border-white/[0.15] transition-all duration-500"
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px -15px rgba(255, 69, 0, 0.3)'
              }}
              onClick={() => handleSelect(cat.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color} opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
              
              <div className="relative h-full p-8 flex flex-col justify-between z-10">
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-500 font-sans text-xs uppercase tracking-wider block mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-white font-display font-bold text-2xl mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center text-white text-sm font-medium opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Vezi detalii dedicate</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════
// LANDING PAGE COMPONENT (ULTRA DETAILED)
// ═══════════════════════════════════════════════════
export const LandingPage = ({ category, onBack }: { category: string; onBack: () => void }) => {
  const handleBack = () => {
    window.location.hash = '';
    onBack();
  };

  const content: Record<string, {
    title: string;
    subtitle: string;
    intro: string;
    problem: { title: string; desc: string };
    solution: { title: string; desc: string };
    detailedFeatures: { title: string; desc: string; icon: any }[];
    technicalSpecs: { label: string; value: string; note: string }[];
    faq: { q: string; a: string }[];
  }> = {
    proprietari: {
      title: 'Pentru Proprietari',
      subtitle: 'Persoane Fizice & Rezidențial',
      intro: 'Transformă-ți casa într-un etalon de eficiență energetică. Tehnologia nanoceramică thermX oferă performanțe de top fără a compromite spațiul util sau estetica locuinței tale.',
      problem: {
        title: 'Problema Izolației Clasice',
        desc: 'Sistemele tradiționale (polistiren, vată) sunt voluminoase, reducând semnificativ spațiul util (mai ales la interior). În plus, acestea ignoră radiația infraroșie (responsabilă pentru 40% din pierderi) și permit formarea punților termice la îmbinări, favorizând apariția mucegaiului.'
      },
      solution: {
        title: 'Soluția thermX',
        desc: 'O membrană continuă de doar 1 mm care blochează toate cele trei forme de transfer termic. Reflectă 85% din radiația căldurii înapoi în casă iarna și afară vara, oferind un climat perfect și facturi reduse substanțial.'
      },
      detailedFeatures: [
        {
          icon: Zap,
          title: 'Facturi reduse cu până la 40%',
          desc: 'Spre deosebire de EPS care doar încetinește conducția, thermX acționează ca o oglindă termică. Reflectă radiația infraroșie în proporție de 85%. Economiile sunt demonstrate pe proiecte reale, unde proprietarii au raportat scăderi masive ale costurilor de climatizare.'
        },
        {
          icon: Sparkles,
          title: 'Câștig de spațiu util real',
          desc: 'La o grosime aplicată de doar 1 mm (față de 10-15 cm de polistiren), diferența pe un apartament standard de 70 m² se traduce în 2-3 m² de suprafață utilă câștigată. Este soluția ideală pentru izolarea pe interior a apartamentelor sau a mansardelor.'
        },
        {
          icon: Shield,
          title: 'Adio Condens și Mucegai',
          desc: 'Mucegaiul se dezvoltă acolo unde aerul cald întâlnește o suprafață rece (punctul de rouă). thermX ridică temperatura la suprafața peretelui interior cu câteva grade, eliminând fizic posibilitatea de condens. În plus, compoziția sa polimerică nu permite dezvoltarea fungilor.'
        },
        {
          icon: Shield,
          title: 'Siguranță Absolută la Foc',
          desc: 'Spre deosebire de polistirenul care arde violent și degajă fum toxic, membrana thermX uscată este clasificată în Clasa A de reacție la foc. Este un material necombustibil care nu picură și nu întreține arderea, oferind siguranță familiei tale.'
        }
      ],
      technicalSpecs: [
        { label: 'Reflexie IR', value: '85%', note: 'Reflectă căldura înapoi în locuință.' },
        { label: 'Grosime strat', value: '0.5 - 1 mm', note: 'Nu încarcă pereții, nu reduce spațiul.' },
        { label: 'Durabilitate', value: '35+ ani', note: 'Nu se tasează și nu se macină în timp.' },
        { label: 'Permeabilitate', value: 'Mare', note: 'Lasă peretele să respire, elimină vaporii.' }
      ],
      faq: [
        { q: 'Se poate aplica pe interior?', a: 'Da, este absolut sigură pentru interior. Nu degajă compuși organici volatili (COV) după uscare și este ideală pentru apartamente unde nu se poate izola exteriorul.' },
        { q: 'Cât durează aplicarea?', a: 'Pentru o casă medie, procesul durează între 2 și 4 zile, incluzând pregătirea suprafeței. Se usucă rapid.' }
      ]
    },
    constructori: {
      title: 'Pentru Constructori',
      subtitle: 'Echipe de Execuție & Dezvoltatori',
      intro: 'Maximizează profitabilitatea proiectelor tale și redu timpii de execuție pe șantier. thermX elimină etapele grele ale termosistemelor clasice.',
      problem: {
        title: 'Gâtuirile din Șantier',
        desc: 'Montarea polistirenului cere schele masive, dibluire mecanică, profile de pornire, plasă de armare și timp îndelungat de uscare a adezivilor. Toate acestea cresc costul cu manopera și blochează șantierul săptămâni întregi.'
      },
      solution: {
        title: 'Eficiență prin Pulverizare',
        desc: 'thermX se aplică mecanizat, prin pulverizare airless. O singură echipă de 2 oameni poate acoperi suprafețe pe care o echipă clasică le-ar termina în zece zile. Fără praf, fără deșeuri de polistiren pe șantier.'
      },
      detailedFeatures: [
        {
          icon: Zap,
          title: 'Viteză de execuție cu 80% mai mare',
          desc: 'Un operator cu o pompă airless poate aplica până la 50-100 m² de membrană pe zi. O casă întreagă se izolează în câteva zile. Scapi de închirierea prelungită a schelelor și de blocajele cauzate de vreme.'
        },
        {
          icon: Sparkles,
          title: 'Reducerea costurilor totale cu 30%',
          desc: 'Elimini din deviz: diblurile, profilele de colț, masa de șpaclu, plasa de fibră și transportul voluminoaselor baloturi de polistiren. Manopera redusă și eliminarea accesoriilor compensează costul materialului, oferind un profit mai bun.'
        },
        {
          icon: Shield,
          title: 'Aderență structurală extremă',
          desc: 'Membrana atinge o aderență la smulgere de 1.84 MPa. Aceasta înseamnă că face corp comun cu suportul (beton, cărămidă, lemn, metal). Nu există riscul desprinderii în timp din cauza vântului sau a greutății proprii.'
        },
        {
          icon: Shield,
          title: 'Fără fisuri datorate elasticității',
          desc: 'Clădirile noi se așează și lucrează în timp. thermX are o elongație la rupere de peste 12%, ceea ce înseamnă că preia micro-fisiurile tencuielii fără a se crăpa sau exfolia, păstrând fațada intactă ani de zile.'
        }
      ],
      technicalSpecs: [
        { label: 'Aderență', value: '1.84 MPa', note: 'De 7 ori peste standardul industrial.' },
        { label: 'Elongație', value: '>12%', note: 'Flexibilitate excelentă la mișcări.' },
        { label: 'Timp uscare', value: '2-4 ore', note: 'La temperatură ambientală de 20°C.' },
        { label: 'Consum', value: '~1 l/m²', note: 'Pentru un strat complet de 1 mm.' }
      ],
      faq: [
        { q: 'Ce echipament este necesar?', a: 'Se utilizează pompe airless profesionale capabile să debiteze materiale vâscoase. Oferim consultanță pentru setarea corectă a duzelor și presiunii.' },
        { q: 'Se poate aplica iarna?', a: 'Temperatura suportului și a aerului trebuie să fie de minimum +5°C pe durata aplicării și uscării.' }
      ]
    },
    arhitecti: {
      title: 'Pentru Arhitecți',
      subtitle: 'Proiectanți, Urbanisști & Auditori',
      intro: 'Proiectează fără limite geometrice. thermX îți oferă libertatea de a păstra liniile curate ale designului, asigurând în același timp conformitatea cu standardele nZEB.',
      problem: {
        title: 'Limitările Geometrice ale EPS',
        desc: 'Izolarea consolelor, a balcoanelor, a stâlpilor rotunzi sau a detaliilor de cornișă cu plăci rigide este un coșmar tehnic. Rezultă adesea punți termice masive sau modificări inestetice ale proporțiilor arhitecturale dorite.'
      },
      solution: {
        title: 'Membrana care urmărește Forma',
        desc: 'Fiind un material lichid care se polimerizează la fața locului, thermX îmbracă perfect orice geometrie. Poți proiecta fațade complexe, arcade sau detalii minimaliste, știind că izolarea va fi continuă și perfect etanșă.'
      },
      detailedFeatures: [
        {
          icon: Zap,
          title: 'Conformitate nZEB simplificată',
          desc: 'Standardul nZEB impune criterii stricte privind punțile termice. thermX având un lambda echivalent infim de 0.001 W/mK și continuitate perfectă, reduce pierderile prin nodurile structurale la zero, facilitând obținerea clasei energetice A+.'
        },
        {
          icon: Sparkles,
          title: 'Integrare nativă în BIM (Revit)',
          desc: 'Punem la dispoziție obiecte BIM complete (formate .rfa și IFC) care conțin toate proprietățile fizice și termice ale materialului. Le poți introduce direct în calculele tale de analiză energetică a clădirii.'
        },
        {
          icon: Shield,
          title: 'Păstrarea detaliilor de patrimoniu',
          desc: 'La clădirile istorice sau cu fațade protejate, aplicarea a 10 cm de polistiren distruge decorațiunile. thermX se poate aplica pe interior sau în straturi fine pe exterior, păstrând intactă volumetria și decorațiunile originale.'
        },
        {
          icon: Shield,
          title: 'Documentație și Caiete de Sarcini',
          desc: 'Livrăm pachete complete pentru proiectare: specificații tip gata de inserat în caietul de sarcini, rapoarte de testare acreditate, detalii de execuție CAD și suport tehnic dedicat pe parcursul proiectării.'
        }
      ],
      technicalSpecs: [
        { label: 'Lambda Echiv.', value: '0.001 W/mK', note: 'Datorită reflexiei masive a radiației.' },
        { label: 'Standarde', value: 'EN 15824', note: 'Agrementat la nivel european.' },
        { label: 'BIM Ready', value: 'Da', note: 'Fișiere disponibile la cerere.' },
        { label: 'Garanție Proiect', value: '20 ani', note: 'Asigurată direct de producător.' }
      ],
      faq: [
        { q: 'Cum se calculează rezistența termică (R)?', a: 'În cazul thermX, calculul clasic R = d/lambda nu reflectă realitatea fizică, deoarece materialul oprește radiația, nu doar conductia. Se utilizează coeficienți echivalenți validați prin teste dinamice.' },
        { q: 'Există detalii de execuție tip?', a: 'Da, oferim fișiere DWG/PDF cu detalii pentru glafuri, atice, socluri și joncțiuni planșeu.' }
      ]
    },
    industrial: {
      title: 'Sectorul Industrial',
      subtitle: 'Instalații, Rezervoare & Conducte',
      intro: 'Protecție termică extremă și controlul coroziunii pentru infrastructura industrială. thermX rezistă acolo unde materialele clasice eșuează rapid.',
      problem: {
        title: 'Coroziunea sub Izolație (CUI)',
        desc: 'Vata minerală folosită pe conductele industriale absoarbe umezeala din atmosferă. Aceasta rămâne blocată la suprafața metalului cald, provocând o coroziune accelerată și extrem de periculoasă (CUI), invizibilă din exterior până la cedare.'
      },
      solution: {
        title: 'Barieră Impermeabilă și Termică',
        desc: 'thermX se aplică direct pe metalul grunduit, formând o membrană hidrofobă perfect aderentă. Nu există spațiu între izolație și țeavă unde să se acumuleze condensul. În plus, rezistă la temperaturi de până la +260°C.'
      },
      detailedFeatures: [
        {
          icon: Zap,
          title: 'Interval de operare: -60°C ... +260°C',
          desc: 'Materialul își păstrează proprietățile elastice și izolatoare atât în aplicații criogenice (evită formarea gheții), cât și pe conducte de abur supraîncălzit sau în procese petrochimice de temperatură înaltă.'
        },
        {
          icon: Sparkles,
          title: 'Izolarea echipamentelor complexe',
          desc: 'Vanele, flanșele, robineții și reductoarele au forme neregulate greu de izolat cu cochilii. thermX se pulverizează uniform pe orice geometrie, asigurând o izolare continuă și reducând riscul de arsuri accidentale pentru operatori.'
        },
        {
          icon: Shield,
          title: 'Rezistență chimică și la UV',
          desc: 'Membrana este stabilă în prezența majorității vaporilor acizi sau bazici din atmosferele industriale și are o rezistență excelentă la radiațiile ultraviolete, nefiind necesară protejarea ei cu tablă (manta).'
        },
        {
          icon: Shield,
          title: 'Reducerea masivă a greutății pe structură',
          desc: 'La o grosime de 1-2 mm, greutatea adăugată pe conducte sau rezervoare este infimă comparativ cu sistemele clasice cu vată și tablă. Reduce stresul mecanic pe suporți și structurile de susținere.'
        }
      ],
      technicalSpecs: [
        { label: 'Temp. Maximă', value: '+260°C', note: 'Rezistă la vârfuri de temperatură.' },
        { label: 'Temp. Minimă', value: '-60°C', note: 'Ideală pentru criogenie și frig.' },
        { label: 'Aderență Metal', value: 'Excelentă', note: 'Previne pătrunderea apei la suport.' },
        { label: 'Rezistență UV', value: 'Totală', note: 'Nu necesită carcasă de protecție.' }
      ],
      faq: [
        { q: 'Cum se comportă la dilatări termice?', a: 'Datorită elongației mari, membrana urmărește dilatările și contractările conductelor de oțel fără să se crape sau să se desprindă.' },
        { q: 'Se poate aplica pe echipamente în funcțiune?', a: 'Pentru rezultate optime, aplicarea se face pe suprafețe cu temperaturi între +5°C și +120°C. Pentru temperaturi mai mari, sunt necesare proceduri speciale de aplicare în straturi subțiri.' }
      ]
    }
  };

  const data = content[category] || content.proprietari;

  return (
    <motion.div
      className="fixed inset-0 bg-[#0A0A0A] z-[100] overflow-y-auto"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 font-sans text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Înapoi la site</span>
        </button>

        {/* Header */}
        <div className="mb-20">
          <span className="text-[#FF4500] uppercase tracking-[0.3em] text-[11px] font-sans font-semibold block mb-4">
            {data.subtitle}
          </span>
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white mb-6 tracking-[-0.03em]">
            {data.title}
          </h1>
          <p className="text-gray-400 text-xl font-sans font-light max-w-4xl leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* Problem & Solution Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/[0.03]">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-4">{data.problem.title}</h3>
            <p className="text-gray-500 font-sans text-sm leading-relaxed">{data.problem.desc}</p>
          </div>
          <div className="p-10 rounded-3xl bg-[#FF4500]/5 border border-[#FF4500]/10">
            <div className="w-10 h-10 rounded-full bg-[#FF4500]/10 flex items-center justify-center mb-6">
              <Sparkles className="w-5 h-5 text-[#FF4500]" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-4">{data.solution.title}</h3>
            <p className="text-gray-400 font-sans text-sm leading-relaxed">{data.solution.desc}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-24">
          {data.technicalSpecs.map((stat, i) => (
            <div key={i} className="p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm">
              <span className="text-[#FF4500] font-display font-black text-4xl md:text-5xl block mb-2">
                {stat.value}
              </span>
              <span className="text-white font-sans text-xs font-medium block mb-1">{stat.label}</span>
              <span className="text-gray-600 font-sans text-xs">{stat.note}</span>
            </div>
          ))}
        </div>

        {/* Detailed Features */}
        <div className="space-y-16 mb-24">
          <h2 className="font-display font-bold text-3xl text-white mb-10 text-center">De Ce Să Alegi thermX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.detailedFeatures.map((feature, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] transition-colors">
                <div className="mt-1">
                  <div className="w-12 h-12 rounded-xl bg-[#FF4500]/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#FF4500]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <h2 className="font-display font-bold text-3xl text-white mb-10 text-center">Întrebări Frecvente</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {data.faq.map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.01] border border-white/[0.03]">
                <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
                  <span className="text-[#FF4500]">Q:</span> {item.q}
                </h3>
                <p className="text-gray-400 font-sans text-sm leading-relaxed flex gap-2">
                  <span className="text-emerald-500 font-bold">A:</span> {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.04] text-center">
          <h3 className="font-display font-bold text-2xl text-white mb-4">Ești gata să optimizezi proiectul tău?</h3>
          <p className="text-gray-400 font-sans text-sm mb-8 max-w-2xl mx-auto">
            Contactează-ne pentru un calcul termic personalizat gratuit în 48 de ore sau pentru a solicita mostre fizice de material pentru evaluare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@nanorevolution.ro"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FF4500] text-white font-sans font-medium text-sm tracking-wide rounded-full
                         hover:shadow-[0_0_40px_rgba(255,69,0,0.3)] transition-all duration-500 hover:scale-105"
            >
              <span>Solicită Ofertă Personalizată</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
            <a
              href="#contact"
              onClick={handleBack}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-sans font-medium text-sm tracking-wide rounded-full
                         hover:border-white transition-all duration-500 hover:scale-105"
            >
              <span>Mergi la Contact</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
