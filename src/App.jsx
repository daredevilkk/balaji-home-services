import { useState } from "react";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import "./App.css";
import "./components/Hero.css";
import Reviews from "./components/Reviews";
import { services } from "./data/services";
import ServiceDetails from "./components/ServiceDetails";

function App() {
  const [selectedService, setSelectedService] = useState(null);

  const openService = (service) => {
    setSelectedService(service);
  };

  const closeService = () => {
    setSelectedService(null);
  };

  const callCompany = () => {
    window.location.href = "tel:+919839408020";
  };

  const openWhatsApp = () => {
    const phoneNumber = "919839408020";

    const message =
      "Hello, I am interested in your home services. Please provide more information.";

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="app">

      {/* ================= HERO ================= */}
     {/* ================= HERO ================= */}
<section className="hero-section">

  <div className="hero-container">

    {/* LEFT CONTENT */}
    <div className="hero-content">

      <img
        src="/logo.webp"
        alt="Shri Balaji Services Hub"
        className="hero-logo"
      />

      <span className="hero-label">
        ✨ BALAJI HOME SERVICES
      </span>

      <h1>
        Reliable services
        <br />
        for your home.
      </h1>

      <p>
        From everyday repairs to complete home care,
        get reliable professionals for the job.
      </p>

      <div className="hero-buttons">

        <button
          type="button"
          className="hero-button primary"
          onClick={() => {
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          📅 Explore Services
          <ArrowRight size={20} />
        </button>

        <button
          type="button"
          className="hero-button secondary"
          onClick={openWhatsApp}
        >
          💬 Get a Quote
        </button>

      </div>

      <div className="hero-features">

        <span>✓ Verified Service</span>
        <span>✓ Quick Response</span>
        <span>✓ Home & Office</span>

      </div>

    </div>


    {/* RIGHT IMAGE */}
    <div className="hero-visual">

      <div className="hero-image-card">

        <img
          src="/hero-cleaning.webp"
          alt="Professional home service"
        />

        <div className="hero-image-badge">
          <span>🏠</span>
          <div>
            <strong>Professional Service</strong>
            <small>Home & Office Care</small>
          </div>
        </div>

      </div>

    </div>

  </div>

</section>

{/* ================= SERVICES ================= */}
<section id="services" className="services-section">

  {/* Decorative background */}
  <div className="services-decoration decoration-blue"></div>
  <div className="services-decoration decoration-orange"></div>

  <div className="services-container">

    {/* Heading */}
    <div className="services-heading">

      <div className="services-badge">
        ✨ <span>Our Services</span>
      </div>

      <h2>
        What do you need
        <br />
        help with?
      </h2>

      <div className="heading-line"></div>

      <p>
        Choose a service to see available options and
        approximate price ranges. Reliable, professional
        and on-time service for your home or office.
      </p>

    </div>


    {/* Service Cards */}
    <div className="services-list">

      {services.map((service) => (

        <article
          className="service-card"
          key={service.id}
          onClick={() => openService(service)}
        >

          {/* Icon */}
          <div className="service-icon-box">
            <span>{service.icon}</span>
          </div>


          {/* Content */}
          <div className="service-card-content">

            <span className="service-card-category">
              {service.category}
            </span>

            <h3>
              {service.name}
            </h3>

            <p>
              {service.shortDescription ||
                service.description}
            </p>


            {/* Price */}
            <div className="service-price-row">

              <div className="service-price">

                <span>
                  Price range
                </span>

                <strong>
                  {service.priceRange ||
                    "Contact for price"}
                </strong>

              </div>


              {/* Arrow */}
              <button
                type="button"
                className="service-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  openService(service);
                }}
                aria-label={`View ${service.name}`}
              >
                <ArrowRight size={23} />
              </button>

            </div>

          </div>

        </article>

      ))}

    </div>

  </div>

</section>
     
      {/* ================= WHY US ================= */}
      <section className="why-section">

        <span className="section-label">
          WHY US
        </span>

        <h2>
          Simple. Reliable.
          <br />
          Professional.
        </h2>

        <div className="why-grid">

          <div className="why-card">
            <span>01</span>

            <h3>
              Easy Booking
            </h3>

            <p>
              Select your service and contact us
              directly for a quote.
            </p>
          </div>


          <div className="why-card">
            <span>02</span>

            <h3>
              Transparent Pricing
            </h3>

            <p>
              See an approximate price range before
              contacting the company.
            </p>
          </div>


          <div className="why-card">
            <span>03</span>

            <h3>
              Professional Service
            </h3>

            <p>
              Get your requirement reviewed before
              the final price is confirmed.
            </p>
          </div>

        </div>

      </section>
      <Reviews />
      
      {/* ================= CTA ================= */}
      <section className="cta-section">

        <div>
          <span className="section-label">
            NEED HELP?
          </span>

          <h2>
            Tell us what you
            <br />
            need.
          </h2>

          <p>
            Contact us and our team will help you
            with the right service.
          </p>
        </div>


        <div className="cta-buttons">

          <button
            type="button"
            onClick={callCompany}
            className="call-button"
          >
            <Phone size={20} />
            Call Now
          </button>


          <button
            type="button"
            onClick={openWhatsApp}
            className="whatsapp-button"
          >
            <MessageCircle size={20} />
            WhatsApp
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div>
          <strong>
            Balaji Home Services
          </strong>

          <p>
            Reliable services for your home.
          </p>
        </div>

        <p>
          © {new Date().getFullYear()} Balaji Home Services
        </p>

      </footer>


      {/* ================= SERVICE DETAILS POPUP ================= */}
      {selectedService && (
        <ServiceDetails
          service={selectedService}
          onClose={closeService}
        />
      )}


      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="mobile-contact-bar">

        <button
          type="button"
          onClick={callCompany}
          className="mobile-call"
        >
          <Phone size={22} />

          <span>
            Call
          </span>
        </button>


        <button
          type="button"
          onClick={openWhatsApp}
          className="mobile-whatsapp"
        >
          <MessageCircle size={22} />

          <span>
            WhatsApp
          </span>
        </button>

      </div>

    </div>
  );
}

export default App;