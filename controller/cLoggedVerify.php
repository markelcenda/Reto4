<?php
session_start();

$response=array();
$response["mensaje"]="no logged";

if (isset($_SESSION['username'])){
    $response["mensaje"]="logged";
    
    $response["id"]=$_SESSION['id'];
    $response["nombre"]=$_SESSION['nombre'];
    $response["apellidos"]=$_SESSION['apellidos'];
    $response["username"]=$_SESSION['username'];
    $response["password"]=$_SESSION['password'];
    $response["admin"]=$_SESSION['admin'];
    $response["adminTienda"]=$_SESSION['adminTienda'];

} 

echo json_encode($response);
unset($response);
