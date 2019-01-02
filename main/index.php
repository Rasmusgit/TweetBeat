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




		var i;
		
		for(i = 0; i < returnJson.statuses.length; i++){
			//statusesData.push([anslyseEmotion(returnJson.statuses[i].text),returnJson.statuses[i].text]);
			anslyseEmotion(returnJson.statuses[i],i);
		}   
		
/*    
		for(j = 0; j < statusesData.length; j++){
			setTimeout(function() {
				playTweet(statusesData[j]);
			}, 1000);
		}     

		var i = 1;                     //  set your counter to 1

		function myLoop () {           //  create a loop function
		   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
		      playTweet(statusesData[i]);         //  your code here
		      i++;                     //  increment the counter
		      if (i < 10) {            //  if the counter < 10, call the loop function
			 myLoop();             //  ..  again which will trigger another 
		      }                        //  ..  setTimeout()
		   }, 3000)
		}

		myLoop();  */

                  
                  //callEmotion(length);
                  //noteTimer = setInterval(hitItMaestro, 5000);
                  

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
    
    a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(200), decay:ms(200), pulsewidth:0.1 });

v = Vibrato();
r = Reverb({roomsize:0.995,damping:0.5});
a.glide=0.5;
a.fx.add( v,r )
	
	function printTweetData(){

		for(i = 0; i < returnJson.statuses.length; i++){
			
			console.log("index: " + i + "" + statusesData[i].postedDate);
		}   
		statusesData=statusesData.reverse();
		console.log("reversed");
		for(i = 0; i < returnJson.statuses.length; i++){
			
			console.log("index: " + i + "" + statusesData[i].postedDate);
		}   
	}
    function tweetAnalyzed(o,index){
	console.log("analyzed, statuses.length:" + statusesData.length);
	statusesData[index]=o;
	if(statusesData.length==returnJson.statuses.length){
		printTweetData();

		var i = 1;                     //  set your counter to 1

		   var nextDate = statusesData[1].postedDate;
		   var thisDate = statusesData[0].postedDate;

		function myLoop () {	       //  create a loop function
		   

		   var timeDiff = Math.abs(nextDate -  thisDate);
		   var diffHours = Math.ceil(timeDiff / (60*60*1000)); 
		   var diffSeconds = timeDiff / 1000;
		   console.log("diffSeconds: " + diffSeconds);


		   var timeoutLength=diffSeconds/10;
		   console.log("timeoutLength (ms): " + timeoutLength);
		   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
		      playTweet(statusesData[i-1]);         //  your code here
		      i++;                     //  increment the counter
		      console.log("increasing counter...");
		      if (i < returnJson.statuses.length) {            //  if the counter < 10, call the loop function

 			 nextDate = statusesData[i].postedDate;
		   	 thisDate = statusesData[i-1].postedDate;
			 myLoop();             //  ..  again which will trigger another 
			 console.log("index: " + i);
		   console.log("thisDate: " + thisDate);
		   console.log("nextDate: " + nextDate);
		      }                        //  ..  setTimeout()
		   }, timeoutLength);
		}

		myLoop();	
		
	}
    }

    function playTweet(o){
	// a.note([o.text]);
	console.log("o.text :" + o.text);
	console.log("o.emotion :" + o.emotion);
	console.log("o.favorites :" + o.favorites);
	if(o.favorites==0){
		var num = 0.5;
	}else {
		var num = (1-(1/o.favorites));
	}
	var amplitude = num.toFixed(5);
	console.log("amplitude :" + amplitude);

	switch(o.emotion) {
		case "anger":
		    a.note([175],amplitude);
		    break;
		case "joy":
		    a.note([261],amplitude);
		    break;
		case "fear":
		    a.note([699],amplitude);
		    break;
		case "sadness":
		    a.note([196],amplitude);
		    break;
		case "surprise":
		    a.note([329],amplitude);
		    break;
		default:

            } 
    }

    function hitItMaestro(){
      console.log("Maestro: " + num);
      a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000), pulsewidth:0.25 })
      console.log(returnJson.statuses[num].text)
      postEmotion=anslyseEmotion(returnJson.statuses[num].text);
      
      //a.note([329])
      

      retweetVal = returnJson.statuses[0].retweet_count/ 100000;

      console.log(retweetVal);

      a.attack = returnJson.statuses[0].favorite_count;


      //a.note([175]);

      console.log("postEmotion: " + postEmotion);
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



