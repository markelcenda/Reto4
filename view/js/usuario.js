document.addEventListener("DOMContentLoaded", function (event) {
    loggedVerify();		
})

function loggedVerify(){

    var url = "../../controller/cLoggedVerify.php";

    fetch(url, {
      method: 'GET'  
    })
    .then(res => res.json()).then(result => {
        
        console.log(result);
        
        if (result.mensaje==="logged"){

            var newRow="";
            newRow="<div class='row justify-content-center align-items-center p-2'>";
                newRow+="<button type='button' class='btn btn-outline-light'>" + result.username + "</button>";
                newRow+="<button type='button' class='btn btn-outline-light' id='paginaUsuario'>Mi Perfil</button>";
                newRow+="<button type='button' class='btn btn-outline-light' id='btnLogout'>Cerrar Sesión</button>";
            newRow+="</div>";

            $("#zonaLogin").html(newRow);

            $("#btnLogout").click(function(){
                logout();
            });

            $("#paginaUsuario").click(function(){
                window.location.href="usuario.html";
            });
            
            /*Si no eres administrador general*/
            if(result.admin==0){
                //alert(result.admin);
            }else{/*Si  eres administrador general*/
                //alert(result.admin); 
            }
         
        } 
    })
    .catch(error => console.error('Error status:', error));	  
}

function logout(){

    var url = "../../controller/cLogout.php";

    fetch(url, {
      method: 'GET'
    })
    .then(res => res.text()).then(result => {

        window.location.reload();

        alert("Sesión cerrada");
    
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
        
    })
    .catch(error => console.error('Error status:', error));	  
    
}   



var app=angular.module("app",[]);
app.controller("miControlador", function($scope,$http){

    /*cancelar insert de tienda*/
    $scope.cancelarInsertarTienda=function(){
        document.getElementById("imagenInsertTienda").src="../img/default.png"; 
        document.getElementById("fileTienda").innerHTML="<input type='file' name='tienda' id='imagenTienda' onchange='angular.element(this).scope().imagenSeleccionadaTienda(this)'' accept='.png,.jpeg,.jpg,.gif'/>";
        document.getElementById("fileTienda").innerHTML+="<i class='fa fa-upload'></i>";
        $scope.savedFileBase64 = "";
        $scope.nombreTiendaNuevo="";
        $scope.direccionTiendaNuevo="";
        $scope.tipoTiendaNuevo="";
        $scope.telefonoTiendaNuevo="";
        $scope.emailTiendaNuevo="";
    }

    /*Imagen tienda*/
    $scope.imagenSeleccionadaTienda = function (element) {
        $scope.imagenTienda = element.files[0];

        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.savedFileBase64 = reader.result;
            document.getElementById("imagenInsertTienda").src=$scope.savedFileBase64; 
        }

        if ($scope.imagenTienda) {
            reader.readAsDataURL($scope.imagenTienda);
        }

    };
    $scope.savedFileBase64 = "";

    /*Insertar tienda*/
    $scope.insertarTienda=function(){

        var nombre=$scope.nombreTiendaNuevo;
        var direccion=$scope.direccionTiendaNuevo;
        var tipo=$scope.tipoTiendaNuevo;
        var telefono=$scope.telefonoTiendaNuevo;
        var email=$scope.emailTiendaNuevo;

        if($scope.savedFileBase64==""){
            var data={"nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": "default.png", "savedFileBase64": $scope.savedFileBase64};
        }else{
            var data={"nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTienda.name, "savedFileBase64": $scope.savedFileBase64};
        }

        var url="../../controller/cInsertarTienda.php";

        $http.post(url, data).then(function(response){
            alert("Tienda insertada");
            window.location.reload();
        });
    }

    /*Lista de tiendas para el select*/
    $http.get("../../controller/cTiendas.php").then(function(response){
        $scope.tiendas=response.data.list;
    });



    /*cancelar insert de producto*/
    $scope.cancelarInsertarProducto=function(){
        document.getElementById("imagenInsertProducto").src="../img/default.png"; 
        document.getElementById("fileProducto").innerHTML="<input type='file' name='imagen' id='imagenProducto' onchange='angular.element(this).scope().imagenSeleccionadaProducto(this)'' accept='.png,.jpeg,.jpg,.gif'/>";
        document.getElementById("fileProducto").innerHTML+="<i class='fa fa-upload'></i>";
        $scope.savedFileBase64 = "";
        $scope.nombreProductoNuevo="";
        $scope.tipoProductoNuevo="";
        $scope.precioProductoNuevo="";
        $scope.unidadesProductoNuevo="";
        $scope.tiendaSeleccionada="";
    }

     /*Imagen producto*/
     $scope.imagenSeleccionadaProducto = function (element) {
        $scope.imagenProducto = element.files[0];
        console.log($scope.imagenProducto);

        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.savedFileBase64 = reader.result;
            document.getElementById("imagenInsertProducto").src=$scope.savedFileBase64; 
        }

        if ($scope.imagenProducto) {
            reader.readAsDataURL($scope.imagenProducto);
        }

    };
    $scope.savedFileBase64 = "";

    /*Insertar producto*/
    $scope.insertarProducto=function(){

        var nombre=$scope.nombreProductoNuevo;
        var tipo=$scope.tipoProductoNuevo;

        var precio=$scope.precioProductoNuevo;
        var unidades=$scope.unidadesProductoNuevo;
        var idTienda=$scope.tiendaSeleccionada;

        if($scope.savedFileBase64==""){
            var data={"nombre": nombre, "tipo": tipo, "imagen": "default.png", "savedFileBase64": $scope.savedFileBase64};
        }else{
            var data={"nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProducto.name, "savedFileBase64": $scope.savedFileBase64};
        }

        var url="../../controller/cInsertarProducto.php";

        $http.post(url, data).then(function(response){
            
            /*id del ultimo producto*/
            $http.get("../../controller/cLastId.php").then(function(response){
                $scope.lastId=response.data.list.id;

                var data={"idProducto": $scope.lastId, "idTienda": idTienda, "precio": precio, "unidades": unidades};
                console.log(data);

                var url="../../controller/cInsertarProductoTienda.php";

                $http.post(url, data).then(function(response){
                    alert("Producto insertado");
                    window.location.reload();
                });
            });
        }); 
    }

});
