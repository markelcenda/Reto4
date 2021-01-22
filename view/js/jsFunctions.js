document.addEventListener('DOMContentLoaded', function (event) {

    var btnLeerMas = document.querySelectorAll(".leerMas");

    for (let i = 0; i < btnLeerMas.length; i++) {

        btnLeerMas[i].addEventListener('click', leerMas);

    }

    window.onscroll = function () { scrollFunction() };

});

//Carga los textos necesario al modal de carusel cuando la pantlla tiene un ancho menor a 1120px
function leerMas() {

    var posicion = this.value;

    var titulos = document.querySelectorAll(".texto h2");
    var informacion = document.querySelectorAll(".texto p");

    document.querySelector('.titulo').innerHTML = titulos[posicion].innerHTML;
    document.querySelector('.cuerpo').innerHTML = informacion[posicion].innerHTML;

}

var mybutton = document.querySelector("#topBtn");

function scrollFunction() {

    if (mybutton != null) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var miApp = angular.module("miApp", []);
miApp.controller("miControlador", function ($scope, $http) {

    $scope.error = "";
    $scope.username = "";
    $scope.nombre = "";
    $scope.apellidos = "";
    $scope.email = "";
    $scope.password = "";

    loadUltimosAsociados();

    //Carga las tres ultimas tiendas asociadas para mostrarlas en el index
    function loadUltimosAsociados() {

        var url = "controller/cTiendas.php";

        $http.get(url)
            .then(function (response) {

                console.log(response.data.listUltimasTres);
                
                $scope.tiendas = response.data.listUltimasTres;
                

            });

    }


    //Funcion de registro de usuario
    $scope.registrarse = function () {

        if ($scope.username == "" || $scope.nombre == "" || $scope.apellidos == "" || $scope.email == "" || $scope.password == "") {

            $scope.error = "Ninguno de los campos puede estar vacio";

        } else {

            //Detecta si el formato del correo electronico es valio para permitir el registro
            if (/\w+\@\w+\.\w+/.test($scope.email)) {

                var url = "controller/cInsertarUsuario.php";
                var data = { 'username': $scope.username, 'nombre': $scope.nombre, 'apellidos': $scope.apellidos, 'email': $scope.email, 'password': $scope.password };

                $http.post(url, data)
                    .then(function (response) {

                        if (response.data.error == "Registro realizado con exito") {

                            alert(response.data.error);
                            window.location.reload();

                        } else {

                            $scope.error = response.data.error;

                        }

                    });
            } else {

                $scope.error = "El correo electronico no es valido";

            }

        }

    }

    //Vacia todas las variables al cerrar el modal de registro
    $scope.cerrarRegistro = function () {
        $scope.error = "";
        $scope.username = "";
        $scope.nombre = "";
        $scope.apellidos = "";
        $scope.email = "";
        $scope.password = "";
    }

    //Redirige a la pagina modeloTienda 
    $scope.visitarTienda = function (id){

        pagina = "view/pages/modeloTiendas.html?" + id;
        window.location.href = pagina;

    }

});
