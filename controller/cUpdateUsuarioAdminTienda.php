<?php

include_once ("../model/usuarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$idUsuario=$data['idUsuario'];
$idTienda=$data['idTienda'];

$usuario= new usuarioModel();
$usuario->setId($idUsuario);
$usuario->setAdminTienda($idTienda);

$response=array();

$response['mensaje']=$usuario->updateUsuarioAdminTienda();

echo json_encode($response);

unset ($usuario);