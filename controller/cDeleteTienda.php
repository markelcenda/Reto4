<?php

include_once '../model/tiendaModel.php';
include_once '../model/usuarioModel.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$response = array();

$tienda = new tiendaModel();
$tienda->setId($id);

$usuario = new usuarioModel();
$usuario->setAdminTienda($id);

$error = $usuario->adminTiendaNull();

if ($error == "correcto") {
    $response['list'] = $tienda->deleteTienda();
} else {
    $response['list'] = " Se ha producido un error";
}

echo json_encode($response);

unset($tienda);
