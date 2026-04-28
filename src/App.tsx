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
    image: '/project-aether.png',
    title: 'Aether E-Commerce',
    description:
      'Editorial-style online store featuring smooth transitions, art management, and a seamless checkout experience.',
    tags: ['Next.js', 'Stripe API'],
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
    setResponse('Մտածում եմ...');
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: `Context:${JSON.stringify(cvData)}. User question:${userInput}.Answer
       based on the context.` }] }] };

    try {
      const res = await axios.post(url, payload);
      const geminiText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(geminiText || "Պատասխան չստացվեց:");
    }
    catch (error: any) {
      setResponse("Սխալ տեղի ունեցավ: Խնդրում ենք ստուգել կապը կամ API բանալին:");
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
          parts: [{ text: "Բարև! Սա վերջնական ստուգումն է:" }]
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

      console.log("Gemini-ի պատասխանը:", text);
    } catch (error: any) {
      console.error("Սխալ:", error?.response?.data || error.message);
    }
  };

      useEffect(()=>{testGemini();},[]);


  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">The Frontend</div>
        <nav className="menu">
          <a className="menu-link is-active" href="#work">
            Work
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
              I&apos;m a creative developer focused on crafting clean, accessible, and high-performance web
              applications. Currently exploring the intersection of design and code at The Digital Atelier.
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
            <img className="hero-image" src="/profile-portrait.png" alt="Portrait of Parandzem Tadevosyan" />
          </aside>
        </section>
        <div className="chat-container">
          <h2 className="chat-title">Gemini AI Օգնական</h2>
          <div className="input-section">
            <textarea className="chat-textarea" rows={4}
              placeholder="Ինչպե՞ս կարող եմ օգնել ձեզ..." value={userInput}
              onChange={(e) => setUserInput(e.target.value)} />
            <button className="send-button"
              onClick={handleSend} disabled={loading || !userInput.trim()} > {loading ? 'Ուղարկվում է...' : 'Ուղարկել հարցը'} </button> </div>
          {response && (<div className="response-section">
            <span className="response-label">Պատասխան՝</span>
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
                  hello@digitalatelier.dev
                </p>
                <p>
                  <span className="contact-icon">◉</span>
                  Remote / San Francisco, CA
                </p>
              </div>

              <div className="contact-social">
                <a href="#contact" aria-label="Website link">
                  ↔
                </a>
                <a href="#contact" aria-label="Code link">
                  {'<>'}
                </a>
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
        <div className="footer-brand">The Digital Atelier</div>

        <nav className="footer-links" aria-label="Social links">
          <a href="#contact">GitHub</a>
          <a href="#contact">LinkedIn</a>
          <a href="#contact">Twitter</a>
          <a href="#contact">Email</a>
        </nav>

        <p className="footer-copy">© 2024 THE DIGITAL ATELIER. CRAFTED WITH INTENTION.</p>
      </footer>
    </div>
)};


export default App
