import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function JobForm({ 
  initialData = {}, 
  isEditMode = false,
  onSubmit,
  onCancel 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    if (onSubmit) {
      onSubmit(e);
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
              defaultValue={initialData.title || ""}
              placeholder="e.g., Senior Frontend Developer"
              className="h-11"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select defaultValue={initialData.department || ""}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                defaultValue={initialData.location || ""}
                placeholder="e.g., San Francisco, CA or Remote"
                className="h-11"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Employment Type *</Label>
              <Select defaultValue={initialData.type || ""}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level *</Label>
              <Select defaultValue={initialData.experience || ""}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
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
                defaultValue={initialData.salaryMin || ""}
                placeholder="50000"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryMax">Salary Range (Max)</Label>
              <Input
                id="salaryMax"
                type="number"
                defaultValue={initialData.salaryMax || ""}
                placeholder="80000"
                className="h-11"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Job Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              defaultValue={initialData.description || ""}
              placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements *</Label>
            <Textarea
              id="requirements"
              defaultValue={initialData.requirements || ""}
              placeholder="List the required skills, experience, and qualifications..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits & Perks</Label>
            <Textarea
              id="benefits"
              defaultValue={initialData.benefits || ""}
              placeholder="List the benefits, perks, and what makes your company a great place to work..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            {isEditMode ? "Update Job" : "Publish Job"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
