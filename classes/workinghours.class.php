<?php

class WorkingHours extends Dbh {

    public function startWorking($userId)
    {
        $sql = "INSERT INTO working_hours (wh_uid) VALUES (?);";

        $dbh = $this->connect();
        $stmt = $dbh->prepare($sql);
        
        if (!$stmt->execute(array($userId))) {
            $stmt = null;
            echo JsonHttp::errResp("stmtfailed: Start working");
            exit();
        }

        return $stmt->rowCount() === 1 ? $dbh->lastInsertId() : false;
    }


    public function stopWorking($whId)
    {
        $sql = "UPDATE working_hours SET wh_end_time = current_timestamp(6) WHERE wh_id = ? LIMIT 1;";

        $stmt = $this
            ->connect()
            ->prepare($sql);
        
        if (!$stmt->execute(array($whId))) {
            $stmt = null;
            echo JsonHttp::errResp("stmtfailed: Stop working");
            exit();
        }

        return $stmt->rowCount() > 0;        
    }


    public function getWorkingHours($userId, $workingDay)
    {
        $sql = "SELECT * FROM working_hours WHERE wh_uid = ? AND wh_start_time LIKE ?;";

        $stmt = $this
            ->connect()
            ->prepare($sql);
        
        if (!$stmt->execute(array($userId, $workingDay . '%'))) {
            $stmt = null;
            echo JsonHttp::errResp("stmtfailed: Read working hours");
            exit();
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


}