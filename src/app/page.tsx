import emailjs from "emailjs-com";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    emailjs
      .send(
        "YOUR_SERVICE_ID",   // من EmailJS
        "YOUR_TEMPLATE_ID",  // من EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY"    // من EmailJS
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("✅ رسالتك اتبعتت بنجاح!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log(error.text);
          setStatus("في مشكلة حاول تاني.");
        }
      );
  };

  return (
    <form onSubmit={sendEmail} className="w-full max-w-md space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-500"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-500"
      />
      <button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-lg"
      >
        Send Message
      </button>
      {status && <p className="text-center text-sm mt-2">{status}</p>}
    </form>
  );
}
