import React, { useState } from "react";

// TestDrive Modal Component
const TestDrive = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Test Drive Request:", {
      car: car.title,
      ...formData,
    });
    alert("Test drive request submitted successfully!");
    onClose();
  };

  return (
    <div style={modalStyles.testDriveModal}>
      <div style={modalStyles.testDriveContent}>
        <button style={modalStyles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <div style={modalStyles.modalHeader}>
          <h2>Schedule a Test Drive</h2>
          <p style={modalStyles.selectedCar}>
            Selected: <span>{car.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={modalStyles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              style={modalStyles.input}
            />
          </div>

          <div style={modalStyles.formRow}>
            <div style={modalStyles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                style={modalStyles.input}
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                required
                style={modalStyles.input}
              />
            </div>
          </div>

          <div style={modalStyles.formRow}>
            <div style={modalStyles.formGroup}>
              <label htmlFor="preferredDate">Preferred Date</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                style={modalStyles.input}
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label htmlFor="preferredTime">Preferred Time</label>
              <input
                type="time"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                style={modalStyles.input}
              />
            </div>
          </div>

          <div style={modalStyles.formGroup}>
            <label htmlFor="location">Nearest Dealership</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={modalStyles.input}
            >
              <option value="">Select location</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru </option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <div style={modalStyles.formGroup}>
            <label htmlFor="message">Additional Notes (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any special requests or questions"
              rows="4"
              style={modalStyles.textarea}
            />
          </div>

          <button type="submit" style={modalStyles.submitBtn}>
            Schedule Test Drive
          </button>
        </form>
      </div>
    </div>
  );
};

// TestDriveCard Component
const TestDriveCard = () => {
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);

  // Sample car data
  const carData = {
    title: "Curvv",
    name: "Curvv",
    image: new URL("../../assets/Curvvnav.webp", import.meta.url).href,
    description:
      "Experience the future of driving with the all-new Curvv. Book your test drive today and feel the difference.",
    cta: "Schedule Test Drive",
  };

  const handleCTAClick = (e) => {
    e.preventDefault();
    setShowTestDriveModal(true);
  };

  const handleCloseModal = () => {
    setShowTestDriveModal(false);
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img src={carData.image} alt={carData.name} style={styles.image} />
        </div>
        <div style={styles.contentSection}>
          <h2>Schedule a Test Drive</h2>
          <p>{carData.description}</p>
          <a href="#" style={styles.ctaLink} onClick={handleCTAClick}>
            {carData.cta} →
          </a>
        </div>
      </div>
      <div style={styles.container1}>
        <p>
          * Prices indicated are Ex-showroom prices. Prices are subject to
          change without prior information at the discretion of Tata Motors.
          Contact your nearest Tata Motors dealer for exact prices.
        </p>
      </div>
      <div style={styles.container2}>
        <div style={styles.title}>CAUTION NOTICE</div>

        <p style={styles.paragraph}>
          Tata Motors Limited (TML) is India's largest manufacturer of trucks
          and buses, with a global presence. TML is one of the pioneers of
          eco-friendly mobility in India and continues to set new paradigms of
          safety and performance of cargo and public transport in India. As part
          of the Tata group of companies, TML also has rights of usage to
          numerous TATA trademarks, including but not limited to the well-known
          trademarks TATA, TATA MOTORS & corporate logo of the brand.
        </p>

        <p style={styles.paragraph}>
          Members of the public, trade and media are hereby informed that a
          website with URL &lt;www.tataevdealership.com&gt; has been found on
          the internet, which is allegedly offering dealerships under the name
          of TATA EV with an investment of INR 1.5 crores to INR 2.5 crores. TML
          has got no association, connection, reference or affiliation with the
          website and all of its contents therein, including but not limited to
          their impugned logo. TML does not associate with any of the products /
          services being sold or marketed via the foregoing website, including
          the entity owning the website and all resultant claims and businesses
          arising out of it. TML is actively seeking appropriate legal recourse
          against the URL and, in the meanwhile, disclaims any liabilities or
          claims that may arise out of such incorrect association and requests
          all stakeholders to not associate TML with the foregoing website, its
          offerings and claims.
        </p>

        <p style={styles.paragraph}>
          All stakeholders are urged to be vigilant so as not to become
          inadvertently a party to such acts of infringement and to bring any
          such acts to our attention. Should business be still conducted or
          information provided to such unscrupulous websites / entities, TML
          shall not be responsible or be held liable for any prejudice caused
          due to such businesses being conducted.
        </p>

        <p style={styles.paragraph}>
          Should anyone come across any such illegal activities, please write to
          us at our Email ID{" "}
          <span style={styles.email}>cac@tatamotors.com</span>
        </p>

        <p style={styles.paragraph}>
          Tata Motors Passenger Vehicle Limited (TMPV), part of Tata Motors
          Group is India's leading home-grown player and the third largest car
          manufacturer in India's growing passenger vehicle sector. TMPV with
          winning products prioritises service excellence and customer
          satisfaction. As part of the Tata group of companies, TMPV also has
          rights of usage to numerous TATA trademarks, including but not limited
          to the well-known trademarks TATA, TATA MOTORS & corporate logo of the
          brand.
        </p>

        <p style={styles.paragraph}>
          Members of the public, trade and media are hereby informed that a
          website with URL &lt;www.tataevdealership.com&gt; has been found on
          the internet, which is allegedly offering dealerships under the name
          of TATA EV with an investment of INR 1.5 crores to INR 2.5 crores.
          TMPV has got no association, connection, reference or affiliation with
          the website and all of its contents therein, including but not limited
          to their impugned logo. TMPV does not associate with any of the
          products / services being sold or marketed via the foregoing website,
          including the entity owning the website and all resultant claims and
          businesses arising out of it. TMPV is actively seeking appropriate
          legal recourse against the URL and, in the meanwhile, disclaims any
          liabilities or claims that may arise out of such incorrect association
          and requests all stakeholders to not associate TMPV with the foregoing
          website, its offerings and claims.
        </p>

        <p style={styles.paragraph}>
          All stakeholders are urged to be vigilant so as not to become
          inadvertently a party to such acts of infringement and to bring any
          such acts to our attention. Should business be still conducted or
          information provided to such unscrupulous websites / entities, TMPV
          shall not be responsible or be held liable for any prejudice caused
          due to such businesses being conducted.
        </p>

        <p style={styles.paragraph}>
          Should anyone come across any such illegal activities, please write to
          us at our Email ID{" "}
          <span style={styles.email}>customercare@tatamotors.com</span>
        </p>
      </div>

      {showTestDriveModal && (
        <TestDrive car={carData} onClose={handleCloseModal} />
      )}
    </>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "20px 30px",
    borderRadius: "12px",
    justifyContent: "space-between",
    gap: "20px",
    marginLeft: "20px",
    maxWidth: "1250px",
    margin: "0 auto",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  imageSection: {
    flex: 1,
    textAlign: "center",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
  },
  contentSection: {
    flex: 1,
    padding: "20px",
  },
  ctaLink: {
    marginTop: "20px",
    display: "inline-block",
    color: "#0066ff",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "18px",
    padding: "10px 20px",
    border: "2px solid #0066ff",
    borderRadius: "30px",
    transition: "all 0.3s ease",
  },
  container1: {
    padding: "30px 40px",
    maxWidth: "1250px",
    margin: "30px auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  container2: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "20px 40px",
    border: "1px solid #ffeeba",
    borderRadius: "10px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    lineHeight: "1.6",
    maxWidth: "1400px",
    margin: "20px auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
    textTransform: "uppercase",
    textAlign: "center",
  },
  paragraph: {
    marginBottom: "16px",
  },
  email: {
    color: "#0056b3",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};

const modalStyles = {
  testDriveModal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  testDriveContent: {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
    padding: "25px",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#7f8c8d",
  },
  modalHeader: {
    marginBottom: "25px",
    textAlign: "center",
  },
  selectedCar: {
    color: "#7f8c8d",
    fontSize: "16px",
  },
  formRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  formGroup: {
    flex: 1,
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  submitBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "14px 25px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
};

// Add hover effect via JavaScript
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  styleSheet.insertRule(
    `
    a[style*="ctaLink"]:hover {
      background-color: #0066ff !important;
      color: white !important;
    }
  `,
    styleSheet.cssRules.length
  );
}

export default TestDriveCard;
