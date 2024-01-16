<?php

HttpMisc::allowMethods(['POST']);

$session = new SessionController();
$session->ensureVerifiedUserSession();


/* processing of working end goes here */
echo JsonHttp::okResp([
    "action" => "start working",
    "data" => [
        "loggedIn" => true,
        "userRowId" => $_SESSION["user_id"], 
        "userId" => $_SESSION["user_uid"],
        "userName" => $_SESSION["user_name"],
        "userEmail" => $_SESSION["user_email"],
        "userVerified" => $_SESSION["user_verified"] === 1 ? true : false,
        "userTimestamp" => $_SESSION["user_timestamp"],
    ]
]);

exit();