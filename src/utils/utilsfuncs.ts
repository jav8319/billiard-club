import { Player, Match } from '../types';
// Add a new player to the players record
export const addPlayer = (plyr: string, playersRecord: Player[]): Player[] => {
  let uniqueName = plyr;
  let count = 1;

  while (playersRecord.some(player => player.plyr === uniqueName)) {
    uniqueName = `${plyr}(${count})`;
    count++;
  }

  const newPlayer: Player = {
    plyr: uniqueName,
    pys: 0,
    w: 0,
    l: 0,
    lsOp: '',
    allOps: []
  };

  let updatedPlayersRecord = [...playersRecord, newPlayer];

  updatedPlayersRecord = updatedPlayersRecord.map(player => {
    const allOtherPlayers = updatedPlayersRecord
      .filter(otherPlayer =>
        otherPlayer.plyr !== player.plyr &&
        otherPlayer.plyr !== player.lsOp
      )
      .map(otherPlayer => otherPlayer.plyr);

    return {
      ...player,
      pys: 0,
      w: 0,
      l: 0,
      allOps: allOtherPlayers,
    };
  });

  return updatedPlayersRecord;
};
  
  // Remove a player from the players record


  export const removePlayerUtil = (player: Player, playersRecord: Player[]): Player[] => {
    // Filter out the player to be removed from the playersRecord
    const updatedPlayersRecord = playersRecord.filter(p => p.plyr !== player.plyr);
  
    return updatedPlayersRecord.map(playermp => {
     
      const allOtherOpponents = updatedPlayersRecord.map(otherPlayer => otherPlayer.plyr);
  
      if (playermp.allOps.length > 0) {
   
        const validOpponents = playermp.allOps.filter(op => allOtherOpponents.includes(op));
  
        return {
          ...playermp,
          allOps: validOpponents, // Updated opponents
        };
      } else {
        return playermp; // No changes needed if `allOps` is empty
      }
    });
  };
  
  // Update all opponents for a given element in the array


  export const updateAllOpponents = (myarray:Player[], arrelement: Player): Player  => {
    if (!arrelement.allOps || arrelement.allOps.length === 0) {
      if (myarray.length > 2) {
        arrelement.allOps = myarray
          .filter(item =>
            item.plyr !== arrelement.plyr &&
            item.plyr !== arrelement.lsOp
          )
          .map(item => item.plyr);
      } else {
        arrelement.allOps = myarray
          .filter(item => item.plyr !== arrelement.plyr)
          .map(item => item.plyr);
      }
    }

    return arrelement; // Return the updated `arrelement` (optional)
  };
  
  // Update match array with filtered opponents

  export const updateMatchArr = (recordsarray: Player[], matcharray: Match[]): Match[] => {
    const allcomponentsinrecords = recordsarray.map(p => p.plyr);

    let arraytoreturn = matcharray.map(match => {
      const filteredOpponents = match.player.allOps.filter(opponent =>
        allcomponentsinrecords.includes(opponent)
      );

      return {
        ...match,
        player: {
          ...match.player,
          allOps: filteredOpponents,
        },
      };
    });

    return arraytoreturn;
  };
  
  // Get a random element from an array
  export const getRandomElement = (arr:any[]) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('The input must be a non-empty array.');
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };






  