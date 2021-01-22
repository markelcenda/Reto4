<?php

include_once '../model/tiendaModel.php';

$response=array();

$tienda=new tiendaModel();

$response['list']= $tienda->setTiendas();
$response['listUltimasTres']= $tienda->setLastTiendas();

echo json_encode($response);

unset($response);