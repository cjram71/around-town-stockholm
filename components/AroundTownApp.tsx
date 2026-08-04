"use client";

import {
  BadgeInfo,
  Banknote,
  Building2,
  Calculator,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Globe2,
  Home,
  Hospital,
  Languages,
  LibraryBig,
  LocateFixed,
  Mail,
  MapPin,
  Menu,
  NotebookPen,
  Phone,
  PlugZap,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { categories, CategoryId, services, Service } from "@/data/services";

type Language = "en" | "sv";
type Tab = "home" | "calculator" | "notes" | "settings";
const appVersion = process.env.NEXT_PUBLIC_APP_VERSION ?? "development";
const buildTimestamp = process.env.NEXT_PUBLIC_BUILD_TIMESTAMP;

function BuildBadge() {
  const builtAt = buildTimestamp
    ? new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Stockholm",
      }).format(new Date(buildTimestamp))
    : "local development";

  return (
    <footer className="buildBadge" aria-label={`Version ${appVersion}, built ${builtAt}`}>
      <span>v{appVersion}</span>
      <time dateTime={buildTimestamp}>{builtAt}</time>
    </footer>
  );
}
type Note = { id: string; title: string; body: string; date: string; category: string };
type Coordinates = { latitude: number; longitude: number };

const copy = {
  en: {
    signIn: "SIGN UP / LOGIN",
    explore: "EXPLORE AS GUEST",
    intro: "A quick and easy utility app for finding important services around Stockholm - plus practical everyday tools.",
    search: "Search services or tasks...",
    nearest: "NEAREST TO YOU",
    locations: "LOCATIONS AND SERVICES",
    call: "Call",
    directions: "Directions",
    website: "Website",
    official: "Official source",
    demo: "MVP directory - verify details before travelling",
    emergency: "Life-threatening emergency? Call 112. Unsure where to seek care? Call 1177.",
    allCategories: "All categories",
    noResults: "No matching services found. Try another word or category.",
    locationOn: "Using your location",
    locationOff: "Use my location",
    locationDenied: "Location was not available. You can still browse every service.",
    calculator: "CALCULATOR",
    notes: "NOTES",
    settings: "SETTINGS",
    newNote: "New note",
    noteTitle: "Title",
    noteBody: "Write your note...",
    save: "Save note",
    cancel: "Cancel",
    utilities: "Utilities",
    language: "Switch language",
    privacy: "Privacy",
    security: "Security",
    support: "Support",
    faq: "FAQ",
    guest: "Guest mode",
    guestText: "The directory, calculator and notes work without an account. Notes stay on this device.",
    clearData: "Clear local notes",
    about: "About Around Town",
    aboutText: "Around Town Stockholm places essential services, clickable contact details and everyday utilities in one bilingual experience.",
    close: "Close",
    help1: "Blue actions open your phone, maps or the official website.",
    help2: "Distances use your current location only after you grant permission.",
    help3: "Use search or All categories if you prefer not to use the wheel.",
  },
  sv: {
    signIn: "SKAPA KONTO / LOGGA IN",
    explore: "UTFORSKA SOM GÄST",
    intro: "En snabb och enkel app för att hitta viktiga tjänster i Stockholm - plus praktiska vardagsverktyg.",
    search: "Sök tjänster eller ärenden...",
    nearest: "NÄRMAST DIG",
    locations: "PLATSER OCH TJÄNSTER",
    call: "Ring",
    directions: "Vägbeskrivning",
    website: "Webbplats",
    official: "Officiell källa",
    demo: "MVP-katalog - kontrollera uppgifter innan du åker",
    emergency: "Livshotande läge? Ring 112. Osäker på var du ska söka vård? Ring 1177.",
    allCategories: "Alla kategorier",
    noResults: "Inga matchande tjänster hittades. Prova ett annat ord eller en annan kategori.",
    locationOn: "Använder din position",
    locationOff: "Använd min position",
    locationDenied: "Din position var inte tillgänglig. Du kan fortfarande bläddra bland alla tjänster.",
    calculator: "MINIRÄKNARE",
    notes: "ANTECKNINGAR",
    settings: "INSTÄLLNINGAR",
    newNote: "Ny anteckning",
    noteTitle: "Rubrik",
    noteBody: "Skriv din anteckning...",
    save: "Spara anteckning",
    cancel: "Avbryt",
    utilities: "Verktyg",
    language: "Byt språk",
    privacy: "Integritet",
    security: "Säkerhet",
    support: "Support",
    faq: "Vanliga frågor",
    guest: "Gästläge",
    guestText: "Katalogen, miniräknaren och anteckningarna fungerar utan konto. Anteckningar stannar på den här enheten.",
    clearData: "Radera lokala anteckningar",
    about: "Om Around Town",
    aboutText: "Around Town Stockholm samlar viktiga tjänster, klickbara kontaktuppgifter och vardagsverktyg i en tvåspråkig upplevelse.",
    close: "Stäng",
    help1: "Blå åtgärder öppnar telefonen, kartan eller den officiella webbplatsen.",
    help2: "Avstånd använder din position först efter att du har godkänt det.",
    help3: "Använd sök eller Alla kategorier om du inte vill använda hjulet.",
  },
} as const;

