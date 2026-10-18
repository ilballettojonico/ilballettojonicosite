/**
 * IL BALLETTO JONICO - MASSAFRA (TA)
 * Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileDrawer();
  initCourseFilters();
  initCourseModal();
  initScheduleTabs();
  initGallery();
  initFaqAccordion();
  initBookingForm();
  initMap();
  initBackToTop();
});

/* ==========================================================================
   1. HEADER SCROLL & ACTIVE LINK SPY
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.main-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. COURSE FILTERING
   ========================================================================== */
function initCourseFilters() {
  const filterNavs = document.querySelectorAll('.filter-nav');

  filterNavs.forEach(nav => {
    const filterBtns = nav.querySelectorAll('.filter-btn');
    const container = nav.closest('.courses-section');
    const courseCards = container ? container.querySelectorAll('.course-card') : document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        courseCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
            card.classList.add('animate-fade-in');
          } else {
            card.style.display = 'none';
            card.classList.remove('animate-fade-in');
          }
        });
      });
    });
  });
}

/* ==========================================================================
   4. COURSE DETAIL MODAL
   ========================================================================== */
const COURSE_DETAILS = {
  'giocodanza': {
    title: 'Gioco Danza',
    category: 'Gioco Danza & Primi Passi',
    age: 'Dai 3 ai 5 Anni',
    frequency: 'Lunedì e Mercoledì dalle 16:00 alle 17:00',
    image: 'assets/images/locandina_giocodanza.jpg',
    teacher: 'Melania Gamarro & Docenti certificati propedeutica',
    description: 'Un percorso pedagogico e ludico-educativo che introduce i più piccoli all\'arte coreutica. Attraverso il gioco guidato, filastrocche ritmiche e oggetti didattici, il bambino scopre le potenzialità del proprio corpo, la relazione con lo spazio e con i compagni.',
    objectives: [
      'Sviluppo dell\'equilibrio psicofisico e coordinazione motoria',
      'Educazione all\'ascolto musicale, al ritmo e alle dinamiche',
      'Socializzazione, empatia e rispetto dello spazio comune',
      'Consapevolezza corporea naturale senza forzature'
    ],
    attire: 'Body societario comodo, calzini bianchi in cotone (non antiscivolo) o mezze punte morbide in tela, capelli raccolti.'
  },
  'danza-propedeutica': {
    title: 'Danza Propedeutica',
    category: 'Danza Propedeutica',
    age: 'Dai 5 ai 6 Anni',
    frequency: 'Martedì, Giovedì e Venerdì dalle 16:00 alle 17:00',
    image: 'assets/images/locandina_propedeutica.jpg',
    teacher: 'Melania Gamarro & Docenti certificati di propedeutica',
    description: 'Il corso di Danza Propedeutica segna l\'avvio strutturato all\'arte coreutica per bambini dai 5 ai 6 anni. Con delicatezza e rigore pedagogico, gli allievi acquisiscono la corretta postura eretta, la coordinazione motoria nello spazio e il senso del ritmo musicale. La tua formazione in mani sicure.',
    objectives: [
      'Martedì, Giovedì e Venerdì ore 16:00 - 17:00',
      'Impostazione della postura corretta eretta e allungamento assiale',
      'Percezione del ritmo e tempo musicale 2/4 e 3/4',
      'Esercizi a terra per la mobilità dell\'anca e collo del piede',
      'Coordinazione braccia-gambe e primi saltelli in asse'
    ],
    attire: 'Body societario con gonnellino, collant rosa, mezze punte in tela morbida, chignon o capelli ordinati.'
  },
  'preparatorio-uno': {
    title: '1° Corso Preparatorio',
    category: '1° Corso Preparatorio',
    age: 'Dai 6 ai 7 Anni',
    frequency: 'Lunedì & Mercoledì (Danza Classica ore 17:00) • Giovedì (Danza Moderna ore 17:00)',
    image: 'assets/images/locandina_preparatorio_1.jpg',
    teacher: 'Melania Gamarro & corpo docenti accademico (Classica) ed Eliana Oliva (Moderna)',
    description: 'Il 1° Corso Preparatorio accoglie le allieve e gli allievi dai 6 ai 7 anni nel primo anno del ciclo di preparazione accademica. Il programma armonizza la danza classica e la danza moderna, ponendo solide basi per la flessibilità articolare (spaccate al suolo e mobilità del bacino), l\'allineamento posturale, il ritmo musicale e la preparazione agli esami di certificazione BAC (Ballet & Arts Certification - Exam Day). La tua formazione in mani sicure.',
    objectives: [
      'Lunedì ore 17:00: Danza Classica (postura accademica, flessibilità al suolo, spaccate e allineamento)',
      'Mercoledì ore 17:00: Danza Classica (primi elementi tecnici, collo del piede, en dehors e coordinazione)',
      'Giovedì ore 17:00: Danza Moderna (dinamica, ritmo, musicalità ed espressione corporea)',
      'Preparazione didattica agli esami di certificazione BAC (Ballet & Arts Certification)',
      'Consapevolezza corporea, tenuta muscolare e lavoro corale di gruppo'
    ],
    attire: 'Divisa societaria (body accademico azzurro chiaro BAC, come da locandina/esame), collant chiari, scarpette da mezza punta in tela con elastici cuciti, chignon impeccabile.'
  },
  'preparatorio-due': {
    title: '2° Corso Preparatorio',
    category: '2° Corso Preparatorio',
    age: 'Dai 7 agli 8 Anni',
    frequency: 'Lunedì & Mercoledì (Danza Classica ore 17:00) • Giovedì (Danza Moderna ore 17:00)',
    image: 'assets/images/locandina_preparatorio_2.jpg',
    teacher: 'Melania Gamarro e corpo docenti accademico',
    description: 'Il 2° Corso Preparatorio è dedicato agli allievi dai 7 agli 8 anni. Si approfondisce la biomeccanica del movimento corporeo con esercizi di flessibilità, allineamento posturale, potenziamento muscolare e studio dei primi elementi tecnici della danza classica e moderna. La tua formazione in mani sicure.',
    objectives: [
      'Lunedì ore 17:00: Danza Classica (postura accademica, primi plié e allineamento)',
      'Mercoledì ore 17:00: Danza Classica (tendu, estensioni gamba e coordinazione dinamica)',
      'Giovedì ore 17:00: Danza Moderna (ritmo, musicalità, dinamica del salto ed espressività)',
      'Miglioramento dell\'en dehors naturale, mobilità articolare e flessibilità',
      'Studio dell\'allineamento posturale della colonna vertebrale alla sbarra e al centro',
      'Sviluppo dell\'ascolto musicale, orientamento scenico e lavoro corale di gruppo'
    ],
    attire: 'Divisa ufficiale societaria (body accademico azzurro), collant rosa, mezze punte in tela morbida con elastici cuciti, chignon impeccabile.'
  },
  'preparatorio-tre': {
    title: '3° Corso Preparatorio',
    category: '3° Corso Preparatorio',
    age: 'Dagli 8 ai 9 Anni',
    frequency: 'Martedì (Contemporanea 17:00) • Mercoledì (Classica 18:00) • Giovedì (Moderna 18:00) • Venerdì (Classica 17:00)',
    image: 'assets/images/locandina_preparatorio_3.jpg',
    teacher: 'Melania Gamarro & Docenti di disciplina',
    description: 'Il 3° Corso Preparatorio accompagna gli allievi dagli 8 ai 9 anni nello studio approfondito della danza classica accademica alla sbarra e al centro, integrandola con la danza contemporanea e la danza moderna. La tua formazione in mani sicure.',
    objectives: [
      'Martedì ore 17:00: Danza Contemporanea (floorwork e percezione del peso)',
      'Mercoledì ore 18:00: Danza Classica (sbarra, centro e prime combinazioni)',
      'Giovedì ore 18:00: Danza Moderna (ritmo, dinamica ed espressività)',
      'Venerdì ore 17:00: Danza Classica (postura accademica e coordinazione)',
      'Potenziamento posturale e screening chinesiologico continuo'
    ],
    attire: 'Divisa ufficiale preparatorio, mezze punte con elastico cucito, chignon con retina coordinata.'
  },
  'preparatorio-quattro': {
    title: '4° Corso Preparatorio',
    category: '4° Corso Preparatorio',
    age: 'Dai 10 agli 11 Anni',
    frequency: 'Martedì (Contemporanea 17:00) • Mercoledì (Classica 18:00) • Giovedì (Moderna 18:00) • Venerdì (Classica 17:00)',
    image: 'assets/images/locandina_preparatorio_4.jpg',
    teacher: 'Melania Gamarro & Docenti di disciplina',
    description: 'Il 4° Corso Preparatorio è dedicato agli allievi dai 10 agli 11 anni: fase preparatoria avanzata che consolida le basi tecniche e prepara corpo e mente al rigore dei Corsi Accademici con un piano multidisciplinare (Classica, Moderna, Contemporanea). La tua formazione in mani sicure.',
    objectives: [
      'Martedì ore 17:00: Danza Contemporanea (mobilità, dinamica e respiro)',
      'Mercoledì ore 18:00: Danza Classica (padronanza sbarra a una mano)',
      'Giovedì ore 18:00: Danza Moderna (espressività scenica e musicalità)',
      'Venerdì ore 17:00: Danza Classica (rond de jambe, frappé e piccoli salti)',
      'Valutazione biomeccanica e colloquio di passaggio al 1° Corso Accademico'
    ],
    attire: 'Divisa societaria accademica, mezze punte, chignon regolamentare.'
  },
  'primo-corso-accademico': {
    title: 'Primo Corso Accademico',
    category: '1° Corso Accademico',
    age: 'Dagli 11 ai 12 Anni',
    frequency: 'Lunedì & Venerdì (Classica 18:00) • Martedì (Contemporanea 18:00) • Giovedì (Moderna 19:00)',
    image: 'assets/images/locandina_primo_accademico.jpg',
    teacher: 'Melania Gamarro & Docenti di disciplina',
    description: 'Il Primo Corso Accademico segna l’inizio di una fase fondamentale nella formazione del giovane danzatore, in cui lo studio della danza assume un carattere più rigoroso, consapevole e strutturato. Attraverso i principi della tecnica Vaganova e della scuola francese, gli allievi approfondiscono lo studio della danza classica, perfezionando postura, en dehors, coordinazione, port de bras, musicalità e precisione tecnica. Particolare attenzione è dedicata al potenziamento muscolare, alla stabilità e al corretto allineamento del corpo, requisiti fondamentali per affrontare progressivamente il lavoro sulle punte, introdotto nel rispetto della preparazione fisica e tecnica individuale. Lo studio della danza moderna e contemporanea completa il percorso, favorendo versatilità, espressività e crescita artistica. Un percorso accademico che pone le basi per una formazione tecnica e artistica sempre più avanzata.',
    objectives: [
      'Studio della danza classica attraverso i principi della tecnica Vaganova e della scuola francese',
      'Perfezionamento di postura, en dehors, coordinazione, port de bras, musicalità e precisione tecnica',
      'Potenziamento muscolare, stabilità e corretto allineamento del corpo',
      'Introduzione progressiva al lavoro sulle punte nel rispetto della preparazione fisica individuale',
      'Studio della Danza Moderna e Danza Contemporanea per favorire versatilità ed espressività',
      'Basi solide per una formazione tecnica e artistica sempre più avanzata'
    ],
    attire: 'Divisa accademica ufficiale 1° Corso con colore identificativo, collant regolamentari, mezze punte su misura, chignon perfetto.'
  },
  'secondo-corso-accademico': {
    title: 'Secondo Corso Accademico',
    category: 'Consolidamento Tecnico & Sviluppo delle Punte',
    age: 'Dai 12 ai 13 Anni',
    frequency: 'Lunedì (Classica 19:30) • Martedì (Contemporanea 19:00) • Mercoledì (Classica 19:00) • Giovedì (Moderna 20:00)',
    image: 'assets/images/locandina_secondo_accademico.jpg',
    teacher: 'Melania Gamarro (Classica), Francesca Sibilio (Contemporanea) & Eliana Oliva (Moderna)',
    description: 'Il Secondo Corso Accademico rappresenta una fase di consolidamento e approfondimento della formazione classica. Attraverso lo studio della tecnica Vaganova e della scuola francese, gli allievi perfezionano il controllo del corpo, l’equilibrio, la coordinazione e la precisione dei movimenti, affrontando combinazioni tecniche progressivamente più articolate. Particolare attenzione è dedicata allo sviluppo del lavoro sulle punte, secondo la preparazione individuale, al potenziamento muscolare, alla stabilità e alla qualità dell’esecuzione. Lo studio dell’adagio, dell’allegro e delle prime sequenze tecniche più complesse accompagna la crescita dell’allievo, mentre la danza moderna e contemporanea arricchisce le capacità espressive e interpretative. L’obiettivo è costruire una tecnica solida, consapevole e sicura, indispensabile per affrontare i livelli accademici successivi.',
    objectives: [
      'Studio della tecnica Vaganova e della scuola francese per perfezionare controllo, equilibrio e precisione',
      'Sviluppo del lavoro sulle punte secondo la preparazione fisica e tecnica individuale',
      'Potenziamento muscolare, stabilità articolare e qualità dell’esecuzione tecnica',
      'Studio dell’adagio, dell’allegro e delle prime sequenze tecniche complesse',
      'Danza Moderna e Danza Contemporanea per arricchire espressività e interpretazione scenica',
      'Costruzione di una tecnica solida, consapevole e sicura per i livelli accademici successivi'
    ],
    attire: 'Divisa accademica 2° Corso con colore identificativo, scarpe da mezza punta in tela, prime scarpe da punta, abbigliamento per contemporaneo e modern, chignon perfetto.'
  },
  'terzo-corso-accademico': {
    title: 'Terzo Corso Accademico',
    category: 'Perfezionamento Tecnico & Maturità Artistica',
    age: 'Dai 13 ai 14 Anni',
    frequency: 'Lunedì (Classica 19:30) • Martedì (Contemporanea 19:00) • Mercoledì (Classica 19:00) • Giovedì (Moderna 20:00)',
    image: 'assets/images/locandina_terzo_accademico.jpg',
    teacher: 'Melania Gamarro (Classica), Francesca Sibilio (Contemporanea) & Eliana Oliva (Moderna)',
    description: 'Il Terzo Corso Accademico segna un importante avanzamento nella preparazione del danzatore, con uno studio sempre più approfondito della tecnica classica e della qualità artistica del movimento. Il programma, fondato sui principi della tecnica Vaganova e della scuola francese, prevede un lavoro più impegnativo su equilibrio, rotazioni, salti, coordinazione e dinamica, con particolare attenzione alla precisione e alla pulizia tecnica. Il lavoro sulle punte si evolve attraverso combinazioni più articolate, sviluppando forza, stabilità, resistenza e sicurezza esecutiva. Assumono maggiore importanza la musicalità, l’espressività e l’interpretazione, elementi fondamentali per affrontare lo studio delle variazioni e del repertorio classico. La formazione moderna e contemporanea completa il percorso, favorendo versatilità e consapevolezza artistica per una danza sempre più matura, espressiva e personale.',
    objectives: [
      'Studio approfondito della tecnica classica fondato sui principi Vaganova e della scuola francese',
      'Lavoro avanzato su equilibrio, rotazioni (pirouettes), salti, coordinazione e dinamica',
      'Evoluzione del lavoro sulle punte con combinazioni articolate, forza, stabilità e resistenza',
      'Musicalità, espressività e interpretazione scenica per variazioni e repertorio classico',
      'Danza Moderna e Contemporanea per versatilità stilistica e consapevolezza corporea',
      'Trasformazione delle competenze tecniche in una danza matura, espressiva e personale'
    ],
    attire: 'Divisa accademica 3° Corso, scarpe da mezza punta in tela, scarpette da punta professionali, abbigliamento per contemporaneo e modern.'
  },
  'quarto-corso-accademico': {
    title: 'Quarto Corso Accademico',
    category: 'Formazione Avanzata & Preparazione ai Percorsi Professionali',
    age: 'Dai 14 ai 16 Anni',
    frequency: 'Lunedì (Classica 19:30) • Martedì (Contemporanea 19:00) • Mercoledì (Classica 19:00) • Giovedì (Moderna 20:00)',
    image: 'assets/images/locandina_quarto_accademico.jpg',
    teacher: 'Melania Gamarro (Classica), Francesca Sibilio (Contemporanea) & Eliana Oliva (Moderna)',
    description: 'Il Quarto Corso Accademico rappresenta una fase di formazione avanzata, in cui il rigore tecnico si unisce alla maturità artistica e interpretativa. Lo studio della danza classica, attraverso la tecnica Vaganova e la scuola francese, si intensifica con combinazioni complesse, lavoro sull’equilibrio, sulle rotazioni, sui salti e sul perfezionamento della tecnica sulle punte. Particolare attenzione viene dedicata alla qualità esecutiva, alla resistenza fisica, alla musicalità e alla presenza scenica, attraverso un lavoro mirato sul repertorio e sull’interpretazione. La preparazione fisica specifica sostiene il miglioramento della performance e la prevenzione degli infortuni, mentre lo studio della danza moderna e contemporanea amplia le competenze tecniche ed espressive. Il percorso pone inoltre le basi per affrontare concorsi, audizioni e selezioni presso accademie e istituzioni di alta formazione coreutica, attraverso un’eventuale preparazione individuale dedicata, formando danzatori pronti a percorsi di studio sempre più qualificati.',
    objectives: [
      'Studio intensivo della danza classica (tecnica Vaganova e scuola francese) con combinazioni complesse',
      'Lavoro avanzato su equilibrio, rotazioni, grandi salti e perfezionamento della tecnica su punte',
      'Qualità esecutiva, resistenza fisica, musicalità e presenza scenica su repertorio e interpretazione',
      'Preparazione fisica specifica per la performance atletica e prevenzione degli infortuni',
      'Danza Moderna e Contemporanea per ampliare competenze tecniche ed espressività scenica',
      'Preparazione a concorsi, audizioni e selezioni per accademie e istituzioni di alta formazione coreutica'
    ],
    attire: 'Divisa accademica superiore 4° Corso, scarpette da punta professionali, mezze punte in tela, abbigliamento per contemporaneo e modern, chignon perfetto.'
  },
  'primo-corso-perfezionamento': {
    title: 'Primo Anno di Perfezionamento',
    category: 'Eccellenza Tecnica & Sviluppo dell’Identità Artistica',
    age: 'Dai 17 ai 18 Anni',
    frequency: 'Lunedì (Classica 19:30) • Martedì (Contemp. 19:00) • Mercoledì (Classica 19:00) • Giovedì (Moderna 20:00)',
    image: 'assets/images/locandina_primo_perfezionamento.jpg',
    teacher: 'Melania Gamarro (Classico & Direzione), Francesca Sibilio (Contemporanea) & Eliana Oliva (Moderna)',
    description: 'Il Primo Anno di Perfezionamento rappresenta una fase avanzata della formazione, dedicata al consolidamento delle competenze accademiche e allo sviluppo di una maggiore maturità tecnica e interpretativa. Attraverso lo studio approfondito della tecnica Vaganova e della scuola francese, gli allievi affrontano combinazioni complesse, perfezionando equilibri, pirouettes, grandi salti, coordinazione e qualità del movimento. Il lavoro avanzato sulle punte, lo studio delle variazioni del repertorio classico e la cura dei dettagli esecutivi assumono un ruolo centrale nella formazione. Particolare attenzione è dedicata alla musicalità, all’espressività, alla presenza scenica e allo sviluppo di una personale identità artistica. Lo studio della danza moderna e contemporanea, insieme alla preparazione fisica specifica, completa il percorso, favorendo versatilità, resistenza e consapevolezza corporea, preparando gli allievi ad affrontare esperienze artistiche, concorsi e audizioni con crescente competenza e sicurezza.',
    objectives: [
      'Studio approfondito della tecnica Vaganova e della scuola francese con combinazioni complesse',
      'Perfezionamento di equilibri, pirouettes, grandi salti, coordinazione e dinamica del movimento',
      'Lavoro avanzato sulle punte e cura minuziosa dei dettagli tecnici ed esecutivi',
      'Studio delle variazioni del repertorio classico e costruzione della presenza scenica',
      'Musicalità, espressività e sviluppo di una personale identità artistica solistica',
      'Danza Moderna, Contemporanea e preparazione fisica specifica per audizioni e concorsi'
    ],
    attire: 'Abbigliamento accademico da studio e da audizione (tutulette da studio, mezze punte e punte professionali, abbigliamento per contemporaneo e modern).'
  },
  'secondo-corso-perfezionamento': {
    title: 'Secondo Anno di Perfezionamento',
    category: 'Alta Formazione & Orientamento alla Professione',
    age: 'Dai 18 ai 19 Anni',
    frequency: 'Lunedì (Classica 19:30) • Martedì (Contemp. 19:00) • Mercoledì (Classica 19:00) • Giovedì (Moderna 20:00)',
    image: 'assets/images/locandina_secondo_perfezionamento.jpg',
    teacher: 'Melania Gamarro (Classico & Direzione), Francesca Sibilio (Contemporanea) & Eliana Oliva (Moderna)',
    description: 'Il Secondo Anno di Perfezionamento rappresenta il livello più avanzato del percorso formativo accademico del Balletto Jonico, finalizzato al raggiungimento di un’elevata preparazione tecnica, artistica e interpretativa. Lo studio della tecnica Vaganova e della scuola francese si concentra sul perfezionamento dell’esecuzione, sulla padronanza delle combinazioni più complesse e sulla capacità di affrontare il movimento con precisione, fluidità e consapevolezza artistica. Ampio spazio è dedicato al repertorio classico, alle variazioni solistiche, alla tecnica avanzata sulle punte e all’interpretazione scenica, con particolare attenzione alla musicalità, allo stile e alla personalità del danzatore. La preparazione moderna e contemporanea arricchisce il profilo artistico, mentre il lavoro fisico specifico contribuisce al miglioramento della performance e alla prevenzione degli infortuni, orientando l’allievo verso concorsi, audizioni e il mondo professionale della danza.',
    objectives: [
      'Perfezionamento dell’esecuzione e padronanza delle combinazioni complesse (tecnica Vaganova e scuola francese)',
      'Repertorio classico, variazioni solistiche, tecnica avanzata su punte e interpretazione scenica',
      'Musicalità, stile e sviluppo della personalità artistica del danzatore',
      'Preparazione moderna e contemporanea avanzata per un profilo artistico completo',
      'Lavoro fisico specifico per la performance atletica e prevenzione degli infortuni',
      'Preparazione mirata per concorsi, audizioni e selezioni presso accademie e compagnie di danza'
    ],
    attire: 'Abbigliamento accademico da studio e da audizione (tutulette da studio, mezze punte e punte professionali, abbigliamento per contemporaneo e modern).'
  },
  'laboratori-esterni': {
    title: 'Laboratori esterni con docenti e discipline selezionate appositamente',
    category: 'Laboratori & Docenti Ospiti',
    age: 'Dagli 11 anni, Ragazzi & Adulti',
    frequency: 'Weekend intensivi, Masterclass e Workshop periodici',
    image: 'assets/images/contemporanea.jpg',
    teacher: 'Docenti ospiti selezionati e maestri di fama nazionale/internazionale',
    description: 'Un\'opportunità formativa unica a Massafra: l\'accademia apre le sue porte a coreografi e docenti ospiti selezionati dai più importanti teatri e centri coreutici d\'Europa per workshop dedicati a contemporaneo, contact improvisation, modern jazz e urban.',
    objectives: [
      'Confronto continuo con diversi stili e metodologie coreografiche',
      'Studio intensivo di discipline moderne, contemporanee e urban dance',
      'Sviluppo della capacità di apprendimento rapido delle coreografie',
      'Networking e opportunità di borse di studio nazionali ed estere'
    ],
    attire: 'Abbigliamento idoneo alla specifica disciplina del laboratorio (calzini, scarpe da ginnastica pulite o mezze punte).'
  },
  'avviamento-professionale': {
    title: 'Percorsi di avviamento professionale',
    category: 'Avviamento alla Professione',
    age: 'Dai 10 anni in su',
    frequency: 'Classica (3 lez/sett) • Moderna (1 lez) • Contemporanea (1 lez) • Prep. Fisica (1 lez) • Lezioni Private e Programmi Personalizzati',
    image: 'assets/images/locandina_avviamento_professionale.jpg',
    teacher: 'Melania Gamarro con docenti di disciplina e lezioni individuali personalizzate',
    description: 'Un percorso di formazione avanzata che unisce tecnica, espressività artistica e preparazione fisica specifica, attraverso lezioni individuali e programmi personalizzati. Il percorso è finalizzato anche alla preparazione a concorsi e audizioni per accademie, scuole di alta formazione e compagnie di danza, in Italia e all’estero. Una preparazione completa e mirata, per accompagnare ogni allievo nella crescita artistica e verso i propri obiettivi professionali.',
    objectives: [
      'Percorso di formazione avanzata: tecnica, espressività artistica e preparazione fisica specifica',
      'Lezioni individuali e programmi personalizzati su misura',
      'Preparazione a concorsi e audizioni per accademie, scuole di alta formazione e compagnie di danza (Italia ed estero)',
      'Danza Classica: 3 lezioni settimanali (tecnica accademica, sbarra, punte e centro)',
      'Danza Moderna e Contemporanea: ricerca coreografica e versatilità espressiva',
      'Accompagnamento costante verso i propri obiettivi professionali e artistici'
    ],
    attire: 'Divisa societaria accademica, mezze punte e punte professionali, abbigliamento per contemporaneo e costumi di scena.'
  },
  'preparazione-fisica': {
    title: 'Preparazione fisica',
    category: 'Potenziamento & Performance',
    age: 'Dai 5 Anni in Su (Lezioni di gruppo & individuali • Amatoriali e professionali)',
    frequency: '1-2 lezioni a settimana (sessioni dedicate e percorsi personalizzati)',
    image: 'assets/images/locandina_preparazione_fisica.jpg',
    teacher: 'Carmine Colombo (Docente Prep. Fisica, Posturologo & Mental Coach) in sinergia con Melania Gamarro',
    description: 'Preparazione Fisica per Danzatori: più forza, controllo e performance. Programma mirato al potenziamento funzionale e posturale specifico per la danza, con lezioni di gruppo e individuali, per percorsi sia amatoriali che professionali dai 5 anni in su. La tua formazione in mani sicure.',
    objectives: [
      'Forza e Stabilità: per sostenere la tecnica coreutica e prevenire gli infortuni',
      'Core e Controllo: per un corpo forte, centrato, stabile e reattivo',
      'Mobilità e Flessibilità: per un movimento ampio, fluido e sicuro',
      'Resistenza e Performance: per affrontare al meglio le lezioni quotidiane, le audizioni e il palcoscenico',
      'Corsi dai 5 anni in su: lezioni di gruppo e individuali, percorsi amatoriali e avviamento professionale',
      'Mental coaching e consapevolezza corporea sotto la guida di docenti qualificati'
    ],
    attire: 'Abbigliamento fitness societario elasticizzato (leggings, maglia tecnica), calzini o piedi nudi, tappetino fornito in sede.'
  },
  'laboratorio-coreografico-contemporaneo': {
    title: 'Laboratorio coreografico di danza contemporanea',
    category: 'Laboratorio Coreografico & Contemporaneo',
    age: 'Dagli 11 Anni in Su (Lezioni di gruppo & individuali • Amatoriali e professionali)',
    frequency: 'Sessioni settimanali, percorsi dedicati e masterclass coreografiche',
    image: 'assets/images/locandina_laboratorio_coreografico.jpg',
    teacher: 'Melania Gamarro (Direttrice Artistica) e Docenti di Danza Contemporanea',
    description: 'Idee, movimento, creazione. Un percorso artistico dedicato alla creatività e ricerca coreografica per esplorare nuove idee e trovare il proprio linguaggio. Dalla composizione e improvvisazione all\'ascolto del corpo e alla costruzione coreografica, fino all\'esperienza della performance per portare le proprie idee in scena. Corsi dagli 11 anni in su, lezioni di gruppo e individuali, percorsi amatoriali e professionali. La tua formazione in mani sicure.',
    objectives: [
      'Creatività e Ricerca: per esplorare nuove idee e trovare il proprio linguaggio corporeo ed espressivo',
      'Composizione e Improvvisazione: dall\'ascolto profondo del corpo alla costruzione dell\'architettura coreografica',
      'Lavoro Individuale e di Gruppo: per confrontarsi, creare insieme e crescere nella sintonia artistica',
      'Esperienza e Performance: per portare in scena le proprie creazioni ed esibirsi in teatri ed eventi',
      'Corsi dagli 11 anni in su: percorsi aperti sia ad allievi amatoriali che all\'avviamento professionale',
      'Lezioni di gruppo e sessioni individuali personalizzate'
    ],
    attire: 'Abbigliamento confortevole da danza contemporanea (pantaloni/leggings societari, body o maglia tecnica), calzini o piedi nudi.'
  },
  'teatro-danza': {
    title: 'Teatro danza',
    category: 'Teatro Danza',
    age: 'Dagli 11 Anni in Su (Lezioni di gruppo & individuali • Amatoriali e professionali)',
    frequency: 'Sessioni settimanali, studio della scena e laboratori di interpretazione',
    image: 'assets/images/locandina_teatro_danza.jpg',
    teacher: 'Melania Gamarro & Docenti qualificati di Teatro Danza e Recitazione',
    description: 'Teatro Danza: emozioni in movimento. Un percorso artistico unico e coinvolgente che unisce danza, recitazione e presenza scenica: espressività e interpretazione per raccontare storie attraverso il corpo e il movimento, lavoro di gruppo per sviluppare ascolto, collaborazione e creatività, vivendo la danza come vero spettacolo dal vivo. Corsi dagli 11 anni in su, lezioni di gruppo e individuali, percorsi amatoriali e professionali. La tua formazione in mani sicure.',
    objectives: [
      'Espressività e Interpretazione: per raccontare una storia e trasmettere emozioni attraverso il movimento',
      'Tecnica e Scena: unisce danza classica/contemporanea, recitazione teatrale e padronanza dello spazio scenico',
      'Lavoro di Gruppo: per sviluppare ascolto reciproco, collaborazione, sincronia e creatività collettiva',
      'Un\'Esperienza Completa: per vivere la danza anche come spettacolo teatrale dal vivo',
      'Corsi dagli 11 anni in su: lezioni di gruppo e percorsi individuali, sia amatoriali che professionali',
      'Sviluppo della fiducia, espressività emotiva e consapevolezza scenica'
    ],
    attire: 'Abbigliamento societario comodo per teatro danza (abito o completo nero/societario morbido per muoversi in libertà), calzini o piedi nudi.'
  },
  'hip-hop': {
    title: 'Hip Hop',
    category: 'Urban & Hip Hop',
    age: 'Dai 6 Anni in Su (Lezioni di gruppo & individuali • Amatoriali e professionali)',
    frequency: 'Sessioni settimanali, lezioni di gruppo e percorsi individuali',
    image: 'assets/images/locandina_hip_hop.jpg',
    teacher: 'Docenti qualificati di Danza Urban, Street Dance & Hip Hop in sinergia con la Direzione Artistica',
    description: 'Hip Hop: energia, stile e personalità. Un percorso dinamico nel mondo delle danze urbane: ritmo e coordinazione per sviluppare musicalità e consapevolezza del corpo, espressione e creatività con un linguaggio moderno per valorizzare il proprio stile, divertimento e condivisione in un ambiente stimolante, con disciplina e crescita per migliorare tecnica, presenza e sicurezza. Corsi dai 6 anni in su, lezioni di gruppo e individuali, percorsi amatoriali e professionali. La tua formazione in mani sicure.',
    objectives: [
      'Ritmo e Coordinazione: per sviluppare musicalità, isolamento corporeo e consapevolezza dinamica del corpo',
      'Espressione e Creatività: un linguaggio moderno per valorizzare il proprio stile e personalità unica',
      'Divertimento e Condivisione: lezioni in un ambiente stimolante, dinamico ed inclusivo',
      'Disciplina e Crescita: per migliorare tecnica, freestyle, presenza scenica e sicurezza in se stessi',
      'Corsi dai 6 anni in su: percorsi amatoriali e avviamento professionale con lezioni di gruppo e individuali',
      'Partecipazione a contest, rassegne ed eventi coreutici'
    ],
    attire: 'Abbigliamento urban/street dance confortevole (pantaloni cargo/tuta societaria, t-shirt comoda), sneakers da ginnastica pulite con suola in gomma ad uso esclusivo per la sala.'
  },
  'corso-danza-classica': {
    title: 'Danza classica',
    category: 'Danza Classica',
    age: 'Dai 5 Anni in Su (Lezioni di gruppo & individuali • Amatoriali e professionali)',
    frequency: 'Frequenza plurigiornaliera, lezioni di gruppo e percorsi individuali',
    image: 'assets/images/locandina_danza_classica.jpg',
    teacher: 'Melania Gamarro (Direttrice Artistica) & Corpo Docenti Accademico',
    description: 'Danza Classica: disciplina, armonia ed espressione. Il percorso di danza classica accademica de Il Balletto Jonico: tecnica e consapevolezza con un metodo progressivo e personalizzato, postura e controllo per un corpo forte, flessibile ed equilibrato, basi solide per il futuro dalla propedeutica all\'avviamento professionale. Corsi dai 5 anni in su, lezioni di gruppo e individuali, percorsi amatoriali e professionali. La tua formazione in mani sicure.',
    objectives: [
      'Tecnica e Consapevolezza: un metodo progressivo e personalizzato per un apprendimento solido e sicuro',
      'Postura e Controllo: per un corpo forte, armonico, flessibile, stabile ed equilibrato',
      'Basi Solide per il Futuro: un percorso didattico completo dalla propedeutica all\'avviamento professionale',
      'Studio alla Sbarra, Centro, Adagio, Allegro e tecnica sulle scarpe da punta',
      'Corsi dai 5 anni in su: lezioni di gruppo e sessioni individuali su misura',
      'Preparazione per esami di certificazione, audizioni, concorsi e palcoscenico'
    ],
    attire: 'Divisa accademica societaria, collant regolamentari, scarpette da mezza punta in tela/pelle (e punte per corsi avanzati), chignon rigoroso.'
  },
  'corso-danza-moderna': {
    title: 'Danza moderna',
    category: 'Danza Moderna',
    age: 'Dai 5 Anni in Su (Lezioni di gruppo & individuali • Amatoriali e professionali)',
    frequency: 'Frequenza plurigiornaliera, lezioni di gruppo e percorsi individuali',
    image: 'assets/images/locandina_danza_moderna.jpg',
    teacher: 'Eliana Oliva & Melania Gamarro con corpo docenti di modern jazz',
    description: 'Danza Moderna: energia, creatività e libertà di espressione. Il percorso di danza moderna de Il Balletto Jonico offre movimento e musicalità per sviluppare coordinazione e senso del ritmo, creatività e personalità come spazio per esprimere la propria unicità, insieme a divertimento e condivisione attraverso lezioni in un ambiente stimolante e inclusivo. Corsi dai 5 anni in su, lezioni di gruppo e individuali, percorsi amatoriali e professionali. La tua formazione in mani sicure.',
    objectives: [
      'Movimento e Musicalità: per sviluppare coordinazione motoria, dinamica e senso del ritmo',
      'Creatività e Personalità: uno spazio per valorizzare la propria unicità ed espressività artistica',
      'Divertimento e Condivisione: lezioni coinvolgenti in un ambiente stimolante, dinamico ed inclusivo',
      'Studio della tecnica modern jazz, salti, giri, floorwork e combinazioni coreografiche',
      'Corsi dai 5 anni in su: percorsi sia amatoriali che di preparazione accademica professionale',
      'Preparazione per spettacoli, rassegne coreutiche e concorsi di danza moderna'
    ],
    attire: 'Divisa o completo societario per danza moderna (top/canotta o maglia tecnica, leggings o pantaloncini neri), mezze punte da modern o calzini.'
  },
  'corso-danza-contemporanea': {
    title: 'Danza contemporanea',
    category: 'Danza Contemporanea',
    age: 'Dagli 11 Anni in Su (Lezioni di gruppo & individuali • Amatoriali e professionali)',
    frequency: 'Frequenza plurigiornaliera, lezioni di gruppo e percorsi individuali',
    image: 'assets/images/locandina_danza_contemporanea.jpg',
    teacher: 'Docenti qualificati di Danza Contemporanea & Melania Gamarro',
    description: 'Danza Contemporanea: ricerca, espressione e consapevolezza. Il percorso di danza contemporanea de Il Balletto Jonico offre movimento consapevole per esplorare il corpo, lo spazio e le emozioni, creatività e libertà per sviluppare il proprio linguaggio personale, tecnica e interpretazione in un percorso completo e stimolante. Corsi dagli 11 anni in su, lezioni di gruppo e individuali, percorsi amatoriali e professionali. La tua formazione in mani sicure.',
    objectives: [
      'Movimento Consapevole: per esplorare le potenzialità del corpo, la relazione con lo spazio e le emozioni',
      'Creatività e Libertà: per sviluppare e valorizzare il proprio linguaggio corporeo autentico',
      'Tecnica e Interpretazione: studio approfondito di floorwork, release technique, dinamica del peso e improvvisazione',
      'Costruzione del movimento organico, respiro ed espressione scenica contemporanea',
      'Corsi dagli 11 anni in su: lezioni di gruppo e percorsi individuali personalizzati (amatoriali e professionali)',
      'Preparazione per rassegne coreutiche, performance teatrali e audizioni'
    ],
    attire: 'Abbigliamento societario confortevole per danza contemporanea (pantaloni o leggings neri/societari, maglia tecnica o body), calzini o piedi nudi.'
  },
  'corso-ginnastica-posturale': {
    title: 'Ginnastica posturale',
    category: 'Postura & Benessere',
    age: 'Adulti e Ragazzi (Lezioni individuali e di gruppo)',
    frequency: 'Sessioni settimanali su misura, percorsi individuali e di gruppo',
    image: 'assets/images/locandina_ginnastica_posturale.jpg',
    teacher: 'Melania Gamarro (Chinesiologa Clinica, Posturologa & Direttrice Artistica)',
    description: 'Ginnastica posturale per adulti e ragazzi con Melania Gamarro. Percorsi dedicati al riequilibrio delle catene muscolari, mobilità articolare, decompressione della colonna vertebrale e benessere psicofisico attraverso un approccio chinesiologico rigoroso. Lezioni individuali e di gruppo, personalizzate sulle specifiche esigenze di ciascun allievo. La tua formazione in mani sicure.',
    objectives: [
      'Valutazione posturale chinesiologica preliminare e screening funzionale personalizzato',
      'Riequilibrio delle catene muscolari cinetiche e correzione dei compensi posturali',
      'Decompressione della colonna vertebrale e allungamento miofasciale profondo',
      'Mobilità articolare, rinforzo del core e stabilità scapolo-omerale e pelvica',
      'Lezioni individuali personalizzate "One-to-One" e piccoli gruppi mirati',
      'Prevenzione dolori muscolo-scheletrici, lombalgie e cervicalgie per adulti e ragazzi'
    ],
    attire: 'Abbigliamento fitness comodo (t-shirt traspirante, leggings o pantaloni tuta elastici), calzini antiscivolo. Tappetini ed elastici forniti in sede.'
  }
};

