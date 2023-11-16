export default function getFormattedDate(
  format: "year-month-day" | "month-day" | "month-day-year"
): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = currentDate.getDate().toString().padStart(2, "0");

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
