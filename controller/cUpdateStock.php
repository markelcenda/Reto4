<?php

include_once ("../model/productoTiendaModel.php");

$data = json_decode(file_get_contents("php://input"), true);

$productoTiendaModel = new productoTiendaModel();
$productoTiendaModel->setIdProducto($data['idProducto']);
$productoTiendaModel->setIdTienda($data['idTienda']);
$productoTiendaModel->setUnidades($data['cantidad']);

$response=array();
$response['error']=$productoTiendaModel->updateStock();

echo json_encode($response);

unset ($productoTiendaModel);
unset ($response);
