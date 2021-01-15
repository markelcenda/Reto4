<?php

include_once ("../model/ventaModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$idUsuario=$data['idUsuario'];

$venta= new ventaModel();
$venta->setIdUsuario($idUsuario);

$response=array();

$response['list']=$venta->findVentaByIdUsuario();

echo json_encode($response);

unset ($venta);