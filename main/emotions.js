
 var api_key = "b2e45ada49f90388b1bee5d3b395f956";

 var txt;
          var emotions = ["anger", "joy", "fear", "sadness", "surprise"];

          $.noConflict();

          function anslyseEmotion(status,index){
            
                console.log("text: " + status.text);
                
            
                // batch example
                jQuery.post(
                  'https://apiv2.indico.io/emotion/batch',
                  JSON.stringify({
                    'api_key': api_key,
                    'data': [status.text],
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



                  emotionText = greatestEmotion;
                  var o = {emotion:emotionText,confidence:response[greatestEmotion],text:status.text,retweet_count: status.retweet_count,postedDate:new Date(status.created_at),favorites:status.favorite_count, followers:status.user.followers_count, name: status.user.name, user: status.user.screen_name, profileimg: status.user.profile_image_url_https};
                  statusesData[index]=o;
                  if(statusesData.length == returnJson.statuses.length){
                    
                    console.log("pt statuses.length:" + statusesData.length);
                    console.log("pt returnJson.length:" + returnJson.statuses.length);
                   
                    tweetAnalyzed();
                  }
		              
                  return greatestEmotion;
                });

        }



