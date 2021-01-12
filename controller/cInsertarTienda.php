<?php

include_once '../model/tiendaModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$nombre=$data['nombre'];
$direccion=$data['direccion'];
$tipo=$data['tipo'];
$telefono=$data['telefono'];
$email=$data['email'];
$imagen=$data['imagen'];
$savedFileBase64=$data['savedFileBase64'];

$response=array();

$tienda=new tiendaModel();
$tienda->setNombre($nombre);
$tienda->setDireccion($direccion);
$tienda->setTipo($tipo);
$tienda->setTelefono($telefono);
$tienda->setEmail($email);

if($savedFileBase64 != ""){

    $tienda->setImagen($imagen);
    
    $fileBase64 = explode(',', $savedFileBase64)[1]; 
    
    $file = base64_decode($fileBase64);
    
    $writable_dir = '../view/img/';
    if(!is_dir($writable_dir)){mkdir($writable_dir);}
    
    file_put_contents($writable_dir.$imagen, $file,  LOCK_EX);
    
}else{
        $tienda->setImagen($imagen);
}

$response['list']= $tienda->insertarTienda();
$response['error']='no error';

echo json_encode($response);

unset($tienda);