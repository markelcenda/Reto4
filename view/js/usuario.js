var app = angular.module("app", []);
app.controller("miControlador", function ($scope, $http) {

    /*Lista de tiendas para el select*/
    $http.get("../../controller/cTiendas.php").then(function (response) {
        $scope.tiendas = response.data.list;
    });

    /*Lista de productos para el select*/
    $http.get("../../controller/cProductos.php").then(function (response) {
        $scope.productos = response.data.list;
    });

    /*Comprobar si hay algún usuario conectado*/
    $scope.loggedVerify = function () {

        var url = "../../controller/cLoggedVerify.php";

        $http.get(url).then(function (response) {

            if (response.data.mensaje === "logged") {

                //esconder div inicial
                $("#zonaLogin").html("");

                //añadir los 2 iconos nuevos
                var newRow = "";
                newRow = "<div class='row justify-content-center'>";
                newRow += "<p class='text-white mt-auto mb-auto ml-auto'>" + response.data.username + "</p>";
                newRow += "<button type='button' class='btn' id='paginaUsuario'><i class='fa fa-user'></i></button>";
                newRow += "<button type='button' class='btn' id='btnLogout'><i class='fa fa-window-close'></i></button>";
                newRow += "</div>";
                $("#insertarLogin").html(newRow);

                /*al hacer click en btnLogout*/
                $("#btnLogout").click(function () {
                    logout();
                });

                /*al hacer click en paginaUsuario*/
                $("#paginaUsuario").click(function () {
                    window.location.href = "usuario.html";
                });

                if (response.data.admin == 0) {

                    if (response.data.adminTienda == null) {

                    } else {
                        //Si eres administrador de una tienda
                        zonaAdminTienda(response.data.admin, response.data.adminTienda);
                    }
                } else {
                    //Si eres administrador general
                    zonaAdmin(response.data.admin, response.data.adminTienda);
                }
                /*opciones que tiene cualquier usuario*/
                mostrarVentas(response.data.id);
                zonaUsuario(response.data.id, response.data.admin);
            } else {
                window.location.href = "../../index.html";
            }
        });
    }

    /*Funcion logout*/
    function logout() {

        var url = "../../controller/cLogout.php";

        $http.get(url).then(function (response) {

            window.location.reload();
            alert("Sesión cerrada");

            /*Volver a poner el login del navbar*/
            var reset = `<form id="zonaLogin" class="form-inline my-2 my-lg-0 d-flex justify-content-center">
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

    function zonaAdmin(admin, adminTienda) {

        $scope.divInsertarTienda = "si";

        //mostrar div del admin general*/
        $scope.adminGeneral = "si";
        //ocultar div del adminTienda
        $scope.adminTienda = "no";
        /*div insert tienda*/
        $scope.tiendaInsert = "no";
        $scope.mostrarInsertTienda = function () {
            $scope.tiendaInsert = "si";
        }

        /*cancelar insert de tienda*/
        $scope.cancelarInsertarTienda = function () {
            document.getElementById("imagenInsertTienda").src = "../img/default.png";
            document.getElementById("fileTienda").innerHTML = "<input type='file' name='tienda' id='imagenTienda' onchange='angular.element(this).scope().imagenSeleccionadaTienda(this)'' accept='.png,.jpeg,.jpg,.gif'/>";
            document.getElementById("fileTienda").innerHTML += "<i class='fa fa-upload'></i>";
            /*restaurar valores*/
            $scope.savedFileBase64 = "";
            $scope.nombreTiendaNuevo = "";
            $scope.direccionTiendaNuevo = "";
            $scope.tipoTiendaNuevo = "";
            $scope.telefonoTiendaNuevo = "";
            $scope.emailTiendaNuevo = "";
            $scope.tiendaInsert = "no";
        }

        /*Imagen tienda*/
        $scope.imagenSeleccionadaTienda = function (element) {
            $scope.imagenTienda = element.files[0];

            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.savedFileBase64 = reader.result;
                document.getElementById("imagenInsertTienda").src = $scope.savedFileBase64;
            }
            if ($scope.imagenTienda) {
                reader.readAsDataURL($scope.imagenTienda);
            }

        };

        $scope.savedFileBase64 = "";
        /*Insertar tienda*/
        $scope.insertarTienda = function () {

            var nombre = $scope.nombreTiendaNuevo;
            var direccion = $scope.direccionTiendaNuevo;
            var tipo = $scope.tipoTiendaNuevo;
            var telefono = $scope.telefonoTiendaNuevo;
            var email = $scope.emailTiendaNuevo;
            permitirInsert = true;

            if (nombre == undefined || direccion == undefined || tipo == undefined || telefono == undefined || email == undefined) {//si hay datos vacios
                alert("Se ha producido un error. ¡Rellena todo el formulario!");
            } else {//si no hay datos vacios

                for (let i = 0; i < $scope.tiendas.length; i++) {
                    //validacion de datos
                    if (nombre == $scope.tiendas[i].nombre || telefono == $scope.tiendas[i].telefono || email == $scope.tiendas[i].email) {

                        permitirInsert = false;

                        if (nombre == $scope.tiendas[i].nombre) {
                            $("#nombreTienda").css("border", "2px solid red");
                        } else {
                            $("#nombreTienda").css("border", "2px solid green");
                        }

                        if (telefono == $scope.tiendas[i].telefono) {
                            $("#telefonoTienda").css("border", "2px solid red");
                        } else {
                            $("#telefonoTienda").css("border", "2px solid green");
                        }

                        if (email == $scope.tiendas[i].email) {
                            $("#emailTienda").css("border", "2px solid red");
                        } else {
                            $("#emailTienda").css("border", "2px solid green");
                        }
                    }
                }

                if (permitirInsert == true) {//si todos los datos son correctos
                    if ($scope.savedFileBase64 == "") {/*Si no se ha hecho el change de la imagen*/
                        var data = { "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": "default.png", "savedFileBase64": $scope.savedFileBase64 };
                    } else {/*Si se ha hecho el change de la imagen*/
                        var data = { "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTienda.name, "savedFileBase64": $scope.savedFileBase64 };
                    }

                    var url = "../../controller/cInsertarTienda.php";
                    $http.post(url, data).then(function (response) {
                        //mensaje
                        alert(response.data.list);
                        window.location.reload();
                    });
                } else {
                    alert("¡Datos repetidos!");
                }
            }
        }
        funcionesAdministradores(admin, adminTienda);
    }

    //si eres adminTienda ocultar div de insertar tienda
    function zonaAdminTienda(admin, idTienda) {
        $scope.adminGeneral = "si";
        $scope.divInsertarTienda = "no";
        funcionesAdministradores(admin, idTienda);
    }

    function funcionesAdministradores(admin, adminTienda) {

        $scope.productoSelect = "no";
        $scope.productoSelectTienda = "no";

        if (admin == 1) {//si eres admin general
            $scope.divSelectTiendas = "si";
            $scope.mostrarSelectTienda = function () {
                $scope.tiendaSelect = "si";
            }
            $scope.mostrarSelectProducto = function () {
                $scope.productoSelect = "si";
                $scope.productoSelectTienda = "no";
            }
            /*cancelar update producto*/
            $scope.cancelUpdateProducto = function () {
                $scope.productoSelect = "no";
                $scope.productoUpdate = "no";
            }
            $scope.btnDeleteTienda = "si";
            $scope.selectTiendaUpdateProducto = "si";
            $scope.productoAdminTienda = "no";
            $scope.productoAdmin = "si";

        } else {//si no eres admin general
            if (adminTienda == null) {//si no eres adminTienda
                $scope.adminGeneral = "no";
                $("#divZonaAdministradores").hide();
                $("#divZonaAdministradores2").hide();
            } else {//si eres adminTienda
                $scope.divSelectTiendas = "no";
                $scope.tiendaSelect = "no";

                $scope.mostrarSelectTienda = function () {
                    $scope.tiendaSelect = "no";
                    $scope.tiendaUpdate = "si";
                    $scope.seleccionarTienda();
                }
                $scope.mostrarSelectProducto = function () {
                    $scope.productoSelect = "no";
                    $scope.productoSelectTienda = "si";
                    $scope.productosByIdTienda();
                }
                /*cancelar update producto*/
                $scope.cancelUpdateProducto = function () {
                    $scope.productoSelectTienda = "no";
                    $scope.productoUpdate = "no";
                }
                $scope.btnDeleteTienda = "no";
                $scope.selectTiendaUpdateProducto = "no";
                $scope.productoAdminTienda = "si";
                $scope.productoAdmin = "no";
            }
        }
        /*div insert producto*/
        $scope.productoInsert = "no";
        $scope.mostrarInsertProducto = function () {

            if (admin == 1) {
                $scope.productoInsert = "si";
                $scope.selectProductosAdminTienda = "no";
                $scope.btnInsertProductos = "si";
            } else {
                $scope.productoInsert = "si";
                $scope.selectProductosAdminTienda = "si";
                $scope.productoAdminTienda = "no";
                $scope.btnInsertProductos = "no";

                $scope.mostrarInsertProductoAdminTienda = function () {
                    $scope.productoAdminTienda = "si";
                    $scope.btnInsertProductos = "si";
                }
            }
        }

        /*cancelar insert de producto*/
        $scope.cancelarInsertarProducto = function () {
            document.getElementById("imagenInsertProducto").src = "../img/default.png";
            document.getElementById("fileProducto").innerHTML = "<input type='file' name='imagen' id='imagenProducto' onchange='angular.element(this).scope().imagenSeleccionadaProducto(this)'' accept='.png,.jpeg,.jpg,.gif'/>";
            document.getElementById("fileProducto").innerHTML += "<i class='fa fa-upload'></i>";
            /*Restaurar valores*/
            $scope.savedFileBase64 = "";
            $scope.nombreProductoNuevo = "";
            $scope.tipoProductoNuevo = "";
            $scope.precioProductoNuevo = "";
            $scope.unidadesProductoNuevo = "";
            $scope.tiendaSeleccionada = "";
            $scope.productoInsert = "no";
        }

        /*Imagen producto*/
        $scope.imagenSeleccionadaProducto = function (element) {
            $scope.imagenProducto = element.files[0];

            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.savedFileBase64 = reader.result;
                document.getElementById("imagenInsertProducto").src = $scope.savedFileBase64;
            }
            if ($scope.imagenProducto) {
                reader.readAsDataURL($scope.imagenProducto);
            }
        };

        $scope.savedFileBase64 = "";
        /*Insertar producto*/
        $scope.insertarProducto = function () {

            if (admin == 1) {//si eres admin general solo pudes añadir el nombre, tipo e imagen del producto

                var nombre = $scope.nombreProductoNuevo;
                var tipo = $scope.tipoProductoNuevo;

                //si los datos estan vavios
                if (nombre == undefined || tipo == undefined) {
                    alert("Se ha producido un error. ¡Rellena todo el formulario!");
                } else {//si no estan vacios

                    if ($scope.savedFileBase64 == "") {/*Si no se ha hecho el change de la imagen*/
                        var data = { "nombre": nombre, "tipo": tipo, "imagen": "default.png", "savedFileBase64": $scope.savedFileBase64 };
                    } else {/*Si se ha hecho el change de la imagen*/
                        var data = { "nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProducto.name, "savedFileBase64": $scope.savedFileBase64 };
                    }
                    var url = "../../controller/cInsertarProducto.php";
                    $http.post(url, data).then(function (response) {
                        alert(response.data.list);
                        window.location.reload();
                    });
                }

            } else {//si eres adminTienda solo puedes añadir el precio y unidades del producto

                var precio = $scope.precioProductoNuevo;
                var unidades = $scope.unidadesProductoNuevo;

                //si los datos estan vacios
                if (precio == "" || unidades == "") {
                    alert("Se ha producido un error. ¡Rellena todo el formulario!");
                } else {//si no estan vacios

                    var data = { "idProducto": $scope.productoSeleccionado, "idTienda": adminTienda, "precio": precio, "unidades": unidades };
                    var url = "../../controller/cInsertarProductoTienda.php";
                    $http.post(url, data).then(function (response) {
                        //Mensaje
                        alert(response.data.list);
                        window.location.reload();
                    });
                }
            }
        }

        /*cancelar update tienda*/
        $scope.cancelUpdateTienda = function () {
            $scope.tiendaSelect = "no";
            $scope.tiendaUpdate = "no";
        }

        /*Conseguir datos para updateTienda*/
        $scope.tiendaUpdate = "no";
        $scope.seleccionarTienda = function () {

            var url = "../../controller/cFindTienda.php";
            if (admin == 1) {//si eres admin general
                var data = { "id": $scope.tiendaSeleccionada };
                /*Mostrar formulario*/
                $scope.tiendaUpdate = "si";
            } else {//si eres adminTienda
                var data = { "id": adminTienda };
            }

            $http.post(url, data).then(function (response) {
                /*valores para añadir al formulario*/
                $scope.nombreTiendaUpdate = response.data.list.nombre;
                $scope.direccionTiendaUpdate = response.data.list.direccion;
                $scope.tipoTiendaUpdate = response.data.list.tipo;
                $scope.imagenTiendaUpdate = response.data.list.imagen;
                $scope.telefonoTiendaUpdate = Number(response.data.list.telefono);
                $scope.emailTiendaUpdate = response.data.list.email;
            });
        }

        /*Imagen tienda update*/
        $scope.imagenSeleccionadaTiendaUpdate = function (element) {
            $scope.imagenTiendaUpdate = element.files[0];

            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.savedFileBase64 = reader.result;
                document.getElementById("imagenUpdateTienda").src = $scope.savedFileBase64;
            }
            if ($scope.imagenTiendaUpdate) {
                reader.readAsDataURL($scope.imagenTiendaUpdate);
            }
        };

        $scope.savedFileBase64 = "";
        /*Actualizar tienda*/
        $scope.actualizarTiendaAdmin = function () {

            //datos para hacer el update
            var nombre = $("#nombreTiendaUpdate").val();
            var direccion = $("#direccionTiendaUpdate").val();
            var tipo = $("#tipoTiendaUpdate").val();
            var telefono = $("#telefonoTiendaUpdate").val();
            var email = $("#emailTiendaUpdate").val();

            //si hay algun dato vacio
            if (nombre == "" || direccion == "" || tipo == "" || telefono == "" || email == "") {
                alert("Se ha producido un error. ¡Rellena todo el formulario!");
            } else {//si no hay datos vacios

                if (admin == 1) {//si eres admin general
                    if ($scope.savedFileBase64 == "") {/*Si no se ha hecho el change de la imagen*/
                        var data = { "id": $scope.tiendaSeleccionada, "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTiendaUpdate, "savedFileBase64": $scope.savedFileBase64 };
                    } else {/*Si se ha hecho el change de la imagen*/
                        var data = { "id": $scope.tiendaSeleccionada, "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTiendaUpdate.name, "savedFileBase64": $scope.savedFileBase64 };
                    }
                } else {//si eres adminTienda
                    if ($scope.savedFileBase64 == "") {/*Si no se ha hecho el change de la imagen*/
                        var data = { "id": adminTienda, "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTiendaUpdate, "savedFileBase64": $scope.savedFileBase64 };
                    } else {/*Si se ha hecho el change de la imagen*/
                        var data = { "id": adminTienda, "nombre": nombre, "direccion": direccion, "tipo": tipo, "telefono": telefono, "email": email, "imagen": $scope.imagenTiendaUpdate.name, "savedFileBase64": $scope.savedFileBase64 };
                    }
                }
                var url = "../../controller/cUpdateTienda.php";
                $http.post(url, data).then(function (response) {
                    //Mensaje
                    alert(response.data.list);
                    window.location.reload();
                });
            }
        }

        /*cargar productos pasandole idTienda*/
        $scope.productosByIdTienda = function () {
            var url = "../../controller/cFindProductoByIdTienda.php";
            var data = { "idTienda": adminTienda };
            $http.post(url, data).then(function (response) {
                $scope.productosTienda = response.data.list;
                console.log($scope.productosTienda);
            });
        }

        /*Conseguir datos para updateProducto*/
        $scope.productoUpdate = "no";
        $scope.seleccionarProducto = function () {

            if (admin == 1) {//si eres admin mostrar los divs correspondientes
                $scope.updateProductoAdmin = "si";
                $scope.updateProductoAdminTienda = "no";
                $scope.productoUpdate = "si";
            } else {//si eres adminTienda mostrar los div correspondientes
                $scope.updateProductoAdminTienda = "si";
                $scope.updateProductoAdmin = "no";
                $scope.productoUpdate = "si";
            }

            var url = "../../controller/cFindProducto.php";
            var data = { "id": $scope.productoSeleccionado };

            $http.post(url, data).then(function (response) {
                /*valores para añadir al formulario*/
                $scope.nombreProductoUpdate = response.data.list.nombre;
                $scope.tipoProductoUpdate = response.data.list.tipo;
                $scope.imagenProductoUpdate = response.data.list.imagen;
                $scope.precioProductoUpdate = Number(response.data.list.objProductoTienda.precio);
                $scope.unidadesProductoUpdate = Number(response.data.list.objProductoTienda.unidades);
                $scope.idTienda = response.data.list.objProductoTienda.idTienda;
                $scope.nombreTienda = response.data.list.objProductoTienda.objTienda.nombre;

            });
        }

        /*Imagen tienda update*/
        $scope.imagenSeleccionadaProductoUpdate = function (element) {
            $scope.imagenProductoUpdate = element.files[0];

            var reader = new FileReader();
            reader.onloadend = function () {
                $scope.savedFileBase64 = reader.result;
                document.getElementById("imagenUpdateProducto").src = $scope.savedFileBase64;
            }
            if ($scope.imagenProductoUpdate) {
                reader.readAsDataURL($scope.imagenProductoUpdate);
            }
        };

        $scope.savedFileBase64 = "";
        /*Actualizar tienda*/
        $scope.actualizarProductoAdmin = function () {

            if (admin == 1) {//si eres admin general solo pudes actualizar el nombre, tipo e imagen del producto
                //datos
                var nombre = $("#nombreProductoUpdate").val();
                var tipo = $("#tipoProductoUpdate").val();

                if (nombre == "" || tipo == "") {//si hay datos vacios
                    alert("Se ha producido un error. ¡Rellena todo el formulario!");
                } else {//si no hay datos vacios
                    if ($scope.savedFileBase64 == "") {/*Si no se ha hecho el change de la imagen*/
                        var data = { "id": $scope.productoSeleccionado, "nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProductoUpdate, "savedFileBase64": $scope.savedFileBase64 };
                    } else {/*Si se ha hecho el change de la imagen*/
                        var data = { "id": $scope.productoSeleccionado, "nombre": nombre, "tipo": tipo, "imagen": $scope.imagenProductoUpdate.name, "savedFileBase64": $scope.savedFileBase64 };
                    }

                    var url = "../../controller/cUpdateProducto.php";
                    $http.post(url, data).then(function (response) {
                        alert(response.data.list);
                        window.location.reload();
                    });
                }
            } else {//si eres adminTienda solo pudes actualizar el precio y unidades del producto

                /*datos del producto*/
                var precio = $("#precioProductoUpdate").val();
                var unidades = $("#unidadesProductoUpdate").val();

                if (precio == "" || unidades == "") {//si hay datos vacios
                    alert("Se ha producido un error. ¡Rellena todo el formulario!");
                } else {//si no hay datos vacios

                    var data = { "idProducto": $scope.productoSeleccionado, "idTienda": adminTienda, "precio": precio, "unidades": unidades };
                    var url = "../../controller/cUpdateProductoTienda.php";
                    $http.post(url, data).then(function (response) {
                        //Mensaje
                        alert(response.data.list);
                        window.location.reload();
                    });
                }
            }
        }

        /*eliminar tienda*/
        $scope.eliminarTiendaAdmin = function () {

            /*mostrar modal*/
            $("#modalDeleteTienda").css("display", "block");

            /*al hacer click en el boton delete*/
            $("#deletebtnTienda").click(function () {

                var url = "../../controller/cDeleteTienda.php";
                var data = { 'id': $scope.tiendaSeleccionada };
                $http.post(url, data).then(function (response) {
                    //Mensaje
                    alert(response.data.list);
                    window.location.reload();
                });
            })
        }

        /*eliminar producto*/
        $scope.eliminarProductoAdmin = function () {

            $("#modalDeleteProducto").css("display", "block");

            /*al hacer click en el boton delete*/
            $("#deletebtnProducto").click(function () {

                if(admin==1){//si eres admin
                    var url = "../../controller/cDeleteProductoAdmin.php";
                    var data = { 'id': $scope.productoSeleccionado };
                }else{//si eres adminTienda
                    var url = "../../controller/cDeleteProductoAdminTienda.php";
                    var data = { 'idProducto': $scope.productoSeleccionado, "idTienda": adminTienda};
                }
                
                $http.post(url, data).then(function (response) {
                    //Mensaje
                    alert(response.data.list);
                    window.location.reload();
                });
            })
        }

    }

    /*funcion para conseguir las ventas del usuario conectado*/
    function mostrarVentas(idUsuario) {

        var url = "../../controller/cVentas.php";
        var data = { "idUsuario": idUsuario };
        $http.post(url, data).then(function (response) {
            $scope.ventas = response.data.list;
            //si no tiene ningun pedido realizado
            if ($scope.ventas.length == 0) {
                $("#rowConsultas").html("<h2 class='text-white text-center'>¡NO TIENES PEDIDOS REALIZADOS!</h2>")
            }
        });
    }

    function zonaUsuario(idUsuario, admin) {

        if (admin == 0) {/*si no eres admin ocultar div para actualizar los administradores*/
            $("#divZonaAdministradores").hide();
            $("#divZonaAdministradores2").hide();
        } else {/*si eres admin mostrar div para actualizar los administradores*/
            $("#divZonaAdministradores").show();
            $("#divZonaAdministradores2").show();
            updateAdministradores();
        }

        /*mostrar formulario para actualizar informacion de los usuarios*/
        $scope.formUpdateUsuario = "no";
        $scope.mostrarUpdateUsuario = function () {
            $scope.formUpdateUsuario = "si";

            var url = "../../controller/cFindUsuario.php";
            var data = { "idUsuario": idUsuario };
            $http.post(url, data).then(function (response) {
                $scope.usuario = response.data.list;
                /*datos para añadir al formulario*/
                $scope.nombreUsuario = $scope.usuario.nombre;
                $scope.apellidosUsuario = $scope.usuario.apellidos;
                $scope.usernameUsuario = $scope.usuario.username;
                $scope.passwordUsuario = $scope.usuario.password;
            });
        }

        /*ocultar formulario*/
        $scope.cancelUpdateUsuario = function () {
            $scope.formUpdateUsuario = "no";
        }

        /*update usuario*/
        $scope.updateUsuario = function () {

            /*datos del usuario*/
            var nombre = $("#updateNombreUsuario").val();
            var apellidos = $("#updateApellidosUsuario").val();
            var username = $("#updateUsernameUsuario").val();
            var password = $("#updatePasswordUsuario").val();

            if (nombre == "" || apellidos == "" || password == "") {//si los datos estan vacios
                alert("Se ha producido un error. ¡Rellena todo el formulario!");
            } else {//si los datos no estan vacios
                var url = "../../controller/cUpdateUsuario.php";
                var data = { "idUsuario": idUsuario, "nombre": nombre, "apellidos": apellidos, "username": username, "password": password };
                $http.post(url, data).then(function (response) {
                    //mensaje
                    alert(response.data.mensaje);
                    window.location.reload();
                });
            }
        }

        function updateAdministradores() {

            /*mostrar select de usuarios que no son administradores de tiendas*/
            $scope.selectNoAdministradores = "no";
            $scope.mostrarNoAdministradores = function () {
                $scope.selectNoAdministradores = "si";

                /*usuarios que no son adminTieda*/
                var url1 = "../../controller/cUsuariosNoAdmin.php";
                $http.get(url1).then(function (response) {
                    $scope.usuariosNoAdmin = response.data.list;
                });

                /*tiendas sin administradores*/
                var url2 = "../../controller/cTiendasSinAdmin.php";
                $http.get(url2).then(function (response) {
                    $scope.tiendasSinAdmin = response.data.list;
                });

            }

            /*cancelar update usuario*/
            $scope.cancelUpdateUsuarioAdminTienda = function () {
                $scope.selectNoAdministradores = "no";
            }

            /*añadir usuario como admin tienda*/
            $scope.updateUsuarioAdminTienda = function () {

                var data = { "idUsuario": $scope.usuarioSeleccionadoAdminTienda, "idTienda": $scope.tiendaSeleccionadoAdminTienda };
                var url = "../../controller/cUpdateUsuarioAdminTienda.php";

                if ($scope.usuarioSeleccionadoAdminTienda == undefined) {
                    alert("Selecciona un usuario");
                } else if ($scope.tiendaSeleccionadoAdminTienda == undefined) {
                    alert("Selecciona una tienda");
                } else {
                    $http.post(url, data).then(function (response) {
                        //mensaje
                        alert(response.data.mensaje);
                        window.location.reload();
                    });
                }
            }

            /*mostrar select de usuarios que no son administradores de tiendas*/
            $scope.selectAdministradoresTienda = "no";
            $scope.mostrarAdministradoresTienda = function () {
                $scope.selectAdministradoresTienda = "si";

                /*usuarios que no son adminTieda*/
                var url = "../../controller/cUsuariosAdminTienda.php";
                $http.get(url).then(function (response) {
                    $scope.usuariosAdminTienda = response.data.list;
                });
            }

            /*cancelar quitarAdminTienda*/
            $scope.cancelUpdateUsuarioNoAdminTienda = function () {
                $scope.selectAdministradoresTienda = "no";
                $("#divZonaAdministradores2").css("height", "auto");
            }

            /*al hacer change, quitar el admin de una tienda*/
            $scope.quitarAdminTienda = function () {

                //hacer mas grande el div para que entre el modal
                $("#divZonaAdministradores2").css("height", "500px");

                /*mostrar modal*/
                $("#modalDeleteAdminTienda").css("display", "block");

                /*al hacer click en el boton delete*/
                $("#deletebtnAdminTienda").click(function () {

                    var url = "../../controller/cUpdateNoAdminTienda.php";
                    var data = { "idUsuario": $scope.usuarioSeleccionadoAdminTienda };

                    $http.post(url, data).then(function (response) {
                        //mensaje
                        alert(response.data.mensaje);
                        window.location.reload();
                    });
                })

                //volver a poner la misma altura al div al cancelar
                $("#cancelbtnAdminTienda").click(function () {
                    $("#divZonaAdministradores2").css("height", "auto");
                })
            }
        }
    }
});
