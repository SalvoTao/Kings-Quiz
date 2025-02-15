import React, { useState } from "react";
import Board from "./Board";
import PlayerList from "./PlayerList";
import "./styles/App.css";
import SetupGame from "./SetupGame";

function App() {
  const [players, setPlayers] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [numPlayers, setNumPlayers] = useState(2);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const startGame = () => {
    if (selectedCategories.length >= 5) {
      // Selezioniamo 5 categorie casuali tra quelle scelte
      const shuffledCategories = [...selectedCategories].sort(() => Math.random() - 0.5);
      const selected = shuffledCategories.slice(0, 5);

      console.log("Categorie selezionate per la griglia:", selected); // DEBUG

      setSelectedCategories(selected); // 🔹 Ora aggiorna lo stato correttamente
      // ✅ Creiamo i giocatori automaticamente
      const initialPlayers = Array.from({ length: numPlayers }, (_, index) => ({
        id: index + 1,
        name: `Giocatore ${index + 1}`,
        score: 0,
      }));

      setPlayers(initialPlayers);
      setShowPopup(false); // ✅ CHIUDE IL POPUP
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
      {showPopup && <div className="overlay"></div>} {/* Aggiunto l'overlay sfocato */}

      {/* Popup iniziale di SetupGames */}
      {showPopup && (
        <SetupGame
          setPlayers={setPlayers}
          setShowPopup={setShowPopup}
          startGame={startGame}
          numPlayers={numPlayers}
          setNumPlayers={setNumPlayers}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      )}

      {/* Griglia del quiz */}
      <div className="board-wrapper">
        <Board selectedCategories={selectedCategories} />
      </div>

      {/* Lista giocatori */}
      <PlayerList players={players} setPlayers={setPlayers} />
    </div>
  );
}

export default App;