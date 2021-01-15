let myApp = angular.module('app', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.listaProductos = [];
    $scope.cart = [];

    $scope.load = () => {
        $http.get('../../controller/cProductos.php').then(function (response) {
            $scope.listaProductos = response.data.list;
        })
    }

    $scope.addToCart = () => {
        let idProducto = event.target.dataset.idproducto;
        let idTienda = event.target.dataset.idtienda;
        let found = false;

        if ($scope.cart.length == 0) {
            if ($scope.listaProductos[idProducto - 1].objProductoTienda.unidades > 0) {
                $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1 });
                $scope.listaProductos[idProducto - 1].objProductoTienda.unidades--;
            } else {
                alert("No quedan mas unidades")
            }
        } else if ($scope.cart.length != 0) {
            for (let i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i].idProducto == idProducto) {
                    if ($scope.listaProductos[idProducto - 1].objProductoTienda.unidades > 0) {
                        $scope.cart[i].cantidad++;
                        $scope.listaProductos[idProducto - 1].objProductoTienda.unidades--;
                        found = true;
                    }
                }
            }
            if (!found) {
                if ($scope.listaProductos[idProducto - 1].objProductoTienda.unidades > 0) {
                    $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1 });
                    $scope.listaProductos[idProducto - 1].objProductoTienda.unidades--;
                }
                else {
                    alert("No quedan mas unidades")
                }
            }
        }
        console.log(JSON.stringify($scope.cart));
    }
}]);
