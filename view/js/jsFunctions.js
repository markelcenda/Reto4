document.addEventListener('DOMContentLoaded', function (event) {

    var btnLeerMas = document.querySelectorAll(".leerMas");

    for (let i = 0; i < btnLeerMas.length; i++) {

        btnLeerMas[i].addEventListener('click', leerMas);

    }

    window.onscroll = function () { scrollFunction() };

});

function leerMas() {

    var posicion = this.value;

    var titulos = document.querySelectorAll(".texto h2");
    var informacion = document.querySelectorAll(".texto p");

    document.querySelector('.modal-title').innerHTML = titulos[posicion].innerHTML;
    document.querySelector('.modal-body').innerHTML = informacion[posicion].innerHTML;

}

var mybutton = document.getElementById("topBtn");

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
