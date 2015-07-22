<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "831670129-NaHZIcMILT9OlfcQiwgtcKJF0HnY17lkqK5zPrnv",
    'oauth_access_token_secret' => "JIFq2csafG37PmXqYjW24LwzO7WU0itssXSEJw167en32",
    'consumer_key' => "sXKyjw0R1W2GDp2QOsBRg4idy",
    'consumer_secret' => "Dbj97ttjGbq3EPgr2dNRnrYHNrik5tu7gI2Qwo29vb5C3zEobV"
);

$url = "https://api.twitter.com/1.1/search/tweets.json";
//$url = "https://api.twitter.com/1.1/geo/search.json";

$requestMethod = "GET";
 
$getfield = '?q=%20geocode=-180,-90,180,90&count=100';
 
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
?>