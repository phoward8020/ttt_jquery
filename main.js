// Set up gameSettings[] as global variable
// TODO: refactor - change gameSettings to object to keep window object clean, 
//          update all refs to values using dot notation
var gameSettings = [    gameOver = false,
                        gameResult = "",
                        turnCounter = 0,
                        availableSquares = 9,
                        squares = [ {squareNum: 0, claimedBy: "_", onTurn: 0},
                                    {squareNum: 1, claimedBy: "_", onTurn: 0},
                                    {squareNum: 2, claimedBy: "_", onTurn: 0},
                                    {squareNum: 3, claimedBy: "_", onTurn: 0},
                                    {squareNum: 4, claimedBy: "_", onTurn: 0},
                                    {squareNum: 5, claimedBy: "_", onTurn: 0},
                                    {squareNum: 6, claimedBy: "_", onTurn: 0},
                                    {squareNum: 7, claimedBy: "_", onTurn: 0},
                                    {squareNum: 8, claimedBy: "_", onTurn: 0},
                                 ],
                        triads = [  [0, 1, 2],
                                    [3, 4, 5],
                                    [6, 7, 8],
                                    [0, 3, 6],
                                    [1, 4, 7],
                                    [6, 7, 8],
                                    [0, 4, 8],
                                    [6, 4, 2]
                                 ]
                    ];

// REQUIRED FUNCTIONS
//  - printGameBoardToConsole()
//  - resetGame()
//  - isGameOver()
//  - claimSquare()
//
// To add: undoTurn(), playbackGame()
function printGameBoardToConsole() {
    console.log('Turn ' + turnCounter + ':');
    console.log(squares[0].claimedBy + " " + squares[1].claimedBy + " " + squares[2].claimedBy);
    console.log(squares[3].claimedBy + " " + squares[4].claimedBy + " " + squares[5].claimedBy);
    console.log(squares[6].claimedBy + " " + squares[7].claimedBy + " " + squares[8].claimedBy);
};

function resetGame() {
    // reset model layer
    gameSettings = [    gameOver = false,
                        gameResult = "",
                        turnCounter = 0,
                        availableSquares = 9,
                        squares = [ {squareNum: 0, claimedBy: "_", onTurn: 0},
                                    {squareNum: 1, claimedBy: "_", onTurn: 0},
                                    {squareNum: 2, claimedBy: "_", onTurn: 0},
                                    {squareNum: 3, claimedBy: "_", onTurn: 0},
                                    {squareNum: 4, claimedBy: "_", onTurn: 0},
                                    {squareNum: 5, claimedBy: "_", onTurn: 0},
                                    {squareNum: 6, claimedBy: "_", onTurn: 0},
                                    {squareNum: 7, claimedBy: "_", onTurn: 0},
                                    {squareNum: 8, claimedBy: "_", onTurn: 0},
                                 ],
                        triads = [  [0, 1, 2],
                                    [3, 4, 5],
                                    [6, 7, 8],
                                    [0, 3, 6],
                                    [1, 4, 7],
                                    [6, 7, 8],
                                    [0, 4, 8],
                                    [6, 4, 2]
                                 ]
                    ];
    // reset interface
    for ( i = 0 ; i < squares.length ; i++ ) {
        
        // busted-ass old school javascript way:
        // document.querySelector("#box" + [i]).classList.remove("fa-circle-o");
        // document.querySelector("#box" + [i]).classList.remove("fa-times");

        // new jQuery hotness:
        $("#box" + [i]).removeClass('fa-circle-o fa-times');

    };

    // log result
    console.log('Game has been reset.');
    printGameBoardToConsole();
};

function currentPlayer() {
    if (turnCounter % 2 === 0) {
        return "O"
    } else {
        return "X"
    };
}

function isGameOver(lastSquareClaimed) {
    // check if last move a winner by looping thru triads
    for ( i = 0 ; i < triads.length ; i++ ) {
        // if lastSquareClaimed in the triad, keep checking
        if (triads[i].indexOf(lastSquareClaimed) >= 0) {
            // if currentPlayer owns all squares in the triad, (s)he wins
            if  (squares[triads[i][0]].claimedBy === currentPlayer() &&
                 squares[triads[i][1]].claimedBy === currentPlayer() &&
                 squares[triads[i][2]].claimedBy === currentPlayer()) {
                    // currentPlayer wins
                    gameOver = true;
                    gameResult = 'Game Over. Team ' + currentPlayer() + ' roolz.'
                    return;
                }
        }
    }
    // if last move wasn't a winner, was last available square just played?
    if (availableSquares === 0) {
        gameOver = true;
        gameResult = "Ran out of squares! Try again."
        return;
    }
    // game ain't over yet
    return false;
};

function claimSquare(event) {
    var squareToClaim = event.data.squareToClaim;
    // exit if gameOver or square already claimed
    if (gameOver) {
        console.log('Current game is over. Type resetGame() to start again.');
        return;
    }; 
    if (squares[squareToClaim].claimedBy !== "_") {
        console.log('ERROR: Cannot claim square ' + squares[event.data.squareToClaim].squareNum + 
                    '. Square was already claimed by ' + squares[event.data.squareToClaim].claimedBy +
                    'on turn ' + squares[event.data.squareToClaim].onTurn + '.');
        return;
    } 

    // increment turnCounter & decrement availableSquares
    turnCounter += 1;
    availableSquares -= 1;

    var playerIcon;
    currentPlayer() === "X" ? playerIcon = "fa-times" : playerIcon = "fa-circle-o";

    squares[squareToClaim].claimedBy = currentPlayer();
    squares[squareToClaim].onTurn = turnCounter;
    $("#box" + squareToClaim).addClass(playerIcon);
    console.log('Square ' + squareToClaim + " claimed for Team " + currentPlayer() + ".");

    printGameBoardToConsole();
    isGameOver(squareToClaim);
    if (gameOver) {
        // do something cool.
        console.log(gameResult);
        alert(gameResult);
    }
};

function flashySquares(event) {
    $(this)
        .toggle("pulsate")
        .toggle("pulsate")
        .animate({
            opacity: 0.15},
            100)
        .animate({
            opacity: 1.0},
            100);
    };

// kickin' it jQuery style.
$(function(){

    // On page load, reset everything
    resetGame();

    for ( var i = 0 ; i < squares.length ; i++ ) {
        $('#square' + i).on('click', {squareToClaim : i}, claimSquare);
    };

    $('#reset').on('click', resetGame);
    $('.box').on('click', flashySquares);
})