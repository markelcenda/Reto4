<?php

$data=json_decode(file_get_contents("php://input"),true);

ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $from = "mmanemane932@gmail.com";
    $to = "mmanemane932@gmail.com";
    $subject = "Checking PHP mail";
    $message = "PHP mail works just fine";
    $headers = "From:" . $from;
    mail($to,$subject,$message, $headers);
    echo "The email message was sent.";