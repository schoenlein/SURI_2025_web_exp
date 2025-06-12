/**
 * jspsych-html-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["html-keyboard-response-colorCircle-sets-18"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('html-keyboard-response-colorCircle-sets-18', 'audioTone', 'audio');


  plugin.info = {
    name: 'html-keyboard-response-colorCircle-sets-18',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      promptAbove: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      promptBelow: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
      correct_response_ends_trial: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'correct Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
      feedbackTrial: {
        type: jsPsych.plugins.parameterType.INT, 
        pretty_name: 'whether trial or feedback',
        default: 0,
        description: '0 for trial; 1 for feedback'
      },
     rgbBackground: {
        type: jsPsych.plugins.parameterType.ARRAY, 
        pretty_name: 'rgb for background',
        default: 0,
        description: '0 for trial; 1 for feedback'
      },
      audioTone: {
				type: jsPsych.plugins.parameterType.AUDIO,
        pretty_name: 'audio tone',
				default: "",
				description: 'The audio to be played.'
			},
        correctTrial: {
        type: jsPsych.plugins.parameterType.INT, 
        pretty_name: 'whether trial correct or incorrect',
        default: 0,
        description: '0 for trial; 1 for feedback'
      },
      colorCounter: {
        type: jsPsych.plugins.parameterType.ARRAY,
        pretty_name: 'which color is prompted',
        default: "black",
        description: '.', 
    },
    correctLetter: {
      type: jsPsych.plugins.parameterType.STRING,
      pretty_name: 'Prompt',
      default: null,
      description: 'Any content here will be displayed below the stimulus.'
    }

    }}

  plugin.trial = function(display_element, trial) {


    
/* ------- prompted question --------- */

  //Present the stimulus  
    var html = '<div id="jspsych-html-keyboard-response-stimulus">'+trial.stimulus+'</div>';

    // add prompt if a prompt is provided
    if(trial.promptAbove !== null){
     
      // place prompt for real trial
      if(trial.feedbackTrial == 0){
          html += '<div class = "parent" style = "width: 400px; height:80px;  left: 0px; top: -60px; justify-content: left; ">'
          html += '<span style="position: relative; top: 5.5px; left:0px ">'+trial.promptAbove+'</span></div>'

      // place prompt for feedback trial + add audio feedback
      }else if(trial.feedbackTrial == 1){
          html += '<div class = "parent" style = "width: 400px; height: 80px;  left: 0px; top:-60px;; justify-content: left; ">'
          html += '<span style="position: relative; top: 5.5px; left:0px ">'+trial.promptAbove+'</span></div>'

          // setup audio
          var context = jsPsych.pluginAPI.audioContext();
          if(context !== null){
            var source = context.createBufferSource();
            source.buffer = jsPsych.pluginAPI.getAudioBuffer(trial.audioTone);
            source.connect(context.destination);
          } else {
            var audio = jsPsych.pluginAPI.getAudioBuffer(trial.audioTone);
            audio.currentTime = 0;
          }
          if(trial.correctTrial == 0){
            audio.play();
          }
      }
    }

/* ------- square + circles --------- */

    // Display colored cricles in a box for real trial & feedback trial
    if(trial.feedbackTrial  < 2 ){
          
      //present square
      html += '<div class="square" style = "position: relative; left: 20px; top: -40px; width: 400px; height: 250px;" >'  
  
          //present colored circles in square
          for(var i = 0; i < 18;i++){//trial.colorCounter.length;) {
            var j = i
            var topRowAdjust = 30
            if (i >= 6)  
              {j = i -6
              topRowAdjust = -230}
            if (i>= 12)
              {j = i - 12
               topRowAdjust = -490}
            //    if (i>= 6)
            //  {j = i - 6
            //    topRowAdjust = -480}
            var leftStarting = 10
            var leftadjust = 65
            var iLeftadjust = leftStarting + leftadjust * j
            var topStarting = 0 + topRowAdjust
            var topadjust = -55
            var iTopadjust = topStarting + topadjust * j
  
            if(trial.colorCounter[i]==1){html += '<div class="circleMini" style = "background-color: rgb('+trial.promptedColorR[i]+','+trial.promptedColorG[i]+','+trial.promptedColorB[i]+');position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div> '}
            else if(trial.colorCounter[i]==0){html += '<div class="circleMini" style = "background-color:rgb('+trial.rgbBackground+'); position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div>'}
            }
            html+= '</div>'

      //if ITI trial (==2), present a +    
      }else if(trial.feedbackTrial == 2){
        html+= '<span style ="position: relative; top: 40px; font-size: 30px;">+</span></div>'
    }



/* ------- color names or feedback (under square) --------- */

    //Presents 4 color names during real trial 
    if(trial.feedbackTrial == 0){

        // Display labels below
          var left_offset = -150; 
              for(var j=0; j < trial.promptBelow.length; j++){
                var width = 100
                var top_offset = 0//45
                left_offset = left_offset + 60;     
              html += '<div style="display: inline-block;  width: 400px; height:150px;  position: relative; left:'+left_offset+'px; text-align: center; width: '+width+'px; top:'+top_offset+'px;">';
              html += '<span style="text-align: center; font-size: 100%;">'+trial.promptBelow[j]+'</span></div>';
            }      

            // present INCORRECT / CORRECT feedback on feedback trial
      }else if(trial.feedbackTrial == 1){
          html += '<div style="display: inline-block;  width: 400px; height:150px;  position: relative;  text-align: center;">';
          html += '<span style="text-align: center; font-size: 100%;color: rgb('+trial.rgbBackground+')">'+trial.promptBelow+' </span></div>'
      }



 /* ------- DO not change below here --------- */
     
      // draw
      display_element.innerHTML = html;



    // store response
    var response = {
      rt: null,
      key: null
    };



    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "key_press": response.key,
        "colorNameProbed": trial.colorNameProbed, 
        "feedbackTrial": trial.feedbackTrial,
        "correctLetter": trial.correctLetter
  
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }




  };

  return plugin;
})();
