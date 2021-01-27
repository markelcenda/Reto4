//Envia el comentario escrito en el formulario de contacto a un correo electronico
function enviarComentario(){

    var asunto=$("#asunto").val();
    var mensaje=$("#mensaje").val();

    if( asunto=="" || mensaje==""){
        alert("Por favor rellena todo el formulario.")
    }else{

        var url="../../controller/cComentario.php";
        var data={"asunto":asunto, "mensaje": mensaje};

        fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'} 
        })
        .then(res => res.json()).then(result => {
            console.log(result);

            alert("Email enviado.")
        })
        .catch(error => console.error('Error status:', error));	
    }
}

var miApp = angular.module("App", []);
miApp.controller("miControlador", function ($scope, $http) {

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
});