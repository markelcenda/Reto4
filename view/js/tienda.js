let myApp = angular.module('app', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.listaProductos = [];
    //Mira si hay productos en el carrito
    if (localStorage.getItem('0') != null) {
        $scope.cart = JSON.parse(localStorage.getItem('0'));
    } else {
        $scope.cart = [];
    }
    calcTotal();

    //Carga todos los prodcutos
    $scope.load = () => {
        $http.get('../../controller/cProductos.php').then(function (response) {
            $scope.listaProductos = response.data.list;
            $scope.productosTienda = response.data.productos;
            setStock();
        })

        $http.get("../../controller/cLoggedVerify.php").then(function (response) {
            if (response.data.mensaje === "logged") {
                $scope.idUsuario = response.data.id;
            }
        });
    }

    //Añade los productos seleccionados al carrito
    $scope.addToCart = (position) => {
        let idProducto = event.target.dataset.idproducto;
        let idTienda = event.target.dataset.idtienda;
        let imgProducto = event.target.dataset.imagen;
        let precio = event.target.dataset.precio;
        let nombre = event.target.dataset.nombre;
        let tienda = event.target.dataset.tienda;
        let found = false;

        $scope.idProductoVenta = idProducto;
        $scope.precioProductoVenta = precio;

        if ($scope.cart.length == 0) {
            if ($scope.productosTienda[position].unidades > 0) {
                $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1, "nombre": nombre, "imgProducto": imgProducto, "precio": precio, "tienda": tienda });
                $scope.productosTienda[position].unidades--;
                calcTotal();
            } else {
                alert("No quedan mas unidades")
            }
        } else if ($scope.cart.length != 0) {
            for (let i = 0; i < $scope.cart.length; i++) {

                if ($scope.cart[i].idProducto == idProducto && $scope.cart[i].idTienda==idTienda) {
                    if ($scope.productosTienda[position].unidades > 0) {
                        $scope.cart[i].cantidad++;
                        $scope.productosTienda[position].unidades--;
                        found = true;
                        calcTotal();
                    }
                }
            }
            if (!found) {
                if ($scope.productosTienda[position].unidades > 0) {
                    $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1, "nombre": nombre, "imgProducto": imgProducto, "precio": precio, "tienda": tienda });
                    $scope.productosTienda[position].unidades--;
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

    $scope.addToCart2 = () => {
        let idProducto = event.target.dataset.idproducto;
        let idTienda = event.target.dataset.idtienda;
        let imgProducto = event.target.dataset.imagen;
        let precio = event.target.dataset.precio;
        let nombre = event.target.dataset.nombre;
        let tienda = event.target.dataset.tienda;
        let found = false;

        $scope.idProductoVenta = idProducto;
        $scope.precioProductoVenta = precio;

        if ($scope.cart.length == 0) {
            if ($scope.productosTienda[idProducto-1].unidades > 0) {
                $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1, "nombre": nombre, "imgProducto": imgProducto, "precio": precio, "tienda": tienda });
                $scope.productosTienda[idProducto-1].unidades--;
                calcTotal();
            } else {
                alert("No quedan mas unidades")
            }
        } else if ($scope.cart.length != 0) {
            for (let i = 0; i < $scope.cart.length; i++) {

                if ($scope.cart[i].idProducto == idProducto && $scope.cart[i].idTienda==idTienda) {
                    if ($scope.productosTienda[idProducto-1].unidades > 0) {
                        $scope.cart[i].cantidad++;
                        $scope.productosTienda[idProducto-1].unidades--;
                        found = true;
                        calcTotal();
                    }
                }
            }
            if (!found) {
                if ($scope.productosTienda[idProducto-1].unidades > 0) {
                    $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1, "nombre": nombre, "imgProducto": imgProducto, "precio": precio, "tienda": tienda });
                    $scope.productosTienda[idProducto-1].unidades--;
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

    //Abre el modal con la informacion del carrito
    $scope.modal = () => {

        var modal = document.getElementById("myModal");
        var modal2 = document.getElementById("myModal2");
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("close")[0];
        var span2 = document.getElementsByClassName("close")[1];

        btn.onclick = function () {
            if ($scope.cart.length != 0) {
                modal.style.display = "flex";
            } else {
                modal2.style.display = "flex";
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

    //Ejecuta la compra
    $scope.buy = () => {

        $http.get("../../controller/cLoggedVerify.php").then(function (response) {
            $scope.idUsuario = response.data.id;

            if ($scope.idUsuario != undefined) {
                for (let i = 0; i < $scope.cart.length; i++) {
                    for (let j = 0; j < $scope.cart.length; j++) {
                        var fecha = new Date();
                        var año = fecha.getFullYear();
                        var mes = Number(fecha.getMonth() + 1);
                        var dia = fecha.getDate();
                        var fechaCompra = año + "-" + mes + "-" + dia;

                        var data = { 'idProducto': $scope.cart[j].idProducto, 'idTienda': $scope.cart[j].idTienda, "cantidad": $scope.cart[j].cantidad };
                        var data2 = { "idProducto": $scope.cart[j].idProducto, "idUsuario": $scope.idUsuario, "fecha": fechaCompra, "precio": $scope.cart[j].precio, "unidades": $scope.cart[j].cantidad, "idTienda": $scope.cart[j].idTienda };
                        $http.post('../../controller/cUpdateStock.php', data).then(function () {
                        });

                        $http.post('../../controller/cInsertVentas.php', data2).then(function () {
                        });
                    }
                    alert("Gracias por comprar");
                    $scope.cart = [];
                    localStorage.clear();
                    $scope.load();
                }
            } else {
                alert("Tienes que iniciar sesion para comprar");
            }
            document.getElementById("myModal").style.display = "none"
        });
    }

    //Limpia el carrito
    $scope.clearCart = () => {
        $scope.cart = [];
        localStorage.clear();
        document.getElementById("myModal").style.display = "none";;
        $scope.load();
    }
    // Quita el producto del carrito 
    $scope.removeCart = () => {
        let modal = document.getElementById("myModal");
        let modal2 = document.getElementById("myModal2");
        let index = getIndex(event.target.dataset.idproducto);

        if (index > -1) {
            $scope.cart.splice(index, 1);
        }

        if ($scope.cart.length != 0) {
            modal2.style.display = "none";
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
            modal2.style.display = "block";
        }
        localStorage.clear();
        localStorage.setItem(0, angular.toJson($scope.cart));
        calcTotal();
        $scope.load();
    }

    // Reduce uno el stock
    $scope.removeFromCart = () => {
        let idProducto = event.target.dataset.idproducto;

        for (let i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].idProducto == idProducto && $scope.cart[i].cantidad > 1) {
                $scope.cart[i].cantidad--;
                $scope.productosTienda[position].unidades++;
                calcTotal();
            } else if ($scope.cart[i].idProducto == idProducto && $scope.cart[i].cantidad == 1) {
                $scope.removeCart();
            }
        }
        localStorage.clear();
        localStorage.setItem(0, angular.toJson($scope.cart));

    }

    // Reduce uno el stock
    $scope.removeFromCart2 = () => {
        let idProducto = event.target.dataset.idproducto;

        for (let i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].idProducto == idProducto && $scope.cart[i].cantidad > 1) {
                $scope.cart[i].cantidad--;
                $scope.productosTienda[idProducto-1].unidades++;
                calcTotal();
            } else if ($scope.cart[i].idProducto == idProducto && $scope.cart[i].cantidad == 1) {
                $scope.removeCart();
            }
        }
        localStorage.clear();
        localStorage.setItem(0, angular.toJson($scope.cart));

    }

    //Calcula el precio total de los productos del carrito
    function calcTotal() {
        $scope.total = 0;
        for (let i = 0; i < $scope.cart.length; i++) {
            $scope.total = $scope.total + ($scope.cart[i].precio * $scope.cart[i].cantidad);
            $scope.total = Math.round($scope.total * 100) / 100;
        }
    }

    //Muestra el stock de cada producto
    function setStock() {
        let localStorageArray = [];
        for (let i = 0; i < $scope.cart.length; i++) {
            localStorageArray.push(JSON.parse(localStorage[0])[i]);
        }
        if (localStorage.length != 0) {
            for (let i = 0; i < $scope.cart.length; i++) {
                for (let j = 0; j < $scope.productosTienda.length; j++) {
                    if ($scope.cart[i].idProducto == $scope.productosTienda[j].idProducto) {
                        $scope.productosTienda[j].unidades = $scope.productosTienda[j].unidades - localStorageArray[i].cantidad;
                    }
                }
            }
        }
    }

    function getIndex(id) {
        for (let i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].idProducto == id) {
                return i;
            }
        }
    }

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
}]);
