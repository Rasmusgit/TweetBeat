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
         var diffSeconds1 = 0;
         var timer;
         var inProgress = false;

         
	 var postEmotion = "";
    var statusesData = [];
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

          <input type="search" id="inputText"  class="width-dynamic proba dva" placeholder="Search #hashtag or @account" size="50" autofocus/>
          <button class="button" id="buttonID" onClick="post()">Search</button>

        </div>
        <script src='textbox.js'></script>
	
        <script type="text/javascript">

	//[ENTER] press to search
	document.getElementById("inputText").addEventListener("keyup", function(event) {
	     event.preventDefault();
	     if (event.keyCode === 13) {
		 document.getElementById("buttonID").click();
	    }
	});


            function post(){
              var inputText = jQuery('#inputText').val();
              num = 0;
              statusesData = [];
              inProgress = false;

              jQuery.post('searchTweets.php', {postsearch: inputText}, 
              function(data){
                var searchResult = jQuery.parseJSON(data);
                returnJson=searchResult
                console.log(returnJson);
               
                length = returnJson.statuses.length;
                //console.log(length);
                
                var postText = returnJson.statuses[0].text;
                tweetText = postText;

                var i;
                
                for(i = 0; i < returnJson.statuses.length; i++){
                    //statusesData.push([anslyseEmotion(returnJson.statuses[i].text),returnJson.statuses[i].text]);
                    anslyseEmotion(returnJson.statuses[i],i);
                }   
		

              });

              
            }

        </script>

    </header>
    <div id="main">
        <p id="emRes"></p>
        <input type="range" min="0" max="100" value="0" class="slider" id="myRange">
        <p>Value: <span id="demo"></span></p>    
    </div>
    <div id="bottom">
        
    </div>

  </body>

  <script src='sonification.js'></script>


</html>



