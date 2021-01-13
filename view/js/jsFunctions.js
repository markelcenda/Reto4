document.addEventListener('DOMContentLoaded', function (event) {

    var btnLeerMas = document.querySelectorAll(".leerMas");

    for (let i = 0; i < btnLeerMas.length; i++) {

        btnLeerMas[i].addEventListener('click',leerMas);

    }

});

function leerMas() {

    var posicion = this.value;

    var titulos = document.querySelectorAll(".texto h2");
    var informacion = document.querySelectorAll(".texto p");

    document.querySelector('.modal-title').innerHTML = titulos[posicion].innerHTML;
    document.querySelector('.modal-body').innerHTML = informacion[posicion].innerHTML;

}

