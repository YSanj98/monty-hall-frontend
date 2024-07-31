// MontyHall.js
import React, { useState } from "react";
import axios from "axios";
import Door from "./Door";
import "../../css/MontyHall.css";
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const MontyHall = () => {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [result, setResult] = useState(null);
  const [revealedDoor, setRevealedDoor] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [prizeDoor, setPrizeDoor] = useState(null);
  const [showInstruction, setShowInstruction] = useState(true);

  const navigate = useNavigate();

  const handleInitialSelection = async (index) => {
    setSelectedDoor(index);
    setUserMessage("You selected this door");
    setShowInstruction(false);
    const response = await axios.post(`${backendUrl}/montyhall/game`, {
      initialSelection: index,
      switchDoor: false,
    });
    setRevealedDoor(response.data.revealedDoor);
    setPrizeDoor(response.data.prizeDoor);
  };

  const handleFinalSelection = (switchDoorChoice) => {
    let finalSelectedDoor = selectedDoor;
    if (switchDoorChoice) {
      finalSelectedDoor = [0, 1, 2].find(
        (door) => door !== selectedDoor && door !== revealedDoor
      );
    }

    const win = finalSelectedDoor === prizeDoor;
    setResult({ win, prizeDoor });

    if (switchDoorChoice) {
      setUserMessage(win ? "You switched the door and won!" : "You switched the door and lost");
    } else {
      setUserMessage(win ? "You stuck with your choice and won!" : "You stuck with your choice and lost");
    }
  };

  const handleRestart = () => {
    setSelectedDoor(null);
    setResult(null);
    setRevealedDoor(null);
    setUserMessage("");
    setPrizeDoor(null);
    setShowInstruction(true);
  };

  const renderDoors = () => {
    return [0, 1, 2].map((index) => (
      <Door
        key={index}
        index={index}
        selectedDoor={selectedDoor}
        revealedDoor={revealedDoor}
        prizeDoor={prizeDoor}
        result={result}
        handleInitialSelection={handleInitialSelection}
        userMessage={userMessage}
      />
    ));
  };

  return (
    <div className="App">
      <h1>Monty Hall Game Demo</h1>
      {showInstruction && <p className="instruction-message">Click a door to start the game</p>}
      <div className="doors-container">{renderDoors()}</div>
      {selectedDoor !== null && result === null && (
        <div>
          <p>Would you like to switch your choice?</p>
          <button
            className="button"
            onClick={() => {
              handleFinalSelection(true);
            }}
          >
            Yes
          </button>
          <button className="button" onClick={() => handleFinalSelection(false)}>No</button>
        </div>
      )}
      {result && (
        <div>
          <h2>Results:</h2>
          <p className="result">{result.win ? "You Won!" : "You Lost!"}</p>
          <button className="button" onClick={handleRestart}>Restart</button>
          <button className="button" onClick={() => navigate('/')}>Go To Home</button>
        </div>
      )}
    </div>
  );
};

export default MontyHall;
