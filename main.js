// can't do shit with the DOM 'til it's loaded, bitches
document.addEventListener('DOMContentLoaded', function (){
    
    var turnCounter = 0;

    var claimSquare = function () {
        alert('BOOM! BOOM!')
        turnCounter += 1;
        console.log(turnCounter);
    }

    var anyBox = document.querySelectorAll(".box");
    console.log(anyBox);

    anyBox[0].addEventListener('touchstart', function() {
        
    })

    anyBox[0].addEventListener('click', claimSquare())

});

