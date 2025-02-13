import React, { useState } from "react";
import Board from "./Board";
import PlayerList from "./PlayerList"; 
import "./styles/App.css";

function App() {
  const [players, setPlayers] = useState([]);

  // Funzione per aggiungere un giocatore
  const addPlayer = () => {
    if (players.length < 6) { // Limite massimo di 4 giocatori
      const newPlayer = {
        id: players.length + 1,
        name: `Giocatore ${players.length + 1}`,
        score: 0,
      };
      setPlayers([...players, newPlayer]);
    }
  };

  return (
    <div className="app-container no-scroll" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="board-wrapper">
        <Board onCellClick={() => {}} />
      </div>
      
      {/* Sezione giocatori */}
      <PlayerList players={players} addPlayer={addPlayer} />
    </div>
  );
}

export default App;