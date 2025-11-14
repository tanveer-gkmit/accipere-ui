import FormSection from "./FormSection";
import FormField from "./FormField";

export default function SocialLinksSection({ formData, setFormData }) {
  return (
    <FormSection title="Social Links">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          id="linkedin"
          label="LinkedIn"
          value={formData.linkedin}
          onChange={(e) =>
            setFormData({ ...formData, linkedin: e.target.value })
          }
          placeholder="https://linkedin.com/in/yourprofile"
        />
        <FormField
          id="github"
          label="GitHub"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          placeholder="https://github.com/yourusername"
        />
      </div>
    </FormSection>
  );
}
