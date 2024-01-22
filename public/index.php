<?php
require_once "../classes/autoloader.class.php";
Autoloader::register();

/* Configuration */
$container = new Container();
App::setContainer($container);

App::bind("config", function () {
    $config = require "../config/config.php";
    return $config;
});


/* Routing */
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
$router->post('api/initworkinghours', '../includes/api/createworkinghourstable.inc.php');
$router->get('api/workingstate', '../includes/api/workingstate.inc.php');
$router->get('api/workinghours', '../includes/api/workinghours.inc.php');

/* Process routes */
$router->route();
exit();