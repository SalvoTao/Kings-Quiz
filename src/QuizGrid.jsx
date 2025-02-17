import React from "react";
import "./styles/QuizGrid.css";

/**
 * 📌 Componente responsabile della visualizzazione della griglia del quiz.
 * - Mostra le categorie selezionate nella riga superiore.
 * - Popola le celle con i punteggi predefiniti.
 */
const QuizGrid = ({ selectedCategories = [] }) => {
  // 📌 Garantisce che ci siano sempre 5 categorie visibili nella griglia.
  const categories =
    selectedCategories.length === 5 ? selectedCategories : ["?", "?", "?", "?", "?"];

  // 📌 Punteggi predefiniti delle domande.
  const points = [100, 200, 300, 400, 500];

  return (
    <div className="quiz-grid">
      {/* 🔹 Intestazione con le categorie */}
      {categories.map((category, index) => (
        <div key={index} className="category-header">
          {category}
        </div>
      ))}

      {/* 🔹 Griglia con le celle dei punteggi */}
      {points.map((point) =>
        categories.map((category, colIndex) => (
          <div key={`${colIndex}-${point}`} className="grid-cell">
            {point}
          </div>
        ))
      )}
    </div>
  );
};

export default QuizGrid;