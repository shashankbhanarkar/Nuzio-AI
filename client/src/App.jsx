import React, { useState } from "react";

import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import Language from "../src/pages/Language";
import Profession from "../src/pages/Profession";
import Interests from "../src/pages/Interests";
import Ready from "../src/pages/Ready";
import PersonalizedNews from "../src/pages/PersonalizedNews";
import { updateUserPreferences } from "./services/api";

import "./App.css";

function App() {
  const [page, setPage] = useState("register");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    language: "",
    profession: "",
    interests: [],
  });

  // REGISTER → LOGIN
  const handleRegister = () => {
    setPage("login");
  };

  // LOGIN → LANGUAGE
  const handleLogin = (user) => {
    setUserData((previous) => ({
      ...previous,
      ...user,
    }));

    setPage("language");
  };

  // LANGUAGE → PROFESSION
  const handleLanguage = (data) => {
    setUserData((previous) => ({
      ...previous,
      ...data,
    }));

    setPage("profession");
  };

  // PROFESSION → INTERESTS
  const handleProfession = (data) => {
    setUserData((previous) => ({
      ...previous,
      ...data,
    }));

    setPage("interests");
  };

  // INTERESTS → READY
  const handleInterests = async (data) => {
    const preferences = {
      ...userData,
      ...data,
    };

    await updateUserPreferences(preferences);

    setUserData((previous) => ({
      ...previous,
      ...data,
    }));

    setPage("ready");
  };

  // READY → NEWS
  const handleReady = () => {
    setPage("news");
  };

  let content;

  switch (page) {
    case "register":
      content = (
        <Register
          onRegister={handleRegister}
          onLogin={() => setPage("login")}
        />
      );
      break;

    case "login":
      content = (
        <Login
          onLogin={handleLogin}
          onRegister={() => setPage("register")}
        />
      );
      break;

    case "language":
      content = <Language onContinue={handleLanguage} />;
      break;

    case "profession":
      content = <Profession onContinue={handleProfession} />;
      break;

    case "interests":
      content = <Interests onContinue={handleInterests} />;
      break;

    case "ready":
      content = <Ready userData={userData} onContinue={handleReady} />;
      break;

    case "news":
      content = <PersonalizedNews userData={userData} />;
      break;

    default:
      content = (
        <Register
          onRegister={handleRegister}
          onLogin={() => setPage("login")}
        />
      );
  }

  return <div className="app">{content}</div>;
}

export default App;