<?php

$data=json_decode(file_get_contents("php://input"),true);

$email=$data['email'];
$asunto=$data['asunto'];
$mensaje=$data['mensaje'];

ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    //$from = "anonimo";
    $to = "mmanemane932@gmail.com";
    //$subject = "Checking PHP mail";
    //$message = "PHP mail works just fine";
    $headers = "De:" . $email;
    if(mail($to,$asunto,$mensaje, $headers)){
        echo "El email fue enviado"; 
        echo $email;
    }else{
        echo "Error al enviar el email"; 
    }
?>