// IFEE - Immediately Invoked Function Expression
// Executes immediately after it's defined
(function() {  
    // Factory Function to create and return objects
    // Takes in name and mark parameters to use as object properties
    // Calling: const playerX = Player("Player X", "X");
    /**
     * const player1 = {
     *  name: "Player X",
     *  mark: "X"
     * } - This is a literal object definition
     */
    const Player = (name, mark) => {
        return { name, mark };
    };
    // Nested IIFE
    const gameboardModule = (function() {
        let gameboard = ["", "", "", "", "", "", "", "", ""]; // Defines an array with 9 elements
        const gameboardElement = document.getElementById("gameboard"); // Gets the gameboard element from the DOM

        // Render function
        // Has the same format as a factory function but is not a factory function because it does not 
        // return an object.
        const render = () => { 
            gameboardElement.innerHTML = "";
            gameboard.forEach((mark, index) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = index;
                cell.textContent = mark;
                
                if (mark === "X") {
                    cell.classList.add("x");
                } else if (mark === "O") {
                    cell.classList.add("o");
                }
                gameboardElement.appendChild(cell);
            });
        };

        // UpdateCell function 
        const updateCell = (index, mark) => {
            if (gameboard[index] === "") {
                gameboard[index] = mark;
                return true;
            }
            return false;
        };

        // GetBoard function with one return line
        /**
         * Same as 
         * const getBoard = () => {
         *      return gameboard;
         * }
         */ 
        const getBoard = () => gameboard;

        // Reset function to empty the gameboard array
        const reset = () => {
            gameboard = ["", "", "", "", "", "", "", "", ""];
        };

        // Since this is an IIFE, you cant access anything inside it from the outside
        // The return object here allows you to access these functions outside the IIFE
        return {
            render,
            updateCell,
            getBoard,
            reset
        };
    })();

    // IIFE
    const gameController = (function() {
        // Creating two player objects
        const playerX = Player("Player X", "X");
        const playerO = Player("Player O", "O");
        // Sets status elements of the game
        let currentPlayer = playerX;
        let gameOver = false;
        const statusMessage = document.getElementById("status-message");

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Handles cell click function
        // (e) is the event object passed by the event listener
        const handleCellClick = (e) => {
            if (gameOver) return;

            // e.target is the clicked element
            // .dataset.index gets the data-index attribute of the clicked element, same as grabbing a class or 
            // id attribute 
            const index = e.target.dataset.index;
            // Sets the player mark in the clicked cell if it's empty
            if (gameboardModule.updateCell(index, currentPlayer.mark)) {
                // Re-render the gameboard to show the updated mark
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
            // Ternary operator: Consise if/else statement  
            // currentPlayer === playerX: Checks if currentPlayer is playerX
            // playerO is returned if true 
            // playerX is returned if false
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
            statusMessage.textContent = `${currentPlayer.name}'s turn`;
        };

        const checkForWin = () => {
            // Gets the gameboard array with the current marks place
            const board = gameboardModule.getBoard();
            // .some() method checks if at least one element in the array passes the test implemented 
            // by the provided function
            return winningCombinations.some(combination => {
                // .every() method checks if all elements in the array pass the test implemented by the
                // provided function
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

        const init = () => {
            gameboardModule.render();
            setupEventListeners();
        };

        return {
            init
        };
    })();

    gameController.init();
})();