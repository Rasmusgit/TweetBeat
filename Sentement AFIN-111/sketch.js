
var afinn;

function preload(){
    afinn = loadJSON('afinn111.json');
}

function setup() {
  // put setup code here
  noCanvas();
  console.log(afinn);

  var txt = select('#txt');
  txt.input(typing);

  function typing(){
    var textInput = txt.value();
    var words = textInput.split(/\W/);
    console.log(words);
    var scoredwords = [];
    var totalScore = 0;
    for(var i = 0; i < words.length; i++){
      var word = words[i].toLowerCase();
      if(afinn.hasOwnProperty(word)){
        var score = afinn[word];
        totalScore += Number(score);
        scoredwords.push(" " + word + ' : ' + score);
      }
    }
    var scoreP = select('#score');
    scoreP.html("Score: " + totalScore);

    var comp = select('#comparative');
    comp.html("comparative: " + totalScore/words.length);

    var wordlist = select('#wordlist');
    wordlist.html(scoredwords);


  }

}

function draw() {
  // put drawing code here
}