// Aliases for compatibility
COURSE_DETAILS['primo-corso-effettivo'] = COURSE_DETAILS['primo-corso-accademico'];
COURSE_DETAILS['secondo-corso-effettivo'] = COURSE_DETAILS['secondo-corso-accademico'];
COURSE_DETAILS['terzo-corso-effettivo'] = COURSE_DETAILS['terzo-corso-accademico'];
COURSE_DETAILS['quarto-corso-effettivo'] = COURSE_DETAILS['quarto-corso-accademico'];
COURSE_DETAILS['primo-corso-preparatorio'] = COURSE_DETAILS['preparatorio-uno'];
COURSE_DETAILS['corsi-perfezionamento'] = COURSE_DETAILS['primo-corso-perfezionamento'];
COURSE_DETAILS['laboratori-esterni-con-discipline-selezionate'] = COURSE_DETAILS['laboratori-esterni'];
COURSE_DETAILS['laboratori-esterni-discipline-selezionate'] = COURSE_DETAILS['laboratori-esterni'];
COURSE_DETAILS['laboratorio-coreografico'] = COURSE_DETAILS['laboratorio-coreografico-contemporaneo'];
COURSE_DETAILS['laboratorio-coreografico-danza-contemporanea'] = COURSE_DETAILS['laboratorio-coreografico-contemporaneo'];
COURSE_DETAILS['corso-teatro-danza'] = COURSE_DETAILS['teatro-danza'];
COURSE_DETAILS['hiphop'] = COURSE_DETAILS['hip-hop'];
COURSE_DETAILS['corso-hip-hop'] = COURSE_DETAILS['hip-hop'];
COURSE_DETAILS['danza-classica'] = COURSE_DETAILS['corso-danza-classica'];
COURSE_DETAILS['danza-moderna'] = COURSE_DETAILS['corso-danza-moderna'];
COURSE_DETAILS['danza-contemporanea'] = COURSE_DETAILS['corso-danza-contemporanea'];
COURSE_DETAILS['ginnastica-posturale'] = COURSE_DETAILS['corso-ginnastica-posturale'];
COURSE_DETAILS['ginnastica-posturale-adulti'] = COURSE_DETAILS['corso-ginnastica-posturale'];

