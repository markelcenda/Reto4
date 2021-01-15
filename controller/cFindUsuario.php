<?php

include_once ("../model/usuarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$idUsuario=$data['idUsuario'];

$usuario= new usuarioModel();
$usuario->setId($idUsuario);

$response=array();

$usuario->findUsuarioById();

$response['list']=$usuario->ObjVars();

echo json_encode($response);

unset ($usuario);