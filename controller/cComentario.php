<?php

$data=json_decode(file_get_contents("php://input"),true);



ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $email=$data['email'];
    $asunto=$data['asunto'];
    $mensaje=$data['mensaje'];
    $para = "mmanemane932@gmail.com";
    //$headers = "De:" . $email;
    if(mail($para,$asunto,$mensaje)){
        echo "El email fue enviado"; 
    }else{
        echo "Error al enviar el email"; 
    }
?>