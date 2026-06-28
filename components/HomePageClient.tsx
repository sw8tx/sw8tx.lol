"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

const primaryEmail = "info@tylerosthoff.xyz";

const languageOptions = [
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "es", label: "Espanol", short: "ES" },
  { code: "fr", label: "Francais", short: "FR" },
  { code: "sr", label: "Srpski", short: "SR" },
] as const;
type Locale = (typeof languageOptions)[number]["code"];

function isLocale(value: string | null): value is Locale {
  return languageOptions.some((item) => item.code === value);
}

const floatingLogoSlots = Array.from({ length: 8 }, (_, index) => `float-logo-${index + 1}`);
const heroLogoFallbackBounds = { x: 260, y: 190 };
const heroLogoHoldTime = 680;
const heroLogoStorageKey = "sparkle-hero-logo-position";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getHeroLogoBounds() {
  if (typeof window === "undefined") return heroLogoFallbackBounds;

  return {
    x: Math.max(heroLogoFallbackBounds.x, Math.round(window.innerWidth * 0.43)),
    y: Math.max(heroLogoFallbackBounds.y, Math.round(window.innerHeight * 0.36)),
  };
}

const siteCopy = {
  en: {
    loaderStatus: "Materializing shapes...",
    loaderFooter: "sw8tx.lol - EST 2026",
    languageLabel: "LANGUAGE",
    menuButton: { open: "Menu", close: "Close", openLabel: "Open menu", closeLabel: "Close menu" },
    menuBadge: "Sparkle",
    tabTitles: [
      "Sparkle | Custom Animated Websites",
      "Sparkle | Portfolios That Move",
      "Sparkle | Landing Pages With Soul",
      "Sparkle | Clean Frontend Polish",
    ],
    menuItems: [
      { href: "#about", label: "About" },
      { href: "#process", label: "Process" },
      { href: "#work", label: "Past work" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Contact" },
    ],
    legal: { terms: "Terms", privacy: "Privacy", refund: "Refund" },
    hero: {
      eyebrow: "Web design and frontend",
      title: "Sparkle",
      credit: "by Tyler Osthoff - Web Design & Frontend",
      tagline: "Websites with soul",
      text:
        "Customized animated portfolios, landing pages and brand sites for people who see a website as an investment in presence, trust and momentum.",
      ctaPrimary: "Start a project",
      ctaSecondary: "Past work",
      scroll: "Scroll",
      cards: [
        {
          action: "Show next detail",
          variants: [
            {
              label: "Animated portfolios",
              title: "Essential presence",
              body: "A stronger first screen, careful pacing and limited motion that makes the brand feel alive.",
            },
            {
              label: "Signature projects",
              title: "Built like a signature",
              body: "Project sections, hover moments and scroll rhythm designed around your actual work.",
            },
          ],
        },
        {
          action: "Show next detail",
          variants: [
            {
              label: "Landing pages",
              title: "Pages that sell the vibe",
              body: "Clear sections, customized visual direction and frontend polish that stays smooth on mobile.",
            },
            {
              label: "Launch investment",
              title: "Smooth before people scroll",
              body: "Fast first loads, responsive spacing and motion that feels intentional instead of heavy.",
            },
          ],
        },
      ],
    },
    marqueeIntro: "A calm studio site can still feel alive. This is the mix I build around.",
    marqueeRows: [
      ["Recent projects", "Portfolio refresh", "Landing pages", "Brand sites"],
      ["Clean frontend", "Smooth motion", "Responsive polish", "Custom visuals"],
      ["First impression", "Past work", "Launch pages", "Creator sites"],
    ],
    about: {
      label: "About",
      title: "A stronger first impression starts with design choices that feel intentional.",
      text:
        "Sparkle sits between design and frontend, so the concept and the actual build stay in sync. The result is cleaner structure, better mobile behavior, smoother motion and a site that feels genuinely customized.",
    },
    process: {
      label: "Process",
      title: "Sharp design, clean code, smooth motion.",
      items: [
        {
          num: "01",
          title: "Direction before decoration",
          body: "We define the brand feeling, references and hierarchy first, so the design has a clear point of view from the beginning.",
        },
        {
          num: "02",
          title: "Design that feels owned",
          body: "Layouts, type rhythm and supporting visuals are built around the brand instead of looking borrowed from a generic template.",
        },
        {
          num: "03",
          title: "Clean build and polish",
          body: "Responsive frontend, controlled motion and final spacing passes keep the site sharp on desktop and mobile.",
        },
      ],
    },
    work: {
      label: "Past work",
      title: "Selected directions for brands that need more presence online.",
      items: [
        {
          title: "Nova Studio",
          category: "Creative portfolio",
          summary:
            "A calmer studio site with bigger type, stronger project framing and motion that feels expensive instead of busy.",
        },
        {
          title: "Orbis Homes",
          category: "Brand landing page",
          summary:
            "A launch page focused on clear messaging, cleaner content flow and a more premium investment path.",
        },
        {
          title: "Axis Club",
          category: "Personal brand site",
          summary:
            "A custom portfolio system for a creator who needed a stronger online presence without fake tech styling.",
        },
      ],
    },
    reviews: {
      label: "Feedback",
      title: "What people tend to notice first.",
      score: "Client feedback",
      previous: "Previous review",
      next: "Next review",
      starsLabel: "{rating} out of 5 stars",
      items: [
        {
          name: "Liam S.",
          rating: 5,
          text: "The site finally looked custom instead of looking like it came from a trendy template folder.",
        },
        {
          name: "Maya R.",
          rating: 5,
          text: "What changed most was the first impression. It felt professional before people even started reading.",
        },
        {
          name: "Noah K.",
          rating: 4,
          text: "The motion added confidence to the brand instead of trying to be the whole brand.",
        },
        {
          name: "Elena V.",
          rating: 5,
          text: "The layout feels calm, but still has enough movement to make the brand feel alive.",
        },
        {
          name: "Jonas M.",
          rating: 4,
          text: "It finally works on mobile without feeling like the desktop version was squeezed down.",
        },
        {
          name: "Ava P.",
          rating: 5,
          text: "The new direction made the project look more premium without making it complicated.",
        },
        {
          name: "Theo B.",
          rating: 3,
          text: "The structure got much clearer. People understood what I do faster.",
        },
        {
          name: "Sofia L.",
          rating: 5,
          text: "The page has personality now. It feels designed instead of assembled.",
        },
        {
          name: "Milan C.",
          rating: 4,
          text: "The loading and scroll moments made the whole site feel smoother and more intentional.",
        },
        {
          name: "Nina H.",
          rating: 5,
          text: "It gave the brand a stronger online presence without losing the personal feel.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "If your site feels generic, we can fix the first impression.",
      text:
        "Send a short note with what you are building and what currently feels off. I will come back with a direction that feels sharper and more custom.",
      emailLabel: "Email",
    },
  },
  de: {
    loaderStatus: "Formen entstehen...",
    loaderFooter: "sw8tx.lol - EST 2026",
    languageLabel: "SPRACHE",
    menuButton: {
      open: "Menue",
      close: "Schliessen",
      openLabel: "Menue oeffnen",
      closeLabel: "Menue schliessen",
    },
    menuBadge: "Sparkle",
    tabTitles: [
      "Sparkle | Custom animierte Websites",
      "Sparkle | Portfolios mit Motion",
      "Sparkle | Landingpages mit Charakter",
      "Sparkle | Sauberer Frontend-Polish",
    ],
    menuItems: [
      { href: "#about", label: "Ueberblick" },
      { href: "#process", label: "Prozess" },
      { href: "#work", label: "Past work" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Kontakt" },
    ],
    legal: { terms: "AGB", privacy: "Datenschutz", refund: "Rueckerstattung" },
    hero: {
      eyebrow: "Webdesign und Frontend",
      title: "Sparkle",
      credit: "by Tyler Osthoff - Webdesign & Frontend",
      tagline: "Websites mit Charakter",
      text:
        "Individuell animierte Portfolios, Landingpages und Brand-Sites fuer Menschen, die ihre Website als Investment in Wirkung, Vertrauen und Momentum sehen.",
      ctaPrimary: "Projekt starten",
      ctaSecondary: "Arbeiten",
      scroll: "Scroll",
      cards: [
        {
          action: "Naechstes Detail zeigen",
          variants: [
            {
              label: "Animierte Portfolios",
              title: "Praesenz mit Substanz",
              body: "Ein staerkerer First Screen, sauberer Rhythmus und gezielte Motion, die die Marke lebendig macht.",
            },
            {
              label: "Signature Projekte",
              title: "Gebaut wie eine Signatur",
              body: "Projektbereiche, Hover-Momente und Scroll-Rhythmus, die um deine echten Arbeiten gebaut sind.",
            },
          ],
        },
        {
          action: "Naechstes Detail zeigen",
          variants: [
            {
              label: "Landingpages",
              title: "Seiten, die den Vibe verkaufen",
              body: "Klare Sections, individuelle visuelle Richtung und Frontend-Polish, der auch mobil ruhig bleibt.",
            },
            {
              label: "Launch Investment",
              title: "Smooth bevor man scrollt",
              body: "Schnelle First Loads, responsive Abstaende und Motion, die bewusst statt schwer wirkt.",
            },
          ],
        },
      ],
    },
    marqueeIntro: "Eine ruhige Studio-Seite kann trotzdem lebendig wirken. Darum dreht sich mein Build.",
    marqueeRows: [
      ["Aktuelle Projekte", "Portfolio Refresh", "Landingpages", "Brand Sites"],
      ["Sauberes Frontend", "Smooth Motion", "Responsive Polish", "Custom Visuals"],
      ["Erster Eindruck", "Past Work", "Launch Pages", "Creator Sites"],
    ],
    about: {
      label: "Ueberblick",
      title: "Ein starker erster Eindruck beginnt mit Designentscheidungen, die bewusst wirken.",
      text:
        "Sparkle sitzt zwischen Design und Frontend, damit Konzept und echter Build zusammenpassen. Das Ergebnis ist klarere Struktur, besseres Mobile-Verhalten, ruhigere Motion und eine Seite, die wirklich customized wirkt.",
    },
    process: {
      label: "Prozess",
      title: "Scharfes Design, sauberer Code, weiche Motion.",
      items: [
        {
          num: "01",
          title: "Richtung vor Deko",
          body: "Wir definieren zuerst Markenwirkung, Referenzen und visuelle Hierarchie, damit das Design von Anfang an eine klare Haltung hat.",
        },
        {
          num: "02",
          title: "Design, das sich eigen anfuehlt",
          body: "Layout, Typorhythmus und unterstuetzende Visuals werden um die Marke herum gebaut und nicht aus einem generischen Template geliehen.",
        },
        {
          num: "03",
          title: "Sauber bauen und polieren",
          body: "Responsives Frontend, kontrollierte Motion und finale Spacing-Paesse halten die Seite auf Desktop und Mobile stark.",
        },
      ],
    },
    work: {
      label: "Past work",
      title: "Ausgewaehlte Richtungen fuer Marken mit Anspruch auf mehr Praesenz online.",
      items: [
        {
          title: "Nova Studio",
          category: "Kreatives Portfolio",
          summary:
            "Eine ruhigere Studio-Site mit groesserer Typografie, staerkerem Projekt-Frame und Motion, die hochwertig statt hektisch wirkt.",
        },
        {
          title: "Orbis Homes",
          category: "Brand-Landingpage",
          summary:
            "Eine Launch-Page mit klarerer Message, saubererem Content-Flow und einem hochwertigeren Investment-Pfad.",
        },
        {
          title: "Axis Club",
          category: "Personal Brand Site",
          summary:
            "Ein custom Portfolio-System fuer einen Creator, der online staerker auftreten wollte, ohne Fake-Tech-Look.",
        },
      ],
    },
    reviews: {
      label: "Feedback",
      title: "Was Menschen meistens sofort bemerken.",
      score: "Kundenfeedback",
      previous: "Vorherige Review",
      next: "Naechste Review",
      starsLabel: "{rating} von 5 Sternen",
      items: [
        {
          name: "Liam S.",
          rating: 5,
          text: "Die Seite sah endlich custom aus und nicht mehr wie aus einem trendigen Template-Ordner.",
        },
        {
          name: "Maya R.",
          rating: 5,
          text: "Am meisten veraendert hat sich der erste Eindruck. Es wirkte professionell, bevor man viel gelesen hat.",
        },
        {
          name: "Noah K.",
          rating: 4,
          text: "Die Motion hat der Marke Selbstbewusstsein gegeben, statt selbst die ganze Marke sein zu wollen.",
        },
        {
          name: "Elena V.",
          rating: 5,
          text: "Das Layout wirkt ruhig, aber hat genug Bewegung, damit die Marke lebendig wirkt.",
        },
        {
          name: "Jonas M.",
          rating: 4,
          text: "Mobil funktioniert es endlich, ohne wie eine zusammengedrueckte Desktop-Seite zu wirken.",
        },
        {
          name: "Ava P.",
          rating: 5,
          text: "Die neue Richtung wirkt hochwertiger, ohne unnoetig kompliziert zu werden.",
        },
        {
          name: "Theo B.",
          rating: 3,
          text: "Die Struktur ist viel klarer geworden. Menschen verstehen schneller, was ich mache.",
        },
        {
          name: "Sofia L.",
          rating: 5,
          text: "Die Seite hat jetzt Persoenlichkeit. Sie wirkt gestaltet statt nur zusammengebaut.",
        },
        {
          name: "Milan C.",
          rating: 4,
          text: "Loading und Scroll-Momente lassen alles deutlich smoother und bewusster wirken.",
        },
        {
          name: "Nina H.",
          rating: 5,
          text: "Die Marke wirkt online staerker, ohne den persoenlichen Charakter zu verlieren.",
        },
      ],
    },
    contact: {
      label: "Kontakt",
      title: "Wenn deine Seite generisch wirkt, koennen wir den ersten Eindruck fixen.",
      text:
        "Schick eine kurze Nachricht mit dem, was du baust, und was sich aktuell falsch anfuehlt. Ich komme dann mit einer Richtung zurueck, die schaerfer und custom wirkt.",
      emailLabel: "E-Mail",
    },
  },
} as const;

const localizedCopy = {
  en: siteCopy.en,
  de: siteCopy.de,
  es: {
    ...siteCopy.en,
    loaderStatus: "Creando formas...",
    languageLabel: "IDIOMA",
    menuButton: { open: "Menu", close: "Cerrar", openLabel: "Abrir menu", closeLabel: "Cerrar menu" },
    menuItems: [
      { href: "#about", label: "Sobre" },
      { href: "#process", label: "Proceso" },
      { href: "#work", label: "Trabajo" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Contacto" },
    ],
    legal: { terms: "Terminos", privacy: "Privacidad", refund: "Reembolso" },
    hero: {
      ...siteCopy.en.hero,
      eyebrow: "Diseno web y frontend",
      tagline: "Websites con alma",
      text:
        "Portfolios animados, landing pages y sitios de marca hechos a medida para personas que ven su web como una inversion en presencia, confianza y momentum.",
      ctaPrimary: "Iniciar proyecto",
      ctaSecondary: "Trabajos",
      cards: [
        {
          action: "Mostrar siguiente detalle",
          variants: [
            {
              label: "Portfolios animados",
              title: "Presencia esencial",
              body: "Un first screen mas fuerte, ritmo cuidado y motion limitada que hace que la marca se sienta viva.",
            },
            {
              label: "Proyectos signature",
              title: "Construido como una firma",
              body: "Secciones de proyecto, hover moments y ritmo de scroll disenados alrededor de tu trabajo real.",
            },
          ],
        },
        {
          action: "Mostrar siguiente detalle",
          variants: [
            {
              label: "Landing pages",
              title: "Paginas que venden el vibe",
              body: "Secciones claras, direccion visual custom y polish frontend que se mantiene suave en mobile.",
            },
            {
              label: "Launch investment",
              title: "Smooth antes del scroll",
              body: "First loads rapidos, spacing responsive y motion que se siente intencional, no pesada.",
            },
          ],
        },
      ],
    },
    marqueeIntro: "Un sitio de estudio tranquilo tambien puede sentirse vivo. Esta es la mezcla que construyo.",
    marqueeRows: [
      ["Proyectos recientes", "Refresh de portfolio", "Landing pages", "Sitios de marca"],
      ["Frontend limpio", "Motion suave", "Responsive polish", "Visuales custom"],
      ["Primera impresion", "Trabajos", "Launch pages", "Sitios de creator"],
    ],
    about: {
      ...siteCopy.en.about,
      label: "Sobre",
      title: "Una primera impresion fuerte empieza con decisiones de diseno intencionales.",
      text:
        "Sparkle une diseno y frontend para que el concepto y el build real se mantengan alineados. El resultado es estructura mas clara, mejor comportamiento mobile, motion mas suave y una web que se siente realmente custom.",
    },
    process: {
      label: "Proceso",
      title: "Diseno preciso, codigo limpio, motion suave.",
      items: [
        {
          num: "01",
          title: "Direccion antes de decoracion",
          body: "Definimos primero el feeling de marca, referencias y jerarquia para que el diseno tenga una postura clara desde el inicio.",
        },
        {
          num: "02",
          title: "Diseno que se siente propio",
          body: "Layouts, ritmo tipografico y visuales se construyen alrededor de la marca, no desde un template generico.",
        },
        {
          num: "03",
          title: "Build limpio y polish",
          body: "Frontend responsive, motion controlada y ajustes finales de spacing mantienen el sitio fuerte en desktop y mobile.",
        },
      ],
    },
    work: {
      label: "Trabajos",
      title: "Direcciones seleccionadas para marcas que necesitan mas presencia online.",
      items: [
        {
          title: "Nova Studio",
          category: "Portfolio creativo",
          summary:
            "Un sitio de estudio mas calmado con tipografia grande, mejor framing de proyectos y motion que se siente premium.",
        },
        {
          title: "Orbis Homes",
          category: "Landing de marca",
          summary:
            "Una launch page enfocada en mensaje claro, flujo de contenido limpio y una ruta de inversion mas premium.",
        },
        {
          title: "Axis Club",
          category: "Personal brand site",
          summary:
            "Un sistema de portfolio custom para un creator que necesitaba mas presencia online sin fake tech styling.",
        },
      ],
    },
    reviews: {
      ...siteCopy.en.reviews,
      label: "Feedback",
      title: "Lo que la gente suele notar primero.",
      score: "Feedback de clientes",
      previous: "Review anterior",
      next: "Siguiente review",
      starsLabel: "{rating} de 5 estrellas",
      items: [
        { name: "Liam S.", rating: 5, text: "El sitio por fin se veia custom, no como salido de una carpeta de templates trendy." },
        { name: "Maya R.", rating: 5, text: "Lo que mas cambio fue la primera impresion. Se sentia profesional antes de leer mucho." },
        { name: "Noah K.", rating: 4, text: "La motion le dio confianza a la marca sin intentar ser toda la marca." },
        { name: "Elena V.", rating: 5, text: "El layout se siente calmado, pero con suficiente movimiento para que la marca viva." },
        { name: "Jonas M.", rating: 4, text: "Por fin funciona en mobile sin sentirse como una version desktop apretada." },
        { name: "Ava P.", rating: 5, text: "La nueva direccion hizo que el proyecto se vea mas premium sin complicarlo." },
        { name: "Theo B.", rating: 3, text: "La estructura quedo mucho mas clara. La gente entiende mas rapido que hago." },
        { name: "Sofia L.", rating: 5, text: "La pagina ahora tiene personalidad. Se siente disenada, no solo ensamblada." },
        { name: "Milan C.", rating: 4, text: "El loading y los scroll moments hacen que todo se sienta mas suave e intencional." },
        { name: "Nina H.", rating: 5, text: "Le dio a la marca mas presencia online sin perder el toque personal." },
      ],
    },
    contact: {
      ...siteCopy.en.contact,
      label: "Contacto",
      title: "Si tu sitio se siente generico, podemos arreglar la primera impresion.",
      text:
        "Manda una nota corta con lo que estas construyendo y lo que ahora se siente mal. Te devuelvo una direccion mas precisa y custom.",
      emailLabel: "Email",
    },
  },
  fr: {
    ...siteCopy.en,
    loaderStatus: "Les formes prennent vie...",
    languageLabel: "LANGUE",
    menuButton: { open: "Menu", close: "Fermer", openLabel: "Ouvrir le menu", closeLabel: "Fermer le menu" },
    menuItems: [
      { href: "#about", label: "A propos" },
      { href: "#process", label: "Process" },
      { href: "#work", label: "Travaux" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Contact" },
    ],
    legal: { terms: "Conditions", privacy: "Privacy", refund: "Remboursement" },
    hero: {
      ...siteCopy.en.hero,
      eyebrow: "Web design et frontend",
      tagline: "Websites avec du caractere",
      text:
        "Portfolios animes, landing pages et sites de marque sur mesure pour celles et ceux qui voient leur site comme un investissement en presence, confiance et momentum.",
      ctaPrimary: "Lancer un projet",
      ctaSecondary: "Travaux",
      cards: [
        {
          action: "Afficher le detail suivant",
          variants: [
            {
              label: "Portfolios animes",
              title: "Presence essentielle",
              body: "Un first screen plus fort, un rythme soigne et une motion limitee qui rend la marque vivante.",
            },
            {
              label: "Projets signature",
              title: "Construit comme une signature",
              body: "Sections projet, hover moments et rythme de scroll concus autour de ton vrai travail.",
            },
          ],
        },
        {
          action: "Afficher le detail suivant",
          variants: [
            {
              label: "Landing pages",
              title: "Pages qui vendent le vibe",
              body: "Sections claires, direction visuelle custom et polish frontend qui reste fluide sur mobile.",
            },
            {
              label: "Launch investment",
              title: "Smooth avant le scroll",
              body: "First loads rapides, spacing responsive et motion intentionnelle plutot que lourde.",
            },
          ],
        },
      ],
    },
    marqueeIntro: "Un site studio calme peut quand meme sembler vivant. C'est le mix que je construis.",
    marqueeRows: [
      ["Projets recents", "Refresh portfolio", "Landing pages", "Sites de marque"],
      ["Frontend propre", "Motion fluide", "Responsive polish", "Visuels custom"],
      ["Premiere impression", "Travaux", "Launch pages", "Sites creator"],
    ],
    about: {
      ...siteCopy.en.about,
      label: "A propos",
      title: "Une premiere impression forte commence avec des choix de design intentionnels.",
      text:
        "Sparkle relie design et frontend pour garder le concept et le build reel synchronises. Le resultat: structure plus claire, meilleur comportement mobile, motion plus douce et un site vraiment custom.",
    },
    process: {
      label: "Process",
      title: "Design net, code propre, motion fluide.",
      items: [
        {
          num: "01",
          title: "Direction avant decoration",
          body: "On definit d'abord le feeling de marque, les references et la hierarchie pour donner au design un point de vue clair.",
        },
        {
          num: "02",
          title: "Un design qui semble propre a la marque",
          body: "Layouts, rythme typographique et visuels sont construits autour de la marque, pas empruntes a un template generique.",
        },
        {
          num: "03",
          title: "Build propre et polish",
          body: "Frontend responsive, motion controlee et derniers ajustements gardent le site net sur desktop et mobile.",
        },
      ],
    },
    work: {
      label: "Travaux",
      title: "Directions selectionnees pour des marques qui veulent plus de presence online.",
      items: [
        {
          title: "Nova Studio",
          category: "Portfolio creatif",
          summary:
            "Un site studio plus calme avec une typo plus grande, un meilleur cadrage projet et une motion premium.",
        },
        {
          title: "Orbis Homes",
          category: "Landing de marque",
          summary:
            "Une launch page centree sur un message clair, un flux plus propre et un parcours d'investissement plus premium.",
        },
        {
          title: "Axis Club",
          category: "Personal brand site",
          summary:
            "Un systeme portfolio custom pour un creator qui voulait une presence plus forte sans fake tech styling.",
        },
      ],
    },
    reviews: {
      ...siteCopy.en.reviews,
      title: "Ce que les gens remarquent souvent en premier.",
      score: "Feedback client",
      previous: "Review precedente",
      next: "Review suivante",
      starsLabel: "{rating} sur 5 etoiles",
      items: [
        { name: "Liam S.", rating: 5, text: "Le site avait enfin l'air custom, pas sorti d'un dossier de templates tendance." },
        { name: "Maya R.", rating: 5, text: "Ce qui a le plus change, c'est la premiere impression. C'etait pro avant meme de lire." },
        { name: "Noah K.", rating: 4, text: "La motion a donne confiance a la marque sans essayer d'etre toute la marque." },
        { name: "Elena V.", rating: 5, text: "Le layout est calme, mais avec assez de mouvement pour rendre la marque vivante." },
        { name: "Jonas M.", rating: 4, text: "Enfin un rendu mobile qui ne ressemble pas a une version desktop compressee." },
        { name: "Ava P.", rating: 5, text: "La nouvelle direction rend le projet plus premium sans le rendre complique." },
        { name: "Theo B.", rating: 3, text: "La structure est beaucoup plus claire. Les gens comprennent plus vite ce que je fais." },
        { name: "Sofia L.", rating: 5, text: "La page a maintenant de la personnalite. Elle semble designee, pas assemblee." },
        { name: "Milan C.", rating: 4, text: "Le loading et les moments de scroll rendent tout plus fluide et intentionnel." },
        { name: "Nina H.", rating: 5, text: "La marque a gagne en presence online sans perdre le cote personnel." },
      ],
    },
    contact: {
      ...siteCopy.en.contact,
      label: "Contact",
      title: "Si ton site semble generique, on peut reparer la premiere impression.",
      text:
        "Envoie une note courte avec ce que tu construis et ce qui semble encore off. Je reviens avec une direction plus nette et plus custom.",
    },
  },
  sr: {
    ...siteCopy.en,
    loaderStatus: "Oblici nastaju...",
    languageLabel: "JEZIK",
    menuButton: { open: "Meni", close: "Zatvori", openLabel: "Otvori meni", closeLabel: "Zatvori meni" },
    menuItems: [
      { href: "#about", label: "O meni" },
      { href: "#process", label: "Proces" },
      { href: "#work", label: "Radovi" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Kontakt" },
    ],
    legal: { terms: "Uslovi", privacy: "Privatnost", refund: "Refund" },
    hero: {
      ...siteCopy.en.hero,
      eyebrow: "Web dizajn i frontend",
      tagline: "Websites sa karakterom",
      text:
        "Custom animirani portfolio sajtovi, landing stranice i brand sajtovi za ljude koji website vide kao investiciju u prisustvo, poverenje i momentum.",
      ctaPrimary: "Pokreni projekat",
      ctaSecondary: "Radovi",
      cards: [
        {
          action: "Prikazi sledeci detalj",
          variants: [
            {
              label: "Animirani portfolio",
              title: "Essential prisustvo",
              body: "Jaci first screen, pazljiv ritam i limited motion koji brend cini zivim.",
            },
            {
              label: "Signature projekti",
              title: "Gradjeno kao potpis",
              body: "Project sekcije, hover momenti i scroll ritam dizajnirani oko tvog stvarnog rada.",
            },
          ],
        },
        {
          action: "Prikazi sledeci detalj",
          variants: [
            {
              label: "Landing stranice",
              title: "Stranice koje prodaju vibe",
              body: "Jasne sekcije, custom vizuelni pravac i frontend polish koji ostaje smooth na mobilnom.",
            },
            {
              label: "Launch investment",
              title: "Smooth pre scrolla",
              body: "Brzi first loads, responsive spacing i motion koji deluje namerno umesto tesko.",
            },
          ],
        },
      ],
    },
    marqueeIntro: "Miran studio sajt i dalje moze da deluje zivo. Oko tog miksa gradim.",
    marqueeRows: [
      ["Novi projekti", "Portfolio refresh", "Landing stranice", "Brand sajtovi"],
      ["Cist frontend", "Smooth motion", "Responsive polish", "Custom vizuali"],
      ["Prvi utisak", "Radovi", "Launch stranice", "Creator sajtovi"],
    ],
    about: {
      ...siteCopy.en.about,
      label: "O meni",
      title: "Jak prvi utisak pocinje od dizajn odluka koje deluju namerno.",
      text:
        "Sparkle spaja dizajn i frontend, tako da koncept i pravi build ostaju uskladjeni. Rezultat je jasnija struktura, bolje mobile ponasanje, mirnija motion animacija i sajt koji stvarno deluje custom.",
    },
    process: {
      label: "Proces",
      title: "Ostar dizajn, cist kod, smooth motion.",
      items: [
        {
          num: "01",
          title: "Pravac pre dekoracije",
          body: "Prvo definisemo osecaj brenda, reference i hijerarhiju, da dizajn od starta ima jasan stav.",
        },
        {
          num: "02",
          title: "Dizajn koji deluje tvoje",
          body: "Layout, tipografski ritam i vizuali grade se oko brenda, umesto da izgledaju pozajmljeno iz genericnog template-a.",
        },
        {
          num: "03",
          title: "Cist build i polish",
          body: "Responsive frontend, kontrolisana motion animacija i finalni spacing drze sajt ostar na desktopu i mobilnom.",
        },
      ],
    },
    work: {
      label: "Radovi",
      title: "Izabrani pravci za brendove kojima treba jace online prisustvo.",
      items: [
        {
          title: "Nova Studio",
          category: "Kreativni portfolio",
          summary:
            "Mirniji studio sajt sa vecom tipografijom, jacim project framingom i motionom koji deluje premium.",
        },
        {
          title: "Orbis Homes",
          category: "Brand landing page",
          summary:
            "Launch page fokusiran na jasnu poruku, cistiji tok sadrzaja i premium investment putanju.",
        },
        {
          title: "Axis Club",
          category: "Personal brand site",
          summary:
            "Custom portfolio sistem za creatora kome je trebalo jace online prisustvo bez fake tech stylinga.",
        },
      ],
    },
    reviews: {
      ...siteCopy.en.reviews,
      title: "Sta ljudi najcesce prvo primete.",
      score: "Feedback klijenata",
      previous: "Prethodni review",
      next: "Sledeci review",
      starsLabel: "{rating} od 5 zvezdica",
      items: [
        { name: "Liam S.", rating: 5, text: "Sajt je konacno izgledao custom, a ne kao iz trendy template foldera." },
        { name: "Maya R.", rating: 5, text: "Najvise se promenio prvi utisak. Delovalo je profesionalno pre nego sto ljudi krenu da citaju." },
        { name: "Noah K.", rating: 4, text: "Motion je brendu dao sigurnost, bez toga da pokusa da bude ceo brend." },
        { name: "Elena V.", rating: 5, text: "Layout deluje mirno, ali ima dovoljno pokreta da brend deluje zivo." },
        { name: "Jonas M.", rating: 4, text: "Konacno radi na mobilnom bez osecaja da je desktop verzija samo stisnuta." },
        { name: "Ava P.", rating: 5, text: "Novi pravac je ucinio projekat premium, bez nepotrebnog komplikovanja." },
        { name: "Theo B.", rating: 3, text: "Struktura je mnogo jasnija. Ljudi brze razumeju sta radim." },
        { name: "Sofia L.", rating: 5, text: "Stranica sada ima licnost. Deluje dizajnirano, ne samo sklopljeno." },
        { name: "Milan C.", rating: 4, text: "Loading i scroll momenti cine ceo sajt smooth i namernim." },
        { name: "Nina H.", rating: 5, text: "Brend ima jace online prisustvo bez gubitka licnog osecaja." },
      ],
    },
    contact: {
      ...siteCopy.en.contact,
      label: "Kontakt",
      title: "Ako tvoj sajt deluje genericno, mozemo da popravimo prvi utisak.",
      text:
        "Posalji kratku poruku sa tim sta gradis i sta trenutno deluje off. Vracam se sa pravcem koji deluje ostrije i vise custom.",
    },
  },
} as const;

function setSurfacePosition(element: HTMLElement, clientX: number, clientY: number) {
  const rect = element.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  const tiltX = ((50 - y) / 50) * 5;
  const tiltY = ((x - 50) / 50) * 6;

  element.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
  element.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
  element.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
  element.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
}

function resetSurfacePosition(element: HTMLElement) {
  element.style.setProperty("--pointer-x", "50%");
  element.style.setProperty("--pointer-y", "50%");
  element.style.setProperty("--tilt-x", "0deg");
  element.style.setProperty("--tilt-y", "0deg");
}

function setMenuCloseMagnet(sheet: HTMLElement, clientX: number, clientY: number) {
  const button = sheet.querySelector<HTMLElement>(".menu-sheet-close");
  if (!button) return;

  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = clientX - centerX;
  const deltaY = clientY - centerY;
  const distance = Math.hypot(deltaX, deltaY);
  const radius = rect.width * 0.5 + 38;
  const pull = Math.max(0, 1 - distance / radius);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  button.style.setProperty("--magnet-x", `${(deltaX * pull * 0.34).toFixed(2)}px`);
  button.style.setProperty("--magnet-y", `${(deltaY * pull * 0.34).toFixed(2)}px`);
  button.style.setProperty("--magnet-stretch", (1 + pull * 0.42).toFixed(3));
  button.style.setProperty("--magnet-squash", (1 - pull * 0.16).toFixed(3));
  button.style.setProperty("--magnet-angle", `${angle.toFixed(2)}deg`);
  button.style.setProperty("--magnet-angle-back", `${(-angle).toFixed(2)}deg`);
}

function resetMenuCloseMagnet(sheet: HTMLElement) {
  const button = sheet.querySelector<HTMLElement>(".menu-sheet-close");
  if (!button) return;

  button.style.setProperty("--magnet-x", "0px");
  button.style.setProperty("--magnet-y", "0px");
  button.style.setProperty("--magnet-stretch", "1");
  button.style.setProperty("--magnet-squash", "1");
  button.style.setProperty("--magnet-angle", "0deg");
  button.style.setProperty("--magnet-angle-back", "0deg");
}

function nextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function waitForHeroImages() {
  const visibleImages = Array.from(document.images).filter((image) => {
    const rect = image.getBoundingClientRect();
    return rect.top < window.innerHeight * 1.4 && rect.bottom > -window.innerHeight * 0.2;
  });

  return Promise.all(
    visibleImages.map((image) => {
      if (image.complete && image.naturalWidth !== 0) return Promise.resolve();
      if (typeof image.decode === "function") return image.decode().catch(() => undefined);

      return new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }),
  );
}

function Loader({ status, footer }: { status: string; footer: string }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="load-gate"
      exit={{
        clipPath: "inset(0 0 100% 0)",
        opacity: 0.88,
        transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
      }}
      initial={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      role="status"
    >
      <div className="load-grain" aria-hidden="true" />
      <div className="load-cut-lines" aria-hidden="true" />
      <div className="load-center">
        <div className="load-mark" aria-hidden="true">
          <Image src="/logo-transparent.png" alt="" width={62} height={62} loading="eager" />
        </div>
        <span className="load-status">{status}</span>
      </div>
      <span className="load-footer">{footer}</span>
    </motion.div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const rowItems = [...items, ...items, ...items];

  return (
    <div className={`marquee-row${reverse ? " is-reverse" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {rowItems.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item}
            <Image className="marquee-logo" src="/logo-transparent.png" alt="" width={46} height={46} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomePageClient() {
  const reduceMotion = useReducedMotion();
  const heroLogoHoldTimer = useRef<number | undefined>(undefined);
  const heroLogoPointerPoint = useRef<{ x: number; y: number } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [locale, setLocale] = useState<Locale>("en");
  const [serviceCardPages, setServiceCardPages] = useState([0, 0]);
  const [menuClosing, setMenuClosing] = useState(false);
  const [menuJump, setMenuJump] = useState<{ href: string; label: string } | null>(null);
  const [logoPositionReady, setLogoPositionReady] = useState(false);
  const [heroLogoHoldState, setHeroLogoHoldState] = useState<"idle" | "charging" | "ready">("idle");
  const [heroLogoPosition, setHeroLogoPosition] = useState({ x: 0, y: 0 });
  const [typedReviewText, setTypedReviewText] = useState("");
  const copy = localizedCopy[locale];
  const activeLanguage = languageOptions.find((item) => item.code === locale) ?? languageOptions[0];
  const activeReview = copy.reviews.items[reviewIndex] ?? copy.reviews.items[0];
  const visibleReviewText = reduceMotion ? activeReview.text : typedReviewText;
  const year = new Date().getFullYear();

  useEffect(() => {
    const id = window.setTimeout(() => {
      const stored = window.localStorage.getItem("sparkle-locale");
      const browserLanguage = window.navigator.language.toLowerCase();
      const nextLocale = isLocale(stored)
        ? stored
        : browserLanguage.startsWith("de")
          ? "de"
          : browserLanguage.startsWith("es")
            ? "es"
            : browserLanguage.startsWith("fr")
              ? "fr"
              : browserLanguage.startsWith("sr")
                ? "sr"
                : "en";

      setLocale(nextLocale);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const storedPosition = window.localStorage.getItem(heroLogoStorageKey);

      if (storedPosition) {
        try {
          const parsed = JSON.parse(storedPosition) as { x?: unknown; y?: unknown };

          if (typeof parsed.x === "number" && typeof parsed.y === "number") {
            const bounds = getHeroLogoBounds();
            setHeroLogoPosition({
              x: clamp(parsed.x, -bounds.x, bounds.x),
              y: clamp(parsed.y, -bounds.y, bounds.y),
            });
          }
        } catch {
          window.localStorage.removeItem(heroLogoStorageKey);
        }
      }

      setLogoPositionReady(true);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!logoPositionReady) return;
    window.localStorage.setItem(heroLogoStorageKey, JSON.stringify(heroLogoPosition));
  }, [heroLogoPosition, logoPositionReady]);

  useEffect(() => {
    return () => {
      if (heroLogoHoldTimer.current) window.clearTimeout(heroLogoHoldTimer.current);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const id = window.setTimeout(() => setShowLoader(false), 0);
      return () => window.clearTimeout(id);
    }

    let cancelled = false;
    const waitForWindow = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }

      window.addEventListener("load", () => resolve(), { once: true });
    });
    const waitForFonts = document.fonts?.ready.catch(() => undefined) ?? Promise.resolve();
    const minimumTime = new Promise<void>((resolve) => window.setTimeout(resolve, 1050));
    const hardLimit = new Promise<void>((resolve) => window.setTimeout(resolve, 2600));

    const readyForFirstPaint = Promise.all([waitForWindow, waitForFonts, minimumTime])
      .then(() => waitForHeroImages())
      .then(() => nextPaint());

    Promise.race([readyForFirstPaint, hardLimit]).then(() => {
      if (!cancelled) setShowLoader(false);
    });

    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  useEffect(() => {
    document.body.classList.toggle("is-loading", showLoader);
    return () => document.body.classList.remove("is-loading");
  }, [showLoader]);

  useEffect(() => {
    if (reduceMotion) return;

    let frame: number | undefined;

    const updateScrollMotion = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollTop = window.scrollY;
      const progress = Math.min(1, scrollTop / maxScroll);
      const shouldReduceSurfaceMotion = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;

      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      if (shouldReduceSurfaceMotion) {
        document.documentElement.style.setProperty("--scroll-drift", "0px");
        document.documentElement.style.setProperty("--scroll-drift-wide", "0px");
        document.documentElement.style.setProperty("--scroll-float", "0px");
        document.documentElement.style.setProperty("--scroll-float-soft", "0px");
        frame = undefined;
        return;
      }

      document.documentElement.style.setProperty("--scroll-drift", `${Math.min(22, scrollTop * 0.019).toFixed(2)}px`);
      document.documentElement.style.setProperty("--scroll-drift-wide", `${Math.min(28, scrollTop * 0.024).toFixed(2)}px`);
      document.documentElement.style.setProperty("--scroll-float", `${Math.max(-70, scrollTop * -0.06).toFixed(2)}px`);
      document.documentElement.style.setProperty("--scroll-float-soft", `${Math.max(-17, scrollTop * -0.014).toFixed(2)}px`);
      frame = undefined;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.documentElement.style.removeProperty("--scroll-progress");
      document.documentElement.style.removeProperty("--scroll-drift");
      document.documentElement.style.removeProperty("--scroll-drift-wide");
      document.documentElement.style.removeProperty("--scroll-float");
      document.documentElement.style.removeProperty("--scroll-float-soft");
    };
  }, [reduceMotion]);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -56px 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    window.localStorage.setItem("sparkle-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    let frame: number | undefined;
    let timeout: number | undefined;
    let position = 0;
    let phase: "typing" | "pausing" | "erasing" = "typing";
    const fullText = activeReview.text;

    if (reduceMotion) {
      return;
    }

    const tick = () => {
      if (phase === "typing") {
        position += 1;
        setTypedReviewText(fullText.slice(0, position));

        if (position >= fullText.length) {
          phase = "pausing";
          timeout = window.setTimeout(tick, 1700);
          return;
        }

        timeout = window.setTimeout(tick, 26 + Math.random() * 18);
        return;
      }

      if (phase === "pausing") {
        phase = "erasing";
      }

      position -= 1;
      setTypedReviewText(fullText.slice(0, Math.max(0, position)));

      if (position <= 0) {
        frame = window.requestAnimationFrame(() => {
          setReviewIndex((current) => (current + 1) % copy.reviews.items.length);
        });
        return;
      }

      timeout = window.setTimeout(tick, 14);
    };

    timeout = window.setTimeout(() => {
      setTypedReviewText("");
      tick();
    }, 220);

    return () => {
      if (timeout) window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [activeReview.text, copy.reviews.items.length, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      document.title = copy.tabTitles[0];
      return;
    }

    document.title = copy.tabTitles[0];

    const interval = window.setInterval(() => {
      document.title = copy.tabTitles[(Math.floor(Date.now() / 2600) % copy.tabTitles.length)];
    }, 2600);

    return () => {
      window.clearInterval(interval);
      document.title = copy.tabTitles[0];
    };
  }, [copy.tabTitles, reduceMotion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setLanguageOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSurfaceMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    setSurfacePosition(event.currentTarget, event.clientX, event.clientY);
  }

  function handleSurfaceLeave(event: ReactPointerEvent<HTMLElement>) {
    resetSurfacePosition(event.currentTarget);
  }

  function handleMenuMagnetMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    setMenuCloseMagnet(event.currentTarget, event.clientX, event.clientY);
  }

  function handleMenuMagnetLeave(event: ReactPointerEvent<HTMLElement>) {
    resetMenuCloseMagnet(event.currentTarget);
  }

  function selectLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    setLanguageOpen(false);
  }

  function closeMenuWithSpin() {
    if (menuClosing) return;
    setMenuClosing(true);
    window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 360);
  }

  function cancelHeroLogoHold() {
    if (heroLogoHoldTimer.current) {
      window.clearTimeout(heroLogoHoldTimer.current);
      heroLogoHoldTimer.current = undefined;
    }

    heroLogoPointerPoint.current = null;
    setHeroLogoHoldState("idle");
  }

  function beginHeroLogoHold(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    heroLogoPointerPoint.current = { x: event.clientX, y: event.clientY };

    if (reduceMotion) {
      setHeroLogoHoldState("ready");
      return;
    }

    if (heroLogoHoldTimer.current) window.clearTimeout(heroLogoHoldTimer.current);

    setHeroLogoHoldState("charging");
    heroLogoHoldTimer.current = window.setTimeout(() => {
      heroLogoHoldTimer.current = undefined;
      setHeroLogoHoldState("ready");
    }, heroLogoHoldTime);
  }

  function moveHeroLogo(event: ReactPointerEvent<HTMLDivElement>) {
    if (heroLogoHoldState === "idle") return;

    const nextPoint = { x: event.clientX, y: event.clientY };

    if (heroLogoHoldState === "charging") {
      heroLogoPointerPoint.current = nextPoint;
      return;
    }

    const previousPoint = heroLogoPointerPoint.current ?? nextPoint;
    const deltaX = nextPoint.x - previousPoint.x;
    const deltaY = nextPoint.y - previousPoint.y;
    const bounds = getHeroLogoBounds();

    heroLogoPointerPoint.current = nextPoint;
    setHeroLogoPosition((current) => ({
      x: clamp(current.x + deltaX, -bounds.x, bounds.x),
      y: clamp(current.y + deltaY, -bounds.y, bounds.y),
    }));
  }

  function finishHeroLogoMove() {
    if (heroLogoHoldTimer.current) {
      cancelHeroLogoHold();
      return;
    }

    heroLogoPointerPoint.current = null;
    setHeroLogoHoldState("idle");
  }

  function jumpToMenuSection(event: ReactMouseEvent<HTMLAnchorElement>, item: { href: string; label: string }) {
    event.preventDefault();
    setMenuOpen(false);
    setLanguageOpen(false);
    setMenuJump(item);

    const scrollDelay = reduceMotion ? 0 : 430;
    const releaseDelay = reduceMotion ? 180 : 1180;

    window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(item.href);
      target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, scrollDelay);

    window.setTimeout(() => setMenuJump(null), releaseDelay);
  }

  function cycleServiceCard(cardIndex: number, variantCount: number) {
    setServiceCardPages((current) => {
      const next = [...current];
      next[cardIndex] = ((next[cardIndex] ?? 0) + 1) % variantCount;
      return next;
    });
  }

  function selectReview(direction: -1 | 1) {
    setReviewIndex((current) => (current + direction + copy.reviews.items.length) % copy.reviews.items.length);
  }

  return (
    <>
      <AnimatePresence>{showLoader ? <Loader footer={copy.loaderFooter} status={copy.loaderStatus} /> : null}</AnimatePresence>

      <main className="site">
        <nav className="nav">
          <div className="nav-left">
            <Link className="brand" href="/" aria-label="Sparkle home">
              <span className="brand-mark">
                <Image src="/logo-transparent.png" alt="" width={40} height={40} loading="eager" />
              </span>
              <span className="brand-name">Sparkle</span>
            </Link>

            <div className={`language-picker${languageOpen ? " is-open" : ""}`}>
              <button
                aria-expanded={languageOpen}
                aria-haspopup="menu"
                className="language-button"
                onClick={() => setLanguageOpen((open) => !open)}
                type="button"
              >
                <span>{copy.languageLabel}</span>
                <span className="language-current">{activeLanguage.short}</span>
                <span className="language-chevron" aria-hidden="true" />
              </button>

              <AnimatePresence>
                {languageOpen ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="language-menu"
                    exit={{ opacity: 0, y: -8 }}
                    initial={{ opacity: 0, y: -8 }}
                    role="menu"
                    transition={{ duration: 0.18 }}
                  >
                    {languageOptions.map((item) => (
                      <button
                        aria-current={locale === item.code ? "true" : undefined}
                        className="language-option"
                        key={item.code}
                        onClick={() => selectLocale(item.code)}
                        role="menuitem"
                        type="button"
                      >
                        <span className="language-chip">{item.short}</span>
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            aria-controls="site-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.menuButton.closeLabel : copy.menuButton.openLabel}
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            onPointerLeave={handleSurfaceLeave}
            onPointerMove={handleSurfaceMove}
            type="button"
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <span className="menu-toggle-text">{menuOpen ? copy.menuButton.close : copy.menuButton.open}</span>
            <span className="mini-x" aria-hidden="true">
              <span />
              <span />
            </span>
          </motion.button>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              animate={{ opacity: 1 }}
              className="menu-overlay"
              exit={{ opacity: 0 }}
              id="site-menu"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="menu-sheet"
                exit={{ opacity: 0, y: 16 }}
                initial={{ opacity: 0, y: 16 }}
                onPointerLeave={handleMenuMagnetLeave}
                onPointerMove={handleMenuMagnetMove}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="menu-topbar">
                  <span className="menu-badge">{copy.menuBadge}</span>
                  <button
                    className={`menu-sheet-close${menuClosing ? " is-closing" : ""}`}
                    onClick={closeMenuWithSpin}
                    type="button"
                  >
                    <span className="visually-hidden">{copy.menuButton.closeLabel}</span>
                    <span className="mini-x is-cross" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>
                </div>

                  <div className="menu-panel">
                    {copy.menuItems.map((item, index) => (
                      <motion.a
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        className="menu-link"
                        href={item.href}
                        initial={{ opacity: 0, x: 18, y: 10 }}
                        key={item.href}
                        onClick={(event) => jumpToMenuSection(event, item)}
                        whileTap={reduceMotion ? undefined : { scale: 0.985, x: 14 }}
                        transition={{ delay: 0.05 + index * 0.055, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="menu-link-meta">{String(index + 1).padStart(2, "0")}</span>
                        <span className="menu-link-text">{item.label}</span>
                      </motion.a>
                    ))}

                  <div className="menu-footer">
                    <Link className="menu-legal-link" href="/tos" onClick={() => setMenuOpen(false)}>
                      {copy.legal.terms}
                    </Link>
                    <Link className="menu-legal-link" href="/privacy" onClick={() => setMenuOpen(false)}>
                      {copy.legal.privacy}
                    </Link>
                    <Link className="menu-legal-link" href="/refund" onClick={() => setMenuOpen(false)}>
                      {copy.legal.refund}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {menuJump ? (
            <motion.div
              animate={{ opacity: 1 }}
              className="menu-jump-gate"
              exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.24 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <span className="menu-jump-lines" aria-hidden="true" />
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="menu-jump-card"
                exit={{ opacity: 0, scale: 0.92, y: -16 }}
                initial={{ opacity: 0, scale: 0.9, y: 18 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src="/logo-transparent.png" alt="" width={54} height={54} />
                <span>Teleporting to</span>
                <strong>{menuJump.label}</strong>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="hero" id="home">
          <div className="floating-logo-field" aria-hidden="true">
            {floatingLogoSlots.map((slot) => (
              <span className={`float-logo ${slot}`} key={slot}>
                <Image
                  src="/logo-transparent.png"
                  alt=""
                  width={170}
                  height={170}
                  loading="eager"
                />
              </span>
            ))}
          </div>

          <div className="hero-stage">
            <motion.div
              aria-hidden="true"
              className={`hero-back-logo is-${heroLogoHoldState}`}
              onPointerCancel={cancelHeroLogoHold}
              onPointerDown={beginHeroLogoHold}
              onPointerLeave={() => {
                if (heroLogoHoldState === "charging") cancelHeroLogoHold();
              }}
              onPointerMove={moveHeroLogo}
              onPointerUp={finishHeroLogoMove}
              style={{ x: heroLogoPosition.x, y: heroLogoPosition.y }}
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            >
              <span className="hero-logo-tooltip">
                <span className="drag-countdown" aria-hidden="true" />
                <span>{heroLogoHoldState === "ready" ? "Drag now" : "Drag me"}</span>
              </span>
              <Image src="/logo-transparent.png" alt="" width={520} height={520} loading="eager" priority />
            </motion.div>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: showLoader ? 0.12 : 0, duration: 0.42 }}
            >
              {copy.hero.eyebrow}
            </motion.p>
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="hero-title"
              initial={{ opacity: 0, y: 18 }}
              transition={{ delay: showLoader ? 0.18 : 0.04, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              {copy.hero.title}
            </motion.h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="hero-credit"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: showLoader ? 0.2 : 0.06, duration: 0.42 }}
            >
              {copy.hero.credit}
            </motion.p>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="hero-tagline"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: showLoader ? 0.24 : 0.08, duration: 0.48 }}
            >
              {copy.hero.tagline}
            </motion.p>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="hero-text"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: showLoader ? 0.3 : 0.12, duration: 0.48 }}
            >
              {copy.hero.text}
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="hero-actions"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: showLoader ? 0.34 : 0.14, duration: 0.44 }}
            >
              <motion.a
                className="button primary"
                href={`mailto:${primaryEmail}`}
                onPointerLeave={handleSurfaceLeave}
                onPointerMove={handleSurfaceMove}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                {copy.hero.ctaPrimary}
              </motion.a>
              <motion.a
                className="button secondary"
                href="#work"
                onPointerLeave={handleSurfaceLeave}
                onPointerMove={handleSurfaceMove}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                {copy.hero.ctaSecondary}
              </motion.a>
            </motion.div>

            <div className="hero-products" aria-label="Services">
              {copy.hero.cards.map((card, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  key={`service-${index}`}
                  onPointerLeave={handleSurfaceLeave}
                  onPointerMove={handleSurfaceMove}
                  transition={{ delay: showLoader ? 0.38 + index * 0.08 : 0.18 + index * 0.05, duration: 0.46 }}
                >
                  <button
                    aria-label={card.action}
                    className="mouse-toggle"
                    onClick={() => cycleServiceCard(index, card.variants.length)}
                    type="button"
                  >
                    <span className="mouse-icon" aria-hidden="true">
                      <span />
                    </span>
                  </button>
                  <AnimatePresence mode="wait" initial={false}>
                    {(() => {
                      const activeIndex = serviceCardPages[index] ?? 0;
                      const activeCard = card.variants[activeIndex] ?? card.variants[0];

                      return (
                        <motion.div className="service-card-inner" key={`${index}-${activeIndex}`}>
                          <motion.div
                            animate={{ opacity: 1, rotateX: 0, y: 0 }}
                            aria-hidden="true"
                            className="jar-visual"
                            exit={{ opacity: 0, rotateX: -62, y: -12 }}
                            initial={{ opacity: 0, rotateX: 62, y: 12 }}
                            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <span className="jar-lid" />
                            <span className="jar-glass">
                              <Image src="/logo-transparent.png" alt="" width={86} height={86} loading="eager" />
                            </span>
                          </motion.div>
                          <motion.div
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            className="service-card-copy"
                            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                            <span className="service-label">{activeCard.label}</span>
                            <h2>{activeCard.title}</h2>
                            <p>{activeCard.body}</p>
                          </motion.div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </motion.article>
              ))}
            </div>

            <a className="scroll-cue" href="#motion-strip">
              <span className="visually-hidden">{copy.hero.scroll}</span>
              <span aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="motion-strip" id="motion-strip">
          <p className="strip-intro">{copy.marqueeIntro}</p>
          {copy.marqueeRows.map((row, index) => (
            <MarqueeRow items={row} key={row.join("-")} reverse={index % 2 === 1} />
          ))}
        </section>

        <section className="section" id="about">
          <div className="section-grid">
            <div className="reveal reveal-left">
              <p className="section-label">{copy.about.label}</p>
              <h2 className="section-title">{copy.about.title}</h2>
            </div>
            <div className="reveal reveal-right delay-1">
              <p className="section-text">{copy.about.text}</p>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-grid">
            <div className="reveal reveal-left">
              <p className="section-label">{copy.process.label}</p>
              <h2 className="section-title">{copy.process.title}</h2>
            </div>
            <div className="process-grid reveal reveal-rise delay-1">
              {copy.process.items.map((item) => (
                <article className="process-card" key={`${locale}-${item.title}`}>
                  <span className="process-line-num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-grid">
            <div className="reveal reveal-left">
              <p className="section-label">{copy.work.label}</p>
              <h2 className="section-title">{copy.work.title}</h2>
            </div>
            <div className="work-grid reveal reveal-right delay-1">
              {copy.work.items.map((project) => (
                <article className="work-card" key={`${locale}-${project.title}`}>
                  <p className="project-label">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="section-grid">
            <div className="reveal reveal-left">
              <p className="section-label">{copy.reviews.label}</p>
              <h2 className="section-title">{copy.reviews.title}</h2>
            </div>
            <div className="review-shell reveal reveal-scale delay-1">
              <div className="review-topline">
                <div>
                  <span className="review-score">{copy.reviews.score}</span>
                  <span className="review-name">{activeReview.name}</span>
                </div>
                <div className="review-controls">
                  <button aria-label={copy.reviews.previous} onClick={() => selectReview(-1)} type="button">
                    <span aria-hidden="true">←</span>
                  </button>
                  <button aria-label={copy.reviews.next} onClick={() => selectReview(1)} type="button">
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
              <p className="review-typewriter">
                {visibleReviewText}
                <span aria-hidden="true" className="type-caret" />
              </p>
              <div
                className="review-stars"
                aria-label={copy.reviews.starsLabel.replace("{rating}", String(activeReview.rating))}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <span className={index < activeReview.rating ? "is-filled" : ""} key={index}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-grid">
            <div className="reveal reveal-left">
              <p className="section-label">{copy.contact.label}</p>
              <h2 className="section-title">{copy.contact.title}</h2>
            </div>
            <div className="contact-panel reveal reveal-float delay-1">
              <p className="contact-note">{copy.contact.text}</p>
              <a
                className="email-row"
                href={`mailto:${primaryEmail}`}
                onPointerLeave={handleSurfaceLeave}
                onPointerMove={handleSurfaceMove}
              >
                <span className="email-label">{copy.contact.emailLabel}</span>
                <span className="email-address">{primaryEmail}</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>(C) {year} sw8tx.lol - EST 2026</span>
          <div className="footer-links">
            <Link className="footer-link" href="/tos">
              {copy.legal.terms}
            </Link>
            <Link className="footer-link" href="/privacy">
              {copy.legal.privacy}
            </Link>
            <Link className="footer-link" href="/refund">
              {copy.legal.refund}
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
