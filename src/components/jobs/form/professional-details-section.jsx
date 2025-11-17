import FormSection from "./form-section";
import FormField from "./form-field";

export default function ProfessionalDetailsSection({ formData, setFormData, errors = {} }) {
  return (
    <FormSection title="Professional Details">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          id="total_experience"
          label="Total Experience (years)"
          type="number"
          value={formData.total_experience}
          onChange={(e) =>
            setFormData({ ...formData, total_experience: e.target.value })
          }
          placeholder="e.g., 5"
        />
        <FormField
          id="relevant_experience"
          label="Relevant Experience (years)"
          type="number"
          value={formData.relevant_experience}
          onChange={(e) =>
            setFormData({ ...formData, relevant_experience: e.target.value })
          }
          placeholder="e.g., 3"
        />
        <FormField
          id="current_ctc"
          label="Current CTC"
          type="number"
          value={formData.current_ctc}
          onChange={(e) =>
            setFormData({ ...formData, current_ctc: e.target.value })
          }
          placeholder="₹"
        />
        <FormField
          id="expected_ctc"
          label="Expected CTC"
          type="number"
          value={formData.expected_ctc}
          onChange={(e) =>
            setFormData({ ...formData, expected_ctc: e.target.value })
          }
          placeholder="₹"
        />
        <FormField
          id="notice_period"
          label="Notice Period"
          value={formData.notice_period}
          onChange={(e) =>
            setFormData({ ...formData, notice_period: e.target.value })
          }
          placeholder="e.g., 30 days"
        />
      </div>
    </FormSection>
  );
}
