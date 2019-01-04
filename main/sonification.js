Gibber.init() // REQUIRED!

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

/*slider.oninput = function() {
output.innerHTML = this.value;
}*/

//a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(200), decay:ms(200), pulsewidth:0.1 });
//a = Mono({ waveform:'Saw', filterMult:0, resonance:4, detune2:.05, detune3:-.05 })
a = Pluck();
//a = FM({ maxVoices:4, index:5, cmRatio:1 });
//v = Vibrato();
//r = Reverb({roomsize:0.995,damping:0.5});
//a.glide=0.5;
//a.fx.add( v,r )

//a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(300), decay:ms(300), pulsewidth:0.5 });
b = Pluck();
k = Kick();
sn = Snare();
hat = Hat();
tom = Tom();
cow = Cowbell();
cla = Clave();
con = Conga();


dis = Distortion();
l = LPF();
rm = RingMod();
s = Schizo();
f = Flanger();
ch = Chorus();
c = Crush();
v = Vibrato();
r = Reverb({roomsize:0.995,damping:0.5});
t = Tremolo();
g = Gain();
//a.glide=0.5;

//a.fx.add(dis);
//b.fx.add(dis);

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

function tweetAnalyzed(){
    console.log("analyzed, statuses.length:" + statusesData.length);
    console.log("pq statuses.length:" + statusesData.length);
    console.log("pq returnJson.length:" + returnJson.statuses.length);

    
        printTweetData();
        

        var firstDate = statusesData[0].postedDate;
        var lastDate = statusesData[statusesData.length-1].postedDate;
        var timeDiff1 = Math.abs(lastDate -  firstDate);
		var diffHours1 = Math.ceil(timeDiff1 / (60*60*1000)); 
        diffSeconds1 = timeDiff1 / 1000;
        diff = Math.round(diffSeconds1/1000);
        console.log("diff1: " + diffSeconds1);
        console.log("diff: " + diff);
        slider.value = 0;
        slider.max = diffSeconds1;

        hej = 0;
        console.log("Slider max: " + slider.max);
        setInterval(function(){
            hej = hej + diff;
            slider.value = hej ;
            //console.log("slider value : " + slider.value);
            output.innerHTML = slider.value;
        }, 1000);
    
        var i = 1;                     //  set your counter to 1
    
           var nextDate = statusesData[1].postedDate;
           var thisDate = statusesData[0].postedDate;
    
        function myLoop () {	       //  create a loop function
           
    
            var timeDiff = Math.abs(nextDate -  thisDate);
            var diffHours = Math.ceil(timeDiff / (60*60*1000)); 
            var diffSeconds = timeDiff / 1000;
    
           var timeoutLength=diffSeconds;
           
           //console.log("timeoutLength (ms): " + timeoutLength);
           setTimeout(function () {    //  call a 3s setTimeout when the loop is called
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


function playTweet(o){

if(o.followers <= 300){
    num = 0.1;
}else if(o.followers <= 1000){
    num = 0.3;
}else{
    num = 1;
}


var amplitude = num.toFixed(5);
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


