import { useState, useCallback, useEffect } from "react";
import axiosInstance from "@/api/axios";

const MIME_TYPE_PDF = "application/pdf";

// Helper function to convert base64 to blob
const base64ToBlob = (base64String, mimeType = MIME_TYPE_PDF) => {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return new Blob([bytes], { type: mimeType });
};

// Helper function to convert resume data to blob
const convertToBlob = (resume) => {
  if (typeof resume === "string") {
    return base64ToBlob(resume);
  }
  return new Blob([resume], { type: MIME_TYPE_PDF });
};

export function useResume() {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl);
      }
    };
  }, [resumeUrl]);

  const fetchResume = useCallback(async (applicationId) => {
    if (!applicationId) {
      const errorMsg = "Application ID is required";
      setError(errorMsg);
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(
        `/api/applications/${applicationId}/`,
        { responseType: "json" }
      );

      const { resume } = response.data;

      if (!resume) {
        throw new Error("Resume not found");
      }

      const blob = convertToBlob(resume);
      const blobUrl = URL.createObjectURL(blob);
      
      setResumeUrl(blobUrl);

      return { url: blobUrl, filename: "resume.pdf" };
    } catch (err) {
      const errorMessage = 
        err.response?.data?.detail || 
        err.message || 
        "Failed to fetch resume";
      
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadResume = useCallback(async (applicationId, filename) => {
    try {
      const response = await axiosInstance.get(
        `/api/applications/${applicationId}/`,
        { responseType: "json" }
      );

      const { resume, first_name, last_name } = response.data;

      if (!resume) {
        throw new Error("Resume not found");
      }

      const blob = convertToBlob(resume);
      const url = URL.createObjectURL(blob);
      
      const defaultFilename = 
        first_name && last_name 
          ? `${first_name}_${last_name}_Resume.pdf`
          : "resume.pdf";

      const link = document.createElement("a");
      link.href = url;
      link.download = filename || defaultFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading resume:", err);
      throw err;
    }
  }, []);

  const cleanup = useCallback(() => {
    if (resumeUrl) {
      URL.revokeObjectURL(resumeUrl);
      setResumeUrl(null);
    }
  }, [resumeUrl]);

  return {
    resumeUrl,
    loading,
    error,
    fetchResume,
    downloadResume,
    cleanup,
  };
}
