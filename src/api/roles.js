import axiosInstance from "./axios";

export const rolesService = {
  async getRoles() {
    try {
      const response = await axiosInstance.get("/api/roles/");
      return { data: response.data.results || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.detail || "Failed to fetch roles",
      };
    }
  },
};
