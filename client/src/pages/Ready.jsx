import React from "react";
import {
  FaCheck,
  FaBriefcase,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

const Ready = ({
  userData,
  onContinue,
}) => {

  return (
    <div className="screen ready-screen">

      <div className="success-icon">
        <FaCheck />
      </div>

      <h1>
        You're ready,
        <br />

        <span>
          {userData?.name || "Aarav"}.
        </span>
      </h1>

      <p>
        Your first brief will be ready
        <br />
        tomorrow morning.
      </p>

      <div className="summary">

        <div className="summary-title">
          YOUR NEWS PROFILE
        </div>

        {/* Profession */}
        <div className="summary-row">

          <FaBriefcase />

          <span>
            {userData?.profession || "Technology"}
          </span>

          <FaCheck />

        </div>

        {/* Interests */}
        <div className="summary-row">

          <FaUser />

          <span>
            {userData?.interests?.length
              ? userData.interests.join(", ")
              : "AI, Markets, Startups"}
          </span>

          <FaCheck />

        </div>

        {/* Language */}
        <div className="summary-row">

          <FaUser />

          <span>
            {userData?.language || "English"}
          </span>

          <FaCheck />

        </div>

        {/* Time */}
        <div className="summary-row">

          <span>☀️</span>

          <span>
            Daily at 7:00 AM
          </span>

          <FaCheck />

        </div>

      </div>

      <button
        className="primary-btn"
        onClick={onContinue}
      >
        Start Listening
        <FaArrowRight />
      </button>

    </div>
  );
};

export default Ready;