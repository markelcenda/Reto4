<?php

include_once '../model/productoModel.php';

$data=json_decode(file_get_contents("php://input"),true);
$id=$data['id'];

$response=array();

$producto=new productoModel();
$producto->setId($id);

$response['list']= $producto->deleteProducto();

echo json_encode($response);

unset($producto);