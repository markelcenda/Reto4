<?php
        
include_once '../model/UsuarioModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$username=$data['username'];
$password=$data['password'];

$user=new UsuarioModel();
$user->setUsername($username);
$user->setPassword($password);

$mensaje=$user->findUser();

$response = array();

$response["mensaje"] =$mensaje;

if($mensaje!="no error"){
    $response["mensaje"] = $mensaje;
}else{
    $response["mensaje"] = $mensaje;
    
    if (!isset($_SESSION)){
        session_start();
    }

    $_SESSION['id']=$user->getId();
    $_SESSION['nombre']=$user->getNombre();
    $_SESSION['apellidos']=$user->getApellidos();
    $_SESSION['username']=$user->getUsername();
    $_SESSION['password']=$user->getPassword();
    $_SESSION['admin']=$user->getAdmin();
    $_SESSION['adminTienda']=$user->getAdminTienda();

    $response["mensaje"] = "no error";

    $response["id"] = $_SESSION['id'];
    $response["nombre"] = $_SESSION['nombre'];
    $response["apellidos"] = $_SESSION['apellidos'];
    $response["username"] = $_SESSION['username'];
    $response["password"]=$_SESSION['password'];
    $response["admin"] = $_SESSION['admin'];
    $response["adminTienda"] = $_SESSION['adminTienda'];
    
}

echo json_encode($response);
unset($response);

