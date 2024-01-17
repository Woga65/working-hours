<?php

HttpMisc::allowMethods(['POST']);

$session = new SessionController();
$session->ensureVerifiedUserSession();

// instantiate working hours class
$wh = new WorkingHours();

/* process start working request */
$rowId = $_SESSION["wh_id"] = $wh->startWorking($_SESSION["user_id"]);

echo JsonHttp::okResp([
    "data" => [
        "whRowId" => $rowId,
    ]
]);

exit();