<?php

include_once ("../model/usuarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$idUsuario=$data['idUsuario'];
$nombre=$data['nombre'];
$apellidos=$data['apellidos'];
$username=$data['username'];
$password=$data['password'];

$usuario= new usuarioModel();
$usuario->setId($idUsuario);
$usuario->setNombre($nombre);
$usuario->setApellidos($apellidos);
$usuario->setUsername($username);
$usuario->setPassword($password);

$response=array();

$response['mensaje']=$usuario->updateUsuario();

echo json_encode($response);

unset ($usuario);