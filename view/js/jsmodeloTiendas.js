idTienda=location.search.substring(1, location.search.length);

/*popover*/
document.addEventListener("DOMContentLoaded", function (event) {
	$('[data-toggle="popover"]').popover();
})

let myApp = angular.module('app', []);

myApp.controller('miControlador', ['$scope', '$http', function ($scope, $http) {

    $scope.listaProductos = [];
    $scope.cart = [];
    $scope.total = 0;

    /*cargar productos*/
    $scope.load = () => {

        var url="../../controller/cProductosByIdTienda.php";
        var data={"idTienda": idTienda};
        $http.post(url, data).then(function (response) {
            $scope.listaProductos = response.data.productos;

            //guardar en varibles datos de la tienda para utilizar en el footer*/
            $scope.nombreTienda=$scope.listaProductos[0].objTienda.nombre;
            $scope.direccionTienda=$scope.listaProductos[0].objTienda.direccion;
            $scope.emailTienda=$scope.listaProductos[0].objTienda.email;
            $scope.telefonoTienda=$scope.listaProductos[0].objTienda.telefono;

            var numTiendas=$scope.listaProductos.length;

            /*cargar imagen de la tienda*/
            imagen="<img src='../img/" + $scope.listaProductos[numTiendas-1].objTienda.imagen + "' class='img-fluid' alt=''>";
            $("#insertarLogo").html(imagen);

            for(let i=0; i<$scope.listaProductos.length; i++){

                if($scope.listaProductos[i].objTienda.tipo=="Bicicletas"){
                    $('#imagenTienda').css("background-image", "url(../img/bicicletas.jpg)"); 
                }else if($scope.listaProductos[i].objTienda.tipo=="Calzado"){
                    $('#imagenTienda').css("background-image", "url(../img/zapatillas.jpg)"); 
                }
                else if($scope.listaProductos[i].objTienda.tipo=="Joyeria"){
                    $('#imagenTienda').css("background-image", "url(../img/joyeria.jpg)"); 
                }else if($scope.listaProductos[i].objTienda.tipo=="Moda"){
                    $('#imagenTienda').css("background-image", "url(../img/moda.jpg)"); 
                }else if($scope.listaProductos[i].objTienda.tipo=="Pintura"){
                    $('#imagenTienda').css("background-image", "url(../img/pintura.jpg)"); 
                }else{
                    $('#imagenTienda').css("background-image", "url(../img/comercio.jpg)"); 
                    
                }
            }

            /*comprobar si hay algun usuario conectado*/
            var url = "../../controller/cLoggedVerify.php";
            $http.get(url).then(function(response){

                if (response.data.mensaje==="logged"){

                    /*id del usuario paraa utilizar en insertVentas*/
                    $scope.idUsuario=response.data.id;

                    /*mostrar carrito y quitar btnLogin*/
                    $("#carrito").show();
                    $("#botonLogin").hide();

                    //añadir los 2 iconos nuevos
                    var iconoUsuario="";
                    iconoUsuario+="<button type='button' class='btn' id='paginaUsuario'><i class='fa fa-user'></i></button>";
                    $("#iconoUsuario").html(iconoUsuario);

                    var iconoLogout="";
                    iconoLogout+="<button type='button' class='btn' id='btnLogout'><i class='fa fa-window-close'></i></button>";
                    
                    $("#iconoLogout").html(iconoLogout);
                    
                    /*al hacer click en btnLogout*/
                    $("#btnLogout").click(function(){
                        logout();
                    });

                    /*al hacer click en paginaUsuario*/
                    $("#paginaUsuario").click(function(){
                        window.location.href="usuario.html";
                    });    
                }else{
                    $("#carrito").hide();
                }
            });
        })
    }

    /*login*/
    $scope.login=function(){

        var username=$("#usuario").val();
        var password=$("#password").val();
                
        var url = "../../controller/cLogin.php";
        var data = { 'username':username, 'password':password};

                
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'} 
                      
            })
            .then(res => res.json()).then(result => {
                console.log(result);
                
                if(result.mensaje=="no error"){ 

                    alert("Sesión iniciada")
                
                    /*mostrar carrito y quitar btnLogin*/
                    $("#carrito").show();
                    $("#botonLogin").hide();

                    //añadir los 2 iconos nuevos
                    var iconoUsuario="";
                    iconoUsuario+="<button type='button' class='btn' id='paginaUsuario'><i class='fa fa-user'></i></button>";
                    $("#iconoUsuario").html(iconoUsuario);

                    var iconoLogout="";
                    iconoLogout+="<button type='button' class='btn' id='btnLogout'><i class='fa fa-window-close'></i></button>";
                    
                    $("#iconoLogout").html(iconoLogout);
                    
                    /*al hacer click en btnLogout*/
                    $("#btnLogout").click(function(){
                        logout();
                    });

                    /*al hacer click en paginaUsuario*/
                    $("#paginaUsuario").click(function(){
                        window.location.href="usuario.html";
                    });   
                
                }else {
                    alert(result.mensaje);  
                }
                            
            })
            .catch(error => console.error('Error status:', error));	

    }

    /*Funcion logout*/
    function logout(){

        var url = "../../controller/cLogout.php";
    
        $http.get(url).then(function(response){
                            
            window.location.reload();
            alert("Sesión cerrada");
                        
            /*Volver a poner el login del navbar*/
            var reset=`<form id="zonaLogin" class="form-inline my-2 my-lg-0 d-flex justify-content-center">
                        <div class="sesion">
                            <i class="fas fa-user"></i>
                        </div>
                        <input id="username" type="text" name="username" placeholder="Nombre de Usuario" class="mr-3 text-center">
                        <div class="sesion">
                            <i class="fas fa-key"></i>
                        </div>
                        <input id="password" type="password" name="password" placeholder="Contraseña" class="mr-3 text-center">
                        <button id="btnLogin" class="mr-3"><i class="fas fa-sign-in-alt" onclick="login()"></i></button>
                        <button id="btnRegister"><i class="fas fa-user-plus"></i></button>
                        <button id="btnLogout" class="d-none"><i class="fas fa-window-close"></i></button>
                        </form>`;
    
            $("#zonaLogin").html(reset);
                            
        });
                        
    } 

    $scope.contador=0;
    /*añadir al carro*/
    $scope.addToCart = (position) => {
        $scope.contador++;
        let idProducto = event.target.dataset.idproducto;
        let idTienda = event.target.dataset.idtienda;
        let imgProducto = event.target.dataset.imagen;
        let precio = event.target.dataset.precio;
        let nombre = event.target.dataset.nombre;
        let found = false;

        $scope.idProductoVenta=idProducto;
        $scope.precioProductoVenta=precio;
        
        if ($scope.cart.length == 0) {
            if ($scope.listaProductos[position].unidades > 0) {
                $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1, "nombre": nombre, "imgProducto": imgProducto, "precio": precio });
                $scope.listaProductos[position].unidades--;
                calcTotal();
            } else {
                alert("No quedan mas unidades")
            }
        } else if ($scope.cart.length != 0) {
            for (let i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i].idProducto == idProducto) {
                    if ($scope.listaProductos[position].unidades > 0) {
                        $scope.cart[i].cantidad++;
                        $scope.listaProductos[position].unidades--;
                        found = true;
                        calcTotal();
                    }
                }
            }
            if (!found) {
                if ($scope.listaProductos[position].unidades > 0) {
                    $scope.cart.push({ "idProducto": idProducto, "idTienda": idTienda, "cantidad": 1, "nombre": nombre, "imgProducto": imgProducto, "precio": precio });
                    $scope.listaProductos[position].unidades--;
                    calcTotal();
                }
                else {
                    alert("No quedan mas unidades")
                    $scope.contador--;
                }
            }
        }
        
    }

    /*abrir modal*/
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
    }

    /*comprar productos*/
    $scope.buy = () => {
        for (let i = 0; i < $scope.cart.length; i++) {

            console.log($scope.cart);

            for(let j=0; j<$scope.cart.length; j++){

                var data = { 'idProducto': $scope.cart[j].idProducto, 'idTienda': $scope.cart[j].idTienda, "cantidad": $scope.cart[j].cantidad };
                var data2={"idProducto":$scope.cart[j].idProducto, "idUsuario":$scope.idUsuario, "precio":$scope.precioProductoVenta, "unidades":$scope.cart[j].cantidad, "idTienda":idTienda};
                console.log(data2);
                console.log(data);
                /*var fecha=new Date();
                console.log(fecha);*/
                $http.post('../../controller/cUpdateStock.php', data).then(function () {
                });

                $http.post('../../controller/cInsertVentas.php', data2).then(function () {
                });

            }

            document.getElementById("myModal").style.display = "none"
            alert("Gracias por comprar");

            
            
            $scope.cart = [];
            //$scope.load();

            

            
        }

    }

    function calcTotal() {
        $scope.total = 0;
        for (let i = 0; i < $scope.cart.length; i++) {
            $scope.total = $scope.total + ($scope.cart[i].precio * $scope.cart[i].cantidad);

            $scope.total = Math.round($scope.total * 100) / 100;
        }
    }

    /*ordenar stock de mayor a menor*/
    $scope.stockMayorMenor=function(){
        $scope.listaProductos.sort(function(a, b) {
            return b.unidades - a.unidades;
        });
    }

    /*ordenar stock de menor a mayor*/
    $scope.stockMenorMayor=function(){
        $scope.listaProductos.sort(function(a, b) {
            return a.unidades - b.unidades;
        });
    }

    /*ordenar precio de mayor a menor*/
    $scope.precioMayorMenor=function(){
        $scope.listaProductos.sort(function(a, b) {
            return b.precio - a.precio;
        });
    }

    /*ordenar precio de menor a mayor*/
    $scope.precioMenorMayor=function(){
        $scope.listaProductos.sort(function(a, b) {
            return a.precio - b.precio;
        });
    }

    /*cargar los productos por defecto*/
    $scope.reset=function(){
        $scope.listaProductos.sort(function(a, b) {
            return a.idProducto - b.idProducto;
        });
    }

}]);


