const updtRcrdsFromMatch = (updatedMatch,playersRecord) => {
  const winner = updatedMatch.find((entry) => entry.score === 1).player;
  const loser = updatedMatch.find((entry) => entry.score === 0).player;

  const updatedPlayersRecord = playersRecord.map((p) => {
  if (p.plyr === winner.plyr) {
    return { ...p, pys: parseInt(p.pys) + 1, w: parseInt(p.w) + 1, lsOp: loser.plyr, allOps: winner.allOps };
  } else if (p.plyr === loser.plyr) {
    return { ...p, pys: parseInt(p.pys) + 1, l: parseInt(p.l) + 1, lsOp: winner.plyr, allOps: loser.allOps };
  }
  return p;
  });

  return updatedPlayersRecord;
}

export default updtRcrdsFromMatch;

