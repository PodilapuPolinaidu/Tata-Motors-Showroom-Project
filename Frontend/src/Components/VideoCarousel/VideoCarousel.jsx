import React, { useState, useEffect, useRef } from "react";
import { tataCarsData } from "./data";
import "./VideoCarousel.css";

const CarShowcase = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [videoState, setVideoState] = useState("intro");
  const videoRef = useRef(null);
  const bufferVideoRef = useRef(null);
  const model = tataCarsData[currentModelIndex];

  // Initialize buffer video
  useEffect(() => {
    const bufferVideo = document.createElement("video");
    bufferVideo.preload = "auto";
    bufferVideoRef.current = bufferVideo;

    return () => {
      bufferVideo.remove();
    };
  }, []);

  // Video sequence state machine
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      switch (videoState) {
        case "intro":
          setVideoState("entry");
          break;
        case "entry":
          setVideoState("loop");
          break;
        case "exit":
          setCurrentModelIndex((prev) => (prev + 1) % tataCarsData.length);
          setVideoState("entry");
          break;
        default:
          break;
      }
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => video.removeEventListener("ended", handleVideoEnd);
  }, [videoState]);

  // Preload next video in sequence
  useEffect(() => {
    if (!bufferVideoRef.current) return;

    let nextVideoUrl = "";
    if (videoState === "intro") {
      nextVideoUrl = tataCarsData[0].videos.entry;
    } else if (videoState === "entry") {
      nextVideoUrl = model.videos.loop;
    } else if (videoState === "loop") {
      nextVideoUrl = model.videos.exit;
    } else if (videoState === "exit") {
      const nextModel =
        tataCarsData[(currentModelIndex + 1) % tataCarsData.length];
      nextVideoUrl = nextModel.videos.entry;
    }

    if (nextVideoUrl) {
      bufferVideoRef.current.src = nextVideoUrl;
      bufferVideoRef.current.load();
    }
  }, [videoState, currentModelIndex]);

  // Video playback control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSources = {
      intro: tataCarsData[0].videos.intro,
      entry: model.videos.entry,
      loop: model.videos.loop,
      exit: model.videos.exit,
    };

    video.src = videoSources[videoState];
    video.currentTime = 0;
    video.loop = videoState === "loop";

    const playVideo = () => {
      video.play().catch((e) => {
        console.error("Playback error:", e);
        if (video.readyState < 3) {
          video.addEventListener("canplay", () => video.play(), { once: true });
        }
      });
    };

    if (video.readyState > 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
      video.pause();
    };
  }, [videoState, currentModelIndex]);

  const handleNext = () => {
    if (videoState === "loop") {
      setVideoState("exit");
    }
  };

  const handlePrev = () => {
    if (videoState === "loop") {
      setCurrentModelIndex(
        (prev) => (prev - 1 + tataCarsData.length) % tataCarsData.length
      );
      setVideoState("entry");
    }
  };

  const skipIntro = () => {
    setVideoState("entry");
    setCurrentModelIndex(0); // Ensure we start with first model after skip
  };

  if (!model) return null;

  return (
    <div className="car-showcase">
      <video
        ref={videoRef}
        key={`${model.modelId}-${videoState}`}
        muted
        playsInline
        className="car-video"
      />

      {/* Skip button only shown during intro */}
      {videoState === "intro" && (
        <button className="skip-button" onClick={skipIntro}>
          Skip Intro
        </button>
      )}

      <div className="controls">
        <button onClick={handlePrev} disabled={videoState !== "loop"}>
          &lt;
        </button>
        <button onClick={handleNext} disabled={videoState !== "loop"}>
          &gt;
        </button>
      </div>

      {/* Hide model info during intro */}
      {videoState !== "intro" && (
        <div className="model-info">
          {/* <h2>{model.model}</h2> */}
          <p>Starting From </p>
          <p className="price">{model.startingPrice}</p>
          <button className="explore-btn">Explore</button>
        </div>
      )}
    </div>
  );
};

export default CarShowcase;
