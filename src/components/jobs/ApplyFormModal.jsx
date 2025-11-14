import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BasicInfoSection from "./form/BasicInfoSection";
import ProfessionalDetailsSection from "./form/ProfessionalDetailsSection";
import AddressSection from "./form/AddressSection";
import SocialLinksSection from "./form/SocialLinksSection";
import AdditionalDetailsSection from "./form/AdditionalDetailsSection";
import FormSection from "./form/FormSection";
import FileUploadField from "./form/FileUploadField";

export default function ApplyFormModal({ jobTitle, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    totalExperience: "",
    relevantExperience: "",
    currentLocation: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
    linkedin: "",
    github: "",
    currentJobTitle: "",
    skillSet: "",
    resume: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Application Submitted Successfully!", {
      description: `Your application for ${jobTitle} has been received.`,
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      totalExperience: "",
      relevantExperience: "",
      currentLocation: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      street: "",
      city: "",
      zipCode: "",
      state: "",
      linkedin: "",
      github: "",
      currentJobTitle: "",
      skillSet: "",
      resume: null,
    });
    onClose();
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
          <BasicInfoSection formData={formData} setFormData={setFormData} />
          
          <ProfessionalDetailsSection
            formData={formData}
            setFormData={setFormData}
          />
          
          <AddressSection formData={formData} setFormData={setFormData} />
          
          <SocialLinksSection formData={formData} setFormData={setFormData} />
          
          <AdditionalDetailsSection
            formData={formData}
            setFormData={setFormData}
          />

          <FormSection title="Upload Resume *">
            <FileUploadField
              id="resume"
              label="Upload your resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              selectedFile={formData.resume}
              description="PDF, DOC, DOCX (Required)"
            />
          </FormSection>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-background py-4 border-t">
            <Button type="submit" className="flex-1">
              Submit Application
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
