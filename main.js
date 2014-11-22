// can't do shit with the DOM 'til it's loaded, bitches
document.addEventListener('DOMContentLoaded', function (){
    
    var anyBox = document.querySelectorAll(".box");
    console.log(anyBox);

    anyBox[0].addEventListener('touchstart', function() {
        alert('BOOM!')
    })

});

