
 var api_key = "a8d67c385959aa0b15540e2fde6c994a";
          var emotions = ["anger", "joy", "fear", "sadness", "surprise"];

          $.noConflict();

          jQuery( document ).ready(function( $ ) {


          var txt = $('#inputText');
          txt.keypress(

              function (e){
                  if(e.which == 13){

                      var textInput = txt.val();


                      console.log(textInput);
                      //document.write(' <?php echo getTweet( ' + textInput + ' , 0);?> ');
                      //var phpadd = "<?php echo getTweet( " . textInput . " , 0);?>" //call the php add function
                      //alert(phpadd);


                      // batch example
                      $.post(
                        'https://apiv2.indico.io/emotion/batch',
                        JSON.stringify({
                          'api_key': api_key,
                          'data': [textInput],
                          'threshold': 0.1
                        })
                      ).then(function(res) {
                        var response = res.results[0]; //(fear: 0.23123, joy:0.32231)
                        var greatestEmotion = ""//fear: 0.23123

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
                                $(document.body).css("background", "#a91834");

                                break;
                            case "joy":
                                $(document.body).css("background", "#F4C925");
                                break;
                            case "fear":
                                $(document.body).css("background", "#A587BD");
                                break;
                            case "sadness":
                                $(document.body).css("background", "#7ACFEE");
                                break;
                            case "surprise":
                                $(document.body).css("background", "#79B84D");
                                break;
                            default:

                        }

                        //$("#emRes").hide(100);
                        $("#emRes").text(greatestEmotion);
                        emotionText = greatestEmotion;
                        //$("#emRes").show(150);
                      });

                  }

              });

          });


        function getOutput() {
            jQuery.ajax({
               url:'searchTweets.php',
               complete: function (response) {
                console.log(response);
                jQuery('#inputText').text(response.statuses[0].text);
               },
               error: function () {
                jQuery('#inputText').text('Bummer: there was an error!');
               }
           });
           return false;
         }
