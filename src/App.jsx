import { useState, useEffect, useRef } from "react";
import {
  Mail,
  ExternalLink,
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Award,
  Briefcase,
  User,
  Star,
  Menu,
  X,
  Globe,
  AtSign,
  Zap,
  Package,
  GitBranch,
  CreditCard,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaReact, FaNode } from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiRedis,
  SiExpress,
  SiNextdotjs,
  SiSupabase,
} from "react-icons/si";
import { motion } from "framer-motion";

const hrProjectViews = [
  {
    id: "dashboard",
    title: "HR Analytics Dashboard",
    description:
      "Live workforce intelligence featuring today's attendance summary (Present, Late, Absent), active workforce distribution donut charts, retention stats, and real-time employee overview.",
    image: "/hr-management/hr-dashboard.png",
    tag: "Dashboard Analytics",
  },
  {
    id: "employees",
    title: "Employee Directory & Profiles",
    description:
      "Comprehensive employee profiles management, department & shop assignments, joining records, mobile & family details, CSV import/export, and new employee onboarding workflow.",
    image: "/hr-management/hr-employees.png",
    tag: "Employee Directory",
  },
  {
    id: "daily-attendance",
    title: "Daily Attendance Sheet",
    description:
      "Real-time daily punch management with store filters, employee lookup, punch logs, in/out timestamps, hours worked, late calculations, and manual punch edits.",
    image: "/hr-management/hr-daily-attendance.png",
    tag: "Daily Attendance",
  },
  {
    id: "monthly-attendance",
    title: "Monthly Attendance Statistics",
    description:
      "Detailed monthly attendance tracking with device/location filtering, present/absent/late counts, avg work & lunch hours, serial number tracking, and Excel report export.",
    image: "/hr-management/hr-monthly-attendance.png",
    tag: "Monthly Analytics",
  },
  {
    id: "payroll",
    title: "Payroll Management & Salary Sheets",
    description:
      "Automated monthly payroll calculation generated directly from employee attendance database logs, base salary tracking, advance deductions, medical & prorated salary breakdowns, and Bank CSV / Excel exports.",
    image: "/hr-management/hr-payroll.png",
    tag: "Payroll Management",
  },
];

