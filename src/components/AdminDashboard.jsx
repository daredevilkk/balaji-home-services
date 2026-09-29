import { useEffect, useState } from "react";

const STATUSES = [
  "NEW",
  "ACCEPTED",
  "SCHEDULED",
  "IN PROGRESS",
  "COMPLETED",
];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    const saved = JSON.parse(
      localStorage.getItem("balajiBookings") || "[]"
    );

    setBookings(saved);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = (id, status) => {
    const updated = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status }
        : booking
    );

    setBookings(updated);

    localStorage.setItem(
      "balajiBookings",
      JSON.stringify(updated)
    );
  };

  const deleteBooking = (id) => {
    const updated = bookings.filter(
      (booking) => booking.id !== id
    );

    setBookings(updated);

    localStorage.setItem(
      "balajiBookings",
      JSON.stringify(updated)
    );
  };

  const newCount = bookings.filter(
    (b) => b.status === "NEW"
  ).length;

  const scheduledCount = bookings.filter(
    (b) => b.status === "SCHEDULED"
  ).length;

  const completedCount = bookings.filter(
    (b) => b.status === "COMPLETED"
  ).length;

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>
          <span className="service-category">
            BALAJI SERVICES
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage service requests, bookings and slots.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={loadBookings}
        >
          ↻ Refresh
        </button>
      </div>

      {/* Statistics */}

      <div className="admin-stats">

        <div className="admin-stat">
          <span>New Requests</span>
          <strong>{newCount}</strong>
        </div>

        <div className="admin-stat">
          <span>Scheduled</span>
          <strong>{scheduledCount}</strong>
        </div>

        <div className="admin-stat">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>

        <div className="admin-stat">
          <span>Total Requests</span>
          <strong>{bookings.length}</strong>
        </div>

      </div>

      {/* Queue */}

      <section className="admin-section">

        <div className="admin-section-header">
          <div>
            <h2>Service Queue</h2>
            <p>Newest requests appear first.</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <div>📋</div>

            <h3>No service requests yet</h3>

            <p>
              New customer bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="booking-list">

            {[...bookings]
              .reverse()
              .map((booking) => (
                <article
                  className="booking-card"
                  key={booking.id}
                >

                  <div className="booking-card-top">

                    <div>
                      <span className="booking-id">
                        #{String(booking.id).slice(-6)}
                      </span>

                      <h3>{booking.service}</h3>

                      <p>
                        {booking.options?.join(" • ")}
                      </p>
                    </div>

                    <span
                      className={`status status-${booking.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  <div className="booking-details">

                    <div>
                      <small>Customer</small>
                      <strong>
                        {booking.customer.name}
                      </strong>
                    </div>

                    <div>
                      <small>Phone</small>
                      <strong>
                        {booking.customer.phone}
                      </strong>
                    </div>

                    <div>
                      <small>Date</small>
                      <strong>
                        {booking.date}
                      </strong>
                    </div>

                    <div>
                      <small>Time Slot</small>
                      <strong>
                        {booking.slot}
                      </strong>
                    </div>

                  </div>

                  <div className="booking-address">
                    <small>Address</small>
                    <p>
                      {booking.customer.address}
                    </p>
                  </div>

                  {booking.notes && (
                    <div className="booking-address">
                      <small>Customer Notes</small>
                      <p>{booking.notes}</p>
                    </div>
                  )}

                  <div className="booking-actions">

                    <select
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(
                          booking.id,
                          e.target.value
                        )
                      }
                    >
                      {STATUSES.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                    <a
                      href={`tel:${booking.customer.phone}`}
                      className="secondary-button"
                    >
                      📞 Call
                    </a>

                    <a
                      href={`https://wa.me/${booking.customer.phone.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="whatsapp-small"
                    >
                      WhatsApp
                    </a>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteBooking(booking.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </article>
              ))}

          </div>
        )}

      </section>

    </div>
  );
}