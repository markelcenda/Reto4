<?php

include_once ("../model/productoModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];

$producto= new productoModel();
$producto->setId($id);

$response=array();

$producto->findProductoById();

$response['list']=$producto->ObjVars();

echo json_encode($response);

unset ($producto);