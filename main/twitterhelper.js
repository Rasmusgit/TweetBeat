var placeholder = document.getElementById("placeholder-text");
var placeholdername = document.getElementById("placeholdername");
var user = document.getElementById("username");
var profilepic = document.getElementById("profilepic");
var tweetbox = document.getElementById("tweetbox");
var myRange = document.getElementById("myRange");

function displayTweet(tweeterStatuses, n){
    console.log("place text: " + tweeterStatuses.text);
    placeholder.innerHTML = tweeterStatuses.text;
    console.log("place name: " + tweeterStatuses.name);
    placeholdername.innerHTML = tweeterStatuses.name;
    user.innerHTML = "@" + tweeterStatuses.user;
    profilepic.style.backgroundImage = "url('"+ tweeterStatuses.profileimg +"')";
    tweetbox.style.display = "block";
    myRange.style.display = "block";

}


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

function statusesAnalyzed(){
	for(i = 0; i < returnJson.statuses.length; i++){
		console.log("checking index :" + i);
		if(statusesData[i].postedDate=='undefined'){
			console.log("index: " + i + ", has postedDate: " + statusesData[i].postedDate);
			return false;
		}
	}
	console.log("all tweets were analyzed!");
	return true;
}

function tweetAnalyzed(o,index){
    console.log("analyzed, statuses.length:" + statusesData.length);
    statusesData[index]=o;

    if(statusesAnalyzed()){
    

        var firstDate = statusesData[0].postedDate;
        var lastDate = statusesData[statusesData.length-1].postedDate;
        var timeDiff1 = Math.abs(lastDate -  firstDate);
		var diffHours1 = Math.ceil(timeDiff1 / (60*60*1000)); 
        diffSeconds1 = timeDiff1 / 1000;
        diff = Math.round(diffSeconds1/1000);
        slider.value = 0;
        slider.max = diffSeconds1/10;
        hej = 0;
        console.log("Slider max: " + slider.max);
        setInterval(function(){
            
            //console.log("diff: " + diff)
            hej = parseInt(slider.value) + diff;
            slider.value = hej ;
            //console.log("slider value : " + slider.value);
            //output.innerHTML = slider.value;
        }, 1000);
    
    
        printTweetData();
    
        var i = 1;                     //  set your counter to 1
    
           var nextDate = statusesData[1].postedDate;
           var thisDate = statusesData[0].postedDate;
           displayTweet(statusesData[i-1], i-1);
           playTweet(statusesData[i-1]);
           
          
          
           i++;

    
        function myLoop () {	       //  create a loop function
           
    
            var timeDiff = Math.abs(nextDate -  thisDate);
            var diffHours = Math.ceil(timeDiff / (60*60*1000)); 
            var diffSeconds = timeDiff / 1000;
    
           var timeoutLength=diffSeconds/10;

           
           //console.log("timeoutLength (ms): " + timeoutLength);
           setTimeout(function () {    //  call a 3s setTimeout when the loop is called
              displayTweet(statusesData[i-1], i-1);
              playTweet(statusesData[i-1]);         //  your code here
              console.log("index: " + (i-1));
              
              i++;                     //  increment the counter
              console.log("increasing counter...");
              if (i < returnJson.statuses.length) {            //  if the counter < 10, call the loop function
    
              nextDate = statusesData[i].postedDate;
              thisDate = statusesData[i-1].postedDate;
             myLoop();             //  ..  again which will trigger another 
             
             console.log("thisDate: " + thisDate);
             console.log("nextDate: " + nextDate);
                
              } else{
                //clearInterval(timer);
              }                       //  ..  setTimeout()
           }, timeoutLength);
        }
    
        myLoop();	
        
    }
    }
    
