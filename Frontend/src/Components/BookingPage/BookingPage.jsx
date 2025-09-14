import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carModel, selectedColor, carImage, price } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
    tradeIn: "no",
    tradeInDetails: "",
    financing: "no",
    testDrive: "no",
    preferredDate: "",
    additionalNotes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Booking submitted:", { carModel, selectedColor, ...formData });
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (!carModel) {
    return (
      <div className="booking-error">
        <div className="error-content">
          <h2>No Car Selected</h2>
          <p>Please go back and select a car to purchase.</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Back to Car Selection
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      
      <div className="confirmation-page">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <svg className="confirmation-icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
              />
            </svg>
            <h2>Thank You for Your Purchase Request!</h2>
            <p className="confirmation-subtitle">
              We've received your request for the {carModel}. Our sales team
              will contact you shortly.
            </p>
          </div>

          <div className="confirmation-details">
            <div className="car-info">
              <div className="car-image-container">
                <img src={carImage} alt={carModel} />
                <div className="car-badge">{selectedColor}</div>
              </div>
              <div className="car-specs">
                <h3>{carModel}</h3>
                {price && (
                  <p className="car-price">${price.toLocaleString()}</p>
                )}
                <div className="specs-grid">
                  <div className="spec-item">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M11,12V7H13V12H16L12,17L8,12H11Z"
                      />
                    </svg>
                    <span>Estimated Delivery: 2-4 weeks</span>
                  </div>
                  <div className="spec-item">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="currentColor"
                        d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                      />
                    </svg>
                    <span>Full Manufacturer Warranty</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="customer-info">
              <h3>Your Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{formData.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{formData.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{formData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Payment:</span>
                  <span className="info-value">
                    {formData.paymentMethod === "cash" ? "Cash" : "Financing"}
                  </span>
                </div>
                {formData.testDrive === "yes" && (
                  <div className="info-item">
                    <span className="info-label">Test Drive:</span>
                    <span className="info-value">
                      {formData.preferredDate || "To be scheduled"}
                    </span>
                  </div>
                )}
              </div>

              {formData.additionalNotes && (
                <div className="notes-section">
                  <h4>Your Notes:</h4>
                  <p>{formData.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="next-steps">
            <h3>What Happens Next?</h3>
            <div className="steps-timeline">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Verification Call</h4>
                  <p>
                    Our sales representative will contact you within 24 hours to
                    verify details.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Documentation</h4>
                  <p>
                    We'll guide you through the required paperwork and payment
                    process.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Delivery Preparation</h4>
                  <p>
                    Your vehicle will be prepared for delivery or pickup at your
                    convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => navigate("/")} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="breadcrumbs">
          <span onClick={() => navigate("/")}>Home</span>
          <span> / </span>
          <span>Purchase {carModel}</span>
        </div>
        <h1>Complete Your Purchase</h1>
        <div className="car-summary">
          <div className="car-image-container">
            <img src={carImage} alt={carModel} />
            <div className="car-badge">{selectedColor}</div>
          </div>
          <div className="car-details">
            <h2>{carModel}</h2>
            {/* <p className="car-description">{carDesc}</p> */}
            {price && <p className="price">${price.toLocaleString()}</p>}
            <div className="detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="currentColor"
                  d="M19.03 7.39L20.45 5.97C20 5.46 19.55 5 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13S7.03 22 12 22C17 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39M13 14H11V7H13V14M15 1H9V3H15V1Z"
                />
              </svg>
              <span>Estimated delivery: 2-4 Months</span>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-container">
        <div className="form-navigation">
          <button
            className={`nav-btn ${
              activeSection === "personal" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("personal");
              document
                .getElementById("personal-info")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="step-number">1</span>
            Personal Info
          </button>
          <button
            className={`nav-btn ${
              activeSection === "purchase" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("purchase");
              document
                .getElementById("purchase-details")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="step-number">2</span>
            Purchase Details
          </button>
          <button
            className={`nav-btn ${
              activeSection === "additional" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("additional");
              document
                .getElementById("additional-info")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="step-number">3</span>
            Additional Info
          </button>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div id="personal-info" className="form-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <h2>Personal Information</h2>
            </div>
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">
                Address <span className="required">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="123 Main St, City, State ZIP"
              />
            </div>
          </div>

          <div id="purchase-details" className="form-section">
            <div className="section-header">
              <div className="section-number">2</div>
              <h2>Purchase Details</h2>
            </div>
            <div className="form-group">
              <label>
                Payment Method <span className="required">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path
                        fill="currentColor"
                        d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A1,1 0 0,1 6,9A1,1 0 0,1 5,8A1,1 0 0,1 6,7A1,1 0 0,1 7,8M17,8A1,1 0 0,1 18,9A1,1 0 0,1 17,10A1,1 0 0,1 16,9A1,1 0 0,1 17,8Z"
                      />
                    </svg>
                    <span>Cash Payment</span>
                    <p className="option-description">
                      Pay the full amount upfront
                    </p>
                  </div>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="financing"
                    checked={formData.paymentMethod === "financing"}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path
                        fill="currentColor"
                        d="M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M13,10V17H16V10M4,10V17H7V10H4M10,10V17H13V10H10Z"
                      />
                    </svg>
                    <span>Financing</span>
                    <p className="option-description">
                      Monthly payment options available
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {formData.paymentMethod === "financing" && (
              <div className="form-group">
                <label htmlFor="financingDetails">Financing Details</label>
                <textarea
                  id="financingDetails"
                  name="financingDetails"
                  value={formData.financingDetails}
                  onChange={handleChange}
                  placeholder="Please provide details about your financing needs (desired loan term, down payment, etc.)"
                />
              </div>
            )}

            <div className="form-group">
              <label>Do you have a vehicle to trade in?</label>
              <div className="toggle-group">
                <label
                  className={`toggle-option ${
                    formData.tradeIn === "no" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="tradeIn"
                    value="no"
                    checked={formData.tradeIn === "no"}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
                <label
                  className={`toggle-option ${
                    formData.tradeIn === "yes" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="tradeIn"
                    value="yes"
                    checked={formData.tradeIn === "yes"}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
              </div>
            </div>

            {formData.tradeIn === "yes" && (
              <div className="form-group">
                <label htmlFor="tradeInDetails">Trade-In Details</label>
                <textarea
                  id="tradeInDetails"
                  name="tradeInDetails"
                  value={formData.tradeInDetails}
                  onChange={handleChange}
                  placeholder="Year, make, model, mileage, and condition of your trade-in vehicle"
                />
              </div>
            )}

            <div className="form-group">
              <label>Would you like to schedule a test drive?</label>
              <div className="toggle-group">
                <label
                  className={`toggle-option ${
                    formData.testDrive === "no" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="testDrive"
                    value="no"
                    checked={formData.testDrive === "no"}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
                <label
                  className={`toggle-option ${
                    formData.testDrive === "yes" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="testDrive"
                    value="yes"
                    checked={formData.testDrive === "yes"}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
              </div>
            </div>

            {formData.testDrive === "yes" && (
              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Test Drive Date</label>
                <div className="date-input-container">
                  <svg className="date-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
                    />
                  </svg>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="date-input"
                  />
                </div>
              </div>
            )}
          </div>

          <div id="additional-info" className="form-section">
            <div className="section-header">
              <div className="section-number">3</div>
              <h2>Additional Information</h2>
            </div>
            <div className="form-group">
              <label htmlFor="additionalNotes">Special Requests or Notes</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any additional information or special requests (accessories, delivery preferences, etc.)"
              />
            </div>
          </div>

          <div className="form-submit">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Vehicle:</span>
                <span>{carModel}</span>
              </div>
              <div className="summary-item">
                <span>Color:</span>
                <span>{selectedColor}</span>
              </div>
              {price && (
                <div className="summary-item">
                  <span>Price:</span>
                  <span>${price.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-total">
                <span>Estimated Total:</span>
                <span>{price ? `$${price.toLocaleString()}` : "TBD"}</span>
              </div>
            </div>

            <div className="terms-agreement">
              <label className="checkbox-container">
                <input type="checkbox" required />
                <span className="checkmark"></span>I agree to the{" "}
                <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn-primary submit-button">
              Submit Purchase Request
              <svg className="btn-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
