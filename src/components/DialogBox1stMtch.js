import React, { useState, useEffect } from 'react';
import manualSelFunc from '../utils/manualSelFunc';
import randomSelFunc from '../utils/randomSelFunc';

function DialogBox1stMtch({
    showModal, 
    setShowModal, 
    playersRecord,
    setMatch
}) {

    const [firstPlayer, setFirstPlayer] = useState('');
    const [secondPlayer, setSecondPlayer] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        if (showModal === true) {
        setFirstPlayer('');
        setSecondPlayer('');
        setError('');
        }
    }, [showModal]);

    const handleRandomSelection = () => {
        const newMatch= randomSelFunc(playersRecord);
        setMatch(newMatch);
        localStorage.setItem("matchxx", JSON.stringify(newMatch));
        setShowModal(false);
    };

    const handleManualSelection = () => {
        if (firstPlayer === "" || secondPlayer === "") {
            setError("Please select exactly two players.");
            return;
        }
        const newMatch = manualSelFunc(firstPlayer, secondPlayer, playersRecord);
        if (newMatch.length > 0) {
            setMatch(newMatch);
            localStorage.setItem("matchxx", JSON.stringify(newMatch));
            setShowModal(false);
        } else {
            setShowModal(false);
        }
    };

    const handleCancleMondal = () => {
        setFirstPlayer('');
        setSecondPlayer('');
        setError('');
        setShowModal(false);
    };

    const handleSelectFirstPlayer = (event) => {
        setFirstPlayer(event.target.value);
        setSecondPlayer('');
    };

    const handleSelectSecondPlayer = (event) => {
        setSecondPlayer(event.target.value);
    };         

    return (
        <div
            className={`modal fade ${showModal ? "show" : ""}`}
            tabIndex="-1"
            style={{
            display: showModal ? "block" : "none",
            backgroundColor: "rgba(0, 0, 0, 0.85)", // Darker background for the overlay
            }}
            onClick={() => setShowModal(false)}
        >
            <div
                className="modal-dialog text-light"
                style={{
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)", // Add shadow effect
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content" style={{ backgroundColor: "#343a40", borderRadius: "8px" }}>
                    <div className="modal-header" style={{ borderBottom: "1px solid #495057" }}>
                        <h5 className="modal-title">Start First Match</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>How would you like to start the first match?</p>
                        <button
                            className="btn btn-primary mb-3"
                            onClick={handleRandomSelection}
                        >
                            Random Selection
                        </button>
                        <hr />
                        <p>Select two players manually:</p>
                        <div className="mt-4">
                            <label htmlFor="dropdownMenu" className="form-label">
                                First Player
                            </label>
                            <select
                                className="form-select"
                                id="dropdownMenu"
                                value={firstPlayer}
                                onChange={handleSelectFirstPlayer}
                            >
                            <option value="">-- Select an Option --</option>
                            {playersRecord.map((option, index) => (
                                <option key={index} value={option.plyr}>
                                    {option.plyr}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="dropdownMenu" className="form-label">
                                Second Player
                            </label>
                            <select
                                className="form-select"
                                id="dropdownMenu"
                                value={secondPlayer}
                                onChange={handleSelectSecondPlayer}
                            >
                            <option value="">-- Select an Option --</option>
                            {playersRecord
                                .filter((ply) => ply.plyr !== firstPlayer)
                                .map((option, index) => (
                                <option key={index} value={option.plyr}>
                                    {option.plyr}
                                </option>
                            ))}
                            </select>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                    </div>
                    <div
                        className="modal-footer"
                        style={{ borderTop: "1px solid #495057" }}
                        >
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancleMondal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={
                            firstPlayer === "" || secondPlayer === "" || firstPlayer === secondPlayer
                        }
                            className="btn btn-success"
                            onClick={handleManualSelection}
                        >
                        Confirm Selection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DialogBox1stMtch ;



