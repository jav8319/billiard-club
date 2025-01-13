import { Player, Match } from '../types';

const updtRcrdsFromMatch = (updatedMatches: Match[], playersRecord: Player[]): Player[] => {
  // Loop through all matches in the updatedMatches array
  const winner = updatedMatches[0].score === 1 ? updatedMatches[0].player : updatedMatches[1].player; // Determine winner
    const loser = updatedMatches[0].score === 0 ? updatedMatches[0].player : updatedMatches[1].player;  // Determine loser

    if (winner && loser) {

      // Update playersRecord for winner and loser
      playersRecord = playersRecord.map((p) => {
        
        if (p.plyr === winner.plyr) {

const mywinneroponoent = p.allOps.filter(op => op !== loser.plyr);
          return {
            ...p,
            pys: parseInt(p.pys.toString()) + 1, // Increment player score
            w: parseInt(p.w.toString()) + 1,     
            lsOp: loser.plyr, // Update last opponent
            allOps: mywinneroponoent 
          };
        } else if (p.plyr === loser.plyr) {
          const myloseroponoent = p.allOps.filter(op => op !== winner.plyr);
          return {
            
            ...p,
            pys: parseInt(p.pys.toString()) + 1, // Increment player score
            l: parseInt(p.l.toString()) + 1,     // Increment losses
            lsOp: winner.plyr, 
            allOps: myloseroponoent, 
          };
        }

       
        return p;
      });
    }
  

  return playersRecord;
};

export default updtRcrdsFromMatch;
