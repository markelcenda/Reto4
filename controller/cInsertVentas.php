<?php

include_once ("../model/ventaModel.php");

$data = json_decode(file_get_contents("php://input"), true);

$response=array();

$venta = new ventaModel();
$venta->setIdProducto($data['idProducto']);
$venta->setIdUsuario($data['idUsuario']);
//$venta->setFecha($data['fecha']);
$venta->setUnidades($data['unidades']);
$venta->setPrecio($data['precio']);
$venta->setIdTienda($data['idTienda']);



$response['error']=$venta->insertarVenta();

echo json_encode($response);

unset ($venta);
unset ($response);