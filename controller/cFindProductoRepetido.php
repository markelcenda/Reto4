<?php

include_once ("../model/productoTiendaModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$idProducto=$data['idProducto'];
$idTienda=$data['idTienda'];

$productoTienda= new productoTiendaModel();
$productoTienda->setIdProducto($idProducto);
$productoTienda->setIdTienda($idTienda);

$response=array();

$productoTienda->findProductoRepetido();

$response['list']=$productoTienda->ObjVars();

echo json_encode($response);

unset ($productoTienda);