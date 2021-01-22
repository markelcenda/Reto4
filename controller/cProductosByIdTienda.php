<?php

include_once '../model/productoTiendaModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$idTienda=$data['idTienda'];

$response=array();

$productoTienda=new productoTiendaModel();
$productoTienda->setIdTienda($idTienda);


$response['productos']= $productoTienda->findProductoTiendaByIdTienda();

echo json_encode($response);

unset($response);