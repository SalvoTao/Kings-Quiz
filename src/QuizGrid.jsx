import React from "react";
import "./styles/QuizGrid.css";

/**
 * Componente Board che gestisce la griglia del quiz.
 * Mostra le categorie selezionate in cima e i punteggi nelle celle.
 */
const QuizGrid = ({ selectedCategories = [] }) => {
  // Assicuriamoci che ci siano esattamente 5 categorie, altrimenti mostriamo i "?"
  const categories = selectedCategories.length === 5 ? selectedCategories : ["?", "?", "?", "?", "?"];
  const points = [100, 200, 300, 400, 500];

  return (
    <div className="board">
      {/* Intestazione con le categorie */}
      {categories.map((category, index) => (
        <div key={`header-${index}`} className="header">{category}</div>
      ))}

      {/* Creazione della griglia con punti */}
      {points.map((point, rowIndex) =>
        categories.map((_, colIndex) => (
          <div key={`cell-${rowIndex}-${colIndex}`} className="cell">
            {point}
          </div>
        ))
      )}
    </div>
  );
};

export default QuizGrid;