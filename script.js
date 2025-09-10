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

// Step 1: The Working Console Game
const gameBoard = [ // 3x3 grid
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const player1 = {
    name: 'Player 1',
    symbol: 'X'
};

const player2 = {
    name: 'Player 2',
    symbol: 'O'
};

function gameFlow(gameStatus = 'start', playerTurn) {
    if (gameStatus === 'start') {
        console.log('Game started');
        console.log('Player 1 is X');
        console.log('Player 2 is O');
        console.log('Player 1 starts');
        currentPlayer = player1;
        gameStatus = 'inProgress';
        // Wait for player input
        

        gameFlow(gameStatus, currentPlayer); //
    } else if (gameStatus === 'inProgress') {
        console.log(`It's ${currentPlayer.name}'s turn.`);
        if (playerTurn = player1) {
            // Play turn

            if (checkWin(playedSpaces())) { // Return true if win
                gameStatus = 'win';
            } else {
                playerTurn = player2;
                gameFlow(gameStatus, playerTurn);
            }
        } else if (playerTurn = player2) {

        }
    } else if (gameStatus === 'win') {
        console.log(`${currentPlayer.name} wins!`);
    } else if (gameStatus === 'draw') {
        console.log('The game is a draw!');
    }
}

function checkWin(board) {

}

function playedSpaces() {
    
}

gameFlow();

// Step 2: The User Interface


// Step 3: Refactoring for using Factories and IIFEs and code cleanup


