<?php

include_once '../model/productoTiendaModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$idProducto=$data['idProducto'];
$idTienda=$data['idTienda'];
$precio=$data['precio'];
$unidades=$data['unidades'];

$response=array();

$productoTienda=new productoTiendaModel();
$productoTienda->setIdProducto($idProducto);
$productoTienda->setIdTienda($idTienda);
$productoTienda->setPrecio($precio);
$productoTienda->setUnidades($unidades);

$response['list']= $productoTienda->updateProductoTienda();

echo json_encode($response);

unset($productoTienda);