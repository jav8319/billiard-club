const setLastMatchFunc = (match, LastMatch) => {
  function formatDate(date) {
  // Get day name (short form in Spanish, e.g., "Mie")
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Th", "Fri", "Sat"];
  const dayName = dayNames[date.getDay()];

  // Get month and day
  const month = date.getMonth() + 1; // Months are 0-indexed
  const day = date.getDate();

  // Format time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${dayName} ${month}/${day} ${formattedHour}:${formattedMinutes}${ampm}`;
  }
  const date = new Date();
  if((match.length===2)&&(match[0].score===1||match[1].score===1)){
    const thewinner = match.find((entry) => entry.score === 1).player;
    const theloser = match.find((entry) => entry.score === 0).player

    if(LastMatch.length===0){

      const newLastMatch=[{winner:thewinner.plyr,loser:theloser.plyr,date:formatDate(date)}]
      return newLastMatch
    }else if(LastMatch.length===2||LastMatch.length===1){
      const lastelement=LastMatch[0]
      const firstelement={winner:thewinner.plyr,loser:theloser.plyr,date:formatDate(date)}
      return [firstelement,lastelement]
    }
  }else{
    return LastMatch
  }

}

export default setLastMatchFunc


