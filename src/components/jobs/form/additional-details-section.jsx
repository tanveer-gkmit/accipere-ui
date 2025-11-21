import FormSection from "./form-section";
import FormField from "./form-field";
import TextAreaField from "./text-area-field";

export default function AdditionalDetailsSection({ formData, setFormData, errors = {} }) {
  return (
    <FormSection title="Additional Details">
      <div className="space-y-4">
        <FormField
          id="current_job_title"
          label="Current Job Title"
          value={formData.current_job_title}
          onChange={(e) =>
            setFormData({ ...formData, current_job_title: e.target.value })
          }
          placeholder="e.g., Senior Developer"
        />
      </div>
    </FormSection>
  );
}
