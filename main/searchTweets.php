<?php
include "twitteroauth/twitteroauth.php";
$consumer_key = "vQc9KiSQsFRsK8qtDKqsKYBU0";
$consumer_secret = "TQo04eR3fQgpA8qHerYax2BZrPRxozqUsJ69ucXLuOoFGEXyRC";
$access_token = "313774777-8dzowWbTnerkl9XeAbtsuTg0eoDvDY7k02Rk7ADt";
$access_token_secret = "CBB6xqweEie4U7cSQvjtJEyuCtw2VQgOOip7i5cw8WV7v";
$twitter = new TwitterOAuth($consumer_key,$consumer_secret,$access_token,$access_token_secret);

$search = $_POST['postsearch'];


$tweets = $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=from:'. $search .'&result_type=recent');
$tweets = json_encode($tweets);
echo $tweets;
//print_r ($tweets);
?>
