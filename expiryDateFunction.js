// Get the current date and time
const now = new Date();

// Define the target date and time (Year, Month (0-11), Day, Hours, Minutes, Seconds)
const targetDate = new Date("2025-02-21 05:10:20"); // Example: December 25, 2024, 10:00:00
console.log(targetDate);

// Calculate the difference in milliseconds
const differenceInMilliseconds = targetDate - now;

// Convert the difference from milliseconds to seconds
const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

console.log(
  `Time in seconds from now to the target date: ${differenceInSeconds} seconds`
);
