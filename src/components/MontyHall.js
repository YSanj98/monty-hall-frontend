import React, { useState } from "react";
import axios from "axios";
import doorImage from "../imgs/door.jpeg";
import carImage from "../imgs/car.jpg";
import goatImage from "../imgs/goat.jpg";
import "./MontyHall.css"; // Import the CSS file

const backendUrl = "http://localhost:5193";

const MontyHall = () => {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [result, setResult] = useState(null);
  const [revealedDoor, setRevealedDoor] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [prizeDoor, setPrizeDoor] = useState(null);

  const handleInitialSelection = async (index) => {
    setSelectedDoor(index);
    setUserMessage("You selected this door");
    // Send initial selection to the server
    const response = await axios.post(`${backendUrl}/api/montyhall/simulate`, {
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

  const renderDoors = () => {
    return [0, 1, 2].map((index) => {
      let borderColor = "white";
      let imgSrc = doorImage;

      if (index === selectedDoor) {
        borderColor = "blue";
      }
      if (result && index === result.prizeDoor) {
        borderColor = "green";
        imgSrc = carImage;
      } else if (index === revealedDoor) {
        borderColor = "#9a0ddb";
        imgSrc = goatImage;
      }

      return (
        <div key={index} className="door-container">
          <div>
            <img
              src={imgSrc}
              alt={`Door ${index + 1}`}
              className="door-image"
              style={{
                border: `5px solid ${borderColor}`,
                cursor: selectedDoor === null && result === null ? "pointer" : "default",
              }}
              onClick={() => selectedDoor === null && handleInitialSelection(index)}
            />
          </div>
          <div>
            {index === revealedDoor && (
              <p className="revealed-message">Monty revealed this door</p>
            )}
            {index === selectedDoor && (
              <p className="user-message">{userMessage}</p>
            )}
            {result && index === result.prizeDoor && (
              <p className="prize-message">This door has the prize</p>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>Monty Hall Simulation</h1>
      <div className="doors-container">{renderDoors()}</div>
      {selectedDoor !== null && result === null && (
        <div>
          <p>Would you like to switch your choice?</p>
          <button
            className="button"
            onClick={() => {
              handleFinalSelection(true);
              setUserMessage("You switched this door");
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
          <p>{result.win ? "You win!" : "You lose!"}</p>
        </div>
      )}
    </div>
  );
};

export default MontyHall;
