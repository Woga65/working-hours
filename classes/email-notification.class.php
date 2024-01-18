<?php

class EmailNotification {
    private function __construct() {}

    public static function startWorking() 
    {
        $config = App::resolve("config")["notification"];
        $message = "{$_SESSION['user_name']} {$config['startMsg']} " . date("Y-m-d H:i:s") . "\r\n";
        self::sendNotification($config, $message);
        return true;
    }

    public static function stopWorking()
    {
        $config = App::resolve("config")["notification"];
        $message = "{$_SESSION['user_name']} {$config['stopMsg']} " . date("Y-m-d H:i:s") . "\r\n";
        self::sendNotification($config, $message);
        return true;
    }

    private static function sendNotification($config, $message)
    {
        $recipient = $config["recipient"];
        $subject = $config["subject"];
        $headers = "From: {$_SESSION['user_name']} <{$_SESSION['user_email']}>";
        mail($recipient, $subject, $message, $headers);
    }
}