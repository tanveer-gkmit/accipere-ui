import { Card } from "@/components/ui/card";

export function AddressCard({ street, city, zipCode }) {
  if (!street && !city && !zipCode) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Address</h3>
      <div className="space-y-2">
        {street && <p className="text-foreground">{street}</p>}
        {(city || zipCode) && (
          <p className="text-foreground">
            {[city, zipCode].filter(Boolean).join(", ")}
          </p>
        )}
      </div>
    </Card>
  );
}
