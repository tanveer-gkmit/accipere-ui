import axios from "axios";
import axiosInstance from "./axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

export const authService = {
  // Login - Get access and refresh tokens
  async login(email, password) {
    const response = await axios.post(`${API_BASE_URL}/api/auth/token/`, {
      email,
      password,
    });
    
    const { access, refresh } = response.data;
    
    // Store tokens
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    
    return response.data;
  },

  // Refresh access token
  async refreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    
    const { access } = response.data;
    localStorage.setItem("access_token", access);
    
    return response.data;
  },

  // Logout - Blacklist refresh token
  async logout() {
    const refreshToken = localStorage.getItem("refresh_token");
    
    if (refreshToken) {
      try {
        await axiosInstance.post("/api/auth/token/logout/", {
          refresh: refreshToken,
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    
    // Clear tokens regardless of API call success
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("access_token");
  },

  // Get current access token
  getAccessToken() {
    return localStorage.getItem("access_token");
  },

  // Get current refresh token
  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  },
};
