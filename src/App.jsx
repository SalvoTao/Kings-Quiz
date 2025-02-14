import React, { useState } from "react";
import Board from "./Board";
import PlayerList from "./PlayerList";
import "./styles/App.css";
import "./styles/Popup.css"; // Import CSS del popup

function App() {
  const [players, setPlayers] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [numPlayers, setNumPlayers] = useState(1);

  // Funzione per inizializzare i giocatori
  const initializePlayers = () => {
    const newPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      name: `Giocatore ${i + 1}`,
      score: 0,
    }));
    setPlayers(newPlayers);
    setShowPopup(false);
  };

  return (
    <div className="app-container">
      {/* Popup per selezionare il numero di giocatori */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Seleziona il numero di giocatori</h2>
            <div className="player-selection">
              <button className="num-btn" onClick={() => setNumPlayers((prev) => Math.max(1, prev - 1))}>-</button>
              <span className="num-display">{numPlayers}</span>
              <button className="num-btn" onClick={() => setNumPlayers((prev) => Math.min(4, prev + 1))}>+</button>
            </div>
            <button className="start-game-btn" onClick={initializePlayers}>
              Inizia il gioco
            </button>
          </div>
        </div>
      )}

      {/* Griglia del quiz */}
      <div className="board-wrapper">
        <Board />
      </div>

      {/* Lista giocatori */}
      <PlayerList players={players} setPlayers={setPlayers} />
    </div>
  );
}

export default App;