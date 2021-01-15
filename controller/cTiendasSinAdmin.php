<?php

include_once '../model/tiendaModel.php';

$response=array();

$tienda=new tiendaModel();

$response['list']= $tienda->setTiendasSinAdmin();

echo json_encode($response);

unset($response);