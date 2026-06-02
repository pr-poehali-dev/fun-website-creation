import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
  { label: "Портфолио", href: "#portfolio" },
];

const SERVICES = [
  {
    icon: "Zap",
    title: "Веб-разработка",
    desc: "Создаём мощные и быстрые веб-приложения с современным стеком технологий. Каждый проект — уникальное решение.",
  },
  {
    icon: "Shield",
    title: "Кибербезопасность",
    desc: "Защищаем ваш бизнес от угроз. Аудит, пентест, настройка систем безопасности под ключ.",
  },
  {
    icon: "Cpu",
    title: "Автоматизация",
    desc: "Автоматизируем рутинные процессы с помощью ИИ и скриптов. Экономим ваше время и деньги.",
  },
  {
    icon: "Globe",
    title: "Digital-маркетинг",
    desc: "Продвигаем бизнес в сети. SEO, контекстная реклама, аналитика и стратегии роста.",
  },
  {
    icon: "Database",
    title: "Облачные решения",
    desc: "Проектируем и внедряем облачную инфраструктуру. Масштабируемость и надёжность 24/7.",
  },
  {
    icon: "Layers",
    title: "UI/UX Дизайн",
    desc: "Создаём интерфейсы, которые не просто красивы, но и интуитивно понятны пользователям.",
  },
];

const STATS = [
  { value: "150+", label: "Проектов" },
  { value: "8", label: "Лет опыта" },
  { value: "98%", label: "Довольных клиентов" },
  { value: "24/7", label: "Поддержка" },
];

const PORTFOLIO = [
  { title: "CyberBank Pro", tag: "Финтех", year: "2024" },
  { title: "NeuroShop", tag: "E-commerce", year: "2024" },
  { title: "DataVault", tag: "SaaS", year: "2023" },
  { title: "AeroTrack", tag: "Логистика", year: "2023" },
  { title: "MediCore", tag: "Медтех", year: "2023" },
  { title: "EduMatrix", tag: "EdTech", year: "2022" },
];

