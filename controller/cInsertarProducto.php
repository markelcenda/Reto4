<?php

include_once '../model/productoModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$nombre=$data['nombre'];
$tipo=$data['tipo'];
$imagen=$data['imagen'];
$savedFileBase64=$data['savedFileBase64'];

$response=array();

$producto=new productoModel();
$producto->setNombre($nombre);
$producto->setTipo($tipo);

if($savedFileBase64 != ""){

    $producto->setImagen($imagen);
    
    $fileBase64 = explode(',', $savedFileBase64)[1]; 
    
    $file = base64_decode($fileBase64);
    
    $writable_dir = '../view/img/';
    if(!is_dir($writable_dir)){mkdir($writable_dir);}
    
    file_put_contents($writable_dir.$imagen, $file,  LOCK_EX);
    
}else{
        $producto->setImagen($imagen);
}

$response['list']= $producto->insertarProducto();

echo json_encode($response);

unset($producto);