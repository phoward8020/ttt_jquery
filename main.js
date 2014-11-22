// can't do shit with the DOM 'til it's loaded, bitches
document.addEventListener('DOMContentLoaded', function (){
    
    var anyBox = document.querySelectorAll(".box");
    console.log(anyBox);

    anybox.addEventListener('click', function() {
        alert('BOOM!')
    })

});

