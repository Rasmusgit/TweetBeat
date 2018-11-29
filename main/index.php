<html>
  <head>

      <!--<script src='build/gibber.lib.js'></script>-->


      <link rel="stylesheet" type="text/css" href="style.css">

      <!--<script language="javascript" src="../resources/p5.min.js"></script>-->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
      <script src="../resources/p5.gibber.js" type="text/javascript" charset="utf-8"></script>
      <script> var emotionText = ""</script>
      <script language="javascript" src="sketch.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
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
      $tweets = $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=from:sisselanb&result_type=recent&count=2');


      //print_r ($tweets);
      ?>





  </head>

  <body>

    <header>
      <p id="logo">Tweet<span>BEAT</span></p>

      <div id="inputarea">
          <input type="text" id="inputText"  class="width-dynamic proba dva"  placeholder="Write message here..." />

        </div>
        <script src='textbox.js'></script>
        <script>
            var simple = <?php echo json_encode($tweets) ?>;
            simple = simple.statuses[1].text;
            console.log(simple);
              var input = document.getElementById("inputText");
              input.value = simple;
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