const iconFor: Record<CategoryId, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  banks: Banknote,
  clinics: Building2,
  electricity: PlugZap,
  embassies: Globe2,
  hospitals: Hospital,
  immigration: ShieldCheck,
  internet: Wifi,
  tax: Building2,
  libraries: LibraryBig,
};

function haversine(from: Coordinates, to: Coordinates) {
  const r = 6371;
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((from.latitude * Math.PI) / 180) *
      Math.cos((to.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brandCompact" : ""}`} aria-label="Around Town Stockholm">
      <div className="brandAround">AROUND</div>
      <div className="brandTown">TOWN</div>
      <div className="brandStockholm">STOCKHOLM</div>
    </div>
  );
}

function Intro({ language, setLanguage, onEnter, onHelp }: {
  language: Language;
  setLanguage: (value: Language) => void;
  onEnter: () => void;
  onHelp: () => void;
}) {
  const t = copy[language];
  return (
    <main className="introScreen">
      <div className="introGlow" />
      <header className="introTop">
        <button className="languagePill" onClick={() => setLanguage(language === "en" ? "sv" : "en")}>
          <span className={language === "en" ? "active" : ""}>EN</span> / <span className={language === "sv" ? "active" : ""}>SV</span>
        </button>
        <button className="infoButton" onClick={onHelp} aria-label="Information"><BadgeInfo size={27} /></button>
      </header>
      <div className="introPerson" aria-hidden="true">
        <div className="portraitHair" />
        <div className="portraitFace">AT</div>
        <div className="portraitPhone" />
      </div>
      <section className="introContent">
        <Logo />
        <p>{t.intro}</p>
        <button className="primaryButton" onClick={onEnter}>{t.explore}</button>
        <button className="secondaryButton" onClick={onEnter}>{t.signIn}</button>
        <small>COPYRIGHT 2026 AROUND TOWN</small>
      </section>
    </main>
  );
}

function HelpModal({ language, onClose }: { language: Language; onClose: () => void }) {
  const t = copy[language];
  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="help-title">
      <div className="modalCard helpCard">
        <button className="modalClose" onClick={onClose} aria-label={t.close}><X /></button>
        <Logo compact />
        <h2 id="help-title">{t.about}</h2>
        <p>{t.aboutText}</p>
        <ol>
          <li>{t.help1}</li>
          <li>{t.help2}</li>
          <li>{t.help3}</li>
        </ol>
        <button className="primaryButton" onClick={onClose}>{t.close}</button>
      </div>
    </div>
  );
}

function ServiceCard({ service, language, location, featured = false }: {
  service: Service;
  language: Language;
  location: Coordinates | null;
  featured?: boolean;
}) {
  const t = copy[language];
  const distance = location && service.latitude && service.longitude
    ? haversine(location, { latitude: service.latitude, longitude: service.longitude })
    : null;
  const mapUrl = service.latitude && service.longitude
    ? `https://www.google.com/maps/search/?api=1&query=${service.latitude},${service.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`;

  return (
    <article className={`serviceCard ${featured ? "featured" : ""}`}>
      <div className="serviceCardTop">
        <div>
          <span className="serviceType">{language === "en" ? service.typeEn : service.typeSv}</span>
          <h3>{service.name}</h3>
        </div>
        <span className="distancePill">{service.online ? "ONLINE" : distance !== null ? `${distance.toFixed(1)} km` : "STHLM"}</span>
      </div>
      <div className="serviceLine"><MapPin size={21} /><span>{service.address}</span></div>
      <div className="serviceLine"><CircleHelp size={21} /><span>{language === "en" ? service.hoursEn : service.hoursSv}</span></div>
      <div className="serviceActions">
        {service.phone && <a href={`tel:${service.phone.replace(/\s|-/g, "")}`}><Phone size={18} />{t.call}</a>}
        {!service.online && <a href={mapUrl} target="_blank" rel="noreferrer"><LocateFixed size={18} />{t.directions}</a>}
        <a href={service.website} target="_blank" rel="noreferrer"><ExternalLink size={18} />{t.website}</a>
      </div>
      {service.official && <div className="verified"><ShieldCheck size={14} />{t.official}</div>}
    </article>
  );
}

