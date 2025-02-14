import React, { useState } from "react";
import Board from "./Board";
import PlayerList from "./PlayerList"; 
import "./styles/App.css";

function App() {
  const [players, setPlayers] = useState([]);

  // Funzione per aggiungere un giocatore
  const addPlayer = () => {
    if (players.length < 4) {
      const newPlayer = {
        id: players.length + 1,
        name: "",
        score: 0,
      };
      setPlayers([...players, newPlayer]);
    }
  };

  // Funzione per rimuovere un giocatore
  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  // Funzione per aggiornare il nome del giocatore
  const updatePlayerName = (id, newName) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, name: newName } : player
    ));
  };

  // Funzione per aggiornare il punteggio del giocatore
  const updatePlayerScore = (id, amount) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, score: player.score + amount } : player
    ));
  };

  return (
    <div className="app-container no-scroll" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="board-wrapper">
        <Board onCellClick={() => {}} />
      </div>

      {/* Sezione giocatori */}
      <PlayerList 
        players={players} 
        addPlayer={addPlayer} 
        removePlayer={removePlayer} 
        updatePlayerName={updatePlayerName} 
        updatePlayerScore={updatePlayerScore}
      />
    </div>
  );
}

export default App;