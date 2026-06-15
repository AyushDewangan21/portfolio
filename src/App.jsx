import { useState, useEffect } from "react";
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

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === item
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
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item
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
        ```
        {/* Projects Section */}
        <section id="projects" className="py-20 bg-slate-900/30">
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
                  Featured Projects
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">
                Real-world applications I've built
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* LMS Project */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                  <span className="relative z-10">📚</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      Learning Management System (LMS)
                    </h3>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-md text-xs">
                      Live
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Full-stack LMS platform with course management, user
                    authentication, and progress tracking. Features instructor
                    dashboards and student learning paths.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Clerk", "Node.js", "React.js", "Express.js"].map(
                      (tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ),
                    )}
                  </div>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="https://lms-fronntend.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Project <ExternalLink size={16} />
                  </motion.a>
                </div>
              </motion.div>

              {/* Quick Mart Project */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                  <span className="relative z-10">🛍️</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      Quick Mart - E-commerce Platform
                    </h3>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-md text-xs">
                      Live
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Modern e-commerce platform with clean UI, responsive design,
                    and seamless shopping experience. Features product browsing,
                    cart management, and checkout flow.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Clean UI", "Tailwind CSS", "React", "Responsive"].map(
                      (tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ),
                    )}
                  </div>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="https://quick-mart-ochre.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Project <ExternalLink size={16} />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Optional: Add a third project card if you want to showcase more */}
            <div className="text-center mt-12">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://github.com/ayushdewangan21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-purple-500 text-purple-400 rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                View More on GitHub <ExternalLink size={16} />
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