function ThreeSixtyCarousel({
  views,
  activeView,
  setActiveView,
  onImageClick,
}) {
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);

  // Wheel scroll handler (only rotates on horizontal swipe so vertical page scroll is never trapped)
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;
      if (e.deltaX > 0) {
        setActiveView((prev) => (prev + 1) % views.length);
      } else {
        setActiveView((prev) => (prev - 1 + views.length) % views.length);
      }
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 250);
    }
  };

  // Mouse Drag handlers
  const handleMouseDown = (e) => {
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (dragStartX !== null) {
      const diffX = dragStartX - e.clientX;
      if (Math.abs(diffX) > 30) {
        if (diffX > 0) {
          setActiveView((prev) => (prev + 1) % views.length);
        } else {
          setActiveView((prev) => (prev - 1 + views.length) % views.length);
        }
      }
      setDragStartX(null);
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    if (Math.abs(diffX) > 30) {
      if (diffX > 0) {
        setActiveView((prev) => (prev + 1) % views.length);
      } else {
        setActiveView((prev) => (prev - 1 + views.length) % views.length);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-[1650px] mx-auto py-6 overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: "1400px" }}
    >
      {/* 360 Interactive Badge */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-red-500/20 text-blue-300 border border-blue-500/40 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          🔄 360° Interactive 3D Showcase — Drag or swipe left/right to rotate
        </span>
      </div>

      {/* 3D Carousel Stage */}
      <div className="relative h-[360px] sm:h-[480px] md:h-[600px] lg:h-[660px] w-full max-w-[1600px] mx-auto flex items-center justify-center">
        {views.map((view, idx) => {
          let diff = idx - activeView;
          const total = views.length;
          if (diff > Math.floor(total / 2)) diff -= total;
          if (diff < -Math.floor(total / 2)) diff += total;

          const isActive = diff === 0;

          // Responsive spacing for broader cards
          const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
          const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;
          const spacing = isMobile ? 150 : isTablet ? 250 : 360;

          // 3D Perspective Coverflow Placement (Broader Stage Math)
          let rotateY = 0;
          let translateX = diff * spacing;
          let translateZ = 0;
          let scale = 1;
          let opacity = 1;

          if (diff === 0) {
            rotateY = 0;
            translateZ = 150;
            scale = 1.08;
            opacity = 1;
          } else if (diff === -1) {
            rotateY = 44;
            translateZ = -20;
            scale = 0.84;
            opacity = 0.9;
          } else if (diff === 1) {
            rotateY = -44;
            translateZ = -20;
            scale = 0.84;
            opacity = 0.9;
          } else if (diff === -2) {
            rotateY = 58;
            translateZ = -160;
            scale = 0.65;
            opacity = 0.45;
          } else if (diff === 2) {
            rotateY = -58;
            translateZ = -160;
            scale = 0.65;
            opacity = 0.45;
          }

          const zIndex = 30 - Math.abs(diff) * 10;

          return (
            <motion.div
              key={view.id}
              onClick={() => {
                if (isActive) {
                  onImageClick(view.image);
                } else {
                  setActiveView(idx);
                }
              }}
              animate={{
                rotateY: `${rotateY}deg`,
                x: `${translateX}px`,
                z: `${translateZ}px`,
                scale: scale,
                opacity: opacity,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                zIndex: zIndex,
                transformStyle: "preserve-3d",
              }}
              className="absolute w-[300px] sm:w-[520px] md:w-[720px] lg:w-[920px] aspect-video cursor-pointer"
            >
              {/* Thin rotating shine line border on all 5 photos */}
              <div
                className={`shine-border-card ${
                  isActive ? "shine-border-card-active" : ""
                }`}
              >
                <div className="shine-border-inner aspect-video group">
                  <img
                    src={view.image}
                    alt={view.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-white text-sm font-bold">
                      {view.title}
                    </span>
                    <span className="text-gray-300 text-xs truncate">
                      {view.tag} • Click to open full view
                    </span>
                  </div>

                  {isActive && (
                    <div className="absolute top-3 right-3 bg-red-500/80 backdrop-blur-md text-white text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full border border-white/20 shadow-md z-20">
                      Active View
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 5 Equal-Sized View Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-5xl mx-auto mt-6 px-2">
        {views.map((view, idx) => (
          <button
            key={view.id}
            onClick={() => setActiveView(idx)}
            className={`w-full h-11 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center text-center truncate ${
              activeView === idx
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-red-500/40 scale-105"
                : "bg-slate-900/80 text-gray-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            {view.tag}
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() =>
            setActiveView((prev) => (prev - 1 + views.length) % views.length)
          }
          className="p-3 rounded-full bg-slate-800/80 border border-slate-700 hover:border-blue-500 text-blue-400 hover:text-white shadow-lg transition-all hover:scale-110"
          aria-label="Previous view"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800">
          {views.map((view, idx) => (
            <button
              key={view.id}
              onClick={() => setActiveView(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeView === idx
                  ? "bg-gradient-to-r from-blue-500 to-red-500 scale-125 ring-2 ring-red-500/50"
                  : "bg-slate-700 hover:bg-slate-500"
              }`}
              title={view.title}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveView((prev) => (prev + 1) % views.length)}
          className="p-3 rounded-full bg-slate-800/80 border border-slate-700 hover:border-red-500 text-red-400 hover:text-white shadow-lg transition-all hover:scale-110"
          aria-label="Next view"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeHrView, setActiveHrView] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 antialiased">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-slate-950/50 backdrop-blur-2xl border border-purple-500/30 rounded-full shadow-2xl max-w-max px-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                &lt;DEV/&gt;
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[
                  "home",
                  "about",
                  "skills",
                  "experience",
                  "projects",
                  "contact",
                ].map((item) => (
                  <motion.button
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeSection === item
                      ? "text-purple-400 bg-purple-400/10"
                      : "text-gray-300 hover:text-purple-400 hover:bg-purple-400/10"
                      }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-purple-400 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-950/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl z-40 w-11/12 max-w-sm shadow-2xl\"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                "home",
                "about",
                "skills",
                "experience",
                "projects",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeSection === item
                    ? "text-purple-400 bg-purple-400/10"
                    : "text-gray-300 hover:text-purple-400 hover:bg-purple-400/10"
                    }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="relative z-10 pt-8">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center pt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block"
              >
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <Code2 size={48} className="text-purple-400" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Ayush Dewangan
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Full Stack Developer
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Building modern, responsive web applications with a passion for
                clean code and great user experiences.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Hire Me
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-8 py-3 border border-purple-500 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/10 transition-all duration-300"
                >
                  View Work
                </motion.a>
              </div>

              <div className="flex justify-center gap-6 mt-12">
                {[
                  {
                    icon: FaLinkedin,
                    href: "https://linkedin.com/in/ayushdewangan21",
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: "mailto:ayush.dewangan2109@gmail.com",
                    label: "Email",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        {/* Tech Stack Section */}
        <section
          id="techstack"
          className="py-20 bg-gradient-to-b from-slate-950 to-slate-900/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Tech Stack
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                {
                  name: "React",
                  icon: FaReact,
                  color: "text-blue-400",
                  bg: "from-blue-500/10 to-blue-500/5",
                },
                {
                  name: "TypeScript",
                  icon: SiTypescript,
                  color: "text-blue-600",
                  bg: "from-blue-500/10 to-blue-500/5",
                },
                {
                  name: "Next.js",
                  icon: SiNextdotjs,
                  color: "text-white",
                  bg: "from-gray-500/10 to-gray-500/5",
                },
                {
                  name: "Tailwind",
                  icon: Zap,
                  color: "text-cyan-400",
                  bg: "from-cyan-500/10 to-cyan-500/5",
                },
                {
                  name: "Node.js",
                  icon: FaNode,
                  color: "text-green-500",
                  bg: "from-green-500/10 to-green-500/5",
                },
                {
                  name: "Express",
                  icon: SiExpress,
                  color: "text-yellow-600",
                  bg: "from-yellow-500/10 to-yellow-500/5",
                },
                {
                  name: "PostgreSQL",
                  icon: SiPostgresql,
                  color: "text-blue-500",
                  bg: "from-blue-500/10 to-blue-500/5",
                },
                {
                  name: "Supabase",
                  icon: SiSupabase,
                  color: "text-green-400",
                  bg: "from-green-500/10 to-green-500/5",
                },
                {
                  name: "Redis",
                  icon: SiRedis,
                  color: "text-red-500",
                  bg: "from-red-500/10 to-red-500/5",
                },
                {
                  name: "Redux",
                  icon: Package,
                  color: "text-purple-500",
                  bg: "from-purple-500/10 to-purple-500/5",
                },
                {
                  name: "Git",
                  icon: GitBranch,
                  color: "text-orange-500",
                  bg: "from-orange-500/10 to-orange-500/5",
                },
                {
                  name: "GitHub",
                  icon: FaGithub,
                  color: "text-gray-300",
                  bg: "from-gray-500/10 to-gray-500/5",
                },
              ].map((tech, index) => {
                const TechIcon = tech.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`bg-gradient-to-br ${tech.bg} backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer`}
                  >
                    <TechIcon className={`${tech.color} text-3xl`} />
                    <span className="text-sm font-medium text-gray-300 text-center">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 text-purple-400">
                  <User size={24} />
                  <span className="text-lg">
                    Full Stack Developer • Currently Working
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  I'm a passionate Full Stack Web Developer crafting seamless
                  digital experiences from frontend to backend. Currently
                  working on innovative projects that combine elegant user
                  interfaces with robust server-side architecture. My expertise
                  spans the entire web development stack, from React and Next.js
                  on the frontend to Node.js and Express on the backend.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I'm driven by clean code, scalable architecture, and creating
                  solutions that genuinely solve real problems. I love building
                  modern web applications with TypeScript, working with
                  databases like PostgreSQL and Supabase, and leveraging tools
                  like Redis for performance optimization. Every project is an
                  opportunity to learn something new and push the boundaries of
                  what's possible on the web.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} />
                    <span className="text-gray-300">Full Stack Expertise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="text-purple-400" size={20} />
                    <span className="text-gray-300">Production Ready Code</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: "Full Stack", label: "Developer", icon: Code2 },
                  { value: "15+", label: "Projects Shipped", icon: Briefcase },
                  {
                    value: "React → DB",
                    label: "End-to-End Build",
                    icon: Server,
                  },
                  { value: "Always", label: "Learning & Growing", icon: Star },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 text-center border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <stat.icon
                      className="mx-auto mb-3 text-purple-400"
                      size={32}
                    />
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        {/* Skills Section */}
        <section id="skills" className="py-20 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Technical Skills
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Layout,
                  title: "Frontend Core",
                  skills: ["React", "HTML 5", "CSS 3"],
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Code2,
                  title: "Styling & UI",
                  skills: [
                    "Tailwind CSS",
                    "SCSS",
                    "Styled Components",
                    "Material-UI",
                  ],
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Server,
                  title: "State Management",
                  skills: ["Redux", "Zustand", "Context API"],
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: CreditCard,
                  title: "Payment Integration",
                  skills: [
                    "Razorpay",

                    "Payment Gateway",
                    "Webhook Integration",
                  ],
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: Database,
                  title: "Backend Integration",
                  skills: ["Node.js", "postgresql", "REST APIs", "Supabase"],
                  color: "from-yellow-500 to-amber-500",
                },
                {
                  icon: Award,
                  title: "Tools & Testing",
                  skills: ["Postman", "CI/CD Pipeline", "Git/GitHub"],
                  color: "from-indigo-500 to-purple-500",
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <category.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Experience Section */}
        ```jsx
        {/* Experience Section */}
        <section
          id="experience"
          className="py-20 bg-slate-950 relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Work Experience
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                My professional journey as a Full Stack Web Developer, building
                scalable and high-performance web applications.
              </p>
              <div className="w-24 h-1 mt-5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Left Accent */}
              <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"></div>

              {/* Main Card */}
              <div className="ml-4 bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 transition-all duration-300 group-hover:border-purple-500/40 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20">
                        <Briefcase className="text-purple-400" size={22} />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Full Stack Web Developer
                        </h3>
                        <p className="text-purple-300 font-medium">
                          Botivate Services LLP
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 px-8 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium relative">
                      <span className="flex items-center justify-center w-2 h-2 pr-3">
                        <span className="absolute w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                        <span className="relative w-2 h-2 rounded-full bg-green-400"></span>
                      </span>
                      Currently Working
                    </span>

                    <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                      Feb 2026 — Present
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-8 text-[15px] mb-8">
                  Currently working as a{" "}
                  <span className="text-white font-medium">
                    Full Stack Web Developer
                  </span>
                  , developing modern, responsive, and scalable web
                  applications. Building end-to-end solutions using React.js and
                  Next.js on the frontend with Node.js and Express.js on the
                  backend, while integrating databases, REST APIs, and
                  performance-focused architectures to deliver seamless user
                  experiences.
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                    Technologies & Tools
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "React.js",
                      "Next.js",
                      "Node.js",
                      "Express.js",
                      "Tailwind CSS",
                      "PostgreSQL",
                      "REST APIs",
                      "Git & GitHub",
                    ].map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-gray-300 transition-all duration-300 hover:border-purple-500/50 hover:text-purple-300 hover:-translate-y-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
                  {[
                    { value: "Full Stack", label: "Development" },
                    { value: "React", label: "Frontend" },
                    { value: "Node.js", label: "Backend" },
                    { value: "PostgreSQL", label: "Database" },
                  ].map((item, index) => (
                    <div key={index}>
                      <p className="text-lg font-semibold text-white">
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-slate-900/30">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                  Featured Showcase
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
                Enterprise HR & Attendance Management System — an all-in-one workforce intelligence & employee operations platform
              </p>
            </motion.div>

            {/* 3D 360 Showcase Carousel */}
            <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-slate-700/50 shadow-2xl mb-12">
              <ThreeSixtyCarousel
                views={hrProjectViews}
                activeView={activeHrView}
                setActiveView={setActiveHrView}
                onImageClick={(img) => setLightboxImage(img)}
              />

              {/* Active View Details Card */}
              <div className="mt-6 pt-6 border-t border-slate-700/60 flex flex-col lg:flex-row gap-6 items-start justify-between">
                <div className="lg:w-2/3 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-red-500/20 text-blue-300 border border-blue-500/40">
                      {hrProjectViews[activeHrView].tag}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Enterprise Suite
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {hrProjectViews[activeHrView].title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
                    {hrProjectViews[activeHrView].description}
                  </p>
                </div>

                <div className="lg:w-1/3 w-full space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    System Capabilities:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                      <span>Real-time punch logging & time tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0" />
                      <span>Multi-store & location device matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-red-400 flex-shrink-0" />
                      <span>Excel & CSV data reporting exports</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Thick Thread UI String Cable Connector */}
            <div className="relative flex flex-col items-center my-6">
              <div className="px-5 py-2 rounded-full bg-slate-900/90 border border-purple-500/40 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 shadow-xl flex items-center gap-2 z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
                THREAD CONNECTED SYSTEM LINKS
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              </div>

              {/* Curvy Woven Glowing Cable Strings branching down to Left & Right Cards */}
              <div className="w-full max-w-4xl h-20 -mt-2 overflow-visible pointer-events-none hidden md:block">
                <svg className="w-full h-full stroke-current overflow-visible" viewBox="0 0 800 80" fill="none">
                  <defs>
                    <linearGradient id="threadGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="threadGradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Left Glow Cable */}
                  <path
                    d="M 400 0 C 400 35, 200 35, 200 80"
                    stroke="url(#threadGradientLeft)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.5"
                    filter="url(#threadGlow)"
                  />
                  {/* Left Animated Flow Cable */}
                  <path
                    d="M 400 0 C 400 35, 200 35, 200 80"
                    stroke="url(#threadGradientLeft)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="14 10"
                    className="animate-thread-flow"
                  />

                  {/* Right Glow Cable */}
                  <path
                    d="M 400 0 C 400 35, 600 35, 600 80"
                    stroke="url(#threadGradientRight)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.5"
                    filter="url(#threadGlow)"
                  />
                  {/* Right Animated Flow Cable */}
                  <path
                    d="M 400 0 C 400 35, 600 35, 600 80"
                    stroke="url(#threadGradientRight)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="14 10"
                    className="animate-thread-flow"
                  />

                  {/* Cable Connection Nodes */}
                  <circle cx="400" cy="0" r="7" fill="#8b5cf6" />
                  <circle cx="400" cy="0" r="4" fill="#ffffff" />
                  <circle cx="200" cy="80" r="6" fill="#10b981" />
                  <circle cx="600" cy="80" r="6" fill="#ef4444" />
                </svg>
              </div>
            </div>

            {/* Thread Connected Cards (Live Link + GitHub) */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 relative z-10">
              {/* Live Link Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="shine-border-card shine-border-card-active"
              >
                <div className="shine-border-inner p-6 sm:p-7 flex flex-col justify-between h-full bg-slate-900/95">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-2 shadow-lg shadow-emerald-500/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span> Live System Online
                      </span>
                      <ExternalLink size={22} className="text-emerald-400" />
                    </div>
                    <h4 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                      Live Web Application
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                      Explore the live, fully interactive Enterprise HR Management System dashboard with real-time employee profiles, daily/monthly attendance registers, and automated payroll calculations.
                    </p>
                  </div>

                  <a
                    href="https://portfolio-hr-management.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 group"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>

              {/* GitHub Repo Card */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="shine-border-card"
              >
                <div className="shine-border-inner p-6 sm:p-7 flex flex-col justify-between h-full bg-slate-900/95">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-2 shadow-lg shadow-purple-500/10">
                        <FaGithub size={14} className="text-purple-400" /> Source Code
                      </span>
                      <FaGithub size={22} className="text-purple-400" />
                    </div>
                    <h4 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                      GitHub Repository
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                      Inspect the full-stack codebase, REST API routes, PostgreSQL/MongoDB database models, daily punch log logic, and React frontend component architecture on GitHub.
                    </p>
                  </div>

                  <a
                    href="https://github.com/ayushdewangan21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 hover:border-purple-500 flex items-center justify-center gap-2.5 shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                  >
                    <span>View Code on GitHub</span>
                    <FaGithub size={18} className="group-hover:rotate-12 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Lightbox Modal for full size view */}
            {lightboxImage && (
              <div
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
                onClick={() => setLightboxImage(null)}
              >
                <div className="relative max-w-[1000px] w-[96vw]" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="absolute -top-12 right-0 text-gray-300 hover:text-white p-2 rounded-full bg-slate-800/90 border border-slate-700 shadow-lg"
                  >
                    <X size={24} />
                  </button>
                  {/* Thin Rotating Shine Line Border around Lightbox picture */}
                  <div className="shine-border-card shine-border-card-active">
                    <div className="shine-border-inner flex items-center justify-center">
                      <img
                        src={lightboxImage}
                        alt="Enlarged view"
                        className="w-full h-auto max-h-[92vh] md:max-h-[95vh] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mt-12">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://github.com/ayushdewangan21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-purple-500 text-purple-400 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                View More Projects on GitHub <ExternalLink size={16} />
              </motion.a>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Let's Connect
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
              <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let's discuss how we can work
                together to create something amazing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-white">
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      text: "ayush.dewangan2109@gmail.com",
                      href: "ayush.dewangan2109@gmail.com",
                    },
                    {
                      icon: FaGithub,
                      text: "ayushdewangan21",
                      href: "https://github.com/ayushdewangan21/",
                    },
                    {
                      icon: FaLinkedin,
                      text: "ayushdewangan21",
                      href: "https://linkedin.com/in/ayushdewangan21",
                    },
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ x: 10 }}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      <contact.icon size={24} />
                      <span>{contact.text}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                ></textarea>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="py-8 border-t border-purple-500/20 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2026 Ayush Dewangan. Full Stack Web Developer • Building modern
              web experiences.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
