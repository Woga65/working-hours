<?php

HttpMisc::allowMethods(['POST']);

$session = new SessionController();
$isValid = $session->updateSessionState();

echo $isValid
    ?   JsonHttp::okResp([
            "data" => [
                "loggedIn" => true,
                "userRowId" => $_SESSION["user_id"], 
                "userId" => $_SESSION["user_uid"],
                "userName" => $_SESSION["user_name"],
                "userEmail" => $_SESSION["user_email"],
                "userVerified" => $_SESSION["user_verified"] === 1 ? true : false,
                "userTimestamp" => $_SESSION["user_timestamp"],
            ]
        ])
    :   JsonHttp::okResp([
            "data" => ["loggedIn" => false],
        ]);

exit();


//"token" => isset($_SERVER["HTTP_X_API_TOKEN"]) ? $_SERVER["HTTP_X_API_TOKEN"] : '',