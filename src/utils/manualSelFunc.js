const manualSelFunc = (firstPlayer, secondPlayer, playersRecord) => {
  
  const firstPlayerObj = playersRecord.find((player) => player.plyr === firstPlayer);
  const secondPlayerObj = playersRecord.find((player) => player.plyr === secondPlayer);

  if(
    firstPlayerObj !== undefined &&
    secondPlayerObj !== undefined &&
    firstPlayerObj !== null &&
    secondPlayerObj !== null &&
    firstPlayerObj !== '' &&
    secondPlayerObj !== ''
  ) {
    const newMatch = [firstPlayerObj, secondPlayerObj].map((player) => ({
    player: player,
    score: 0,
    isongoing: true,
    }));
    const player1ponents = newMatch[0].player.allOps.filter((op) => op !== newMatch[1].player.plyr);
    const player2ponents = newMatch[1].player.allOps.filter((op) => op !== newMatch[0].player.plyr);
    newMatch[0].player.allOps = player1ponents;
    newMatch[1].player.allOps = player2ponents;
    return newMatch;
  }else{
    return []
  }
}

export default manualSelFunc
