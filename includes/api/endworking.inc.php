<?php

HttpMisc::allowMethods(['POST']);

$session = new SessionController();
$session->ensureVerifiedUserSession();

// instantiate working hours class
$wh = new WorkingHours();

// ensure wh_id session variable is set
$_SESSION["wh_id"] = $_SESSION["wh_id"] ?? "";

// process stop working request
$result = $wh->stopWorking($_SESSION["wh_id"]);

// remove wh_id from the session
unset($_SESSION["wh_id"]);

echo $result 
    ? JsonHttp::okResp([])
    : JsonHttp::errResp("work not started yet");

exit();