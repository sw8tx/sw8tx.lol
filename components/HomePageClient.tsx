"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type {
  CSSProperties,
  FormEvent as ReactFormEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { useEffect, useRef, useState } from "react";

const primaryEmailParts = ["info", "tylerosthoff", "xyz"] as const;
const primaryEmail = `${primaryEmailParts[0]}@${primaryEmailParts[1]}.${primaryEmailParts[2]}`;
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";
let turnstileScriptPromise: Promise<void> | null = null;

type TurnstileRenderOptions = {
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  language?: string;
  sitekey: string;
  theme?: "auto" | "light" | "dark";
};

type TurnstileApi = {
  remove: (widgetId: string) => void;
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstileScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile-script="true"]');

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Turnstile failed to load")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

const languageOptions = [
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "es", label: "Espanol", short: "ES" },
  { code: "fr", label: "Francais", short: "FR" },
  { code: "sr", label: "Srpski", short: "SR" },
  { code: "zh", label: "Zhongwen", short: "ZH" },
  { code: "it", label: "Italiano", short: "IT" },
  { code: "pt", label: "Portugues", short: "PT" },
  { code: "nl", label: "Nederlands", short: "NL" },
  { code: "tr", label: "Turkce", short: "TR" },
] as const;
type Locale = (typeof languageOptions)[number]["code"];

const floatingLogoSlots = Array.from({ length: 8 }, (_, index) => `float-logo-${index + 1}`);
const heroLogoFallbackBounds = { x: 260, y: 190 };
const heroLogoHoldTime = 680;
const siteDragLogos = [
  { className: "drag-logo-about", id: "about", x: 112, y: 168, size: 104 },
  { className: "drag-logo-process", id: "process", x: 1230, y: 224, size: 122 },
  { className: "drag-logo-work", id: "work", x: 94, y: 596, size: 96 },
  { className: "drag-logo-contact", id: "contact", x: 1320, y: 708, size: 118 },
] as const;
const contactFormCopy = {
  en: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
  de: {
    nameLabel: "Name",
    emailLabel: "E-Mail",
    messageLabel: "Projektnotiz",
    namePlaceholder: "Dein Name",
    emailPlaceholder: "du@beispiel.de",
    messagePlaceholder: "Was baust du und was fuehlt sich gerade noch falsch an?",
    submit: "Nachricht senden",
    sending: "Wird gesendet...",
    success: "Nachricht gesendet. Ich melde mich bald zurueck.",
    error: "Das Senden hat nicht geklappt. Versuch es nochmal oder schreib an info@tylerosthoff.xyz.",
    directLabel: "Direkt per E-Mail",
    turnstileLabel: "Kurze Verifizierung",
    turnstileError: "Bitte schliesse zuerst die Verifizierung ab.",
  },
  es: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
  fr: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
  sr: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
  zh: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
  it: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
  pt: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
  nl: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
  tr: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Project note",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What are you building and what feels off right now?",
    submit: "Send note",
    sending: "Sending...",
    success: "Message sent. I will get back to you soon.",
    error: "That did not send. Please try again or write to info@tylerosthoff.xyz.",
    directLabel: "Direct email",
    turnstileLabel: "Quick verification",
    turnstileError: "Please complete the verification first.",
  },
} satisfies Record<
  Locale,
  {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    directLabel: string;
    turnstileLabel: string;
    turnstileError: string;
  }
>;

