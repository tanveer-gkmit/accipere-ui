import FormSection from "./form-section";
import FormField from "./form-field";
import TextAreaField from "./text-area-field";

export default function AdditionalDetailsSection({ formData, setFormData }) {
  return (
    <FormSection title="Additional Details">
      <div className="space-y-4">
        <FormField
          id="currentJobTitle"
          label="Current Job Title"
          value={formData.currentJobTitle}
          onChange={(e) =>
            setFormData({ ...formData, currentJobTitle: e.target.value })
          }
          placeholder="e.g., Senior Developer"
        />
        <TextAreaField
          id="skillSet"
          label="Skill Set"
          value={formData.skillSet}
          onChange={(e) =>
            setFormData({ ...formData, skillSet: e.target.value })
          }
          placeholder="List your skills (e.g., React, Node.js, Python)"
        />
      </div>
    </FormSection>
  );
}
