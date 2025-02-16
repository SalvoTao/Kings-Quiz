import React from "react";
import "./styles/PlayerList.css";

/**
 * 📌 Componente PlayerList: gestisce l'elenco dei giocatori e il loro punteggio.
 * - Mostra i giocatori attuali con nome e punteggio.
 * - Consente di aumentare o diminuire il punteggio di ciascun giocatore.
 * - Permette di rimuovere un giocatore (se più di 2 giocatori presenti).
 */
function PlayerList({ players, setPlayers }) {
  // Trova il punteggio massimo tra i giocatori (anche se negativo)
  const maxScore = players.length > 0 ? Math.max(...players.map(player => player.score)) : null;

  // Conta quanti giocatori hanno il punteggio massimo
  const leaders = players.filter(player => player.score === maxScore);

  // Funzione per rimuovere un giocatore
  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  // Funzione per aggiornare il punteggio del giocatore
  const updatePlayerScore = (id, amount) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, score: player.score + amount } : player
    ));
  };

  return (
    <div className="players-section">
      <div className="players-container">
        {players.map((player) => (
          <div key={player.id} className={`player-box ${leaders.length === 1 && player.score === maxScore ? "leader" : ""}`} >
            {/* Rendi la X disattivata se ci sono solo 2 giocatori */}
            {players.length > 2 && (
              <button className="remove-player-btn" onClick={() => removePlayer(player.id)}>✖</button>
            )}

            <input type="text" className="player-name-input" value={player.name}
              onChange={(e) => setPlayers(players.map(p => p.id === player.id ? { ...p, name: e.target.value } : p))}
            />

            <div className="score-controls">
              <button className="minus-btn" onClick={() => updatePlayerScore(player.id, -100)}>-</button>
              <span className="player-score">{player.score}</span>
              <button className="plus-btn" onClick={() => updatePlayerScore(player.id, 100)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerList;