import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarFeature.css";
import carModels from "../../../data/carModels";
import TestDrive from "./TestDrive";
const CarFeature = () => {
  const [selectedColors, setSelectedColors] = useState({});
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();

  const handleColorChange = (carId, color) => {
    setSelectedColors((prev) => ({
      ...prev,
      [carId]: color,
    }));
  };

  const handleLearnMoreClick = (carId) => {
    navigate(`/cars/${carId}`);
  };

  const handleTestDriveClick = (car) => {
    setSelectedCar(car);
    setShowTestDrive(true);
  };

  const closeTestDrive = () => {
    setShowTestDrive(false);
  };

  return (
    <div className="car-promo-container">
      {carModels.map((car) => {
        const defaultColor = car.availableColors?.[0] || "";
        const selectedColor = selectedColors[car.id] || defaultColor;

        // Fetch background color & display name from carModels.js
        const colorInfo = car.backgroundColors?.[selectedColor] || {};
        const bgColor = colorInfo.hex || "#f0f0f0";
        const displayName = colorInfo.name || selectedColor;

        return (
          <div className="hero-wrapper" key={car.id}>
            <div className={`hero ${car.id % 2 === 0 ? "reverse-layout" : ""}`}>
              {/* Left section: Car image + color dots */}
              <div className="left" style={{ background: bgColor }}>
                <img
                  src={car.imageVariants?.[selectedColor]}
                  alt={`${car.title} in ${displayName}`}
                  className="car"
                />
                <div className="color-dots">
                  {car.availableColors?.map((color, index) => {
                    const dotColorInfo = car.backgroundColors?.[color] || {};
                    return (
                      <span
                        key={index}
                        onClick={() => handleColorChange(car.id, color)}
                        style={{
                          background: dotColorInfo.hex || "#ccc",
                          border:
                            selectedColor === color
                              ? "2px solid black"
                              : "0px solid transparent",
                          transform:
                            selectedColor === color ? "scale(1.2)" : "scale(1)",
                        }}
                        title={dotColorInfo.name || color}
                      ></span>
                    );
                  })}
                </div>
              </div>

              {/* Right section: Details */}
              <div className="right">
                <h1>
                  {car.badgeText}
                  <br />
                  {car.title}
                </h1>
                <h3>{car.subtitle}</h3>
                <p>{car.description}</p>
                <div className="buttons">
                  {car.primaryButtonText && (
                    <button
                      onClick={() => handleLearnMoreClick(car.id)}
                      className="learn-more-btn"
                    >
                      {car.primaryButtonText} →
                    </button>
                  )}
                  {car.secondaryButtonText && (
                    <button
                      onClick={() => handleTestDriveClick(car)}
                      className="secondary-btn"
                    >
                      {car.secondaryButtonText} →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom images */}
            {car.bottomImages && (
              <div
                className={`bottom ${car.id % 2 === 0 ? "reverse-bottom" : ""}`}
              >
                {car.bottomImages.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${car.title} view ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Test Drive Modal */}
      {showTestDrive && (
        <TestDrive car={selectedCar} onClose={closeTestDrive} />
      )}
    </div>
  );
};

export default CarFeature;
