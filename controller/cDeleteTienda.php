<?php

include_once '../model/tiendaModel.php';

$data=json_decode(file_get_contents("php://input"),true);
$id=$data['id'];

$response=array();

$tienda=new tiendaModel();
$tienda->setId($id);

$response['list']= $tienda->deleteTienda();

echo json_encode($response);

unset($tienda);