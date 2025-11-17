export function formatDate(date) {
  if (!date) return "N/A";
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "N/A";
    return parsedDate.toLocaleDateString();
  } catch {
    return "N/A";
  }
}

export function formatDateTime(date) {
  if (!date) return "N/A";
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "N/A";
    return `${parsedDate.toLocaleDateString()} at ${parsedDate.toLocaleTimeString()}`;
  } catch {
    return "N/A";
  }
}
