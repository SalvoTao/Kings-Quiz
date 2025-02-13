import React from "react";
import "./styles/Board.css";

// Definiamo le categorie e i punteggi
const categories = ["Sport", "Corpo Umano", "Geografia", "Scienza", "Storia"];
const points = [100, 200, 300, 400, 500];

function Board({ onCellClick }) {
  return (
    <div className="board">
      {/* Righe delle categorie */}
      {categories.map((category, index) => (
        <div key={index} className="header">
          {category}
        </div>
      ))}

      {/* Griglia delle domande */}
      {points.map((point) =>
        categories.map((category, index) => (
          <div key={`${category}-${point}`} className="cell" onClick={() => onCellClick(point, category)}>
            {point}
          </div>
        ))
      )}
    </div>
  );
}

export default Board;