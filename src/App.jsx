import React, { useState } from "react";
import Board from "./Board";
import PlayerList from "./PlayerList";
import "./styles/App.css";
import "./styles/Popup.css"; // Import CSS del popup

function App() {
  const [players, setPlayers] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [numPlayers, setNumPlayers] = useState(2);

  const [selectedCategories, setSelectedCategories] = useState([]); // Nessuna categoria selezionata all'inizio
  const categories = ["Sport", "Scienza", "Geografia", "Storia", "Cinema", "Musica", "Letteratura", "Informatica", 
                  "Matematica", "Geometria"];
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const startGame = () => {
    if (selectedCategories.length >= 5) {
      // Creiamo i giocatori automaticamente in base al numero selezionato
      const initialPlayers = Array.from({ length: numPlayers }, (_, index) => ({
        id: index + 1,
        name: `Giocatore ${index + 1}`,
        score: 0,
      }));
  
      setPlayers(initialPlayers); // Imposta i giocatori
      setShowPopup(false); // Nasconde il popup
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

              {/* 🔹 Aggiungi qui il messaggio di avviso sotto la lista delle categorie */}
              <p className={`category-warning ${selectedCategories.length < 5 ? "red" : "green"}`}>
                {selectedCategories.length < 5 
                  ? "Seleziona almeno 5 categorie per iniziare!" 
                  : "Minimo raggiunto! Puoi selezionare altre categorie se vuoi."}
              </p>
            </div>
            <button 
              className={`start-game-btn ${selectedCategories.length < 5 ? "disabled" : "enabled"}`} 
              onClick={startGame} 
              disabled={selectedCategories.length < 5}
            >
              INIZIA IL GIOCO
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