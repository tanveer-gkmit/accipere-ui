import axiosInstance from "./axios";

export const stagesService = {
  async getStages() {
    try {
      const response = await axiosInstance.get("/api/application-statuses/");
      return { data: response.data.results || [], error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.message || "Failed to fetch stages",
      };
    }
  },

  async createStage(stageData) {
    try {
      const response = await axiosInstance.post("/api/application-statuses/", stageData);
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.name?.[0] || "Failed to create stage",
      };
    }
  },

  async updateStage(stageId, stageData) {
    try {
      const response = await axiosInstance.patch(`/api/application-statuses/${stageId}/`, stageData);
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.name?.[0] || "Failed to update stage",
      };
    }
  },

  async deleteStage(stageId) {
    try {
      const response = await axiosInstance.delete(`/api/application-statuses/${stageId}/`);
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.error || "Failed to delete stage",
      };
    }
  },

  async reorderStages(items) {
    try {
      const response = await axiosInstance.post("/api/application-statuses/reorder/", { items });
      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response?.data?.error || "Failed to reorder stages",
      };
    }
  },
};
