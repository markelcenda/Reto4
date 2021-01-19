<?php

$data=json_decode(file_get_contents("php://input"),true);

ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $from = "anonimo";
    $to = "mmanemane932@gmail.com";
    $subject = "Checking PHP mail";
    $message = "PHP mail works just fine";
    $headers = "From:" . $from;
    if(mail($to,$subject,$message, $headers)){
        echo "The email message was sent."; 
    }else{
        echo "Error"; 
    }
    

?>