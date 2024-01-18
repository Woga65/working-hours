<?php

class Dbh {

    protected function connect() {
        try {
            $db = App::resolve("config")["database"];
            $options  = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

            $dbh = new PDO("mysql:host={$db["hostname"]};dbname={$db["dbname"]}", $db["username"], $db["password"], $options);
            return $dbh;

        } catch (PDOException $e) {
            echo JsonHttp::errResp("connection failed: " . $e->getMessage());
            die();
        }
    }

}