import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BilliardClubApp() {
  function getRandomElement(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('The input must be a non-empty array.');
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
    }
  const [playerName, setPlayerName] = useState('');
  const [playersRecord, setPlayersRecord] = useState(() => {
    const savedPlayersRecord = localStorage.getItem('playersRecord');
    return savedPlayersRecord ? JSON.parse(savedPlayersRecord) : [];
  });
  const [match, setMatch] = useState(() => {
    const savedMatch = localStorage.getItem('match');
    return savedMatch ? JSON.parse(savedMatch) : [];
  });

  const [isMatchOngoing, setIsMatchOngoing] = useState(false);

  const handleAddPlayer = () => {
    if (playerName) {
      const newPlayer = { playerName, plays: 0, wins: 0, loses: 0, lastoponent: '' };
      const updatedPlayersRecord = [...playersRecord, newPlayer];
      setPlayersRecord(updatedPlayersRecord);
      localStorage.setItem('playersRecord', JSON.stringify(updatedPlayersRecord)); // Save immediately
      setPlayerName('');
    }
  };

  const removePlayer = (player) => {
    const updatedPlayersRecord = playersRecord.filter((p) => p.playerName !== player.playerName);
    setPlayersRecord(updatedPlayersRecord);
    localStorage.setItem('playersRecord', JSON.stringify(updatedPlayersRecord));
  };

  const startMatch = () => {
    if (playersRecord.length < 2) {
      alert("At least two players are required to start a match!");
      return;
    }

    // Organize players by plays (ascending), then by wins (descending)
    const sortedPlayers = [...playersRecord].sort((a, b) => {
      if (a.plays === b.plays) return a.wins - b.wins;
      return a.plays - b.plays;
    });

    if (sortedPlayers.length === 2) {
      const [playera, playerb] = sortedPlayers;
      const newMatch1 = [
        { player: playera, score: 0, isongoing: true },
        { player: playerb, score: 0, isongoing: true },
      ];

      setMatch(newMatch1);
      localStorage.setItem('match', JSON.stringify(newMatch1));
    } else if (sortedPlayers.length === 3) {
      const [player11, player22, player33] = sortedPlayers;

      if (player11.lastoponent === player22.playerName) {
        const newMatch2 = [
          { player: player11, score: 0, isongoing: true },
          { player: player33, score: 0, isongoing: true },
        ];

        setMatch(newMatch2);
        localStorage.setItem('match', JSON.stringify(newMatch2));
      } else {
        const newMatch3 = [
          { player: player11, score: 0, isongoing: true },
          { player: player22, score: 0, isongoing: true },
        ];

        setMatch(newMatch3);
        localStorage.setItem('match', JSON.stringify(newMatch3));
      }
    } else if (sortedPlayers.length > 3) {
      const [player111, player222, ...rest] = sortedPlayers;

      if (player111.lastoponent === player222.playerName) {
        const mysecondplayer = getRandomElement(rest);
        const newMatch4 = [
          { player: player111, score: 0, isongoing: true },
          { player: mysecondplayer, score: 0, isongoing: true },
        ];

        setMatch(newMatch4);
        localStorage.setItem('match', JSON.stringify(newMatch4));
      } else {
        const newMatch5 = [
          { player: player111, score: 0, isongoing: true },
          { player: player222, score: 0, isongoing: true },
        ];

        setMatch(newMatch5);
        localStorage.setItem('match', JSON.stringify(newMatch5));
      }
    }
  };

  const handleWinnerChange = (winnerIndex) => {
    const updatedMatch = match.map((entry, index) => {
      if (index === winnerIndex) {
        return { ...entry, score: 1, isongoing: false};
      } else {
        return { ...entry, score: 0, isongoing: false};
      }
    });

    setMatch(updatedMatch);

    // Update players' records
    const winner = updatedMatch.find((entry) => entry.score === 1).player;
    const loser = updatedMatch.find((entry) => entry.score === 0).player;

    const updatedPlayersRecord = playersRecord.map((p) => {
      if (p.playerName === winner.playerName) {
        return { ...p, plays: parseInt(p.plays) + 1, wins: parseInt(p.wins) + 1, lastoponent: loser.playerName };
      } else if (p.playerName === loser.playerName) {
        return { ...p, plays: parseInt(p.plays) + 1, loses: parseInt(p.loses) + 1, lastoponent: winner.playerName };
      }
      return p;
    });

    setPlayersRecord(updatedPlayersRecord);
    localStorage.setItem('playersRecord', JSON.stringify(updatedPlayersRecord));
    localStorage.setItem('match', JSON.stringify(updatedMatch));
  };

  // Save match state to localStorage
  useEffect(() => {
    const IsMatchOngoing = match[0]?.isongoing;
    setIsMatchOngoing(IsMatchOngoing);

    localStorage.setItem('match', JSON.stringify(match));
  }, [match]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Billiard Club App</h1>

      <div className="mb-4">
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

      <div className="mb-4">
        <h3>Players</h3>
        <ul className="list-group">
          {playersRecord.map((player, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {player.playerName} (Plays: {player.plays}, Wins: {player.wins}, Loses: {player.loses})
              <button className="btn btn-danger btn-sm" onClick={() => removePlayer(player)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <button
          className="btn btn-success"
          onClick={startMatch}
          disabled={isMatchOngoing}
        >
          Start Match
        </button>
      </div>

      <div className="mb-4">
        <h3>Current Match</h3>
        <div className="card">
          <div className="card-body">
            {match.map((entry, index) => (
              <div key={index} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={entry.score === 1}
                  onChange={() => handleWinnerChange(index)}
                  disabled={!isMatchOngoing}
                />
                <label className="form-check-label">{entry.player.playerName}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BilliardClubApp;
