// Ensures that board is displayed on the page initially. 
document.addEventListener("DOMContentLoaded", () => {
    gameBoard.renderBoard();

});

// Factory function for creating a player.
function createPlayer(name, mark) {
    return { name, mark };
    
}

// Gameboard module which contains the logic for getting and resetting a gameboard.
const gameBoard = (function () {
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];

    function getBoard() {
        return board;
    }

    function renderBoard() {
        let boardElement = ""; // Initiate empty HTML string
        board.forEach((square, index) => { 
            boardElement += `<div class="square">${square}</div>`;
        });

        document.querySelector('#game-board').innerHTML = boardElement;

    }
    
    // Checks if cell in board is empty
    function isCellEmpty(index) {
        return board[index] === "";

    }
    
    // Sets the mark on the cell in the board.
    function setCell(index, mark) {
        return board[index] = mark;


    }
    
    // Checks if the board is full.
    function isBoardFull() {
        for(let i = 0; i < board.length; i++) {
            if(board[i] === "") {
                return false;
                }
        }
        return true;

    }
    
    // Resets the board after restarting the game.
    function resetBoard() {
        for(let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        console.log("Restarted the game!");
        renderBoard();

    }

    return {
        isBoardFull,
        isCellEmpty,
        setCell,
        renderBoard,
        getBoard,
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
    // Checks all possible combinations to win the game.
    function checkWin(mark) {
        const board = gameBoard.getBoard();
        const combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 4, 8], [0, 3, 6], [1, 4, 7],
            [2, 5, 8], [2, 4, 6]
        ];

        for(let combination of combinations) {
            if(combination.every(index => board[index] === mark)) {
                return true;
            }
        }

        return false;

        

    }
    // Controlls the logic of player making a move.
    function makeMove(index) {
        if(gameBoard.isCellEmpty(index)) {
            gameBoard.setCell(index, currentPlayer.mark);

            renderBoard();

            if(checkWin(currentPlayer.mark)) {
                document.getElementById('display-results').innerHTML = `${currentPlayer.name} wins!`;
                return;
            }
            else if(gameBoard.isBoardFull()) {
                document.getElementById('display-results').innerHTML = 'It is a draw!';
                return;
            }
            else {
                playerTurn();
            }
        }


    
    

    }
     
    function playerTurn() {
        currentPlayer = currentPlayer === player1 ? player2 : player1; // If current player is player 1, switch current player to player 2, else switch to player 1.


    }


    return { 
        startGame, 
        makeMove,
        checkWin, 
        playerTurn };

})();

// Event attached on start button.
document.getElementById("start-button").addEventListener("click", () => {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;

    game.startGame(player1Name, player2Name);
    console.log("Game started!");
    console.log(player1Name);
    console.log(player2Name);
});

// Event attached on restart button. Resets board and clears the input fields for player name.
document.getElementById("restart-button").addEventListener("click", () => {
    gameBoard.resetBoard();
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
    document.getElementById('display-results').innerHTML = "";
});

// Event listener on each element with the class square.
document.getElementById('game-board').addEventListener("click", (event) => {
    if(event.target.classList.contains('square')) {
        const index = Array.from(event.target.parentNode.children).indexOf(event.target);
        game.makeMove(index);
        console.log("Marked");
    }
});