const consentCopy = {
  en: {
    title: "Privacy choices",
    text: "Sparkle uses essential storage for consent and optional preference storage for language and interface settings. No advertising cookies, no third-party tracking and no data sale.",
    essentialTitle: "Necessary",
    essentialBody: "Required for consent, basic security and core site behavior.",
    preferenceTitle: "Preferences",
    preferenceBody: "Remembers language and interface settings across visits.",
    analyticsTitle: "Improvement data",
    analyticsBody: "Allows privacy-aware usage signals to improve layout, performance and device support later.",
    essentialButton: "Necessary only",
    selectedButton: "Save choices",
    note: "Terms and Privacy stay available here at any time.",
  },
  de: {
    title: "Datenschutz Auswahl",
    text: "Sparkle nutzt notwendige Speicherung fuer Zustimmung und optionale Praeferenz-Speicherung fuer Sprache und Interface-Einstellungen. Keine Werbe-Cookies, kein Drittanbieter-Tracking und kein Datenverkauf.",
    essentialTitle: "Notwendig",
    essentialBody: "Erforderlich fuer Zustimmung, grundlegende Sicherheit und Kernfunktionen der Seite.",
    preferenceTitle: "Praeferenzen",
    preferenceBody: "Merkt sich Sprache und Interface-Einstellungen fuer spaetere Besuche.",
    analyticsTitle: "Verbesserungsdaten",
    analyticsBody: "Erlaubt datensparsame Nutzungs-Signale, um Layout, Performance und Geraete-Support spaeter zu verbessern.",
    essentialButton: "Nur notwendig",
    selectedButton: "Auswahl speichern",
    note: "AGB und Datenschutz bleiben hier jederzeit erreichbar.",
  },
  es: {
    title: "Opciones de privacidad",
    text: "Sparkle usa almacenamiento esencial para el consentimiento y almacenamiento opcional de preferencias para idioma y ajustes de interfaz. Sin cookies publicitarias, sin seguimiento externo y sin venta de datos.",
    essentialTitle: "Necesario",
    essentialBody: "Necesario para consentimiento, seguridad basica y funcionamiento principal.",
    preferenceTitle: "Preferencias",
    preferenceBody: "Recuerda idioma y ajustes de interfaz entre visitas.",
    analyticsTitle: "Datos de mejora",
    analyticsBody: "Permite senales de uso cuidadosas con la privacidad para mejorar layout, rendimiento y soporte de dispositivos.",
    essentialButton: "Solo necesario",
    selectedButton: "Guardar opciones",
    note: "Terminos y Privacidad siguen disponibles aqui en todo momento.",
  },
  fr: {
    title: "Choix de confidentialite",
    text: "Sparkle utilise un stockage essentiel pour le consentement et un stockage optionnel de preferences pour la langue et certains reglages d interface. Aucun cookie publicitaire, aucun suivi tiers et aucune vente de donnees.",
    essentialTitle: "Necessaire",
    essentialBody: "Requis pour le consentement, la securite de base et le fonctionnement principal du site.",
    preferenceTitle: "Preferences",
    preferenceBody: "Memorise la langue et certains reglages d interface entre les visites.",
    analyticsTitle: "Donnees d amelioration",
    analyticsBody: "Autorise des signaux d usage respectueux de la vie privee pour ameliorer la mise en page, la performance et le support des appareils.",
    essentialButton: "Essentiel uniquement",
    selectedButton: "Enregistrer les choix",
    note: "Conditions et Privacy restent accessibles ici a tout moment.",
  },
  sr: {
    title: "Izbor privatnosti",
    text: "Sparkle koristi neophodno cuvanje za saglasnost i opciono cuvanje preferenci za jezik i podesavanja interfejsa. Nema reklamnih kolacica, nema pracenja trecih strana i nema prodaje podataka.",
    essentialTitle: "Neophodno",
    essentialBody: "Potrebno za saglasnost, osnovnu bezbednost i glavno funkcionisanje sajta.",
    preferenceTitle: "Preference",
    preferenceBody: "Pamti jezik i podesavanja interfejsa izmedju poseta.",
    analyticsTitle: "Podaci za poboljsanje",
    analyticsBody: "Dozvoljava pazljive signale koriscenja radi poboljsanja rasporeda, performansi i podrske za uredjaje.",
    essentialButton: "Samo neophodno",
    selectedButton: "Sacuvaj izbor",
    note: "Uslovi i privatnost ostaju ovde dostupni u svakom trenutku.",
  },
  zh: {
    title: "隐私选项",
    text: "Sparkle 使用必要存储来保存同意状态，并提供可选偏好存储来记住语言和界面设置。没有广告 Cookie，没有第三方追踪，也不会出售数据。",
    essentialTitle: "必要",
    essentialBody: "用于同意状态、基础安全与站点核心功能。",
    preferenceTitle: "偏好",
    preferenceBody: "在下次访问时记住语言与界面设置。",
    analyticsTitle: "改进数据",
    analyticsBody: "允许更注重隐私的使用信号，用于后续优化布局、性能与设备支持。",
    essentialButton: "仅必要",
    selectedButton: "保存选择",
    note: "服务条款和隐私政策始终可在这里查看。",
  },
  it: {
    title: "Scelte privacy",
    text: "Sparkle usa storage essenziale per il consenso e storage opzionale di preferenze per lingua e impostazioni di interfaccia. Nessun cookie pubblicitario, nessun tracciamento di terze parti e nessuna vendita di dati.",
    essentialTitle: "Necessario",
    essentialBody: "Serve per consenso, sicurezza di base e funzionamento principale del sito.",
    preferenceTitle: "Preferenze",
    preferenceBody: "Ricorda lingua e impostazioni di interfaccia tra le visite.",
    analyticsTitle: "Dati di miglioramento",
    analyticsBody: "Consente segnali d uso attenti alla privacy per migliorare layout, performance e supporto ai dispositivi.",
    essentialButton: "Solo necessario",
    selectedButton: "Salva scelte",
    note: "Termini e Privacy restano disponibili qui in ogni momento.",
  },
  pt: {
    title: "Escolhas de privacidade",
    text: "Sparkle usa armazenamento essencial para consentimento e armazenamento opcional de preferencias para idioma e ajustes de interface. Sem cookies de anuncios, sem rastreamento de terceiros e sem venda de dados.",
    essentialTitle: "Necessario",
    essentialBody: "Necessario para consentimento, seguranca basica e funcionamento principal do site.",
    preferenceTitle: "Preferencias",
    preferenceBody: "Lembra idioma e ajustes de interface entre visitas.",
    analyticsTitle: "Dados de melhoria",
    analyticsBody: "Permite sinais de uso com foco em privacidade para melhorar layout, performance e suporte a dispositivos.",
    essentialButton: "Somente necessario",
    selectedButton: "Salvar escolhas",
    note: "Termos e Privacidade seguem disponiveis aqui a qualquer momento.",
  },
  nl: {
    title: "Privacykeuzes",
    text: "Sparkle gebruikt essentiele opslag voor toestemming en optionele voorkeursopslag voor taal en interface-instellingen. Geen advertentiecookies, geen tracking van derden en geen verkoop van gegevens.",
    essentialTitle: "Essentieel",
    essentialBody: "Nodig voor toestemming, basisbeveiliging en kernfunctionaliteit van de site.",
    preferenceTitle: "Voorkeuren",
    preferenceBody: "Onthoudt taal en interface-instellingen tussen bezoeken.",
    analyticsTitle: "Verbeteringsdata",
    analyticsBody: "Laat privacybewuste gebruikssignalen toe om layout, performance en apparaatsupport later te verbeteren.",
    essentialButton: "Alleen essentieel",
    selectedButton: "Keuzes opslaan",
    note: "Voorwaarden en Privacy blijven hier altijd beschikbaar.",
  },
  tr: {
    title: "Gizlilik secimleri",
    text: "Sparkle onay icin zorunlu depolama ve dil ile arayuz ayarlari icin istege bagli tercih depolamasi kullanir. Reklam cerezleri yok, ucuncu taraf takibi yok ve veri satisi yok.",
    essentialTitle: "Zorunlu",
    essentialBody: "Onay, temel guvenlik ve sitenin cekirdek isleyisi icin gereklidir.",
    preferenceTitle: "Tercihler",
    preferenceBody: "Dil ve arayuz ayarlarini ziyaretler arasinda hatirlar.",
    analyticsTitle: "Iyilestirme verileri",
    analyticsBody: "Yerlesim, performans ve cihaz destegini gelistirmek icin gizlilige dikkat eden kullanim sinyallerine izin verir.",
    essentialButton: "Yalnizca zorunlu",
    selectedButton: "Secimleri kaydet",
    note: "Kosullar ve Gizlilik burada her zaman ulasilabilir kalir.",
  },
} satisfies Record<
  Locale,
  {
    title: string;
    text: string;
    essentialTitle: string;
    essentialBody: string;
    preferenceTitle: string;
    preferenceBody: string;
    analyticsTitle: string;
    analyticsBody: string;
    essentialButton: string;
    selectedButton: string;
    note: string;
  }
>;

const onboardingStorageKey = "sparkle-onboarding-complete";
const onboardingSteps = [
  {
    selector: ".language-button",
    title: "Welcome to Sparkle.",
    body: "Here you can select your preferred language.",
  },
  {
    selector: ".menu-toggle",
    title: "See what we do.",
    body: "Open the menu to jump through the work, process, feedback and contact sections.",
  },
  {
    selector: ".scroll-cue",
    title: "Explore the site.",
    body: "This opens the next part of the website. Feel free to look around and send feedback.",
    placement: "top",
  },
  {
    selector: ".hero-actions .button.primary",
    title: "Start a project.",
    body: "When you are ready, this button takes you straight to the project form.",
  },
] as const;

