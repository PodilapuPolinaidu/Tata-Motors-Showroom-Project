// BrandStories.jsx
import React, { useState, useEffect } from "react";
import "./BrandStories.css";

const BrandStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Enhanced data for Tata Motors brand stories
  const stories = [
    {
      id: 1,
      title: "Pioneering Indian Automotive Industry",
      description:
        "Since 1945, Tata Motors has led India's automotive revolution, creating vehicles that combine performance, reliability, and value. From our first commercial vehicle to becoming a household name, we've driven India's progress for over seven decades.",
      image: new URL(
        "../../assets/Pioneering Indian Automotive Industry.jpg",
        import.meta.url
      ).href,

      cta: "Discover our history",
      date: "1945",
      // icon: "🚛"
    },
    {
      id: 2,
      title: "Innovation in Electric Mobility",
      description:
        "Leading the charge towards sustainable transportation with our cutting-edge electric vehicles designed for the modern Indian consumer. Our Nexon EV and Tigor EV are revolutionizing how India moves, with zero emissions and maximum efficiency.",
      image: new URL(
        "../../assets/Innovation in Electric Mobility.jpg",
        import.meta.url
      ).href,

      cta: "Explore EVs",
      date: "Present",
      // icon: "⚡"
    },
    {
      id: 3,
      title: "Global Presence",
      description:
        "With a footprint in over 50 countries, Tata Motors represents Indian engineering excellence on the world stage. Our vehicles are designed for global standards while maintaining the rugged durability needed for diverse terrains and conditions.",
      image: new URL("../../assets/Global Presence.jpg", import.meta.url).href,

      cta: "View global map",
      date: "Worldwide",
      // icon: "🌎"
    },
    {
      id: 4,
      title: "Commitment to Safety",
      description:
        "Every Tata vehicle is engineered with the latest safety features to protect you and your loved ones on every journey. With 5-star Global NCAP ratings, we're setting new benchmarks for automotive safety in India.",
      image: new URL("../../assets/Commitment to Safety.jpg", import.meta.url)
        .href,

      cta: "Learn about safety",
      date: "Always",
      // icon: "🛡️"
    },
    {
      id: 5,
      title: "Sustainable Manufacturing",
      description:
        "Our manufacturing processes prioritize environmental responsibility with water conservation, renewable energy, and waste reduction initiatives. We're committed to carbon neutrality by 2045.",
      image: new URL(
        "../../assets/Sustainable Manufacturing.webp",
        import.meta.url
      ).href,

      date: "Future",
      // icon: "♻️"
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setActiveStory((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, stories.length]);

  const nextStory = () => {
    setActiveStory((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    setAutoPlay(false); // Stop autoplay when user interacts
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
    setAutoPlay(false); // Stop autoplay when user interacts
  };

  const goToStory = (index) => {
    setActiveStory(index);
    setAutoPlay(false); // Stop autoplay when user interacts
  };

  return (
    <div className="brand-stories">
      <div className="stories-header">
        <h2>Tata Motors Brand Stories</h2>
        <p>Discover the journey of India's leading automotive manufacturer</p>
      </div>

      <div className="stories-container">
        <div className="main-story">
          <div className="story-image">
            <img
              src={stories[activeStory].image}
              alt={stories[activeStory].title}
            />
            <div className="story-overlay">
              <div className="story-date">
                <span className="story-icon">{stories[activeStory].icon}</span>
                {stories[activeStory].date}
              </div>
            </div>
          </div>

          <div className="story-content">
            <div className="content-wrapper">
              <h3>{stories[activeStory].title}</h3>
              <p>{stories[activeStory].description}</p>
              <button className="cta-button">
                {stories[activeStory].cta}
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="story-controls">
          <button className="nav-button prev" onClick={prevStory}>
            ‹
          </button>

          <div className="story-indicators">
            {stories.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeStory ? "active" : ""}`}
                onClick={() => goToStory(index)}
              />
            ))}
          </div>

          <button className="nav-button next" onClick={nextStory}>
            ›
          </button>

          <button
            className={`auto-play-toggle ${autoPlay ? "active" : ""}`}
            onClick={() => setAutoPlay(!autoPlay)}
            aria-label={autoPlay ? "Pause auto play" : "Start auto play"}
          >
            {autoPlay ? "❚❚" : "▶"}
          </button>
        </div>

        <div className="stories-grid">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`story-card ${index === activeStory ? "active" : ""}`}
              onClick={() => goToStory(index)}
            >
              <div className="card-image">
                <img src={story.image} alt={story.title} />
                <div className="card-overlay">
                  <span className="card-icon">{story.icon}</span>
                </div>
              </div>
              <div className="card-content">
                <h4>{story.title}</h4>
                <p>{story.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandStories;
