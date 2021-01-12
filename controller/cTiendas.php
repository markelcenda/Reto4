<?php

include_once '../model/tiendaModel.php';

$response=array();

$tienda=new tiendaModel();

$response['list']= $tienda->setTiendas();
$response['error']='no error';

echo json_encode($response);

unset($response);