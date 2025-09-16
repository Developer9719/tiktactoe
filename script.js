// Use an Immediately Invoked Function Expression (IIFE) to create a private scope for all the game code.
// This prevents variables from polluting the global window object.
(function() {
    // A factory function for creating player objects.
    // It returns an object with methods and properties, but it doesn't need 'new'.
    const Player = (name, mark) => {
        return { name, mark };
    };

    // An IIFE module for managing the game board's state and rendering.
    // It encapsulates the board data and functions that operate on it.
    const gameboardModule = (function() {
        let gameboard = ["", "", "", "", "", "", "", "", ""];
        const gameboardElement = document.getElementById("gameboard");

        const render = () => {
            gameboardElement.innerHTML = "";
            gameboard.forEach((mark, index) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = index;
                cell.textContent = mark;
                // Add class to change the color of the mark
                if (mark === "X") {
                    cell.classList.add("x");
                } else if (mark === "O") {
                    cell.classList.add("o");
                }
                gameboardElement.appendChild(cell);
            });
        };

        const updateCell = (index, mark) => {
            if (gameboard[index] === "") {
                gameboard[index] = mark;
                return true;
            }
            return false;
        };

        const getBoard = () => gameboard;

        const reset = () => {
            gameboard = ["", "", "", "", "", "", "", "", ""];
        };

        return {
            render,
            updateCell,
            getBoard,
            reset
        };
    })();

    // An IIFE module to control the main game flow.
    // It handles turns, win conditions, and UI updates.
    const gameController = (function() {
        const playerX = Player("Player X", "X");
        const playerO = Player("Player O", "O");
        let currentPlayer = playerX;
        let gameOver = false;
        const statusMessage = document.getElementById("status-message");

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        const handleCellClick = (e) => {
            if (gameOver) return;

            const index = e.target.dataset.index;
            if (gameboardModule.updateCell(index, currentPlayer.mark)) {
                gameboardModule.render();
                
                if (checkForWin()) {
                    statusMessage.textContent = `${currentPlayer.name} wins!`;
                    gameOver = true;
                } else if (checkForTie()) {
                    statusMessage.textContent = "It's a tie!";
                    gameOver = true;
                } else {
                    switchTurn();
                }
            }
        };

        const switchTurn = () => {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
            statusMessage.textContent = `${currentPlayer.name}'s turn`;
        };

        const checkForWin = () => {
            const board = gameboardModule.getBoard();
            return winningCombinations.some(combination => {
                return combination.every(index => board[index] === currentPlayer.mark);
            });
        };

        const checkForTie = () => {
            const board = gameboardModule.getBoard();
            return board.every(cell => cell !== "");
        };

        const restartGame = () => {
            gameboardModule.reset();
            gameboardModule.render();
            currentPlayer = playerX;
            gameOver = false;
            statusMessage.textContent = `${currentPlayer.name}'s turn`;
        };

        const setupEventListeners = () => {
            document.getElementById("gameboard").addEventListener("click", handleCellClick);
            document.getElementById("restart-btn").addEventListener("click", restartGame);
        };

        // The init function is called at the very beginning to start the game.
        const init = () => {
            gameboardModule.render();
            setupEventListeners();
        };

        // The return statement exposes the `init` function to the outside world.
        return {
            init
        };
    })();

    // Start the game by calling the exposed `init` function.
    gameController.init();
})();