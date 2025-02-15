import React, { useState } from "react";
import "./styles/Popup.css";

const SetupGame = ({ setPlayers, setShowPopup, startGame }) => {
    const [numPlayers, setNumPlayers] = useState(2);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categoriesList = [
        "Sport", "Scienza", "Geografia", "Storia", "Cinema", "Musica", "Letteratura", "Tecnologia"
    ];

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <>
            {/* Overlay per sfocare solo lo sfondo */}
            <div className="overlay"></div>
            {/* Popup che rimane nitido */}
            <div className="popup-overlay">
                <div className="popup">
                    <img src="/images/kings-quiz-logo.png" alt="Kings Quiz Logo" className="popup-logo" />

                    <h2>Seleziona il numero di giocatori</h2>
                    <div className="player-selection">
                        <button
                            className={`num-btn ${numPlayers === 2 ? "disabled" : ""}`}
                            onClick={() => setNumPlayers((prev) => Math.max(2, prev - 1))}
                            disabled={numPlayers === 2}
                        >
                            -
                        </button>
                        <span className="num-display">{numPlayers}</span>
                        <button
                            className={`num-btn ${numPlayers === 5 ? "disabled" : ""}`}
                            onClick={() => setNumPlayers((prev) => Math.min(5, prev + 1))}
                            disabled={numPlayers === 5}
                        >
                            +
                        </button>
                    </div>

                    <h3>Scegli le categorie:</h3>
                    <div className="category-list">
                        {categoriesList.map((category) => (
                            <div
                                key={category}
                                className={`category-option ${selectedCategories.includes(category) ? "selected" : ""}`}
                                onClick={() => toggleCategory(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>

                    <p className={`category-warning ${selectedCategories.length < 5 ? "red" : "green"}`}>
                        {selectedCategories.length < 5
                            ? "Seleziona almeno 5 categorie per iniziare!"
                            : "Minimo raggiunto! Puoi selezionare altre categorie se vuoi."}
                    </p>

                    <button
                        className={`start-game-btn ${selectedCategories.length < 5 ? "disabled" : "enabled"}`}
                        onClick={() => {
                            if (selectedCategories.length >= 5) {
                                startGame(); // 🔹 ORA chiama correttamente la funzione di App.jsx
                            }
                        }}
                        disabled={selectedCategories.length < 5}
                    >
                        INIZIA IL GIOCO
                    </button>
                </div>
            </div>
        </>
    );
};

export default SetupGame;