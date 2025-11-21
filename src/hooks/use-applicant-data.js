import { useState, useEffect, useMemo } from "react";
import axiosInstance from "@/api/axios";
import { useToast } from "@/hooks/use-toast";

export function useApplicantData(applicantId) {
  const { toast } = useToast();
  const [applicantData, setApplicantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allStages, setAllStages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch stages and users once on mount
  useEffect(() => {
    const fetchStagesAndUsers = async () => {
      try {
        const [stagesResponse, usersResponse] = await Promise.all([
          axiosInstance.get("/api/application-statuses/"),
          axiosInstance.get("/api/users/?simple=true")
        ]);
        
        setAllStages(stagesResponse.data.results || []);
        
        const users = Array.isArray(usersResponse.data) 
          ? usersResponse.data 
          : (usersResponse.data.results || []);
        setAllUsers(users);
      } catch (err) {
        console.error("Error fetching stages or users:", err);
        setAllUsers([]);
      }
    };

    fetchStagesAndUsers();
  }, []);

  // Fetch applicant data once when applicantId changes
  useEffect(() => {
    if (!applicantId) return;

    const fetchApplicantData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`/api/applications/${applicantId}/`);
        setApplicantData(response.data);
      } catch (err) {
        const errorMessage = 
          err.response?.data?.detail || 
          err.message || 
          "Failed to fetch applicant details";
        
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantData();
  }, [applicantId]);

  const stages = useMemo(() => 
    allStages.map(stage => ({
      value: stage.id,
      label: stage.name,
      order: stage.order_sequence,
    })), 
    [allStages]
  );

  return {
    applicantData,
    loading,
    error,
    stages,
    allStages,
    allUsers,
    setApplicantData,
  };
}
