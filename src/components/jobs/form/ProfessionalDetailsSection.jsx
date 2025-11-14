import FormSection from "./FormSection";
import FormField from "./FormField";

export default function ProfessionalDetailsSection({ formData, setFormData }) {
  return (
    <FormSection title="Professional Details">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          id="totalExperience"
          label="Total Experience"
          value={formData.totalExperience}
          onChange={(e) =>
            setFormData({ ...formData, totalExperience: e.target.value })
          }
          placeholder="e.g., 5 years"
        />
        <FormField
          id="relevantExperience"
          label="Relevant Experience"
          value={formData.relevantExperience}
          onChange={(e) =>
            setFormData({ ...formData, relevantExperience: e.target.value })
          }
          placeholder="e.g., 3 years"
        />
        <FormField
          id="currentCTC"
          label="Current CTC"
          value={formData.currentCTC}
          onChange={(e) =>
            setFormData({ ...formData, currentCTC: e.target.value })
          }
          placeholder="₹"
        />
        <FormField
          id="expectedCTC"
          label="Expected CTC"
          value={formData.expectedCTC}
          onChange={(e) =>
            setFormData({ ...formData, expectedCTC: e.target.value })
          }
          placeholder="₹"
        />
        <FormField
          id="noticePeriod"
          label="Notice Period"
          value={formData.noticePeriod}
          onChange={(e) =>
            setFormData({ ...formData, noticePeriod: e.target.value })
          }
          placeholder="e.g., 30 days"
        />
      </div>
    </FormSection>
  );
}
