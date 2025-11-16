export default function FormSection({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">{title}</h3>
      {children}
    </div>
  );
}
