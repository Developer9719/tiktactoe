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

(function() { // IIFE for game board module
    const board = [ // Game board array
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
})();

function createPlayer(name, symbol) { // Player factory function
    return {
        name: name,
        symbol: symbol
    };
}

// Create the player objects
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');