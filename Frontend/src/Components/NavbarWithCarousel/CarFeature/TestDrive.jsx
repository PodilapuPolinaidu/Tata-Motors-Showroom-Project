import React, { useState } from "react";
import "./TestDrive.css";

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
    <div className="test-drive-modal">
      <div className="test-drive-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <h2>Schedule a Test Drive</h2>
          <p className="selected-car">
            Selected: <span>{car.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preferredDate">Preferred Date</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredTime">Preferred Time</label>
              <input
                type="time"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Nearest Dealership</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select location</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru </option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Additional Notes (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any special requests or questions"
              rows="4"
            />
          </div>

          <button type="submit" className="submit-btn">
            Schedule Test Drive
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestDrive;