function Directory({ language, onHelp }: { language: Language; onHelp: () => void }) {
  const t = copy[language];
  const [selected, setSelected] = useState<CategoryId>("hospitals");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationMessage, setLocationMessage] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    const filtered = services.filter((service) => {
      const category = categories.find((item) => item.id === service.category);
      const haystack = [service.name, service.address, service.typeEn, service.typeSv, category?.en, category?.sv].join(" ").toLowerCase();
      return (showAll || q ? true : service.category === selected) && (!q || haystack.includes(q));
    });
    return [...filtered].sort((a, b) => {
      if (!location) return 0;
      const aDistance = a.latitude && a.longitude ? haversine(location, { latitude: a.latitude, longitude: a.longitude }) : 9999;
      const bDistance = b.latitude && b.longitude ? haversine(location, { latitude: b.latitude, longitude: b.longitude }) : 9999;
      return aDistance - bDistance;
    });
  }, [selected, query, showAll, location]);

  function requestLocation() {
    setLocationMessage("");
    if (!navigator.geolocation) {
      setLocationMessage(t.locationDenied);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      () => setLocationMessage(t.locationDenied),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  }

  return (
    <section className="directoryScreen">
      <header className="appHeader">
        <Logo compact />
        <button className="infoButton" onClick={onHelp} aria-label="Information"><BadgeInfo size={25} /></button>
      </header>
      <div className="categoryWheel" aria-label={t.allCategories}>
        {categories.map((category) => {
          const active = category.id === selected && !showAll;
          const Icon = iconFor[category.id];
          return (
            <button
              key={category.id}
              className={active ? "categoryButton active" : "categoryButton"}
              onClick={() => { setSelected(category.id); setShowAll(false); setQuery(""); }}
            >
              <span className="categoryNumber">{category.number}</span>
              <Icon size={18} />
              <span>{language === "en" ? category.en : category.sv}</span>
            </button>
          );
        })}
      </div>
      <button className={`allCategoryButton ${showAll ? "active" : ""}`} onClick={() => setShowAll((value) => !value)}>
        <Menu size={18} />{t.allCategories}<ChevronDown size={17} />
      </button>
      <label className="searchBox">
        <Search size={22} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} />
        {query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={18} /></button>}
      </label>
      <button className="locationButton" onClick={requestLocation}>
        <LocateFixed size={17} />{location ? t.locationOn : t.locationOff}
      </button>
      {locationMessage && <p className="statusMessage">{locationMessage}</p>}
      {selected === "hospitals" && !showAll && !query && <div className="emergencyBanner">{t.emergency}</div>}
      <div className="resultsHeader">
        <span>{location ? t.nearest : t.locations}</span><small>{results.length}</small>
      </div>
      <p className="demoNotice">{t.demo}</p>
      <div className="serviceList">
        {results.length ? results.map((service, index) => (
          <ServiceCard key={service.id} service={service} language={language} location={location} featured={index === 0} />
        )) : <div className="emptyState"><Search size={34} /><p>{t.noResults}</p></div>}
      </div>
    </section>
  );
}

