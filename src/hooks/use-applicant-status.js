import { useState } from "react";
import axiosInstance from "@/api/axios";
import { useToast } from "@/hooks/use-toast";

export function useApplicantStatus(applicantId) {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStatus = async (statusId, userId, notes) => {
    setIsUpdating(true);
    try {
      const payload = {};
      if (statusId) payload.current_status = statusId;
      if (userId !== undefined) payload.assigned_user_id = userId;
      if (notes?.trim()) payload.status_notes = notes.trim();

      await axiosInstance.patch(`/api/applications/${applicantId}/`, payload);
      
      const response = await axiosInstance.get(`/api/applications/${applicantId}/`);
      
      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully",
      });
      
      return response.data;
    } catch (err) {
      // Extract error message from various possible error formats
      let errorMessage = "Failed to update status";
      
      if (err.response?.data) {
        const errorData = err.response.data;
        
        // Check for field-specific errors (like current_status)
        if (errorData.current_status) {
          errorMessage = Array.isArray(errorData.current_status) 
            ? errorData.current_status[0] 
            : errorData.current_status;
        } else if (errorData.assigned_user_id) {
          errorMessage = Array.isArray(errorData.assigned_user_id)
            ? errorData.assigned_user_id[0]
            : errorData.assigned_user_id;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating };
}
