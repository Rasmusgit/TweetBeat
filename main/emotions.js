
 var api_key = "a8d67c385959aa0b15540e2fde6c994a";

 var txt;
          var emotions = ["anger", "joy", "fear", "sadness", "surprise"];

          $.noConflict();

          function anslyseEmotion( text){
            
                console.log("text: " + text);
            
                // batch example
                jQuery.post(
                  'https://apiv2.indico.io/emotion/batch',
                  JSON.stringify({
                    'api_key': api_key,
                    'data': [text],
                    'threshold': 0.1
                  })
                ).then(function(res) {
                  var response = res.results[0]; 
                  var greatestEmotion = "";

                  for(i=0;i<emotions.length;i++){
                    if(response.hasOwnProperty(emotions[i])){
                      console.log("We made it!");
                      if(greatestEmotion == "" || response[emotions[i]]>=response[greatestEmotion]){
                        greatestEmotion = emotions[i];
                      }
                    }

                  }
                  console.log(response);
                  console.log(greatestEmotion);

                  switch(greatestEmotion) {
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

                  emotionText = greatestEmotion;
                });

        }



