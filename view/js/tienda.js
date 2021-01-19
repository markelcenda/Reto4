let myApp = angular.module('app', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.listaProductos = [];
    $scope.cart = [];
    $scope.total = 0;

    $scope.load = () => {
        $http.get('../../controller/cProductos.php').then(function (response) {
            $scope.listaProductos = response.data.list;
        })
    }

    $scope.addToCart = () => {
        let idProducto = event.target.dataset.idproducto;
        let idTienda = event.target.dataset.idtienda;
        let imgProducto = event.target.dataset.imagen;
        let precio = event.target.dataset.precio;
        let nombre = event.target.dataset.nombre;
        let found = false;


        if ($scope.cart.length == 0) {
            if ($scope.listaProductos[idProducto - 1].objProductoTienda.unidades > 0) {
                $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1, "nombre": nombre, "imgProducto": imgProducto, "precio": precio });
                $scope.listaProductos[idProducto - 1].objProductoTienda.unidades--;
                calcTotal();
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
                        calcTotal();
                    }
                }
            }
            if (!found) {
                if ($scope.listaProductos[idProducto - 1].objProductoTienda.unidades > 0) {
                    $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1, "nombre": nombre, "imgProducto": imgProducto, "precio": precio });
                    $scope.listaProductos[idProducto - 1].objProductoTienda.unidades--;
                    calcTotal();
                }
                else {
                    alert("No quedan mas unidades")
                }
            }
        }
    }

    $scope.modal = () => {
        var modal = document.getElementById("myModal");
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("close")[0];

        if ($scope.cart.length != 0) {
            btn.onclick = function () {
                modal.style.display = "block";
            }
        }

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    $scope.buy = () => {
        for (let i = 0; i < $scope.cart.length; i++) {
            var data = { 'idProducto': $scope.cart[i].idProducto, 'idTienda': $scope.cart[i].idTienda, "cantidad": $scope.cart[i].cantidad };
            console.log(data);

            $http.post('../../controller/cUpdateStock.php', data).then(function () {
            });

            document.getElementById("myModal").style.display = "none"
            alert("Gracias por comprar");
            $scope.cart = [];
            $scope.load();
        }

    }

    function calcTotal() {
        $scope.total = 0;
        for (let i = 0; i < $scope.cart.length; i++) {
            $scope.total = $scope.total + ($scope.cart[i].precio * $scope.cart[i].cantidad);

            $scope.total = Math.round($scope.total * 100) / 100;
        }
    }
}]);
