<?php

include_once ("../model/productoModel.php");

$producto= new productoModel();

$response=array();

$producto->lastId();

$response['list']=$producto->ObjVars();

$response['error']="no error";

echo json_encode($response);

unset ($producto);