export function formatSalaryRange(salaryMin, salaryMax) {
  if (salaryMin && salaryMax) {
    return `₹${salaryMin} - ₹${salaryMax}`;
  }
  if (salaryMin) {
    return `₹${salaryMin}+`;
  }
  return `Up to ₹${salaryMax}`;
}