function initCourseModal() {
  const modal = document.getElementById('courseModal');
  const modalBody = document.getElementById('courseModalContent');
  const closeBtn = document.getElementById('modalCloseBtn');
  const detailBtns = document.querySelectorAll('.open-course-modal');

  if (!modal || !modalBody) return;

  // Open modal when clicking "Dettagli & Requisiti"
  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseId = btn.getAttribute('data-course');
      const data = COURSE_DETAILS[courseId];

      if (data) {
        modalBody.innerHTML = `
          ${data.image ? `
            <div style="margin-bottom: 1.4rem; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); background: #0d1017; display: flex; justify-content: center; align-items: center; box-shadow: 0 6px 20px rgba(0,0,0,0.35);">
              <img src="${data.image}" alt="${data.title}" style="max-width: 100%; max-height: 480px; width: auto; height: auto; object-fit: contain; display: block;">
            </div>
          ` : ''}
          <div style="margin-bottom: 1.2rem;">
            <span class="subtitle-badge" style="margin-bottom: 0.5rem;">${data.category}</span>
            <h2 style="font-size: 1.8rem; color: #FFF; margin-bottom: 0.3rem;">${data.title}</h2>
            <p style="color: var(--gold-400); font-weight: 600; font-size: 0.95rem;">${data.age} • ${data.frequency}</p>
          </div>
          <div style="margin-bottom: 1.4rem;">
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.95rem;">${data.description}</p>
          </div>
          <div style="background: rgba(10, 12, 16, 0.6); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.4rem;">
            <h4 style="font-size: 1rem; color: var(--gold-300); margin-bottom: 0.6rem;">Obiettivi Didattici:</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.45rem;">
              ${data.objectives.map(obj => `<li style="font-size: 0.88rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 0.5rem;"><span style="color: var(--gold-400);">✦</span> ${obj}</li>`).join('')}
            </ul>
          </div>
          <div style="margin-bottom: 1.6rem;">
            <h5 style="font-size: 0.88rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.3rem;">Docente / Guida:</h5>
            <p style="font-size: 0.92rem; color: #FFF;">${data.teacher}</p>
            <h5 style="font-size: 0.88rem; text-transform: uppercase; color: var(--text-muted); margin-top: 0.8rem; margin-bottom: 0.3rem;">Abbigliamento Consigliato:</h5>
            <p style="font-size: 0.88rem; color: var(--text-secondary);">${data.attire}</p>
          </div>
          <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
            <a href="#prenota" class="btn btn-gold" onclick="selectCourseInBooking('${data.title}')">
              Prenota Prova Gratuita
            </a>
            <button class="btn btn-glass" onclick="document.getElementById('courseModal').classList.remove('active')">
              Chiudi
            </button>
          </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Also open modal when clicking course card thumbnail
  const courseCards = document.querySelectorAll('.course-card');
  courseCards.forEach(card => {
    const thumb = card.querySelector('.course-thumb');
    const modalBtn = card.querySelector('.open-course-modal');
    if (thumb && modalBtn) {
      thumb.addEventListener('click', () => {
        modalBtn.click();
      });
      thumb.setAttribute('title', 'Clicca per visualizzare la locandina completa e i dettagli');
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

window.selectCourseInBooking = function(courseName) {
  const modal = document.getElementById('courseModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  const selectElem = document.getElementById('corsoSelect');
  if (selectElem) {
    for (let i = 0; i < selectElem.options.length; i++) {
      if (selectElem.options[i].text.toLowerCase().includes(courseName.toLowerCase()) || courseName.toLowerCase().includes(selectElem.options[i].text.toLowerCase())) {
        selectElem.selectedIndex = i;
        break;
      }
    }
  }
  const prenotaSec = document.getElementById('prenota');
  if (prenotaSec) {
    prenotaSec.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   5. TIMETABLE SCHEDULE TABS & PRINT
   ========================================================================== */
const SCHEDULE_DATA = {
  lunedi: [
    { time: '16:00 - 17:00', course: 'Gioco Danza', level: 'Infanzia (3-5 anni)', teacher: 'Melania Gamarro' },
    { time: '17:00 - 18:00', course: '1° e 2° Corso Preparatorio classico', level: 'Propedeutica & Tecnica Classica (6-8 anni)', teacher: 'Melania Gamarro' },
    { time: '18:00 - 19:30', course: 'Primo corso classico', level: '1° Anno Accademico', teacher: 'Melania Gamarro' },
    { time: '19:30 - 21:00', course: 'Terzo corso classico', level: 'Tecnica Accademica & Sbarra', teacher: 'Melania Gamarro' }
  ],
  martedi: [
    { time: '16:00 - 17:00', course: 'Propedeutico classico', level: 'Propedeutica Classica (5-6 anni)', teacher: 'Docente Accademico' },
    { time: '17:00 - 18:00', course: '3° e 4° Corso Preparatorio contemporaneo', level: 'Danza Contemporanea (8-11 anni)', teacher: 'Docente Contemporaneo' },
    { time: '18:00 - 19:00', course: 'Primo corso contemporaneo', level: 'Contemporaneo & Floorwork', teacher: 'Docente Contemporaneo' },
    { time: '19:00 - 20:30', course: 'Terzo corso contemporaneo', level: 'Release Technique & Dinamica', teacher: 'Docente Contemporaneo' }
  ],
  mercoledi: [
    { time: '16:00 - 17:00', course: 'Gioco Danza', level: 'Infanzia (3-5 anni)', teacher: 'Melania Gamarro' },
    { time: '17:00 - 18:00', course: '1° e 2° Corso Preparatorio classico', level: 'Propedeutica & Tecnica Classica (6-8 anni)', teacher: 'Melania Gamarro' },
    { time: '18:00 - 19:30', course: '3° e 4° Corso Preparatorio classico', level: 'Tecnica Classica (8-11 anni)', teacher: 'Melania Gamarro' },
    { time: '19:30 - 20:30', course: 'Terzo corso classico', level: 'Tecnica Classica Avanzata', teacher: 'Melania Gamarro' },
    { time: '20:30 - 21:30', course: 'Punte', level: 'Tecnica Punte & Centro', teacher: 'Melania Gamarro' }
  ],
  giovedi: [
    { time: '16:00 - 17:00', course: 'Propedeutico classico', level: 'Propedeutica Classica (5-6 anni)', teacher: 'Docente Accademico' },
    { time: '17:00 - 18:00', course: '1° e 2° Corso Preparatorio moderno', level: 'Modern Dance (6-8 anni)', teacher: 'Eliana Oliva' },
    { time: '18:00 - 19:00', course: '3° e 4° Corso Preparatorio moderno', level: 'Modern Dance (8-11 anni)', teacher: 'Eliana Oliva' },
    { time: '19:00 - 20:00', course: 'Primo corso moderno', level: 'Modern Jazz & Lyrical', teacher: 'Eliana Oliva' },
    { time: '20:00 - 21:30', course: 'Terzo corso moderno', level: 'Modern Avanzato & Coreografia', teacher: 'Eliana Oliva' }
  ],
  venerdi: [
    { time: '16:00 - 17:00', course: 'Propedeutico moderno', level: 'Propedeutica Moderna (5-6 anni)', teacher: 'Eliana Oliva' },
    { time: '17:00 - 18:00', course: '3° e 4° Corso Preparatorio classico', level: 'Sbarra & Centro Classico (8-11 anni)', teacher: 'Melania Gamarro' },
    { time: '18:00 - 20:00', course: 'Primo corso classico', level: 'Sbarra, Centro & Salto', teacher: 'Melania Gamarro' },
    { time: '20:00 - 21:30', course: 'Lezione extra di perfezionamento per il gruppo di avviamento professionale', level: 'Alta Formazione & Concorsi', teacher: 'Melania Gamarro / Direzione Artistica' }
  ],
  sabato: [
    { time: '15:00 - 16:00', course: 'Preparazione fisica', level: 'Core Stability, Postura & Potenziamento', teacher: 'Carmine Colombo & Melania Gamarro' },
    { time: '16:00 - 17:00', course: 'Hip Hop', level: 'Urban Dance & Grooves', teacher: 'Docente Hip Hop' },
    { time: '17:00 - 18:30', course: 'Laboratori', level: 'Discipline Selezionate & Masterclass', teacher: 'Docenti Ospiti' },
    { time: 'Su Appuntamento', course: 'Lezioni private', level: 'Esclusivamente su appuntamento', teacher: 'Direzione Artistica' }
  ]
};

function initScheduleTabs() {
  const tabs = document.querySelectorAll('.schedule-tab');
  const tbody = document.getElementById('scheduleTableBody');
  const printBtn = document.getElementById('printScheduleBtn');

  function renderDay(dayKey) {
    if (!tbody) return;
    const items = SCHEDULE_DATA[dayKey] || [];
    tbody.innerHTML = items.map(item => `
      <tr>
        <td><span class="time-pill">${item.time}</span></td>
        <td><strong style="color: #FFF;">${item.course}</strong></td>
        <td><span style="color: var(--gold-300);">${item.level}</span></td>
        <td>${item.teacher}</td>
      </tr>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const day = tab.getAttribute('data-day');
      renderDay(day);
    });
  });

  // Render initial (lunedi)
  renderDay('lunedi');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Lightbox trigger for official timetable poster
  const posterTrigger = document.getElementById('openPosterLightbox');
  const posterZoomBtn = document.getElementById('btnZoomPoster');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaptionText');

  function openPosterModal() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.add('is-single');
    lightboxImg.src = 'assets/images/orario_settimanale_ufficiale.jpg';
    lightboxImg.alt = 'Orario Settimanale Ufficiale - Il Balletto Jonico';
    if (lightboxCaption) {
      lightboxCaption.style.display = 'block';
      lightboxCaption.innerHTML = '<strong>Orario Settimanale Ufficiale</strong> — <span style="color: var(--gold-400);">Anno Accademico 2026/2027</span>';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (posterTrigger) posterTrigger.addEventListener('click', openPosterModal);
  if (posterZoomBtn) posterZoomBtn.addEventListener('click', openPosterModal);
}

