Gibber.init() // REQUIRED!

var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
//output.innerHTML = slider.value;

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





//var amplitude = 1 - (1/o.followers);
var amplitude = (((1 - 0.1)*(o.followers - minFollowers)) / (maxFollowers - minFollowers)) + 0.1;
console.log("Followers: " + o.followers + " / Amp: " + amplitude);

var attack = o.confidence.toFixed(5)*44100;
var decay = attack;


retweetVal = (((0.8)*(o.retweet_count - minRetweets)) / (maxRetweets - minRetweets));
console.log("Retweets: " + o.retweet_count + " / Reverb: " + retweetVal);

r = Reverb({ roomSize: Add( retweetVal, Sine( .05, .245 )._ ) });
//a.fx.add( r );



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


