import "./Reviews.css";

const reviews = [
  {
    name: "Sumit Pal",
    date: "February 2026",
    text: "Shri Balaji Services Hub is great! The workers are fast and do their jobs well. I am very happy with the service.",
  },
  {
    name: "Google Customer",
    date: "2026",
    text: "Very good service and professional workers. The work was completed properly and on time.",
  },
  {
    name: "Google Customer",
    date: "2026",
    text: "Good experience with the service. Staff was helpful and the overall service was smooth.",
  },
];

export default function Reviews() {
  return (
    <section className="reviews-section" id="reviews">

      {/* HEADER */}
      <div className="reviews-header">

       

          <div>
            <span className="reviews-label">
              CUSTOMER REVIEWS
            </span>

            <h2>
              What our customers
              <br />
              <span>say about us.</span>
            </h2>
          </div>
        </div>

        <div className="google-rating">

          <div className="google-icon">
            G
          </div>

          <div className="rating-number">
            4.9
          </div>

          <div className="stars">
            ★★★★★
          </div>

          <div className="review-count">
            107 Google Reviews
          </div>

        </div>

      


      {/* REVIEW CARDS */}
      <div className="reviews-grid">

        {reviews.map((review, index) => (
          <div
            className="review-card"
            key={index}
          >

            <div className="review-card-top">

              <div className="review-avatar">
                {review.name.charAt(0)}
              </div>

              <div>
                <h3>
                  {review.name}
                </h3>

                <span>
                  Google Review
                </span>
              </div>

              <div className="google-small">
                G
              </div>

            </div>


            <div className="review-stars">
              ★★★★★
            </div>


            <p className="review-text">
              "{review.text}"
            </p>


            <span className="review-date">
              {review.date}
            </span>

          </div>
        ))}

      </div>


      {/* GOOGLE CTA */}
      <div className="reviews-footer">

        <h3>
          More customer reviews
        </h3>

        <p>
          See the latest reviews and experiences
          from our customers on Google.
        </p>

        <a
          href="https://maps.app.goo.gl/nDqTgqqKzSUjXeVH7"
          target="_blank"
          rel="noopener noreferrer"
          className="google-review-button"
        >
          <span>★</span>
          See All Google Reviews
          <span className="arrow">→</span>
        </a>

      </div>

    </section>
  );
}