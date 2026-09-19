import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// ==========================================
// REGISTER
// ==========================================

export const registerUser = async (userData) => {

  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};


// ==========================================
// LOGIN
// ==========================================

export const loginUser = async (userData) => {

  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};

export const updateUserPreferences = async (preferences) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    "/auth/preferences",
    preferences,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ==========================================
// PERSONALIZED NEWS
// ==========================================

export const getPersonalizedNews = async () => {

  const token =
    localStorage.getItem("token");

  const response = await API.get(
    "/news/personalized",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};