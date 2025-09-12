/**
 * Pseudo code for a simple Tic Tac Toe game
 * 
 * Goal: Have as little global code as possible.
 * - Use factory functions
 * - Put the factories in IIFEs if there only needed once
 * - Everything needs to be inside one of the objects
 * - Focus on playing the game in the console before adding the UI
 *   - Create a new object to handle the UI
 *   - Add user input for player names, start and restart buttons and a results screen
 * 
 * 1. Create a 3x3 grid for the game board in an array inside an object.
 * 2. Store players as objects with properties like name and symbol (X or O).
 * 3. Store the game flow as an object with properties like currentPlayer and gameStatus.
 */

// IIFE
(function() { // Creates a private scope for all code inside it
    const player = (name, symbol) => { // Creates and returns a player object
        return { name, symbol };
    }

    const gameBoardModule = (function() { // IIFE
        // The IIFE creates all variables and functions inside it but does not run the functions.
        // This means that the variables and functions are private and cannot be accessed from outside the IIFE.
        let gameboard = ["", "", "", "", "", "", "", "", ""];

        // Renders gameboard to website 
        const renderElement = document.getElementById('gameboard');
        const render = () => { // Arrow function syntax defines a function
            renderElement.innerHTML = ""; // Clear previous content

            gameboard.forEach((symbol, index) => {
                const cell = document.createElement('div'); // For each element in the array, create a div.
                // This creates 9 divs.

                cell.classList.add('cell'); // Add a cell class to each div.
                cell.dataset.index = index; // Add a data-index attribute to each div with the index of the array.
                cell.textContent = symbol; // Set the text content of the div to the symbol (X or O).

                renderElement.appendChild(cell); // Append the div to the gameboard element in the HTML.
            });
        }

        const updateCell = (index, symbol) => { // Arrow function syntax defines a function
            if (gameboard[index] === "") { // If the cell is empty
                gameboard[index] = symbol;
                return true; // Return true if the cell was updated
            } else {
                return false; // Return false if the cell was not updated
            }
        }

        const getboard = () => gameboard; // Arrow function syntax defines a function

        const reset = () => { // Arrow function syntax defines a function
            gameboard = ["", "", "", "", "", "", "", "", ""]; // Reset the gameboard array
        }

        return {
            render,
            updateCell,
            getboard,
            reset
        }
        /**
         * The return statement is not the same as calling render(); It just makes the function available 
         * outside the IIFE to be called later.
         * 
         * The functions and variables inside the IIFE are private and cannot be accessed from outside the IIFE.
         * The return statement creates a public interface for the IIFE.
         */

    })(); // Immediately invoked function expression

    const gameController = (function() { // IIFE
        const playerX = player("Player X", "X");
        const playerO = player("Player O", "O");
        let currentPlayer = playerX;
        let gameOver = false;
        const statusMessage = document.getElementById('status-message');
        
        const winningCombinations = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6]
        ];

        const handleCellClick = (event) => {
            
        }
    })(); // Immediately invoked function expression

})();