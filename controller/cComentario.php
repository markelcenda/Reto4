<?php

$data=json_decode(file_get_contents("php://input"),true);

$asunto=$data['asunto'];
$mensaje=$data['mensaje'];

ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $email="anonimo";
    $para = "mmanemane932@gmail.com";
    $headers = "De:" . $email;
    if(mail($para,$asunto,$mensaje, $headers)){
        echo "El email fue enviado"; 
    }else{
        echo "Error al enviar el email"; 
    }
?>