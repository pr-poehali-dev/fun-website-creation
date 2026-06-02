import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Серверы", href: "#servers" },
  { label: "Новости", href: "#news" },
  { label: "Магазин", href: "#contact" },
  { label: "Discord", href: "#contact" },
];

const MODES = [
  {
    icon: "Leaf",
    tag: "Онлайн",
    title: "Vanilla+",
    version: "1.20.4",
    desc: "Классический выживач с небольшими улучшениями. Никакого pay-to-win — только честная игра, дружное комьюнити и хардкорный гринд.",
    features: ["Grief Protection", "Экономика", "Клановая система", "Ежедневные ивенты"],
    ip: "play.neonix.fun",
    status: "online" as const,
    players: "0/100",
    color: "#39ff14",
  },
  {
    icon: "Skull",
    tag: "Скоро",
    title: "Анархия",
    version: "1.20.4",
    desc: "Никаких правил. Никаких ограничений. Выживи любой ценой на сервере где закон — кулак сильнейшего. В разработке.",
    features: ["Без модерации", "PvP везде", "Без варпов", "Хардкор-режим"],
    ip: "—",
    status: "maintenance" as const,
    players: "—",
    color: "#ff0080",
  },
];

const STATS = [
  { value: "1", label: "Активный сервер" },
  { value: "1.20.4", label: "Версия" },
  { value: "24/7", label: "Аптайм" },
  { value: "Free", label: "Вход бесплатный" },
];

const NEWS = [
  {
    date: "2 июня 2025",
    tag: "Запуск",
    title: "Neonix Project — открытие серверов!",
    desc: "Мы рады объявить об официальном открытии проекта. Сервер Vanilla+ уже доступен — заходи и стань первым!",
  },
  {
    date: "1 июня 2025",
    tag: "Анонс",
    title: "Анархия — сервер в разработке",
    desc: "Второй сервер Neonix — Анархия — уже в активной разработке. Следи за обновлениями, релиз скоро.",
  },
  {
    date: "30 мая 2025",
    tag: "Событие",
    title: "Бонус за первый вход — стартовый кит",
    desc: "Каждый новый игрок получает стартовый набор вещей. Заходи первым — забирай бонус!",
  },
  {
    date: "28 мая 2025",
    tag: "Патч",
    title: "Настройка плагинов и оптимизация",
    desc: "Проведена финальная настройка всех плагинов, оптимизирован TPS сервера. Играть стало плавнее.",
  },
];

const TAG_COLOR: Record<string, string> = {
  "Запуск":     "border-cyan-500/40 text-cyan-400",
  "Анонс":      "border-blue-500/40 text-blue-400",
  "Обновление": "border-cyan-500/40 text-cyan-400",
  "Техработы":  "border-yellow-500/40 text-yellow-400",
  "Событие":    "border-purple-500/40 text-purple-400",
  "Патч":       "border-gray-500/40 text-gray-400",
};

