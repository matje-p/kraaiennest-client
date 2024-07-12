function transformDate(dateInput: Date | string): string {
  const daysOfWeek: string[] = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
  const months: string[] = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];

  // Convert to Date object if the input is a string
  let date: Date;
  if (typeof dateInput === "string") {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const day: number = date.getDate();
  const month: string = months[date.getMonth()];

  return `${dayOfWeek} ${day} ${month}`;
}

export default transformDate;
