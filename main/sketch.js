//function preload() { startGibber() }

var font,
  fontsize = 120,
  oldEmotion = "",
  oldTweetText = "x";

  var yoff = 0.0;
  var waveOn = false;
  

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('fonts/TCM_____.TTF');
}


function setup() {
  createCanvas( windowWidth, windowHeight - 192)

  //setupBase();

  a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000), pulsewidth:0.25  })

  //happySynth = Synth({maxVoices:4, waveform:'PWM', attack:ms(50), decay:ms(500), frequency:260})

  //sadSynth = Synth({maxVoices:4, waveform:'Triangle', attack:ms(2000), decay:ms(1000), frequency:196})



  //angrySynth = Synth({maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000), frequency:175})

  //fearSynth = Synth({maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000), frequency:699})

  //surpriseSynth = Synth({maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000), frequency:329})
  //drums = EDrums('x*o*x*o-')
  //follow = Follow( drums )
 
  // Set text characteristics
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  am = ["a3", "c3", "e3"];

}

function draw() {
  //background( follow.getValue() * 255 )'

  if(oldTweetText != "x" && tweetText != oldTweetText || emotionText != oldEmotion){
      
      oldEmotion = emotionText;
      oldTweetText = tweetText;
      waveOn = false;
      switch(emotionText) {
        case "anger":
        background("#a91834");

        //a.play( [240, 480, 320], 1/4 );
        f = ["f3", "a3", "c3"];
        gm = ["g3","bb3", "d3"];
        //a.play(am);
        //a.chord.seq( [f,gm, am], 1);
        a.note([175]);

            break;
        case "joy":
          background("#F4C925");
            //a.play( [440, 880, 1320], 1/8 );
            e = ["e3", "g#3", "b3"];
            //a.play(e);
            //a.chord.seq( [e], 1);
            //happySynth.note([240]);
            a.note([260]);
            
            break;
        case "fear":
          background("#A587BD");
          //a.play( [100, 150, 100], 1/4 );
          dsm = ["d#", "f#", "a#"];
          //a.chord.seq( [dsm], 1);
          a.note([699]);
          
            break;
        case "sadness":
          background("#7ACFEE");
          //a.play( [50, 80, 50, 80 ], 1/2 );
          
          
          //a.chord.seq( [am], 1);
          a.note([196]);
        
            break;
        case "surprise":
          background( "#79B84D");
          //a.play( [5, 50, 500,  1000], 1/4 );
            bb = ["bb","d", "f"];
            //a.chord.seq([bb], 1);
            a.note([329]);
            break;
        default:
          background("#ffffff");
          waveOn = true;
      }

      retweetVal = returnJson.statuses[0].retweet_count/ 100000;

      console.log(retweetVal);

      a.attack = returnJson.statuses[0].favorite_count;

      r = Reverb({ roomSize: Add( retweetVal, Sine( .05, .245 )._ ) });
     
      a.fx.add( r );

  }


  // Align the text in the center
  // and run drawWords() in the middle of the canvas
  textAlign(CENTER);
  drawWords( width * .5 );


}


function drawWords(x) {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position

  noStroke();
  fill(255);
  text(emotionText, x,  height * .5);
}