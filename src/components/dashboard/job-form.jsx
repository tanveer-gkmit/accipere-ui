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
  loading = false
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

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
              className="h-11"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="e.g., Engineering, Marketing, Sales"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g., San Francisco, CA or Remote"
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Employment Type *</Label>
              <Select value={formData.employment_type} onValueChange={(value) => handleChange("employment_type", value)} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level *</Label>
              <Select value={formData.experience_level} onValueChange={(value) => handleChange("experience_level", value)} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry">Entry Level</SelectItem>
                  <SelectItem value="Mid">Mid Level</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                </SelectContent>
              </Select>
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
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryMax">Salary Range (Max)</Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salary_max}
                onChange={(e) => handleChange("salary_max", e.target.value)}
                placeholder="80000"
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)} required>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
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
              className="min-h-[150px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements *</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              placeholder="List the required skills, experience, and qualifications..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits & Perks</Label>
            <Textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => handleChange("benefits", e.target.value)}
              placeholder="List the benefits, perks, and what makes your company a great place to work..."
              className="min-h-[100px]"
            />
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
