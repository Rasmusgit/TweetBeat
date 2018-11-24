//function preload() { startGibber() }

var font,
  fontsize = 120,
  oldEmotion = "x"
  
  

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('fonts/TCM_____.TTF');
}


function setup() {
  createCanvas( windowWidth, windowHeight - 192)

  /*drums = EDrums('x*o*x*o-')
  follow = Follow( drums )*/
  a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000) })
  
 

  // Set text characteristics
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw() {
  //background( follow.getValue() * 255 )'
  if(emotionText != oldEmotion){
    oldEmotion = emotionText;
    switch(emotionText) {
      case "anger":
      background("#a91834");
      
      a.play( [240, 480, 320], 1/4 );
          break;
      case "joy":
        background("#F4C925");
        a.play( [440, 880, 1320], 1/8 );
          break;
      case "fear":
        background("#A587BD");
        a.play( [100, 150, 100], 1/4 );
          break;
      case "sadness":
        background("#7ACFEE");
        a.play( [50, 80, 50, 80 ], 1/2 );
          break;
      case "surprise":
        background( "#79B84D");
        a.play( [5, 50, 500,  1000], 1/4 );
          break;
      default:
        background( '#000000' );
  }
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
 

  fill(255);
  text(emotionText, x,  height * .5);
}