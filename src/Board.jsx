import React from "react";
import "./styles/Board.css";

const Board = ({ selectedCategories = [] }) => {
  // Assicuriamoci che ci siano esattamente 5 categorie
  const categories = selectedCategories.length === 5 ? selectedCategories : ["?", "?", "?", "?", "?"];
  const points = [100, 200, 300, 400, 500];

  return (
    <div className="board">
      {/* RIGA DELLE CATEGORIE */}
      {categories.map((category, index) => (
        <div key={index} className="header">{category}</div>
      ))}

      {/* GRIGLIA DELLE DOMANDE */}
      {points.map((point, rowIndex) =>
        categories.map((category, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="cell">
            {point}
          </div>
        ))
      )}
    </div>
  );
};

export default Board;