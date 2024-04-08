
// Gameboard module which contains the logic for getting and resetting a gameboard.
const gameBoard = (function () {
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];

    function renderBoard() {
        let boardElement = ""; // Initiate empty HTML string
        board.forEach((square, index) => { 
            boardElement += `<div class="square">${square}</div>`;
        });

        document.querySelector('#game-board').innerHTML = boardElement;

    }

    function resetBoard() {
        for(let i = 0; i < board.length; i++) {
            board[i] = "";
        }

    }

    return {
        renderBoard,
        resetBoard
    };

})();

            

// Game module which contains all the game logic.
const game = (function () {
    const { renderBoard } = gameBoard; // Imports the renderBoard method from the gameBoard module.
    let currentPlayer;
    let player1;
    let player2;

    function startGame(player1Name, player2Name) {
        player1 = createPlayer(player1Name, "X"); // Create player 1
        player2 = createPlayer(player2Name, "O"); // Create player 2 
        currentPlayer = player1; // Set player 1 as the current player

        renderBoard();







    }

    function checkWin() {

    }

    function playerTurn() {
        currentPlayer = currentPlayer === player1 ? player2 : player1; // If current player is player 1, switch current player to player 2, else switch to player 1.


    }


    return { 
        startGame, 
        checkWin, 
        playerTurn };

})();

// Event attached on start button
document.getElementById("start-button").addEventListener("click", () => {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;

    game.startGame(player1Name, player2Name);
    console.log("Game started!");
    console.log(player1Name);
    console.log(player2Name);
});


// Factory function for creating a player.
function createPlayer(name, mark) {
    return { name, mark };
    
}