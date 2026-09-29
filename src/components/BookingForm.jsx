import { useState } from "react";

const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

export default function BookingForm({
  service,
  selections = {},
  onClose,
  onSubmitted,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    slot: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Get selected service options
  const getSelectedOptions = () => {
    const result = [];

    Object.values(selections).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item?.label) {
            result.push(item);
          }
        });
      } else if (value?.label) {
        result.push(value);
      }
    });

    return result;
  };

  // Calculate approximate price
  const getPriceRange = () => {
    const selectedOptions = getSelectedOptions();

    if (selectedOptions.length === 0) {
      return service.priceRange || "Contact for price";
    }

    let min = 0;
    let max = 0;

    selectedOptions.forEach((item) => {
      min += Number(item.minPrice ?? item.price ?? 0);
      max += Number(item.maxPrice ?? item.price ?? 0);
    });

    return `₹${min.toLocaleString(
      "en-IN"
    )} - ₹${max.toLocaleString("en-IN")}`;
  };

  // Create WhatsApp message
  const createWhatsAppMessage = (booking) => {
    let message =
      `Hello Balaji Home Services,\n\n` +
      `I would like to get a quote for a service.\n\n`;

    message += `Service: ${booking.service}\n`;

    if (booking.options?.length > 0) {
      message += `Selected Options:\n`;

      booking.options.forEach((option) => {
        message += `• ${option}\n`;
      });
    }

    message += `\nApproximate Price: ${booking.priceRange}`;

    message += `\n\nCustomer Details`;
    message += `\nName: ${booking.customer.name}`;
    message += `\nPhone: ${booking.customer.phone}`;
    message += `\nAddress: ${booking.customer.address}`;
    message += `\nPreferred Date: ${booking.date}`;
    message += `\nTime Slot: ${booking.slot}`;

    if (booking.notes) {
      message += `\nNotes: ${booking.notes}`;
    }

    message +=
      `\n\nPlease provide the final price and confirm the availability.`;

    return message;
  };

  const handleGetQuote = (e) => {
    e.preventDefault();

    setError("");

    // Validate form
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.date ||
      !form.slot
    ) {
      setError(
        "Please fill in all required fields before getting a quote."
      );
      return;
    }

    const selectedOptions = getSelectedOptions();

    // Create booking
    const newBooking = {
      id: Date.now(),

      createdAt: new Date().toISOString(),

      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      },

      service: service.name,

      serviceId: service.id,

      options: selectedOptions.map(
        (option) => option.label
      ),

      priceRange: getPriceRange(),

      date: form.date,

      slot: form.slot,

      notes: form.notes.trim(),

      status: "NEW",
    };

    // =========================
    // SAVE TO WEBSITE QUEUE
    // =========================

    try {
      const existingBookings = JSON.parse(
        localStorage.getItem("balajiBookings") || "[]"
      );

      const updatedBookings = [
        ...existingBookings,
        newBooking,
      ];

      localStorage.setItem(
        "balajiBookings",
        JSON.stringify(updatedBookings)
      );
    } catch (error) {
      console.error(
        "Could not save booking:",
        error
      );

      setError(
        "Could not save your request. Please try again."
      );

      return;
    }

    // =========================
    // OPEN WHATSAPP
    // =========================

    const whatsappMessage =
      createWhatsAppMessage(newBooking);

    const phoneNumber = "919839408020";

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=` +
      encodeURIComponent(whatsappMessage);

    // Open WhatsApp
    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    // =========================
    // SUCCESS
    // =========================

    setSubmitted(true);

    if (onSubmitted) {
      onSubmitted(newBooking);
    }
  };

  // =========================
  // SUCCESS SCREEN
  // =========================

  if (submitted) {
    return (
      <div className="booking-modal-overlay">
        <div className="booking-success">

          <div className="success-icon">
            ✓
          </div>

          <span className="service-category">
            REQUEST RECEIVED
          </span>

          <h2>
            Quote request sent
          </h2>

          <p>
            Thank you,{" "}
            <strong>{form.name}</strong>.
          </p>

          <p>
            Your request for{" "}
            <strong>{service.name}</strong>{" "}
            has been added to our service queue.
          </p>

          <p>
            WhatsApp has also been opened with
            your booking details.
          </p>

          <div className="booking-success-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>
      </div>
    );
  }

  // =========================
  // BOOKING FORM
  // =========================

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">

        {/* CLOSE */}

        <button
          type="button"
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        {/* HEADER */}

        <span className="service-category">
          GET A QUOTE
        </span>

        <h2>
          {service.name}
        </h2>

        <p>
          Enter your details and preferred
          appointment time. Your request will be
          added to our queue and sent to WhatsApp.
        </p>

        {/* ERROR */}

        {error && (
          <div className="booking-error">
            {error}
          </div>
        )}

        <form onSubmit={handleGetQuote}>

          {/* NAME */}

          <label>
            Your Name *

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                updateField(
                  "name",
                  e.target.value
                )
              }
              placeholder="Enter your name"
              required
            />
          </label>

          {/* PHONE */}

          <label>
            Phone Number *

            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                updateField(
                  "phone",
                  e.target.value
                )
              }
              placeholder="Enter phone number"
              required
            />
          </label>

          {/* ADDRESS */}

          <label>
            Service Address *

            <textarea
              value={form.address}
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
              placeholder="Enter the address where service is required"
              rows="3"
              required
            />
          </label>

          {/* DATE */}

          <label>
            Preferred Date *

            <input
              type="date"
              value={form.date}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                updateField(
                  "date",
                  e.target.value
                )
              }
              required
            />
          </label>

          {/* TIME SLOT */}

          <label>
            Preferred Time *

            <select
              value={form.slot}
              onChange={(e) =>
                updateField(
                  "slot",
                  e.target.value
                )
              }
              required
            >
              <option value="">
                Select a time slot
              </option>

              {TIME_SLOTS.map((slot) => (
                <option
                  key={slot}
                  value={slot}
                >
                  {slot}
                </option>
              ))}
            </select>
          </label>

          {/* NOTES */}

          <label>
            Additional Details

            <textarea
              value={form.notes}
              onChange={(e) =>
                updateField(
                  "notes",
                  e.target.value
                )
              }
              placeholder="Describe the problem or anything else we should know"
              rows="3"
            />
          </label>

          {/* PRICE */}

          <div className="booking-price-note">

            <span>
              Approximate Price
            </span>

            <strong>
              {getPriceRange()}
            </strong>

            <p>
              Final pricing will be confirmed by
              the company after reviewing the actual
              requirement.
            </p>

          </div>

          {/* ONE BUTTON */}

          <button
            type="submit"
            className="booking-submit"
          >
            💬 Get Quote
          </button>

        </form>

      </div>
    </div>
  );
}