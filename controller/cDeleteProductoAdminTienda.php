<?php

include_once '../model/productoTiendaModel.php';

$data=json_decode(file_get_contents("php://input"),true);
$idProducto=$data['idProducto'];
$idTienda=$data['idTienda'];

$response=array();

$productoTienda=new productoTiendaModel();
$productoTienda->setIdProducto($idProducto);
$productoTienda->setIdTienda($idTienda);

$response['list']= $productoTienda->deleteProducto();

echo json_encode($response);

unset($productoTienda);