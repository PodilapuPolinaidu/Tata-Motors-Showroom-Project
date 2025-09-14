import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Carshow from "../Carshownav/Carshow";
import logo from "../../assets/tatalogo.png";
import video1 from "../../assets/slide1.mp4";
// import video1 from "../../assets/slide4.avif";

import image2 from "../../assets/slide2.avif";
import image3 from "../../assets/slide3.avif";
import image4 from "../../assets/slide4.avif";
import image5 from "../../assets/slide5.avif";
import image6 from "../../assets/slide6.avif";
import image7 from "../../assets/slide7.avif";
import image8 from "../../assets/slide8.avif";
import image9 from "../../assets/slide9.avif";
import image10 from "../../assets/slide10.avif";
import image11 from "../../assets/slide11.avif";

import "./navbar.css";

const NavbarWithCarousel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef();
  const [wasPlaying, setWasPlaying] = useState(false);

  const carouselItems = [
    image5,
    {
      type: "video",
      src: video1,
      thumbnail: image5,
    },
    image2,
    image3,
    image4,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
  ];

  useEffect(() => {
    const tryPlayVideo = () => {
      if (carouselItems[currentIndex]?.type === "video" && videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current
          .play()
          .then(() => {
            setUserInteracted(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            videoRef.current.play();
          });
      }
    };

    tryPlayVideo();

    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        tryPlayVideo();
      }
    };

    window.addEventListener("click", handleUserInteraction);
    return () => window.removeEventListener("click", handleUserInteraction);
  }, [currentIndex, userInteracted]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle video playback state on carousel index change
  useEffect(() => {
    if (carouselItems[currentIndex]?.type === "video") {
      if (wasPlaying) {
        videoRef.current
          ?.play()
          .catch((e) => console.log("Video play error:", e));
      }
    }
  }, [currentIndex, wasPlaying]);

  const goToNext = () => {
    if (currentIndex === carouselItems.length - 1) return;
    if (carouselItems[currentIndex]?.type === "video") {
      setWasPlaying(!videoRef.current?.paused);
      videoRef.current?.pause();
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentIndex === 0) return;
    if (carouselItems[currentIndex]?.type === "video") {
      setWasPlaying(!videoRef.current?.paused);
      videoRef.current?.pause();
    }
    setCurrentIndex((prev) => prev - 1);
  };

  const goToIndex = (index) => {
    if (carouselItems[currentIndex]?.type === "video") {
      setWasPlaying(!videoRef.current?.paused);
      videoRef.current?.pause();
    }
    setCurrentIndex(index);
  };

  const renderItem = (item, index) => {
    if (item.type === "video") {
      return (
        <div className="video-container">
          <video
            ref={videoRef}
            src={item.src}
            muted={!userInteracted}
            loop={false}
            playsInline
            className="carousel-video"
            poster={item.thumbnail}
            autoPlay={index === 0}
          />
          {!userInteracted && (
            <div className="sound-prompt">
              <p>Click anywhere to enable sound</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <img src={item} alt={`Slide ${index + 1}`} className="carousel-image" />
      );
    }
  };

  const getNavbarClass = () => {
    if (isMenuOpen) return "navbar black";
    if (isScrolled) return "navbar black";
    return "navbar transparent";
  };

  return (
    <div className="navbar-with-carousel">
      <nav className={getNavbarClass()}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logo} alt="TATA MOTORS Logo" className="logo-image" />
          </div>

          <div className="navbar-icons">
            <div className="search-quicklinks-container">
              {isSearchOpen && (
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search vehicles, models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              )}

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="search-toggle"
              >
                {isSearchOpen ? <FaTimes size={18} /> : <FaSearch size={18} />}
              </button>

              {isSearchOpen && (
                <div className="quick-links-dropdown">
                  <div className="quick-links-section">
                    <h3 className="quick-links-title">Quick Links</h3>
                    <ul className="quick-links-list">
                      <li>
                        <Link to="/test-drive">➔ Schedule a Test Drive</Link>
                      </li>
                      <li>
                        <Link to="/brand-stories">➔ Brand Stories</Link>
                      </li>
                      <li>
                        <Link to="/digital-showroom">➔ Digital Showroom</Link>
                      </li>
                      <li>
                        <Link to="/dealers-near-me">➔ Dealers near me</Link>
                      </li>
                    </ul>
                  </div>

                  {searchQuery && (
                    <div className="search-results">
                      <p>Search results for: "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <Carshow />
          </div>
        )}
      </nav>

      <div className="carousel-container">
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.5s ease",
            }}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="carousel-item">
                {renderItem(item, index)}
              </div>
            ))}
          </div>

          <button
            className={`carousel-control prev ${
              currentIndex === 0 ? "disabled" : ""
            }`}
            onClick={goToPrev}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className={`carousel-control next ${
              currentIndex === carouselItems.length - 1 ? "disabled" : ""
            }`}
            onClick={goToNext}
            disabled={currentIndex === carouselItems.length - 1}
          >
            &gt;
          </button>

          <div className="carousel-indicators">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => goToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarWithCarousel;
