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
              statusesData = [];

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


  <script>
    Gibber.init() // REQUIRED!

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    /*slider.oninput = function() {
    output.innerHTML = this.value;
}*/
    
    //a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(200), decay:ms(200), pulsewidth:0.1 });
    //a = Mono({ waveform:'Saw', filterMult:0, resonance:4, detune2:.05, detune3:-.05 })
    //a = Pluck();
    a = FM({ maxVoices:4, index:5, cmRatio:1 });
    //v = Vibrato();
    //r = Reverb({roomsize:0.995,damping:0.5});
    //a.glide=0.5;
    //a.fx.add( v,r )
	
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

        var firstDate = statusesData[0].postedDate;
        var lastDate = statusesData[statusesData.length-1].postedDate;
        var timeDiff1 = Math.abs(lastDate -  firstDate);
		var diffHours1 = Math.ceil(timeDiff1 / (60*60*1000)); 
        diffSeconds1 = timeDiff1 / 1000;
        slider.value = 0;
        slider.max = diffSeconds1;
        hej = 0;
        console.log("Slider max: " + slider.max);
        setInterval(function(){
            var diff = Math.round(diffSeconds1/1000);
            console.log("diff: " + diff)
            hej = slider.value + diff;
            slider.value = hej ;
            console.log("slider value : " + slider.value);
            output.innerHTML = slider.value;
        }, 1000);


		printTweetData();

		var i = 1;                     //  set your counter to 1

		   var nextDate = statusesData[1].postedDate;
		   var thisDate = statusesData[0].postedDate;

		function myLoop () {	       //  create a loop function
		   

		   var timeDiff = Math.abs(nextDate -  thisDate);
		   var diffHours = Math.ceil(timeDiff / (60*60*1000)); 
		   var diffSeconds = timeDiff / 1000;
           console.log("diffSeconds: " + diffSeconds);
          


           var timeoutLength=diffSeconds;
           
		   console.log("timeoutLength (ms): " + timeoutLength);
		   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
              playTweet(statusesData[i-1]);         //  your code here
              
              /*hej += timeoutLength;
              console.log("hej: " + hej);
              slider.value = hej;*/
              
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
	//console.log("o.text :" + o.text);
	//console.log("o.emotion :" + o.emotion);
	//console.log("o.favorites :" + o.favorites);

    if(o.followers <= 300){
        num = 0.1;
    }else if(o.followers <= 1000){
        num = 0.3;
    }else{
        num = 1;
    }
    
    //console.log("followers: "+ o.followers);
    //console.log("amp: "+ num);

	var amplitude = num.toFixed(5);
    //console.log("amplitude :" + amplitude);
    //console.log("confidence: " + o.confidence.toFixed(5));
    var attack = o.confidence.toFixed(5)*44100;
    var decay = attack;

    retweetVal = o.retweet_count/ 100000;

    console.log("retweetVal: " + retweetVal);


    r = Reverb({ roomSize: Add( retweetVal, Sine( .05, .245 )._ ) });
     //a.fx.add( r );
    switch(o.emotion) {

        case "anger":
        
        jQuery(document.body).css("background", "#a91834");
        

            break;
        case "joy":
        jQuery(document.body).css("background", "#F4C925");
            break;
        case "fear":
        jQuery(document.body).css("background", "#A587BD");
            break;
        case "sadness":
        jQuery(document.body).css("background", "#7ACFEE");
            break;
        case "surprise":
        jQuery(document.body).css("background", "#79B84D");
            break;
        default:

    }
    var textEmotion = document.getElementById("emRes");
    textEmotion.innerHTML = o.emotion;
   

    //console.log("attack: " + attack);
    //console.log("decay: " +  decay);
    a.attack = attack;
    a.decay = decay;
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

var input = document.getElementById("inputText");
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    post();
  }
});

</script>

</html>



