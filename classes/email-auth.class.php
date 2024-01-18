<?php

class EmailAuth {
    private function __construct() {}

    public static function sendVerification($email, $name, $vkey) {
        $config = App::resolve("config")["verification"];

        $recipient = $email;
        $subject = $config["subject"];
        $headers = $config["from"];
        $message = "Hi $name,\r\n \r\nto complete the registration process, please follow the link below: \r\n \r\n";
        $message = $message . $config["scriptUrl"] . "?vkey=$vkey";                           
        mail($recipient, $subject, $message, $headers);
        return true;
    }
}