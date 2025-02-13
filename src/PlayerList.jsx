import React from "react";
import "./styles/PlayerList.css";

function PlayerList({ players, addPlayer }) {
  return (
    <div className="players-section">
      <div className="players-container">
        {players.map((player) => (
          <div key={player.id} className="player-box">
            <span className="player-name">{player.name}</span>
            <span className="player-score">{player.score} punti</span>
          </div>
        ))}
      </div>
      
      {/* Disabilita il pulsante se ci sono già 4 giocatori */}
      <button 
        className="add-player-btn" 
        onClick={addPlayer} 
        disabled={players.length >= 6}
      >
        {players.length >= 6 ? "Numero massimo raggiunto" : "Aggiungi Giocatore"}
      </button>
    </div>
  );
}

export default PlayerList;