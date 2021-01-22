<?php

include_once '../model/usuarioModel.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$nombre = $data['nombre'];
$apellidos = $data['apellidos'];
$email = $data['email'];
$password = $data['password'];

$response = array();

$usuario = new usuarioModel();
$usuario->setUsername($username);
$usuario->setNombre($nombre);
$usuario->setApellidos($apellidos);
$usuario->setEmail($email);
$usuario->setPassword($password);

$error=$usuario->comparacionUsuario();

if($error == "Datos no encontrados"){

    $error = $usuario->insertarUsuario();

}

$response['error'] = $error;

echo json_encode($response);

unset($usuario);