export default function Index() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "services", "about", "portfolio", "contacts"];
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
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="scan-line" />

      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 drawer-overlay"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-50 transition-transform duration-500 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "linear-gradient(135deg, #0d0d0d 0%, #111111 100%)",
          borderRight: "1px solid rgba(0,255,255,0.15)",
          boxShadow: drawerOpen ? "4px 0 40px rgba(0,255,255,0.1)" : "none",
        }}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <span className="text-2xl font-bold neon-text-cyan tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>MENU</span>
            <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-cyan-400 transition-colors p-1">
              <Icon name="X" size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`text-left px-4 py-3 text-sm font-medium tracking-widest uppercase border border-transparent transition-all duration-300 ${
                  activeSection === item.href.replace("#", "")
                    ? "neon-btn-active border-cyan-500/30 text-cyan-400"
                    : "text-gray-400 hover:text-cyan-400 hover:border-cyan-500/20 hover:pl-6"
                }`}
              >
                <span className="neon-text-cyan opacity-40 mr-3" style={{ fontFamily: "'Oswald', sans-serif" }}>0{i + 1}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-white/5 pt-6 mt-6">
            <p className="text-xs text-gray-600 tracking-widest uppercase mb-3">Контакты</p>
            <p className="text-xs text-gray-400">hello@neonstudio.ru</p>
            <p className="text-xs text-gray-400 mt-1">+7 (900) 000-00-00</p>
            <div className="flex gap-3 mt-4">
              {[
                { name: "Github", icon: "Github" },
                { name: "Twitter", icon: "Twitter" },
                { name: "Linkedin", icon: "Linkedin" },
              ].map((s) => (
                <button key={s.name} className="w-8 h-8 border border-white/10 flex items-center justify-center text-gray-500 hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                  <Icon name={s.icon} size={14} fallback="Link" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          {/* Burger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col gap-1.5 p-2 group mr-2"
            aria-label="Открыть меню"
          >
            <span className="block w-6 h-[1px] bg-cyan-400 transition-all group-hover:w-8 group-hover:shadow-[0_0_8px_#00ffff]" />
            <span className="block w-4 h-[1px] bg-cyan-400 transition-all group-hover:w-8 group-hover:shadow-[0_0_8px_#00ffff]" />
            <span className="block w-6 h-[1px] bg-cyan-400 transition-all group-hover:w-8 group-hover:shadow-[0_0_8px_#00ffff]" />
          </button>

          {/* Logo */}
          <span className="text-xl font-bold tracking-widest neon-text-cyan animate-flicker mr-auto" style={{ fontFamily: "'Oswald', sans-serif" }}>
            NEON<span className="text-white">STUDIO</span>
          </span>

          {/* 5 Nav buttons */}
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

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <span className="inline-block text-xs font-medium tracking-[0.4em] uppercase text-cyan-500 mb-6 border border-cyan-500/30 px-4 py-2">
              Цифровые решения нового поколения
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold leading-none mb-6 animate-fade-up opacity-0 delay-100" style={{ fontFamily: "'Oswald', sans-serif", animationFillMode: "forwards" }}>
            <span className="block neon-text-cyan">МЫ</span>
            <span className="block text-white">СОЗДАЁМ</span>
            <span className="block" style={{ color: "#39ff14", textShadow: "0 0 20px #39ff14, 0 0 60px #39ff14" }}>БУДУЩЕЕ</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
            Разрабатываем цифровые продукты, которые меняют индустрии. Технологии, дизайн и стратегия — всё в одном месте.
          </p>

          <div className="flex items-center justify-center gap-4 animate-fade-up opacity-0 delay-400" style={{ animationFillMode: "forwards" }}>
            <button
              onClick={() => scrollTo("#services")}
              className="px-8 py-3 font-medium text-sm tracking-widest uppercase text-black"
              style={{ background: "#00ffff", boxShadow: "0 0 20px #00ffff, 0 0 60px rgba(0,255,255,0.3)" }}
            >
              Наши услуги
            </button>
            <button
              onClick={() => scrollTo("#contacts")}
              className="neon-btn px-8 py-3 text-sm tracking-widest uppercase"
            >
              Связаться
            </button>
          </div>

          {/* Stats */}
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

      {/* SERVICES */}
      <section id="services" className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs tracking-[0.4em] uppercase text-cyan-500 font-medium">Что мы делаем</span>
            <h2 className="text-5xl md:text-7xl font-bold mt-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <span className="text-white">НАШИ </span>
              <span className="neon-text-cyan">УСЛУГИ</span>
            </h2>
            <div className="w-20 h-[1px] mt-4" style={{ background: "#00ffff", boxShadow: "0 0 10px #00ffff" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {SERVICES.map((service, i) => (
              <div key={i} className="neon-card p-8 group cursor-pointer" style={{ background: "#0d0d0d" }}>
                <div className="w-12 h-12 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:border-cyan-500 transition-colors group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                  <Icon name={service.icon} size={20} className="text-cyan-400" fallback="Star" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-cyan-400 transition-colors" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs tracking-[0.4em] uppercase text-cyan-500 font-medium">Кто мы</span>
              <h2 className="text-5xl md:text-7xl font-bold mt-3 mb-8" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <span className="text-white">О </span>
                <span className="neon-text-cyan">НАС</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Мы — команда инженеров, дизайнеров и стратегов, которые верят в силу технологий. С 2016 года создаём цифровые продукты для бизнеса по всему миру.
              </p>
              <p className="text-gray-500 leading-relaxed mb-10">
                Наш подход — это не просто разработка. Это глубокое погружение в бизнес клиента, понимание его целей и создание решений, которые работают на результат.
              </p>
              <div className="flex flex-col gap-3">
                {["Agile методология разработки", "Прозрачный процесс и коммуникация", "Поддержка и сопровождение 24/7", "NDA и конфиденциальность данных"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00ffff", boxShadow: "0 0 6px #00ffff" }} />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-square border border-cyan-500/20 p-8 flex flex-col justify-between relative overflow-hidden"
                style={{ background: "#0d0d0d" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-green-500/5 blur-3xl" />

                <div className="text-8xl font-black text-white/5 select-none" style={{ fontFamily: "'Oswald', sans-serif" }}>NS</div>

                <div className="space-y-4">
                  {[
                    { label: "Frontend", pct: 95 },
                    { label: "Backend", pct: 90 },
                    { label: "Design", pct: 85 },
                    { label: "DevOps", pct: 80 },
                  ].map((skill) => (
                    <div key={skill.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 tracking-widest uppercase">{skill.label}</span>
                        <span className="text-cyan-500">{skill.pct}%</span>
                      </div>
                      <div className="h-[2px] bg-white/5 rounded overflow-hidden">
                        <div
                          className="h-full rounded"
                          style={{
                            width: `${skill.pct}%`,
                            background: "linear-gradient(90deg, #00ffff, #39ff14)",
                            boxShadow: "0 0 8px #00ffff",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-gray-600 tracking-widest uppercase border-t border-white/5 pt-4">
                  Основана в 2016 · Москва, Россия
                </div>
              </div>

              <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-cyan-500/50" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-cyan-500/50" />
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs tracking-[0.4em] uppercase text-cyan-500 font-medium">Наши работы</span>
            <h2 className="text-5xl md:text-7xl font-bold mt-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <span className="text-white">ПОРТ</span>
              <span className="neon-text-cyan">ФОЛИО</span>
            </h2>
            <div className="w-20 h-[1px] mt-4" style={{ background: "#00ffff", boxShadow: "0 0 10px #00ffff" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.map((project, i) => (
              <div
                key={i}
                className="group relative border border-white/5 p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:border-cyan-500/30"
                style={{ background: "#0d0d0d" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.03) 0%, transparent 100%)" }} />

                <div className="flex items-start justify-between mb-8">
                  <span className="text-xs border border-cyan-500/30 text-cyan-500 px-2 py-1 tracking-widest uppercase">
                    {project.tag}
                  </span>
                  <span className="text-xs text-gray-600">{project.year}</span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-wide mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-cyan-500 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 tracking-widest uppercase">
                  <span>Смотреть кейс</span>
                  <Icon name="ExternalLink" size={12} />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(90deg, #00ffff, transparent)", boxShadow: "0 0 8px #00ffff" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative py-32 z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs tracking-[0.4em] uppercase text-cyan-500 font-medium">Готовы начать?</span>
          <h2 className="text-5xl md:text-8xl font-bold mt-3 mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <span className="text-white">КОН</span>
            <span className="neon-text-cyan">ТАКТЫ</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg mx-auto">
            Расскажите о своём проекте — мы ответим в течение 24 часов и предложим оптимальное решение.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-12 border border-white/5">
            {[
              { icon: "Mail", label: "Email", value: "hello@neonstudio.ru" },
              { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00" },
              { icon: "MapPin", label: "Офис", value: "Москва, Россия" },
            ].map((c) => (
              <div key={c.label} className="py-8 px-6 hover:bg-cyan-500/5 transition-colors group" style={{ background: "#0d0d0d" }}>
                <Icon name={c.icon} size={20} className="text-cyan-500 mx-auto mb-3" fallback="Info" />
                <p className="text-xs text-gray-600 tracking-widest uppercase mb-2">{c.label}</p>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{c.value}</p>
              </div>
            ))}
          </div>

          <button
            className="px-12 py-4 font-bold text-sm tracking-[0.2em] uppercase text-black animate-pulse-neon"
            style={{ background: "#00ffff", fontFamily: "'Oswald', sans-serif" }}
          >
            Написать нам
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold tracking-widest neon-text-cyan animate-flicker" style={{ fontFamily: "'Oswald', sans-serif" }}>
            NEON<span className="text-white">STUDIO</span>
          </span>
          <p className="text-xs text-gray-600 tracking-widest">© 2024 NEONSTUDIO. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
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