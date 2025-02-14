import React, { useState } from "react";
import Board from "./Board";
import PlayerList from "./PlayerList";
import "./styles/App.css";
import "./styles/Popup.css"; // Import CSS del popup

function App() {
  const [players, setPlayers] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [numPlayers, setNumPlayers] = useState(2);

  const [selectedCategories, setSelectedCategories] = useState(["Sport"]); // Default con almeno 1 selezionata
  const categories = ["Sport", "Scienza", "Geografia", "Storia", "Cinema", "Musica", "Letteratura", "Informatica", 
                  "Matematica", "Geometria"];
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      // Impedisce di deselezionare l'ultima categoria rimasta
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const removePlayer = (id) => {
    if (players.length > 2) { // Impedisce di rimuovere giocatori sotto i 2
      setPlayers(players.filter(player => player.id !== id));
    }
  };

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
            <img src="/images/kings-quiz-logo.png" alt="Kings Quiz Logo" className="popup-logo" />
            {/* Scelta numero giocatori */}
            <h2>Seleziona il numero di giocatori</h2>
            <div className="player-selection">
              <button 
                className={`num-btn ${numPlayers === 2 ? "disabled" : ""}`} 
                onClick={() => setNumPlayers((prev) => Math.max(2, prev - 1))}
                disabled={numPlayers === 2}
              >
                -
              </button>
              <span className="num-display">{numPlayers}</span>
              <button 
                className={`num-btn ${numPlayers === 5 ? "disabled" : ""}`} 
                onClick={() => setNumPlayers((prev) => Math.min(5, prev + 1))}
                disabled={numPlayers === 5}
              >
                +
              </button>
            </div>

            {/* Scelta delle categorie */}
            <div className="category-selection">
              <h3>Scegli le categorie:</h3>
              <div className="category-list">
                {categories.map((category) => (
                  <div 
                    key={category} 
                    className={`category-option ${selectedCategories.includes(category) ? "selected" : ""}`} 
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
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