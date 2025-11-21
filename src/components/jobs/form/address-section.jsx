import FormSection from "./form-section";
import FormField from "./form-field";

export default function AddressSection({ formData, setFormData, errors = {} }) {
  return (
    <FormSection title="Address Information">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <FormField
            id="street"
            label="Street"
            required
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="Street Address"
          />
          {errors.street && (
            <p className="text-sm text-red-500 mt-1">
              {Array.isArray(errors.street) ? errors.street.join(", ") : errors.street}
            </p>
          )}
        </div>
        <div>
          <FormField
            id="city"
            label="City"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">
              {Array.isArray(errors.city) ? errors.city.join(", ") : errors.city}
            </p>
          )}
        </div>
        <div>
          <FormField
            id="zip_code"
            label="PIN Code"
            required
            value={formData.zip_code}
            onChange={(e) =>
              setFormData({ ...formData, zip_code: e.target.value })
            }
            placeholder="6-digit PIN code"
            maxLength={6}
          />
          {errors.zip_code && (
            <p className="text-sm text-red-500 mt-1">
              {Array.isArray(errors.zip_code) ? errors.zip_code.join(", ") : errors.zip_code}
            </p>
          )}
        </div>
      </div>
    </FormSection>
  );
}
