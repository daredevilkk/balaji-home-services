import { useState } from "react";
import BookingForm from "./BookingForm";

export default function ServiceDetails({ service, onClose }) {
  const [selections, setSelections] = useState({});
  const [showBooking, setShowBooking] = useState(false);

  if (!service) return null;

  // =========================
  // SELECT / DESELECT OPTIONS
  // =========================
  const handleChoiceClick = (option, choice) => {
    setSelections((prev) => {
      const current = prev[option.id];

      // Multiple selection
      if (option.type === "multiple") {
        const currentArray = Array.isArray(current)
          ? current
          : [];

        const alreadySelected = currentArray.some(
          (item) => item.label === choice.label
        );

        if (alreadySelected) {
          return {
            ...prev,
            [option.id]: currentArray.filter(
              (item) => item.label !== choice.label
            ),
          };
        }

        return {
          ...prev,
          [option.id]: [...currentArray, choice],
        };
      }

      // Single selection
      // Clicking the selected option again = deselect
      if (current?.label === choice.label) {
        const updated = { ...prev };
        delete updated[option.id];
        return updated;
      }

      return {
        ...prev,
        [option.id]: choice,
      };
    });
  };

  // =========================
  // GET SELECTED OPTIONS
  // =========================
  const getSelectedOptions = () => {
    const result = [];

    Object.values(selections).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item) result.push(item);
        });
      } else if (value) {
        result.push(value);
      }
    });

    return result;
  };

  const selectedOptions = getSelectedOptions();

  // =========================
  // CALCULATE PRICE
  // =========================
  const getPriceRange = () => {
    let min = 0;
    let max = 0;
    let hasSelection = false;

    selectedOptions.forEach((item) => {
      const itemMin = Number(
        item.minPrice ?? item.price ?? 0
      );

      const itemMax = Number(
        item.maxPrice ?? item.price ?? 0
      );

      min += itemMin;
      max += itemMax;

      hasSelection = true;
    });

    if (!hasSelection) {
      return service.priceRange || "Contact for price";
    }

    return `₹${min.toLocaleString(
      "en-IN"
    )} - ₹${max.toLocaleString("en-IN")}`;
  };

  // =========================
  // WHATSAPP
  // =========================
  const sendWhatsApp = () => {
    let message = `Hello, I want to enquire about ${service.name}.`;

    if (selectedOptions.length > 0) {
      message += "\n\nSelected options:";

      selectedOptions.forEach((option) => {
        message += `\n• ${option.label}`;
      });
    }

    message += `\n\nApproximate price: ${getPriceRange()}`;

    message +=
      "\n\nPlease provide the final price and availability.";

    const phoneNumber = "919839408020";

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=` +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

  // =========================
  // BOOKING FORM
  // =========================
  if (showBooking) {
    return (
      <BookingForm
        service={service}
        selections={selections}
        onClose={() => {
          setShowBooking(false);
        }}
        onSubmitted={() => {
          setShowBooking(false);
        }}
      />
    );
  }

  // =========================
  // SERVICE DETAILS
  // =========================
  return (
    <div
      className="service-modal-overlay"
      onClick={onClose}
    >
      <div
        className="service-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}
        <button
          type="button"
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        {/* ICON */}
        <div className="service-modal-icon">
          {service.icon}
        </div>

        {/* CATEGORY */}
        <span className="service-category">
          {service.category}
        </span>

        {/* SERVICE NAME */}
        <h2>{service.name}</h2>

        {/* DESCRIPTION */}
        <p className="service-description">
          {service.shortDescription ||
            service.description}
        </p>

        {/* =========================
            OPTIONS
        ========================== */}
        {service.options?.map((option) => {
          const currentSelection =
            selections[option.id];

          return (
            <div
              className="service-option"
              key={option.id}
            >
              <h3>{option.title}</h3>

              <div className="choice-grid">

                {option.choices?.map((choice) => {
                  let selected = false;

                  if (option.type === "multiple") {
                    selected =
                      Array.isArray(
                        currentSelection
                      ) &&
                      currentSelection.some(
                        (item) =>
                          item.label ===
                          choice.label
                      );
                  } else {
                    selected =
                      currentSelection?.label ===
                      choice.label;
                  }

                  return (
                    <button
                      type="button"
                      key={choice.label}
                      className={`choice-button ${
                        selected
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleChoiceClick(
                          option,
                          choice
                        )
                      }
                    >
                      <span>
                        {choice.label}
                      </span>

                      {choice.minPrice !==
                        undefined ||
                      choice.maxPrice !==
                        undefined ? (
                        <span>
                          ₹
                          {choice.minPrice ??
                            choice.price ??
                            0}
                          {" - "}
                          ₹
                          {choice.maxPrice ??
                            choice.price ??
                            0}
                        </span>
                      ) : (
                        <span>
                          ₹
                          {choice.price ?? 0}
                        </span>
                      )}
                    </button>
                  );
                })}

              </div>
            </div>
          );
        })}

        {/* =========================
            PRICE
        ========================== */}
        <div className="price-range-box">

          <span>
            Approximate Price Range
          </span>

          <strong>
            {getPriceRange()}
          </strong>

          <p>
            The displayed amount is only an
            approximate range. The final price
            will be confirmed by the company
            after checking the actual
            requirement.
          </p>

        </div>

        {/* =========================
            SELECTED OPTIONS
        ========================== */}
        {selectedOptions.length > 0 && (
          <div className="selected-options">

            <h3>
              Selected Options
            </h3>

            <div>
              {selectedOptions.map(
                (option, index) => (
                  <span
                    key={`${option.label}-${index}`}
                    className="selected-option-tag"
                  >
                    {option.label}
                  </span>
                )
              )}
            </div>

          </div>
        )}

        {/* =========================
            BOOK SERVICE
        ========================== */}
        <button
          type="button"
          className="booking-submit book-service-button"
          onClick={() => {
            console.log("BOOK SERVICE CLICKED");
            setShowBooking(true);
          }}
        >
          📅 Book Service
        </button>

        {/* =========================
            WHATSAPP
        ========================== */}
        <button
          type="button"
          className="whatsapp-button"
          onClick={sendWhatsApp}
        >
          💬 Get Quote on WhatsApp
        </button>

      </div>
    </div>
  );
}