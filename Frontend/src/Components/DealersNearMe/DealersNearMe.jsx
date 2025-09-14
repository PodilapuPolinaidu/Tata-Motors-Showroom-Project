import React, { useState } from "react";
import "./DealersNearMe.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const DealersNearMe = () => {
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample dealer data for Telangana
  const dealers = [
    {
      id: 1,
      name: "Tata Motors Hyderabad Central",
      address:
        "Survey No 128/2, 1-2, 2/25, Besides Bramrambha Theatre, 25/B, Kukatpally, Hyderabad, Telangana 500072",
      phone: "+91 96430 06652",
      services: ["Sales", "Service", "Spare Parts", "Financing"],
      city: "Hyderabad",
      mapLink:
        "https://www.google.com/maps/place/Tata+Motors+Cars+Showroom+-+Venkataramana+Motors,+Kukatpally/@17.4991683,78.0245731,10z/data=!4m10!1m2!2m1!1s12,+Sardar+Patel+RdTata+Motors+Hyderabad+Central+!3m6!1s0x3bcb91f68af5531d:0x79079b9887c20d74!8m2!3d17.4991683!4d78.3871274!15sCjExMiwgU2FyZGFyIFBhdGVsIFJkIFRhdGEgTW90b3JzIEh5ZGVyYWJhZCBDZW50cmFsIgOIAQFaMiIwMTIgc2FyZGFyIHBhdGVsIHJkIHRhdGEgbW90b3JzIGh5ZGVyYWJhZCBjZW50cmFskgEKY2FyX2RlYWxlcqoBlgEKDS9nLzExYmM2MTE5dDIKCS9tLzAzanh0bRABKiEiHXRhdGEgbW90b3JzIGh5ZGVyYWJhZCBjZW50cmFsKAAyHxABIhuPoh2iNwc3tsst0RbjXf-uTGA9alIc8u002UoyNBACIjAxMiBzYXJkYXIgcGF0ZWwgcmQgdGF0YSBtb3RvcnMgaHlkZXJhYmFkIGNlbnRyYWzgAQA!16s%2Fg%2F11jymwy_j9?authuser=0&entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D",
      timing: "9:00 AM - 6:00 PM",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Tata Motors Warangal",
      address:
        "A and B, No 15/1/422, Sardar Vallabhai Patel Rd, beside Industrial Estate, Vidya Nagar, Warangal, Telangana 506007",
      phone: "+91 7045231713",
      services: ["Sales", "Service", "Spare Parts"],
      city: "Warangal",
      mapLink:
        "https://www.google.com/maps/place/Tata+Motors+Cars+Showroom+-+Venkata+Automobiles,+Mamatha+Hospital+Road/@20.9451786,69.8464136,5z/data=!4m6!3m5!1s0x3a3459d27549de01:0x329d08e13e939bbb!8m2!3d17.2435885!4d80.1619169!16s%2Fg%2F11bwyt99zq?authuser=0&entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D",
      timing: "9:30 AM - 6:30 PM",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Tata Motors Khammam",
      address:
        "Vijay Nagar CNo 6/1, VVC Gardens, 16/100, Mamatha Hospital Rd, opposite Mamta General Hospital, Raghavaiah Nagar, Khammam, Telangana 507001olony, Khammam - 507001",
      phone: "+91 96430 06652",
      services: [
        "Sales",
        "Service",
        "Spare Parts",
        "Financing",
        "Roadside Assistance",
      ],
      city: "Khammam",
      mapLink:
        "https://www.google.com/maps/place/Tata+Motors+Cars+Showroom+-+Venkata+Automobiles,+Mamatha+Hospital+Road/@15.8801496,78.2464083,7z/data=!4m6!3m5!1s0x3a3459d27549de01:0x329d08e13e939bbb!8m2!3d17.2435885!4d80.1619169!16s%2Fg%2F11bwyt99zq?authuser=0&entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D ",
      timing: "9:00 AM - 6:00 PM",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Tata Motors Nizamabad",
      address:
        "M3VW+8GM, bypass road, opp. HP Petrol bunk, Pavan Nagar, Gurubabadi, Nizamabad, Telangana 503003",
      phone: "+91 96430 06652",
      services: ["Sales", "Service"],
      city: "Nizamabad",
      mapLink:
        "https://www.google.com/maps/place/Tata+Motors/@18.6680127,78.0399998,12z/data=!4m10!1m2!2m1!1sTata+Motors+Nizamabad!3m6!1s0x3bcddb7181d45545:0xe6dd09ae9c40450f!8m2!3d18.6933317!4d78.0963001!15sChVUYXRhIE1vdG9ycyBOaXphbWFiYWQiA4gBAVoXIhV0YXRhIG1vdG9ycyBuaXphbWFiYWSSARRtb3Rvcl92ZWhpY2xlX2RlYWxlcqoBZwoNL2cvMTFiYzYxMTl0MgoNL2cvMTFjNzR4NTRscwoJL20vMDNqeHRtEAEyHxABIhuPrbHQO7zGS4H_v1JgTfjsiB7I8IZscYKLvKEyGRACIhV0YXRhIG1vdG9ycyBuaXphbWFiYWTgAQA!16s%2Fg%2F11r4bsxxhn?authuser=0&entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D",
      timing: "9:00 AM - 5:30 PM",
      rating: 4.0,
    },
    {
      id: 5,
      name: "Tata Motors Karimnagar",
      address:
        "H.No 5-8-326, 1/5/176/1, Karimnagar Rd, Govindpalli, Jagtial, Telangana 505327 Road, Karimnagar - 505001",
      phone: "+91 9167025842",
      services: ["Sales", "Service", "Spare Parts", "Financing", "Insurance"],
      city: "Karimnagar",
      mapLink:
        "https://www.google.com/maps/place/Tata+Motors+Cars+Showroom+-+Select+Motors,+Kothirampur/@18.4176937,79.1170604,15z/data=!4m10!1m2!2m1!1sTata+Motors+Karimnagar+cars!3m6!1s0x3bccd968e813f819:0x7e7f66fa194cd1c7!8m2!3d18.4176937!4d79.1361148!15sChtUYXRhIE1vdG9ycyBLYXJpbW5hZ2FyIGNhcnMiA4gBAVodIht0YXRhIG1vdG9ycyBrYXJpbW5hZ2FyIGNhcnOSAQpjYXJfZGVhbGVyqgF_Cg0vZy8xMWJjNjExOXQyCg0vZy8xMWNuNmtnOTJwCgkvbS8wM2p4dG0KBy9tLzBrNGoQASoIIgRjYXJzKAAyHhABIhrZSIhSfk2Ir5unMWSkGXr2X9yk9PZQ_l3N5jIfEAIiG3RhdGEgbW90b3JzIGthcmltbmFnYXIgY2Fyc-ABAA!16s%2Fg%2F11cn6kg92p?authuser=0&entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D",
      timing: "9:30 AM - 6:00 PM",
      rating: 4.3,
    },
    {
      id: 6,
      name: "Tata Motors Hyderabad South",
      address:
        "Plot No 4/14, Kukatpally Housing Board Rd, opposite Cyber Towers, Siddhi Vinayak Nagar, Madhapur, Hyderabad, Telangana 500081",
      phone: "+91 7045227894",
      services: [
        "Sales",
        "Service",
        "Spare Parts",
        "Financing",
        "Customization",
      ],
      city: "Hyderabad",
      mapLink:
        "https://www.google.com/maps/place/Tata+Motors+Cars+Showroom+-+Venkataramana+Motors,+Kukatpally/@17.4991734,78.3845525,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb91f68af5531d:0x79079b9887c20d74!8m2!3d17.4991683!4d78.3871274!16s%2Fg%2F11jymwy_j9?authuser=0&entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D",
      timing: "10:00 AM - 7:00 PM",
      rating: 4.8,
    },
  ];

  // Get unique cities for filter
  const cities = ["All", ...new Set(dealers.map((dealer) => dealer.city))];

  // Filter dealers based on selected city and search query
  const filteredDealers = dealers.filter((dealer) => {
    const matchesCity = selectedCity === "All" || dealer.city === selectedCity;
    const matchesSearch =
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="dealers-page">
      <div className="dealers-hero">
        <div className="hero-content">
          <h1>Find Tata Motors Dealers in Telangana</h1>
          <p>
            Discover authorized Tata Motors dealerships near you for sales,
            service, spare parts, and more
          </p>
        </div>
        <div className="hero-image"></div>
      </div>

      <div className="search-filters">
        <div className="search-box">
          <i className="search-icon"></i>
          <input
            type="text"
            placeholder="Search by dealer name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="city-filter">Filter by City:</label>
          <select
            id="city-filter"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-info">
        <h2>
          {filteredDealers.length} Dealers Found{" "}
          {selectedCity !== "All" ? `in ${selectedCity}` : "in Telangana"}
        </h2>
      </div>

      <div className="dealers-container">
        {filteredDealers.length > 0 ? (
          filteredDealers.map((dealer) => (
            <div key={dealer.id} className="dealer-card">
              <div className="dealer-header">
                <h3>{dealer.name}</h3>
                <div className="rating">
                  {renderStars(dealer.rating)}
                  <span className="rating-value">{dealer.rating}</span>
                </div>
              </div>

              <div className="dealer-info">
                <div className="info-item">
                  <span className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <div>
                    <p className="label">Address</p>
                    <p className="value">{dealer.address}</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="icon">
                    <i className="fas fa-clock"></i>
                  </span>{" "}
                  <div>
                    <p className="label">Opening Hours</p>
                    <p className="value">{dealer.timing}</p>
                  </div>
                </div>

                <div className="info-item">
                  <span className="icon">
                    <i className="fas fa-phone-alt"></i>
                  </span>{" "}
                  <div>
                    <p className="label">Phone</p>
                    <p className="value">{dealer.phone}</p>
                  </div>
                </div>
              </div>

              <div className="services-section">
                <h4>Services Offered</h4>
                <div className="services-list">
                  {dealer.services.map((service, index) => (
                    <span key={index} className="service-tag">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="dealer-actions">
                <a
                  href={dealer.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn map-btn"
                >
                  <span className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>{" "}
                  View on Google Maps
                </a>
                <a href={`tel:${dealer.phone}`} className="action-btn call-btn">
                  <span className="icon">
                    <i className="fas fa-phone-alt"></i>
                  </span>{" "}
                  Call Now
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">..</div>
            <h3>No dealers found</h3>
            <p>Try changing your search criteria or filter settings</p>
          </div>
        )}
      </div>

      <div className="coming-soon-section">
        <div className="coming-soon-content">
          <h2>Enhanced Dealer Locator Coming Soon</h2>
          <p>
            We're working on an interactive map with real-time inventory check,
            service booking, and virtual showroom tours.
          </p>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <span className="icon">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
              </div>
              <h4>Interactive Map</h4>
              <p>Find dealers with precise locations and directions</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <span className="icon">
                  <i className="fas fa-shopping-cart"></i>
                </span>
              </div>
              <h4>Inventory Check</h4>
              <p>See available vehicles at each dealership</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <span className="icon">
                  <i className="fas fa-wrench"></i>
                </span>
              </div>
              <h4>Service Booking</h4>
              <p>Schedule service appointments online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealersNearMe;
