function transformDate(dateInput: Date | string | null | undefined): string {
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

  // Handle null or undefined input
  if (dateInput === null || dateInput === undefined) {
    return "Onbekende datum";
  }

  // Convert to Date object if the input is a string
  let date: Date;
  if (typeof dateInput === "string") {
    date = new Date(dateInput);
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    return "Ongeldige datum";
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Ongeldige datum";
  }

  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const day: number = date.getDate();
  const month: string = months[date.getMonth()];

  return `${dayOfWeek} ${day} ${month}`;
}

export default transformDate;
