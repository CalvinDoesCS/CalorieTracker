export default function getFormattedDate(
  format: "year-month-day" | "month-day" | "month-day-year",
  date: Date
): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");

  if (format === "year-month-day") {
    return `${year}-${month}-${day}`;
  } else if (format === "month-day") {
    return `${month}-${day}`;
  } else if (format === "month-day-year") {
    return `${month}-${day}-${year}`;
  } else {
    throw new Error("Invalid format specified");
  }
}
