var placeholder = document.getElementById("placeholder-text");
var placeholdername = document.getElementById("placeholdername");
var user = document.getElementById("username");
var profilepic = document.getElementById("profilepic");
var tweetbox = document.getElementById("tweetbox");
var myRange = document.getElementById("myRange");
var diff;
var hej;
var tweetTimer;

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
    
        var timeDiffArray = [];
        var lagestDiff = 0;
        var silentTime = 5000;
        var y = 0;
        var totalDiff = 0;


        for(n = 0; n < statusesData.length-1; n++){

            currentDate = statusesData[n].postedDate;
            nextDate = statusesData[n+1].postedDate;
            timeDiff1 = Math.abs(nextDate -  currentDate);
            diffSeconds1 = timeDiff1;

            if(lagestDiff < diffSeconds1){
                lagestDiff = diffSeconds1;
            }

            timeDiffArray[n] = diffSeconds1;
            

        }
        
        if(lagestDiff > silentTime){

            y = lagestDiff / silentTime;
            console.log("y: " + y);

            for(n = 0; n < timeDiffArray.length; n++){

                timeDiffArray[n] = timeDiffArray[n] / y;
                totalDiff = totalDiff + timeDiffArray[n];
    
            }

        } else if(lagestDiff < silentTime){

            y = silentTime/lagestDiff;
            console.log("y: " + y);

            for(n = 0; n < timeDiffArray.length; n++){

                timeDiffArray[n] = timeDiffArray[n] * y;
                totalDiff = totalDiff + timeDiffArray[n];
    
            }
        }

        
        
    
        printTweetData();
    
            //  set your counter to 1
    
        
            console.log("Total diff: " + totalDiff);
            diff = (10000/(totalDiff/1000))/100;
            slider.value = 0;
            slider.max = 10000;
            hej = 0;
            console.log("Slider max: " + slider.max);
           
        
        var i = 1; 
        function myLoop () {	       //  create a loop function
           
    
           timeoutLength=timeDiffArray[i];

           
           //console.log("timeoutLength (ms): " + timeoutLength);
           setTimeout(function () {    //  call a 3s setTimeout when the loop is called

            if(i == 1){
                tweetTimer = setInterval(function(){
                    console.log("diff: " + diff)
                    hej = parseInt(slider.value) + diff;
                    slider.value = hej ;
                    console.log("slider value : " + slider.value);
                    //output.innerHTML = slider.value;
                }, (10));
              }

              displayTweet(statusesData[i-1], i-1);
              playTweet(statusesData[i-1]);         //  your code here
              console.log("index: " + (i-1));

              
              
              i++;                     //  increment the counter
              console.log("increasing counter...");
              if (i < returnJson.statuses.length) {            //  if the counter < 10, call the loop function
    
                myLoop();             //  ..  again which will trigger another
                
              } else{
                clearInterval(tweetTimer);
              }                       //  ..  setTimeout()
           }, timeoutLength);
        }
    
        myLoop();	
        
    }
    }
    
