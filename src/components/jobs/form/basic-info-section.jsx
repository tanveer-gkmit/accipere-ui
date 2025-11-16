import FormSection from "./form-section";
import FormField from "./form-field";

export default function BasicInfoSection({ formData, setFormData }) {
  return (
    <FormSection title="Basic Info">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          required
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          placeholder="First Name"
        />
        <FormField
          id="lastName"
          label="Last Name"
          required
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          placeholder="Last Name"
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email@example.com"
        />
        <FormField
          id="phone"
          label="Phone"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+91"
        />
      </div>
    </FormSection>
  );
}
