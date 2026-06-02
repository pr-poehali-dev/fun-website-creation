import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "Серверы",  href: "#servers",  icon: "Server" },
  { label: "Новости",  href: "#news",     icon: "Newspaper" },
  { label: "Магазин",  href: "#contact",  icon: "ShoppingBag" },
  { label: "Discord",  href: "#contact",  icon: "MessageCircle" },
];

const MODES = [
  {
    icon: "Leaf",
    title: "Vanilla+",
    subtitle: "Выживание с улучшениями",
    version: "1.20.4",
    desc: "Классический выживач без pay-to-win. Честная игра, дружное комьюнити и хардкорный гринд.",
    features: ["Grief Protection", "Экономика", "Кланы", "Ивенты"],
    ip: "play.neonix.fun",
    status: "online" as const,
    players: 0,
    maxPlayers: 100,
    color: "#22c55e",
    colorBg: "rgba(34,197,94,0.08)",
    colorBorder: "rgba(34,197,94,0.2)",
  },
  {
    icon: "Skull",
    title: "Анархия",
    subtitle: "Без правил · Хардкор",
    version: "1.20.4",
    desc: "Никаких ограничений. Выживи любой ценой. В разработке — следи за анонсами.",
    features: ["Без модерации", "PvP везде", "Без варпов", "Хардкор"],
    ip: "—",
    status: "soon" as const,
    players: 0,
    maxPlayers: 0,
    color: "#a78bfa",
    colorBg: "rgba(167,139,250,0.08)",
    colorBorder: "rgba(167,139,250,0.2)",
  },
];

const STATS = [
  { value: "24/7", label: "Аптайм" },
  { value: "1.20.4", label: "Версия" },
  { value: "Free", label: "Вход" },
  { value: "2025", label: "Год запуска" },
];

const NEWS = [
  {
    date: "2 июн 2025",
    tag: "Запуск",
    tagColor: "bg-violet-500/20 text-violet-300",
    title: "Neonix Project — официальное открытие!",
    desc: "Мы рады объявить об официальном открытии проекта. Сервер Vanilla+ уже доступен — заходи и стань первым на сервере!",
    icon: "Rocket",
    iconColor: "#a78bfa",
    iconBg: "rgba(167,139,250,0.1)",
  },
  {
    date: "1 июн 2025",
    tag: "Анонс",
    tagColor: "bg-blue-500/20 text-blue-300",
    title: "Анархия — второй сервер в разработке",
    desc: "Второй режим Neonix — Анархия — в активной разработке. Никаких правил, чистый хардкор. Релиз скоро.",
    icon: "Skull",
    iconColor: "#818cf8",
    iconBg: "rgba(129,140,248,0.1)",
  },
  {
    date: "30 мая 2025",
    tag: "Событие",
    tagColor: "bg-green-500/20 text-green-300",
    title: "Стартовый кит для новых игроков",
    desc: "Каждый новый игрок получает стартовый набор вещей при первом входе на сервер. Заходи — забирай бонус!",
    icon: "Gift",
    iconColor: "#34d399",
    iconBg: "rgba(52,211,153,0.1)",
  },
  {
    date: "28 мая 2025",
    tag: "Патч",
    tagColor: "bg-gray-500/20 text-gray-400",
    title: "Оптимизация и настройка плагинов",
    desc: "Проведена финальная настройка всех плагинов, оптимизирован TPS. Стабильность улучшена.",
    icon: "Wrench",
    iconColor: "#94a3b8",
    iconBg: "rgba(148,163,184,0.1)",
  },
];

