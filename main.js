// Set up gameSettings[] as global variable
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
        document.querySelector("#box" + [i]).classList.remove("fa-circle-o");
        document.querySelector("#box" + [i]).classList.remove("fa-times");
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

function claimSquare(squareToClaim) {
    // exit if gameOver or square already claimed
    if (gameOver) {
        console.log('Current game is over. Type resetGame() to start again.');
        return;
    }; 
    if (squares[squareToClaim].claimedBy !== "_") {
        console.log('ERROR: Cannot claim square ' + squares[squareToClaim].squareNum + 
                    '. Square was already claimed by ' + squares[squareToClaim].claimedBy +
                    'on turn ' + squares[squareToClaim].onTurn + '.');
        return;
    } 

    // increment turnCounter & decrement availableSquares
    turnCounter += 1;
    availableSquares -= 1;

    // claim square (update model; update view; log to console; check for gameOver condition)
    if (turnCounter % 2 === 0) {
        // claim for 'O': 
        squares[squareToClaim].claimedBy = "O";
        squares[squareToClaim].onTurn = turnCounter;
        document.querySelector("#box" + squareToClaim).classList.add("fa-circle-o");
        console.log('Square ' + squareToClaim + " claimed for Team O.");
    } else {
        // claim for 'X'
        squares[squareToClaim].claimedBy = "X";
        squares[squareToClaim].onTurn = turnCounter;
        document.querySelector("#box" + squareToClaim).classList.add("fa-times");
        console.log('Square ' + squareToClaim + " claimed for Team X.")
    };
    printGameBoardToConsole();
    isGameOver(squareToClaim);
    if (gameOver) {
        // do something cool.
        console.log(gameResult);
        alert(gameResult);
    }
};



// can't do shit with the DOM 'til it's loaded, bitches
document.addEventListener('DOMContentLoaded', function (){
    
    var square0 = document.querySelector("#square0");
    square0.addEventListener('click', function(){
        claimSquare(0);
    });
    var square1 = document.querySelector("#square1");
    square1.addEventListener('click', function(){
        claimSquare(1);
    });
    var square2 = document.querySelector("#square2");
    square2.addEventListener('click', function(){
        claimSquare(2);
    });
    var square3 = document.querySelector("#square3");
    square3.addEventListener('click', function(){
        claimSquare(3);
    });
    var square4 = document.querySelector("#square4");
    square4.addEventListener('click', function(){
        claimSquare(4);
    });
    var square5 = document.querySelector("#square5");
    square5.addEventListener('click', function(){
        claimSquare(5);
    });
    var square6 = document.querySelector("#square6");
    square6.addEventListener('click', function(){
        claimSquare(6);
    });
    var square7 = document.querySelector("#square7");
    square7.addEventListener('click', function(){
        claimSquare(7);
    });
    var square8 = document.querySelector("#square8");
    square8.addEventListener('click', function(){
        claimSquare(8);
    });

    var resetButton = document.querySelector("#reset");
    resetButton.addEventListener('click', function(){
        resetGame();
    });

//     var boxes = document.querySelectorAll(".box");

//     for ( var i = 0 ; i < 9 ; i++ ) {
//         console.log('Adding event listener to boxNum ' + i);
//         document.querySelector("#box" + i).addEventListener('click', function() {
//             claimSquare(i); // << boxNum changes globally each iteration, so we can only update box8
//         });
//     };
});

