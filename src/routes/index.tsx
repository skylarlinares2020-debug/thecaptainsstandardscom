import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone, Mail, Instagram, Facebook, CheckCircle, Anchor, Shield, MapPin, Star } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: CaptainsStandard,
})

function CaptainsStandard() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    boatLength: '',
    boatType: '',
    marina: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'quote-request', ...formData }).toString(),
      })
      setSubmitted(true)
    } catch {
      // still show success to user
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="cs-root">
      {/* NAV */}
      <nav className="cs-nav">
        <div className="cs-container cs-nav-inner">
          <img src="/captains-logo.jpeg" alt="Captain's Standard Logo" className="cs-nav-logo" />
          <div className="cs-nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#contact" className="cs-btn-primary cs-nav-cta">Request a Quote</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-overlay" />
        <div className="cs-container cs-hero-content">
          <div className="cs-hero-badge">
            <Anchor size={14} />
            <span>East Tennessee's Premier Mobile Boat Care</span>
          </div>
          <h1 className="cs-hero-headline">Maintained to a<br />Captain's Standard</h1>
          <p className="cs-hero-sub">Mobile Boat Care &amp; Detailing Serving East Tennessee</p>
          <a href="#contact" className="cs-btn-primary cs-btn-lg">Request a Quote</a>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="cs-why">
        <div className="cs-container cs-why-grid">
          {[
            { icon: <MapPin size={22} />, title: 'Mobile Service', desc: 'We come to your dock, marina, or storage — no trailering required.' },
            { icon: <Shield size={22} />, title: 'Professional Equipment', desc: 'Commercial-grade tools and marine-safe products every time.' },
            { icon: <Star size={22} />, title: 'Attention to Detail', desc: 'Every inch treated with the same care a captain demands.' },
            { icon: <Anchor size={22} />, title: 'Locally Owned', desc: 'Proudly serving the East Tennessee boating community.' },
          ].map((item) => (
            <div key={item.title} className="cs-why-card">
              <div className="cs-why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="cs-services" id="services">
        <div className="cs-container">
          <div className="cs-section-header">
            <h2 className="cs-section-title">Services &amp; Starting Prices</h2>
            <p className="cs-section-sub">Professional care tailored to your vessel</p>
          </div>
          <div className="cs-services-grid">

            {/* Washdown */}
            <div className="cs-service-card">
              <div className="cs-service-top">
                <h3>Washdown Service</h3>
                <div className="cs-service-price">Starting at $150</div>
              </div>
              <ul className="cs-service-list">
                {['Full exterior rinse and wash', 'Foam treatment', 'Non-skid deck cleaning', 'Window and glass cleaning', 'Hand drying'].map(item => (
                  <li key={item}><CheckCircle size={16} /><span>{item}</span></li>
                ))}
              </ul>
            </div>

            {/* Interior & Exterior */}
            <div className="cs-service-card cs-service-featured">
              <div className="cs-service-badge">Most Popular</div>
              <div className="cs-service-top">
                <h3>Interior &amp; Exterior Detail</h3>
                <div className="cs-service-price">Starting at $350</div>
              </div>
              <ul className="cs-service-list">
                {[
                  'Everything in the Washdown Service',
                  'Interior vacuuming',
                  'Vinyl cleaning',
                  'Storage compartment wipe-down',
                  'Helm and dashboard detailing',
                  'Stainless steel treatment',
                  'Glass and mirror detailing',
                ].map(item => (
                  <li key={item}><CheckCircle size={16} /><span>{item}</span></li>
                ))}
              </ul>
            </div>

            {/* Vinyl Restoration */}
            <div className="cs-service-card">
              <div className="cs-service-top">
                <h3>Vinyl Restoration Add-On</h3>
                <div className="cs-service-price">Starting at $100</div>
              </div>
              <ul className="cs-service-list">
                {['Mold treatment', 'Mildew treatment', 'Deep vinyl cleaning', 'UV protection'].map(item => (
                  <li key={item}><CheckCircle size={16} /><span>{item}</span></li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="cs-about" id="about">
        <div className="cs-container cs-about-inner">
          <div className="cs-about-image-wrap">
            <img src="/skylar-oakley.jpeg" alt="Skylar and Oakley" className="cs-about-img" />
          </div>
          <div className="cs-about-content">
            <img src="/captains-logo.jpeg" alt="Captain's Standard" className="cs-about-logo" />
            <h2 className="cs-section-title">Meet the Captain<br />&amp; First Mate</h2>
            <p>Captain's Standard is proudly operated by Skylar and her First Mate, Oakley. Together, they bring a passion for pristine vessels and a commitment to excellence to every job on the water.</p>
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section className="cs-before-after">
        <div className="cs-container">
          <div className="cs-section-header">
            <h2 className="cs-section-title">Before &amp; After</h2>
            <p className="cs-section-sub">Photos coming soon — we're out on the water right now.</p>
          </div>
          <div className="cs-ba-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="cs-ba-card">
                <div className="cs-ba-half cs-ba-before">
                  <span>Before</span>
                </div>
                <div className="cs-ba-divider"><Anchor size={18} /></div>
                <div className="cs-ba-half cs-ba-after">
                  <span>After</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="cs-contact" id="contact">
        <div className="cs-container cs-contact-inner">
          <div className="cs-contact-info">
            <h2 className="cs-section-title">Get in Touch</h2>
            <p>Ready for a cleaner boat? Fill out the form and we'll get back to you with a custom quote.</p>
            <div className="cs-contact-details">
              <a href="tel:7573896003" className="cs-contact-link">
                <Phone size={18} /><span>(757) 389-6003</span>
              </a>
              <a href="mailto:info.captainsstandard@gmail.com" className="cs-contact-link">
                <Mail size={18} /><span>info.captainsstandard@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/thecaptainsstandard" target="_blank" rel="noopener noreferrer" className="cs-contact-link">
                <Instagram size={18} /><span>@thecaptainsstandard</span>
              </a>
              <a href="https://www.facebook.com/share/1ScXsjYHHQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="cs-contact-link">
                <Facebook size={18} /><span>Captain's Standard on Facebook</span>
              </a>
            </div>
          </div>

          <div className="cs-form-wrap">
            {submitted ? (
              <div className="cs-form-success">
                <CheckCircle size={48} />
                <h3>Request Received!</h3>
                <p>Thanks! We'll be in touch soon with your custom quote.</p>
              </div>
            ) : (
              <form
                name="quote-request"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="cs-form"
              >
                <input type="hidden" name="form-name" value="quote-request" />
                <p style={{ display: 'none' }}>
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>

                <div className="cs-form-row">
                  <div className="cs-field">
                    <label htmlFor="name">Name *</label>
                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" />
                  </div>
                  <div className="cs-field">
                    <label htmlFor="phone">Phone *</label>
                    <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(xxx) xxx-xxxx" />
                  </div>
                </div>

                <div className="cs-field">
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                </div>

                <div className="cs-form-row">
                  <div className="cs-field">
                    <label htmlFor="boatLength">Boat Length</label>
                    <input id="boatLength" name="boatLength" type="text" value={formData.boatLength} onChange={handleChange} placeholder='e.g. 22"' />
                  </div>
                  <div className="cs-field">
                    <label htmlFor="boatType">Boat Type</label>
                    <input id="boatType" name="boatType" type="text" value={formData.boatType} onChange={handleChange} placeholder="e.g. Pontoon, Ski Boat" />
                  </div>
                </div>

                <div className="cs-field">
                  <label htmlFor="marina">Marina / Location</label>
                  <input id="marina" name="marina" type="text" value={formData.marina} onChange={handleChange} placeholder="Marina or storage location" />
                </div>

                <div className="cs-field">
                  <label htmlFor="service">Requested Service</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange}>
                    <option value="">Select a service...</option>
                    <option value="Washdown Service">Washdown Service — from $150</option>
                    <option value="Interior & Exterior Detail">Interior &amp; Exterior Detail — from $350</option>
                    <option value="Vinyl Restoration Add-On">Vinyl Restoration Add-On — from $100</option>
                    <option value="Multiple / Not Sure">Multiple Services / Not Sure</option>
                  </select>
                </div>

                <div className="cs-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Any additional details about your boat or specific needs..." />
                </div>

                <button type="submit" className="cs-btn-primary cs-btn-full" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Request Quote'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cs-footer">
        <div className="cs-container cs-footer-inner">
          <div className="cs-footer-brand">
            <img src="/captains-logo.jpeg" alt="Captain's Standard" className="cs-footer-logo" />
            <div>
              <div className="cs-footer-name">Captain's Standard LLC</div>
              <div className="cs-footer-domain">TheCaptainsStandard.com</div>
            </div>
          </div>
          <div className="cs-footer-links">
            <a href="tel:7573896003"><Phone size={16} /><span>(757) 389-6003</span></a>
            <a href="mailto:info.captainsstandard@gmail.com"><Mail size={16} /><span>info.captainsstandard@gmail.com</span></a>
          </div>
          <div className="cs-footer-social">
            <a href="https://www.instagram.com/thecaptainsstandard" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/share/1ScXsjYHHQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>
        <div className="cs-footer-copy">
          © {new Date().getFullYear()} Captain's Standard LLC · All rights reserved
        </div>
      </footer>
    </div>
  )
}
