<?php

return [
    "database" => [
        "hostname" => "localhost",
        "dbname"   => "ws_login",
        "username" => "root",
        "password" => "",
    ],
    "verification"  => [
        "subject"   => "your registration: Timekeeping Project",
        "from"      => "From: Timekeeping <noreply@ws-timekeeping.de>",
        "scriptUrl" => "https://wolfgang-siebert.de/projects/timekeeping/verify.php", 
    ],
    "notification"  => [
        "recipient" => "woga@mytsa.de",
        "subject"   => "Timekeeping / working hours",
        "startMsg"  => "started working",
        "stopMsg"   => "stopped working",
    ],
];