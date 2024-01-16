<?php

HttpMisc::allowMethods(['POST']);

$langs = HttpMisc::getAcceptedLanguages();

$msg = (new CreateTables)->createUserTable()
    ? "table created"
    : "table exists";

$x = (new CreateTables)->createWorkinHoursTable();

echo JsonHttp::okResp([
    "msg" => $msg,
    "langs" => $langs,
    "data" => ["loggedIn" => false],
]);

exit();
