import { Player,Match} from '../types';

const randomSelFunc = (playersRecord:Player[]):Match[] => {
  const shuffledPlayers = [...playersRecord].sort(() => 0.5 - Math.random());
  const selectedPlayers = shuffledPlayers.slice(0, 2);

  const newMatch = selectedPlayers.map((player) => ({
    player: player,
    score: 0,
    isongoing: true,
  }));

  const player1ponents = newMatch[0].player.allOps.filter((op) => op !== newMatch[1].player.plyr);
  const player2ponents = newMatch[1].player.allOps.filter((op) => op !== newMatch[0].player.plyr);

  newMatch[0].player.allOps = player1ponents;
  newMatch[1].player.allOps = player2ponents;

  return newMatch;

}

export default randomSelFunc
