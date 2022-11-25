<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';

const JWT_SECRET = "makey1234567";

$app = AppFactory::create();

function getPayload()
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $userid = 1;
    $email = "test@admin.com";
    $pseudo = "XX_Shadow_XX";
    return array(
        'userid' => $userid,
        'email' => $email,
        'pseudo' => $pseudo,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );
}

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello", "/api/login"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

function addHeaders (Response $response) : Response {
    $response = $response
    ->withHeader("Content-Type", "application/json")
    ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200, https://tp05-florian-metz.onrender.com')
    ->withHeader('Access-Control-Allow-Headers', 'Content-Type,  Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader('Access-Control-Expose-Headers', 'Authorization');

    return $response;
}


$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array["nom"] = $args['name'];
    $response->getBody()->write(json_encode($array));
    return $response;
});

$app->post('/api/login', function (Request $request, Response $response, $args) {

    $inputJSON = file_get_contents('php://input');
    $body = json_decode( $inputJSON, TRUE ); //convert JSON into array 
    $token_jwt = JWT::encode(getPayload(), JWT_SECRET, "HS256");
	
	if(!isset($body['login']) || !isset($body['password']) ){
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'You must provide a login and a password');
        $response = $response->withStatus(401);
        $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
	}	
    else if($body['login'] != 'admin' || $body['password'] != 'admin'){
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'wrong login and password');
        $response = $response->withStatus(401);
        $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
	else{
        $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    }
	
    return $response;
});

$app->get('/api/user', function (Request $request, Response $response, $args) {
    $data = array('nom' => 'toto', 'prenom' => 'titi', 'adresse' => '6 rue des fleurs', 'tel' => '0606060607');
    $response->getBody()->write(json_encode($data));

    return $response;
});

#region products

//get all product from ./mock/products.json
$app->get('/api/product', function (Request $request, Response $response, $args) {
    $json = file_get_contents("./mock/products.json");
    $response = addHeaders($response);
    $response->getBody()->write($json);
    return $response;
});

//get product by id from ./mock/products.json
$app->get('/api/product/{id}', function (Request $request, Response $response, $args) {
    $json = file_get_contents("./mock/products.json");
    $array = json_decode($json, true);
    $id = $args ['id'];
    $array = $array[$id];
    $response = addHeaders($response);
    $response->getBody()->write(json_encode ($array));
    return $response;
});

#endregion

$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run();
