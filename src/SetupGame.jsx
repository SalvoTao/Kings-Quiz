import React, { useMemo, useCallback } from "react";
import "./styles/SetupGame.css";

const SetupGame = ({
    setPlayers,
    setShowPopup,
    startGame,
    numPlayers,
    setNumPlayers,
    selectedCategories,
    setSelectedCategories
}) => {

    // 📌 Lista delle categorie disponibili
    const categoriesList = useMemo(
        () => ["Sport", "Scienza", "Geografia", "Storia", "Cinema", "Musica", "Letteratura", "Tecnologia"],
        []
    );

    /**
     * 📌 Funzione per selezionare/deselezionare una categoria
     * - Se è già selezionata, la rimuove
     * - Altrimenti, la aggiunge
     */
    const toggleCategory = useCallback((category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
        );
    }, [setSelectedCategories]);

    /**
     * 📌 Avvia il gioco solo se ci sono almeno 5 categorie selezionate
     */
    const handleStartGame = () => {
        if (selectedCategories.length >= 5) {
            startGame();
            setShowPopup(false);
        }
    };

    return (
        <>
            {/* 🔹 Sfocatura dello sfondo */}
            <div className="overlay"></div>

            {/* 🔹 Popup di setup */}
            <div className="popup-overlay">
                <div className="popup">
                    <img src="/images/kings-quiz-logo.png" alt="Kings Quiz Logo" className="popup-logo" />

                    <h2>Seleziona il numero di giocatori:</h2>
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

                    {/* 🔹 Selezione delle categorie */}
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

                    {/* 🔹 Messaggio di avviso */}
                    <p className={`category-warning ${selectedCategories.length < 5 ? "red" : "green"}`}>
                        {selectedCategories.length < 5
                            ? "Seleziona almeno 5 categorie per iniziare!"
                            : "Minimo raggiunto! Puoi selezionare altre categorie se vuoi."}
                    </p>

                    {/* 🔹 Pulsante per iniziare il gioco */}
                    <button
                        className={`start-game-btn ${selectedCategories.length < 5 ? "disabled" : "enabled"}`}
                        onClick={handleStartGame}
                        disabled={selectedCategories.length < 5}
                        style={{ marginTop: "20px" }} // Aggiunge spazio sopra il pulsante
                    >
                        INIZIA IL GIOCO
                    </button>

                    {/* 🔹 Versione del gioco */}
                    <p className="game-version">
                        &copy; {new Date().getFullYear()} Kings Quiz | Versione 1.0.0
                    </p>
                </div>
            </div>
        </>
    );
};

export default SetupGame;