import './App.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { cvData } from './cvData';
import ReactMarkdown from "react-markdown"



const stackItems = [
  {
    icon: 'HTML',
    iconClass: 'stack-icon html',
    title: 'HTML5',
    description: 'Semantic structures and SEO-best practices for a robust web foundation.',
  },
  {
    icon: 'CSS',
    iconClass: 'stack-icon css',
    title: 'CSS3 & Tailwind',
    description: 'Advanced layouts, responsive design, and pixel-perfect modern styling.',
  },
  {
    icon: 'JS',
    iconClass: 'stack-icon js',
    title: 'JavaScript',
    description: 'ES6+ DOM manipulation, and building interactive client-side logic.',
  },
  {
    icon: '◲',
    iconClass: 'stack-icon git',
    title: 'Git & GitHub',
    description: 'Version control, branching workflows, and collaborative development.',
  },
]

const workItems = [
  {
    image: '/project-saas.png',
    title: 'Nova SaaS Interface',
    description:
      'A high-performance dashboard built with a focus on user experience and real-time data visualization using Tailwind CSS.',
    tags: ['React', 'Tailwind'],
  },
  {
    image: '/portfolio.png',
    title: 'Personal Portfolio Website',
    description:
      'A modern and responsive portfolio website built with Vite, React, and Tailwind CSS, showcasing my projects and skills.',
    tags: ['Vite', 'React', 'Tailwind', 'JavaScript'],
  },
]

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (!userInput.trim())
      return;
    setLoading(true);
    setResponse('Thinking...');
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: `Context:${JSON.stringify(cvData)}. User question:${userInput}.Answer
       based on the context.` }] }] };

    try {
      const res = await axios.post(url, payload);
      const geminiText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(geminiText || "no answer:");
    }
    catch (error: any) {
      setResponse("An error occurred. Please check the connection or the API key:");
      console.error(error);
    }
    finally { setLoading(false); }
  };






  const testGemini = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `${import.meta.env.VITE_GEMINI_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

    console.log("API KEY:", apiKey);
    console.log("URL:", url);

    const payload = {
      contents: [
        {
          parts: [{ text: "Hello! This is the final check:" }]
        }
      ]
    };

    try {
      const response = await axios.post(url, payload, {
        params: { key: apiKey },
        headers: { "Content-Type": "application/json" }
      });

      const text =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      console.log("Gemini's answer:", text);
    } catch (error: any) {
      console.error("Error:", error?.response?.data || error.message);
    }
  };

      useEffect(()=>{testGemini();},[]);


  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">Parandzem T.</div>
        <nav className="menu">
          <a className="menu-link is-active" href="#work">
            Projects
          </a>
          <a className="menu-link" href="#stack">
            Tech Stack
          </a>
          <a className="menu-link" href="#about">
            About
          </a>
          <a className="menu-link" href="#contact">
            Contact
          </a>
        </nav>
        <a className="resume-btn" href="#">
          Resume
        </a>
      </header>

      <main>
        <section className="hero-wrap" id="work">
          <div className="hero-content">
            <p className="role-badge">JUNIOR FRONTEND DEVELOPER</p>
            <h1 className="hero-title">
              Parandzem
              <br />
              Tadevosyan
            </h1>
            <p className="hero-text">
              Hello! I&apos;m a  Frontend Developer focused on building clean, accessible, and modern web
              experiences. I love creating beautiful and functional websites and web applications.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#work">
                View My Work
              </a>
              <a className="text-btn" href="#contact">
                Let&apos;s Talk
              </a>
            </div>
          </div>

          <aside className="hero-image-wrap">
            <img className="hero-image" src="/mine.png" alt="Portrait of Parandzem Tadevosyan" />
          </aside>
        </section>
        <div className="chat-container">
          <h2 className="chat-title">Gemini AI Assistant</h2>
          <div className="input-section">
            <textarea className="chat-textarea" rows={4}
              placeholder="How can I help you?..." value={userInput}
              onChange={(e) => setUserInput(e.target.value)} />
            <button className="send-button"
              onClick={handleSend} disabled={loading || !userInput.trim()} > {loading ? 'Sending...' : 'Send answer'} </button> </div>
          {response && (<div className="response-section">
            <span className="response-label">Answer՝</span>
            <div className="response-text"><ReactMarkdown>{response}</ReactMarkdown>
            </div>
            </div>)}
        </div>

        <section className="stack-section" id="stack">
          <p className="stack-label">CAPABILITIES</p>
          <h2 className="stack-title">The Modern Tech Stack</h2>

          <div className="stack-grid">
            {stackItems.map((item) => (
              <article className="stack-card" key={item.title}>
                <span className={item.iconClass}>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="works-section" id="about">
          <div className="works-head">
            <div>
              <p className="works-label">PORTFOLIO</p>
              <h2 className="works-title">Selected Works</h2>
              <p className="works-subtitle">
                A curated collection of projects that demonstrate my ability to solve problems through elegant
                code.
              </p>
            </div>

            <div className="works-nav">
              <button type="button" aria-label="Previous project">
                {'<'}
              </button>
              <button type="button" aria-label="Next project">
                {'>'}
              </button>
            </div>
          </div>

          <div className="works-grid">
            {workItems.map((item) => (
              <article className="work-card" key={item.title}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="work-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href="#work">View on GitHub</a>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-card">
            <div className="contact-info">
              <p className="contact-label">GET IN TOUCH</p>
              <h2>Let&apos;s create something extraordinary together</h2>
              <p className="contact-copy">
                I&apos;m currently looking for new opportunities and collaborations. Whether you have a project
                in mind or just want to say hi, my inbox is always open.
              </p>

              <div className="contact-meta">
                <p>
                  <span className="contact-icon">✉</span>
                  tadevosyan.parandzem@mail.ru
                </p>
                <p>
                  <span className="contact-icon">◉</span>
                  Remote / Yerevan, Armenia
                </p>
              </div>

              
            </div>

            <form className="contact-form">
              <label htmlFor="fullName">FULL NAME</label>
              <input id="fullName" name="fullName" placeholder="Your Name" />

              <label htmlFor="emailAddress">EMAIL ADDRESS</label>
              <input id="emailAddress" name="emailAddress" placeholder="name@example.com" type="email" />

              <label htmlFor="message">MESSAGE</label>
              <textarea id="message" name="message" placeholder="Tell me about your project..." rows={5} />

              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">Parandzem T.</div>

        <nav className="footer-links" aria-label="Social links">
          <a href="#contact">GitHub</a>
          <a href="#contact">LinkedIn</a>
          <a href="#contact">Email</a>
        </nav>

        <p className="footer-copy">© 2026  Designed & Coded by Parandzem T.|</p>
      </footer>
    </div>
)};


export default App
