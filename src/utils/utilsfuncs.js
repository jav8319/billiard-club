export const addPlayer = (playerName, playersRecord) => {
let uniqueName = playerName;
let count = 1;
while (playersRecord.some(player => player.playerName === uniqueName)) {
uniqueName = `${playerName}(${count})`;
count++;
}
const newPlayer = {
playerName: uniqueName,
plays: 0,
wins: 0,
loses: 0,
lastoponent: '',
alloponents: [],
};
let updatedPlayersRecord = [...playersRecord, newPlayer];
updatedPlayersRecord = updatedPlayersRecord.map(player => {
const allOtherPlayers = updatedPlayersRecord
.filter(otherPlayer =>
otherPlayer.playerName !== player.playerName &&
otherPlayer.playerName !== player.lastoponent
)
.map(otherPlayer => otherPlayer.playerName);

return {
...player,plays: 0,
wins: 0,
loses: 0,
alloponents: allOtherPlayers,
};
});
return updatedPlayersRecord;
};

export const removePlayerUtil = (player, playersRecord) => {
const updatedPlayersRecord = playersRecord.filter(p => p.playerName !== player.playerName);
return updatedPlayersRecord.map(playermp => {
const allOtherOponents = updatedPlayersRecord.map(otherPlayer => otherPlayer.playerName);
const alloponentwithnoplayer = allOtherOponents.filter(op => op !== playermp.playerName);
return {
...playermp,
alloponents: alloponentwithnoplayer,
};
});
};

export const updateAllOpponents = (myarray, arrelement) =>  {
if (!arrelement.alloponents || arrelement.alloponents.length === 0) {
// Create a list of playerNames from `myarray` excluding `arrelement.playerName` and `arrelement.lastoponent`
if(myarray.length > 2){
arrelement.alloponents = myarray
.filter(item => 
item.playerName !== arrelement.playerName && 
item.playerName !== arrelement.lastoponent
)
.map(item => item.playerName);
}else{
arrelement.alloponents = myarray
.filter(item => 
item.playerName !== arrelement.playerName
)
.map(item => item.playerName);
}
}

return arrelement; // Return the updated `arrelement` (optional)
}

export const updateMatchArr = (recordsarray, matcharray) =>{
const allcomponentsinrecords = recordsarray.map((p) => p.playerName);
let arraytoreturn = matcharray.map((match) => {
const filteredOpponents = match.player.alloponents.filter((opponent) =>
allcomponentsinrecords.includes(opponent)
);
return {
...match,
player: {
...match.player,
alloponents: filteredOpponents,
},
};
});

return arraytoreturn;
}

export const getRandomElement = (arr) =>  {
if (!Array.isArray(arr) || arr.length === 0) {
throw new Error('The input must be a non-empty array.');
}
const randomIndex = Math.floor(Math.random() * arr.length);
return arr[randomIndex];
}