<?php

include_once '../model/usuarioModel.php';

$response=array();

$usuario=new usuarioModel();

$response['list']= $usuario->setUsuariosAdminTienda();

echo json_encode($response);

unset($response);