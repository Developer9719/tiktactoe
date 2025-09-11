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
        let gameboard = ["", "", "", "", "", "", "", "", ""];

        // Renders gameboard to website 
        const renderElement = document.getElementById('gameboard');
        const render = () => {
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

    })(); // Immediately invoked function expression
})()