/* ==========================================================================
   6. GALLERY MINI HUB & FULLSCREEN LIGHTBOX
   ========================================================================== */
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaptionText');
  const lightboxClose = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxCounter = document.getElementById('lightboxCounterBadge');

  const galleryFilterBtns = document.querySelectorAll('[data-gallery-filter]');
  const hubCards = document.querySelectorAll('[data-hub-target]');
  const hubStatusText = document.getElementById('hubStatusText');
  const hubResetBtn = document.getElementById('hubResetBtn');
  const galleryGrid = document.getElementById('galleryGrid');

  let currentFilter = 'all';
  let currentActiveIndex = 0;

  // Funzione unificata di attivazione filtro per il Mini Hub
  function applyGalleryFilter(filter, shouldScroll = false) {
    currentFilter = filter;

    // Aggiorna bottoni tabs
    galleryFilterBtns.forEach(btn => {
      const btnFilter = btn.getAttribute('data-gallery-filter');
      btn.classList.toggle('active', btnFilter === filter);
    });

    // Aggiorna stato attivo sulle Hub Cards
    hubCards.forEach(card => {
      const target = card.getAttribute('data-hub-target');
      card.classList.toggle('active', target === filter);
    });

    // Aggiorna testo di stato e visibilità del pulsante reset
    if (hubStatusText) {
      if (filter === 'spettacoli') {
        hubStatusText.innerHTML = '<strong>Mini Hub Spettacoli:</strong> visualizzazione di 34 scatti di scena al Teatro Orfeo e rassegne teatrali';
      } else if (filter === 'shooting') {
        hubStatusText.innerHTML = '<strong>Mini Hub Shooting:</strong> visualizzazione di 23 scatti di posa e ritratti d\'autore';
      } else if (filter === 'in-sala') {
        hubStatusText.innerHTML = '<strong>Mini Hub In Sala:</strong> visualizzazione di 3 scatti di studio tecnico alla sbarra e propedeutica in accademia';
      } else {
        hubStatusText.textContent = 'Archivio Completo: visualizzazione di tutti i 60 scatti';
      }
    }

    if (hubResetBtn) {
      hubResetBtn.style.display = filter === 'all' ? 'none' : 'inline-flex';
    }

    // Filtra le tessere fotografiche
    galleryItems.forEach(card => {
      const cat = card.getAttribute('data-gallery-category') || '';
      if (filter === 'all' || cat === filter) {
        card.style.display = 'block';
        card.classList.remove('animate-fade-in');
        // Trigger reflow for clean restart of fade animation
        void card.offsetWidth;
        card.classList.add('animate-fade-in');
      } else {
        card.style.display = 'none';
        card.classList.remove('animate-fade-in');
      }
    });

    // Scroll fluido alla griglia foto se richiesto (es. click su card hub)
    if (shouldScroll && galleryGrid) {
      const navOffset = 90;
      const elementPosition = galleryGrid.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  }

  // Listener per bottoni tabs di filtro
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-gallery-filter');
      applyGalleryFilter(filter, false);
    });
  });

  // Listener per le due Hub Cards interattive
  hubCards.forEach(card => {
    const target = card.getAttribute('data-hub-target');

    card.addEventListener('click', () => {
      // Se già attivo, mostra tutte; altrimenti attiva la categoria
      const isAlreadyActive = card.classList.contains('active');
      applyGalleryFilter(isAlreadyActive ? 'all' : target, true);
    });

    // Supporto accessibilità tastiera (Enter / Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isAlreadyActive = card.classList.contains('active');
        applyGalleryFilter(isAlreadyActive ? 'all' : target, true);
      }
    });
  });

  // Reset button listener
  if (hubResetBtn) {
    hubResetBtn.addEventListener('click', () => {
      applyGalleryFilter('all', false);
    });
  }

  // ==========================================================================
  // Gestione Lightbox Fullscreen & Navigazione Scorrevole con Tasti Digitali
  // ==========================================================================
  if (!lightbox || !lightboxImg) return;

  function getActiveGalleryItems() {
    return Array.from(galleryItems).filter(item => {
      if (currentFilter === 'all') return true;
      return item.getAttribute('data-gallery-category') === currentFilter;
    });
  }

  function showPhotoAtIndex(index, animate = true) {
    const activeList = getActiveGalleryItems();
    if (!activeList || activeList.length === 0) return;

    // Scorrimento circolare continuo (loop)
    if (index < 0) {
      index = activeList.length - 1;
    } else if (index >= activeList.length) {
      index = 0;
    }
    currentActiveIndex = index;

    const targetItem = activeList[index];
    const targetImg = targetItem.querySelector('img');
    if (!targetImg) return;

    if (animate) {
      lightboxImg.classList.add('fade-out');
      setTimeout(() => {
        lightboxImg.src = targetImg.src;
        lightboxImg.alt = targetImg.alt || 'Foto Galleria - Il Balletto Jonico';
        lightboxImg.classList.remove('fade-out');
      }, 150);
    } else {
      lightboxImg.src = targetImg.src;
      lightboxImg.alt = targetImg.alt || 'Foto Galleria - Il Balletto Jonico';
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${activeList.length}`;
    }
  }

  // Apertura al click su qualsiasi scheda fotografica
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      lightbox.classList.remove('is-single');
      const activeList = getActiveGalleryItems();
      const idx = activeList.indexOf(item);
      showPhotoAtIndex(idx !== -1 ? idx : 0, false);

      if (lightboxCaption) {
        lightboxCaption.innerHTML = '';
        lightboxCaption.style.display = 'none';
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Listener Tasti Digitali (Precedente e Successiva)
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhotoAtIndex(currentActiveIndex - 1, true);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhotoAtIndex(currentActiveIndex + 1, true);
    });
  }

  // Chiusura del Lightbox
  function closeLightboxModal() {
    lightbox.classList.remove('active');
    lightbox.classList.remove('is-single');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxModal);
  }

  lightbox.addEventListener('click', (e) => {
    // Chiudi cliccando sullo sfondo fuori dal contenitore immagine e dai tasti digitali
    if (e.target === lightbox) {
      closeLightboxModal();
    }
  });

  // Navigazione da tastiera: Frecce Destra / Sinistra per scorrere, Esc per chiudere
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightboxModal();
    } else if (e.key === 'ArrowLeft' && !lightbox.classList.contains('is-single')) {
      e.preventDefault();
      showPhotoAtIndex(currentActiveIndex - 1, true);
    } else if (e.key === 'ArrowRight' && !lightbox.classList.contains('is-single')) {
      e.preventDefault();
      showPhotoAtIndex(currentActiveIndex + 1, true);
    }
  });

  // Supporto Gesture Swipe per smartphone e tablet
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  lightbox.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (!lightbox.classList.contains('is-single')) {
          if (diffX > 0) {
            // Swipe verso destra -> foto precedente
            showPhotoAtIndex(currentActiveIndex - 1, true);
          } else {
            // Swipe verso sinistra -> foto successiva
            showPhotoAtIndex(currentActiveIndex + 1, true);
          }
        }
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const answer = item.querySelector('.faq-answer');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   8. FREE TRIAL BOOKING FORM & WHATSAPP GENERATOR
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('bookingTrialForm');
  const successBanner = document.getElementById('bookingSuccessBanner');
  const whatsappSendBtn = document.getElementById('whatsappDirectBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = document.getElementById('allievoNome').value.trim();
    const studentAge = document.getElementById('allievoEta').value.trim();
    const parentName = document.getElementById('genitoreNome').value.trim();
    const phone = document.getElementById('telefono').value.trim();
    const course = document.getElementById('corsoSelect').value;
    const preferredDay = document.getElementById('giornoSelect').value;
    const notes = document.getElementById('note').value.trim();

    // Compose formatted WhatsApp message
    let waText = `*PRENOTAZIONE LEZIONE DI PROVA GRATUITA*%0A`;
    waText += `*Scuola:* Il Balletto Jonico (Massafra)%0A`;
    waText += `-----------------------------%0A`;
    waText += `*Allievo/a:* ${encodeURIComponent(studentName)} (${encodeURIComponent(studentAge)} anni)%0A`;
    if (parentName) waText += `*Genitore/Referente:* ${encodeURIComponent(parentName)}%0A`;
    waText += `*Telefono:* ${encodeURIComponent(phone)}%0A`;
    waText += `*Corso scelto:* ${encodeURIComponent(course)}%0A`;
    waText += `*Giorno preferito:* ${encodeURIComponent(preferredDay)}%0A`;
    if (notes) waText += `*Note:* ${encodeURIComponent(notes)}%0A`;
    waText += `-----------------------------%0A`;
    waText += `Desidero confermare la disponibilità per una lezione di prova gratuita. Grazie!`;

    // WhatsApp School link
    // Standard international format for Italy (+39)
    const schoolWhatsappUrl = `https://wa.me/393275859649?text=${waText}`;

    if (whatsappSendBtn) {
      whatsappSendBtn.href = schoolWhatsappUrl;
    }

    // Hide form inputs or show success banner
    successBanner.classList.add('active');
    successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ==========================================================================
   9. INTERACTIVE MAP
   ========================================================================== */
function initMap() {
  // La mappa di Google Maps è caricata direttamente tramite iframe ad alta affidabilità
  // con card di fallback inclusa per navigazione offline.
}

/* ==========================================================================
   10. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