export default function Index() {
  const [sideOpen, setSideOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "servers", "news", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  const copyIP = () => {
    navigator.clipboard?.writeText("play.neonix.fun");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-page text-[#e2e0ef] overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── LEFT HOVER PANEL ── */}
      <div
        className="fixed top-1/2 -translate-y-1/2 z-50"
        style={{ left: sideOpen ? 0 : "-204px", transition: "left 0.4s cubic-bezier(0.4,0,0.2,1)" }}
        onMouseEnter={() => setSideOpen(true)}
        onMouseLeave={() => setSideOpen(false)}
      >
        <div className="w-52 flex flex-col py-5 px-4 gap-1 left-panel-blur" style={{ borderRadius: "0 16px 16px 0" }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 px-3 py-2.5 mb-3 rounded-xl transition-all hover:bg-violet-500/10 group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#7c4dfd,#5b2be8)", boxShadow: "0 2px 12px rgba(124,77,253,0.4)" }}>
              <Icon name="Zap" size={15} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-[12px] font-bold text-white leading-none" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.05em" }}>NEONIX</p>
              <p className="text-[9px] text-violet-400/70 tracking-widest leading-none mt-0.5">PROJECT</p>
            </div>
          </button>

          <p className="text-[9px] text-violet-400/40 tracking-[0.3em] uppercase px-3 mb-1">Навигация</p>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => { scrollTo(item.href); setSideOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                activeSection === item.href.replace("#", "")
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/25"
                  : "text-[#8b87a8] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon name={item.icon} size={15}
                className={activeSection === item.href.replace("#","") ? "text-violet-400" : "text-[#5b567a]"}
                fallback="Circle" />
              {item.label}
            </button>
          ))}

          <div className="mt-4 pt-4 px-3" style={{ borderTop: "1px solid rgba(124,77,253,0.12)" }}>
            <div className="flex items-center gap-2">
              <div className="online-dot" />
              <span className="text-[10px] text-green-400 font-medium">1 сервер онлайн</span>
            </div>
          </div>
        </div>

        {/* Tab */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex flex-col items-center justify-center gap-1.5 px-2 py-4 cursor-pointer"
          style={{
            background: "rgba(20,16,38,0.82)",
            backdropFilter: "blur(18px)",
            borderRadius: "0 10px 10px 0",
            border: "1px solid rgba(124,77,253,0.15)",
            borderLeft: "none",
          }}
        >
          <div className="w-[3px] h-4 rounded-full" style={{ background: "#7c4dfd" }} />
          <div className="w-[3px] h-2 rounded-full" style={{ background: "rgba(124,77,253,0.3)" }} />
          <div className="w-[3px] h-4 rounded-full" style={{ background: "#7c4dfd" }} />
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? "nav-blur" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 mr-auto">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#7c4dfd,#5b2be8)", boxShadow: "0 2px 12px rgba(124,77,253,0.4)" }}>
              <Icon name="Zap" size={15} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.08em" }}>
              NEONIX <span className="text-violet-400">PROJECT</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.href.replace("#","")
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-[#8b87a8] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="btn-primary px-5 py-2 text-sm hidden md:block">
            Вступить в Discord
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="hero-bg relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 z-10 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,77,253,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(91,43,232,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fade-up"
            style={{ background: "rgba(124,77,253,0.12)", border: "1px solid rgba(124,77,253,0.25)", animationFillMode: "forwards" }}>
            <div className="online-dot" />
            <span className="text-xs font-semibold text-violet-300">Minecraft Java 1.20.4 · Сервер онлайн</span>
          </div>

          {/* Title */}
          <h1 className="font-black leading-none mb-6 animate-fade-up delay-100"
            style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(3rem,10vw,7rem)", animationFillMode: "forwards", opacity: 0 }}>
            <span className="text-white">NEONIX</span>
            <br />
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#7c4dfd,#5b2be8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              PROJECT
            </span>
          </h1>

          <p className="text-[#8b87a8] text-lg max-w-lg mx-auto mb-10 leading-relaxed animate-fade-up delay-200" style={{ animationFillMode: "forwards", opacity: 0 }}>
            Неоновый Minecraft-проект с уникальными режимами. Vanilla+ уже открыт — присоединяйся прямо сейчас.
          </p>

          {/* IP Copy */}
          <div className="flex flex-col items-center gap-2 mb-8 animate-fade-up delay-300" style={{ animationFillMode: "forwards", opacity: 0 }}>
            <button
              onClick={copyIP}
              className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "rgba(124,77,253,0.1)",
                border: "1px solid rgba(124,77,253,0.3)",
                boxShadow: "0 0 30px rgba(124,77,253,0.1)",
              }}
            >
              <Icon name="Server" size={16} className="text-violet-400" />
              <span className="font-mono text-violet-200 text-base font-semibold tracking-widest">play.neonix.fun</span>
              <div className="flex items-center gap-1 ml-2">
                <Icon name={copied ? "Check" : "Copy"} size={14} className={copied ? "text-green-400" : "text-violet-500"} />
                <span className="text-xs text-violet-500">{copied ? "Скопировано!" : "Копировать"}</span>
              </div>
            </button>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 mb-16 animate-fade-up delay-400" style={{ animationFillMode: "forwards", opacity: 0 }}>
            <button className="btn-primary px-8 py-3 text-sm flex items-center gap-2">
              <Icon name="MessageCircle" size={16} />
              Вступить в Discord
            </button>
            <button className="btn-ghost px-8 py-3 text-sm flex items-center gap-2" onClick={() => scrollTo("#servers")}>
              <Icon name="Server" size={16} />
              Серверы
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up delay-500" style={{ animationFillMode: "forwards", opacity: 0 }}>
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: "rgba(124,77,253,0.07)", border: "1px solid rgba(124,77,253,0.12)" }}>
                <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Oswald',sans-serif" }}>{s.value}</div>
                <div className="text-xs text-[#6b6888] font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-widest text-violet-400">Скролл</span>
          <div className="w-px h-8 bg-gradient-to-b from-violet-500 to-transparent" />
        </div>
      </section>

      {/* ── SERVERS ── */}
      <section id="servers" className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">Режимы игры</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Oswald',sans-serif" }}>Наши серверы</h2>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <div className="online-dot" />
              <span className="text-xs font-semibold text-green-400">1 из 2 онлайн</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODES.map((mode, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                style={{
                  background: mode.colorBg,
                  borderColor: mode.colorBorder,
                  boxShadow: `0 4px 24px ${mode.color}10`,
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${mode.color}15`, border: `1px solid ${mode.color}30` }}>
                      <Icon name={mode.icon} size={26} style={{ color: mode.color }} fallback="Server" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Oswald',sans-serif" }}>{mode.title}</h3>
                      <p className="text-xs font-medium mt-0.5" style={{ color: mode.color }}>{mode.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: `${mode.color}15`, color: mode.color, border: `1px solid ${mode.color}30` }}>
                    {mode.status === "online" ? "● Онлайн" : "◌ Скоро"}
                  </span>
                </div>

                <p className="text-sm text-[#8b87a8] leading-relaxed mb-5">{mode.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {mode.features.map((f) => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: "rgba(255,255,255,0.05)", color: "#8b87a8", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${mode.color}15` }}>
                  {mode.status === "online" ? (
                    <>
                      <div>
                        <p className="text-[10px] text-[#5b567a] uppercase tracking-wider mb-0.5">IP адрес</p>
                        <p className="font-mono text-sm font-semibold text-white">{mode.ip}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#5b567a] uppercase tracking-wider mb-0.5">Игроки</p>
                        <p className="text-sm font-bold" style={{ color: mode.color }}>{mode.players}/{mode.maxPlayers}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={14} className="text-violet-400" />
                      <span className="text-sm text-[#8b87a8]">В разработке — следи за анонсами</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-6xl mx-auto" />

      {/* ── NEWS ── */}
      <section id="news" className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">Последние события</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Oswald',sans-serif" }}>Новости проекта</h2>
            </div>
            <button className="btn-ghost px-4 py-2 text-sm flex items-center gap-2">
              Все новости <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          {/* Главная новость */}
          <div className="vs-card overflow-hidden mb-4 group cursor-pointer">
            <div className="flex flex-col md:flex-row">
              {/* Превью */}
              <div className="md:w-72 flex-shrink-0 h-48 md:h-auto relative flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a1040 0%, #0e0b1a 100%)" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(167,139,250,0.2) 0%, transparent 70%)" }} />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: NEWS[0].iconBg, border: `1px solid ${NEWS[0].iconColor}30` }}>
                    <Icon name={NEWS[0].icon} size={30} style={{ color: NEWS[0].iconColor }} fallback="FileText" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: NEWS[0].iconColor + "80" }}>
                    Neonix Project
                  </span>
                </div>
              </div>

              {/* Текст */}
              <div className="flex-1 p-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${NEWS[0].tagColor}`}>
                    {NEWS[0].tag}
                  </span>
                  <span className="text-xs text-[#5b567a]">{NEWS[0].date}</span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-violet-300 transition-colors mb-3"
                  style={{ fontFamily: "'Oswald',sans-serif" }}>
                  {NEWS[0].title}
                </h3>
                <p className="text-sm text-[#8b87a8] leading-relaxed mb-5">{NEWS[0].desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-violet-400 group-hover:gap-2 transition-all">
                  <span>Читать подробнее</span>
                  <Icon name="ArrowRight" size={13} />
                </div>
              </div>
            </div>
          </div>

          {/* Остальные новости */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NEWS.slice(1).map((item, i) => (
              <div key={i} className="vs-card p-5 cursor-pointer group flex flex-col">
                {/* Иконка-превью */}
                <div className="w-full h-28 rounded-xl flex items-center justify-center mb-5 overflow-hidden relative"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${item.iconColor}15 0%, transparent 70%)` }} />
                  <div className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: item.iconBg, border: `1px solid ${item.iconColor}25` }}>
                    <Icon name={item.icon} size={22} style={{ color: item.iconColor }} fallback="FileText" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${item.tagColor}`}>{item.tag}</span>
                  <span className="text-[10px] text-[#5b567a]">{item.date}</span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors leading-snug mb-2"
                  style={{ fontFamily: "'Oswald',sans-serif" }}>
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#6b6888] leading-relaxed flex-1">{item.desc}</p>

                <div className="flex items-center gap-1 text-[10px] font-semibold text-violet-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Читать</span><Icon name="ArrowRight" size={10} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-6xl mx-auto" />

      {/* ── JOIN / CONTACT ── */}
      <section id="contact" className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1a1040 0%, #141026 60%, #0e0b1a 100%)", border: "1px solid rgba(124,77,253,0.2)" }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(124,77,253,0.12) 0%, transparent 70%)" }} />
            <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <p className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">Присоединяйся</p>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Oswald',sans-serif" }}>
                  Войди в игру<br />
                  <span style={{ background: "linear-gradient(135deg,#a78bfa,#7c4dfd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    прямо сейчас
                  </span>
                </h2>
                <p className="text-[#8b87a8] text-sm leading-relaxed max-w-md">
                  Сервер Vanilla+ уже открыт. Подключайся через Java клиент или вступи в наш Discord, чтобы быть в курсе всех событий.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { icon: "Server",    label: "Java IP",   value: "play.neonix.fun", click: copyIP },
                    { icon: "Hash",      label: "Discord",   value: "discord.gg/neonix", click: undefined },
                    { icon: "BookOpen",  label: "Версия",    value: "1.20.4 Java", click: undefined },
                  ].map((c) => (
                    <button
                      key={c.label}
                      onClick={c.click}
                      className="flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all text-left"
                      style={{ background: "rgba(124,77,253,0.08)", border: "1px solid rgba(124,77,253,0.18)" }}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(124,77,253,0.15)" }}>
                        <Icon name={c.icon} size={16} className="text-violet-400" fallback="Info" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#5b567a] uppercase tracking-wider">{c.label}</p>
                        <p className="text-sm font-mono font-semibold text-white">{c.value}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-2">
                  <button className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2">
                    <Icon name="MessageCircle" size={16} />
                    Discord
                  </button>
                  <button className="btn-ghost flex-1 py-3 text-sm" onClick={copyIP}>
                    {copied ? "✓ Скопировано" : "Копировать IP"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-8" style={{ borderTop: "1px solid rgba(124,77,253,0.1)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#7c4dfd,#5b2be8)" }}>
              <Icon name="Zap" size={13} className="text-white" />
            </div>
            <span className="font-bold text-white" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.08em" }}>
              NEONIX <span className="text-violet-400">PROJECT</span>
            </span>
          </div>

          <p className="text-xs text-[#4a4668]">© 2025 Neonix Project · Minecraft Java Edition</p>

          <div className="flex gap-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.label} onClick={() => scrollTo(item.href)}
                className="px-3 py-1.5 rounded-lg text-xs text-[#6b6888] hover:text-white hover:bg-white/5 transition-all">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
