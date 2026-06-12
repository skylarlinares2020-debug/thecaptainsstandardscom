import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Phone, Mail, Instagram, Facebook, CheckCircle, Anchor, Menu, X,
  MapPin, ShieldCheck, Sparkles, CalendarCheck, LifeBuoy,
  Waves, Info, Clock,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: CaptainsStandard,
})

const PHONE_DISPLAY = '(757) 389-6003'
const PHONE_HREF = 'tel:7573896003'
const EMAIL = 'info.captainsstandard@gmail.com'

const SERVICES = [
  {
    title: 'Washdown Service',
    price: 'Starting at $150',
    desc: 'Perfect for regularly maintained boats needing a fresh clean.',
    items: [
      'Full exterior rinse and wash',
      'Foam treatment',
      'Non-skid deck cleaning',
      'Window and glass cleaning',
      'Hand drying',
    ],
    featured: false,
  },
  {
    title: 'Interior & Exterior Detail',
    price: 'Starting at $350',
    desc: 'A complete refresh for your vessel.',
    items: [
      'Everything in the Washdown Service',
      'Interior vacuuming',
      'Vinyl cleaning',
      'Storage compartment wipe-down',
      'Helm and dashboard detailing',
      'Stainless steel treatment',
      'Glass and mirror detailing',
    ],
    featured: true,
    badge: 'Most Popular',
  },
  {
    title: 'Vinyl Restoration Add-On',
    price: 'Starting at $100',
    desc: 'For tired, stained, or weathered seating surfaces.',
    items: ['Mold treatment', 'Mildew treatment', 'Deep vinyl cleaning', 'UV protection'],
    featured: false,
  },
]

const WHY = [
  { icon: <MapPin size={24} />, title: 'Mobile Service', desc: 'We come to your marina, dock, or storage facility. No trailering required.' },
  { icon: <ShieldCheck size={24} />, title: 'Professional Equipment', desc: 'Commercial-grade tools, marine-safe products, and techniques built for the water.' },
  { icon: <Sparkles size={24} />, title: 'Attention to Detail', desc: 'Every inch of your vessel receives the same careful attention, stem to stern.' },
  { icon: <CalendarCheck size={24} />, title: 'Reliable Scheduling', desc: 'We show up when we say we will. Consistent, dependable service you can plan around.' },
  { icon: <LifeBuoy size={24} />, title: 'Boat Care Focused', desc: 'Every service is designed specifically for boats, not adapted from car detailing.' },
]

const AREAS = ['Knoxville', 'Fort Loudoun Lake', 'Tellico Lake', 'Norris Lake', 'Lenoir City', 'Loudon']

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

type ModalKind = 'quote' | 'schedule' | null

