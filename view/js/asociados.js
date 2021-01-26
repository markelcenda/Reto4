let myApp = angular.module('app', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.listaAsociados = [];
    $scope.listaTipos = [];
    $scope.filter = "";

    /*MODAL USUARIO NUEVO*/
    $scope.error = "";
    $scope.username = "";
    $scope.nombre = "";
    $scope.apellidos = "";
    $scope.email = "";
    $scope.password = "";

    //Funcion de registro de usuario
    $scope.registrarse = function () {

        if ($scope.username == "" || $scope.nombre == "" || $scope.apellidos == "" || $scope.email == "" || $scope.password == "") {
            $scope.error = "Ninguno de los campos puede estar vacio";
        } else {

            //Detecta si el formato del correo electronico es valio para permitir el registro
            if (/\w+\@\w+\.\w+/.test($scope.email)) {

                var url = "../../controller/cInsertarUsuario.php";
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
    /*FIN MODAL USUARIO NUEVO*/

    // Carga todos los asociados y los tipos sin repetirse
    $scope.load = () => {
        $http.get('../../controller/cTiendas.php').then(function (response) {

            $scope.listaAsociados = response.data.list;

            var lista = response.data.list;

            $scope.listaTipos.push({ tipo: lista[0].tipo });

            for (let i = 0; i < lista.length; i++) {

                var nuevoTipo = true;

                for (let j = 0; j < $scope.listaTipos.length; j++) {

                    if (lista[i].tipo == $scope.listaTipos[j].tipo) {
                        nuevoTipo = false;
                        break;
                    }

                }

                if (nuevoTipo) {
                    $scope.listaTipos.push({ tipo: lista[i].tipo });
                }

            }
        })
    }

    //Filtro
    $scope.typeFilter = () => {
        if (event.target.innerText != "Todos") {
            $scope.filter = event.target.innerText;
        } else {
            $scope.filter = "";
        }
    }

    /*abrir pagina de la pagina seleccionada*/
    $scope.abrirTienda = (id) => {
        console.log(id);
        pagina = "modeloTiendas.html?" + id;
        window.location.href = pagina;
    }


}]);
