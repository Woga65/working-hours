<?php

HttpMisc::allowMethods(['POST']);

$msg = (new CreateTables)->createWorkinHoursTable()
    ? "wh table created"
    : "wh table exists";

echo JsonHttp::okResp([
    "msg" => $msg,
    "data" => ["loggedIn" => false],
]);

exit();
