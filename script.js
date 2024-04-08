
// Gameboard module which contains the logic for getting and resetting a gameboard.
const gameBoard = (function () {
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];

    function getBoard() {
        return board;

    }

    function resetBoard() {
        for(let i = 0; i < board.length; i++) {
            board[i] = "";
        }

    }

    return {
        getBoard, resetBoard
    };

})();

               

// Game module which contains all the game logic.
const game = (function () {

})();


// Factory function for creating a player.
function createPlayer(name, mark) {
    return { name, mark };
    
}