export default function Index() {
  const [sideOpen, setSideOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "services", "servers", "news", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  const onlineCount = MODES.filter((s) => s.status === "online").length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="scan-line" />
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />

      {/* ─── RIGHT HOVER DRAWER ─── */}
      <div
        className="fixed top-1/2 -translate-y-1/2 z-50"
        style={{ right: sideOpen ? 0 : "-220px", transition: "right 0.4s cubic-bezier(0.4,0,0.2,1)" }}
        onMouseEnter={() => setSideOpen(true)}
        onMouseLeave={() => setSideOpen(false)}
      >
        {/* Peek tab */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full flex flex-col items-center justify-center gap-1 px-2 py-4 cursor-pointer"
          style={{
            background: "#0d0d0d",
            borderTop: "1px solid rgba(0,255,255,0.2)",
            borderLeft: "1px solid rgba(0,255,255,0.2)",
            borderBottom: "1px solid rgba(0,255,255,0.2)",
            boxShadow: "-4px 0 20px rgba(0,255,255,0.08)",
          }}
        >
          <div className="w-[2px] h-6 rounded" style={{ background: "#00ffff", boxShadow: "0 0 6px #00ffff" }} />
          <div className="w-[2px] h-4 rounded bg-white/20 my-0.5" />
          <div className="w-[2px] h-6 rounded" style={{ background: "#39ff14", boxShadow: "0 0 6px #39ff14" }} />
          <span className="text-[8px] text-cyan-500/60 tracking-widest mt-2" style={{ writingMode: "vertical-rl" }}>МЕНЮ</span>
        </div>

        {/* Panel */}
        <div
          className="w-56 h-auto flex flex-col py-6 px-5 gap-2"
          style={{
            background: "linear-gradient(135deg, #0d0d0d 0%, #111 100%)",
            borderLeft: "1px solid rgba(0,255,255,0.18)",
            borderTop: "1px solid rgba(0,255,255,0.1)",
            borderBottom: "1px solid rgba(0,255,255,0.1)",
            boxShadow: "-8px 0 40px rgba(0,255,255,0.08)",
          }}
        >
          <p className="text-[9px] text-gray-600 tracking-[0.3em] uppercase mb-3">Навигация</p>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.href}
              onClick={() => { scrollTo(item.href); setSideOpen(false); }}
              className={`text-left px-3 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-200 border border-transparent ${
                activeSection === item.href.replace("#", "")
                  ? "text-cyan-400 border-cyan-500/30 bg-cyan-500/5"
                  : "text-gray-500 hover:text-cyan-300 hover:border-cyan-500/15 hover:bg-white/2"
              }`}
            >
              <span className="opacity-30 mr-2" style={{ fontFamily: "'Oswald', sans-serif" }}>0{i + 1}</span>
              {item.label}
            </button>
          ))}

          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#39ff14", boxShadow: "0 0 6px #39ff14" }} />
              <span className="text-[10px] text-emerald-400 tracking-widest">{onlineCount}/{MODES.length} серверов онлайн</span>
            </div>
            <p className="text-[9px] text-gray-700 tracking-widest uppercase">Статус платформы: OK</p>
          </div>
        </div>
      </div>

      {/* ─── HEADER ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <span className="text-xl font-bold tracking-widest neon-text-cyan animate-flicker mr-auto" style={{ fontFamily: "'Oswald', sans-serif" }}>
            NEONIX<span className="text-white"> PROJECT</span>
          </span>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`neon-btn px-4 py-2 text-xs font-medium tracking-widest uppercase ${
                  activeSection === item.href.replace("#", "") ? "neon-btn-active" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <span className="inline-block text-xs font-medium tracking-[0.4em] uppercase text-cyan-500 mb-6 border border-cyan-500/30 px-4 py-2">
              Minecraft · Java Edition · 1.20.4
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-bold leading-none mb-6 animate-fade-up opacity-0 delay-100" style={{ fontFamily: "'Oswald', sans-serif", animationFillMode: "forwards" }}>
            <span className="block neon-text-cyan">NEONIX</span>
            <span className="block text-white">PROJECT</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
            Неоновый майнкрафт-проект с уникальными режимами. Присоединяйся — это только начало.
          </p>

          {/* IP block */}
          <div className="animate-fade-up opacity-0 delay-400 flex flex-col items-center gap-3 mb-12" style={{ animationFillMode: "forwards" }}>
            <div
              className="flex items-center gap-4 px-6 py-3 border cursor-pointer group"
              style={{ border: "1px solid rgba(0,255,255,0.3)", background: "rgba(0,255,255,0.04)" }}
              onClick={() => navigator.clipboard?.writeText("play.neonix.fun")}
            >
              <Icon name="Server" size={16} className="text-cyan-400" />
              <span className="font-mono text-cyan-300 text-lg tracking-widest">play.neonix.fun</span>
              <Icon name="Copy" size={14} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            <span className="text-[10px] text-gray-700 tracking-widest uppercase">Нажми чтобы скопировать IP</span>
          </div>

          <div className="flex items-center justify-center gap-4 animate-fade-up opacity-0 delay-400" style={{ animationFillMode: "forwards" }}>
            <button
              onClick={() => scrollTo("#servers")}
              className="px-8 py-3 font-medium text-sm tracking-widest uppercase text-black"
              style={{ background: "#00ffff", boxShadow: "0 0 20px #00ffff, 0 0 60px rgba(0,255,255,0.3)" }}
            >
              Выбрать сервер
            </button>
            <button onClick={() => scrollTo("#news")} className="neon-btn px-8 py-3 text-sm tracking-widest uppercase">
              Новости
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-24 border border-white/5 animate-fade-up opacity-0 delay-500" style={{ animationFillMode: "forwards" }}>
            {STATS.map((s) => (
              <div key={s.label} className="py-6 px-4 hover:bg-cyan-500/5 transition-colors border-r border-white/5 last:border-0" style={{ background: "#0d0d0d" }}>
                <div className="text-3xl font-bold neon-text-cyan mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.value}</div>
                <div className="text-xs text-gray-500 tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-600 tracking-widest uppercase">Скролл</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
        </div>
      </section>

      {/* ─── SERVERS ─── */}
      <section id="servers" className="relative py-32 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs tracking-[0.4em] uppercase text-cyan-500 font-medium">Режимы игры</span>
              <h2 className="text-5xl md:text-7xl font-bold mt-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <span className="text-white">НАШИ </span><span className="neon-text-cyan">СЕРВЕРЫ</span>
              </h2>
              <div className="w-20 h-[1px] mt-4" style={{ background: "#00ffff", boxShadow: "0 0 10px #00ffff" }} />
            </div>
            <div className="flex items-center gap-3 border border-emerald-500/20 px-4 py-2" style={{ background: "rgba(57,255,20,0.04)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#39ff14", boxShadow: "0 0 8px #39ff14" }} />
              <span className="text-xs text-emerald-400 tracking-widest uppercase">{onlineCount} онлайн</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODES.map((mode, i) => {
              const isOnline = mode.status === "online";
              return (
                <div
                  key={i}
                  className="relative border p-8 overflow-hidden group transition-all duration-300"
                  style={{
                    background: "#0d0d0d",
                    borderColor: isOnline ? "rgba(0,255,255,0.15)" : "rgba(255,0,128,0.15)",
                    boxShadow: isOnline ? "inset 0 0 40px rgba(0,255,255,0.02)" : "inset 0 0 40px rgba(255,0,128,0.02)",
                  }}
                >
                  {/* Glow corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: mode.color }} />

                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 border flex items-center justify-center" style={{ borderColor: `${mode.color}40`, background: `${mode.color}08` }}>
                        <Icon name={mode.icon} size={24} style={{ color: mode.color }} fallback="Server" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: mode.color, boxShadow: `0 0 6px ${mode.color}` }} />
                          <span className="text-[10px] tracking-widest uppercase" style={{ color: mode.color }}>{mode.tag}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>{mode.title}</h3>
                      </div>
                    </div>
                    <span className="text-xs border px-2 py-1 text-gray-500 border-white/10">{mode.version}</span>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{mode.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {mode.features.map((f) => (
                      <span key={f} className="text-[10px] border border-white/8 px-2 py-1 text-gray-500 tracking-wider">{f}</span>
                    ))}
                  </div>

                  <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                    {isOnline ? (
                      <>
                        <div>
                          <p className="text-[10px] text-gray-600 tracking-widest uppercase mb-1">IP адрес</p>
                          <p className="font-mono text-cyan-300 text-sm">{mode.ip}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-600 tracking-widest uppercase mb-1">Игроки</p>
                          <p className="text-sm font-medium" style={{ color: mode.color }}>{mode.players}</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 w-full">
                        <Icon name="Clock" size={14} className="text-pink-500" />
                        <span className="text-sm text-gray-500">Сервер в разработке — скоро открытие</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs tracking-[0.4em] uppercase text-cyan-500 font-medium">Последние события</span>
            <h2 className="text-5xl md:text-7xl font-bold mt-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <span className="text-white">НОВОСТИ </span><span className="neon-text-cyan">ПРОЕКТА</span>
            </h2>
            <div className="w-20 h-[1px] mt-4" style={{ background: "#00ffff", boxShadow: "0 0 10px #00ffff" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEWS.map((item, i) => (
              <div
                key={i}
                className="group border border-white/5 p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:border-cyan-500/25 relative"
                style={{ background: "#0d0d0d" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.02) 0%, transparent 60%)" }} />
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-[10px] border px-2 py-0.5 tracking-widest uppercase ${TAG_COLOR[item.tag] ?? "border-gray-500/40 text-gray-400"}`}>
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-gray-600 tracking-widest">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">
                  <span>Читать</span><Icon name="ArrowRight" size={12} />
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-500" style={{ background: "linear-gradient(90deg, #00ffff, transparent)", boxShadow: "0 0 8px #00ffff" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOIN ─── */}
      <section id="contact" className="relative py-32 z-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-xs tracking-[0.4em] uppercase text-cyan-500 font-medium">Присоединяйся</span>
          <h2 className="text-5xl md:text-7xl font-bold mt-3 mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <span className="text-white">ВОЙТИ В </span><span className="neon-text-cyan">ИГРУ</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg mx-auto">
            Подключайся к серверу прямо сейчас или вступай в наш Discord, чтобы не пропустить анонсы и ивенты.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-12 border border-white/5">
            {[
              { icon: "Server", label: "Java IP", value: "play.neonix.fun" },
              { icon: "Hash", label: "Discord", value: "discord.gg/neonix" },
              { icon: "BookOpen", label: "Версия", value: "1.20.4 Java" },
            ].map((c) => (
              <div key={c.label} className="py-8 px-6 hover:bg-cyan-500/5 transition-colors group cursor-pointer" style={{ background: "#0d0d0d" }}>
                <Icon name={c.icon} size={20} className="text-cyan-500 mx-auto mb-3 block" fallback="Info" />
                <p className="text-xs text-gray-600 tracking-widest uppercase mb-2">{c.label}</p>
                <p className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{c.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="px-10 py-4 font-bold text-sm tracking-[0.2em] uppercase text-black animate-pulse-neon"
              style={{ background: "#00ffff", fontFamily: "'Oswald', sans-serif" }}
            >
              Вступить в Discord
            </button>
            <button className="neon-btn px-10 py-4 text-sm tracking-[0.15em] uppercase font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Скопировать IP
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold tracking-widest neon-text-cyan animate-flicker" style={{ fontFamily: "'Oswald', sans-serif" }}>
            NEONIX<span className="text-white"> PROJECT</span>
          </span>
          <p className="text-xs text-gray-600 tracking-widest">© 2025 NEONIX PROJECT. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
          <div className="hidden md:flex gap-6">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="text-xs text-gray-600 hover:text-cyan-400 transition-colors tracking-widest uppercase">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}