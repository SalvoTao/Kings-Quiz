import React from "react";
import "./styles/SetupGame.css";

/**
 * Componente SetupGame
 * - Permette di selezionare il numero di giocatori
 * - Permette di scegliere le categorie del quiz
 * - Mostra un avviso se non vengono selezionate almeno 5 categorie
 * - Invia i dati selezionati ad App.jsx per avviare il gioco
 */
const SetupGame = ({
    setPlayers,
    setShowPopup,
    startGame,
    numPlayers,
    setNumPlayers,
    selectedCategories,
    setSelectedCategories
}) => {
    
    // 🔹 Lista di categorie disponibili
    const categoriesList = [
        "Sport", "Scienza", "Geografia", "Storia", "Cinema", "Musica", "Letteratura", "Tecnologia"
    ];

    /**
     * Funzione per selezionare/deselezionare una categoria
     */
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    /**
     * Funzione chiamata quando si preme "INIZIA IL GIOCO"
     */
    const handleStartGame = () => {
        if (selectedCategories.length >= 5) {
            startGame(); // ✅ Avvia il gioco
            setTimeout(() => {
                setShowPopup(false); // ✅ Chiude il popup DOPO che i giocatori sono stati creati
            }, 100);
        }
    };

    return (
        <>
            {/* 🔹 Overlay per sfocare lo sfondo */}
            <div className="overlay"></div>
            
            {/* 🔹 Popup iniziale */}
            <div className="popup-overlay">
                <div className="popup">
                    {/* Logo */}
                    <img src="/images/kings-quiz-logo.png" alt="Kings Quiz Logo" className="popup-logo" />

                    {/* Selezione numero giocatori */}
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

                    {/* Selezione delle categorie */}
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

                    {/* Avviso per selezione minima di 5 categorie */}
                    <p className={`category-warning ${selectedCategories.length < 5 ? "red" : "green"}`}>
                        {selectedCategories.length < 5
                            ? "Seleziona almeno 5 categorie per iniziare!"
                            : "Minimo raggiunto! Puoi selezionare altre categorie se vuoi."}
                    </p>

                    {/* Pulsante per avviare il gioco */}
                    <button
                        className={`start-game-btn ${selectedCategories.length < 5 ? "disabled" : "enabled"}`}
                        onClick={handleStartGame} // ✅ Ora avvia correttamente il gioco
                        disabled={selectedCategories.length < 5}
                        style={{ marginBottom: "20px" }} // Aggiunge spazio sotto il pulsante
                    >
                        INIZIA IL GIOCO
                    </button>

                    {/* Versione del gioco */}
                    <p className="game-version">
                        &copy; {new Date().getFullYear()} Kings Quiz | Versione 1.0.0
                    </p>
                </div>
            </div>
        </>
    );
};

export default SetupGame;