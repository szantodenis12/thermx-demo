import { motion } from 'framer-motion';
import { Home, HardHat, Ruler, Factory, Wrench, ArrowLeft, AlertTriangle, Zap, Shield, Sparkles, Check } from 'lucide-react';
import { useScrollCtx } from '../App';

// ═══════════════════════════════════════════════════
// CATEGORIES SECTION (Buttons to Landing Pages)
// ═══════════════════════════════════════════════════
export const CategoriesSection = ({ onSelect }: { onSelect?: (category: string) => void }) => {
  const categories = [
    {
      id: 'proprietari',
      title: 'Proprietari',
      subtitle: 'PERSOANE FIZICE',
      icon: Home,
      description: 'Pentru locuințe unde contează consumul de energie, confortul interior și intervenția minimă asupra spațiului existent.',
      color: 'from-[#FF4500] to-[#FF4500]',
      ctaText: 'Vezi aplicații pentru locuințe',
    },
    {
      id: 'constructori',
      title: 'Constructori',
      subtitle: 'ECHIPE DE EXECUȚIE',
      icon: HardHat,
      description: 'Pentru proiecte unde timpul de aplicare, reducerea etapelor de montaj și adaptarea la suprafețe complexe influențează direct costul execuției.',
      color: 'from-[#FF4500] to-[#FF4500]',
      ctaText: 'Vezi aplicații în execuție',
    },
    {
      id: 'arhitecti',
      title: 'Arhitecți',
      subtitle: 'PROIECTARE & INGINERIE',
      icon: Ruler,
      description: 'Pentru soluții unde grosimea redusă, continuitatea stratului și integrarea pe detalii constructive sunt importante în proiectare.',
      color: 'from-[#FF4500] to-[#FF4500]',
      ctaText: 'Vezi aplicații în proiectare',
    },
    {
      id: 'industrial',
      title: 'Industrial',
      subtitle: 'SECTOR B2B',
      icon: Factory,
      description: 'Pentru conducte, rezervoare, hale, containere și suprafețe tehnice expuse la variații mari de temperatură.',
      color: 'from-[#FF4500] to-[#FF4500]',
      ctaText: 'Vezi aplicații industriale',
    },
    {
      id: 'instalatori',
      title: 'Instalatori',
      subtitle: 'APLICATORI SPECIALIZAȚI',
      icon: Wrench,
      description: 'Pentru lucrări pe conducte, trasee tehnice, echipamente, spații greu accesibile și suprafețe unde aplicarea continuă este mai eficientă decât montajul cu elemente rigide.',
      color: 'from-[#FF4500] to-[#FF4500]',
      ctaText: 'Vezi aplicații pentru instalații',
    },
  ];

  const handleSelect = (id: string) => {
    window.location.hash = id;
    if (onSelect) onSelect(id);
  };

  return (
    <section className="py-20 sm:py-28 md:py-40 lg:py-56 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <span className="text-[#FF4500] uppercase tracking-[0.3em] text-[11px] font-sans font-semibold block mb-6 text-center">
          DOMENII DE APLICARE
        </span>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-center text-white mb-6 tracking-[-0.03em]">
          Alege contextul proiectului tău.
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-4xl mx-auto mb-20 font-sans font-light leading-relaxed">
          thermX poate fi integrat în locuințe, șantiere, proiecte tehnice și aplicații industriale. Fiecare context are cerințe diferite: eficiență energetică, timp de execuție, grosime redusă, continuitate a stratului sau rezistență în condiții dificile.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="group relative h-auto min-h-[300px] sm:h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/[0.08] bg-white/[0.05] backdrop-blur-md hover:border-white/[0.15] transition-all duration-500"
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
              
              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-500 font-sans text-[10px] uppercase tracking-wider block mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-white font-display font-bold text-xl mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-gray-400 font-sans text-xs leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center text-white text-[11px] font-medium opacity-50 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                  <span>{cat.ctaText}</span>
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
  const { openContact } = useScrollCtx();
  const handleBack = () => {
    window.history.replaceState("", document.title, window.location.pathname + window.location.search);
    onBack();
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openContact();
  };

  // ── Custom Content Data for Proprietari & Constructori ──
  const customContent: Record<string, {
    subtitle: string;
    title: string;
    introParagraphs: string[];
    heroCta: string;
    sections: {
      title: string;
      paragraphs: string[];
      bulletTitle?: string;
      bullets?: string[];
    }[];
    finalCta: {
      title: string;
      desc: string;
      buttonText: string;
    };
  }> = {
    proprietari: {
      subtitle: 'Pagină Proprietari — thermX',
      title: 'Protecție termică în strat subțire pentru suprafețele proprietății tale.',
      introParagraphs: [
        'Într-o casă, un apartament sau un spațiu tehnic, confortul termic depinde de felul în care suprafețele reacționează la frig, căldură și variații de temperatură.',
        'thermX se aplică direct pe suport, într-un strat subțire și continuu, și îmbunătățește comportamentul termic al suprafeței tratate, fără plăci, dibluri sau volume adăugate.',
        'Poate fi analizat pentru pereți, tavane, fațade, terase, beciuri, garaje, anexe, spații tehnice sau suprafețe metalice, minerale ori lemnoase.'
      ],
      heroCta: 'Cere recomandare pentru proprietatea ta',
      sections: [
        {
          title: 'De ce contează suprafața',
          paragraphs: [
            'O suprafață expusă la frig, soare, vânt sau umiditate nu se comportă la fel în orice condiții. Unele materiale se răcesc rapid. Altele acumulează căldură. Unele zone rămân mai reci decât restul spațiului, mai ales la colțuri, tavane, terase, beciuri sau elemente metalice.',
            'Înainte să alegi o soluție, contează ce vrei să corectezi: pierdere de căldură, supraîncălzire, diferențe de temperatură între zone, condens sau protecția unei suprafețe expuse.',
            'thermX lucrează la nivelul stratului de suprafață, acolo unde problema poate fi tratată direct pe suport.'
          ]
        },
        {
          title: 'Cum ajută un strat subțire',
          paragraphs: [
            'Nu orice lucrare are nevoie de izolație groasă. Uneori problema este locală și ține de comportamentul suprafeței: cum se încălzește, cum se răcește și cât de uniform este protejată.',
            'thermX formează un strat continuu pe suprafața tratată și reduce transferul termic la contactul dintre material și mediul exterior. Fiind subțire, nu încarcă structura și nu schimbă aspectul.',
            'Mai puțină căldură pierdută prin suprafață înseamnă, în timp, consum mai mic la încălzire și răcire. Prin reflexia radiației infraroșii, thermX poate contribui la până la 40% economie de energie, în condiții specifice de aplicare. Pentru o gospodărie, asta înseamnă o lucrare care se simte în facturi, nu doar o cheltuială inițială.',
            'Pentru că se aplică prin pulverizare, urmărește forma suportului: muchii, colțuri, curbe, zone greu accesibile sau suprafețe unde materialele rigide sunt dificil de montat corect.'
          ]
        },
        {
          title: 'Unde poate fi folosit într-o proprietate',
          paragraphs: [
            'thermX poate fi analizat pentru mai multe zone, în funcție de materialul suport, starea suprafeței și expunere.'
          ],
          bulletTitle: 'Aplicații posibile:',
          bullets: [
            'pereți interiori și tavane',
            'fațade și terase',
            'beciuri, garaje, mansarde și anexe',
            'spații tehnice',
            'containere și rezervoare',
            'suprafețe metalice, minerale sau lemnoase',
            'zone din jurul piscinelor, dacă suportul permite aplicarea'
          ]
        },
        {
          title: 'Când merită luat în calcul',
          paragraphs: [
            'thermX merită analizat când ai o suprafață pe care vrei să o protejezi termic, dar unde soluția trebuie aleasă în funcție de suport și de condițiile de lucru. Este util mai ales unde contează grosimea finală, continuitatea aplicării și acoperirea uniformă a detaliilor.'
          ],
          bulletTitle: 'Poate fi potrivit dacă observi:',
          bullets: [
            'o suprafață care se răcește repede iarna',
            'o suprafață care se încălzește puternic vara',
            'un beci, garaj sau spațiu tehnic cu variații de temperatură',
            'condens sau zone mai reci decât restul încăperii',
            'elemente metalice care transmit rapid căldura sau frigul',
            'o zonă punctuală unde vrei protecție termică, fără o lucrare amplă'
          ]
        },
        {
          title: 'Ce oferă thermX, pe scurt',
          paragraphs: [
            'thermX nu este o soluție universală pentru orice problemă termică. Rolul lui este un strat subțire, continuu, cu proprietăți termoizolante, aplicat direct pe suprafața tratată.',
            'În funcție de proiect, poate reduce pierderile de căldură, limita încălzirea excesivă a suprafeței și îmbunătăți confortul în zona respectivă.'
          ],
          bulletTitle: 'Pe scurt:',
          bullets: [
            'strat subțire, continuu, aplicat direct pe suport',
            'grosime recomandată 1–3 mm',
            'aplicabil pe suporturi minerale, metalice și lemnoase',
            'acoperire bună pe forme neregulate și detalii',
            'potrivit pentru interior sau exterior, în funcție de proiect',
            'util pentru o zonă punctuală sau pentru suprafețe mai mari',
            'recomandarea se face după suport, expunere și obiectiv'
          ]
        },
        {
          title: 'De ce nu alegi soluția doar după material',
          paragraphs: [
            'Două suprafețe aparent asemănătoare se pot comporta diferit. Un perete exterior, un tavan de garaj, o terasă, un beci sau un rezervor metalic nu se tratează la fel.',
            'Contează materialul, umiditatea, temperatura la care e expusă suprafața, finisajele existente și modul în care zona este folosită. De aceea grosimea și pașii de aplicare se stabilesc după ce înțelegem suprafața, nu înainte.'
          ]
        },
        {
          title: 'Pentru construcții noi, lucrări existente sau intervenții punctuale',
          paragraphs: [
            'thermX poate fi analizat atât în proiecte noi, cât și pe construcții deja folosite. Poate acoperi o singură zonă expusă sau mai multe suprafețe ale proprietății, în funcție de necesar: o casă nouă cu zone expuse, un apartament cu pereți sau tavane reci, un beci ori garaj cu temperatură instabilă, o terasă sau o fațadă expusă, o anexă sau o suprafață metalică unde transferul termic este gradat.'
          ]
        },
        {
          title: 'Ce informații sunt necesare pentru recomandare',
          paragraphs: [
            'Pentru o recomandare corectă nu e suficient să știm doar suprafața în metri pătrați. Contează contextul lucrării.'
          ],
          bulletTitle: 'Date utile:',
          bullets: [
            'tipul proprietății și zona de aplicare',
            'suprafața aproximativă',
            'materialul suport și starea suprafeței',
            'interior sau exterior',
            'problema observată (răcire, supraîncălzire, condens)',
            'fotografii ale zonei',
            'obiectivul lucrării: protecție termică, confort, reducerea încălzirii, limitarea pierderilor sau tratare punctuală'
          ]
        }
      ],
      finalCta: {
        title: 'Ai o suprafață care trebuie protejată termic?',
        desc: 'Trimite detaliile proprietății. Echipa thermX verifică tipul suprafeței, grosimea recomandată și pașii necesari pentru aplicare.',
        buttonText: 'Trimite detaliile proiectului'
      }
    },
    constructori: {
      subtitle: 'Pagină Constructori — thermX',
      title: 'Soluție termoizolantă în strat subțire pentru lucrări mai rapide și suprafețe greu de tratat clasic.',
      introParagraphs: [
        'Pentru constructori, thermX poate fi o soluție utilă în lucrări unde contează timpul de execuție, grosimea stratului, accesul la suprafață și reducerea etapelor grele de montaj.',
        'Se aplică direct pe suport, într-un strat de 1–3 mm, pe pereți, fațade, tavane, terase, spații tehnice, elemente metalice sau zone cu detalii constructive unde materialele clasice cer mai multă manoperă, tăieri, prinderi și ajustări.'
      ],
      heroCta: 'Cere detalii pentru execuție',
      sections: [
        {
          title: 'Mai puține operațiuni pe șantier',
          paragraphs: [
            'În multe lucrări, costul real nu vine doar din material. Vine din timpul petrecut la montaj, din echipa necesară, din pregătiri, ajustări, tăieri, prinderi, transport și refaceri.',
            'thermX poate simplifica execuția în zone unde un sistem clasic ar însemna mai multe etape și mai multă manoperă. Lucrezi direct pe suprafață, cu grosime controlată de 1–3 mm și acoperire continuă, iar prin pulverizare timpul de aplicare poate scădea cu până la 80% față de montajul clasic.',
            'Pentru constructor, asta înseamnă o soluție mai ușor de integrat în lucrări punctuale, spații tehnice sau suprafețe unde operațiile rapide și accesul contează.'
          ]
        },
        {
          title: 'Unde apar problemele în execuție',
          paragraphs: [
            'Pe șantier, suprafețele nu sunt întotdeauna ideale. Ai muchii, colțuri, racorduri, zone înguste, tavane, terase, elemente metalice, spații tehnice sau suprafețe unde montajul clasic devine lent.',
            'Fiecare detaliu consumă timp. Fiecare tăietură, prindere sau ajustare înseamnă manoperă. Iar acolo unde accesul este dificil, randamentul scade rapid.',
            'thermX este relevant în aceste zone pentru că permite tratarea suprafeței într-un strat subțire, aplicat continuu, fără să depinzi de plăci, dibluri, profile sau decupaje complexe.'
          ]
        },
        {
          title: 'Pentru lucrări unde timpul contează',
          paragraphs: [
            'În construcții, rapiditatea nu înseamnă doar să termini mai repede. Înseamnă să reduci etapele inutile, să folosești mai eficient echipa și să limitezi blocajele dintre lucrări.',
            'thermX poate fi util în proiecte unde ai nevoie de o soluție termoizolantă care se integrează mai ușor în fluxul de lucru, mai ales pe suprafețe punctuale sau zone greu de rezolvat prin metode clasice.'
          ],
          bulletTitle: 'Avantaje pentru execuție:',
          bullets: [
            'mai puține etape de montaj',
            'mai puține ajustări la colțuri, muchii și racorduri',
            'grosime redusă, de 1–3 mm, aplicare directă pe suport',
            'timp de aplicare redus cu până la 80% față de montajul clasic',
            'acoperire continuă, inclusiv pe zone greu accesibile',
            'potrivit pentru suprafețe neregulate',
            'mai puține materiale rigide și auxiliare'
          ]
        },
        {
          title: 'Costul nu este doar materialul',
          paragraphs: [
            'Pentru o firmă de construcții, costul unei soluții se calculează în material, timp, oameni, echipamente și risc de refacere.',
            'O soluție care pare simplă pe hârtie poate deveni scumpă dacă necesită multă manoperă, multe ajustări sau oprirea altor etape de lucru.',
            'thermX poate fi avantajos în lucrări unde stratul subțire și aplicarea continuă reduc complexitatea execuției. Prin mai puține materiale auxiliare și etape, costul de execuție poate scădea cu până la 30%. Nu înlocuiește orice sistem clasic, dar poate deveni o variantă eficientă pentru suprafețe tehnice, detalii constructive și intervenții unde montajul tradițional consumă prea mult timp.'
          ]
        },
        {
          title: 'Unde poate fi folosit de constructori',
          paragraphs: [
            'thermX poate fi analizat pentru lucrări rezidențiale, comerciale, tehnice sau industriale, în funcție de suport și condițiile de aplicare.'
          ],
          bulletTitle: 'Aplicații posibile:',
          bullets: [
            'fațade, pereți interiori, tavane și terase',
            'beciuri, garaje, mansarde și anexe',
            'spații tehnice, containere și rezervoare',
            'elemente metalice și suprafețe din beton',
            'zidărie, lemn sau panouri lemnoase',
            'zone cu acces dificil sau detalii constructive greu de placat'
          ]
        },
        {
          title: 'Ce trebuie respectat în execuție',
          paragraphs: [
            'Ca orice soluție tehnică, thermX trebuie aplicat corect. Randamentul și rezultatul depind de pregătirea suportului, grosimea recomandată, condițiile de lucru și respectarea pașilor de aplicare.',
            'Nu este o soluție care se aplică la întâmplare. Pentru rezultate bune, constructorul trebuie să știe exact ce suprafață tratează, ce grosime se cere și cum trebuie pregătit suportul.'
          ],
          bulletTitle: 'Contează în special:',
          bullets: [
            'curățarea suprafeței',
            'stabilitatea suportului',
            'umiditatea',
            'temperatura de lucru',
            'grosimea aplicată',
            'timpul de uscare',
            'compatibilitatea cu finisajele următoare',
            'protejarea zonelor care nu trebuie acoperite'
          ]
        },
        {
          title: 'Pentru ce tip de echipe este potrivit',
          paragraphs: [
            'thermX poate fi relevant pentru constructorii care întâlnesc frecvent zone greu de izolat clasic sau detalii care consumă multă manoperă.',
            'Se potrivește firmelor care vor să adauge în ofertă o soluție tehnică pentru lucrări unde clientul cere grosime redusă, execuție curată și aplicare pe suprafețe diverse: constructori de case, firme de renovări și termoizolații, echipe care lucrează pe fațade sau terase, antreprenori pentru spații tehnice și firme care lucrează cu hale, containere sau structuri metalice.'
          ]
        },
        {
          title: 'Ce informații sunt necesare înainte de lucrare',
          paragraphs: [
            'Pentru o recomandare corectă, trebuie stabilite datele tehnice ale suprafeței. Așa se poate calcula mai bine consumul, grosimea recomandată, pregătirea suportului și timpul de execuție.'
          ],
          bulletTitle: 'Date utile:',
          bullets: [
            'tipul lucrării',
            'zona de aplicare',
            'suprafața aproximativă',
            'materialul suport',
            'interior sau exterior',
            'starea suprafeței',
            'accesul la zona de lucru',
            'fotografii din șantier',
            'obiectivul lucrării',
            'dacă există finisaje ulterioare peste stratul aplicat'
          ]
        }
      ],
      finalCta: {
        title: 'Ai o lucrare unde timpul, manopera și detaliile contează?',
        desc: 'Trimite datele suprafeței, iar echipa thermX îți poate recomanda grosimea, pregătirea suportului și pașii potriviți pentru execuție.',
        buttonText: 'Cere detalii pentru execuție'
      }
    },
    arhitecti: {
      subtitle: 'Pagină Arhitecți — thermX',
      title: 'Protecție termică de 1–3 mm pentru proiecte unde detaliul contează.',
      introParagraphs: [
        'Pentru arhitecți, thermX este o membrană nanoceramică aplicată prin pulverizare, în grosime controlată de 1–3 mm. O soluție discretă acolo unde grosimea stratului, continuitatea și integrarea în detalii constructive influențează proiectul.',
        'Se pretează la suprafețe plane, muchii, colțuri, curbe, zone tehnice sau geometrii unde sistemele termoizolante clasice devin greu de integrat fără compromisuri vizuale sau constructive.'
      ],
      heroCta: 'Cere detalii tehnice pentru proiect',
      sections: [
        {
          title: 'Performanța integrată în arhitectură, nu adăugată peste ea.',
          paragraphs: [
            'În proiectare, soluția tehnică susține intenția arhitecturală, nu o limitează. Grosimea stratului, continuitatea pe detalii și compatibilitatea cu suportul existent influențează atât execuția, cât și rezultatul final.',
            'Cu 1–3 mm și aproximativ 0,4 kg/m² la 1 mm grosime, thermX adaugă protecție termică fără volume suplimentare mari și fără să modifice semnificativ geometria existentă.'
          ]
        },
        {
          title: 'O soluție pentru detaliile greu de tratat clasic.',
          paragraphs: [
            'Provocarea nu este întotdeauna suprafața mare, ci detaliul: muchii, goluri, colțuri, racorduri, zone curbe, structuri metalice sau elemente expuse, unde montajul sistemelor rigide devine dificil.',
            'Acolo unde o placă sau un panou întrerupe continuitatea, membrana aplicată prin pulverizare urmărește forma suprafeței și tratează detaliul unitar.'
          ],
          bulletTitle: 'Zone relevante pentru proiectare:',
          bullets: [
            'fațade cu detalii constructive sensibile',
            'muchii și colțuri expuse',
            'suprafețe curbe sau neregulate',
            'elemente metalice și zone tehnice',
            'spații cu limitări de grosime',
            'renovări unde geometria existentă trebuie păstrată'
          ]
        },
        {
          title: 'Pentru proiecte unde fiecare milimetru contează.',
          paragraphs: [
            'Grosimea nu este doar o valoare tehnică. Influențează aliniamente, detalii de fațadă, tâmplărie, glafuri, finisaje și relația dintre elementele constructive.',
            'Cu un strat de 1–3 mm, thermX lasă mai multă libertate de integrare în zonele unde straturi groase ar modifica proporțiile sau ar complica execuția. Reflectă până la 85% din radiația infraroșie, partea din transferul termic care, la nivelul unei clădiri, poate însemna în jur de 40% din energia pierdută.'
          ]
        },
        {
          title: 'Continuitate pe suprafețe complexe.',
          paragraphs: [
            'Un strat subțire aplicat prin pulverizare formează, după uscare, o membrană continuă, fără rosturi. În locul plăcilor montate separat, suprafața rămâne tratată unitar, inclusiv pe detaliile unde întreruperile sunt greu de evitat.',
            'Continuitatea contează în zonele unde punțile termice, rosturile, muchii și racordurile se analizează încă din faza de concept.'
          ],
          bulletTitle: 'Repere tehnice utile pentru proiectare:',
          bullets: [
            'grosime controlată, 1–3 mm',
            'cca 0,4 kg/m² la 1 mm, încărcare suplimentară redusă',
            'reflexie infraroșie până la 85%',
            'interval de operare -60°C / +260°C',
            'aderență 1,53–1,84 MPa pe metal, beton și lemn',
            'elongație la rupere peste 12%, preia micro-mișcările suportului',
            'reacție la foc Clasa A după uscare',
            'durabilitate 35+ ani, garanție 20 de ani'
          ]
        },
        {
          title: 'Unde se potrivește în proiect.',
          paragraphs: [
            'thermX poate fi analizat în proiecte rezidențiale, comerciale, tehnice sau de renovare, în funcție de suport, expunere și obiectivul lucrării: fațade, pereți interiori, tavane, elemente metalice, spații comerciale sau clădiri existente.',
            'Nu este o soluție universală pentru orice detaliu, ci o opțiune tehnică acolo unde stratul de 1–3 mm, adaptarea la suprafață și continuitatea aduc un avantaj clar față de un sistem rigid.'
          ]
        },
        {
          title: 'Util în renovări și intervenții pe clădiri existente.',
          paragraphs: [
            'În renovare, constrângerile contează adesea mai mult decât libertățile. Fațadele, finisajele, tâmplăria și detaliile deja construite limitează intervenția.',
            'Aici stratul de 1–3 mm devine relevant: adaugă protecție termică fără lucrări ample și fără pierderi de spațiu interior, mai ales acolo unde o soluție clasică ar cere modificări vizibile. Pulverizarea reduce timpul de aplicare cu până la 80% și costul de execuție cu până la 30% față de montajul clasic, prin mai puține materiale auxiliare și etape.'
          ]
        },
        {
          title: 'O soluție care se proiectează, nu se aplică generic.',
          paragraphs: [
            'Performanța depinde de context. Pentru thermX contează suportul, starea suprafeței, expunerea, grosimea necesară și condițiile de aplicare.',
            'De aceea integrarea pornește de la datele reale ale suprafeței și de la detaliile constructive. Pentru proiecte de arhitectură, echipa thermX oferă informații tehnice, recomandări de utilizare și sprijin pentru identificarea zonelor unde materialul are relevanță.'
          ]
        },
        {
          title: 'Ce informații ajută la o recomandare corectă.',
          paragraphs: [
            'Câteva date despre proiect și suprafață sunt suficiente pentru a stabili grosimea, compatibilitatea cu suportul și modul de integrare în detalii.'
          ],
          bulletTitle: 'Poți trimite:',
          bullets: [
            'tipul și stadiul proiectului',
            'zona de aplicare și materialul suport',
            'suprafața estimată',
            'planșe sau detalii tehnice relevante',
            'fotografii ale suprafeței, pentru proiecte existente',
            'obiectivul urmărit: confort termic, protecție, renovare sau limitare de grosime'
          ]
        }
      ],
      finalCta: {
        title: 'Ai un proiect unde grosimea și detaliul contează?',
        desc: 'Trimite datele proiectului. Echipa thermX analizează dacă soluția se potrivește suprafeței și detaliilor tale constructive și îți recomandă grosimea și modul de aplicare.',
        buttonText: 'Trimite datele proiectului'
      }
    },
    industrial: {
      subtitle: 'Pagină Industrial — thermX',
      title: 'Protecție termică în strat subțire pentru spații industriale și suprafețe tehnice.',
      introParagraphs: [
        'În spațiile industriale, temperatura nu influențează doar confortul, ci și consumul de energie, condițiile de lucru, depozitarea, procesele și durata de viață a suprafețelor expuse.',
        'thermX poate fi utilizat pe suprafețe minerale, metalice sau lemnoase, în zone unde este necesară reducerea transferului termic printr-un strat subțire de 1–3 mm, continuu și adaptat suportului.',
        'Este relevant pentru hale, depozite, camere frigorifice, spații tehnice, containere, rezervoare, acoperișuri metalice, pereți, tavane sau alte suprafețe expuse la variații de temperatură.'
      ],
      heroCta: 'Cere recomandare pentru spațiul tău industrial',
      sections: [
        {
          title: 'În industrie, temperatura se traduce direct în costuri.',
          paragraphs: [
            'O hală care se încălzește puternic vara, un depozit greu de menținut la temperatură stabilă sau o cameră frigorifică cu pierderi termice pot genera consum suplimentar, variații de temperatură și solicitare mai mare pentru echipamente.',
            'În astfel de spații, problema nu este doar temperatura resimțită. Contează cât de repede se încălzește suprafața, câtă energie transmite mai departe și cât de constant poate fi menținut mediul interior.',
            'thermX se aplică la nivelul suprafeței și reflectă până la 85% din radiația infraroșie, contribuind la limitarea transferului termic acolo unde suportul permite aplicarea corectă. În condiții specifice, asta poate însemna până la 40% economie de energie.'
          ]
        },
        {
          title: 'Unde apar pierderile în spațiile industriale',
          paragraphs: [
            'În hale și depozite, pierderile sau acumulările de căldură apar frecvent prin acoperișuri, pereți exteriori, panouri metalice, tavane, zone tehnice, uși industriale, racorduri sau suprafețe expuse direct la soare.',
            'În camere frigorifice sau spații cu temperatură controlată, diferența dintre interior și exterior pune presiune constantă pe suprafețe. Orice zonă slab protejată poate influența consumul și stabilitatea temperaturii.'
          ],
          bulletTitle: 'Zone frecvente:',
          bullets: [
            'acoperișuri metalice și panouri sandwich',
            'hale de producție și depozite',
            'camere frigorifice și spații cu temperatură controlată',
            'containere, rezervoare și conducte',
            'tavane industriale și pereți exteriori',
            'zone tehnice și suprafețe expuse direct la soare',
            'zone cu risc de condens'
          ]
        },
        {
          title: 'Camere frigorifice și spații cu temperatură controlată',
          paragraphs: [
            'În camerele frigorifice, orice transfer termic suplimentar înseamnă efort mai mare pentru instalațiile de răcire. Suprafețele trebuie analizate în funcție de material, temperatură de lucru, umiditate, expunere și regimul de exploatare.',
            'thermX poate fi luat în calcul pentru suprafețe unde se dorește limitarea schimbului termic și o protecție suplimentară la nivelul suportului. Membrana rămâne stabilă în intervalul -60°C / +260°C, deci poate fi analizată inclusiv în zone de tranziție între rece și cald.',
            'În astfel de aplicații, recomandarea trebuie făcută strict pe baza condițiilor reale: temperatură, umiditate, tipul suportului, finisajele existente și cerințele spațiului.',
            'În practică, poate fi relevant pentru camere frigorifice, depozite alimentare și camere tehnice, pentru tavane sau pereți expuși la diferențe mari de temperatură și pentru suprafețe unde apare condens sau variație termică puternică.'
          ]
        },
        {
          title: 'Hale și depozite',
          paragraphs: [
            'În halele industriale, una dintre cele mai mari probleme este suprafața mare expusă: acoperișuri, panouri metalice, pereți exteriori și tavane care pot acumula sau pierde rapid căldură.',
            'Vara, suprafețele metalice se pot încălzi puternic. Iarna, aceleași suprafețe pot transmite rapid frigul. Rezultatul este un spațiu mai greu de controlat termic și echipamente de climatizare sau încălzire solicitate mai mult.',
            'thermX poate fi folosit pentru tratarea acestor suprafețe în strat subțire, mai ales acolo unde contează acoperirea continuă și adaptarea la forma suportului. Pe acoperișuri din tablă și panouri metalice expuse la soare, reflexia de până la 85% a radiației infraroșii reduce căldura preluată de suprafață, iar membrana rezistă la temperaturi de până la +260°C.',
            'Se pretează la hale de producție, depozite logistice și spații comerciale mari, la acoperișuri din tablă, panouri metalice, pereți exteriori și tavane înalte, precum și la spații de lucru expuse la temperaturi mari, unde climatizarea este greu de menținut eficient.'
          ]
        },
        {
          title: 'Suprafețe metalice, rezervoare și containere',
          paragraphs: [
            'Metalul transmite temperatura rapid. De aceea, rezervoarele, containerele, conductele, panourile metalice sau structurile expuse pot avea variații termice mari de la o zi la alta.',
            'În aceste situații, un strat aplicat direct pe suprafață poate reduce transferul termic și poate proteja suportul, cu condiția ca suprafața să fie pregătită corect. Tehnologia este validată în sectoarele petrochimic, naval și auto, pe suprafețe expuse la solicitări termice mari.',
            'Poate fi utilizat pe containere industriale, rezervoare, conducte și carcase metalice, pe panouri și structuri expuse, dar și pe suprafețe tehnice cu acces dificil sau pe elemente unde grosimea suplimentară trebuie menținută redusă.'
          ]
        },
        {
          title: 'De ce contează stratul subțire în industrie',
          paragraphs: [
            'În spațiile industriale, nu orice suprafață permite montaj cu materiale groase. Uneori accesul este dificil, spațiul este limitat, echipamentele sunt deja instalate sau suprafața are forme care nu se pretează la soluții rigide.',
            'thermX se aplică în grosime de 1–3 mm și poate acoperi uniform muchii, colțuri, curbe, îmbinări și zone tehnice unde plăcile sau sistemele clasice sunt mai greu de montat corect.',
            'Avantajul este controlul stratului și continuitatea pe suprafața tratată.'
          ]
        },
        {
          title: 'Ce oferă din punct de vedere tehnic',
          paragraphs: [
            'thermX acționează al nivelul suprafeței tratate. Rolul lui este să reducă transferul termic printr-un strat subțire, continuu, cu microsfere ceramice vidate integrate în material.',
            'În funcție de proiect, poate contribui la reducerea încălzirii suprafețelor expuse, la limitarea pierderilor de căldură și la îmbunătățirea controlului termic în anumite zone ale spațiului industrial.'
          ],
          bulletTitle: 'Caracteristici relevante:',
          bullets: [
            'grosime recomandată 1–3 mm, strat continuu pe suprafață',
            'reflexie infraroșie până la 85%',
            'interval de operare -60°C / +260°C',
            'compatibil cu suporturi metalice, minerale și lemnoase',
            'comportament controlat la vapori, util în zone cu risc de condens',
            'reacție la foc Clasa A după uscare',
            'aplicabil pe suprafețe mari sau zone punctuale',
            'durabilitate 35+ ani, recomandare după suport, expunere și obiectiv'
          ]
        },
        {
          title: 'Nu se recomandă la general. Se recomandă după aplicație.',
          paragraphs: [
            'În mediul industrial, aceeași soluție nu se aplică identic într-o hală, într-o cameră frigorifică, pe un rezervor metalic sau pe un acoperiș expus la soare.',
            'Contează temperatura de lucru, umiditatea, tipul suportului, accesul, pregătirea suprafeței, regimul de exploatare și dacă peste strat vor exista alte finisaje sau solicitări mecanice.',
            'Înainte de recomandare, trebuie stabilit clar ce problemă trebuie rezolvată: pierdere de căldură, supraîncălzire, condens, protecția suprafeței sau stabilizarea temperaturii într-o anumită zonă.'
          ]
        },
        {
          title: 'Ce informații sunt necesare pentru analiză',
          paragraphs: [
            'Pentru o recomandare corectă, este nevoie de date tehnice despre suprafață și condițiile de exploatare.'
          ],
          bulletTitle: 'Date utile:',
          bullets: [
            'tipul spațiului: hală, depozit, cameră frigorifică, spațiu tehnic, container, rezervor',
            'zona unde se dorește aplicarea',
            'suprafața aproximativă',
            'materialul suport',
            'interior sau exterior',
            'temperatura de lucru',
            'nivelul de umiditate, dacă este relevant',
            'expunerea la soare, frig, condens sau variații mari de temperatură',
            'starea suprafeței',
            'accesul la zona de lucru',
            'fotografii din locație',
            'obiectivul lucrării: reducerea pierderilor, limitarea supraîncălzirii, protecție termică sau control mai bun al temperaturii'
          ]
        }
      ],
      finalCta: {
        title: 'Ai o hală, cameră frigorifică sau suprafață tehnică expusă termic?',
        desc: 'Trimite detaliile aplicației, iar echipa thermX poate verifica suportul, condițiile de lucru și grosimea recomandată pentru suprafața ta.',
        buttonText: 'Cere recomandare pentru spațiul industrial'
      }
    },
    instalatori: {
      subtitle: 'Pagină Instalatori — thermX',
      title: 'Aplicare în strat subțire pentru suprafețe unde detaliile de execuție contează.',
      introParagraphs: [
        'Pentru instalatori și echipe de aplicare, thermX oferă o soluție tehnică potrivită pentru lucrări unde suportul, grosimea stratului și continuitatea aplicării trebuie controlate atent.',
        'Poate fi folosit pe suprafețe minerale, metalice sau lemnoase, la interior sau exterior, aplicat prin pulverizare, cu respectarea pregătirii suportului și a condițiilor de aplicare.'
      ],
      heroCta: 'Cere detalii pentru aplicare',
      sections: [
        {
          title: 'O lucrare bună începe cu suportul',
          paragraphs: [
            'La thermX, rezultatul nu depinde doar de produs, ci și de suprafața pe care se aplică.',
            'Suportul trebuie verificat înainte de lucrare: să fie stabil, curat, uscat și compatibil cu aplicarea. Praful, umezeala, grăsimea, exfolierile sau zonele instabile pot afecta aderența și uniformitatea stratului.',
            'Pentru instalator, etapa de pregătire este esențială. Dacă suportul este corect pregătit, aplicarea devine mai predictibilă, iar riscul de refaceri scade.'
          ]
        },
        {
          title: 'Unde poate fi aplicat',
          paragraphs: [
            'thermX poate fi folosit pe mai multe tipuri de suprafețe, în funcție de proiect și de condițiile din teren.'
          ],
          bulletTitle: 'Suprafețe posibile:',
          bullets: [
            'beton, tencuială minerală, zidărie și BCA',
            'metal, tablă și panouri sandwich',
            'lemn, OSB și gips-carton',
            'conducte, rezervoare și containere',
            'fațade, tavane și spații tehnice'
          ]
        },
        {
          title: 'Pentru zone unde aplicarea clasică devine lentă',
          paragraphs: [
            'În multe lucrări, timpul se pierde la detalii: muchii, colțuri, racorduri, suprafețe curbe, elemente metalice, zone înguste sau spații cu acces dificil.',
            'Acolo unde materialele rigide cer tăieri, prinderi, ajustări sau multe etape de montaj, thermX poate simplifica execuția prin aplicare directă pe suprafață, prin pulverizare.',
            'Pentru echipele de aplicare, avantajul este că stratul urmărește forma suportului și poate acoperi continuu zone care, în mod normal, consumă multă manoperă.'
          ]
        },
        {
          title: 'Ce trebuie respectat la aplicare',
          paragraphs: [
            'thermX se aplică în grosime controlată, în funcție de recomandarea pentru proiect. Nu se aplică „după ochi” și nu se tratează ca o simplă vopsea.',
            'Pentru o lucrare corectă, trebuie respectate condițiile de suport, grosimea recomandată de 1–3 mm, timpul de uscare și pașii tehnici indicați. Aplicarea se face prin pulverizare airless, în straturi succesive, până la grosimea finală.'
          ],
          bulletTitle: 'Puncte importante:',
          bullets: [
            'verificarea suportului înainte de aplicare',
            'curățarea suprafeței',
            'îndepărtarea zonelor instabile',
            'controlul umidității',
            'respectarea temperaturii de lucru',
            'aplicarea în strat uniform',
            'controlul grosimii finale',
            'respectarea timpilor de uscare',
            'protejarea zonelor care nu trebuie acoperite'
          ]
        },
        {
          title: 'Avantaje pentru echipele de aplicare',
          paragraphs: [
            'Pentru instalatori, thermX poate fi util în lucrări unde este important să reduci numărul de operațiuni și să păstrezi controlul asupra stratului aplicat.',
            'Nu ai plăci de decupat, nu ai dibluri, nu ai profile și nu trebuie să adaptezi materiale rigide la fiecare detaliu al suprafeței.'
          ],
          bulletTitle: 'Avantaje practice:',
          bullets: [
            'grosime redusă, de 1–3 mm',
            'aplicare continuă pe suprafață',
            'mai puține ajustări la colțuri și racorduri',
            'bun pentru forme neregulate',
            'potrivit pentru zone greu accesibile',
            'aplicabil pe suprafețe minerale, metalice și lemnoase',
            'poate fi folosit pe lucrări punctuale sau suprafețe mai mari',
            'execuție mai curată față de soluțiile cu multe componente'
          ]
        },
        {
          title: 'Lucrări unde poate fi relevant',
          paragraphs: [
            'thermX poate fi integrat în lucrări rezidențiale, comerciale, tehnice sau industriale, în funcție de suprafață și de obiectiv.',
            'Este relevant mai ales acolo unde echipa are de tratat zone dificile, suprafețe expuse sau detalii unde aplicarea unui sistem clasic consumă mult timp.',
            'În practică, poate fi integrat la pereți interiori, tavane, fațade, terase, beciuri, garaje și camere tehnice, dar și la hale, depozite, containere, rezervoare, conducte, acoperișuri metalice și panouri sandwich, mai ales în spații cu variații mari de temperatură.'
          ]
        },
        {
          title: 'Ce trebuie știut înainte de ofertare',
          paragraphs: [
            'Pentru instalatori, o estimare corectă nu se face doar după metri pătrați. Contează suportul, accesul, starea suprafeței, numărul de detalii, condițiile de lucru și grosimea cerută.',
            'O suprafață plană se lucrează diferit față de o zonă cu multe muchii, racorduri sau elemente tehnice. Un suport mineral nu se pregătește la fel ca unul metalic.',
            'Înainte de ofertare, trebuie clarificate datele tehnice ale lucrării, pentru a estima corect consumul, timpul de aplicare și pregătirea necesară.'
          ]
        },
        {
          title: 'Informații necesare pentru recomandare',
          paragraphs: [
            'Pentru o recomandare corectă, sunt utile câteva detalii despre suprafață și condițiile de lucru.'
          ],
          bulletTitle: 'Date utile:',
          bullets: [
            'tipul lucrării',
            'suprafața aproximativă',
            'materialul suport',
            'interior sau exterior',
            'starea suportului',
            'accesul la zona de lucru',
            'existența muchiilor, colțurilor sau racordurilor',
            'temperatura și umiditatea zonei',
            'dacă există finisaje ulterioare',
            'fotografii ale suprafeței',
            'obiectivul lucrării'
          ]
        }
      ],
      finalCta: {
        title: 'Ai o lucrare unde aplicarea trebuie controlată corect?',
        desc: 'Trimite datele suprafeței, iar echipa thermX îți poate oferi recomandări pentru pregătirea suportului, grosimea stratului și pașii de aplicare.',
        buttonText: 'Cere detalii pentru aplicare'
      }
    }
  };

  if (category === 'proprietari' || category === 'constructori' || category === 'arhitecti' || category === 'industrial' || category === 'instalatori') {
    const data = customContent[category];
    return (
      <motion.div
        className="fixed inset-0 bg-[#0A0A0A] z-[100] overflow-y-auto"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative font-sans text-gray-300">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Înapoi la site</span>
          </button>

          {/* Header/Subtitle */}
          <div className="mb-4">
            <span className="text-[#FF4500] uppercase tracking-[0.25em] text-xs font-semibold block">
              {data.subtitle}
            </span>
          </div>

          {/* HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-24">
            <div className="lg:col-span-7">
              <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 tracking-[-0.03em] leading-[1.15]">
                {data.title}
              </h1>
              <button
                onClick={handleCtaClick}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FF4500] text-white font-semibold text-sm tracking-wide rounded-full
                           hover:shadow-[0_0_40px_rgba(255,69,0,0.35)] transition-all duration-500 hover:scale-105"
              >
                <span>{data.heroCta}</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
            <div className="lg:col-span-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.04] p-6 sm:p-8 rounded-3xl space-y-4 text-sm sm:text-base leading-relaxed text-gray-400 font-light transition-all duration-300">
              {data.introParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* SECTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {data.sections.map((section, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">{section.title}</h2>
                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-gray-400 font-light">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>
                {section.bullets && (
                  <div className="p-5 mt-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-white font-semibold text-xs sm:text-sm block mb-3">{section.bulletTitle}</span>
                    <ul className="space-y-2">
                      {section.bullets.map((item, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                          <Check className="w-3.5 h-3.5 text-[#FF4500] mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA FINAL */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#FF4500]/10 to-transparent border border-[#FF4500]/20 text-center">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
              {data.finalCta.title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base font-light mb-8 max-w-xl mx-auto leading-relaxed">
              {data.finalCta.desc}
            </p>
            <button
              onClick={handleCtaClick}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FF4500] text-white font-semibold text-sm tracking-wide rounded-full
                         hover:shadow-[0_0_40px_rgba(255,69,0,0.35)] transition-all duration-500 hover:scale-105"
            >
              <span>{data.finalCta.buttonText}</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Legacy content for other categories ──
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
      intro: 'Proiectează fără limite geometrice. thermX îzi oferă libertatea de a păstra liniile curate ale designului, asigurând în același timp conformitatea cu standardele nZEB.',
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
        { label: 'Temp. Maximă', value: '+260°C', note: 'Rezistă la vărfuri de temperatură.' },
        { label: 'Temp. Minimă', value: '-60°C', note: 'Ideală pentru criogenie și frig.' },
        { label: 'Aderență Metal', value: 'Excelentă', note: 'Previne pătrunderea apei la suport.' },
        { label: 'Rezistență UV', value: 'Totală', note: 'Nu necesită carcasă de protecție.' }
      ],
      faq: [
        { q: 'Cum se comportă la dilatări termice?', a: 'Datorită elongației mari, membrana urmărește dilatările și contractările conductelor de oțel fără să se crape sau să se desprindă.' },
        { q: 'Se poate aplica pe echipamente în funcțiune?', a: 'Pentru rezultate optime, aplicarea se face pe suprafețe cu temperaturi între +5°C și +120°C. Pentru temperaturi mai mari, sunt necesare proceduri speciale de aplicare în straturi subțiri.' }
      ]
    },
    instalatori: {
      title: 'Pentru Instalatori',
      subtitle: 'APLICATORI SPECIALIZAȚI',
      intro: 'Soluții avansate pentru izolarea conductelor, echipamentelor și a traseelor de instalații greu accesibile. thermX înlocuiește cu succes cochiliile rigide și oferă o etanșare continuă de lungă durată.',
      problem: {
        title: 'Dificultatea Izolațiilor Tip Cochilă',
        desc: 'Materialele convenționale precum cochiliile de vată sau spumă sunt greu de montat la coturi, ramificații și flanșe. Rămân întotdeauna micro-rosturi neetanșe, ceea ce duce la pierderi de energie și condens structural, provocând rugină.'
      },
      solution: {
        title: 'Aplicare Continuă fără Îmbinări',
        desc: 'Prin pulverizare airless, thermX îmbracă integral orice element de instalații, oricât de complex. Formează o barieră termoizolantă continuă, complet etanșă, eliminând riscul punților termice și prevenind coroziunea sub izolație.'
      },
      detailedFeatures: [
        {
          icon: Zap,
          title: 'Izolare rapidă pe geometrii complexe',
          desc: 'Coturile, flanșele și robineții se izolează în câteva minute, prin simplă pulverizare, economisind ore întregi de manoperă necesare pentru tăierea și montarea materialelor rigide.'
        },
        {
          icon: Sparkles,
          title: 'Prevenirea Coroziunii sub Izolație (CUI)',
          desc: 'Membrana thermX face corp comun cu metalul suportului, blocând complet accesul oxigenului și a umidității, prevenind astfel formarea condensului și coroziunea.'
        },
        {
          icon: Shield,
          title: 'Rezistență ridicată la temperaturi înalte',
          desc: 'Rezistă în condiții de exploatare continuă de până la +260°C, fiind ideală pentru circuite termice industriale, abur, conducte de apă caldă și echipamente de proces.'
        },
        {
          icon: Shield,
          title: 'Grosime redusă în spații înguste',
          desc: 'La doar 1-2 mm grosime, thermX permite izolarea traseelor de conducte amplasate în nișe tehnice înguste, unde izolațiile voluminoase convenționale nu ar avea loc.'
        }
      ],
      technicalSpecs: [
        { label: 'Eficiență termică', value: 'Maximă', note: 'Etanșare 100% fără punți termice.' },
        { label: 'Grosime strat', value: '1.0 - 2.0 mm', note: 'Perfect pentru nișe tehnice înguste.' },
        { label: 'Garanție suport', value: '20+ ani', note: 'Stabilitate totală la vibrații și dilatări.' },
        { label: 'Aderență metal', value: '1.84 MPa', note: 'Corp comun cu suprafața conductei.' }
      ],
      faq: [
        { q: 'Este rezistent la vibrațiile conductelor?', a: 'Da. Datorită elongației sale ridicate (>12%), membrana thermX preia vibrațiile și dilatările termice mecanice fără a se fisura sau desprinde.' },
        { q: 'Câte straturi sunt necesare?', a: 'Se recomandă aplicarea în 2-3 straturi succesive pentru a obține o grosime finală de 1.5 - 2 mm, în funcție de cerințele termice ale proiectului.' }
      ]
    }
  };

  const data = content[category] || content.constructori;

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
        <div className="mb-10 sm:mb-20">
          <span className="text-[#FF4500] uppercase tracking-[0.3em] text-[11px] font-sans font-semibold block mb-4">
            {data.subtitle}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-7xl text-white mb-4 sm:mb-6 tracking-[-0.03em]">
            {data.title}
          </h1>
          <p className="text-gray-400 text-base sm:text-xl font-sans font-light max-w-4xl leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* Problem & Solution Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-16 sm:mb-24">
          <div className="p-5 sm:p-10 rounded-3xl bg-white/[0.01] border border-white/[0.03]">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">{data.problem.title}</h3>
            <p className="text-gray-500 font-sans text-sm leading-relaxed">{data.problem.desc}</p>
          </div>
          <div className="p-5 sm:p-10 rounded-3xl bg-[#FF4500]/5 border border-[#FF4500]/10">
            <div className="w-10 h-10 rounded-full bg-[#FF4500]/10 flex items-center justify-center mb-6">
              <Sparkles className="w-5 h-5 text-[#FF4500]" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">{data.solution.title}</h3>
            <p className="text-gray-400 font-sans text-sm leading-relaxed">{data.solution.desc}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16 sm:mb-24">
          {data.technicalSpecs.map((stat, i) => (
            <div key={i} className="p-4 sm:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm">
              <span className="text-[#FF4500] font-display font-black text-2xl sm:text-4xl md:text-5xl block mb-2">
                {stat.value}
              </span>
              <span className="text-white font-sans text-xs font-medium block mb-1">{stat.label}</span>
              <span className="text-gray-600 font-sans text-xs">{stat.note}</span>
            </div>
          ))}
        </div>

        {/* Detailed Features */}
        <div className="space-y-10 sm:space-y-16 mb-16 sm:mb-24">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6 sm:mb-10 text-center">De Ce Să Alegi thermX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            {data.detailedFeatures.map((feature, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] transition-colors">
                <div className="mt-1">
                  <div className="w-12 h-12 rounded-xl bg-[#FF4500]/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[#FF4500]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16 sm:mb-24">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6 sm:mb-10 text-center">Întrebări Frecvente</h2>
          <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {data.faq.map((item, i) => (
              <div key={i} className="p-5 sm:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.03]">
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2 flex items-start gap-2">
                  <span className="text-[#FF4500] font-black">Q:</span> <span>{item.q}</span>
                </h3>
                <p className="text-gray-400 font-sans text-sm leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">A:</span> <span>{item.a}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.04] text-center">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">Ești gata să optimizezi proiectul tău?</h3>
          <p className="text-gray-400 font-sans text-sm mb-6 sm:mb-8 max-w-2xl mx-auto">
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
