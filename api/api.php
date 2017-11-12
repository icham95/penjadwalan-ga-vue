<?php 
include_once('vendor/autoload.php');
use \Firebase\JWT\JWT;
$key = "1niK3yny@";
// $pathImage = 

// $token = make_token($key);
// $decode = decode($token, $key);
// var_dump($decode);

if (isset($_GET['login'])) {
	_headers();
	$parsed = parsed();
	$conn = conn();
	$query = "";
	if (isset($_GET['admin'])) {
		$query = "select * from tbl_prodi_user where username = '{$parsed->username}' and password = '{$parsed->password}'";
	} else if (isset($_GET['dosen'])) {
		$query = "select * from tbl_user_dosen where username = '{$parsed->username}' and password = '{$parsed->password}'";
	}
	$result = $conn->query($query);
	if ($result->num_rows > 0) {
		$data = [];
		while ($row = $result->fetch_assoc()) {
			$data = $row;
		}
		$token = make_token($key, $data);
		json([
			'success' => true,
			'token' => $token,
			'user' => $data
		]);
	}
} else {
	_headers();
	$headers = apache_request_headers();
	$headerToken = $headers['Authorization'];
	$dataToken = decode($headerToken, $key);
	require_once('core.php');
	$api = new PHP_CRUD_API(array(
		'dbengine'=>'MySQL',
		'hostname'=>'localhost',
		'username'=>'root',
		'password'=>'root',
		'database'=>'dbs_start3',
		'charset'=>'utf8'
	));

	if (isset($_GET['upload-foto-dosen'])) {
		$parsed = parsed();
		$path = dirname(__FILE__) . '/foto/';
		$pathFoto = $path . $parsed->foto;
		$data = base64_decode($parsed->uploadFotoDosen);
		$img = imagecreatefromstring($data);
		imagepng($img, $pathFoto);
		imagedestroy($img);
	}

	if (isset($_GET['count'])) {
		$conn = conn();
		$result = $conn->query("select count({$_GET['countWhat']}) as count from {$_GET['count']}");
		json($result->fetch_assoc());
	}

	$api->executeCommand();
	_headers();
}

function make_token($key)
{
	$now = time();
	$token = array(
			"iat" => $now,
			"exp" => $now + (7 * 24 * 60 * 60) // 7 days; 24 hours; 60 mins; 60 secs
			
	);
	$jwt = JWT::encode($token, $key);
	return $jwt;
}

function decode($token = false, $key = false)
{
	if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
		try {
			$decoded = JWT::decode($token, $key, array('HS256'));
			return $decoded;
		} catch (\Exception $e) {
			json([
				'message' => $e->getMessage()
			], 401);
		}
	}
}

function json($data, $status = 200)
{
	http_response_code($status);
	echo json_encode($data);
	exit;
}

function conn()
{
	$conn = new mysqli('localhost', 'root', 'root', 'dbs_start3');
	if ($conn->connect_errno) {
		json([
			'message' => $conn->connect_error
		], 401);
	}
	return $conn;
}

function parsed()
{
	// get the raw POST data
	$rawData = file_get_contents("php://input");
	// this returns null if not valid json
	return json_decode($rawData);
}

function _headers()
{
	// cors
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
	header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
}