function CalculatorView({ language, onHelp }: { language: Language; onHelp: () => void }) {
  const t = copy[language];
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [replace, setReplace] = useState(false);

  function input(value: string) {
    if (value === "." && display.includes(".")) return;
    setDisplay((current) => replace || current === "0" ? (value === "." ? "0." : value) : current + value);
    setReplace(false);
  }

  function calculate(nextOperator?: string) {
    const current = Number(display);
    let result = current;
    if (stored !== null && operator) {
      if (operator === "+") result = stored + current;
      if (operator === "−") result = stored - current;
      if (operator === "×") result = stored * current;
      if (operator === "÷") result = current === 0 ? 0 : stored / current;
      if (operator === "%") result = (stored * current) / 100;
      setDisplay(Number.isFinite(result) ? String(Number(result.toFixed(10))) : "0");
    }
    if (nextOperator) { setStored(result); setOperator(nextOperator); setReplace(true); }
    else { setStored(null); setOperator(null); setReplace(true); }
  }

  const keys = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", ".", "0", "⌫", "+"];
  return (
    <section className="utilityScreen">
      <header className="utilityHeader"><span /> <h1>{t.calculator}</h1><button className="infoButton" onClick={onHelp}><BadgeInfo size={24} /></button></header>
      <div className="calculatorDisplay"><small>{stored !== null && operator ? `${stored} ${operator}` : ""}</small><strong>{display}</strong></div>
      <div className="calculatorTopKeys">
        <button onClick={() => { setDisplay("0"); setStored(null); setOperator(null); }}>C</button>
        <button onClick={() => calculate("%")}>%</button>
        <button onClick={() => calculate("÷")}>÷</button>
      </div>
      <div className="calculatorKeys">
        {keys.map((key) => (
          <button
            key={key}
            className={["÷", "×", "−", "+"].includes(key) ? "operator" : key === "⌫" ? "delete" : ""}
            onClick={() => {
              if (["÷", "×", "−", "+"].includes(key)) calculate(key);
              else if (key === "⌫") setDisplay((current) => current.length > 1 ? current.slice(0, -1) : "0");
              else input(key);
            }}
          >{key}</button>
        ))}
        <button className="equals" onClick={() => calculate()}>=</button>
      </div>
    </section>
  );
}

function NotesView({ language, onHelp }: { language: Language; onHelp: () => void }) {
  const t = copy[language];
  const [notes, setNotes] = useState<Note[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("around-town-notes");
    // Browser storage is intentionally loaded after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setNotes(JSON.parse(stored));
    else setNotes([
      { id: "welcome", title: language === "en" ? "Welcome to Around Town" : "Välkommen till Around Town", body: language === "en" ? "Save reminders, shopping lists and useful information here. Notes remain on this device." : "Spara påminnelser, inköpslistor och viktig information här. Anteckningar stannar på den här enheten.", date: new Date().toISOString(), category: "LIFESTYLE" },
    ]);
  }, [language]);

  useEffect(() => { if (notes.length) window.localStorage.setItem("around-town-notes", JSON.stringify(notes)); }, [notes]);

  function addNote() {
    if (!title.trim() && !body.trim()) return;
    setNotes((current) => [{ id: crypto.randomUUID(), title: title.trim() || t.newNote, body: body.trim(), date: new Date().toISOString(), category: "OTHER" }, ...current]);
    setTitle(""); setBody(""); setEditing(false);
  }

  return (
    <section className="utilityScreen notesScreen">
      <header className="utilityHeader"><span /><h1>{t.notes}</h1><button className="infoButton" onClick={onHelp}><BadgeInfo size={24} /></button></header>
      <div className="notesLabel">LIFESTYLE</div>
      <div className="notesList">
        {notes.map((note, index) => {
          const isOpen = expanded === note.id || index === 0;
          return (
            <article key={note.id} className={`noteCard ${index === 0 ? "dark" : ""}`}>
              <button className="noteHeader" onClick={() => setExpanded(isOpen && index !== 0 ? null : note.id)}>
                <span><strong>{note.title}</strong><small>{new Date(note.date).toLocaleDateString(language === "en" ? "en-GB" : "sv-SE")}</small></span>
                <ChevronDown className={isOpen ? "rotate" : ""} />
              </button>
              {isOpen && <div className="noteBody"><p>{note.body}</p><button onClick={() => setNotes((current) => current.filter((item) => item.id !== note.id))}><Trash2 size={16} />Delete</button></div>}
            </article>
          );
        })}
      </div>
      {editing ? (
        <div className="noteEditor">
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t.noteTitle} autoFocus />
          <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder={t.noteBody} rows={5} />
          <div><button className="primaryButton" onClick={addNote}>{t.save}</button><button className="textButton" onClick={() => setEditing(false)}>{t.cancel}</button></div>
        </div>
      ) : <button className="newNoteButton" onClick={() => setEditing(true)}><NotebookPen size={20} />{t.newNote}</button>}
    </section>
  );
}

