document.addEventListener('DOMContentLoaded', function (event) {

    var btnLeerMas = document.querySelectorAll(".leerMas");

    for (let i = 0; i < btnLeerMas.length; i++) {

        btnLeerMas[i].addEventListener('click', leerMas);

    }

});

function leerMas() {

    var posicion = this.value;

    var titulos = document.querySelectorAll(".texto h2");
    var informacion = document.querySelectorAll(".texto p");

    document.querySelector('.titulo').innerHTML = titulos[posicion].innerHTML;
    document.querySelector('.cuerpo').innerHTML = informacion[posicion].innerHTML;

}

var miApp = angular.module("miApp", []);
miApp.controller("miControlador", function ($scope, $http) {

    $scope.error = "";
    $scope.username = "";
    $scope.nombre = "";
    $scope.apellidos = "";
    $scope.email = "";
    $scope.password = "";

    $scope.registrarse = function () {

        if ($scope.username == "" || $scope.nombre == "" || $scope.apellidos == "" || $scope.email == "" || $scope.password == "") {

            $scope.error = "Ninguno de los campos puede estar vacio";

        } else {

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
            }else{

                $scope.error = "El correo electronico no es valido";

            }

        }

    }

    $scope.cerrarRegistro = function () {
        $scope.error = "";
        $scope.username = "";
        $scope.nombre = "";
        $scope.apellidos = "";
        $scope.email = "";
        $scope.password = "";
    }

});
