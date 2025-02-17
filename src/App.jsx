import React, { useState, useMemo } from "react";
import QuizGrid from "./QuizGrid";
import PlayerList from "./PlayerList";
import SetupGame from "./SetupGame";
import "./styles/App.css";

function App() {
  // 📌 Stato globale dell'applicazione
  const [players, setPlayers] = useState([]); // Giocatori
  const [showPopup, setShowPopup] = useState(true); // Mostrare/nascondere popup iniziale
  const [numPlayers, setNumPlayers] = useState(2); // Numero di giocatori selezionato
  const [selectedCategories, setSelectedCategories] = useState([]); // Categorie selezionate

  /**
   * 📌 Funzione per iniziare il gioco
   * - Seleziona 5 categorie casuali tra quelle scelte
   * - Crea i giocatori automaticamente
   * - Nasconde il popup
   */
  const startGame = () => {
    if (selectedCategories.length >= 5) {
      setPlayers(
        Array.from({ length: numPlayers }, (_, index) => ({
          id: index + 1,
          name: `Giocatore ${index + 1}`,
          score: 0,
        }))
      );

      // 🔹 Mischia e seleziona 5 categorie casuali
      setSelectedCategories((prevCategories) => {
        const shuffled = [...prevCategories].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 5);
      });

      setShowPopup(false); // Chiude il popup
    }
  };

  // 📌 Ottimizzazione: Memoizza le categorie per evitare re-render inutili
  const memoizedCategories = useMemo(() => selectedCategories, [selectedCategories]);

  return (
    <div className="app-container">
      {/* 🔹 Sfocatura dello sfondo quando il popup è attivo */}
      {showPopup && <div className="overlay"></div>}

      {/* 🔹 Popup iniziale */}
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

      {/* 🔹 Griglia del quiz */}
      <div className="board-wrapper">
        <QuizGrid selectedCategories={memoizedCategories} />
      </div>

      {/* 🔹 Barra dei giocatori */}
      <PlayerList players={players} setPlayers={setPlayers} />
    </div>
  );
}

export default App;