function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes}, ${day}/${month}-${year}`;
}

export default formatDate;
