<html>
  <head>

      <link rel="stylesheet" type="text/css" href="style.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
      <script src="../resources/p5.gibber.js" type="text/javascript" charset="utf-8"></script>
      <script> var emotionText = ""</script>
      <script language="javascript" src="sketch.js"></script>
      <script
      src="https://code.jquery.com/jquery-3.3.1.js"
      integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
      crossorigin="anonymous"></script>
      <script src='emotions.js'></script>


      <script src="../resources/highlight.pack.js"></script>

      <script>hljs.initHighlightingOnLoad();</script>


  </head>

  <body>

    <header>
      <p id="logo">Tweet<span>BEAT</span></p>



        <div id="inputarea">

          <input type="text" id="inputText"  class="width-dynamic proba dva"  placeholder="Write message here..." />
          <button class="button" onClick="post()">Search</button>

        </div>
        <script src='textbox.js'></script>
        <script type="text/javascript">
            function post(){
              var inputText = jQuery('#inputText').val();

              jQuery.post('searchTweets.php', {postsearch: inputText}, 
              function(data){
                var searchResult = jQuery.parseJSON(data);
                var postText = searchResult.statuses[0].text;
                console.log(postText);
                anslyseEmotion(postText);
              });
            }
        </script>
        

    </header>


  </body>

</html>
