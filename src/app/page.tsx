"use client";
import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";

const projects = [
  {
    title: "E-commerce App",
    description:
      "An online store with product browsing, shopping cart, secure checkout, and user authentication.",
    image: "/Ecommerce.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://web-ecommerce-ruby.vercel.app/",
  },
  {
    title: "Social App",
    description:
      "Linkpost is a social web app built with Vite & React that lets users create profiles, share links, and connect with others easily.",
    image: "/SocialApp.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://linkpost-iota.vercel.app/",
  },
  {
    title: "Weather App",
    description:
      "Weather App — A simple web application that provides real-time weather updates by city.",
    image: "/weather.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://omar-saleh1.github.io/Weather/",
  },
  {
    title: "Bookmarker App",
    description:
      "Bookmarker — A simple web app for bookmarking your favorite websites.",
    image: "/BookMark.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://omar-saleh1.github.io/bookmark/",
  },
  {
    title: "Smart Login System App",
    description:
      "Smart Login System — A secure web app that enables users to sign up, log in, and manage their accounts.",
    image: "/SmartSystem.jpg.jpg",
    github: "https://github.com/Omar-Saleh1",
    demo: "https://omar-saleh1.github.io/Smart-System/",
  },
];

// ========== Component ==========
export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(false);

  // contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        "YOUR_SERVICE_ID", // ضع الـ Service ID من EmailJS
        "YOUR_TEMPLATE_ID", // ضع الـ Template ID من EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY" // ضع الـ Public Key من EmailJS
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <div className="bg-gray-950 text-white scroll-smooth">
      <title>Omar Abdelmonim Amin</title>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-70 backdrop-blur-md p-4 shadow-lg"
      >
        <div className="flex justify-around items-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-wide">
            portf<span className="text-cyan-400 text-3xl">olio</span>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-xl items-center justify-center">
            <li><a href="#home" className="hover:text-cyan-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
            <li><a href="#skills" className="hover:text-cyan-400 transition">Skills</a></li>
            <li><a href="#projects" className="hover:text-cyan-400 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-cyan-400 transition">Contact</a></li>
            <a
              href="#contact"
              className="border border-cyan-500 px-6 py-2 rounded-full font-semibold hover:bg-cyan-500 hover:text-black transition"
            >
              Hire Me
            </a>
          </ul>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 text-center">
            <a href="#home" className="hover:text-cyan-400 transition">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
            <div className="flex justify-center gap-6 text-xl">
              <FaGithub className="hover:text-cyan-400" />
              <FaLinkedin className="hover:text-cyan-400" />
              <FaEnvelope className="hover:text-cyan-400" />
            </div>
            <a
              href="#contact"
              className="border border-cyan-500 px-6 py-2 rounded-full font-semibold hover:bg-cyan-500 hover:text-black transition"
            >
              Hire Me
            </a>
          </div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen py-20 flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-12 px-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h2 className="text-5xl font-extrabold">
            Hi I am <span className="text-cyan-400">Omar</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-xl">
            A passionate <span className="text-cyan-400">Front-End Developer</span> crafting creative and scalable web apps.
          </p>
          <div className="flex gap-4 justify-center md:justify-start flex-wrap">
            <a href="#projects" className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-full font-semibold">View Projects</a>
            <a
              href="/Omar_AbdelMoneim_Amin_Front-End_Developer_CV.pdf"
              download
              className="bg-gray-800 border border-cyan-500 px-4 py-2 rounded-full font-semibold hover:bg-cyan-500 hover:text-black transition"
            >
              Download CV
            </a>
          </div>
          <div className="flex gap-4 text-lg">
            <a href="https://github.com/Omar-Saleh1" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/omar-abdelmoniam-30313b349" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition"><FaLinkedin /></a>
            <a href="mailto:os6100050@gmail.com" className="hover:text-cyan-400 transition"><FaEnvelope /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.9 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center py-10"
        >
          <img src="/omar.jpg.png" alt="Omar Photo" className="w-72 md:w-80 md:h-[36rem] object-cover rounded-2xl shadow-xl border-cyan-500 hover:scale-105 hover:shadow-cyan-500/50 transition duration-500" />
        </motion.div>
      </section>

      {/* About Section */}
      {/* About Section */}
<section
  id="about"
  className="min-h-screen flex items-center px-8 py-20 bg-gray-950"
>
  <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center"
    >
      <img
        src="/omar.jpg.png"
        alt="My Photo"
        className="w-72 md:w-80 md:h-[36rem] object-cover rounded-2xl shadow-xl border-cyan-500 hover:scale-105 hover:shadow-cyan-500/50 transition duration-500"
      />
    </motion.div>

    <motion.div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-gray-300 space-y-6 md:text-left text-center"
    >
      <h3 className="text-4xl font-extrabold text-white relative inline-block pb-2">
        About Me
        <span className="absolute left-0 bottom-0 w-16 h-1 bg-cyan-400 rounded"></span>
      </h3>
      <p className="leading-relaxed text-lg">
        I am a{" "}
        <span className="text-cyan-400 font-semibold">Front-End Developer</span>{" "}
        who loves building{" "}
        <span className="text-cyan-400">creative</span> and{" "}
        <span className="text-cyan-400">fast</span> web interfaces.
      </p>
      <p className="leading-relaxed text-lg">
        Outside of coding, I enjoy discovering new tools and turning ideas
        into interactive experiences.
      </p>

      {/* Buttons Section */}
      <div className="flex gap-4 justify-center md:justify-start">
        {/* Hire Me Button */}
        <a
          href="#contact"
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          Hire Me
        </a>

        {/* Download CV Button */}
        <a
          href="/Omar_Abdel Moneim Amin Mahdi_Front-End Developer _resume.pdf"
          download
          className="border border-cyan-500 px-6 py-3 rounded-full font-semibold hover:bg-cyan-500 hover:text-black transition duration-300"
        >
          Download CV
        </a>
      </div>
    </motion.div>
  </div>
</section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gray-900"
      >
        <h3 className="text-3xl font-bold mb-12 border-b-4 border-cyan-400 inline-block">Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Next.js", "Tailwind CSS", "Redux", "Problem Solving"].map((skill) => (
            <div key={skill} className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
              <p className="font-semibold text-cyan-400">{skill}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20"
      >
        <h3 className="text-3xl font-bold mb-12 border-b-4 border-cyan-400 inline-block">Projects</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
              <img src={project.image} alt={project.title} className="h-50 w-full object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">GitHub</a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Live Demo</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gray-900"
      >
        <h3 className="text-3xl font-bold mb-8 border-b-4 border-cyan-400 inline-block">Contact</h3>
        <form onSubmit={sendEmail} className="w-full max-w-md space-y-4">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-500"/>
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-500"/>
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-500"/>
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-lg">Send Message</button>
          {status && (
            <p className={`text-center text-sm mt-2 ${status === "success" ? "text-green-400" : "text-red-400"}`}>
              {status === "success" ? "Message sent successfully! ✅" : "Failed to send message ❌"}
            </p>
          )}
        </form>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        © {new Date().getFullYear()} Omar.dev — All Rights Reserved.
      </footer>
    </div>
  );
}
