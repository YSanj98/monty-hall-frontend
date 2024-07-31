import React from "react";
import doorImage from "../../imgs/door.jpeg";
import carImage from "../../imgs/car.jpg";
import goatImage from "../../imgs/goat.jpg";
import "../../css/MontyHall.css";

const Door = ({
  index,
  selectedDoor,
  revealedDoor,
  prizeDoor,
  result,
  handleInitialSelection,
  userMessage,
}) => {
  let borderColor = "white";
  let imgSrc = doorImage;

  if (index === selectedDoor) {
    borderColor = "#31b1e0 ";
  }
  if (result && index === result.prizeDoor) {
    borderColor = "#3aef14";
    imgSrc = carImage;
  } else if (index === revealedDoor) {
    borderColor = "#9a0ddb";
    imgSrc = goatImage;
  }

  return (
    <div className="door-container">
      <div>
        <img
          src={imgSrc}
          alt={`Door ${index + 1}`}
          className="door-image"
          style={{
            border: `5px solid ${borderColor}`,
            cursor:
              selectedDoor === null && result === null ? "pointer" : "default",
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
};

export default Door;
