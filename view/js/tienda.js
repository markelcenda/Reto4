let myApp = angular.module('app', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.listaProductos = [];
    if (localStorage.getItem('0') != null) {
        $scope.cart = JSON.parse(localStorage.getItem('0'));
    } else {
        $scope.cart = [];
    }
    calcTotal();

    $scope.load = () => {
        $http.get('../../controller/cProductos.php').then(function (response) {
            $scope.listaProductos = response.data.list;
            setStock();
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
        localStorage.clear();
        localStorage.setItem(0, angular.toJson($scope.cart));
    }

    $scope.modal = () => {
        var modal = document.getElementById("myModal");
        var modal2 = document.getElementById("myModal2");
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("close")[0];
        var span2 = document.getElementsByClassName("close")[1];

        btn.onclick = function () {
            if ($scope.cart.length != 0) {
                modal.style.display = "block";
            } else {
                modal2.style.display = "block";
            }
        }

        span.onclick = function () {
            modal.style.display = "none";
        }

        span2.onclick = function () {
            modal2.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            } else if (event.target == modal2) {
                modal2.style.display = "none";
            }
        }
    }

    $scope.buy = () => {
        for (let i = 0; i < $scope.cart.length; i++) {
            var data = { 'idProducto': $scope.cart[i].idProducto, 'idTienda': $scope.cart[i].idTienda, "cantidad": $scope.cart[i].cantidad };
            $http.post('../../controller/cUpdateStock.php', data).then(function () {
            });
            document.getElementById("myModal").style.display = "none"
            alert("Gracias por comprar");
            $scope.cart = [];
            localStorage.clear();
            $scope.load();
        }
    }

    $scope.clearCart = () => {
        $scope.cart = [];
        localStorage.clear();
        document.getElementById("myModal").style.display = "none";;
        $scope.load();
    }

    function calcTotal() {
        $scope.total = 0;
        for (let i = 0; i < $scope.cart.length; i++) {
            $scope.total = $scope.total + ($scope.cart[i].precio * $scope.cart[i].cantidad);
            $scope.total = Math.round($scope.total * 100) / 100;
        }
    }

    function setStock() {
        localStorageArray = []
        for (let i = 0; i < $scope.cart.length; i++) {
            localStorageArray.push(JSON.parse(localStorage[0])[i]);
        }
        if (localStorage.length != 0) {
            for (let i = 0; i < $scope.cart.length; i++) {
                for (let j = 0; j < $scope.listaProductos.length; j++) {
                    if ($scope.cart[i].idProducto == $scope.listaProductos[j].objProductoTienda.idProducto) {
                        $scope.listaProductos[j].objProductoTienda.unidades = $scope.listaProductos[j].objProductoTienda.unidades - localStorageArray[i].cantidad;
                    }
                }
            }
        }
    }
}]);
