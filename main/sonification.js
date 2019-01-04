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


