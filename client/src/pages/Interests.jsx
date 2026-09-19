import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Interests = ({ onContinue }) => {

  const [interests, setInterests] = useState([]);

  const interestList = [
    "AI & Technology",
    "Financial Markets",
    "Indian Business",
    "Global Politics",
    "Startups",
    "Science",
    "Health & Medicine",
    "Climate & Energy",
    "Sports",
    "Culture & Lifestyle",
    "Legal & Policy",
  ];

  const toggleInterest = (interest) => {

    if (interests.includes(interest)) {

      setInterests(
        interests.filter(
          (item) => item !== interest
        )
      );

    } else {

      setInterests([
        ...interests,
        interest,
      ]);

    }
  };

  const handleContinue = () => {

    const data = {
      interests: interests,
    };

    console.log("Interest Data:", data);

    onContinue(data);
  };

  return (
    <div className="screen">

      <div className="top-logo">
        <span>✦</span> Nuzio AI
      </div>

      <div className="step">
        03 / 06
      </div>

      <div className="page-content">

        <h1>
          What moves
          <br />
          <span>your world?</span>
        </h1>

        <p>
          Pick topics you'll want to hear about.
        </p>

        <div className="interest-grid">

          {interestList.map((item) => (

            <button
              key={item}
              className={
                interests.includes(item)
                  ? "chip active"
                  : "chip"
              }
              onClick={() =>
                toggleInterest(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      <button
        className="primary-btn"
        onClick={handleContinue}
        disabled={interests.length === 0}
      >
        Continue
        <FaArrowRight />
      </button>

    </div>
  );
};

export default Interests;