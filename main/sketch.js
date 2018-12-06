//function preload() { startGibber() }

var font,
  fontsize = 120,
  oldEmotion = "x"

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
  if(emotionText != oldEmotion){
      oldEmotion = emotionText;
      waveOn = false;
      switch(emotionText) {
        case "anger":
        background("#a91834");

        //a.play( [240, 480, 320], 1/4 );
        f = ["f3", "a3", "c3"];
        gm = ["g3","bb3", "d3"];
        //a.play(am);
        a.chord.seq( [f,gm, am], 1);
            break;
        case "joy":
          background("#F4C925");
          //a.play( [440, 880, 1320], 1/8 );
          e = ["e3", "g#3", "b3"];
          //a.play(e);
          a.chord.seq( [e], 1);
            break;
        case "fear":
          background("#A587BD");
          //a.play( [100, 150, 100], 1/4 );
          dsm = ["d#", "f#", "a#"];
          a.chord.seq( [dsm], 1);
	  a.attack = returnJson.statuses[0].favorite_count;
            break;
        case "sadness":
          background("#7ACFEE");
          //a.play( [50, 80, 50, 80 ], 1/2 );
          
          //a.play(am);
          a.chord.seq( [am], 1);
            break;
        case "surprise":
          background( "#79B84D");
          //a.play( [5, 50, 500,  1000], 1/4 );
            bb = ["bb","d", "f"];
            a.chord.seq([bb], 1);
            break;
        default:
          background("#ffffff");
          waveOn = true;


      }


  }

  if(waveOn == true){
    //drawWave();
    //drawBase();

   
  }

  // Align the text in the center
  // and run drawWords() in the middle of the canvas
  textAlign(CENTER);
  drawWords( width * .5 );


}

function drawWave(){


  fill(0);
  // We are going to draw a polygon out of the wave points
  beginShape();

  //var xoff = 0;       // Option #1: 2D Noise
  var xoff = yoff; // Option #2: 1D Noise

  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 40) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, 200,follow.getValue*100);

    // Option #2: 1D Noise
     //var y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function drawWords(x) {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position

  noStroke();
  fill(255);
  text(emotionText, x,  height * .5);
}

function setupBase(){
  drums = EDrums( 'x*o*x*o-' )

  sampler = Sampler().record( drums, 1 )
    .note.seq( [.25,.5,1,2].rnd(), [1/4,1/8,1/2].rnd() )
    .fx.add( Delay(1/64))
    .pan.seq( Rndf(-1,1) )

  bass = Mono('bass')
    .note.seq( [0,7], 1/8 )

  Gibber.scale.root.seq( ['c4','eb4'], 1 )

  // follow Gibber's Master bus output
  follow = Follow( Gibber.Master, 1024 )

  background( '#000')
  noFill()
  stroke('#064D67')
}

function drawBase(){
  var x = mouseX / windowWidth,
     y = mouseY / windowHeight,
     ww2 = windowWidth / 2,
     wh2 = windowHeight / 2,
     value = follow.getValue(),
     radius = ( ww2 > wh2 ? wh2 : ww2 ) * value

 bass.resonance = (1 - x) * 5
 bass.cutoff = (1 - y) / 2

 sampler.fx[0].feedback = x < .99 ? x : .99

 strokeWeight( value * 50 )
 background( 64,64,64,10 )
 ellipse( ww2, wh2, radius, radius )
}
