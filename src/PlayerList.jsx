import React from "react";
import "./styles/PlayerList.css";

function PlayerList({ players, addPlayer, removePlayer, updatePlayerName, updatePlayerScore }) {
  // Trova il punteggio massimo tra i giocatori
  const maxScore = Math.max(...players.map(player => player.score), 0);

  // Conta quanti giocatori hanno il punteggio massimo
  const leaders = players.filter(player => player.score === maxScore);

  return (
    <div className="players-section">
      <div className="players-container">
        {players.map((player) => (
          <div 
            key={player.id} 
            className={`player-box ${leaders.length === 1 && player.score === maxScore ? "leader" : ""}`} // Solo se c'è un unico leader
          >
            {/* Bottone per rimuovere il giocatore */}
            <button className="remove-player-btn" onClick={() => removePlayer(player.id)}>×</button>
            {/* Input per modificare il nome del giocatore */}
            <input 
              type="text"
              className="player-name-input"
              value={player.name}
              onChange={(e) => updatePlayerName(player.id, e.target.value)}
              placeholder="Inserisci nome"
            />
            {/* Area per i punti con i pulsanti + e - */}
            <div className="score-controls">
              <button className="minus-btn" onClick={() => updatePlayerScore(player.id, -100)}>-</button>
              <span className="player-score">{player.score}</span>
              <button className="plus-btn" onClick={() => updatePlayerScore(player.id, 100)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pulsante per aggiungere giocatori */}
      <button 
        className="add-player-btn" 
        onClick={addPlayer} 
        disabled={players.length >= 4}
      >
        {players.length >= 4 ? "Numero massimo raggiunto" : "Aggiungi Giocatore"}
      </button>
    </div>
  );
}

export default PlayerList;