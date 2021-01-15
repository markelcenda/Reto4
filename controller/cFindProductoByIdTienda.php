<?php

include_once ("../model/productoTiendaModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$idTienda=$data['idTienda'];

$productoTienda= new productoTiendaModel();
$productoTienda->setIdTienda($idTienda);

$response=array();

$response['list']=$productoTienda->findProductoTiendaByIdTienda();;

echo json_encode($response);

unset ($productoTienda);