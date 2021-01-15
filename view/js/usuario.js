var app=angular.module("app",[]);
app.controller("miControlador", function($scope,$http){

    /*Lista de tiendas para el select*/
    $http.get("../../controller/cTiendas.php").then(function(response){
        $scope.tiendas=response.data.list;
    });

    /*Lista de tiendas para el select*/
    $http.get("../../controller/cProductos.php").then(function(response){
        $scope.productos=response.data.list;
    });

/*Comprobar si hay algún usuario conectado*/
 $scope.loggedVerify=function(){

    var url = "../../controller/cLoggedVerify.php";

    $http.get(url).then(function(response){

        if (response.data.mensaje==="logged"){

            var newRow="";
            newRow="<div class='row justify-content-center align-items-center p-2'>";
                newRow+="<button type='button' class='btn btn-outline-light'>" + response.data.username + "</button>";
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
            
            if(response.data.admin==0){
  
                if(response.data.adminTienda==null){
                    //Si eres usuario normal
                    //zonaUsuario();
                    
                }else{
                    //Si eres administrador de una tienda
                    zonaAdminTienda(response.data.adminTienda);
                }
                
            }else{
                //Si eres administrador general
                 zonaAdmin();
            }

            mostrarVentas(response.data.id);
            zonaUsuario(response.data.id);

        }else{
            window.location.href="../../index.html";
        }
    });
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

function zonaAdmin(){

    //mostrar div del admin general*/
    $scope.adminGeneral="si";

    //ocultar div del adminTienda
    $scope.adminTienda="no";

    /*div insert tienda*/
    $scope.tiendaInsert="no";
    $scope.mostrarInsertTienda=function(){
        $scope.tiendaInsert="si";
    }

    /*div insert producto*/
    $scope.productoInsert="no";
    $scope.mostrarInsertProducto=function(){
        $scope.productoInsert="si";
    }

    /*div update tienda*/
    $scope.tiendaSelect="no";
    $scope.mostrarSelectTienda=function(){
        $scope.tiendaSelect="si";
    }

    /*div update producto*/
    $scope.productoSelect="no";
    $scope.mostrarSelectProducto=function(){
        $scope.productoSelect="si";
    }

    /*cancelar update tienda*/
    $scope.cancelUpdateTienda=function(){
        $scope.tiendaSelect="no";
        $scope.tiendaUpdate="no";
    }

    /*cancelar update producto*/
    $scope.cancelUpdateProducto=function(){
        $scope.productoSelect="no";
        $scope.productoUpdate="no";
    }

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

        $scope.tiendaInsert="no";
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

        $scope.productoInsert="no";
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
}

function zonaAdminTienda(idTienda){

    //ocultar div del admin general
    $scope.adminGeneral="no";
    //mostrar el div del adminTienda
    $scope.adminTienda="si";

    $scope.mostrarInsertProductoAdminTienda=function(){
        $scope.productoInsertAdminTienda="si";
    }

    /*Imagen producto*/
    $scope.imagenSeleccionadaProductoAdminTienda = function (element) {
        $scope.imagenProductoAdminTienda = element.files[0];

        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.savedFileBase64 = reader.result;
            document.getElementById("imagenInsertProductoAdminTienda").src=$scope.savedFileBase64; 
        }

        if ($scope.imagenProductoAdminTienda) {
            reader.readAsDataURL($scope.imagenProductoAdminTienda);
        }

    };
    $scope.savedFileBase64 = "";

    /*Insertar producto*/
    $scope.insertarProductoAdminTienda=function(){

        var nombre=$scope.nombreProductoNuevo;
        var tipo=$scope.tipoProductoNuevo;

        var precio=$scope.precioProductoNuevo;
        var unidades=$scope.unidadesProductoNuevo;

        if(nombre==undefined || tipo==undefined || precio==undefined || unidades==undefined){
            alert("Se ha producido un error");
        }else{

            if($scope.savedFileBase64==""){/*Si no se ha hecho el change de la imagen*/
                var data={"nombre": nombre, "tipo": tipo, "imagen": "default.png", "savedFileBase64": $scope.savedFileBase64};
            }else{/*Si se ha hecho el change de la imagen*/
                var data={"nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProductoAdminTienda.name, "savedFileBase64": $scope.savedFileBase64};
            }
            console.log(data)
    
            var url="../../controller/cInsertarProducto.php";
    
            $http.post(url, data).then(function(response){
                
                /*id del ultimo producto*/
                $http.get("../../controller/cLastId.php").then(function(response){
                    $scope.lastId=response.data.list.id;
    
                    var data={"idProducto": $scope.lastId, "idTienda": idTienda, "precio": precio, "unidades": unidades};
                    var url="../../controller/cInsertarProductoTienda.php";
                    console.log(data);
    
                    $http.post(url, data).then(function(response){
                        //Mensaje
                        alert(response.data.list);
                        window.location.reload();
                    });
                });
            });

        }

         
    }

    $scope.cancelarInsertarProductoAdminTienda=function(){

        document.getElementById("imagenInsertProductoAdminTienda").src="../img/default.png"; 
        document.getElementById("fileProductoAdminTienda").innerHTML="<input type='file' name='imagen' id='imagenProductoAdminTienda' onchange='angular.element(this).scope().imagenSeleccionadaProductoAdminTienda(this)'' accept='.png,.jpeg,.jpg,.gif'/>";
        document.getElementById("fileProductoAdminTienda").innerHTML+="<i class='fa fa-upload'></i>";
        /*Restaurar valores*/
        $scope.savedFileBase64 = "";
        $scope.nombreProductoNuevo="";
        $scope.tipoProductoNuevo="";
        $scope.precioProductoNuevo="";
        $scope.unidadesProductoNuevo="";

        $scope.productoInsertAdminTienda="no";
    }

    /*mostrar formulario para actualizar tienda*/
    $scope.mostrarUpdateTiendaAdminTienda=function(){
        $scope.tiendaUpdateAdminTienda="si";

        /*conseguir datos de la tienda para hacer update*/
        var url="../../controller/cFindTienda.php";
        var data={"id": idTienda};

        $http.post(url, data).then(function(response){

            /*valores para añadir al formulario*/
            $scope.nombreTiendaUpdateAdminTienda=response.data.list.nombre;
            $scope.direccionTiendaUpdateAdminTienda=response.data.list.direccion;
            $scope.tipoTiendaUpdateAdminTienda=response.data.list.tipo;
            $scope.imagenTiendaUpdateAdminTienda=response.data.list.imagen;
            $scope.telefonoTiendaUpdateAdminTienda=Number(response.data.list.telefono);
            $scope.emailTiendaUpdateAdminTienda=response.data.list.email;

            /*Mostrar formulario*/
            $scope.tiendaUpdate="si";
    
        });

    }

    /*Imagen tienda update*/
    $scope.imagenSeleccionadaTiendaUpdateAdminTienda = function (element) {
        $scope.imagenTiendaUpdateAdminTienda = element.files[0];
        
        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.savedFileBase64 = reader.result;
            document.getElementById("imagenUpdateTiendaAdminTienda").src=$scope.savedFileBase64; 
        }

        if ($scope.imagenTiendaUpdateAdminTienda) {
            reader.readAsDataURL($scope.imagenTiendaUpdateAdminTienda);
        }
    };

    $scope.savedFileBase64="";
    /*Actualizar tienda*/
    $scope.actualizarAdminTienda=function(){

        var nombre=$("#nombreTiendaUpdateAdminTienda").val();
        var direccion=$("#direccionTiendaUpdateAdminTienda").val();
        var tipo=$("#tipoTiendaUpdateAdminTienda").val();
        var telefono=$("#telefonoTiendaUpdateAdminTienda").val();
        var email=$("#emailTiendaUpdateAdminTienda").val();

        if($scope.savedFileBase64==""){/*Si no se ha hecho el change de la imagen*/
            var data={"id": idTienda, "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTiendaUpdateAdminTienda, "savedFileBase64": $scope.savedFileBase64};
        }else{/*Si se ha hecho el change de la imagen*/
            var data={"id": idTienda, "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTiendaUpdateAdminTienda.name, "savedFileBase64": $scope.savedFileBase64};
        }

        var url="../../controller/cUpdateTienda.php";

        $http.post(url, data).then(function(response){
            //Mensaje
            alert(response.data.list);
            window.location.reload();
        });

    }

    /*cancelar update tienda*/
    $scope.cancelUpdateTiendaAdminTienda=function(){
        $scope.tiendaUpdateAdminTienda="no";
    }

    $scope.mostrarSelectProductoAdminTienda=function(){

        $scope.productoSelectAdminTienda="si";

        var url="../../controller/cFindProductoByIdTienda.php";
        var data={"idTienda": idTienda};
        /*conseguir los productos de la tienda seleccionada*/
        $http.post(url, data).then(function(response){
            $scope.productosTienda=response.data.list;
        });

    }

     /*Conseguir datos para updateProducto*/
     $scope.productoUpdateAdminTienda="no";
     $scope.seleccionarProductoAdminTienda=function(){
 
         var url="../../controller/cFindProducto.php";
         var data={"id": $scope.productoSeleccionadoAdminTienda};
 
         $http.post(url, data).then(function(response){
 
            /*valores para añadir al formulario*/
            $scope.nombreProductoUpdateAdminTienda=response.data.list.nombre;
            $scope.tipoProductoUpdateAdminTienda=response.data.list.tipo;
            $scope.precioProductoUpdateAdminTienda=Number(response.data.list.objProductoTienda.precio);
            $scope.unidadesProductoUpdateAdminTienda=Number(response.data.list.objProductoTienda.unidades);
            $scope.imagenProductoUpdateAdminTienda=response.data.list.imagen;
 
             /*Mostrar formulario*/
             $scope.productoUpdateAdminTienda="si";
         });
     }


    /*Imagen tienda update*/
    $scope.imagenSeleccionadaProductoUpdateAdminTienda = function (element) {
        $scope.imagenProductoUpdateAdminTienda = element.files[0];
        
        var reader = new FileReader();

        reader.onloadend = function () {
            $scope.savedFileBase64 = reader.result;
            document.getElementById("imagenUpdateProductoAdminTienda").src=$scope.savedFileBase64; 
        }

        if ($scope.imagenProductoUpdateAdminTienda) {
            reader.readAsDataURL($scope.imagenProductoUpdateAdminTienda);
        }
    };

    $scope.savedFileBase64="";
    /*Actualizar tienda*/
    $scope.actualizarProductoAdmin=function(){

        var nombre=$("#nombreProductoUpdateAdminTienda").val();
        var tipo=$("#tipoProductoUpdateAdminTienda").val();

        if($scope.savedFileBase64==""){/*Si no se ha hecho el change de la imagen*/
            var data={"id": $scope.productoSeleccionadoAdminTienda, "nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProductoUpdateAdminTienda, "savedFileBase64": $scope.savedFileBase64};
        }else{/*Si se ha hecho el change de la imagen*/
            var data={"id": $scope.productoSeleccionadoAdminTienda, "nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProductoUpdateAdminTienda.name, "savedFileBase64": $scope.savedFileBase64};
        }

        var url="../../controller/cUpdateProducto.php";

        $http.post(url, data).then(function(response){

            /*datos del producto*/
            var precio=$("#precioProductoUpdateAdminTienda").val();
            var unidades=$("#unidadesProductoUpdateAdminTienda").val();

            var data={"idProducto": $scope.productoSeleccionadoAdminTienda, "idTienda": idTienda, "precio": precio, "unidades": unidades};
            var url="../../controller/cUpdateProductoTienda.php";

            $http.post(url, data).then(function(response){
                //Mensaje
                alert(response.data.list);
                window.location.reload();
            });
        });
    }

    /*cancelar update producto*/
    $scope.cancelUpdateProducto=function(){
        $scope.productoSelectAdminTienda="no";
        $scope.productoUpdateAdminTienda="no";
    }

    /*eliminar producto*/
    $scope.eliminarProductoAdminTienda=function(){

        $("#modalDeleteProductoAdminTienda").css("display", "block");

        /*al hacer click en el boton delete*/
        $("#deletebtnProductoAdminTienda").click(function(){

            var url = "../../controller/cDeleteProducto.php";
            var data = {'id':$scope.productoSeleccionadoAdminTienda};

            $http.post(url, data).then(function(response){
                //Mensaje
                alert(response.data.list);
                window.location.reload();
            });
        })
    }


}

/*funcion para conseguir las ventas del usuario conectado*/
function mostrarVentas(idUsuario){

    var url = "../../controller/cVentas.php";
    var data={"idUsuario": idUsuario};

    $http.post(url, data).then(function(response){
        $scope.ventas=response.data.list;

        if($scope.ventas.length==0){
            $("#rowConsultas").html("<h2 class='text-white text-center'>¡NO TIENES PEDIDOS REALIZADOS!</h2>")
        }

    });

}

function zonaUsuario(idUsuario){

    /*mostrar formulario para actualizar informacion de los usuarios*/
    $scope.formUpdateUsuario="no";
    $scope.mostrarUpdateUsuario=function(){
        $scope.formUpdateUsuario="si";

        var url = "../../controller/cFindUsuario.php";
        var data={"idUsuario": idUsuario};

        $http.post(url, data).then(function(response){
            $scope.usuario=response.data.list;
            /*datos para añadir al formulario*/
            $scope.nombreUsuario=$scope.usuario.nombre;
            $scope.apellidosUsuario=$scope.usuario.apellidos;
            $scope.usernameUsuario=$scope.usuario.username;
            $scope.passwordUsuario=$scope.usuario.password;
        });

        /*ocultar formulario*/
        $scope.cancelUpdateUsuario=function(){
            $scope.formUpdateUsuario="no";
        }

        /*update usuario*/
        $scope.updateUsuario=function(){

            /*datos del usuario*/
            var nombre=$("#updateNombreUsuario").val();
            var apellidos=$("#updateApellidosUsuario").val();
            var username=$("#updateUsernameUsuario").val();
            var password=$("#updatePasswordUsuario").val();

            var url = "../../controller/cUpdateUsuario.php";
            var data={"idUsuario": idUsuario, "nombre": nombre, "apellidos": apellidos, "username": username, "password": password};

            $http.post(url, data).then(function(response){
                //mensaje
                alert(response.data.mensaje);
                window.location.reload();
            });
        }
    } 
}
 
});
