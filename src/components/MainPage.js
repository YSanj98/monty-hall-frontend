import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <h1>Monty Hall Simulation</h1>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/game')}>
          Play Game
        </button>
        <button className="button" onClick={() => navigate('/result')}>
          Result Check
        </button>
      </div>
    </div>
  );
};

export default MainPage;
