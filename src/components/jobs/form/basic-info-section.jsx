import FormSection from "./form-section";
import FormField from "./form-field";

export default function BasicInfoSection({ formData, setFormData, errors = {} }) {
  return (
    <FormSection title="Basic Info">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <FormField
            id="first_name"
            label="First Name"
            required
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            placeholder="First Name"
          />
          {errors.first_name && (
            <p className="text-sm text-red-500 mt-1">
              {Array.isArray(errors.first_name) ? errors.first_name.join(", ") : errors.first_name}
            </p>
          )}
        </div>
        <div>
          <FormField
            id="last_name"
            label="Last Name"
            required
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            placeholder="Last Name"
          />
          {errors.last_name && (
            <p className="text-sm text-red-500 mt-1">
              {Array.isArray(errors.last_name) ? errors.last_name.join(", ") : errors.last_name}
            </p>
          )}
        </div>
        <div>
          <FormField
            id="email"
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {Array.isArray(errors.email) ? errors.email.join(", ") : errors.email}
            </p>
          )}
        </div>
        <div>
          <FormField
            id="phone_no"
            label="Phone"
            type="tel"
            required
            value={formData.phone_no}
            onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
            placeholder="9876543210"
          />
          {errors.phone_no && (
            <p className="text-sm text-red-500 mt-1">
              {Array.isArray(errors.phone_no) ? errors.phone_no.join(", ") : errors.phone_no}
            </p>
          )}
        </div>
      </div>
    </FormSection>
  );
}
