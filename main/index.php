<html>
  <head>

      <!--<script src='build/gibber.lib.js'></script>-->


      <link rel="stylesheet" type="text/css" href="style.css">

      <!--<script language="javascript" src="../resources/p5.min.js"></script>-->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
      <script src="../resources/p5.gibber.js" type="text/javascript" charset="utf-8"></script>
      <script> var emotionText = ""</script>
      <script language="javascript" src="sketch.js"></script>
      <script
      src="https://code.jquery.com/jquery-3.3.1.js"
      integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
      crossorigin="anonymous"></script>
      <script src='emotions.js'></script>


      <script src="../resources/highlight.pack.js"></script>

      <script>hljs.initHighlightingOnLoad();</script>

      <?php

      include "twitteroauth/twitteroauth.php";
      $consumer_key = "vQc9KiSQsFRsK8qtDKqsKYBU0";
      $consumer_secret = "TQo04eR3fQgpA8qHerYax2BZrPRxozqUsJ69ucXLuOoFGEXyRC";
      $access_token = "313774777-8dzowWbTnerkl9XeAbtsuTg0eoDvDY7k02Rk7ADt";
      $access_token_secret = "CBB6xqweEie4U7cSQvjtJEyuCtw2VQgOOip7i5cw8WV7v";

        $twitter = new TwitterOAuth($consumer_key,$consumer_secret,$access_token,$access_token_secret);
        $tweets = $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=from:realdonaldtrump&result_type=recent&count=2');
        //print_r ($tweets);



      ?>





  </head>

  <body>

    <header>
      <p id="logo">Tweet<span>BEAT</span></p>



        <div id="inputarea">

          <input type="text" id="inputText"  class="width-dynamic proba dva"  placeholder="Write message here..." onKeyPress="anslyseEmotion(event)" />
          <button class="button" onClick="post()">Search</button>

        </div>
        <script src='textbox.js'></script>
        <script type="text/javascript">
            function post(){
              var inputText = jQuery('#inputText').val();

              jQuery.post('searchTweets.php', {postsearch: inputText}, 
              function(data){
                var searchResult = jQuery.parseJSON(data);
                var postText = searchResult.statuses[0].text;
                console.log(postText);
              });
            }
        </script>
        

    </header>
    <!--<div id="main">

        <p id="emRes"></p>

    </div>-->


  </body>
<!--
  <script>
    Gibber.init()



    b = TorusKnot({ scale:1 }).spin(.001)



    e = Synth('rhodes').chord.seq( Rndi(0,8,3), 1 )

    </script>-->
</html>
