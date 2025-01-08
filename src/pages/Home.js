import React, { useState, useEffect } from 'react';
import {addPlayer,removePlayerUtil,updateMatchArr} from '../utils/utilsfuncs';
import startMatchOrder from '../utils/startMatchOrder';
import updtRcrdsFromMatch from '../utils/updtRcrdsFromMatch';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/subtitle2.gif';

import About from '../components/About';
import setLastMatchFunc from '../utils/setLastMatchFunc';
import DialogBox1stMtch from '../components/DialogBox1stMtch';

function BilliardClubApp() {
  const [plyr, setplyr] = useState('');

  const [lastMatch, setLastMatch] = useState(() => {
    const savedLastMatch = localStorage.getItem('lastMatchxxx');
    return savedLastMatch ? JSON.parse(savedLastMatch) : [];
  });

  const [playersRecord, setPlayersRecord] = useState(() => {
    const savedPlayersRecord = localStorage.getItem('playersRecordxx');
    return savedPlayersRecord ? JSON.parse(savedPlayersRecord) : [];
  });

  const [match, setMatch] = useState(() => {
    const savedMatch = localStorage.getItem('matchxx');
    return savedMatch ? JSON.parse(savedMatch) : [];
  });

  const [isMatchOngoing, setIsMatchOngoing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const IsMatchOngoing = match[0]?.isongoing;
    setIsMatchOngoing(IsMatchOngoing);
    localStorage.setItem('matchxx', JSON.stringify(match));
  }, [match]);

  const handleAddPlayer = () => {
    if (plyr) {
      if (plyr.length > 11) {
        alert('Player name cannot exceed 8 characters.');
        return;
      }
      const updatedPlayersRecord = addPlayer(plyr, playersRecord);
      setPlayersRecord(updatedPlayersRecord);
      localStorage.setItem('playersRecordxx', JSON.stringify(updatedPlayersRecord));
      setplyr('');
    }
  };

  const removePlayer = (player) => {
    const mynewrecords = removePlayerUtil(player, playersRecord);
    setPlayersRecord(mynewrecords);
    localStorage.setItem('playersRecordxx', JSON.stringify(mynewrecords));
  };

  const startMatch = () => {
    if (playersRecord.length < 2) {
      alert("At least two players are required to start a match!");
      return;
    }
    const totalpys = playersRecord.reduce((acc, player) => acc + player.pys, 0);
    if (totalpys === 0 && playersRecord.length > 2) {
      setShowModal(true);
    } else {
      const newMatch = startMatchOrder(playersRecord);
      setMatch(newMatch);
      localStorage.setItem("matchxx", JSON.stringify(newMatch));
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
    const mylastmatch = setLastMatchFunc(updatedMatch, lastMatch);
    setLastMatch(mylastmatch)
    localStorage.setItem('lastMatchxxx', JSON.stringify(mylastmatch));
    const updatedPlayersRecord = updtRcrdsFromMatch(updatedMatch, playersRecord);
    setPlayersRecord(updatedPlayersRecord);
    localStorage.setItem('playersRecordxx', JSON.stringify(updatedPlayersRecord));
    localStorage.setItem('matchxx', JSON.stringify(updatedMatch));
  };

  const clearAllScores = () => {
    const updatedPlayersRecord = playersRecord.map(player => ({
      ...player,
      pys: 0,
      w: 0,
      l: 0,
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
    <div className="container-fluid mt-4 custom-div text-light">
      <div className="mb-3 custom-input">
        <div className="input-group">
          <input
          type="text"
          className="form-control"
          value={plyr}
          onChange={(e) => setplyr(e.target.value)}
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
            className="btn p-1 btn-success"
            onClick={startMatch}
            disabled={isMatchOngoing}
            style={{ boxShadow: '0px 4px 6px rgba(51, 255, 0, 0.5)' }}
          >
          Start Match
          </button>
          <button
            className="btn p-1 btn-warning"
            onClick={clearAllScores}
            disabled={isMatchOngoing}
            style={{ boxShadow: '0px 4px 6px rgba(255, 230, 0, 0.71)' }}
          >
          Clear All Scores
          </button>
          <button
            className="btn p-1 btn-danger"
            onClick={startAllOver}
            style={{ boxShadow: '0px 4px 6px rgba(255, 0, 0, 0.5)' }}
          >
          Start All Over
          </button>
        </div>
      </div>
      <div className="mb-4 px-2 ">
        <div className="d-flex justify-content-space-around customdiv">
          {!isMatchOngoing&&<img src={image} alt="billiard" style={{height:'20px',marginBottom:'20px'}}/>}
          {isMatchOngoing && <h3 className='h3custom' style={{ color: '#f0ad4e'}}>!Pick the winner!</h3>} 
        </div>
        {match.length >= 2 && (
          <div className="player-section">
            <div className="customcheckbox">
              <h3 className="div2">{match[0].player.plyr}</h3>
              <input
                type="checkbox"
                className="form-check-input p-1 mx-2"
                checked={match[0].score === 1}
                onChange={() => handleWinnerChange(0)}
                disabled={!isMatchOngoing}
                style={{
                transform: "scale(1.8)",
                }}
              />
              <h3 className="div3">{match[0].player.plyr}</h3>
            </div>
            <h2 className="vselement"><span style={{opacity:'0'}}>--</span>vs<span style={{opacity:'0'}}>--</span></h2>
            <div className="customcheckbox">
              <input
                type="checkbox"
                className="form-check-input p-1 mx-2"
                checked={match[1].score === 1}
                onChange={() => handleWinnerChange(1)}
                disabled={!isMatchOngoing}
                style={{
                transform: "scale(1.8)",
                }}
              />
              <h3 className='div1'>{match[1].player.plyr}</h3>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4 px-2 ">
        <div className="d-flex justify-content-between">
          <h3>Players:</h3>
          {lastMatch.length === 2 && (
            <div className="d-flex flex-column justify-content-between">
              <div>
                <code>{lastMatch[0].winner}🏆 </code>
                <code>{lastMatch[0].loser}😞</code>
              </div>
              <code>Last Match: {lastMatch[1].date}</code>
            </div>
          )}
        </div>
        <ul className="list-group">
          {playersRecord.sort((a, b) => a.plyr.localeCompare(b.plyr)).map((player, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: '#2c2c2e', color: 'white' }}
            >
              {player.plyr} (Games: {player.pys}, Wins: {player.w}, Losses: {player.l})
              <button
                className="btn btn-danger btn-sm"
                disabled={
                isMatchOngoing &&
                match.some((entry) => entry.player.plyr === player.plyr && entry.isongoing)
                }
                onClick={() => removePlayer(player)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {playersRecord.length===0&&<div className='placeholderdiv'>
          <p>"No players added"</p>
        </div>}
      </div>
  
      {showModal&&playersRecord.length>2&&
        <div>
          <DialogBox1stMtch
          showModal={showModal} 
          setShowModal={setShowModal}
          setMatch={setMatch}
          playersRecord={playersRecord}
        />
      </div>}
      <About/>
    </div>
  );
}

export default BilliardClubApp;