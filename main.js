// can't do shit with the DOM 'til it's loaded, bitches
document.addEventListener('DOMContentLoaded', function (){
    
    var anyBox = document.querySelectorAll(".box");
    console.log(anyBox);

    for (var i = 0; i < anyBox.length; i++) {

    }


    document.addEventListener('click', function() {
        alert('BOOM!')
    })

});

