import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { toast } from "sonner";

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
          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Basic Info</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91"
                />
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Professional Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalExperience">Total Experience</Label>
                <Input
                  id="totalExperience"
                  value={formData.totalExperience}
                  onChange={(e) =>
                    setFormData({ ...formData, totalExperience: e.target.value })
                  }
                  placeholder="e.g., 5 years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relevantExperience">Relevant Experience</Label>
                <Input
                  id="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relevantExperience: e.target.value,
                    })
                  }
                  placeholder="e.g., 3 years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentCTC">Current CTC</Label>
                <Input
                  id="currentCTC"
                  value={formData.currentCTC}
                  onChange={(e) =>
                    setFormData({ ...formData, currentCTC: e.target.value })
                  }
                  placeholder="₹"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedCTC">Expected CTC</Label>
                <Input
                  id="expectedCTC"
                  value={formData.expectedCTC}
                  onChange={(e) =>
                    setFormData({ ...formData, expectedCTC: e.target.value })
                  }
                  placeholder="₹"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noticePeriod">Notice Period</Label>
                <Input
                  id="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={(e) =>
                    setFormData({ ...formData, noticePeriod: e.target.value })
                  }
                  placeholder="e.g., 30 days"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Address Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  placeholder="Street Address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  placeholder="State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip/Postal Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  placeholder="Zip Code"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Social Links</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Additional Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentJobTitle">Current Job Title</Label>
                <Input
                  id="currentJobTitle"
                  value={formData.currentJobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, currentJobTitle: e.target.value })
                  }
                  placeholder="e.g., Senior Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skillSet">Skill Set</Label>
                <Textarea
                  id="skillSet"
                  value={formData.skillSet}
                  onChange={(e) =>
                    setFormData({ ...formData, skillSet: e.target.value })
                  }
                  placeholder="List your skills (e.g., React, Node.js, Python)"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Upload Resume */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Upload Resume *</h3>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">
                  Upload your resume
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  PDF, DOC, DOCX (Required)
                </p>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleFileChange}
                  className="cursor-pointer max-w-xs mx-auto"
                />
                {formData.resume && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {formData.resume.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
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
