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
  Sparkles,
  ShieldCheck,
  Workflow,
  Radio,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaReact, FaNode } from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiRedis,
  SiExpress,
  SiNextdotjs,
  SiSupabase,
  SiMongodb,
  SiVercel,
  SiReactquery,
} from "react-icons/si";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

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
      className="relative w-full mx-auto py-2 px-3 sm:px-6 select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Carousel Stage with Side Arrows Outside Image */}
      <div className="relative h-[140px] sm:h-[200px] md:h-[230px] lg:h-[260px] w-full mx-auto flex items-center justify-center">

        {/* Left Floating Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveView((prev) => (prev - 1 + views.length) % views.length);
          }}
          className="absolute left-0 sm:left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10  backdrop-blur-md text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95"
          aria-label="Previous view"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Single Active View Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={views[activeView].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            onClick={() => onImageClick(views[activeView].image)}
            className="w-[210px] sm:w-[310px] md:w-[370px] lg:w-[410px] aspect-video cursor-pointer z-30"
          >
            <div className="shine-border-card">
              <div className="shine-border-inner aspect-video group relative">
                <img
                  src={views[activeView].image}
                  alt={views[activeView].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                  <span className="text-white text-sm font-bold">
                    {views[activeView].title}
                  </span>

                </div>


              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Floating Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveView((prev) => (prev + 1) % views.length);
          }}
          className="absolute right-0 sm:right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 ml-2  backdrop-blur-md  text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95"
          aria-label="Next view"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Small Circle Indicators (Pagination Dots) */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {views.map((view, idx) => (
          <button
            key={view.id}
            onClick={() => setActiveView(idx)}
            className={`transition-all duration-200 rounded-full ${activeView === idx
                ? "w-6 h-2.5 bg-zinc-100 "
                : "w-2.5 h-2.5 bg-zinc-700 hover:bg-zinc-500"
              }`}
            title={view.title}
            aria-label={`Go to view ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* Dynamic Random Asteroid Polygon Generator */
function generateRandomAsteroidPolygon() {
  const numPoints = Math.floor(Math.random() * 4) + 5; // 5 to 8 vertices
  const points = [];
  const angleStep = (Math.PI * 2) / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep + (Math.random() - 0.5) * (angleStep * 0.7);
    const r = Math.random() * 32 + 18; // 18% to 50% radius variation for wild asteroid shapes
    const x = Math.round(50 + r * Math.cos(angle));
    const y = Math.round(50 + r * Math.sin(angle));
    points.push(`${x}% ${y}%`);
  }

  return `polygon(${points.join(", ")})`;
}

function MouseTrail() {
  const [particles, setParticles] = useState([]);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
      if (dist > 8) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 10 + 10,
          shape: generateRandomAsteroidPolygon(),
          rotate: Math.random() * 360,
          rotateSpeed: (Math.random() - 0.5) * 200,
        };
        setParticles((prev) => [...prev.slice(-35), newParticle]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 1,
              scale: 1,
              rotate: p.rotate,
              x: p.x - p.size / 2,
              y: p.y - p.size / 2,
            }}
            animate={{
              opacity: 0,
              scale: 0,
              rotate: p.rotate + p.rotateSpeed,
              x: p.x - p.size / 2,
              y: p.y - p.size / 2,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
            style={{
              position: "fixed",
              width: p.size,
              height: p.size,
              left: 0,
              top: 0,
              clipPath: p.shape,
            }}
            className="bg-white shadow-[0_0_12px_rgba(255,255,255,1)]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const techSectionRef = useRef(null);
  const isTechInView = useInView(techSectionRef, { once: true, margin: "-50px" });

  const aboutSectionRef = useRef(null);
  const isAboutInView = useInView(aboutSectionRef, { once: true, margin: "-50px" });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [activeHrView, setActiveHrView] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Scroll-linked persistent #star animation setup
  const { scrollY } = useScroll();
  const [starTarget, setStarTarget] = useState({
    techScroll: 900,
    aboutScroll: 1800,
    windowWidth: typeof window !== "undefined" ? window.innerWidth : 1200,
    windowHeight: typeof window !== "undefined" ? window.innerHeight : 800,
    cardX: 300,
    cardY: 400,
  });

  useEffect(() => {
    const measureTargets = () => {
      const techEl = document.getElementById("techstack");
      const aboutEl = document.getElementById("about");
      const alwaysCardEl = document.getElementById("star-target-card");

      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;
      const techTop = techEl ? techEl.offsetTop : 900;
      const aboutTop = aboutEl ? aboutEl.offsetTop : 1800;

      let cX = wWidth > 768 ? wWidth / 2 + 180 : wWidth / 2;
      let cY = 400;

      if (alwaysCardEl) {
        const rect = alwaysCardEl.getBoundingClientRect();
        cX = rect.left + rect.width / 2 - 22;
        cY = rect.top;
      }

      setStarTarget({
        techScroll: techTop,
        aboutScroll: aboutTop,
        windowWidth: wWidth,
        windowHeight: wHeight,
        cardX: cX,
        cardY: cY,
      });
    };

    measureTargets();
    window.addEventListener("resize", measureTargets);
    window.addEventListener("scroll", measureTargets, { passive: true });
    return () => {
      window.removeEventListener("resize", measureTargets);
      window.removeEventListener("scroll", measureTargets);
    };
  }, []);

  const [isStarPermanentlyDropped, setIsStarPermanentlyDropped] = useState(false);

  // Function to drop the star from left to the final star position (About Me target card)
  const dropStarToFinalPosition = () => {
    setIsStarPermanentlyDropped(true);
  };

  // Scroll threshold where Tech Stack section reaches 20vh (0.2 * windowHeight) from top of viewport
  const tech20vhScroll = Math.max(
    0,
    starTarget.techScroll - starTarget.windowHeight * 0.2
  );
  // Shift starts as Tech Stack enters scroll range and completes right at 20vh from top
  const shiftStartScroll = Math.max(0, tech20vhScroll - 10);

  // Scroll threshold for About Me section (when About Me section is scrolled till 200vh of screen height)
  const about200vhScroll = Math.max(
    tech20vhScroll + 10,
    starTarget.aboutScroll - starTarget.windowHeight * 0.2
  );
  // Shorter scroll delta (40px) for a much faster/briefer drop duration from left to final position
  const dropStartScroll = Math.max(tech20vhScroll + 15, about200vhScroll - 10);

  // Scroll-linked position calculations for single #star element
  const starX = useTransform(
    scrollY,
    [
      0,
      shiftStartScroll,
      tech20vhScroll,
      dropStartScroll,
      about200vhScroll,
      about200vhScroll + 10000,
    ],
    [
      Math.max(starTarget.windowWidth - 110, 260), // 1. Hero: Fixed Right
      Math.max(starTarget.windowWidth - 110, 260), // 1. Hero End: Fixed Right
      60, // 2. Tech Stack: Moves Right -> Left when section reaches 20vh from top
      60, // 2. Tech Stack: Resting on Left before drop
      starTarget.cardX, // 3. About Me: Drops from Left to final star position
      starTarget.cardX, // Permanently set to final star position when scrolling page further
    ]
  );

  const starY = useTransform(
    scrollY,
    [
      0,
      shiftStartScroll,
      tech20vhScroll,
      dropStartScroll,
      about200vhScroll,
      about200vhScroll + 10000,
    ],
    [
      140, // 1. Hero Y
      140, // 1. Hero End Y
      150, // 2. Tech Y
      150, // 2. Tech Y before drop
      starTarget.cardY, // 3. About Me Y: Drops to final target card position
      starTarget.cardY, // Permanently set to final star position when scrolling page further
    ]
  );

  // Automatically run dropStarToFinalPosition function when section About me is scrolled till 200vh threshold
  useEffect(() => {
    const handleScrollDropCheck = () => {
      if (window.scrollY >= about200vhScroll && !isStarPermanentlyDropped) {
        dropStarToFinalPosition();
      }
    };

    window.addEventListener("scroll", handleScrollDropCheck, { passive: true });
    handleScrollDropCheck();
    return () => window.removeEventListener("scroll", handleScrollDropCheck);
  }, [about200vhScroll, isStarPermanentlyDropped]);

  // Use effective position: once permanently dropped, lock to final card position permanently even on scroll back up
  const effectiveStarX = isStarPermanentlyDropped ? starTarget.cardX : starX;
  const effectiveStarY = isStarPermanentlyDropped ? starTarget.cardY : starY;

  const fogOpacity = useTransform(
    scrollY,
    [
      dropStartScroll,
      about200vhScroll,
      about200vhScroll + 10,
    ],
    [0, 1, 0]
  );

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = [

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
    <div className="min-h-screen bg-black antialiased">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-2xl rounded-full shadow-2xl max-w-max px-2 [transform:translateZ(0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <span className="text-2xl font-bold bg-white f bg-clip-text text-transparent">
                AD <span className="text-yellow-400">.</span>
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[

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
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeSection === item
                      ? "text-white bg-zinc-800"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
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
                className="text-zinc-300 hover:text-white focus:outline-none"
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
            className="md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-3xl z-40 w-11/12 max-w-sm shadow-2xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[

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
                    ? "text-white bg-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
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
          className="min-h-screen flex items-center justify-center pt-28 pb-16 bg-black text-white relative overflow-hidden rounded-b-[2.5rem] shadow-2xl  [transform:translateZ(0)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left side: Introduction part */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="transform-gpu [backface-visibility:hidden] text-center lg:text-left"
              >
                {/* Open to Work Green Border Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/50 bg-emerald-950/40 text-emerald-400 text-xs sm:text-sm font-bold mb-4 backdrop-blur-md shadow-[0_0_18px_rgba(16,185,129,0.2)]"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="tracking-wide">Open to work</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-2 tracking-tight">
                  <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    Ayush Dewangan
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-300 font-semibold mb-4">
                  Software Engineer
                </p>
                <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Building modern, responsive web applications with a passion for
                  clean code and great user experiences.
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection("contact")}
                    className="px-8 py-3.5 bg-zinc-100 text-zinc-950 font-bold rounded-xl shadow-lg shadow-black/50 hover:bg-white transition-all duration-200"
                  >
                    Connect
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects"
                    className="px-8 py-3.5 border-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-500 rounded-xl font-semibold transition-all duration-200"
                  >
                    View Work
                  </motion.a>
                </div>

                <div className="flex justify-center lg:justify-start gap-6 mt-12">
                  {[
                    {
                      icon: FaLinkedin,
                      href: "https://linkedin.com/in/ayushdewangan21",
                      label: "LinkedIn",
                      border: "hover:border-blue-500",
                      fill: "bg-blue-600",
                      hoverText: "group-hover:text-white",
                    },
                    {
                      icon: Mail,
                      href: "mailto:ayush.dewangan2109@gmail.com",
                      label: "Email",
                      border: "hover:border-red-500",
                      fill: "bg-red-500",
                      hoverText: "group-hover:text-white",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative group overflow-hidden text-zinc-400 p-3 rounded-full shadow-md border border-zinc-800 ${social.border} transition-all duration-200`}
                    >
                      {/* Bottom-to-Top Fill Slide Animation */}
                      <span className={`absolute inset-0 w-full h-full ${social.fill} translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-0`} />

                      {/* Content */}
                      <span className={`relative z-10 block ${social.hoverText} transition-colors duration-200`}>
                        <social.icon size={22} />
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Right side: Profile Photo Container with Floating Components */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center items-center transform-gpu [backface-visibility:hidden]"
              >
                <div className="relative inline-block my-4 mb-10 [transform:translateZ(0)]">
                  {/* Inverted Faded Soft Spotlight Pyramid Background behind Profile Photo */}
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0, rotate: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: -8 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="absolute top-8 -bottom-8 -left-8 -right-8 z-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-full h-full relative flex items-center justify-center">
                      {/* Soft Red Glow Aura across Top Wide Edge */}
                      <div className="absolute top-0 w-full h-24 bg-black filter blur-3xl rounded-full pointer-events-none" />

                      {/* SVG Inverted Pyramid Polygon */}
                      <svg
                        viewBox="0 0 200 200"
                        className="w-full h-full transform-gpu drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          {/* Subtle Top-to-Bottom Fading Body Fill Gradient */}
                          <linearGradient id="spotlightFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
                            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.06" />
                            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.0" />
                          </linearGradient>

                          {/* Top-to-Bottom Fading Red Outline Stroke Gradient */}
                          <linearGradient id="spotlightStrokeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
                            <stop offset="45%" stopColor="#EF4444" stopOpacity="0.50" />
                            <stop offset="80%" stopColor="#DC2626" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Inverted Triangle Polygon (Points Down, Red Border) */}
                        <polygon
                          points="8,8 192,8 100,165"
                          fill="url(#spotlightFillGrad)"
                          stroke="url(#spotlightStrokeGrad)"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Base Fog Covering Bottom Tip of Triangle */}
                  <div className="absolute -bottom-6 -left-12 -right-12 h-24 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

                  {/* Main Center Profile Photo - Full Photo with Black Fog Effect */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-64 sm:w-72 md:w-80 h-72 sm:h-84 md:h-96 mx-auto transform-gpu [backface-visibility:hidden]"
                  >
                    {/* Full Photo with Bottom Linear Mask */}
                    <div className="w-full h-full relative rounded-2xl overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)]">
                      <img
                        src="/ProfilePhoto.png"
                        alt="Ayush Dewangan"
                        className="w-full h-full object-cover object-top brightness-100 transition-all duration-500 "
                      />

                      {/* Layered Black Fog Shadow from Below */}
                      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none"></div>
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950 to-transparent filter blur-sm pointer-events-none"></div>
                    </div>

                    {/* Dense Fog Layer at Base */}
                    <div className="absolute -bottom-6 inset-x-0 h-20 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent filter blur-md pointer-events-none z-10"></div>
                  </motion.div>

                  {/* FLOATING COMPONENTS AROUND PHOTO (BLACK / GRAY THEMED - ACUTE ANGLE ASTEROID DROPS) */}

                  {/* 1. Floating Square Component (Top-Left) */}
                  <motion.div
                    initial={{ x: -240, y: -450, rotate: -30, opacity: 0, scale: 0.3 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 85,
                      damping: 14,
                      delay: 0.1,
                    }}
                    className="absolute -top-3 -left-6 sm:-left-12 md:-left-16 z-20"
                  >
                    {/* Angled Asteroid White Smoke Trail (Fades out after landing) */}
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      animate={{ opacity: 0, scaleY: 0 }}
                      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                      className="absolute -top-16 left-10 origin-bottom -rotate-[30deg] w-1.5 h-20 bg-gradient-to-t from-white/90 via-white/40 to-transparent filter blur-xs pointer-events-none"
                    />

                    <motion.div
                      animate={{
                        y: [0, -12, 0],
                        rotate: [0, -6, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-12 h-12 sm:w-16 sm:h-16  backdrop-blur-md rounded-2xl border border-zinc-700/80 shadow-2xl shadow-black/60 flex items-center justify-center text-zinc-300 hover:border-zinc-500 transition-colors transform-gpu [backface-visibility:hidden]"
                    >
                      <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-300" />
                    </motion.div>
                  </motion.div>

                  {/* 2. Floating Rectangle Pill Component (Top-Right) */}
                  <motion.div
                    initial={{ x: -280, y: -500, rotate: -30, opacity: 0, scale: 0.3 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 14,
                      delay: 0.3,
                    }}
                    className="absolute top-2 -right-8 sm:-right-16 md:-right-24 z-20"
                  >
                    {/* Angled Asteroid White Smoke Trail (Fades out after landing) */}
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      animate={{ opacity: 0, scaleY: 0 }}
                      transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                      className="absolute -top-16 -left-2 origin-bottom -rotate-[30deg] w-2 h-20 bg-gradient-to-t from-white/90 via-white/40 to-transparent filter blur-xs pointer-events-none"
                    />

                    <motion.div
                      animate={{
                        y: [0, 12, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="px-3.5 py-2  backdrop-blur-md rounded-2xl border border-zinc-700/80 shadow-2xl shadow-black/60 flex items-center gap-2 text-zinc-200 text-xs sm:text-sm font-semibold hover:border-zinc-500 transition-colors transform-gpu [backface-visibility:hidden]"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-pulse" />
                      <span className="text-zinc-100 font-bold">
                        ⚡ Full Stack
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* 3. Floating Square Component (Bottom-Right) */}
                  <motion.div
                    initial={{ x: -300, y: -550, rotate: -30, opacity: 0, scale: 0.3 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 85,
                      damping: 14,
                      delay: 0.5,
                    }}
                    className="absolute -bottom-4 -right-6 sm:-right-12 md:-right-16 z-20"
                  >
                    {/* Angled Asteroid White Smoke Trail (Fades out after landing) */}
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      animate={{ opacity: 0, scaleY: 0 }}
                      transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                      className="absolute -top-16 -left-2 origin-bottom -rotate-[30deg] w-1.5 h-20 bg-gradient-to-t from-white/90 via-white/40 to-transparent filter blur-xs pointer-events-none"
                    />

                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 8, 0],
                      }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="w-12 h-12 sm:w-16 sm:h-16  backdrop-blur-md rounded-2xl border border-zinc-700/80 shadow-2xl shadow-black/60 flex items-center justify-center text-zinc-300 hover:border-zinc-500 transition-colors transform-gpu [backface-visibility:hidden]"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      >
                        <FaReact className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-300" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* 4. Floating Rectangle Pill Component (Bottom-Left) */}
                  <motion.div
                    initial={{ x: -250, y: -480, rotate: -30, opacity: 0, scale: 0.3 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 14,
                      delay: 0.7,
                    }}
                    className="absolute -bottom-3 -left-8 sm:-left-16 md:-left-22 z-20"
                  >
                    {/* Angled Asteroid White Smoke Trail (Fades out after landing) */}
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      animate={{ opacity: 0, scaleY: 0 }}
                      transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
                      className="absolute -top-16 -left-2 origin-bottom -rotate-[30deg] w-2 h-20 bg-gradient-to-t from-white/90 via-white/40 to-transparent filter blur-xs pointer-events-none"
                    />

                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                        rotate: [0, -4, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.8,
                      }}
                      className="px-3.5 py-2  backdrop-blur-md rounded-2xl border border-zinc-700/80 shadow-2xl shadow-black/60 flex items-center gap-2 text-zinc-300 text-xs sm:text-sm font-bold hover:border-zinc-500 transition-colors transform-gpu [backface-visibility:hidden]"
                    >
                      <Zap className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                      <span className="text-zinc-300 font-semibold">Clean Code</span>
                    </motion.div>
                  </motion.div>

                  {/* 5. Floating Rotated Square Tile (Top Far Right) */}
                  <motion.div
                    initial={{ x: -220, y: -420, rotate: -30, opacity: 0, scale: 0.2 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 14,
                      delay: 0.2,
                    }}
                    className="absolute -top-8 right-8 sm:right-20 z-10"
                  >
                    {/* Angled Asteroid White Smoke Trail (Fades out after landing) */}
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      animate={{ opacity: 0, scaleY: 0 }}
                      transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                      className="absolute -top-12 left-1 origin-bottom -rotate-[30deg] w-1 h-16 bg-gradient-to-t from-white/80 via-white/30 to-transparent filter blur-xs pointer-events-none"
                    />

                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotate: [12, 28, 12],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      className="w-9 h-9 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/70 rounded-xl flex items-center justify-center text-zinc-300 shadow-md transform-gpu [backface-visibility:hidden]"
                    >
                      <Sparkles className="w-4 h-4 text-zinc-300" />
                    </motion.div>
                  </motion.div>

                  {/* 6. Floating Rotated Square Tile (Mid Far Left) */}
                  <motion.div
                    initial={{ x: -320, y: -520, rotate: -30, opacity: 0, scale: 0.2 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 85,
                      damping: 14,
                      delay: 0.9,
                    }}
                    className="absolute top-1/2 -left-12 sm:-left-20 transform -translate-y-1/2 z-10"
                  >
                    {/* Angled Asteroid White Smoke Trail (Fades out after landing) */}
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      animate={{ opacity: 0, scaleY: 0 }}
                      transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
                      className="absolute -top-12 left-1 origin-bottom -rotate-[30deg] w-1 h-16 bg-gradient-to-t from-white/80 via-white/30 to-transparent filter blur-xs pointer-events-none"
                    />

                    <motion.div
                      animate={{
                        y: [0, 14, 0],
                        rotate: [-15, -30, -15],
                      }}
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2,
                      }}
                      className="w-10 h-10 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/70 rounded-xl flex items-center justify-center shadow-md transform-gpu [backface-visibility:hidden]"
                    >
                      <Database className="w-5 h-5 text-zinc-300" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Tech Stack Section */}
        <section
          ref={techSectionRef}
          id="techstack"
          className="py-24 bg-black text-white relative overflow-hidden"
        >
          {/* Subtle Ambient Light Glow background in container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4  filter blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-left mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  TECH STACK
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-zinc-400 via-zinc-200 to-transparent rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 relative">
              {[
                {
                  name: "React",
                  icon: FaReact,
                  color: "text-blue-400",
                },
                {
                  name: "TypeScript",
                  icon: SiTypescript,
                  color: "text-blue-500",
                },
                {
                  name: "Next.js",
                  icon: SiNextdotjs,
                  color: "text-zinc-100",
                },
                {
                  name: "Tailwind",
                  icon: Zap,
                  color: "text-cyan-400",
                },
                {
                  name: "TanStack Query",
                  icon: SiReactquery,
                  color: "text-red-400",
                },
                {
                  name: "Node.js",
                  icon: FaNode,
                  color: "text-emerald-400",
                },
                {
                  name: "Express",
                  icon: SiExpress,
                  color: "text-zinc-200",
                },
                {
                  name: "REST APIs",
                  icon: Globe,
                  color: "text-cyan-400",
                },
                {
                  name: "WebSockets",
                  icon: Radio,
                  color: "text-amber-400",
                },
                {
                  name: "PostgreSQL",
                  icon: SiPostgresql,
                  color: "text-blue-400",
                },
                {
                  name: "MongoDB",
                  icon: SiMongodb,
                  color: "text-emerald-500",
                },
                {
                  name: "Supabase",
                  icon: SiSupabase,
                  color: "text-emerald-400",
                },
                {
                  name: "Redis",
                  icon: SiRedis,
                  color: "text-red-400",
                },
                {
                  name: "Redux",
                  icon: Package,
                  color: "text-purple-400",
                },

                {
                  name: "Git",
                  icon: GitBranch,
                  color: "text-orange-400",
                },
                {
                  name: "GitHub",
                  icon: FaGithub,
                  color: "text-zinc-300",
                },
                {
                  name: "Vercel",
                  icon: SiVercel,
                  color: "text-zinc-100",
                },
                {
                  name: "CI/CD Pipeline",
                  icon: Workflow,
                  color: "text-blue-400",
                },
              ].map((tech, index) => {
                const TechIcon = tech.icon;

                // High-altitude randomized drop vectors for every element
                const dropSeeds = [
                  { x: -240, y: -580, r: -40 },
                  { x: 180, y: -490, r: 30 },
                  { x: -120, y: -650, r: -20 },
                  { x: 250, y: -520, r: 45 },
                  { x: -290, y: -600, r: -55 },
                  { x: 150, y: -700, r: 25 },
                  { x: -190, y: -450, r: -35 },
                  { x: 220, y: -620, r: 40 },
                  { x: -260, y: -530, r: -50 },
                  { x: 100, y: -680, r: 18 },
                  { x: -200, y: -500, r: -32 },
                  { x: 270, y: -570, r: 50 },
                  { x: -140, y: -640, r: -22 },
                  { x: 190, y: -470, r: 35 },
                  { x: -220, y: -670, r: -42 },
                  { x: 160, y: -550, r: 28 },
                  { x: -280, y: -510, r: -52 },
                  { x: 200, y: -610, r: 42 },
                  { x: -170, y: -660, r: -30 },
                ];
                const drop = dropSeeds[index % dropSeeds.length];
                const dropDelay = (index % 6) * 0.08;
                const floatDuration = 4 + (index % 4) * 0.7;

                return (
                  <motion.div
                    key={index}
                    initial={{ x: drop.x, y: drop.y, rotate: drop.r, opacity: 0, scale: 0.3 }}
                    animate={
                      isTechInView
                        ? { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
                        : { x: drop.x, y: drop.y, rotate: drop.r, opacity: 0, scale: 0.3 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 85,
                      damping: 14,
                      delay: dropDelay,
                    }}
                    className="relative group flex items-center justify-center"
                  >
                    {/* Angled Asteroid White Smoke Trail (Fades out as asteroid lands) */}
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      animate={
                        isTechInView
                          ? { opacity: 0, scaleY: 0 }
                          : { opacity: 1, scaleY: 1 }
                      }
                      transition={{ delay: dropDelay + 0.4, duration: 0.5, ease: "easeOut" }}
                      className="absolute -top-16 left-1/2 origin-bottom -rotate-[30deg] w-1.5 h-20 bg-gradient-to-t from-white/90 via-white/30 to-transparent filter blur-xs pointer-events-none z-0"
                    />

                    {/* Spaceship Floating Tech Container (Floats after asteroid drop landing) */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, index % 2 === 0 ? 3 : -3, 0],
                      }}
                      transition={{
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: dropDelay + 0.9,
                      }}
                      whileHover={{ scale: 1.15, y: -6 }}
                      className="relative p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transform-gpu [backface-visibility:hidden] transition-all duration-200"
                    >
                      {/* Ambient Shadow Light Glow Behind Icon */}
                      <div className="absolute inset-0 rounded-full filter blur-lg group-hover:bg-white/15 transition-all duration-200 pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />

                      <TechIcon className={`${tech.color} text-2xl sm:text-3xl relative z-10 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-200`} />
                      <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors text-center relative z-10 tracking-wide">
                        {tech.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* About Section */}
        <section
          ref={aboutSectionRef}
          id="about"
          className="py-24 bg-black text-white relative overflow-hidden"
        >
          {/* Subtle Ambient Light Glow background in container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 filter  rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  ABOUT ME
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-zinc-400 via-zinc-200 to-transparent rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 text-zinc-300">
                  <User size={24} className="text-zinc-200" />
                  <span className="text-lg font-semibold text-zinc-200">
                    Software Developer
                  </span>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  I'm a passionate Full Stack Web Developer crafting seamless
                  digital experiences from frontend to backend. Currently
                  working on innovative projects that combine elegant user
                  interfaces with robust server-side architecture. My expertise
                  spans the entire web development stack, from <strong className="font-bold text-white">React</strong> and <strong className="font-bold text-white">Next.js</strong> on the frontend to <strong className="font-bold text-white">Node.js</strong> and <strong className="font-bold text-white">Express</strong> on the backend.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  I'm driven by clean code, scalable architecture, and creating
                  solutions that genuinely solve real problems. I love building
                  modern web applications with <strong className="font-bold text-white">TypeScript</strong>, working with
                  databases like <strong className="font-bold text-white">PostgreSQL</strong> and Supabase, and leveraging tools
                  like  <strong className="font-bold text-white">Redis</strong> for performance optimization. Every project is an
                  opportunity to learn something new and push the boundaries of
                  what's possible on the web.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Star className="text-amber-400" size={20} />
                    <span className="text-zinc-300 font-medium">Full Stack Expertise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="text-emerald-400" size={20} />
                    <span className="text-zinc-300 font-medium">Production Ready Code</span>
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
                  { value: "Always", label: "Learning & Growing", icon: Star, isStar: true },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`backdrop-blur-md rounded-2xl p-6 text-center border shadow-lg shadow-black/40 transition-all duration-200 group ${stat.isStar
                      ? "bg-zinc-900/80 border-amber-500/40 hover:border-amber-400 shadow-amber-500/10"
                      : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/80"
                      }`}
                  >
                    {stat.isStar ? (
                      <div id="star-target-card" className="relative inline-flex items-center justify-center mb-3 min-h-[44px] min-w-[44px]">
                        {/* Target slot container for single persistent #star */}
                        <div className="w-11 h-11 pointer-events-none" />
                      </div>
                    ) : (
                      <stat.icon
                        className="mx-auto mb-3 text-zinc-300 group-hover:scale-110 transition-transform duration-200"
                        size={32}
                      />
                    )}
                    <div className="text-2xl font-bold text-white tracking-wide">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        {/* Skills Section */}
        <section id="skills" className="py-24 bg-black text-white relative overflow-hidden">
          {/* Subtle Ambient Light Glow background in container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  TECHNICAL SKILLS
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-zinc-400 via-zinc-200 to-transparent rounded-full"></div>
            </motion.div>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Layout,
                  title: "Frontend Core",
                  skills: ["React", "TypeScript", "Next.js", "HTML 5", "CSS 3", "TanStack Query"],
                },
                {
                  icon: Code2,
                  title: "Styling & UI",
                  skills: [
                    "Tailwind CSS",
                    "BootStrap",
                    "Styled Components",
                    "Material-UI",
                  ],
                },
                {
                  icon: Server,
                  title: "State Management",
                  skills: ["Redux", "Zustand", "Context API"],
                },
                {
                  icon: CreditCard,
                  title: "Payment Integration",
                  skills: [
                    "Razorpay",
                    "Payment Gateway",
                    "Webhook Integration",
                  ],
                },
                {
                  icon: Database,
                  title: "Backend Integration",
                  skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Supabase", "REST APIs", "WebSockets"],
                },
                {
                  icon: Award,
                  title: "Tools & Testing",
                  skills: ["Postman", "Vercel", "CI/CD Pipeline", "Git/GitHub"],
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                  className=" backdrop-blur-md rounded-xl p-3 sm:p-3.5 transition-all duration-100 shadow-lg flex flex-col md:flex-row md:items-center gap-3"
                >
                  {/* Category Title with Icon & Colon */}
                  <div className="flex items-center gap-2.5 min-w-[200px] flex-shrink-0">
                    <div className="w-7 h-7 rounded-lg   flex items-center justify-center text-zinc-200 shadow-sm flex-shrink-0">
                      <category.icon size={12} />
                    </div>
                    <h3 className="text-xs sm:text-xs font-bold text-white/70 tracking-tight">
                      {category.title} :
                    </h3>
                  </div>

                  {/* Skills in a line */}
                  <div className="flex flex-wrap items-center gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 rounded-lg text-[11px] font-medium hover:border-zinc-500 hover:text-white transition-colors"
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
        <section
          id="experience"
          className="py-24 bg-black text-white relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px]  rounded-full pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  WORK EXPERIENCE
                </span>
              </h2>

              <div className="w-20 h-1 mt-4 bg-gradient-to-r from-zinc-400 via-zinc-200 to-transparent rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative group"
            >


              {/* Main Card */}
              <div className="ml-4 rounded-3xl p-8 transition-all duration-200 group-hover:border-zinc-600 group-hover:shadow-2xl group-hover:shadow-black/60">
                {/* Top Row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">


                      <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          Full Stack Web Developer Intern
                        </h3>
                        <p className="text-zinc-400 font-medium">
                          Botivate Services LLP
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">


                    <span className="px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 text-sm font-medium">
                      Feb 2026 — July 2026
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 leading-8 text-[15px] mb-8">
                  Worked as a {" "}
                  <span className="text-white font-semibold">
                    Full Stack Web Developer Intern
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
                  <h4 className="text-sm uppercase tracking-widest text-zinc-400 font-bold mb-3">
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
                        className="px-4 py-2 rounded-xl bg-zinc-800/80 border border-zinc-700/70 text-sm text-zinc-300 font-medium transition-all duration-200 hover:border-zinc-500 hover:text-white hover:-translate-y-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-800">
                  {[
                    { value: "Full Stack", label: "Development" },
                    { value: "React", label: "Frontend" },
                    { value: "Node.js", label: "Backend" },
                    { value: "PostgreSQL", label: "Database" },
                  ].map((item, index) => (
                    <div key={index}>
                      <p className="text-lg font-bold text-white">
                        {item.value}
                      </p>
                      <p className="text-sm text-zinc-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-black text-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  PROJECTS
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-zinc-400 via-zinc-200 to-transparent rounded-full mb-4"></div>

            </motion.div>

            {/* 3D 360 Showcase Card (Left: Specification, Right: Slideshow) */}
            <div className="backdrop-blur-md rounded-2xl p-2 sm:p-4 shadow-2xl mb-12 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
              {/* Left Side: Specification of Project */}
              <div className="lg:w-5/12 w-full space-y-5 flex flex-col justify-between">
                <div className="space-y-3.5">

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    HUMAN RESOURCE MANAGEMENT AUTOMATION SYSTEM .
                  </h3>

                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                      {hrProjectViews[activeHrView].title}
                    </h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {hrProjectViews[activeHrView].description}
                    </p>
                  </div>


                </div>

                {/* Key Specifications Box */}
                <div className="space-y-3 bg-zinc-950/80 p-4.5 border border-zinc-800 shadow-inner">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                    <span>Key Specifications:</span>

                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-zinc-200 flex-shrink-0" />
                      <span>Real-time punch logging & time tracking</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-zinc-300 flex-shrink-0" />
                      <span>Multi-store & location device matching</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-zinc-300 flex-shrink-0" />
                      <span>Employee directory & onboarding workflows</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-zinc-400 flex-shrink-0" />
                      <span>Automated payroll & Excel/CSV data exports</span>
                    </li>
                  </ul>
                </div>

                {/* Project Links (Live Link + GitHub Repo) */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://portfolio-hr-management.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group overflow-hidden px-5 py-2.5 border border-green-700 text-zinc-200 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all duration-200 hover:border-white hover:text-black"
                  >
                    {/* Bottom-to-Top White Layer Fill Slide Animation */}
                    <span className="absolute inset-0 w-full h-full bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-0" />

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2  transition-colors duration-200">
                      <span>Live Link</span>
                      <ExternalLink size={15} />
                    </span>
                  </a>

                  <a
                    href="https://github.com/AyushDewangan21/portfolio_HR_Management"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group overflow-hidden px-5 py-2.5 border border-zinc-700 text-zinc-200 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all duration-200 hover:border-white"
                  >
                    {/* Bottom-to-Top White Layer Fill Slide Animation */}
                    <span className="absolute inset-0 w-full h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-0" />

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-zinc-950 transition-colors duration-200">
                      <FaGithub size={16} />
                      <span>GitHub</span>
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Side: Slideshow Carousel */}
              <div className="lg:w-7/12 w-full min-w-0">
                <ThreeSixtyCarousel
                  views={hrProjectViews}
                  activeView={activeHrView}
                  setActiveView={setActiveHrView}
                  onImageClick={(img) => setLightboxImage(img)}
                />
              </div>
            </div>






          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-24 bg-black text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  LET'S CONNECT
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-zinc-400 via-zinc-200 to-transparent rounded-full mb-4"></div>
              <p className="text-zinc-400 max-w-2xl">
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
                className="space-y-6 pr-10"
              >
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Get In Touch
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: FaGithub,
                      text: "ayushdewangan21",
                      href: "https://github.com/ayushdewangan21/",
                      border: "border-white",
                      fill: "bg-white",
                      hoverText: "group-hover:text-black",
                    },
                    {
                      icon: FaLinkedin,
                      text: "ayushdewangan21",
                      href: "https://linkedin.com/in/ayushdewangan21",
                      border: "border-blue-500",
                      fill: "bg-blue-600",
                      hoverText: "group-hover:text-white",
                    },
                    {
                      icon: Mail,
                      text: "ayush.dewangan2109@gmail.com",
                      href: "mailto:ayush.dewangan2109@gmail.com",
                      border: "border-red-500",
                      fill: "bg-red-500",
                      hoverText: "group-hover:text-white",
                    },
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative group overflow-hidden flex items-center gap-3 px-3.5 py-2.5 bg-zinc-900/60 border ${contact.border} text-zinc-300 shadow-md transition-all duration-200`}
                    >
                      {/* Bottom-to-Top Fill Slide Animation */}
                      <span className={`absolute inset-0 w-full h-full ${contact.fill} translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-0`} />

                      {/* Content */}
                      <span className={`relative z-10 flex items-center gap-3 ${contact.hoverText} transition-colors duration-200`}>
                        <contact.icon size={18} />
                        <span className="break-all font-medium text-sm">{contact.text}</span>
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-zinc-800  text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-zinc-800  text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                />
                <textarea
                  rows={3}
                  placeholder="Your Message"
                  className="w-full px-3.5 py-2.5 bg-zinc-900/60 border border-zinc-800  text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                ></textarea>
                <motion.button

                  type="submit"
                  className="relative group overflow-hidden w-full px-8 py-2.5 bg-zinc-100 border border-zinc-100 text-zinc-950 font-bold shadow-lg transition-all duration-200 hover:border-zinc-700"
                >
                  {/* Bottom-to-Top Black Layer Fill Slide Animation */}
                  <span className="absolute inset-0 w-full h-full bg-zinc-950 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-0" />

                  {/* Content */}
                  <span className="relative z-10 block group-hover:text-white transition-colors duration-200">
                    Send Message
                  </span>
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="relative group overflow-hidden py-6 border-t border-zinc-800/80 bg-black">
          {/* Bottom-to-Top White Layer Fill Slide Animation */}
          <span className="absolute inset-0 w-full h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-zinc-500 text-sm group-hover:text-black transition-colors duration-200">
              © 2026 Ayush Dewangan  •  Software DeveEngineer • Building modern
              web experiences
            </p> 
          </div>
        </footer>
      </main>

      {/* Lightbox Modal for full size view */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full bg-zinc-800/80 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <img
              src={lightboxImage}
              alt="Enlarged preview"
              className="w-full h-full object-contain rounded-xl border border-zinc-800 shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* SINGLE PERSISTENT DOM ELEMENT WITH id="star" LINKED DIRECTLY TO PAGE SCROLL */}
      <motion.div
        id="star"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: effectiveStarX,
          y: effectiveStarY,
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        {/* Asteroid Goldish Fog Trail when landing into About Me */}
        <motion.div
          style={{ opacity: fogOpacity }}
          className="absolute -top-20 left-1/2 -translate-x-1/2 origin-bottom -rotate-[35deg] w-2.5 h-24 bg-gradient-to-t from-yellow-400/90 via-amber-300/40 to-transparent filter blur-sm pointer-events-none z-0"
        />

        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <div className="absolute inset-0 rounded-full bg-amber-400/20 filter blur-md pointer-events-none" />
          <svg
            width={44}
            height={44}
            viewBox="0 0 24 24"
            className="overflow-visible filter drop-shadow-[0_0_16px_rgba(250,204,21,0.95)]"
          >
            <defs>
              <linearGradient id="singlePersistentStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" stopOpacity="1" />
                <stop offset="100%" stopColor="#EAB308" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="url(#singlePersistentStarGrad)"
              stroke="#EAB308"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <motion.path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 72"
              animate={{ strokeDashoffset: [0, -77] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="filter drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
