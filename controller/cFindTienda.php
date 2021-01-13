<?php

include_once ("../model/tiendaModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];

$tienda= new tiendaModel();
$tienda->setId($id);

$response=array();

$tienda->findTiendaById();

$response['list']=$tienda->ObjVars();

echo json_encode($response);

unset ($tienda);