import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <h1>Monty Hall Puzzle</h1>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/game')}>
          Play the Game
        </button>
        <button className="button" onClick={() => navigate('/simulation')}>
          Simulation
        </button>
      </div>
    </div>
  );
};

export default MainPage;
