<?php

include_once '../model/productoModel.php';
include_once '../model/productoTiendaModel.php';

$response=array();

$producto=new productoModel();
$response['list']= $producto->setProductos();

$productoTienda=new productoTiendaModel();
$response['productos']= $productoTienda->setProductos();

echo json_encode($response);

unset($response);