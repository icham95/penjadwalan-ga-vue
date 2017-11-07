<?php 

require_once('core.php');

$api = new PHP_CRUD_API(array(
	'dbengine'=>'MySQL',
	'hostname'=>'localhost',
	'username'=>'root',
	'password'=>'root',
	'database'=>'dbs_start3',
	'charset'=>'utf8'
));
$api->executeCommand();