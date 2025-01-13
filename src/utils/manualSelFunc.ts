import { Player, Match } from '../types';

const manualSelFunc = (firstPlayer: string, secondPlayer: string, playersRecord: Player[]): Match[] => {
  // Find the Player objects for the given player names
  const firstPlayerObj = playersRecord.find((player) => player.plyr === firstPlayer);
  const secondPlayerObj = playersRecord.find((player) => player.plyr === secondPlayer);

  // Validate that both players exist in the record
  if (firstPlayerObj && secondPlayerObj) {
    // Create a new match array with initial scores and ongoing status
    const newMatch: Match[] = [firstPlayerObj, secondPlayerObj].map((player) => ({
      player: player,
      score: 0,
      isongoing: true,
    }));

    // Filter opponents for each player, removing the other player from their `allOps`
    newMatch[0].player.allOps = newMatch[0].player.allOps.filter((op) => op !== newMatch[1].player.plyr);
    newMatch[1].player.allOps = newMatch[1].player.allOps.filter((op) => op !== newMatch[0].player.plyr);

    return newMatch;
  }

  // Return an empty array if either player is not found
  return [];
};

export default manualSelFunc;

