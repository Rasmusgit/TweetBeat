<html>
  <head>

      <link rel="stylesheet" type="text/css" href="style.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
      <script src="../resources/p5.gibber.js" type="text/javascript" charset="utf-8"></script>
      <script src='build/gibber.lib.js'></script>
      <script> var emotionText = "";
         var returnJson = new Object();
         var tweetText = "";   
         var num = 0;
         var noteTimer = null;
         var length;
      </script>
      <!--<script language="javascript" src="sketch.js"></script>-->
      <script
      src="https://code.jquery.com/jquery-3.3.1.js"
      integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
      crossorigin="anonymous"></script>
      <script src='emotions.js'></script>


      <script src="../resources/highlight.pack.js"></script>

      <script>hljs.initHighlightingOnLoad();</script>


  </head>

  <body>

    <header>
      <p id="logo">Tweet<span>BEAT</span></p>



        <div id="inputarea">

          <input type="search" id="inputText"  class="width-dynamic proba dva"  placeholder="Write message here..." />
          <button class="button" onClick="post()">Search</button>

        </div>
        <script src='textbox.js'></script>
        <script type="text/javascript">
            function post(){
              var inputText = jQuery('#inputText').val();
              num = 0;

              jQuery.post('searchTweets.php', {postsearch: inputText}, 
              function(data){
                var searchResult = jQuery.parseJSON(data);
                returnJson=searchResult
                console.log(returnJson);
               
                length = returnJson.statuses.length;
                console.log(length);
                
                  var postText = returnJson.statuses[0].text;
                  tweetText = postText;
                  
                  //callEmotion(length);
                  noteTimer = setInterval(hitItMaestro, 5000);
                  
                
                
              });

              
            }

            function callEmotion(len){

              
              if(num < len){
                
                anslyseEmotion(returnJson.statuses[num].text);
                num++;
                setTimeout(callEmotion(len), 10000);
                
              }

            }
        </script>
        

    </header>


  </body>

  <script>
    Gibber.init() // REQUIRED!
    
    function hitItMaestro(){
      console.log("Maestro: " + num);
      a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000), pulsewidth:0.25 })
      console.log(anslyseEmotion(returnJson.statuses[num].text));
      
      //a.note([329])
      


      retweetVal = returnJson.statuses[0].retweet_count/ 100000;

      console.log(retweetVal);

      a.attack = returnJson.statuses[0].favorite_count;

      r = Reverb({ roomSize: Add( retweetVal, Sine( .05, .245 )._ ) });

      a.fx.add( r );

      //a.note([175]);

      console.log("postemotion: " + postEmotion);
      switch(postEmotion) {
        case "anger":
            a.note([175]);
            break;
        case "joy":
            a.note([260]);
            break;
        case "fear":
            a.note([699]);
            break;
        case "sadness":
            a.note([196]);
            break;
        case "surprise":
            a.note([329]);
            break;
        default:

            } 

      num++;
      if(num == length){
        clearInterval(noteTimer);
      }
    }
</script>

</html>



