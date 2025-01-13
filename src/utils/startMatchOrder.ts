


import { Player, Match } from '../types';
import {updateAllOpponents,getRandomElement} from './utilsfuncs';

const startMatchOrder=(playersRecord: Player[]): Match[] => {
  const sortedPlayers = playersRecord.sort((a, b) => {
  if (a.pys === b.pys) return b.w - a.w;
    return a.pys - b.pys;
  });
  const player1 = sortedPlayers[0];
  const player2tocheck = sortedPlayers[1];
  const player2tocheckupdated = updateAllOpponents(sortedPlayers, player2tocheck);
  const player1updated = updateAllOpponents(sortedPlayers, player1);
  if ((player1.lsOp!==player2tocheckupdated.plyr)&&
  (player1updated.allOps.includes(player2tocheckupdated.plyr))) {
    const player2Name = player2tocheckupdated.plyr;
    const player1OponentsArr = player1updated.allOps.filter((op) => op !== player2Name);
    const player2OponentsArr = player2tocheckupdated.allOps.filter((op) => op !== player1.plyr);
    const player1topass = { ...player1updated, allOps: player1OponentsArr };
    const player2topass = { ...player2tocheckupdated, allOps: player2OponentsArr };
    const newMatch5 = [
    { player: player1topass, score: 0, isongoing: true },
    { player: player2topass, score: 0, isongoing: true },
    ];
    return newMatch5;
  } else {
    let selectable: string[] = [];
    if(player1updated.allOps.length>2){
      const minPlays = Math.min(...playersRecord.map(obj => parseInt(obj.pys.toString())));
      const newArray = playersRecord.filter(obj => parseInt(obj.pys.toString()) === minPlays).map(obj => obj.plyr);
      if(newArray.length>0){
        const fairorder=newArray.filter((p)=>player1updated.allOps.includes(p))
        if(fairorder.length>0){
        selectable=fairorder
        }
      }
    }
    const player2Name = selectable.length>0?getRandomElement(selectable):getRandomElement(player1updated.allOps)
    const player2 = sortedPlayers.find((p) => p.plyr === player2Name);
    if (!player2) {
      throw new Error('Player 2 not found');
    }
    const player2updated = updateAllOpponents(sortedPlayers, player2);
    const player1OponentsArr = player1updated.allOps.filter((op) => op !== player2Name);
    const player2OponentsArr = player2updated.allOps.filter((op) => op !== player1.plyr);
    const player1topass = { ...player1updated, allOps: player1OponentsArr };
    const player2topass = { ...player2updated, allOps: player2OponentsArr };
    const newMatch5 = [
    { player: player1topass, score: 0, isongoing: true },
    { player: player2topass, score: 0, isongoing: true },
    ];
    return newMatch5
  }
}

export default startMatchOrder