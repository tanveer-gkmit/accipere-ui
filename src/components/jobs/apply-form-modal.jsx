import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { axiosInstance } from "@/api";
import BasicInfoSection from "./form/basic-info-section";
import ProfessionalDetailsSection from "./form/professional-details-section";
import AddressSection from "./form/address-section";
import SocialLinksSection from "./form/social-links-section";
import AdditionalDetailsSection from "./form/additional-details-section";
import FormSection from "./form/form-section";
import FileUploadField from "./form/file-upload-field";

const initialFormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone_no: "",
  total_experience: "",
  relevant_experience: "",
  current_ctc: "",
  expected_ctc: "",
  notice_period: "",
  street: "",
  city: "",
  zip_code: "",
  linkedin: "",
  github: "",
  current_job_title: "",
  resume: null,
};

export default function ApplyFormModal({ jobId, jobTitle, isOpen, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // clear previous error
    setErrors({});

    if (!jobId) {
      toast.error("Job ID is missing. Please try again.");
      return;
    }

    try {
      setSubmitting(true);

      const apiFormData = new FormData();
      apiFormData.append("job_id", jobId);

      // Add all fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== "resume") {
          apiFormData.append(key, value);
        }
      });

      if (formData.resume) {
        apiFormData.append("resume_file", formData.resume);
      }

      await axiosInstance.post("/api/applications/", apiFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Application Submitted!", {
        description: `Your application for ${jobTitle} has been received.`,
      });
      // reset the form
      setFormData(initialFormState);
      onClose();
    } catch (err) {
      console.error("Error submitting application:", err);

      if (err.response?.data) {
        setErrors(err.response.data);
        toast.error("Unable to submit application", {
          description: "Please check the form and correct any highlighted errors.",
        });
      } else {
        toast.error(err.message || "Failed to submit application");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection formData={formData} setFormData={setFormData} errors={errors} />
          <ProfessionalDetailsSection formData={formData} setFormData={setFormData} errors={errors} />
          <AddressSection formData={formData} setFormData={setFormData} errors={errors} />
          <SocialLinksSection formData={formData} setFormData={setFormData} errors={errors} />
          <AdditionalDetailsSection formData={formData} setFormData={setFormData} errors={errors} />

          <FormSection title="Upload Resume *">
            <FileUploadField
              id="resume"
              label="Upload your resume"
              required
              accept=".pdf"
              onChange={handleFileChange}
              selectedFile={formData.resume}
              description="PDF only (Required, max 5MB)"
            />
            {errors.resume_file && (
              <p className="text-sm text-red-500 mt-1">
                {Array.isArray(errors.resume_file) ? errors.resume_file.join(", ") : errors.resume_file}
              </p>
            )}
          </FormSection>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-background py-4 border-t">
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
