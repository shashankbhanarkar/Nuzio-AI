import React, { useState } from "react";
import { FaCheck, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

const Language = ({ onContinue }) => {
  const [language, setLanguage] = useState("English");

  const [locationEnabled, setLocationEnabled] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  const handleLocationToggle = () => {
    // If location is already enabled, turn it off
    if (locationEnabled) {
      setLocationEnabled(false);
      setLocation(null);
      setLocationError("");
      return;
    }

    // Check browser support
    if (!navigator.geolocation) {
      setLocationError(
        "Location is not supported by your browser."
      );
      return;
    }

    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const locationData = {
          latitude,
          longitude,
        };

        console.log("Location:", locationData);

        setLocation(locationData);
        setLocationEnabled(true);
      },

      (error) => {
        console.error("Location error:", error);

        setLocationEnabled(false);

        if (error.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setLocationError(
            "Unable to determine your location."
          );
        } else if (error.code === 3) {
          setLocationError(
            "Location request timed out."
          );
        } else {
          setLocationError(
            "Unable to access your location."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const handleContinue = () => {
    const data = {
      language: language,
      locationEnabled: locationEnabled,
      location: location,
    };

    console.log("Language Data:", data);

    onContinue(data);
  };

  return (
    <div className="screen">

      {/* Top */}
      <div className="top-logo">
        <span>✦</span> Nuzio AI
      </div>

      <div className="step">
        01 / 06
      </div>

      <div className="page-content">

        <h1>
          Choose your
          <br />
          <span>language.</span>
        </h1>

        <p>
          We'll personalize your daily audio brief.
        </p>

        {/* English */}
        <div
          className={`option ${
            language === "English" ? "selected" : ""
          }`}
          onClick={() => setLanguage("English")}
        >
          <div>
            <strong>English</strong>

            <small>
              British or global English
            </small>
          </div>

          {language === "English" && <FaCheck />}
        </div>

        {/* Hindi */}
        <div
          className={`option ${
            language === "Hindi" ? "selected" : ""
          }`}
          onClick={() => setLanguage("Hindi")}
        >
          <div>
            <strong>हिन्दी</strong>

            <small>
              हिंदी में समाचार
            </small>
          </div>

          {language === "Hindi" && <FaCheck />}
        </div>

        {/* Location */}
        <div
          className={`location-box ${
            locationEnabled ? "location-enabled" : ""
          }`}
        >
          <div className="location-icon">
            <FaMapMarkerAlt />
          </div>

          <div className="location-content">
            <strong>
              Enable Location
            </strong>

            <small>
              {locationEnabled
                ? "Location access enabled."
                : "Get local news tailored to your area."}
            </small>
          </div>

          {/* Toggle */}
          <button
            type="button"
            className={`location-toggle ${
              locationEnabled ? "active" : ""
            }`}
            onClick={handleLocationToggle}
            aria-label="Enable location"
          >
            <span></span>
          </button>
        </div>

        {/* Error */}
        {locationError && (
          <div className="location-error">
            {locationError}
          </div>
        )}

        {/* Location coordinates */}
        {locationEnabled && location && (
          <div className="location-success">
            ✓ Location enabled
          </div>
        )}

      </div>

      {/* Continue */}
      <button
        className="primary-btn"
        onClick={handleContinue}
      >
        Continue
        <FaArrowRight />
      </button>

    </div>
  );
};

export default Language;