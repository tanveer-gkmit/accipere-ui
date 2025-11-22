import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function JobForm({ 
  initialData = {}, 
  isEditMode = false,
  onSubmit,
  onCancel,
  loading = false,
  serverErrors = {}
}) {
  const defaultFormData = {
    title: "",
    department: "",
    location: "",
    employment_type: "",
    experience_level: "",
    salary_min: "",
    salary_max: "",
    description: "",
    requirements: "",
    benefits: "",
    status: "Open",
  };

  const [formData, setFormData] = useState({
    ...defaultFormData,
    ...initialData,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required select fields and show errors
    const newErrors = {};
    if (!formData.employment_type) newErrors.employment_type = true;
    if (!formData.experience_level) newErrors.experience_level = true;
    if (!formData.status) newErrors.status = true;
    
    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      // Focus on first empty required select
      if (!formData.employment_type) {
        document.getElementById('type')?.focus();
      } else if (!formData.experience_level) {
        document.getElementById('experience')?.focus();
      } else if (!formData.status) {
        document.getElementById('status')?.focus();
      }
      return;
    }
    
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Senior Frontend Developer"
              className={`h-11 ${serverErrors.title ? "border-red-500" : ""}`}
              required
            />
            {serverErrors.title && (
              <p className="text-sm text-red-500">{Array.isArray(serverErrors.title) ? serverErrors.title[0] : serverErrors.title}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="e.g., Engineering, Marketing, Sales"
                className={`h-11 ${serverErrors.department ? "border-red-500" : ""}`}
                required
              />
              {serverErrors.department && (
                <p className="text-sm text-red-500">{Array.isArray(serverErrors.department) ? serverErrors.department[0] : serverErrors.department}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g., San Francisco, CA or Remote"
                className={`h-11 ${serverErrors.location ? "border-red-500" : ""}`}
                required
              />
              {serverErrors.location && (
                <p className="text-sm text-red-500">{Array.isArray(serverErrors.location) ? serverErrors.location[0] : serverErrors.location}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Employment Type *</Label>
              <Select value={formData.employment_type} onValueChange={(value) => handleChange("employment_type", value)}>
                <SelectTrigger id="type" className={`h-11 ${validationErrors.employment_type || serverErrors.employment_type ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.employment_type && (
                <p className="text-sm text-red-500">Please select an employment type</p>
              )}
              {serverErrors.employment_type && (
                <p className="text-sm text-red-500">{Array.isArray(serverErrors.employment_type) ? serverErrors.employment_type[0] : serverErrors.employment_type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level *</Label>
              <Select value={formData.experience_level} onValueChange={(value) => handleChange("experience_level", value)}>
                <SelectTrigger id="experience" className={`h-11 ${validationErrors.experience_level || serverErrors.experience_level ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry">Entry Level</SelectItem>
                  <SelectItem value="Mid">Mid Level</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.experience_level && (
                <p className="text-sm text-red-500">Please select an experience level</p>
              )}
              {serverErrors.experience_level && (
                <p className="text-sm text-red-500">{Array.isArray(serverErrors.experience_level) ? serverErrors.experience_level[0] : serverErrors.experience_level}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Salary Range (Min)</Label>
              <Input
                id="salaryMin"
                type="number"
                value={formData.salary_min}
                onChange={(e) => handleChange("salary_min", e.target.value)}
                placeholder="50000"
                className={`h-11 ${serverErrors.salary_min ? "border-red-500" : ""}`}
              />
              {serverErrors.salary_min && (
                <p className="text-sm text-red-500">{Array.isArray(serverErrors.salary_min) ? serverErrors.salary_min[0] : serverErrors.salary_min}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryMax">Salary Range (Max)</Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salary_max}
                onChange={(e) => handleChange("salary_max", e.target.value)}
                placeholder="80000"
                className={`h-11 ${serverErrors.salary_max ? "border-red-500" : ""}`}
              />
              {serverErrors.salary_max && (
                <p className="text-sm text-red-500">{Array.isArray(serverErrors.salary_max) ? serverErrors.salary_max[0] : serverErrors.salary_max}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status" className={`h-11 ${validationErrors.status || serverErrors.status ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.status && (
              <p className="text-sm text-red-500">Please select a status</p>
            )}
            {serverErrors.status && (
              <p className="text-sm text-red-500">{Array.isArray(serverErrors.status) ? serverErrors.status[0] : serverErrors.status}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Job Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              className={`min-h-[150px] ${serverErrors.description ? "border-red-500" : ""}`}
              required
            />
            {serverErrors.description && (
              <p className="text-sm text-red-500">{Array.isArray(serverErrors.description) ? serverErrors.description[0] : serverErrors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements *</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              placeholder="List the required skills, experience, and qualifications..."
              className={`min-h-[120px] ${serverErrors.requirements ? "border-red-500" : ""}`}
              required
            />
            {serverErrors.requirements && (
              <p className="text-sm text-red-500">{Array.isArray(serverErrors.requirements) ? serverErrors.requirements[0] : serverErrors.requirements}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits & Perks</Label>
            <Textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => handleChange("benefits", e.target.value)}
              placeholder="List the benefits, perks, and what makes your company a great place to work..."
              className={`min-h-[100px] ${serverErrors.benefits ? "border-red-500" : ""}`}
            />
            {serverErrors.benefits && (
              <p className="text-sm text-red-500">{Array.isArray(serverErrors.benefits) ? serverErrors.benefits[0] : serverErrors.benefits}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? "Saving..." : isEditMode ? "Update Job" : "Publish Job"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
