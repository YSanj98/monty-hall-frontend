import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/MontyHallResults.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const MontyHallResults = () => {
  const [numberOfSimulations, setNumberOfSimulations] = useState(1);
  const [switchDoorChoice, setSwitchDoorChoice] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); 

  const handleSimulate = async () => {
    try {
      // Generate a random number between 0 and 2 for initial selection
      const initialSelection = Math.floor(Math.random() * 3);

      const response = await axios.post(`${backendUrl}/montyhall/simulate`, {
        numberOfSimulations,
        initialSelection,
        switchDoor: switchDoorChoice,
      });

      setResult(response.data);
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
  };

  const renderResults = () => {
    if (result) {
      const wins = result.filter((r) => r.win).length;
      const losses = result.length - wins;
      const switchMessage = switchDoorChoice
        ? "You switch doors. Results of Simulations"
        : "You did not switch. Results of Simulations";
      return (
        <div className="result">
          <h2>{switchMessage}:</h2>
          <p>Wins: {wins}</p>
          <p>Losses: {losses}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1>Monty Hall Simulator</h1>
      <div className="container">
        <label>
          Number of Simulations:
          <input
            type="number"
            value={numberOfSimulations}
            onChange={(e) => setNumberOfSimulations(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <label>
          Switch Door:
          <input
            type="checkbox"
            checked={switchDoorChoice}
            onChange={(e) => setSwitchDoorChoice(e.target.checked)}
          />
        </label>
        <button onClick={handleSimulate}>Simulate</button>
        {renderResults()}
      </div>
      <div className="go-home-button">
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    </>
  );
};

export default MontyHallResults;
