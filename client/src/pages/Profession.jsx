import React, { useState } from "react";
import {
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";

const Profession = ({ onContinue }) => {

  const [profession, setProfession] = useState("");

  const professions = [
    "Technology",
    "Finance",
    "Marketing",
    "Healthcare",
    "Consulting",
    "Education",
    "Government",
    "Real Estate",
  ];

  const handleContinue = () => {

    const data = {
      profession: profession,
    };

    console.log("Profession Data:", data);

    onContinue(data);
  };

  return (
    <div className="screen">

      <div className="top-logo">
        <span>✦</span> Nuzio AI
      </div>

      <div className="step">
        02 / 06
      </div>

      <div className="page-content">

        <h1>
          What's your
          <br />
          <span>profession?</span>
        </h1>

        <p>
          This helps us tailor your news around your day.
        </p>

        <div className="profession-grid">

          {professions.map((item) => (

            <button
              key={item}
              className={
                profession === item
                  ? "chip active"
                  : "chip"
              }
              onClick={() => setProfession(item)}
            >

              <FaBriefcase />

              {item}

            </button>

          ))}

        </div>

      </div>

      <button
        className="primary-btn"
        onClick={handleContinue}
        disabled={!profession}
      >
        Continue
        <FaArrowRight />
      </button>

    </div>
  );
};

export default Profession;