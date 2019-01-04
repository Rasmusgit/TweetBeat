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
        diff = Math.round(diffSeconds1/10000);
        hej = 0;
        console.log("Slider max: " + slider.max);
        setInterval(function(){
            
            console.log("diff: " + diff)
            hej = parseInt(slider.value) + diff;
            console.log("hej : " + hej);
            slider.value = hej ;
            console.log("slider value : " + slider.value);
            output.innerHTML = slider.value;
        }, 100);
    
    
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
    