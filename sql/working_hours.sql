-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 18. Jan 2024 um 09:29
-- Server-Version: 10.11.5-MariaDB-log
-- PHP-Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `ws_login`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `working_hours`
--

CREATE TABLE `working_hours` (
  `wh_id` int(11) NOT NULL,
  `wh_uid` int(11) NOT NULL,
  `wh_end_time` timestamp(6) NULL DEFAULT NULL,
  `wh_start_time` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

