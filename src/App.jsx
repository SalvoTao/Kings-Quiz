import React, { useState } from "react";
import Board from "./Board";
import PlayerList from "./PlayerList";
import "./styles/App.css";
import SetupGame from "./SetupGame";

function App() {
  // 📌 Stato globale dell'applicazione
  const [players, setPlayers] = useState([]); // Lista dei giocatori
  const [showPopup, setShowPopup] = useState(true); // Stato del popup iniziale
  const [numPlayers, setNumPlayers] = useState(2); // Numero di giocatori selezionato
  const [selectedCategories, setSelectedCategories] = useState([]); // Categorie selezionate

  /**
   * 📌 Funzione per iniziare il gioco
   * - Verifica che siano state selezionate almeno 5 categorie
   * - Sceglie casualmente 5 categorie tra quelle selezionate
   * - Genera automaticamente i giocatori
   * - Nasconde il popup
   */
  const startGame = () => {
    if (selectedCategories.length >= 5) {
      // 🔹 Mischia l'array delle categorie e ne prende 5 casualmente
      const shuffledCategories = [...selectedCategories].sort(() => Math.random() - 0.5);
      const selected = shuffledCategories.slice(0, 5);

      // 🔹 Imposta i giocatori con punteggio iniziale 0
      const initialPlayers = Array.from({ length: numPlayers }, (_, index) => ({
        id: index + 1,
        name: `Giocatore ${index + 1}`,
        score: 0,
      }));

      setPlayers(initialPlayers);
      setSelectedCategories(selected); // 🔹 Ora aggiorna lo stato correttamente
      setShowPopup(false); // 🔹 Chiude il popup iniziale
    }
  };

  return (
    <div className="app-container">
      {/* 🔹 Sfocatura dello sfondo quando il popup è attivo */}
      {showPopup && <div className="overlay"></div>}

      {/* 🔹 Popup iniziale per selezionare giocatori e categorie */}
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
        <Board selectedCategories={selectedCategories} />
      </div>

      {/* 🔹 Barra dei giocatori */}
      <PlayerList players={players} setPlayers={setPlayers} />
    </div>
  );
}

export default App;