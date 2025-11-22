import axiosInstance from "./axios";

export const usersService = {
  async getUsers() {
    try {
      const response = await axiosInstance.get("/api/users/");
      return { data: response.data.results || [] };
    } catch (error) {
      return {
        error: error.response?.data?.detail || "Failed to fetch users",
      };
    }
  },

  async createUser(userData) {
    try {
      const response = await axiosInstance.post("/api/users/", userData);
      return { data: response.data };
    } catch (error) {
      return {
        error: error.response?.data.error || "Failed to create user",
      };
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await axiosInstance.patch(`/api/users/${userId}/`, userData);
      return { data: response.data };
    } catch (error) {
      return {
        error: error.response?.data.error || "Failed to update user",
      };
    }
  },

  async deleteUser(userId) {
    try {
      const response = await axiosInstance.delete(`/api/users/${userId}/`);
      return { data: response.data };
    } catch (error) {
      return {
        
        error: error.response?.data?.error || "Failed to delete user",
      };
    }
  },

  async resetPassword(userId) {
    try {
      const response = await axiosInstance.post(`/api/users/${userId}/reset-password/`);
      return { data: response.data };
    } catch (error) {
      return {
        error: error.response?.data?.detail || "Failed to reset password",
      };
    }
  },
};