function CaptainsStandard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<ModalKind>(null)

  // ── Quote form ──
  const [quote, setQuote] = useState({
    'customer-name': '',
    email: '',
    phone: '',
    'boat-type': '',
    'boat-length': '',
    service: '',
    location: '',
    'contact-method': '',
    message: '',
  })
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [quoteSending, setQuoteSending] = useState(false)

  // ── Schedule form ──
  const [schedule, setSchedule] = useState({
    service: '',
    'requested-date': '',
    'requested-time': '',
    'customer-name': '',
    email: '',
    phone: '',
    'boat-type': '',
    'boat-length': '',
    'service-location': '',
    notes: '',
  })
  const [scheduleSubmitted, setScheduleSubmitted] = useState(false)
  const [scheduleSending, setScheduleSending] = useState(false)

  type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  const handleQuote = (e: React.ChangeEvent<Field>) =>
    setQuote((p) => ({ ...p, [e.target.name]: e.target.value }))
  const handleSchedule = (e: React.ChangeEvent<Field>) =>
    setSchedule((p) => ({ ...p, [e.target.name]: e.target.value }))

  async function postForm(formName: string, data: Record<string, string>) {
    await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': formName, ...data }).toString(),
    })
  }

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteSending(true)
    try {
      await postForm('quote-request', quote)
    } catch {
      /* still show confirmation */
    } finally {
      setQuoteSubmitted(true)
      setQuoteSending(false)
    }
  }

  const submitSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    setScheduleSending(true)
    try {
      await postForm('schedule-now', schedule)
    } catch {
      /* still show confirmation */
    } finally {
      setScheduleSubmitted(true)
      setScheduleSending(false)
    }
  }

  // ── Modal controls ──
  const openQuote = (service?: string) => {
    if (service) setQuote((p) => ({ ...p, service }))
    setQuoteSubmitted(false)
    setMenuOpen(false)
    setModal('quote')
  }
  const openSchedule = (service?: string) => {
    if (service) setSchedule((p) => ({ ...p, service }))
    setScheduleSubmitted(false)
    setMenuOpen(false)
    setModal('schedule')
  }
  const closeModal = () => setModal(null)

  // Lock body scroll + close on Escape while a modal is open
  useEffect(() => {
    if (!modal) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null) }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [modal])

  const goto = (id: string) => {
    setMenuOpen(false)
    scrollToId(id)
  }

  const NAV_LINKS = [
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Service Area', id: 'service-area' },
  ]

  return (
    <div className="cs-root">
      {/* ─── NAV ─── */}
      <nav className="cs-nav">
        <div className="cs-container cs-nav-inner">
          <a href="#top" className="cs-brand" onClick={() => setMenuOpen(false)}>
            <img src="/captains-logo.jpeg" alt="Captain's Standard LLC logo" className="cs-brand-logo" />
            <span className="cs-brand-name">Captain's <span>Standard</span></span>
          </a>

          <div className="cs-nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); goto(l.id) }}>{l.label}</a>
            ))}
          </div>

          <div className="cs-nav-actions">
            <a href={PHONE_HREF} className="cs-nav-phone">
              <Phone size={16} /><span>{PHONE_DISPLAY}</span>
            </a>
            <button
              className="cs-hamburger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div className={`cs-mobile-menu${menuOpen ? ' cs-open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); goto(l.id) }}>{l.label}</a>
          ))}
          <div className="cs-mobile-actions">
            <a href={PHONE_HREF} className="cs-btn cs-btn-outline">
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <header className="cs-hero" id="top">
        <div className="cs-container cs-hero-inner">
          <span className="cs-hero-badge">
            <Anchor size={14} /> East Tennessee's Premier Mobile Boat Care
          </span>
          <h1 className="cs-hero-headline">Maintained to a<br /><em>Captain's Standard</em></h1>
          <p className="cs-hero-sub">Mobile boat care and detailing serving East Tennessee.</p>
          <div className="cs-hero-actions">
            <button className="cs-btn cs-btn-gold cs-btn-lg" onClick={() => openQuote()}>Request a Quote</button>
            <button className="cs-btn cs-btn-outline cs-btn-lg" onClick={() => openSchedule()}>Schedule Now</button>
            <button className="cs-btn cs-btn-outline cs-btn-lg" onClick={() => goto('services')}>View Services</button>
          </div>
        </div>
      </header>

      {/* ─── SERVICES ─── */}
      <section className="cs-section cs-section-cream" id="services">
        <div className="cs-container">
          <div className="cs-section-head cs-center">
            <span className="cs-eyebrow cs-center">What We Offer</span>
            <h2 className="cs-heading">Services &amp; Starting Prices</h2>
            <p className="cs-intro">
              Professional mobile boat care focused on clean exteriors, refreshed interiors, and protected vinyl surfaces.
            </p>
          </div>

          <div className="cs-services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className={`cs-service-card${s.featured ? ' cs-service-featured' : ''}`}>
                {s.badge && <div className="cs-service-badge">{s.badge}</div>}
                <h3>{s.title}</h3>
                <div className="cs-service-price">{s.price}</div>
                <p className="cs-service-desc">{s.desc}</p>
                <ul className="cs-service-list">
                  {s.items.map((item) => (
                    <li key={item}><CheckCircle size={16} /><span>{item}</span></li>
                  ))}
                </ul>
                <div className="cs-service-actions">
                  <button className="cs-btn cs-btn-navy cs-btn-sm" onClick={() => openQuote(s.title)}>
                    Request Quote
                  </button>
                  <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => openSchedule(s.title)}>
                    Schedule Service
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="cs-pricing-note">
            Pricing varies based on vessel size, condition, accessibility, staining, mold or mildew severity, and travel
            distance. Contact Captain's Standard for a complimentary quote.
          </p>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="cs-section cs-section-white" id="about">
        <div className="cs-container cs-about-inner">
          <div className="cs-about-photo">
            <img src="/skylar-oakley.jpeg" alt="Skylar and Oakley, the Captain and First Mate of Captain's Standard" />
          </div>
          <div className="cs-about-body">
            <span className="cs-eyebrow">Our Story</span>
            <h2 className="cs-heading">Meet the Captain &amp; First Mate</h2>
            <p style={{ marginTop: 18 }}>
              Hi, we're Skylar and Oakley, the Captain and First Mate behind Captain's Standard. We built this company
              around a simple belief: every boat deserves the same care, attention, and pride we'd give our own. Whether
              we're performing a maintenance washdown or a full detail, we treat every vessel with professionalism,
              reliability, and an eye for detail.
            </p>
            <div className="cs-about-sign">
              <img src="/captains-logo.jpeg" alt="" aria-hidden="true" />
              <div>
                <strong>Skylar &amp; Oakley</strong><br />
                <span>Captain &amp; First Mate · Captain's Standard LLC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="cs-section cs-section-white">
        <div className="cs-container">
          <div className="cs-section-head">
            <span className="cs-eyebrow">The Difference</span>
            <h2 className="cs-heading">Why Choose Us</h2>
            <p className="cs-intro">
              We're not a car wash with a hose near the marina. We're boat care specialists who come to you.
            </p>
          </div>
          <div className="cs-why-grid">
            {WHY.map((w) => (
              <div key={w.title} className="cs-why-card">
                <div className="cs-why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEFORE & AFTER ─── */}
      <section className="cs-section cs-section-navy cs-on-navy" id="work">
        <div className="cs-container">
          <div className="cs-section-head cs-center">
            <span className="cs-eyebrow cs-center">Our Work</span>
            <h2 className="cs-heading">Before &amp; After</h2>
            <p className="cs-intro">
              Photos coming soon. We're out on the water right now.
            </p>
          </div>
          <div className="cs-ba-grid">
            {['Exterior Washdown', 'Full Interior Detail', 'Vinyl Restoration'].map((caption) => (
              <div key={caption} className="cs-ba-card">
                <div className="cs-ba-split">
                  <div className="cs-ba-half cs-ba-before"><Waves size={22} /><span>Before</span></div>
                  <div className="cs-ba-half cs-ba-after"><Sparkles size={22} /><span>After</span></div>
                </div>
                <div className="cs-ba-caption">{caption} — photos coming soon</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA ─── */}
      <section className="cs-section cs-section-cream" id="service-area">
        <div className="cs-container">
          <div className="cs-section-head cs-center">
            <span className="cs-eyebrow cs-center">Where We Work</span>
            <h2 className="cs-heading">Service Area</h2>
            <p className="cs-intro">
              Proudly serving boaters across East Tennessee's lakes and waterways. We come to you wherever your vessel
              calls home.
            </p>
          </div>
          <div className="cs-area-grid">
            {AREAS.map((area) => (
              <div key={area} className="cs-area-card"><MapPin size={20} />{area}</div>
            ))}
          </div>
          <p className="cs-area-note">
            Not on this list?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); openQuote() }}>Contact us.</a> We
            may still be able to serve you.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="cs-footer">
        <div className="cs-container">
          <div className="cs-footer-inner">
            <div className="cs-footer-brand">
              <img src="/captains-logo.jpeg" alt="Captain's Standard LLC logo" className="cs-footer-logo" />
              <div>
                <div className="cs-footer-name">Captain's Standard LLC</div>
                <div className="cs-footer-tag">Mobile boat care &amp; detailing · East Tennessee</div>
              </div>
            </div>

            <div className="cs-footer-col">
              <h4>Contact</h4>
              <a href={PHONE_HREF}><Phone size={16} />{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`}><Mail size={16} />{EMAIL}</a>
            </div>

            <div className="cs-footer-col">
              <h4>Explore</h4>
              <a href="#services" onClick={(e) => { e.preventDefault(); goto('services') }}>Services</a>
              <a href="#service-area" onClick={(e) => { e.preventDefault(); goto('service-area') }}>Service Area</a>
              <a href="#" onClick={(e) => { e.preventDefault(); openQuote() }}>Request a Quote</a>
              <a href="#" onClick={(e) => { e.preventDefault(); openSchedule() }}>Schedule Now</a>
            </div>

            <div className="cs-footer-col">
              <h4>Follow</h4>
              <div className="cs-footer-social">
                <a href="https://www.instagram.com/thecaptainsstandard" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/share/1ScXsjYHHQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="cs-footer-copy">
            © {new Date().getFullYear()} Captain's Standard LLC · All rights reserved
          </div>
        </div>
      </footer>

      {/* ─── QUOTE MODAL ─── */}
      {modal === 'quote' && (
        <div className="cs-modal-overlay" onClick={closeModal}>
          <div className="cs-modal" role="dialog" aria-modal="true" aria-label="Request a quote" onClick={(e) => e.stopPropagation()}>
            <button className="cs-modal-close" aria-label="Close" onClick={closeModal}><X size={22} /></button>

            {quoteSubmitted ? (
              <div className="cs-form-success">
                <CheckCircle size={52} className="cs-success-icon" />
                <h3>Quote Request Received</h3>
                <p>Thank you! Your quote request has been received. Captain's Standard will follow up shortly.</p>
                <button className="cs-btn cs-btn-navy" onClick={closeModal}>Close</button>
              </div>
            ) : (
              <>
                <div className="cs-modal-head">
                  <span className="cs-eyebrow">Request a Quote</span>
                  <h2 className="cs-modal-title">Get a Complimentary Quote</h2>
                  <p className="cs-modal-intro">
                    Tell us about your vessel and we'll follow up with a custom quote. No obligation, no payment required.
                  </p>
                </div>

                <form
                  name="quote-request"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={submitQuote}
                  className="cs-form"
                >
                  <input type="hidden" name="form-name" value="quote-request" />
                  <p style={{ display: 'none' }}>
                    <label>Don't fill this out: <input name="bot-field" /></label>
                  </p>

                  <div className="cs-form-row">
                    <div className="cs-field">
                      <label htmlFor="q-name">Customer Name <span className="req">*</span></label>
                      <input id="q-name" name="customer-name" type="text" required value={quote['customer-name']} onChange={handleQuote} placeholder="Your full name" />
                    </div>
                    <div className="cs-field">
                      <label htmlFor="q-phone">Phone</label>
                      <input id="q-phone" name="phone" type="tel" value={quote.phone} onChange={handleQuote} placeholder="(xxx) xxx-xxxx" />
                    </div>
                  </div>

                  <div className="cs-field">
                    <label htmlFor="q-email">Email <span className="req">*</span></label>
                    <input id="q-email" name="email" type="email" required value={quote.email} onChange={handleQuote} placeholder="you@example.com" />
                  </div>

                  <div className="cs-form-row">
                    <div className="cs-field">
                      <label htmlFor="q-boat-type">Boat Type</label>
                      <input id="q-boat-type" name="boat-type" type="text" value={quote['boat-type']} onChange={handleQuote} placeholder="e.g. Pontoon, Ski Boat" />
                    </div>
                    <div className="cs-field">
                      <label htmlFor="q-boat-length">Boat Length</label>
                      <input id="q-boat-length" name="boat-length" type="text" value={quote['boat-length']} onChange={handleQuote} placeholder="e.g. 22 ft" />
                    </div>
                  </div>

                  <div className="cs-field">
                    <label htmlFor="q-service">Service Requested <span className="req">*</span></label>
                    <select id="q-service" name="service" required value={quote.service} onChange={handleQuote}>
                      <option value="">Select a service…</option>
                      <option value="Washdown Service">Washdown Service — from $150</option>
                      <option value="Interior & Exterior Detail">Interior &amp; Exterior Detail — from $350</option>
                      <option value="Vinyl Restoration Add-On">Vinyl Restoration Add-On — from $100</option>
                      <option value="Not Sure / Need Recommendation">Not Sure / Need Recommendation</option>
                    </select>
                  </div>

                  <div className="cs-form-row">
                    <div className="cs-field">
                      <label htmlFor="q-location">Location / Marina</label>
                      <input id="q-location" name="location" type="text" value={quote.location} onChange={handleQuote} placeholder="Marina or storage location" />
                    </div>
                    <div className="cs-field">
                      <label htmlFor="q-contact-method">Preferred Contact Method</label>
                      <select id="q-contact-method" name="contact-method" value={quote['contact-method']} onChange={handleQuote}>
                        <option value="">No preference</option>
                        <option value="Phone">Phone</option>
                        <option value="Email">Email</option>
                        <option value="Text">Text</option>
                      </select>
                    </div>
                  </div>

                  <div className="cs-field">
                    <label htmlFor="q-message">Message</label>
                    <textarea id="q-message" name="message" rows={4} value={quote.message} onChange={handleQuote} placeholder="Any additional details about your boat or specific needs…" />
                  </div>

                  <button type="submit" className="cs-btn cs-btn-gold cs-btn-full" disabled={quoteSending}>
                    {quoteSending ? 'Sending…' : 'Request a Quote'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ─── SCHEDULE MODAL ─── */}
      {modal === 'schedule' && (
        <div className="cs-modal-overlay" onClick={closeModal}>
          <div className="cs-modal" role="dialog" aria-modal="true" aria-label="Request an appointment" onClick={(e) => e.stopPropagation()}>
            <button className="cs-modal-close" aria-label="Close" onClick={closeModal}><X size={22} /></button>

            {scheduleSubmitted ? (
              <div className="cs-form-success">
                <CalendarCheck size={52} className="cs-success-icon" />
                <h3>Appointment Request Received</h3>
                <p>Thank you! Your appointment request has been received. Captain's Standard will reach out to confirm your booking shortly.</p>
                <button className="cs-btn cs-btn-navy" onClick={closeModal}>Close</button>
              </div>
            ) : (
              <>
                <div className="cs-modal-head">
                  <span className="cs-eyebrow">Schedule</span>
                  <h2 className="cs-modal-title">Request an Appointment</h2>
                  <p className="cs-modal-intro">
                    Choose your preferred service, date, and time. This is an appointment request, not a confirmed booking.
                  </p>
                </div>

                <div className="cs-callout cs-callout-light">
                  <Info size={18} />
                  <span>
                    This is not a guaranteed scheduled service. Captain's Standard will review your request and contact
                    you to confirm availability, final pricing, and service details before your appointment is officially
                    booked. No payment is collected here.
                  </span>
                </div>

                <form
                  name="schedule-now"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={submitSchedule}
                  className="cs-form"
                >
                  <input type="hidden" name="form-name" value="schedule-now" />
                  <p style={{ display: 'none' }}>
                    <label>Don't fill this out: <input name="bot-field" /></label>
                  </p>

                  <div className="cs-field">
                    <label htmlFor="s-service">Service Selection <span className="req">*</span></label>
                    <select id="s-service" name="service" required value={schedule.service} onChange={handleSchedule}>
                      <option value="">Select a service…</option>
                      <option value="Washdown Service">Washdown Service</option>
                      <option value="Interior & Exterior Detail">Interior &amp; Exterior Detail</option>
                      <option value="Vinyl Restoration Add-On">Vinyl Restoration Add-On</option>
                      <option value="Not Sure / Need Recommendation">Not Sure / Need Recommendation</option>
                    </select>
                  </div>

                  <div className="cs-form-row">
                    <div className="cs-field">
                      <label htmlFor="s-date">Requested Date <span className="req">*</span></label>
                      <input id="s-date" name="requested-date" type="date" required value={schedule['requested-date']} onChange={handleSchedule} />
                    </div>
                    <div className="cs-field">
                      <label htmlFor="s-time">Requested Time <span className="req">*</span></label>
                      <select id="s-time" name="requested-time" required value={schedule['requested-time']} onChange={handleSchedule}>
                        <option value="">Select a time…</option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="3:30 PM">3:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="cs-form-row">
                    <div className="cs-field">
                      <label htmlFor="s-name">Customer Name <span className="req">*</span></label>
                      <input id="s-name" name="customer-name" type="text" required value={schedule['customer-name']} onChange={handleSchedule} placeholder="Your full name" />
                    </div>
                    <div className="cs-field">
                      <label htmlFor="s-phone">Phone</label>
                      <input id="s-phone" name="phone" type="tel" value={schedule.phone} onChange={handleSchedule} placeholder="(xxx) xxx-xxxx" />
                    </div>
                  </div>

                  <div className="cs-field">
                    <label htmlFor="s-email">Email <span className="req">*</span></label>
                    <input id="s-email" name="email" type="email" required value={schedule.email} onChange={handleSchedule} placeholder="you@example.com" />
                  </div>

                  <div className="cs-form-row">
                    <div className="cs-field">
                      <label htmlFor="s-boat-type">Boat Type</label>
                      <input id="s-boat-type" name="boat-type" type="text" value={schedule['boat-type']} onChange={handleSchedule} placeholder="e.g. Pontoon, Ski Boat" />
                    </div>
                    <div className="cs-field">
                      <label htmlFor="s-boat-length">Boat Length</label>
                      <input id="s-boat-length" name="boat-length" type="text" value={schedule['boat-length']} onChange={handleSchedule} placeholder="e.g. 22 ft" />
                    </div>
                  </div>

                  <div className="cs-field">
                    <label htmlFor="s-location">Service Location / Marina</label>
                    <input id="s-location" name="service-location" type="text" value={schedule['service-location']} onChange={handleSchedule} placeholder="Marina or storage location" />
                  </div>

                  <div className="cs-field">
                    <label htmlFor="s-notes">Notes / Special Concerns</label>
                    <textarea id="s-notes" name="notes" rows={4} value={schedule.notes} onChange={handleSchedule} placeholder="Staining, mold, accessibility, or anything else we should know…" />
                  </div>

                  <p className="cs-form-fineprint">
                    <Clock size={15} />
                    This is an appointment request, not a confirmed booking. No payment is collected here.
                  </p>

                  <button type="submit" className="cs-btn cs-btn-gold cs-btn-full" disabled={scheduleSending}>
                    {scheduleSending ? 'Sending…' : 'Request Appointment'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
