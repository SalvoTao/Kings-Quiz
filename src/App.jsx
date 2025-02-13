import React, { useState } from "react";
import Board from "./Board";
import PlayerList from "./PlayerList"; 
import "./styles/App.css"; // Nuovo percorso del CSS

function App() {
  const [players, setPlayers] = useState([]);

  const addPlayer = () => {
    const newPlayer = {
      id: players.length + 1,
      name: `Giocatore ${players.length + 1}`,
      score: 0,
    };
    setPlayers([...players, newPlayer]);
  };

  return (
    <div className="app-container no-scroll" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="board-wrapper">
        <Board onCellClick={() => {}} />
      </div>
      <PlayerList players={players} addPlayer={addPlayer} />
    </div>
  );
}

export default App;