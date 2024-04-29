import moment from "moment"; // Assuming Moment.js is installed

function formatTime(dateTimeString: string): string {
  try {
    const formattedTime = moment(dateTimeString).format("HH:mm, DD/MM/YYYY");
    return formattedTime;
  } catch (error) {
    console.error("Invalid date/time string:", error);
    return "Invalid Date"; // Or return any default value you prefer for invalid input
  }
}

export { formatTime };