function SettingsView({ language, setLanguage, onHelp, onReset }: {
  language: Language;
  setLanguage: (language: Language) => void;
  onHelp: () => void;
  onReset: () => void;
}) {
  const t = copy[language];
  const items = [
    { icon: Languages, label: t.language, action: () => setLanguage(language === "en" ? "sv" : "en"), value: language.toUpperCase() },
    { icon: ShieldCheck, label: t.privacy, action: onHelp },
    { icon: ShieldCheck, label: t.security, action: onHelp },
    { icon: CircleHelp, label: t.faq, action: onHelp },
    { icon: Mail, label: t.support, href: "mailto:support@aroundtownstockholm.com" },
  ];
  return (
    <section className="utilityScreen settingsScreen">
      <header className="utilityHeader"><span /><h1>{t.settings}</h1><button className="infoButton" onClick={onHelp}><BadgeInfo size={24} /></button></header>
      <div className="settingsGuest"><strong>{t.guest}</strong><p>{t.guestText}</p></div>
      <div className="settingsList">
        {items.map((item) => {
          const Icon = item.icon;
          const content = <><span><Icon size={20} />{item.label}</span><span>{item.value}<ChevronRight size={20} /></span></>;
          return item.href ? <a key={item.label} href={item.href}>{content}</a> : <button key={item.label} onClick={item.action}>{content}</button>;
        })}
      </div>
      <button className="dangerButton" onClick={() => { window.localStorage.removeItem("around-town-notes"); window.location.reload(); }}>{t.clearData}</button>
      <button className="logoutButton" onClick={onReset}>{language === "en" ? "RETURN TO START" : "TILL STARTSIDAN"}</button>
    </section>
  );
}

function BottomNav({ tab, setTab, language }: { tab: Tab; setTab: (tab: Tab) => void; language: Language }) {
  const t = copy[language];
  const items: { id: Tab; icon: React.ComponentType<{ size?: number }>; label: string }[] = [
    { id: "home", icon: Home, label: language === "en" ? "Home" : "Hem" },
    { id: "calculator", icon: Calculator, label: t.calculator.charAt(0) + t.calculator.slice(1).toLowerCase() },
    { id: "notes", icon: NotebookPen, label: t.notes.charAt(0) + t.notes.slice(1).toLowerCase() },
    { id: "settings", icon: Settings, label: t.settings.charAt(0) + t.settings.slice(1).toLowerCase() },
  ];
  return (
    <nav className="bottomNav" aria-label="Main navigation">
      {items.map((item) => {
        const Icon = item.icon;
        return <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)}><Icon size={24} /><span>{item.label}</span></button>;
      })}
    </nav>
  );
}

export default function AroundTownApp() {
  const [language, setLanguageState] = useState<Language>("en");
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("around-town-language") as Language | null;
    // Browser preferences are intentionally restored after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedLanguage === "en" || storedLanguage === "sv") setLanguageState(storedLanguage);
    setEntered(window.sessionStorage.getItem("around-town-entered") === "true");
  }, []);

  function setLanguage(value: Language) {
    setLanguageState(value);
    window.localStorage.setItem("around-town-language", value);
    document.documentElement.lang = value;
  }

  function enter() {
    setEntered(true);
    window.sessionStorage.setItem("around-town-entered", "true");
  }

  function reset() {
    setEntered(false);
    setTab("home");
    window.sessionStorage.removeItem("around-town-entered");
  }

  return (
    <div className="siteCanvas">
      <div className="phoneShell">
        {!entered ? <Intro language={language} setLanguage={setLanguage} onEnter={enter} onHelp={() => setHelpOpen(true)} /> : (
          <>
            <main className="appMain">
              {tab === "home" && <Directory language={language} onHelp={() => setHelpOpen(true)} />}
              {tab === "calculator" && <CalculatorView language={language} onHelp={() => setHelpOpen(true)} />}
              {tab === "notes" && <NotesView language={language} onHelp={() => setHelpOpen(true)} />}
              {tab === "settings" && <SettingsView language={language} setLanguage={setLanguage} onHelp={() => setHelpOpen(true)} onReset={reset} />}
              <BuildBadge />
            </main>
            <BottomNav tab={tab} setTab={setTab} language={language} />
          </>
        )}
        {helpOpen && <HelpModal language={language} onClose={() => setHelpOpen(false)} />}
      </div>
      <aside className="desktopPitch">
        <Logo />
        <h1>Essential Stockholm.<br />All in one place.</h1>
        <p>A working web-app MVP based on the original illustrated concept. Search services, use location-aware cards, calculate and save local notes.</p>
        <div className="featureChips"><span>EN / SV</span><span>Guest mode</span><span>Installable</span><span>No account needed</span></div>
        <small>Designed mobile-first. Open this page on a phone for the app experience.</small>
      </aside>
    </div>
  );
}
