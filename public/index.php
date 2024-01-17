<?php
require_once "../classes/autoloader.class.php";
Autoloader::register();

$router = new Router();

/* Login system endpoints */
$router->post('initloginsystem', '../includes/initloginsystem.inc.php');
$router->post('isloggedin', '../includes/isloggedin.inc.php');
$router->post('isverified', '../includes/isverified.inc.php');
$router->post('login', '../includes/login.inc.php');
$router->post('logout', '../includes/logout.inc.php');
$router->post('sessionexists', '../includes/sessionexists.inc.php');
$router->post('signup', '../includes/signup.inc.php');

/* Working hours endpoints */
$router->post('api/startworking', '../includes/api/startworking.inc.php');
$router->post('api/endworking', '../includes/api/endworking.inc.php');
$router->post('api/workinghours', '../includes/api/workinghours.inc.php');
$router->post('api/initworkinghours', '../includes/api/createworkinghourstable.inc.php');

/* Process routes */
$router->route();
exit();