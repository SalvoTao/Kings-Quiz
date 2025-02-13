import React from "react";
import "./styles/PlayerList.css";

function PlayerList({ players, addPlayer, removePlayer }) {
  return (
    <div className="players-section">
      <div className="players-container">
        {players.map((player) => (
          <div key={player.id} className="player-box">
            {/* Bottone per rimuovere il giocatore */}
            <button className="remove-player-btn" onClick={() => removePlayer(player.id)}>×</button>
            <span className="player-name">{player.name}</span>
            <span className="player-score">{player.score} punti</span>
          </div>
        ))}
      </div>

      {/* Pulsante per aggiungere giocatori */}
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