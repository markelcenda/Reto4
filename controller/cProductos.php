<?php

include_once '../model/productoModel.php';

$response=array();

$producto=new productoModel();

$response['list']= $producto->setProductos();

echo json_encode($response);

unset($response);