import { LastMatch, Match } from '../types';

const setLastMatchFunc = (match: Match[], lastMatch: LastMatch[]): LastMatch[] => {
  // Helper function to format the date
  function formatDate(date: Date): string {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayNames[date.getDay()];

    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${dayName} ${month}/${day} ${formattedHour}:${formattedMinutes}${ampm}`;
  }

  const date = new Date();

  // Validate match conditions
  if (match.length === 2 && (match[0].score === 1 || match[1].score === 1)) {
    const winner = match.find((entry) => entry.score === 1)?.player;
    const loser = match.find((entry) => entry.score === 0)?.player;

   
    if (!winner || !loser) {
      throw new Error("Winner or loser not found in match data.");
    }

  
    const newEntry: LastMatch = {
      winner: winner.plyr,
      loser: loser.plyr,
      date: formatDate(date),
    };

    // Handle LastMatch scenarios
    if (lastMatch.length === 0) {
      return [newEntry];
    } else if (lastMatch.length === 1 || lastMatch.length === 2) {
      return [newEntry, lastMatch[0]];
    }
  }

  // If no valid match condition is met, return the current LastMatch
  return lastMatch;
};

export default setLastMatchFunc;


