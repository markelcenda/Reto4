let myApp = angular.module('app', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.listaAsociados = [];
    $scope.listaTipos = [];
    $scope.filter = "";

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
