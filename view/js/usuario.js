document.addEventListener("DOMContentLoaded", function (event) {
    loggedVerify();		
})

/*Comprobar si hay algún usuario conectado*/
function loggedVerify(){

    var url = "../../controller/cLoggedVerify.php";

    fetch(url, {
      method: 'GET'  
    })
    .then(res => res.json()).then(result => {
        
        /*Si el usuario esta conectado*/
        if (result.mensaje==="logged"){

            var newRow="";
            newRow="<div class='row justify-content-center align-items-center p-2'>";
                newRow+="<button type='button' class='btn btn-outline-light'>" + result.username + "</button>";
                newRow+="<button type='button' class='btn btn-outline-light' id='paginaUsuario'>Mi Perfil</button>";
                newRow+="<button type='button' class='btn btn-outline-light' id='btnLogout'>Cerrar Sesión</button>";
            newRow+="</div>";

            /*Añadir al form del navbar los botones*/
            $("#zonaLogin").html(newRow);

            /*Al hacer click en el boton de logout llamar a la funcion logout*/
            $("#btnLogout").click(function(){
                logout();
            });
            /*Al hacer click en el boton de miPerfil*/
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

/*Funcion logout*/
function logout(){

    var url = "../../controller/cLogout.php";

    fetch(url, {
      method: 'GET'
    })
    .then(res => res.text()).then(result => {

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
        /*restaurar valores*/
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
        

        if(nombre==undefined || direccion==undefined || tipo==undefined || telefono==undefined || email==undefined){

            alert("Se ha producido un error");
            
        }else{
 
            if($scope.savedFileBase64==""){/*Si no se ha hecho el change de la imagen*/
                var data={"nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": "default.png", "savedFileBase64": $scope.savedFileBase64};
            }else{/*Si se ha hecho el change de la imagen*/
                var data={"nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTienda.name, "savedFileBase64": $scope.savedFileBase64};
            }
        
            var url="../../controller/cInsertarTienda.php";
        
            $http.post(url, data).then(function(response){
                //mensaje
                alert(response.data.list);
                window.location.reload();
            });
        }  
    }

    /*Lista de tiendas para el select*/
    $http.get("../../controller/cTiendas.php").then(function(response){
        $scope.tiendas=response.data.list;
    });

    /*Lista de tiendas para el select*/
    $http.get("../../controller/cProductos.php").then(function(response){
        $scope.productos=response.data.list;
    });

    /*cancelar insert de producto*/
    $scope.cancelarInsertarProducto=function(){
        document.getElementById("imagenInsertProducto").src="../img/default.png"; 
        document.getElementById("fileProducto").innerHTML="<input type='file' name='imagen' id='imagenProducto' onchange='angular.element(this).scope().imagenSeleccionadaProducto(this)'' accept='.png,.jpeg,.jpg,.gif'/>";
        document.getElementById("fileProducto").innerHTML+="<i class='fa fa-upload'></i>";
        /*Restaurar valores*/
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

        if($scope.savedFileBase64==""){/*Si no se ha hecho el change de la imagen*/
            var data={"nombre": nombre, "tipo": tipo, "imagen": "default.png", "savedFileBase64": $scope.savedFileBase64};
        }else{/*Si se ha hecho el change de la imagen*/
            var data={"nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProducto.name, "savedFileBase64": $scope.savedFileBase64};
        }

        var url="../../controller/cInsertarProducto.php";

        $http.post(url, data).then(function(response){
            
            /*id del ultimo producto*/
            $http.get("../../controller/cLastId.php").then(function(response){
                $scope.lastId=response.data.list.id;

                var data={"idProducto": $scope.lastId, "idTienda": idTienda, "precio": precio, "unidades": unidades};

                var url="../../controller/cInsertarProductoTienda.php";

                $http.post(url, data).then(function(response){
                    //Mensaje
                    alert(response.data.list);
                    window.location.reload();
                });
            });
        }); 
    }

    /*UPDATE*/

    /*Conseguir datos para updateTienda*/
    $scope.tiendaUpdate="no";
    $scope.seleccionarTienda=function(){

        var url="../../controller/cFindTienda.php";
        var data={"id": $scope.tiendaSeleccionada};

        $http.post(url, data).then(function(response){

            /*valores para añadir al formulario*/
            $scope.nombreTiendaUpdate=response.data.list.nombre;
            $scope.direccionTiendaUpdate=response.data.list.direccion;
            $scope.tipoTiendaUpdate=response.data.list.tipo;
            $scope.imagenTiendaUpdate=response.data.list.imagen;
            $scope.telefonoTiendaUpdate=Number(response.data.list.telefono);
            $scope.emailTiendaUpdate=response.data.list.email;

            /*Mostrar formulario*/
            $scope.tiendaUpdate="si";
    
        });

    }

    /*Imagen tienda update*/
    $scope.imagenSeleccionadaTiendaUpdate = function (element) {
        $scope.imagenTiendaUpdate = element.files[0];
        

        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.savedFileBase64 = reader.result;
            document.getElementById("imagenUpdateTienda").src=$scope.savedFileBase64; 
        }

        if ($scope.imagenTiendaUpdate) {
            reader.readAsDataURL($scope.imagenTiendaUpdate);
        }

    };

    $scope.savedFileBase64="";
    /*Actualizar tienda*/
    $scope.actualizarTiendaAdmin=function(){

        var nombre=$("#nombreTiendaUpdate").val();
        var direccion=$("#direccionTiendaUpdate").val();
        var tipo=$("#tipoTiendaUpdate").val();
        var telefono=$("#telefonoTiendaUpdate").val();
        var email=$("#emailTiendaUpdate").val();

        if($scope.savedFileBase64==""){/*Si no se ha hecho el change de la imagen*/
            var data={"id": $scope.tiendaSeleccionada, "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTiendaUpdate, "savedFileBase64": $scope.savedFileBase64};
        }else{/*Si se ha hecho el change de la imagen*/
            var data={"id": $scope.tiendaSeleccionada, "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTiendaUpdate.name, "savedFileBase64": $scope.savedFileBase64};
        }

        var url="../../controller/cUpdateTienda.php";

        $http.post(url, data).then(function(response){
            //Mensaje
            alert(response.data.list);
            window.location.reload();
        });

    }

    /*Conseguir datos para updateProducto*/
    $scope.productoUpdate="no";
    $scope.seleccionarProducto=function(){

        var url="../../controller/cFindProducto.php";
        var data={"id": $scope.productoSeleccionado};

        $http.post(url, data).then(function(response){

            /*valores para añadir al formulario*/
            $scope.nombreProductoUpdate=response.data.list.nombre;
            $scope.tipoProductoUpdate=response.data.list.tipo;
            $scope.imagenProductoUpdate=response.data.list.imagen;
            $scope.precioProductoUpdate=Number(response.data.list.objProductoTienda.precio);
            $scope.unidadesProductoUpdate=Number(response.data.list.objProductoTienda.unidades);
            $scope.idTienda=response.data.list.objProductoTienda.idTienda;
            $scope.nombreTienda=response.data.list.objProductoTienda.objTienda.nombre;

            /*Mostrar formulario*/
            $scope.productoUpdate="si";
    
        });

    }

    /*Imagen tienda update*/
    $scope.imagenSeleccionadaProductoUpdate = function (element) {
        $scope.imagenProductoUpdate = element.files[0];
        

        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.savedFileBase64 = reader.result;
            document.getElementById("imagenUpdateProducto").src=$scope.savedFileBase64; 
        }

        if ($scope.imagenProductoUpdate) {
            reader.readAsDataURL($scope.imagenProductoUpdate);
        }

    };

    $scope.savedFileBase64="";
    /*Actualizar tienda*/
    $scope.actualizarProductoAdmin=function(){

        var nombre=$("#nombreProductoUpdate").val();
        var tipo=$("#tipoProductoUpdate").val();

        if($scope.savedFileBase64==""){/*Si no se ha hecho el change de la imagen*/
            var data={"id": $scope.productoSeleccionado, "nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProductoUpdate, "savedFileBase64": $scope.savedFileBase64};
        }else{/*Si se ha hecho el change de la imagen*/
            var data={"id": $scope.productoSeleccionado, "nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProductoUpdate.name, "savedFileBase64": $scope.savedFileBase64};
        }

        var url="../../controller/cUpdateProducto.php";

        $http.post(url, data).then(function(response){

            /*datos del producto*/
            var precio=$("#precioProductoUpdate").val();
            var unidades=$("#unidadesProductoUpdate").val();
            var idTiendaSeleccionada=$("#tiendasUpdate3").val();

            var data={"idProducto": $scope.productoSeleccionado, "idTienda": idTiendaSeleccionada, "precio": precio, "unidades": unidades};
            var url="../../controller/cUpdateProductoTienda.php";

            $http.post(url, data).then(function(response){
                //Mensaje
                alert(response.data.list);
                window.location.reload();
            });
           
        });

    }

    /*eliminar tienda*/
    $scope.eliminarTiendaAdmin=function(){

        /*mostrar modal*/
        $("#modalDeleteTienda").css("display", "block");

        /*al hacer click en el boton delete*/
        $("#deletebtnTienda").click(function(){

            var url = "../../controller/cDeleteTienda.php";
            var data = {'id':$scope.tiendaSeleccionada};

            $http.post(url, data).then(function(response){
                //Mensaje
                alert(response.data.list);
                window.location.reload();
            });

        })

    }

    /*eliminar producto*/
    $scope.eliminarProductoAdmin=function(){

        $("#modalDeleteProducto").css("display", "block");

        /*al hacer click en el boton delete*/
        $("#deletebtnProducto").click(function(){

            var url = "../../controller/cDeleteProducto.php";
            var data = {'id':$scope.productoSeleccionado};

            $http.post(url, data).then(function(response){
                //Mensaje
                alert(response.data.list);
                window.location.reload();
            });

        })

    }

});
