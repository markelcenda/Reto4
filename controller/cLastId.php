<?php

include_once ("../model/productoModel.php");

$producto= new productoModel();

$response=array();

$producto->lastId();

$response['list']=$producto->ObjVars();

echo json_encode($response);

unset ($producto);