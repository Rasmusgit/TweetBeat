
 var api_key = "a8d67c385959aa0b15540e2fde6c994a";

 var txt;
 var len;
          var emotions = ["anger", "joy", "fear", "sadness", "surprise"];
          var timeConstant = 5000;
          var delta = 0;

          $.noConflict();

          function anslyseEmotion(text, n, nLength){
            
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
                  emotionArray[n] = greatestEmotion;
                  responses++;
                  
                  if(responses >= nLength){
                    
                    //noteTimer = setInterval(hitItMaestro, 5000);
                    hitItMaestro(num);
                    num--;
                    console.log("delta: " + delta);
                    console.log("time: " + timeConstant*delta);
                    var delta = getDeltaDate(dateArray[num-1],dateArray[num]);
                    setTimeout(hitItMaestro(num), (timeConstant*delta));
                    //repeatTimer(nLength);

                  }
                });


                function repeatTimer(){
                    var delta = 0;
                    console.log("num: " + num);
                    
                    
                    if(num != 0){
                      delta = getDeltaDate(dateArray[num-1],dateArray[num]);
                      console.log("delta: " + delta);
                      console.log("time: " + timeConstant*delta);
                      hitItMaestro(num);
                      num--;
                      setTimeout(repeatTimer(), (timeConstant*delta));
                    }
                    

                   
                }

                function getDeltaDate(date1, date2){
                    var one_minute=1000*60;

                   // Convert both dates to milliseconds
                    var date1_ms = date1.getTime();
                    var date2_ms = date2.getTime();

                    // Calculate the difference in milliseconds
                    var difference_ms = date1_ms - date2_ms;

                    // Convert back to minutes and return
                    return Math.round(difference_ms/one_minute);
                }

        }



