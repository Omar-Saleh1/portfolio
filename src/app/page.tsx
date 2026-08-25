"use client";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaGitAlt, 
  FaPaperPlane, 
  FaCode,
  FaLightbulb,
  FaMobileAlt,
  FaRocket,
  FaChevronRight,
  FaNodeJs,
  FaServer,
  FaPython,
  FaBrain,
  FaDatabase,
  FaCogs,
  FaTerminal,
  FaLayerGroup
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiRedux, 
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiPostman,
  SiNpm,
  SiCplusplus,
  SiOpenai
} from "react-icons/si";
import emailjs from "emailjs-com";

// High-Performance HTML5 Canvas Particles Background with Mouse Interactivity
function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 140, // interaction radius
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(239, 68, 68, 0.45)"; // red particles
      ctx.strokeStyle = "rgba(239, 68, 68, 0.05)"; // default lines

      particles.forEach((p, idx) => {
        // Base movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce margins
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction (Repulsion and dynamic connection lines)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            // Stronger force when mouse is closer
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            // Gently push particles away
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;

            // Draw line to the mouse cursor
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.12 * force})`;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect near particles with lines
        ctx.strokeStyle = "rgba(239, 68, 68, 0.05)";
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none bg-black" />;
}

// Typewriter Component
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");
  
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }
    
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, words]);
  
  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index, words]);
  
  return (
    <span className="text-red-500 font-semibold inline-block min-h-[1.2em]">
      {text}
      <span className="animate-pulse ml-1 border-r-2 border-red-500"></span>
    </span>
  );
}

// Parallax Interactive Photo Card (Transparent & Frameless)
function ParallaxPhoto({ src, alt }: { src: string; alt: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);
  
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group w-72 md:w-80 h-[28rem] md:h-[34rem] cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="relative w-full h-full flex items-center justify-center bg-transparent"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]" 
        />
      </div>
    </motion.div>
  );
}

// Grouped Skills Data
const skillsData = {
  frontend: [
    { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
    { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
    { name: "Redux Toolkit", icon: SiRedux, color: "text-purple-500" }
  ],
  backend: [
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
    { name: "Express.js", icon: SiExpress, color: "text-white" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
    { name: "REST APIs", icon: FaServer, color: "text-indigo-400" }
  ],
  tools: [
    { name: "Git & GitHub", icon: FaGitAlt, color: "text-red-500" },
    { name: "Docker", icon: SiDocker, color: "text-sky-400" },
    { name: "Postman", icon: SiPostman, color: "text-orange-400" },
    { name: "npm", icon: SiNpm, color: "text-red-500" }
  ],
  cs: [
    { name: "Python", icon: FaPython, color: "text-yellow-400" },
    { name: "C++", icon: SiCplusplus, color: "text-blue-500" },
    { name: "Java", icon: FaCode, color: "text-orange-500" },
    { name: "DSA", icon: FaLayerGroup, color: "text-purple-400" },
    { name: "DBMS", icon: FaDatabase, color: "text-green-400" },
    { name: "OOP", icon: FaCogs, color: "text-gray-300" },
    { name: "System Design", icon: FaServer, color: "text-indigo-400" },
    { name: "Operating Systems", icon: FaTerminal, color: "text-rose-400" }
  ],
  ai: [
    { name: "Generative AI", icon: SiOpenai, color: "text-emerald-400" },
    { name: "LLM Integration", icon: FaBrain, color: "text-violet-400" },
    { name: "Prompt Engineering", icon: FaLightbulb, color: "text-yellow-300" },
    { name: "Responsive Design", icon: FaMobileAlt, color: "text-cyan-400" }
  ]
};

// Project Data
const projects = [
  {
    title: "CimaVerse – Cinema Booking App",
    description: "A premium movie discovery and booking platform featuring trailer playback, seat reservation, and dynamic schedules.",
    detailedDescription: "CimaVerse is a complete full-stack cinema booking experience. It features interactive seat maps (with real-time occupancy selection), custom trailer streaming overlay windows, automated booking confirmation records, and responsive schedule filtering. The server manages secure scheduling systems, MongoDB transactions to lock chosen seats during checkout, and REST endpoints for cinema management.",
    image: "/cimaverse.png",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://cinema-booking-app-frontend.vercel.app/",
    category: "Next.js/React",
    tags: ["Next.js", "React.js", "Tailwind CSS", "Node.js", "MongoDB", "Express", "REST API", "Booking Logic"]
  },
  {
    title: "Plantify – Smart Plant Care App",
    description: "An e-commerce and smart plant health platform. Shop 500+ plant species, track care schedules, and diagnose plant diseases instantly.",
    detailedDescription: "Plantify is a full-featured plant care assistant and retail shop. It combines an optimized e-commerce checkout loop (featuring Redux cart synchronization) with smart care scheduling features (e.g. customized watering timers, lighting notifications). It also incorporates a client-side leaf-scanning AI model powered by TensorFlow.js, enabling users to diagnose crop and houseplant leaf diseases instantly via their device camera.",
    image: "/plantify.png",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://plantfiy-zk64.vercel.app/",
    category: "Next.js/React",
    tags: ["Next.js", "React.js", "Tailwind CSS", "TensorFlow.js (AI)", "Redux Toolkit", "Local Storage", "E-commerce"]
  },
  {
    title: "E-commerce App",
    description: "A high-performance online store with product browsing, shopping cart, secure checkout, and user authentication.",
    detailedDescription: "A fully realized full-stack e-commerce environment. It includes secure JSON Web Token (JWT) user authentication, dynamic categorization and filtering engines, a centralized Redux state cart, and integrated sandbox Stripe API payments. A comprehensive admin dashboard allows owners to track orders, manage active inventories, and inspect sales charts.",
    image: "/Ecommerce.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://web-ecommerce-ruby.vercel.app/",
    category: "Next.js/React",
    tags: ["Next.js", "React.js", "Tailwind CSS", "Redux Toolkit", "Node.js", "Express", "JWT Auth", "Stripe API"]
  },
  {
    title: "Doctor App – Appointment Booking",
    description: "A medical scheduling platform connecting patients with specialists, including a full-featured admin management panel.",
    detailedDescription: "Doctor App is a scheduling hub for healthcare specialists. Patients can filter registered doctors by medical specialty, inspect slot availabilities, and request direct bookings. An advanced administrative control portal allows clinics to approve appointment times, manage doctor registers, and update working hours.",
    image: "/Screenshot 2025-11-09 103155.png",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://doctor-app-sepia.vercel.app/",
    category: "Next.js/React",
    tags: ["React.js", "Next.js", "Tailwind CSS", "Admin Dashboard", "Context API", "REST APIs"]
  },
  {
    title: "Real Estate Platform",
    description: "An interactive real estate website allowing users to browse and filter property listings by price, location, and type.",
    detailedDescription: "A clean listings client built for real estate brokerages. It features high-fidelity map integration, multi-factor filtering (such as location radius, building type, price, and rooms), agent communication portals, and support for high-resolution photo galleries.",
    image: "/Screenshot 2025-11-09 101403.png",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://real-state-one-ashy.vercel.app/",
    category: "Next.js/React",
    tags: ["React.js", "Next.js", "Tailwind CSS", "Map APIs", "Search Filters", "Responsive Design"]
  },
  {
    title: "Social App (Linkpost)",
    description: "Linkpost is a social web app built with Vite & React that lets users create profiles, share links, and connect with others easily.",
    detailedDescription: "Linkpost is a micro-profile creator similar to Linktree but with social timelines. Users can sign up, choose custom layouts, add social URLs, and broadcast posts. It focuses on clean reactive layouts and fast local data handling.",
    image: "/SocialApp.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://linkpost-iota.vercel.app/",
    category: "Vite/React",
    tags: ["Vite", "React.js", "Tailwind CSS", "User Profiles", "Interactive Grid"]
  },
  {
    title: "Weather App",
    description: "A clean web application providing real-time weather details and forecasts by city.",
    detailedDescription: "Weather App retrieves current coordinates and weather data (including humidity, wind vector, UV values, and a 7-day forecast) using OpenWeatherMap REST endpoints. Includes dynamic UI animations where the background shifts matching the search city's actual time and climate conditions.",
    image: "/weather.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://omar-saleh1.github.io/Weather/",
    category: "Vanilla JS",
    tags: ["HTML5", "CSS3", "JavaScript", "Weather API", "Dynamic Backgrounds"]
  },
  {
    title: "Bookmarker App",
    description: "A streamlined web client for managing, organizing, and saving favorite website URLs.",
    detailedDescription: "A lightweight URL bookmarker designed for organizing websites. It features URL validation checks, real-time catalog search filtering, favicon retrieval, and persistent browser storage.",
    image: "/BookMark.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://omar-saleh1.github.io/bookmark/",
    category: "Vanilla JS",
    tags: ["HTML5", "CSS3", "JavaScript", "Local Storage", "Regex Validation"]
  },
  {
    title: "Smart Login System",
    description: "A front-end authentication simulation demonstrating secure login, sign up, session management, and routing validations.",
    detailedDescription: "A client-side security demo showcasing login validations, signup credential constraints, session states, and protected client-side routes.",
    image: "/SmartSystem.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://omar-saleh1.github.io/Smart-System/",
    category: "Vanilla JS",
    tags: ["HTML5", "CSS3", "JavaScript", "Validation", "Local Storage"]
  },
];

// Count-up Animation Hook
function useCountUp(target: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

// Stat Item with Count-up
function StatItem({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(target, 1500, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="space-y-1"
    >
      <h4 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
        {count}{suffix}
      </h4>
      <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-semibold">{label}</p>
    </motion.div>
  );
}

// Animation variants for Staggered Skills entering viewport
const skillsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    }
  }
};

const skillItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  
  // Floating Header Scrolled State
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"" | "success" | "error" | "sending">("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID", 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY" 
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setStatus(""), 5000);
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus(""), 5000);
        }
      );
  };

  // Unique Categories
  const categories = ["All", "Next.js/React", "Vite/React", "Vanilla JS"];
  
  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="relative min-h-screen text-gray-100 bg-grid-pattern selection:bg-red-500/20 selection:text-red-200">
      
      {/* Animated Canvas Particles Background */}
      <ParticlesBackground />
      
      {/* Background Ambient Glowing Blobs */}
      <div className="ambient-blob ambient-red w-[450px] h-[450px] top-[10%] left-[-100px]"></div>
      <div className="ambient-blob ambient-rose w-[550px] h-[550px] top-[40%] right-[-150px]"></div>
      <div className="ambient-blob ambient-orange w-[400px] h-[400px] bottom-[15%] left-[20%]"></div>

      {/* Floating Header */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "py-3 px-4 md:px-8" 
            : "py-6 px-4 md:px-8"
        }`}
      >
        <div className={`max-w-6xl mx-auto flex justify-between items-center px-6 py-3 rounded-full transition-all duration-300 ${
          scrolled 
            ? "glass-panel border-white/5 shadow-lg shadow-black bg-black/85" 
            : "border-transparent bg-transparent"
        }`}>
          <a href="#home" className="flex items-center gap-1.5 group">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent group-hover:opacity-85 transition">
              Omar
            </span>
            <span className="text-[7px] tracking-widest px-1.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-500 font-bold uppercase">
              Dev
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  className="capitalize text-gray-300 hover:text-red-500 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-br from-red-500 to-rose-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-red-800"
              >
                <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-black rounded-full group-hover:bg-opacity-0">
                  Hire Me
                </span>
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden flex items-center text-xl text-gray-300 hover:text-red-500 p-2 focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel border-white/5 rounded-2xl mt-2 mx-4 p-5 flex flex-col gap-4 text-center bg-black/95"
            >
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item}`} 
                  onClick={() => setIsOpen(false)}
                  className="capitalize text-gray-300 hover:text-red-500 text-md py-1.5 transition"
                >
                  {item}
                </a>
              ))}
              <div className="h-px bg-white/5 my-1"></div>
              <div className="flex justify-center gap-6 text-lg py-1 text-gray-400">
                <a href="https://github.com/Omar-Saleh1" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/omar-abdelmoniam-30313b349" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaLinkedin /></a>
                <a href="mailto:os6100050@gmail.com" className="hover:text-red-500"><FaEnvelope /></a>
              </div>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-full font-bold shadow-lg"
              >
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen py-24 flex items-center justify-center px-6 md:px-12 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
          
          {/* Info Details */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center self-start gap-2 bg-red-950/30 border border-red-800/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-500 tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              AVAILABLE FOR HIRE
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Hi, I am <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent font-black">
                Omar Abdelmonim
              </span>
            </h1>

            <h3 className="text-xl sm:text-2xl text-gray-300">
              I am a <Typewriter words={["Full-Stack Developer", "React & Node Specialist", "Database Designer"]} />
            </h3>

            <p className="text-base sm:text-lg text-gray-400 max-w-lg leading-relaxed">
              I design and engineer responsive web applications from client components to backend APIs. Bridging design elegance with server-side performance.
            </p>

            <div className="flex gap-4 items-center flex-wrap pt-2">
              <a 
                href="#projects" 
                className="bg-red-500 hover:bg-red-400 text-black font-bold px-6 py-3 rounded-full shadow-lg shadow-red-500/10 hover:shadow-red-400/30 transition duration-300 flex items-center gap-2 group"
              >
                View Work 
                <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/Omar_Abdel Moneim Amin Mahdi_Front-End Developer _resume.pdf"
                download
                className="border border-white/10 px-6 py-3 rounded-full font-semibold bg-white/5 hover:bg-white/10 hover:border-white/30 transition duration-300"
              >
                Download CV
              </a>
            </div>

            {/* Social Connect */}
            <div className="flex gap-5 text-xl pt-4 text-gray-400">
              <a href="https://github.com/Omar-Saleh1" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors duration-200"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/omar-abdelmoniam-30313b349" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors duration-200"><FaLinkedin /></a>
              <a href="mailto:os6100050@gmail.com" className="hover:text-red-500 transition-colors duration-200"><FaEnvelope /></a>
            </div>
          </motion.div>

          {/* Interactive Profile Frame */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 flex justify-center items-center"
          >
            <ParallaxPhoto src="/omar.jpg.png" alt="Omar photo" />
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Row */}
      <section className="relative py-12 bg-zinc-950/20 backdrop-blur-[2px] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem target={15} suffix="+" label="Projects Completed" delay={0} />
          <StatItem target={2} suffix="+" label="Years Experience" delay={0.1} />
          <StatItem target={100} suffix="%" label="Responsive Layouts" delay={0.2} />
          <StatItem target={12} suffix="+" label="Core Technologies" delay={0.3} />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-24 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              About <span className="text-red-500">Me</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto rounded"></div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Discover who I am, my development focus, and the code standards I deliver.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Visual element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative group w-72 md:w-80 h-[28rem] bg-transparent">
                <img 
                  src="/omar.jpg.png" 
                  alt="About me profile" 
                  className="w-full h-full object-contain object-top transition-transform duration-700 group-hover:scale-[1.02]" 
                />
              </div>
            </motion.div>

            {/* Description Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-300 text-left"
            >
              <h3 className="text-2xl font-bold text-white">
                Designing Experiences, Architecting Systems
              </h3>
              <p className="leading-relaxed">
                I am a specialized <span className="text-red-500 font-semibold">Full-Stack Web Developer</span> bridging front-end aesthetics with back-end architectures. I build dynamic client interfaces using React/Next.js alongside robust Node.js / Express servers and performant database configurations (MongoDB, PostgreSQL).
              </p>
              <p className="leading-relaxed">
                Whether organizing data models, structuring secure JWT token authentication workflows, deploying RESTful APIs, or optimizing Next.js server-side loading speed, I maintain clean, modular coding standards.
              </p>

              {/* Grid Focus items */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: FaCode, title: "Clean Architecture", desc: "Modular backend & client systems" },
                  { icon: FaServer, title: "Robust Backend", desc: "Node, Express & Database models" },
                  { icon: FaMobileAlt, title: "Responsive UIs", desc: "Fluid layouts on all viewports" },
                  { icon: FaRocket, title: "Optimized Speed", desc: "Fast API calls & lightweight scripts" }
                ].map((item, idx) => (
                  <div key={idx} className="glass-panel border-white/5 p-3.5 rounded-xl flex flex-col gap-1 hover:border-red-500/20 transition-all duration-300">
                    <item.icon className="text-red-500 text-lg mb-1" />
                    <h5 className="font-semibold text-white text-sm">{item.title}</h5>
                    <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:brightness-115 transition duration-300"
                >
                  Hire Me
                </a>
                <a
                  href="/Omar_Abdel Moneim Amin Mahdi_Front-End Developer _resume.pdf"
                  download
                  className="border border-white/10 hover:border-red-500/30 px-6 py-2.5 rounded-full font-semibold transition bg-white/5"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="relative py-24 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              My <span className="text-red-500">Skills</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto rounded"></div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              My structured software toolbox categorized from client design to database and back-end logic.
            </p>
          </div>

          {/* Grouped Skills Columns - Row 1 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">

            {/* Frontend Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-red-500 border-b border-red-500/20 pb-2 uppercase tracking-widest text-left">
                🖥️ Frontend Tech
              </h4>
              <motion.div 
                variants={skillsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 gap-3"
              >
                {skillsData.frontend.map((skill, idx) => {
                  const IconComp = skill.icon;
                  return (
                    <motion.div
                      variants={skillItemVariants}
                      whileHover={{ y: -3 }}
                      key={idx}
                      className="glass-panel glass-panel-hover border-white/5 p-3 rounded-xl flex items-center gap-2.5 shine-border cursor-default text-left"
                    >
                      <IconComp className={`text-xl shrink-0 ${skill.color}`} />
                      <span className="font-semibold text-xs text-white leading-tight">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Backend Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-red-500 border-b border-red-500/20 pb-2 uppercase tracking-widest text-left">
                ⚙️ Backend & Database
              </h4>
              <motion.div 
                variants={skillsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 gap-3"
              >
                {skillsData.backend.map((skill, idx) => {
                  const IconComp = skill.icon;
                  return (
                    <motion.div
                      variants={skillItemVariants}
                      whileHover={{ y: -3 }}
                      key={idx}
                      className="glass-panel glass-panel-hover border-white/5 p-3 rounded-xl flex items-center gap-2.5 shine-border cursor-default text-left"
                    >
                      <IconComp className={`text-xl shrink-0 ${skill.color}`} />
                      <span className="font-semibold text-xs text-white leading-tight">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Tools Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-red-500 border-b border-red-500/20 pb-2 uppercase tracking-widest text-left">
                🛠️ Tools & Operations
              </h4>
              <motion.div 
                variants={skillsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 gap-3"
              >
                {skillsData.tools.map((skill, idx) => {
                  const IconComp = skill.icon;
                  return (
                    <motion.div
                      variants={skillItemVariants}
                      whileHover={{ y: -3 }}
                      key={idx}
                      className="glass-panel glass-panel-hover border-white/5 p-3 rounded-xl flex items-center gap-2.5 shine-border cursor-default text-left"
                    >
                      <IconComp className={`text-xl shrink-0 ${skill.color}`} />
                      <span className="font-semibold text-xs text-white leading-tight">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Grouped Skills Columns - Row 2 */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* CS Fundamentals Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-red-500 border-b border-red-500/20 pb-2 uppercase tracking-widest text-left">
                📚 CS Fundamentals
              </h4>
              <motion.div 
                variants={skillsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {skillsData.cs.map((skill, idx) => {
                  const IconComp = skill.icon;
                  return (
                    <motion.div
                      variants={skillItemVariants}
                      whileHover={{ y: -3 }}
                      key={idx}
                      className="glass-panel glass-panel-hover border-white/5 p-3 rounded-xl flex flex-col items-center justify-center gap-2 shine-border cursor-default text-center"
                    >
                      <IconComp className={`text-2xl ${skill.color}`} />
                      <span className="font-semibold text-[10px] text-white leading-tight">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* AI & Modern Integration Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-red-500 border-b border-red-500/20 pb-2 uppercase tracking-widest text-left">
                🤖 AI & Modern Integration
              </h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">4 Specializations</p>
              <motion.div 
                variants={skillsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 gap-3"
              >
                {skillsData.ai.map((skill, idx) => {
                  const IconComp = skill.icon;
                  return (
                    <motion.div
                      variants={skillItemVariants}
                      whileHover={{ y: -3, scale: 1.02 }}
                      key={idx}
                      className="relative glass-panel glass-panel-hover border-violet-500/10 hover:border-violet-500/30 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shine-border cursor-default text-center overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 to-transparent rounded-xl pointer-events-none"></div>
                      <IconComp className={`text-2xl relative z-10 ${skill.color}`} />
                      <span className="font-bold text-[11px] text-white relative z-10 leading-tight">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-24 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              My <span className="text-red-500">Projects</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto rounded"></div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              A curated archive of web applications I built. Click any card to see a detailed technical description.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center items-center flex-wrap gap-2.5 mb-12 max-w-md mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  activeTab === cat 
                    ? "bg-red-500 border-red-500 text-black shadow-md shadow-red-500/10" 
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filterable Grid */}
          <motion.div 
            layout 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex flex-col h-full rounded-2xl overflow-hidden glass-panel border-white/5 hover:border-red-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/10 cursor-pointer"
                >
                  {/* Image Holder */}
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-950 border-b border-white/5">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {/* Hover Link Overlay */}
                    <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <span className="text-[10px] font-bold text-red-500 tracking-wider">CLICK TO VIEW DETAILS</span>
                      <div className="flex gap-4 mt-2" onClick={(e) => e.stopPropagation()}>
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/10 hover:bg-white/20 hover:text-red-500 border border-white/20 p-2.5 rounded-full text-lg text-white transition duration-200"
                          title="View Github Repo"
                        >
                          <FaGithub />
                        </a>
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-red-500 hover:bg-red-400 text-black p-2.5 rounded-full text-lg transition duration-200"
                          title="View Live Site"
                        >
                          <FaRocket />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-grow text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 mb-1.5 inline-block">
                      {project.category}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-red-400 transition duration-200">
                      {project.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span 
                          key={tagIdx} 
                          className="text-[9px] font-semibold text-gray-400 px-2 py-0.5 rounded-md bg-white/5 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[9px] font-semibold text-red-500 px-2 py-0.5 rounded-md bg-red-950/20 border border-red-500/20">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl overflow-y-auto max-h-[90vh] rounded-3xl glass-panel border-white/10 bg-zinc-950 p-6 md:p-8 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-red-500 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition"
              >
                ✕
              </button>
              
              {/* Project Image */}
              <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden border border-white/5 bg-black mt-2">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Content details */}
              <div className="text-left space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 mb-1 inline-block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="h-px bg-white/5"></div>
                
                <div className="space-y-3">
                  <h5 className="text-xs uppercase tracking-widest font-bold text-gray-400">Technical Overview</h5>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {selectedProject.detailedDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs uppercase tracking-widest font-bold text-gray-400">Stack & Architecture</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-gray-300 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/5 pt-2"></div>
                
                {/* Modal Links */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                  >
                    <FaGithub /> GitHub Repository
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-red-500 hover:bg-red-400 text-black font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                  >
                    <FaRocket /> Launch Live Project
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Get In <span className="text-red-500">Touch</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto rounded"></div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Have an opening, an interesting project to share, or just want to say hi? Write a note!
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
            {/* Quick Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 flex flex-col justify-between glass-panel border-white/5 p-6 md:p-8 rounded-2xl text-left bg-gradient-to-br from-black via-zinc-950 to-black"
            >
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-2">Contact Information</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Feel free to send a message directly using the email client or the secure contact form. I will respond to you within 24 hours.
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    { title: "Direct Mail", value: "os6100050@gmail.com", href: "mailto:os6100050@gmail.com", icon: FaEnvelope },
                    { title: "LinkedIn Network", value: "Omar Abdelmonim", href: "https://www.linkedin.com/in/omar-abdelmoniam-30313b349", icon: FaLinkedin },
                    { title: "GitHub Hub", value: "github.com/Omar-Saleh1", href: "https://github.com/Omar-Saleh1", icon: FaGithub }
                  ].map((info, idx) => (
                    <a 
                      href={info.href} 
                      target="_blank"
                      rel="noopener noreferrer" 
                      key={idx} 
                      className="flex items-center gap-4 group p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition"
                    >
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 text-red-500 group-hover:text-white transition">
                        <info.icon className="text-md" />
                      </div>
                      <div>
                        <h6 className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{info.title}</h6>
                        <p className="text-sm font-semibold text-white group-hover:text-red-500 transition-colors">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-5 mt-6 text-gray-500 text-xs flex items-center justify-between">
                <span>Location: Cairo, Egypt</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Glow Zone
                </span>
              </div>
            </motion.div>

            {/* Email Form Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-7 glass-panel border-white/5 p-6 md:p-8 rounded-2xl text-left"
            >
              <form onSubmit={sendEmail} className="space-y-6">
                {/* Floating Inputs Wrapper */}
                <div className="space-y-4">
                  <div className="relative z-0 w-full group">
                    <input 
                      type="text" 
                      name="name" 
                      id="floating_name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer transition duration-200" 
                      placeholder=" " 
                      required 
                    />
                    <label 
                      htmlFor="floating_name" 
                      className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Your Name
                    </label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <input 
                      type="email" 
                      name="email" 
                      id="floating_email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer transition duration-200" 
                      placeholder=" " 
                      required 
                    />
                    <label 
                      htmlFor="floating_email" 
                      className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email Address
                    </label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <textarea 
                      name="message" 
                      id="floating_message" 
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="block py-3 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer transition duration-200 resize-none" 
                      placeholder=" " 
                      required 
                    />
                    <label 
                      htmlFor="floating_message" 
                      className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Write your message here...
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "sending"}
                  className="w-full bg-red-500 hover:bg-red-400 text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-red-500/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <div className="h-4 w-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Notifications feedback */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 text-center text-xs font-semibold rounded-lg bg-red-950/20 border border-red-800/30 text-red-400"
                    >
                      Message Sent Successfully! ✅ (Thank you)
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 text-center text-xs font-semibold rounded-lg bg-red-950/20 border border-red-800/30 text-red-400"
                    >
                      Failed to send message ❌ (Please try direct mail)
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-center py-8 border-t border-white/5 text-gray-500 text-xs">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Omar Abdelmonim. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="https://github.com/Omar-Saleh1" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/omar-abdelmoniam-30313b349" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
