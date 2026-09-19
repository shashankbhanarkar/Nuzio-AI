import React, { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
} from "react-icons/fa";

import {
  getPersonalizedNews,
} from "../services/api";

const PersonalizedNews = ({
  userData,
}) => {

  const [news, setNews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [playing, setPlaying] =
    useState(false);


  useEffect(() => {

    const loadNews = async () => {

      try {

        const data =
          await getPersonalizedNews();

        setNews(data.news);

      } catch (error) {

        console.error(error);

        setError(
          "Unable to load personalized news."
        );

      } finally {

        setLoading(false);

      }

    };


    loadNews();

  }, []);


  if (loading) {

    return (
      <div className="screen">
        <h2>
          Loading your news...
        </h2>
      </div>
    );

  }


  if (error) {

    return (
      <div className="screen">
        <h2>
          {error}
        </h2>
      </div>
    );

  }


  return (
    <div className="news-screen">

      <header className="news-header">

        <div className="top-logo">
          <span>✦</span>
          Nuzio AI
        </div>

      </header>


      <div className="news-content">

        <div className="greeting">

          <span>
            GOOD MORNING,{" "}
            {userData?.name || "USER"}
          </span>

          <h1>
            Things
            <br />
            <em>worth knowing.</em>
          </h1>

          <p>
            Your personalized morning briefing.
          </p>

        </div>


        {/* NEWS */}

        {news.map((item) => (

          <div
            className="news-card"
            key={item._id}
          >

            <div className="news-category">
              {item.category}
            </div>

            <h2>
              {item.title}
            </h2>

            <p>
              {item.description}
            </p>


            <div className="news-footer">

              <span>
                {item.tags?.join(" · ")}
              </span>

              <span>
                {item.language}
              </span>

            </div>

          </div>

        ))}


        {news.length === 0 && (

          <div className="news-card">

            <h2>
              No personalized news found.
            </h2>

            <p>
              Try selecting more interests.
            </p>

          </div>

        )}

      </div>


      {/* AUDIO PLAYER */}

      <div className="audio-player">

        <div className="player-info">

          <small>
            NOW PLAYING
          </small>

          <strong>
            Your Morning Brief
          </strong>

          <span>
            Personalized for you
          </span>

        </div>


        <div className="progress">

          <div></div>

        </div>


        <div className="player-controls">

          <button>
            ↶
          </button>


          <button
            className="play-btn"
            onClick={() =>
              setPlaying(!playing)
            }
          >

            {playing
              ? <FaPause />
              : <FaPlay />
            }

          </button>


          <button>
            ↷
          </button>

        </div>

      </div>

    </div>
  );
};

export default PersonalizedNews;