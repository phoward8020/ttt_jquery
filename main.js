var turnCounter = 0;

var claimSquare = function (squareToClaim) {
    turnCounter += 1;
    console.log(turnCounter);

    if (turnCounter % 2 === 0) {
        // claim for O
    } else {
        // claim for X
    };
}



// can't do shit with the DOM 'til it's loaded, bitches
document.addEventListener('DOMContentLoaded', function (){
    
    var anyBox = document.querySelectorAll(".box");
    console.log(anyBox);
    console.log(anyBox.length);

    anyBox[0].addEventListener('touchstart', function() {
        claimSquare()
    });

    anyBox[0].addEventListener('click', function(){
        claimSquare();
        document.querySelector(#1).
    });

});

