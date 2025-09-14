import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faRocket,
  faDumbbell,
  faSyncAlt,
  faGasPump,
  faRulerHorizontal,
  faRulerVertical,
  faCar,
  faSuitcase,
  faBalanceScale,
  faStop,
  faStar,
  faTachometerAlt,
  faArrowUp,
  faArrowLeft,
  faInfoCircle,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import carModels from "../../../data/carModels";
import "./CarDetailPage.css";
import Footer from "../../Footer/Footer";

const CarDetailPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("");
  const [car, setCar] = useState(null);
  const [expandedSpec, setExpandedSpec] = useState(null);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    const foundCar = carModels.find((car) => car.id.toString() === carId);
    if (foundCar) {
      setCar(foundCar);
      setSelectedColor(foundCar.availableColors?.[0] || "");
    } else {
      navigate("/");
    }
  }, [carId, navigate]);

  const handleBookNow = () => {
    navigate(`/booking/${carId}`, {
      state: {
        carModel: car.title,
        selectedColor: colorName,
        carImage: car.imageVariants?.[selectedColor],
      },
    });
  };

  const toggleSpecDetails = (specName) => {
    if (expandedSpec === specName) {
      setExpandedSpec(null);
    } else {
      setExpandedSpec(specName);
    }
  };

  if (!car) return <div className="loading">Loading...</div>;

  const bgColor = car.backgroundColors?.[selectedColor]?.hex || "#f0f0f0";
  const colorName =
    car.backgroundColors?.[selectedColor]?.name || selectedColor;

  const getSpecIcon = (specName) => {
    const lowerName = specName.toLowerCase();

    if (lowerName.includes("engine")) return faCog;
    if (lowerName.includes("power")) return faRocket;
    if (lowerName.includes("torque")) return faDumbbell;
    if (lowerName.includes("transmission")) return faSyncAlt;
    if (lowerName.includes("mileage") || lowerName.includes("fuel"))
      return faGasPump;
    if (lowerName.includes("length") || lowerName.includes("width"))
      return faRulerHorizontal;
    if (lowerName.includes("height")) return faRulerVertical;
    if (lowerName.includes("wheelbase")) return faCar;
    if (lowerName.includes("boot")) return faSuitcase;
    if (lowerName.includes("weight")) return faBalanceScale;
    if (lowerName.includes("brakes")) return faStop;
    if (lowerName.includes("rating")) return faStar;
    if (lowerName.includes("suspension")) return faCar;
    if (lowerName.includes("tyres")) return faTachometerAlt;
    if (lowerName.includes("ground")) return faArrowUp;
    if (lowerName.includes("turning")) return faSyncAlt;

    return faCog; // default icon
  };

  // Group specifications by category for better organization
  const groupedSpecs = {
    performance: car.specifications?.filter((spec) =>
      [
        "Engine",
        "Power",
        "Torque",
        "Transmission",
        "Mileage",
        "Fuel Tank Capacity",
      ].includes(spec.name)
    ),
    dimensions: car.specifications?.filter((spec) =>
      [
        "Length",
        "Width",
        "Height",
        "Wheelbase",
        "Ground Clearance",
        "Turning Radius",
      ].includes(spec.name)
    ),
    capacity: car.specifications?.filter((spec) =>
      ["Boot Space", "Kerb Weight"].includes(spec.name)
    ),
    safety: car.specifications?.filter((spec) =>
      ["Brakes", "Suspension", "Tyres", "Safety Rating"].includes(spec.name)
    ),
  };

  return (
    <>
      <div className="car-detail-page">
        <button onClick={() => navigate(-1)} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to All Cars
        </button>

        <div className="car-detail-header" style={{ background: bgColor }}>
          <div className="header-content">
            <h1>
              {car.badgeText && <span className="badge">{car.badgeText}</span>}
              {car.title}
            </h1>
            <h2>{car.subtitle}</h2>
            <div className="price-range">
              {car.variants && (
                <p>
                  {car.variants[0].price.split(" ")[0]} -
                  {car.variants[car.variants.length - 1].price.split(" ")[0]}
                </p>
              )}
            </div>
            <button className="book-now-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
          <img
            src={car.imageVariants?.[selectedColor]}
            alt={`${car.title} in ${colorName}`}
            className="main-car-image"
          />
        </div>

        {/* Color Selector */}
        <div className="color-selector">
          <h3>Available Colors</h3>
          <div className="color-options">
            {car.availableColors?.map((color) => (
              <div
                key={color}
                className={`color-option ${
                  selectedColor === color ? "active" : ""
                }`}
                onClick={() => setSelectedColor(color)}
              >
                <div
                  className="color-swatch"
                  style={{
                    background: car.backgroundColors?.[color]?.hex || "#ccc",
                    border: "1px solid #999",
                  }}
                  title={car.backgroundColors?.[color]?.name || color}
                />
                <span>{car.backgroundColors?.[color]?.name || color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="detail-tabs">
          <button
            className={`tab-button ${activeTab === "specs" ? "active" : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            Specifications
          </button>
          <button
            className={`tab-button ${activeTab === "features" ? "active" : ""}`}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>
          <button
            className={`tab-button ${activeTab === "variants" ? "active" : ""}`}
            onClick={() => setActiveTab("variants")}
          >
            Variants
          </button>
          <button
            className={`tab-button ${activeTab === "warranty" ? "active" : ""}`}
            onClick={() => setActiveTab("warranty")}
          >
            Warranty & Service
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "specs" && (
            <div className="specifications">
              <h2>Detailed Specifications</h2>

              {/* Performance */}
              <div className="spec-group">
                <h3>
                  <FontAwesomeIcon icon={faRocket} /> Performance
                </h3>
                <div className="spec-grid">
                  {groupedSpecs.performance?.map((spec) => (
                    <div key={spec.name} className="spec-item">
                      <div className="spec-icon">
                        <FontAwesomeIcon icon={getSpecIcon(spec.name)} />
                      </div>
                      <div className="spec-details">
                        <h4>{spec.name}</h4>
                        <p>{spec.value}</p>
                        {spec.details && (
                          <button
                            className="more-info-btn"
                            onClick={() => toggleSpecDetails(spec.name)}
                          >
                            <FontAwesomeIcon icon={faInfoCircle} /> Details{" "}
                            <FontAwesomeIcon
                              icon={
                                expandedSpec === spec.name
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </button>
                        )}
                        {expandedSpec === spec.name && spec.details && (
                          <div className="spec-details-expanded">
                            {Object.entries(spec.details).map(
                              ([key, value]) => (
                                <p key={key}>
                                  <strong>{key}:</strong> {value}
                                </p>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="spec-group">
                <h3>
                  <FontAwesomeIcon icon={faRulerHorizontal} /> Dimensions
                </h3>
                <div className="spec-grid">
                  {groupedSpecs.dimensions?.map((spec) => (
                    <div key={spec.name} className="spec-item">
                      <div className="spec-icon">
                        <FontAwesomeIcon icon={getSpecIcon(spec.name)} />
                      </div>
                      <div>
                        <h4>{spec.name}</h4>
                        <p>{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div className="spec-group">
                <h3>
                  <FontAwesomeIcon icon={faSuitcase} /> Capacity
                </h3>
                <div className="spec-grid">
                  {groupedSpecs.capacity?.map((spec) => (
                    <div key={spec.name} className="spec-item">
                      <div className="spec-icon">
                        <FontAwesomeIcon icon={getSpecIcon(spec.name)} />
                      </div>
                      <div>
                        <h4>{spec.name}</h4>
                        <p>{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety */}
              <div className="spec-group">
                <h3>
                  <FontAwesomeIcon icon={faStar} /> Safety
                </h3>
                <div className="spec-grid">
                  {groupedSpecs.safety?.map((spec) => (
                    <div key={spec.name} className="spec-item">
                      <div className="spec-icon">
                        <FontAwesomeIcon icon={getSpecIcon(spec.name)} />
                      </div>
                      <div>
                        <h4>{spec.name}</h4>
                        <p>{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="features">
              <h2>Features & Amenities</h2>
              <div className="feature-categories">
                <div className="feature-category">
                  <h3>Exterior</h3>
                  <ul>
                    {car.features
                      ?.filter(
                        (f) =>
                          f.includes("Headlights") ||
                          f.includes("DRLs") ||
                          f.includes("Tyres")
                      )
                      .map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                </div>
                <div className="feature-category">
                  <h3>Interior</h3>
                  <ul>
                    {car.features
                      ?.filter(
                        (f) =>
                          f.includes("Infotainment") ||
                          f.includes("Cluster") ||
                          f.includes("Air Purifier") ||
                          f.includes("Wireless Charger")
                      )
                      .map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                </div>
                <div className="feature-category">
                  <h3>Safety</h3>
                  <ul>
                    {car.features
                      ?.filter(
                        (f) =>
                          f.includes("Safety") ||
                          f.includes("Airbag") ||
                          f.includes("Control") ||
                          f.includes("Stability")
                      )
                      .map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                </div>
                <div className="feature-category">
                  <h3>Convenience</h3>
                  <ul>
                    {car.features
                      ?.filter(
                        (f) =>
                          f.includes("Cruise") ||
                          f.includes("Parking") ||
                          f.includes("Camera") ||
                          f.includes("Sunroof")
                      )
                      .map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "variants" && car.variants && (
            <div className="variants">
              <h2>Available Variants</h2>
              <div className="variant-table">
                <table>
                  <thead>
                    <tr>
                      <th>Variant</th>
                      <th>Price</th>
                      <th>Engine</th>
                      <th>Transmission</th>
                      <th>Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    {car.variants.map((variant, index) => (
                      <tr key={index}>
                        <td>{variant.name}</td>
                        <td>{variant.price}</td>
                        <td>{variant.engine}</td>
                        <td>{variant.transmission}</td>
                        <td>
                          {variant.features ? (
                            <ul className="variant-features">
                              {variant.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                              ))}
                            </ul>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "warranty" && car.warranty && (
            <div className="warranty-service">
              <div className="warranty-info">
                <h2>Warranty Information</h2>
                <div className="warranty-card">
                  <div className="warranty-item">
                    <h3>Standard Warranty</h3>
                    <p>
                      {car.warranty.years} years / {car.warranty.kilometers} km
                    </p>
                  </div>
                  {car.warranty.roadsideAssistance && (
                    <div className="warranty-item">
                      <h3>Roadside Assistance</h3>
                      <p>Included</p>
                    </div>
                  )}
                  {car.warranty.batteryWarranty && (
                    <div className="warranty-item">
                      <h3>Battery Warranty</h3>
                      <p>{car.warranty.batteryWarranty}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="service-info">
                <h2>Service Information</h2>
                <div className="service-card">
                  <div className="service-item">
                    <h3>First Service</h3>
                    <p>{car.serviceInterval.firstService}</p>
                  </div>
                  <div className="service-item">
                    <h3>Regular Service Interval</h3>
                    <p>
                      Every {car.serviceInterval.kilometers} km or{" "}
                      {car.serviceInterval.months} months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gallery */}
        {car.bottomImages && (
          <div className="gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {car.bottomImages.map((img, index) => (
                <img key={index} src={img} alt={`${car.title} ${index + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CarDetailPage;
