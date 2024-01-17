<?php

HttpMisc::allowMethods(['POST']);

$session = new SessionController();
$session->ensureVerifiedUserSession();

// grab parameters
$params = JsonHttp::requestData();

$workingDay = $params->workingDay;

// instantiate working hours class
$wh = new WorkingHours();

/* process working hours request */
echo JsonHttp::okResp([
    "data" => $wh->getWorkingHours($_SESSION["user_id"], $workingDay),
]);

exit();