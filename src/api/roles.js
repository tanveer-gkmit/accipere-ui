import axiosInstance from "./axios";

export const rolesService = {
  async getRoles() {
    try {
      const response = await axiosInstance.get("/api/roles/");
      return { data: response.data.results || [] };
    } catch (error) {
      return {
        error: error.response?.data?.detail || "Failed to fetch roles",
      };
    }
  },
};
