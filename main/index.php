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
         var responses = 0;
         var emotionArray = [];
         var dateArray = [];
         var year,
             month,
             day,
             hours,
             minutes,
             seconds;
         
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
                  var lengthRes = returnJson.statuses.length;
                  num = lengthRes-1;
                  responses = 0;
                  emotionArray = [];
                  for(i = 0; i < lengthRes; i++){
                    var emoText = returnJson.statuses[i].text;
                    var dateTime = new Date(returnJson.statuses[i].created_at);
                    //console.log("before: " + returnJson.statuses[i].created_at);
                    console.log("this: " + dateTime);
                    dateArray[i] = dateTime;

                    anslyseEmotion(emoText, i, lengthRes);
                  }

              });


            }


            function getMonth(str){
              console.log("String: " + str);
              var mon = 1;

              switch(str){
                case "Jan":
                  mon = 1;
                  break;
                case "Feb":
                  mon = 2;
                  break;
                case "Mar":
                  mon = 3;
                  break;
                case "Apr":
                  mon = 4;
                  break;
                case "May":
                  mon = 5;
                  break;
                case "Jun":
                  mon = 6;
                  break;
                case "Jul":
                  mon = 7;
                  break
                case "Aug":
                  mon = 8;
                  break;
                case "Sep":
                  mon = 9;
                  break;
                case "Oct":
                  mon = 10;
                  break;
                case "Nov":
                  mon = 11;
                  break;
                case "Dec":
                  mon = 12;
                  break;
              }

              return mon;

            }


        </script>


    </header>


  </body>

  <script>
    Gibber.init() // REQUIRED!


    function hitItMaestro(nr){
      console.log("Maestro: " + nr);
      a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000), pulsewidth:0.25 })

      var currentEmotion = emotionArray[nr];

      retweetVal = returnJson.statuses[nr].retweet_count/ 100000;

      console.log(retweetVal);

      a.attack = returnJson.statuses[nr].favorite_count;

      r = Reverb({ roomSize: Add( retweetVal, Sine( .05, .245 )._ ) });

      a.fx.add( r );


      switch(currentEmotion) {
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

      
      
      /*if(num == length){
        clearInterval(noteTimer);
      }*/
    }



</script>

</html>
