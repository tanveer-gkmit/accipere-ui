import FormSection from "./form-section";
import FormField from "./form-field";

export default function AddressSection({ formData, setFormData }) {
  return (
    <FormSection title="Address Information">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          id="street"
          label="Street"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          placeholder="Street Address"
        />
        <FormField
          id="city"
          label="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="City"
        />
        <FormField
          id="state"
          label="State/Province"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          placeholder="State"
        />
        <FormField
          id="zipCode"
          label="Zip/Postal Code"
          value={formData.zipCode}
          onChange={(e) =>
            setFormData({ ...formData, zipCode: e.target.value })
          }
          placeholder="Zip Code"
        />
      </div>
    </FormSection>
  );
}
