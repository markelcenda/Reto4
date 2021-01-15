let myApp = angular.module('app', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.listaAsociados = [];
    $scope.filter = "";

    $scope.load = () => {
        $http.get('../../controller/cTiendas.php').then(function (response) {
            $scope.listaAsociados = response.data.list;
        })
    }

    $scope.typeFilter = () => {
        if (event.target.innerText != "Todos") {
            $scope.filter = event.target.innerText;
        } else {
            $scope.filter = "";
        }
    }
}]);
