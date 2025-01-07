import React, { useState, useEffect } from 'react';
import {addPlayer,removePlayerUtil,updateAllOpponents,getRandomElement,updateMatchArr} from '../utils/utilsfuncs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import About from '../components/About';
function BilliardClubApp() {
  const [playerName, setPlayerName] = useState('');
  const [playersRecord, setPlayersRecord] = useState(() => {
    const savedPlayersRecord = localStorage.getItem('playersRecordxx');
    return savedPlayersRecord ? JSON.parse(savedPlayersRecord) : [];
  });

  const [match, setMatch] = useState(() => {
    const savedMatch = localStorage.getItem('matchxx');
    return savedMatch ? JSON.parse(savedMatch) : [];
  });

  const [isMatchOngoing, setIsMatchOngoing] = useState(false);

  useEffect(() => {
    const IsMatchOngoing = match[0]?.isongoing;
    setIsMatchOngoing(IsMatchOngoing);
    localStorage.setItem('matchxx', JSON.stringify(match));
  }, [match]);

  const handleAddPlayer = () => {
    if (playerName) {
      if (playerName.length > 8) {
        alert('Player name cannot exceed 8 characters.');
        return;
      }
      const updatedPlayersRecord = addPlayer(playerName, playersRecord);
      setPlayersRecord(updatedPlayersRecord);
      localStorage.setItem('playersRecordxx', JSON.stringify(updatedPlayersRecord));
      setPlayerName('');
    }
  };
  
  const removePlayer = (player) => {
const mynewrecords=removePlayerUtil(player,playersRecord);
    setPlayersRecord(mynewrecords);
    localStorage.setItem('playersRecordxx', JSON.stringify(mynewrecords));
  };
  

  const startMatch = () => {
    if (playersRecord.length < 2) {
      alert("At least two players are required to start a match!");
      return;
    }

    const sortedPlayers = playersRecord.sort((a, b) => {
      if (a.plays === b.plays) return a.wins - b.wins;
      return a.plays - b.plays;
    });

    const player1 = sortedPlayers[0];
    const player2tocheck = sortedPlayers[1];
    const player2tocheckupdated = updateAllOpponents(sortedPlayers, player2tocheck);
    const player1updated = updateAllOpponents(sortedPlayers, player1);

    if ((player2tocheckupdated.lastoponent !== player1.playerName) && 
    (player1updated.alloponents.includes(player2tocheckupdated.playerName))) {
      const player2Name = player2tocheckupdated.playerName;
      const player1OponentsArr = player1updated.alloponents.filter((op) => op !== player2Name);
      const player2OponentsArr = player2tocheckupdated.alloponents.filter((op) => op !== player1.playerName);
      const player1topass = { ...player1updated, alloponents: player1OponentsArr };
      const player2topass = { ...player2tocheckupdated, alloponents: player2OponentsArr };

      const newMatch5 = [
        { player: player1topass, score: 0, isongoing: true },
        { player: player2topass, score: 0, isongoing: true },
      ];

      setMatch(newMatch5);
      localStorage.setItem('matchxx', JSON.stringify(newMatch5));
    } else {
      const player2Name = getRandomElement(player1updated.alloponents);
      const player2 = sortedPlayers.find((p) => p.playerName === player2Name);
      const player2updated = updateAllOpponents(sortedPlayers, player2);

      const player1OponentsArr = player1updated.alloponents.filter((op) => op !== player2Name);
      const player2OponentsArr = player2updated.alloponents.filter((op) => op !== player1.playerName);

      const player1topass = { ...player1updated, alloponents: player1OponentsArr };
      const player2topass = { ...player2updated, alloponents: player2OponentsArr };

      const newMatch5 = [
        { player: player1topass, score: 0, isongoing: true },
        { player: player2topass, score: 0, isongoing: true },
      ];

      setMatch(newMatch5);
      localStorage.setItem('matchxx', JSON.stringify(newMatch5));
    }
  };

  const handleWinnerChange = (winnerIndex) => {

    const getuptodatematch = updateMatchArr(playersRecord, match);
    const updatedMatch = getuptodatematch.map((entry, index) => {
      if (index === winnerIndex) {
        return { ...entry, score: 1, isongoing: false };
      } else {
        return { ...entry, score: 0, isongoing: false };
      }
    });

    setMatch(updatedMatch);

    const winner = updatedMatch.find((entry) => entry.score === 1).player;
    const loser = updatedMatch.find((entry) => entry.score === 0).player;

    const updatedPlayersRecord = playersRecord.map((p) => {
      if (p.playerName === winner.playerName) {
        return { ...p, plays: parseInt(p.plays) + 1, wins: parseInt(p.wins) + 1, lastoponent: loser.playerName, alloponents: winner.alloponents };
      } else if (p.playerName === loser.playerName) {
        return { ...p, plays: parseInt(p.plays) + 1, loses: parseInt(p.loses) + 1, lastoponent: winner.playerName, alloponents: loser.alloponents };
      }
      return p;
    });

    setPlayersRecord(updatedPlayersRecord);
    localStorage.setItem('playersRecordxx', JSON.stringify(updatedPlayersRecord));
    localStorage.setItem('matchxx', JSON.stringify(updatedMatch));
  };

  const clearAllScores = () => {
    const updatedPlayersRecord = playersRecord.map(player => ({
      ...player,
      plays: 0,
      wins: 0,
      loses: 0,
    }));

    setPlayersRecord(updatedPlayersRecord);
    localStorage.setItem('playersRecordxx', JSON.stringify(updatedPlayersRecord));
  };

  const startAllOver = () => {
    setPlayersRecord([]);
    setMatch([]);
    setIsMatchOngoing(false);
    localStorage.removeItem('playersRecordxx');
    localStorage.removeItem('matchxx');
  };

  return (
    <div className="container-fluid custom-div pt-3" style={{ backgroundColor: '#1c1c1e', color: 'white', minHeight: '80vh', padding: '0' }}>
      <h1 className="text-center animated-title cool-title">Billiard Club App</h1>

      <div className="mb-4 mt-3 px-2 custom-input">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
          />
          <button className="btn btn-primary" onClick={handleAddPlayer}>
            Add Player
          </button>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center mb-4">
     
        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-success"
            onClick={startMatch}
            disabled={isMatchOngoing}
            style={{ boxShadow: '0px 4px 6px rgba(0, 255, 0, 0.5)' }}
          >
            Start Match
          </button>
          <button
            className="btn btn-warning"
            onClick={clearAllScores}
            disabled={isMatchOngoing}
            style={{ boxShadow: '0px 4px 6px rgba(255, 255, 0, 0.5)' }}
          >
            Clear All Scores
          </button>
          <button
            className="btn btn-danger"
            onClick={startAllOver}
            style={{ boxShadow: '0px 4px 6px rgba(255, 0, 0, 0.5)' }}
          >
            Start All Over
          </button>
        </div>
      </div>

      <div className="mb-4 px-2 ">
        <h3>Current Match</h3>   
        <div className="card" style={{ backgroundColor: '#2c2c2e', color: 'white', borderColor: '#f0ad4e' }}>
          <div className="card-body">
          {isMatchOngoing && <p className='mx-auto' style={{ color: '#f0ad4e', fontSize: '1.5rem' }}>!Pick the winner!</p>}
            {match.map((entry, index) => (
              <div
                key={index}
                className="form-check p-2"
                style={{
                  padding: '10px',
                  border: '2px solid #f0ad4e',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <input
                  type="checkbox"
                  className="form-check-input p-1 mx-2"
                  checked={entry.score === 1}
                  onChange={() => handleWinnerChange(index)}
                  disabled={!isMatchOngoing}
                  style={{
                    transform: 'scale(1.5)',
                    marginRight: '10px',
                    accentColor: '#f0ad4e',
                  }}
                />
                <label className="form-check-label">{entry.player.playerName}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 px-2 ">
        <h3>Players</h3>
        <ul className="list-group">
          {playersRecord.map((player, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: '#2c2c2e', color: 'white' }}
            >
              {player.playerName} (Plays: {player.plays}, Wins: {player.wins}, Loses: {player.loses})
              <button
                className="btn btn-danger btn-sm"
                disabled={
                  isMatchOngoing &&
                  match.some((entry) => entry.player.playerName === player.playerName && entry.isongoing)
                }
                onClick={() => removePlayer(player)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>


      <About/>

      <Footer/>


    </div>
  );
}

export default BilliardClubApp;

