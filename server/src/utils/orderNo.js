export function generateOrderNo() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
  const timePart = `${now.getHours()}`.padStart(2, "0") +
    `${now.getMinutes()}`.padStart(2, "0") +
    `${now.getSeconds()}`.padStart(2, "0");
  const randomPart = `${Math.floor(Math.random() * 1000)}`.padStart(3, "0");

  return `DO${datePart}${timePart}${randomPart}`;
}
