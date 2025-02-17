import React, { useMemo } from "react";
import "./styles/PlayerList.css";

/**
 * 📌 Componente PlayerList - Mostra i giocatori, consente di modificarne il punteggio e permette di rimuoverli.
 * - Evidenzia il giocatore con il punteggio più alto.
 * - Impedisce la rimozione se ci sono solo 2 giocatori.
 */
const PlayerList = ({ players, setPlayers }) => {
  
  // 📌 Trova il punteggio massimo (può essere anche negativo)
  const maxScore = useMemo(() => {
    const scores = players.map(player => player.score);
    return scores.length ? Math.max(...scores) : 0;
  }, [players]);

  /**
   * 📌 Funzione per rimuovere un giocatore
   * - Permette la rimozione solo se ci sono più di 2 giocatori
   */
  const removePlayer = (id) => {
    if (players.length > 2) {
      setPlayers(players.filter(player => player.id !== id));
    }
  };

  /**
   * 📌 Funzione per aggiornare il punteggio di un giocatore
   */
  const updateScore = (id, delta) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, score: player.score + delta } : player
    ));
  };

  return (
    <div className="players-section">
      <div className="players-container">
        {players.map((player) => (
          <div 
            key={player.id} 
            className={`player-box ${player.score === maxScore && players.filter(p => p.score === maxScore).length === 1 ? "leader" : ""}`}
          >
            {/* 🔹 Campo input per il nome */}
            <input 
              type="text" 
              className="player-name" 
              value={player.name} 
              onChange={(e) => {
                const newPlayers = players.map(p => p.id === player.id ? { ...p, name: e.target.value } : p);
                setPlayers(newPlayers);
              }}
            />
            
            {/* 🔹 Pulsanti + e - per modificare il punteggio */}
            <div className="score-controls">
              <button className="score-btn decrease" onClick={() => updateScore(player.id, -100)}>-</button>
              <span className="player-score">{player.score}</span>
              <button className="score-btn increase" onClick={() => updateScore(player.id, 100)}>+</button>
            </div>

            {/* 🔹 Pulsante rimozione giocatore (attivo solo se ci sono più di 2) */}
            {players.length > 2 && (
              <button className="remove-player-btn" onClick={() => removePlayer(player.id)}>✖</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;