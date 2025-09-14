import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./carshow.css";
import SignUpModal from "../AuthPage/SignUpModal";
import CarShowcase from "../VideoCarousel/VideoCarousel";
import TestDrive from "../NavbarWithCarousel/CarFeature/TestDrive";
import TataAccessories from "../TataAccessories/TataAccessories";

const sidebarLinks = [
  { label: "Sign In", link: "#", highlight: true },
  { label: "Digital Showroom", link: "#" },
  { label: "Test Drive", link: "/test-drive" },
  { label: "Accessories", link: "#" },
  {
    label: "Service",
    link: "#",
    subMenu: [
      "Owner's Manual",
      "Bluetooth Compatibility",
      "General Tips",
      "Fuel Saving Tips",
      "Best Value Service",
      "Value Added Service",
      "Recall information",
      "Android Auto User Guide",
      "Information On warranty",
      "Contact Us",
    ],
  },
  { label: "Exchange Car", link: "#" },
  { label: "Rewards", link: "#" },
  { label: "Account", link: "#" },
  { label: "Dealer Locator", link: "#" },
  { label: "Sitemap", link: "#" },
  {
    label: "About Us",
    link: "#",
    subMenu: ["Our Story", "News and Events"],
  },
];

const carData = [
  {
    id: 1,
    name: "Curvv",
    image: new URL("../../assets/Curvvnav.webp", import.meta.url).href,
    link: "/cars/2",
  },
  {
    id: 2,
    name: "Curvv.ev",
    image: new URL("../../assets/curvv-evnav.webp", import.meta.url).href,
    link: "/cars/2",
  },
  {
    id: 3,
    name: "All New Altroz",
    image: new URL("../../assets/altroz-nav.webp", import.meta.url).href,
    link: "/cars/1",
  },
  {
    id: 4,
    name: "Tiago",
    image: new URL("../../assets/tiagonav.webp", import.meta.url).href,
    link: "/cars/3",
  },
  {
    id: 5,
    name: "Tiago.ev",
    image: new URL("../../assets/tiago-ev nav.webp", import.meta.url).href,
    link: "/cars/3",
  },
  {
    id: 6,
    name: "Tigor",
    image: new URL("../../assets/tigor nav.webp", import.meta.url).href,
    link: "/cars/4",
  },
  {
    id: 7,
    name: "Tigor.ev",
    image: new URL(
      "../../assets/tigor-ve-xz-magnetic-red nav.webp",
      import.meta.url
    ).href,
    link: "/cars/4",
  },
  {
    id: 8,
    name: "Punch",
    image: new URL("../../assets/punch-navigation nav.webp", import.meta.url)
      .href,
    link: "/cars/5",
  },
  {
    id: 9,
    name: "Punch.ev",
    image: new URL(
      "../../assets/punch-ev-empowered-oxide nav.webp",
      import.meta.url
    ).href,
    link: "/cars/5",
  },
  {
    id: 10,
    name: "Nexon",
    image: new URL("../../assets/nexon nav.webp", import.meta.url).href,
    link: "/cars/6",
  },
  {
    id: 11,
    name: "Nexon.ev",
    image: new URL("../../assets/nexon ev.webp", import.meta.url).href,
    link: "/cars/6",
  },
  {
    id: 12,
    name: "Harrier",
    image: new URL("../../assets/harrier-navigation nav.webp", import.meta.url)
      .href,
    link: "/cars/7",
  },
  {
    id: 13,
    name: "Safari",
    image: new URL("../../assets/safari-navigation nav.webp", import.meta.url)
      .href,
    link: "/cars/8",
  },
];

const carLinks = {
  Curvv: 2,
  "Curvv.ev": 2,
  "All New Altroz": 1,
  Tiago: 3,
  "Tiago.ev": 3,
  Tigor: 4,
  "Tigor.ev": 4,
  Punch: 5,
  "Punch.ev": 5,
  Nexon: 6,
  "Nexon.ev": 6,
  Harrier: 7,
  Safari: 8,
};

const Carshownav = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showDigitalShowroom, setShowDigitalShowroom] = useState(false);
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSidebarLinkClick = (item) => {
    if (item.label === "Sign In") {
      setShowSignUpModal(true);
    } else if (item.label === "Digital Showroom") {
      setShowDigitalShowroom(true);
      setShowAccessories(false);
    } else if (item.label === "Test Drive") {
      setShowTestDriveModal(true);
      setSelectedCar(null);
      setShowAccessories(false);
    } else if (item.label === "Accessories") {
      setShowAccessories(true);
      setShowDigitalShowroom(false);
    }
  };

  return (
    <div className="carshow-container">
      {showSignUpModal && <SignUpModal />}

      {showTestDriveModal && (
        <TestDrive
          car={selectedCar || { title: "Any Tata Car" }}
          onClose={() => setShowTestDriveModal(false)}
        />
      )}

      {showDigitalShowroom && (
        <div className="overlay">
          <div className="overlay-content">
            <button
              className="close-overlay"
              onClick={() => setShowDigitalShowroom(false)}
            >
              ×
            </button>
            <CarShowcase />
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="carshow-sidebar">
        <div className="sidebar-header">
          <h2 id="tata">Tata Motors</h2>
        </div>
        <ul className="carshow-links">
          {sidebarLinks.map((item, index) => (
            <li
              key={index}
              className="carshow-link-item"
              onMouseEnter={() => item.subMenu && setExpandedIndex(index)}
              onMouseLeave={() => item.subMenu && setExpandedIndex(null)}
            >
              <div
                className={`carshow-link ${item.highlight ? "highlight" : ""} ${
                  showAccessories && item.label === "Accessories"
                    ? "active"
                    : ""
                }`}
                onClick={() => handleSidebarLinkClick(item)}
              >
                {item.label}
                {item.subMenu && <span className="carshow-arrow">▸</span>}
              </div>

              {item.subMenu && expandedIndex === index && (
                <ul className="carshow-submenu">
                  {item.subMenu.map((sub, subIndex) => (
                    <li key={subIndex} className="carshow-sublink">
                      <a href="#">{sub}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="carshow-main">
        {showAccessories ? (
          <TataAccessories />
        ) : showDigitalShowroom ? null : (
          <>
            <div className="carshow-header">
              <h2 className="carshow-heading">Our Models</h2>
              <p className="carshow-subheading">
                Drive NEW FOREVER. A whole new range of cars from Tata Motors.
              </p>
            </div>

            <div className="carshow-grid">
              {carData.map((car) => (
                <div className="carshow-card" key={car.id}>
                  <img
                    src={car.image}
                    alt={car.name}
                    className="carshow-image"
                  />
                  <h3>{car.name}</h3>
                  <div className="carshow-card-buttons">
                    <Link
                      to={`/cars/${carLinks[car.name] || car.id}`}
                      className="carshow-link-button primary"
                    >
                      Learn More
                    </Link>
                    {/* <button
                        className="carshow-link-button secondary"
                        onClick={() => handleCarSelection(car)}
                      >
                        Test Drive
                      </button> */}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Carshownav;
