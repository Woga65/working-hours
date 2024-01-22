<?php

HttpMisc::allowMethods(['GET']);

$session = new SessionController();
$session->ensureVerifiedUserSession();

echo JsonHttp::okResp([
    "data" => [
        "workingStarted" => isset($_SESSION["wh_id"]) && $_SESSION["wh_id"] ? true : false,
    ]
]);