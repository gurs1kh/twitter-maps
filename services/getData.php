<?php
ini_set('display_errors', 1);
require_once('twitter-api-php/TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'consumer_key' => "sXKyjw0R1W2GDp2QOsBRg4idy",
    'consumer_secret' => "Dbj97ttjGbq3EPgr2dNRnrYHNrik5tu7gI2Qwo29vb5C3zEobV",
    'oauth_access_token' => "831670129-NaHZIcMILT9OlfcQiwgtcKJF0HnY17lkqK5zPrnv",
    'oauth_access_token_secret' => "JIFq2csafG37PmXqYjW24LwzO7WU0itssXSEJw167en32"
);

$q = $_GET['q'];
$lang = $_GET['lang'];
$geocode = $_GET["geocode"];
$until = $_GET["until"];
if (!isset($geocode)) $geocode = "0,0,4000mi";

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";
$getfield = "?q=$q&geocode=$geocode&lang=$lang&until=$until&count=100";
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
?>