type OnboardingSpotlight = {
  centerX: number;
  centerY: number;
  height: number;
  left: number;
  top: number;
  width: number;
};

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
      points: [
        {
          title: "Design with a point of view",
          body: "Direction, typography and pacing are set before polish, so the site feels owned from the first scroll.",
        },
        {
          title: "Frontend that holds up",
          body: "Spacing, responsiveness and motion are refined in code, not left behind after the mockup.",
        },
        {
          title: "Custom over generic",
          body: "The goal is presence and clarity, not another template look with a few colors swapped.",
        },
      ],
      tags: ["Design + Frontend", "Smooth motion", "Responsive polish", "Custom build"],
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
      points: [
        {
          title: "Design mit klarer Haltung",
          body: "Richtung, Typografie und Rhythmus stehen vor dem Finish, damit die Seite vom ersten Scroll an eigen wirkt.",
        },
        {
          title: "Frontend, das sauber traegt",
          body: "Spacing, Responsiveness und Motion werden im Code verfeinert und nicht nach dem Mockup vergessen.",
        },
        {
          title: "Custom statt generisch",
          body: "Das Ziel ist Praesenz und Klarheit, nicht nur ein Template mit anderen Farben.",
        },
      ],
      tags: ["Design + Frontend", "Ruhige Motion", "Responsive Polish", "Custom Build"],
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
  zh: {
    ...siteCopy.en,
    loaderStatus: "Zhengzai zucheng xingtai...",
    languageLabel: "YU YAN",
    hero: {
      ...siteCopy.en.hero,
      text:
        "Wei ba wangzhan kandao chengwei pinpai chuxiang, xinren he changqi jiazhi touzi de ren, dingzhi donghua portfolio, landing page he brand site.",
    },
    marqueeIntro: "Anjing de gongzuoshi wangzhan ye keyi you shengqi. Zhe jiushi wo changzuo de jiehe.",
    about: {
      ...siteCopy.en.about,
      title: "Geng qiang de diyinxiang laizi you yisi de sheji juece.",
      text:
        "Sparkle ba sheji he frontend fang zai yiqi, rang gainian he zhenzheng de build yizhi. Jieguo shi geng qingxi de jiegou, geng hao de mobile biaoxian, geng shun de motion, yiji zhenzheng custom de ganjue.",
      tags: ["Design + Frontend", "Motion", "Mobile", "Custom build"],
    },
  },
  it: {
    ...siteCopy.en,
    loaderStatus: "Le forme stanno prendendo vita...",
    languageLabel: "LINGUA",
    menuButton: { open: "Menu", close: "Chiudi", openLabel: "Apri menu", closeLabel: "Chiudi menu" },
    menuItems: [
      { href: "#about", label: "About" },
      { href: "#process", label: "Processo" },
      { href: "#work", label: "Lavori" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Contatto" },
    ],
    legal: { terms: "Termini", privacy: "Privacy", refund: "Rimborso" },
    hero: {
      ...siteCopy.en.hero,
      eyebrow: "Web design e frontend",
      tagline: "Websites con anima",
      text:
        "Portfolio animati, landing page e brand site su misura per chi vede un sito come un investimento in presenza, fiducia e momentum.",
      ctaPrimary: "Avvia un progetto",
      ctaSecondary: "Lavori",
    },
    marqueeIntro: "Un sito studio calmo puo comunque sembrare vivo. Questo e il mix che costruisco.",
    about: {
      ...siteCopy.en.about,
      title: "Una prima impressione forte nasce da scelte di design intenzionali.",
      text:
        "Sparkle unisce design e frontend, cosi il concept e il build reale restano allineati. Il risultato e una struttura piu chiara, un mobile migliore, motion piu fluida e un sito che sembra davvero custom.",
      tags: ["Design + Frontend", "Motion fluida", "Mobile", "Build custom"],
    },
    contact: {
      ...siteCopy.en.contact,
      label: "Contatto",
      title: "Se il tuo sito sembra generico, possiamo sistemare la prima impressione.",
      text:
        "Mandami una nota breve su cosa stai costruendo e cosa oggi sembra ancora off. Torno con una direzione piu precisa e piu custom.",
    },
  },
  pt: {
    ...siteCopy.en,
    loaderStatus: "As formas estao ganhando vida...",
    languageLabel: "IDIOMA",
    menuButton: { open: "Menu", close: "Fechar", openLabel: "Abrir menu", closeLabel: "Fechar menu" },
    menuItems: [
      { href: "#about", label: "Sobre" },
      { href: "#process", label: "Processo" },
      { href: "#work", label: "Trabalhos" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Contato" },
    ],
    legal: { terms: "Termos", privacy: "Privacidade", refund: "Reembolso" },
    hero: {
      ...siteCopy.en.hero,
      eyebrow: "Web design e frontend",
      tagline: "Websites com alma",
      text:
        "Portfolios animados, landing pages e sites de marca sob medida para quem ve o site como investimento em presenca, confianca e momentum.",
      ctaPrimary: "Comecar projeto",
      ctaSecondary: "Trabalhos",
    },
    marqueeIntro: "Um site de estudio calmo ainda pode parecer vivo. Esse e o mix que eu construo.",
    about: {
      ...siteCopy.en.about,
      title: "Uma primeira impressao forte comeca com decisoes de design intencionais.",
      text:
        "Sparkle fica entre design e frontend para manter conceito e build real alinhados. O resultado e estrutura mais clara, mobile melhor, motion mais suave e um site que parece realmente custom.",
      tags: ["Design + Frontend", "Motion suave", "Mobile", "Build custom"],
    },
    contact: {
      ...siteCopy.en.contact,
      label: "Contato",
      title: "Se o seu site parece generico, a gente pode consertar a primeira impressao.",
      text:
        "Me manda uma nota curta com o que voce esta construindo e o que ainda parece off. Eu volto com uma direcao mais afiada e mais custom.",
    },
  },
  nl: {
    ...siteCopy.en,
    loaderStatus: "Vormen worden opgebouwd...",
    languageLabel: "TAAL",
    menuButton: { open: "Menu", close: "Sluiten", openLabel: "Open menu", closeLabel: "Sluit menu" },
    menuItems: [
      { href: "#about", label: "Over" },
      { href: "#process", label: "Proces" },
      { href: "#work", label: "Werk" },
      { href: "#reviews", label: "Feedback" },
      { href: "#contact", label: "Contact" },
    ],
    legal: { terms: "Voorwaarden", privacy: "Privacy", refund: "Terugbetaling" },
    hero: {
      ...siteCopy.en.hero,
      eyebrow: "Webdesign en frontend",
      tagline: "Websites met ziel",
      text:
        "Aangepaste geanimeerde portfolios, landingpages en brand sites voor mensen die een website zien als investering in uitstraling, vertrouwen en momentum.",
      ctaPrimary: "Start een project",
      ctaSecondary: "Werk",
    },
    marqueeIntro: "Een rustige studiosite kan nog steeds levendig aanvoelen. Dat is de mix die ik bouw.",
    about: {
      ...siteCopy.en.about,
      label: "Over",
      title: "Een sterke eerste indruk begint met ontwerpkeuzes die bewust aanvoelen.",
      text:
        "Sparkle zit tussen design en frontend zodat concept en echte build gelijk blijven lopen. Het resultaat is een duidelijkere structuur, beter mobiel gedrag, soepelere motion en een site die echt custom voelt.",
      tags: ["Design + Frontend", "Soepele motion", "Mobiel", "Custom build"],
    },
    contact: {
      ...siteCopy.en.contact,
      title: "Als je site generiek voelt, kunnen we de eerste indruk fixen.",
      text:
        "Stuur kort wat je aan het bouwen bent en wat nu nog niet goed voelt. Ik kom terug met een scherpere en meer custom richting.",
    },
  },
  tr: {
    ...siteCopy.en,
    loaderStatus: "Sekiller olusuyor...",
    languageLabel: "DIL",
    menuButton: { open: "Menu", close: "Kapat", openLabel: "Menuyu ac", closeLabel: "Menuyu kapat" },
    menuItems: [
      { href: "#about", label: "Hakkinda" },
      { href: "#process", label: "Surec" },
      { href: "#work", label: "Isler" },
      { href: "#reviews", label: "Geri bildirim" },
      { href: "#contact", label: "Iletisim" },
    ],
    legal: { terms: "Kosullar", privacy: "Gizlilik", refund: "Iade" },
    hero: {
      ...siteCopy.en.hero,
      eyebrow: "Web tasarim ve frontend",
      tagline: "Ruhu olan websites",
      text:
        "Siteyi gorunurluk, guven ve momentum yatirimi olarak goren insanlar icin ozel animasyonlu portfolyolar, landing pageler ve brand siteler.",
      ctaPrimary: "Proje baslat",
      ctaSecondary: "Isler",
    },
    marqueeIntro: "Sakin bir studio sitesi yine de canli hissettirebilir. Benim kurdugum karisim bu.",
    about: {
      ...siteCopy.en.about,
      label: "Hakkinda",
      title: "Guclu bir ilk izlenim, bilincli tasarim kararlarinda baslar.",
      text:
        "Sparkle tasarim ile frontend arasinda durur; boylece fikir ve gercek build ayni hizada kalir. Sonuc daha temiz yapi, daha iyi mobile davranisi, daha yumusak motion ve gercekten custom hissettiren bir site olur.",
      tags: ["Design + Frontend", "Yumusak motion", "Mobile", "Custom build"],
    },
    contact: {
      ...siteCopy.en.contact,
      label: "Iletisim",
      title: "Siten generic geliyorsa ilk izlenimi birlikte duzeltebiliriz.",
      text:
        "Ne yaptigini ve su an neyin off hissettirdigini kisaca yaz. Daha keskin ve daha custom bir yonle geri donerim.",
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

function MarqueeRow({
  items,
  reverse = false,
  rowIndex = 0,
}: {
  items: readonly string[];
  reverse?: boolean;
  rowIndex?: number;
}) {
  const rowSpinBases = [3.1, 5.2, 7.8];
  const spinBase = rowSpinBases[rowIndex] ?? (4.2 + rowIndex * 1.8);

  return (
    <div className={`marquee-row${reverse ? " is-reverse" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((groupIndex) => (
          <div className="marquee-group" key={`group-${groupIndex}`}>
            {items.map((item, index) => (
              <span className="marquee-item" key={`${groupIndex}-${item}-${index}`}>
                {item}
                <Image
                  className="marquee-logo"
                  src="/logo-transparent.png"
                  alt=""
                  width={46}
                  height={46}
                  style={
                    {
                      "--logo-spin-duration": `${(spinBase + (index % items.length) * 1.65 + groupIndex * 0.9).toFixed(2)}s`,
                    } as CSSProperties
                  }
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DraggableLogo({
  className,
  id,
  initialX,
  initialY,
  size,
}: {
  className: string;
  id: string;
  initialX: number;
  initialY: number;
  size: number;
}) {
  const reduceMotion = useReducedMotion();
  const logoRef = useRef<HTMLDivElement | null>(null);
  const holdTimer = useRef<number | undefined>(undefined);
  const pointerPoint = useRef<{ x: number; y: number } | null>(null);
  const [positionReady, setPositionReady] = useState(false);
  const [holdState, setHoldState] = useState<"idle" | "charging" | "ready">("idle");
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const storageKey = `sparkle-drag-logo-${id}`;

  function getLayerMetrics() {
    const layer = logoRef.current?.offsetParent as HTMLElement | null;
    const rect = logoRef.current?.getBoundingClientRect();
    const width = rect?.width ?? size;
    const height = rect?.height ?? size;

    return {
      layerHeight: layer?.clientHeight ?? document.documentElement.scrollHeight,
      layerLeft: layer?.getBoundingClientRect().left ?? 0,
      layerTop: layer?.getBoundingClientRect().top ?? 0,
      layerWidth: layer?.clientWidth ?? window.innerWidth,
      maxX: Math.max(-width * 0.2, (layer?.clientWidth ?? window.innerWidth) - width * 0.8),
      maxY: Math.max(-height * 0.2, (layer?.clientHeight ?? document.documentElement.scrollHeight) - height * 0.8),
      minX: -width * 0.8,
      minY: -height * 0.8,
    };
  }

  function getPointerPoint(event: ReactPointerEvent<HTMLDivElement>) {
    const metrics = getLayerMetrics();

    return {
      x: event.clientX - metrics.layerLeft,
      y: event.clientY - metrics.layerTop,
    };
  }

  function clampToLayer(nextX: number, nextY: number) {
    const bounds = getLayerMetrics();

    return {
      x: clamp(nextX, bounds.minX, bounds.maxX),
      y: clamp(nextY, bounds.minY, bounds.maxY),
    };
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const clampStoredPosition = (nextX: number, nextY: number) => {
        const layer = logoRef.current?.offsetParent as HTMLElement | null;
        const rect = logoRef.current?.getBoundingClientRect();
        const width = rect?.width ?? size;
        const height = rect?.height ?? size;
        const bounds = {
          maxX: Math.max(-width * 0.2, (layer?.clientWidth ?? window.innerWidth) - width * 0.8),
          maxY: Math.max(-height * 0.2, (layer?.clientHeight ?? document.documentElement.scrollHeight) - height * 0.8),
          minX: -width * 0.8,
          minY: -height * 0.8,
        };

        return {
          x: clamp(nextX, bounds.minX, bounds.maxX),
          y: clamp(nextY, bounds.minY, bounds.maxY),
        };
      };
      const storedPosition = window.localStorage.getItem(storageKey);

      if (storedPosition) {
        try {
          const parsed = JSON.parse(storedPosition) as { x?: unknown; y?: unknown };

          if (typeof parsed.x === "number" && typeof parsed.y === "number") {
            setPosition(clampStoredPosition(parsed.x, parsed.y));
          }
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      } else {
        setPosition(clampStoredPosition(initialX, initialY));
      }

      setPositionReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [initialX, initialY, size, storageKey]);

  useEffect(() => {
    if (!positionReady) return;
    window.localStorage.setItem(storageKey, JSON.stringify(position));
  }, [position, positionReady, storageKey]);

  useEffect(() => {
    return () => {
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
    };
  }, []);

  function cancelHold() {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = undefined;
    }

    pointerPoint.current = null;
    setHoldState("idle");
  }

  function beginHold(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pointerPoint.current = getPointerPoint(event);

    if (reduceMotion) {
      setHoldState("ready");
      return;
    }

    if (holdTimer.current) window.clearTimeout(holdTimer.current);

    setHoldState("charging");
    holdTimer.current = window.setTimeout(() => {
      holdTimer.current = undefined;
      setHoldState("ready");
    }, heroLogoHoldTime);
  }

  function moveLogo(event: ReactPointerEvent<HTMLDivElement>) {
    if (holdState === "idle") return;

    const nextPoint = getPointerPoint(event);

    if (holdState === "charging") {
      pointerPoint.current = nextPoint;
      return;
    }

    const previousPoint = pointerPoint.current ?? nextPoint;
    const deltaX = nextPoint.x - previousPoint.x;
    const deltaY = nextPoint.y - previousPoint.y;

    pointerPoint.current = nextPoint;
    setPosition((current) => clampToLayer(current.x + deltaX, current.y + deltaY));
  }

  function finishMove() {
    if (holdTimer.current) {
      cancelHold();
      return;
    }

    pointerPoint.current = null;
    setHoldState("idle");
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`draggable-logo ${className} is-${holdState}`}
      ref={logoRef}
      onPointerCancel={cancelHold}
      onPointerDown={beginHold}
      onPointerLeave={() => {
        if (holdState === "charging") cancelHold();
      }}
      onPointerMove={moveLogo}
      onPointerUp={finishMove}
      style={{ left: position.x, top: position.y }}
      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
    >
      <span className="hero-logo-tooltip">
        <span className="drag-countdown" aria-hidden="true" />
        <span>{holdState === "ready" ? "Drag now" : "Drag me"}</span>
      </span>
      <span className="draggable-logo-art">
        <Image src="/logo-transparent.png" alt="" width={260} height={260} loading="lazy" />
      </span>
    </motion.div>
  );
}

export function HomePageClient() {
  const reduceMotion = useReducedMotion();
  const cursorLogoRef = useRef<HTMLDivElement | null>(null);
  const heroLogoHoldTimer = useRef<number | undefined>(undefined);
  const heroLogoPointerPoint = useRef<{ x: number; y: number } | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [showJourneyLoader, setShowJourneyLoader] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false);
  const [consentNecessaryEnabled, setConsentNecessaryEnabled] = useState(true);
  const [consentPreferencesEnabled, setConsentPreferencesEnabled] = useState(false);
  const [consentAnalyticsEnabled, setConsentAnalyticsEnabled] = useState(false);
  const [consentNudge, setConsentNudge] = useState(0);
  const [showConsentWarning, setShowConsentWarning] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingSpotlight, setOnboardingSpotlight] = useState<OnboardingSpotlight | null>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const [serviceCardPages, setServiceCardPages] = useState([0, 0]);
  const [menuClosing, setMenuClosing] = useState(false);
  const [menuJump, setMenuJump] = useState<{ href: string; label: string } | null>(null);
  const [heroLogoHoldState, setHeroLogoHoldState] = useState<"idle" | "charging" | "ready">("idle");
  const [heroLogoPosition, setHeroLogoPosition] = useState({ x: 0, y: 0 });
  const [typedReviewText, setTypedReviewText] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [contactFeedback, setContactFeedback] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const copy = localizedCopy[locale];
  const contactForm = contactFormCopy[locale];
  const activeLanguage = languageOptions.find((item) => item.code === locale) ?? languageOptions[0];
  const activeReview = copy.reviews.items[reviewIndex] ?? copy.reviews.items[0];
  const activeConsent = consentCopy[locale];
  const visibleReviewText = reduceMotion ? activeReview.text : typedReviewText;
  const heroRevealOffset = showLoader ? 0.18 : 0.02;
  const activeOnboardingStep = onboardingSteps[onboardingStep] ?? onboardingSteps[0];
  const onboardingIsLastStep = onboardingStep >= onboardingSteps.length - 1;
  const year = new Date().getFullYear();

  useEffect(() => {
    const id = window.setTimeout(() => {
      const browserLanguage = window.navigator.language.toLowerCase();
      const nextLocale = browserLanguage.startsWith("de")
        ? "de"
        : browserLanguage.startsWith("es")
          ? "es"
          : browserLanguage.startsWith("fr")
            ? "fr"
            : browserLanguage.startsWith("sr")
              ? "sr"
              : browserLanguage.startsWith("zh")
                ? "zh"
                : browserLanguage.startsWith("it")
                  ? "it"
                  : browserLanguage.startsWith("pt")
                    ? "pt"
                    : browserLanguage.startsWith("nl")
                      ? "nl"
                      : browserLanguage.startsWith("tr")
                        ? "tr"
                        : "en";

      setLocale(nextLocale);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

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
    if (showLoader) return;

    const timeout = window.setTimeout(() => {
      if (window.localStorage.getItem(onboardingStorageKey) !== "true") {
        setOnboardingOpen(true);
      }
    }, reduceMotion ? 0 : 420);

    return () => window.clearTimeout(timeout);
  }, [reduceMotion, showLoader]);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;

    const cursorLogo = cursorLogoRef.current;
    const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!cursorLogo || !desktopPointer.matches) return;

    let frame = 0;
    let active = false;
    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const current = { ...target };

    const render = () => {
      const easing = active ? 0.18 : 0.12;
      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;

      cursorLogo.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      if (active || Math.abs(target.x - current.x) > 0.24 || Math.abs(target.y - current.y) > 0.24) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const ensureFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      current.x = event.clientX;
      current.y = event.clientY;
      cursorLogo.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      cursorLogo.dataset.visible = "true";
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      active = true;
      cursorLogo.dataset.visible = "true";
      ensureFrame();
    };

    const handlePointerLeave = () => {
      active = false;
      cursorLogo.dataset.visible = "false";
      ensureFrame();
    };

    window.addEventListener("pointerenter", handlePointerEnter);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduceMotion]);

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
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    let cancelled = false;

    async function mountTurnstile() {
      if (!turnstileContainerRef.current) return;

      try {
        await loadTurnstileScript();
      } catch {
        if (!cancelled) {
          setTurnstileReady(false);
        }
        return;
      }

      if (cancelled || !window.turnstile || !turnstileContainerRef.current) return;

      if (turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }

      turnstileContainerRef.current.innerHTML = "";
      setTurnstileToken("");
      setTurnstileReady(false);

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        language: locale,
        theme: "light",
        callback: (token) => {
          if (!cancelled) {
            setTurnstileToken(token);
            setTurnstileReady(true);
          }
        },
        "expired-callback": () => {
          if (!cancelled) {
            setTurnstileToken("");
            setTurnstileReady(false);
          }
        },
        "error-callback": () => {
          if (!cancelled) {
            setTurnstileToken("");
            setTurnstileReady(false);
          }
        },
      });
    }

    mountTurnstile();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    if (showLoader || onboardingOpen || showJourneyLoader) return;

    const timer = window.setTimeout(() => {
      setConsentNecessaryEnabled(true);
      setConsentPreferencesEnabled(false);
      setConsentAnalyticsEnabled(false);
      setConsentOpen(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [onboardingOpen, showJourneyLoader, showLoader]);

  useEffect(() => {
    document.body.classList.toggle("consent-open", consentOpen);
    return () => document.body.classList.remove("consent-open");
  }, [consentOpen]);

  useEffect(() => {
    const locked = onboardingOpen || showJourneyLoader;
    document.body.classList.toggle("onboarding-open", locked);
    return () => document.body.classList.remove("onboarding-open");
  }, [onboardingOpen, showJourneyLoader]);

  useEffect(() => {
    if (!onboardingOpen) return;

    let frame: number | undefined;
    let activeTarget: HTMLElement | null = null;

    const setActiveTarget = (target: HTMLElement | null) => {
      if (activeTarget === target) return;
      activeTarget?.classList.remove("is-onboarding-target");
      activeTarget = target;
      activeTarget?.classList.add("is-onboarding-target");
    };

    const updateSpotlight = () => {
      if (!activeOnboardingStep.selector) {
        setActiveTarget(null);
        setOnboardingSpotlight(null);
        return;
      }

      const target = document.querySelector<HTMLElement>(activeOnboardingStep.selector);

      if (!target) {
        setActiveTarget(null);
        setOnboardingSpotlight(null);
        return;
      }

      setActiveTarget(target);

      const rect = target.getBoundingClientRect();
      const pad = window.matchMedia("(max-width: 720px)").matches ? 22 : 32;

      setOnboardingSpotlight({
        centerX: Math.round(rect.left + rect.width / 2),
        centerY: Math.round(rect.top + rect.height / 2),
        height: Math.round(rect.height + pad * 2),
        left: Math.round(rect.left - pad),
        top: Math.round(rect.top - pad),
        width: Math.round(rect.width + pad * 2),
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        updateSpotlight();
      });
    };

    updateSpotlight();
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      activeTarget?.classList.remove("is-onboarding-target");
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("scroll", requestUpdate);
    };
  }, [activeOnboardingStep.selector, onboardingOpen]);

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

  function goToNextOnboardingStep() {
    if (!onboardingIsLastStep) {
      setOnboardingStep((current) => Math.min(current + 1, onboardingSteps.length - 1));
      return;
    }

    window.localStorage.setItem(onboardingStorageKey, "true");
    setOnboardingOpen(false);
    setShowJourneyLoader(true);

    window.setTimeout(() => {
      setShowJourneyLoader(false);
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }, reduceMotion ? 120 : 1280);
  }

  function saveConsent(necessary: boolean, preferences: boolean, analytics: boolean) {
    setConsentNecessaryEnabled(necessary);
    setConsentPreferencesEnabled(preferences);
    setConsentAnalyticsEnabled(analytics);

    if (!necessary) {
      setConsentOpen(false);
      return;
    }

    setConsentOpen(false);
  }

  function acceptEssentialOnly() {
    saveConsent(true, false, false);
  }

  function acceptSelectedConsent() {
    if (!consentNecessaryEnabled && !consentPreferencesEnabled && !consentAnalyticsEnabled) {
      setConsentNudge((current) => current + 1);
      setShowConsentWarning(true);
      window.setTimeout(() => setShowConsentWarning(false), 2100);
      return;
    }

    saveConsent(
      consentNecessaryEnabled,
      consentNecessaryEnabled && consentPreferencesEnabled,
      consentNecessaryEnabled && consentAnalyticsEnabled,
    );
  }

  async function submitContactForm(event: ReactFormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = contactName.trim();
    const cleanEmail = contactEmail.trim();
    const cleanMessage = contactMessage.trim();
    const cleanCompany = contactCompany.trim();

    if (cleanCompany) {
      setContactStatus("success");
      setContactFeedback(contactForm.success);
      return;
    }

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setContactStatus("error");
      setContactFeedback(contactForm.error);
      return;
    }

    if (!turnstileToken) {
      setContactStatus("error");
      setContactFeedback(contactForm.turnstileError);
      return;
    }

    setContactStatus("submitting");
    setContactFeedback(contactForm.sending);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          locale,
          page: window.location.href,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorPayload?.error || "Request failed");
      }

      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactCompany("");
      setTurnstileToken("");
      setTurnstileReady(false);
      setContactStatus("success");
      setContactFeedback(contactForm.success);
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } catch (error) {
      setTurnstileToken("");
      setTurnstileReady(false);
      setContactStatus("error");
      setContactFeedback(error instanceof Error && error.message ? error.message : contactForm.error);
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {showLoader || showJourneyLoader ? <Loader footer={copy.loaderFooter} status={copy.loaderStatus} /> : null}
      </AnimatePresence>

      <main className="site">
        <div className="cursor-logo" aria-hidden="true" data-visible="false" ref={cursorLogoRef}>
          <Image src="/logo-transparent.png" alt="" width={148} height={148} loading="eager" />
        </div>

        <div className="draggable-logo-layer" aria-hidden="true">
          {siteDragLogos.map((logo) => (
            <DraggableLogo
              className={logo.className}
              id={logo.id}
              initialX={logo.x}
              initialY={logo.y}
              key={logo.id}
              size={logo.size}
            />
          ))}
        </div>

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
                    animate={{ clipPath: "inset(0% 0% 0% 0% round 20px)", opacity: 1, y: 0 }}
                    className="language-menu"
                    exit={{ clipPath: "inset(0% 0% 100% 0% round 20px)", opacity: 0, y: -10 }}
                    initial={{ clipPath: "inset(0% 0% 100% 0% round 20px)", opacity: 0, y: -10 }}
                    role="menu"
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {languageOptions.map((item, index) => (
                      <motion.button
                        animate={{ opacity: 1, y: 0 }}
                        aria-current={locale === item.code ? "true" : undefined}
                        className="language-option"
                        initial={{ opacity: 0, y: -8 }}
                        key={item.code}
                        onClick={() => selectLocale(item.code)}
                        role="menuitem"
                        transition={{ delay: index * 0.035, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        type="button"
                      >
                        <span className="language-chip">{item.short}</span>
                        {item.label}
                      </motion.button>
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

        <AnimatePresence>
          {consentOpen ? (
            <motion.div
              animate={{ opacity: 1 }}
              className="consent-overlay"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.34 }}
            >
              <motion.aside
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`consent-panel${showConsentWarning ? " is-warning" : ""}`}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                key={`consent-panel-${consentNudge}`}
                transition={{ duration: reduceMotion ? 0.16 : 0.44, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="consent-kicker">Sparkle</span>
                <h2>{activeConsent.title}</h2>
                <p>{activeConsent.text}</p>
                <div className="consent-categories" aria-label="Cookie preferences">
                  <button
                    aria-pressed={consentNecessaryEnabled}
                    className={`consent-option${consentNecessaryEnabled ? " is-active" : ""}`}
                    onClick={() => {
                      setConsentNecessaryEnabled((current) => {
                        const next = !current;
                        if (!next) setConsentPreferencesEnabled(false);
                        if (!next) setConsentAnalyticsEnabled(false);
                        return next;
                      });
                    }}
                    type="button"
                  >
                    <div className="consent-option-copy">
                      <strong>{activeConsent.essentialTitle}</strong>
                      <span>{activeConsent.essentialBody}</span>
                    </div>
                    <span className={`consent-switch${consentNecessaryEnabled ? " is-on" : ""}`} aria-hidden="true">
                      <span />
                    </span>
                  </button>
                  <button
                    aria-pressed={consentNecessaryEnabled && consentPreferencesEnabled}
                    className={`consent-option${consentNecessaryEnabled && consentPreferencesEnabled ? " is-active" : ""}`}
                    disabled={!consentNecessaryEnabled}
                    onClick={() => setConsentPreferencesEnabled((current) => !current)}
                    type="button"
                  >
                    <div className="consent-option-copy">
                      <strong>{activeConsent.preferenceTitle}</strong>
                      <span>{activeConsent.preferenceBody}</span>
                    </div>
                    <span
                      className={`consent-switch${consentNecessaryEnabled && consentPreferencesEnabled ? " is-on" : ""}`}
                      aria-hidden="true"
                    >
                      <span />
                    </span>
                  </button>
                  <button
                    aria-pressed={consentNecessaryEnabled && consentAnalyticsEnabled}
                    className={`consent-option${consentNecessaryEnabled && consentAnalyticsEnabled ? " is-active" : ""}`}
                    disabled={!consentNecessaryEnabled}
                    onClick={() => setConsentAnalyticsEnabled((current) => !current)}
                    type="button"
                  >
                    <div className="consent-option-copy">
                      <strong>{activeConsent.analyticsTitle}</strong>
                      <span>{activeConsent.analyticsBody}</span>
                    </div>
                    <span
                      className={`consent-switch${consentNecessaryEnabled && consentAnalyticsEnabled ? " is-on" : ""}`}
                      aria-hidden="true"
                    >
                      <span />
                    </span>
                  </button>
                </div>
                <div className="consent-links">
                  <Link href="/tos">{copy.legal.terms}</Link>
                  <Link href="/privacy">{copy.legal.privacy}</Link>
                </div>
                <AnimatePresence>
                  {showConsentWarning ? (
                    <motion.p
                      animate={{ opacity: 1, y: 0 }}
                      className="consent-warning"
                      exit={{ opacity: 0, y: -6 }}
                      initial={{ opacity: 0, y: 6 }}
                      role="alert"
                    >
                      {locale === "de"
                        ? "Bitte waehle mindestens eine der drei Optionen aus."
                        : "Please select at least one of the three options."}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
                <div className="consent-actions">
                  <span className="consent-note">{activeConsent.note}</span>
                  <div className="consent-button-row">
                    <button className="consent-button is-secondary" onClick={acceptEssentialOnly} type="button">
                      {activeConsent.essentialButton}
                    </button>
                    <button className="consent-button" onClick={acceptSelectedConsent} type="button">
                      {activeConsent.selectedButton}
                    </button>
                  </div>
                </div>
              </motion.aside>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {onboardingOpen ? (
            <motion.div
              animate={{ opacity: 1 }}
              className={`onboarding-overlay${onboardingSpotlight ? "" : " is-centered"}`}
              exit={{ opacity: 0, transition: { duration: 0.28 } }}
              initial={{ opacity: 0 }}
              style={
                {
                  "--spotlight-height": `${onboardingSpotlight?.height ?? 220}px`,
                  "--spotlight-center-x": `${onboardingSpotlight?.centerX ?? 0}px`,
                  "--spotlight-center-y": `${onboardingSpotlight?.centerY ?? 0}px`,
                  "--spotlight-left": `${onboardingSpotlight?.left ?? 0}px`,
                  "--spotlight-top": `${onboardingSpotlight?.top ?? 0}px`,
                  "--spotlight-width": `${onboardingSpotlight?.width ?? 220}px`,
                } as CSSProperties
              }
              transition={{ duration: reduceMotion ? 0.12 : 0.34 }}
            >
              {onboardingSpotlight ? (
                <motion.span
                  animate={{
                    height: onboardingSpotlight.height,
                    left: onboardingSpotlight.left,
                    top: onboardingSpotlight.top,
                    width: onboardingSpotlight.width,
                  }}
                  aria-hidden="true"
                  className="onboarding-spotlight-ring"
                  initial={false}
                  transition={{ duration: reduceMotion ? 0 : 0.74, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
              <motion.section
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="onboarding-card"
                exit={{ opacity: 0, scale: 0.96 }}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                key={onboardingStep}
                transition={{ duration: reduceMotion ? 0.12 : 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="onboarding-kicker">Sparkle guide</span>
                <h2>{activeOnboardingStep.title}</h2>
                <p>{activeOnboardingStep.body}</p>
                <div className="onboarding-actions">
                  <span>
                    {onboardingStep + 1}/{onboardingSteps.length}
                  </span>
                  <button className="onboarding-next" onClick={goToNextOnboardingStep} type="button">
                    {onboardingIsLastStep ? "Start journey" : "Next"}
                  </button>
                </div>
              </motion.section>
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
              <span className="draggable-logo-art">
                <Image src="/logo-transparent.png" alt="" width={520} height={520} loading="eager" priority />
              </span>
            </motion.div>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: heroRevealOffset + 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {copy.hero.eyebrow}
            </motion.p>
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="hero-title"
              initial={{ opacity: 0, y: 18 }}
              transition={{ delay: heroRevealOffset + 0.16, duration: 0.74, ease: [0.16, 1, 0.3, 1] }}
            >
              {copy.hero.title}
            </motion.h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="hero-credit"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: heroRevealOffset + 0.26, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {copy.hero.credit}
            </motion.p>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="hero-tagline"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: heroRevealOffset + 0.34, duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
            >
              {copy.hero.tagline}
            </motion.p>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="hero-text"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: heroRevealOffset + 0.44, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              {copy.hero.text}
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="hero-actions"
              initial={{ opacity: 0, y: 14 }}
              transition={{ delay: heroRevealOffset + 0.56, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                className="button primary"
                href="#contact"
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
                  transition={{
                    delay: heroRevealOffset + 0.66 + index * 0.09,
                    duration: 0.68,
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="service-card-copy"
                            exit={{ opacity: 0, scale: 0.985, y: -8 }}
                            initial={{ opacity: 0, scale: 0.985, y: 10 }}
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
            <MarqueeRow items={row} key={row.join("-")} reverse={index % 2 === 1} rowIndex={index} />
          ))}
        </section>

        <section className="section" id="about">
          <div className="section-grid">
            <div className="reveal reveal-left">
              <p className="section-label">{copy.about.label}</p>
              <h2 className="section-title">{copy.about.title}</h2>
            </div>
            <div className="about-stack reveal reveal-right delay-1">
              <article className="about-panel" onPointerLeave={handleSurfaceLeave} onPointerMove={handleSurfaceMove}>
                <span className="about-watermark" aria-hidden="true">
                  <Image src="/logo-transparent.png" alt="" width={240} height={240} loading="lazy" />
                </span>
                <div className="about-topline">
                  <div className="about-lead-wrap">
                    <p className="section-text about-lead">{copy.about.text}</p>
                    <div className="about-tags" aria-label="About highlights">
                      {copy.about.tags.map((tag) => (
                        <span className="about-tag" key={`${locale}-${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="about-sidecard">
                    <span className="about-side-kicker">Sparkle</span>
                    <strong>Design that feels intentional in motion and in code.</strong>
                  </div>
                </div>
                <div className="about-points">
                  {copy.about.points.map((point, index) => (
                    <article className="about-point" key={`${locale}-${point.title}`}>
                      <span className="about-point-index">{String(index + 1).padStart(2, "0")}</span>
                      <h3>{point.title}</h3>
                      <p>{point.body}</p>
                    </article>
                  ))}
                </div>
              </article>
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
                <article
                  className="process-card"
                  key={`${locale}-${item.title}`}
                  onPointerLeave={handleSurfaceLeave}
                  onPointerMove={handleSurfaceMove}
                >
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
                <article
                  className="work-card"
                  key={`${locale}-${project.title}`}
                  onPointerLeave={handleSurfaceLeave}
                  onPointerMove={handleSurfaceMove}
                >
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
            <div
              className="review-shell reveal reveal-scale delay-1"
              onPointerLeave={handleSurfaceLeave}
              onPointerMove={handleSurfaceMove}
            >
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
            <div
              className="contact-panel reveal reveal-float delay-1"
              onPointerLeave={handleSurfaceLeave}
              onPointerMove={handleSurfaceMove}
            >
              <p className="contact-note">{copy.contact.text}</p>
              <form className="contact-form" onSubmit={submitContactForm}>
                <div aria-hidden="true" className="contact-trap">
                  <label className="contact-field">
                    <span className="contact-field-label">Company</span>
                    <input
                      autoComplete="off"
                      className="contact-input"
                      name="company"
                      onChange={(event) => setContactCompany(event.target.value)}
                      tabIndex={-1}
                      type="text"
                      value={contactCompany}
                    />
                  </label>
                </div>
                <div className="contact-form-grid">
                  <label className="contact-field">
                    <span className="contact-field-label">{contactForm.nameLabel}</span>
                    <input
                      autoComplete="name"
                      className="contact-input"
                      name="name"
                      onChange={(event) => setContactName(event.target.value)}
                      placeholder={contactForm.namePlaceholder}
                      required
                      type="text"
                      value={contactName}
                    />
                  </label>
                  <label className="contact-field">
                    <span className="contact-field-label">{contactForm.emailLabel}</span>
                    <input
                      autoComplete="email"
                      className="contact-input"
                      name="email"
                      onChange={(event) => setContactEmail(event.target.value)}
                      placeholder={contactForm.emailPlaceholder}
                      required
                      type="email"
                      value={contactEmail}
                    />
                  </label>
                </div>
                <label className="contact-field contact-field-message">
                  <span className="contact-field-label">{contactForm.messageLabel}</span>
                  <textarea
                    className="contact-input contact-textarea"
                    name="message"
                    onChange={(event) => setContactMessage(event.target.value)}
                    placeholder={contactForm.messagePlaceholder}
                    required
                    rows={5}
                    value={contactMessage}
                  />
                </label>
                <div className="contact-turnstile-wrap">
                  <span className="contact-field-label">{contactForm.turnstileLabel}</span>
                  <div className="contact-turnstile" ref={turnstileContainerRef} />
                </div>
                <div className="contact-actions">
                  <button
                    className="button contact-submit"
                    disabled={contactStatus === "submitting" || !turnstileReady}
                    onPointerLeave={handleSurfaceLeave}
                    onPointerMove={handleSurfaceMove}
                    type="submit"
                  >
                    {contactStatus === "submitting" ? contactForm.sending : contactForm.submit}
                  </button>
                  <a
                    className="email-row"
                    href={`mailto:${primaryEmail}`}
                    onPointerLeave={handleSurfaceLeave}
                    onPointerMove={handleSurfaceMove}
                  >
                    <span className="email-label">{contactForm.directLabel}</span>
                    <span className="email-address">{primaryEmail}</span>
                  </a>
                </div>
                <p
                  aria-live="polite"
                  className={`contact-feedback${contactStatus === "success" ? " is-success" : ""}${
                    contactStatus === "error" ? " is-error" : ""
                  }`}
                >
                  {contactFeedback}
                </p>
              </form>
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
