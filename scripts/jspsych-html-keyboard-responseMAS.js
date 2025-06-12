/**
 * jspsych-html-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["html-keyboard-responseMAS"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-keyboard-responseMAS',
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
      prompt: {
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
      promptedColor: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'which color is prompted',
        default: "",
        description: '.'
      },
      colorNames: {
        type: jsPsych.plugins.parameterType.ARRAY,
        pretty_name: 'set of color names',
        default: "",
        description: '.'
      },
      colorNameProbed: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'color name probed',
        default: "",
        description: '.'
      },
      colorCounter: {
        type: jsPsych.plugins.parameterType.ARRAY,
        pretty_name: 'which color is prompted',
        default: "black",
        description: '.'
      },
      promptedColorR: {
        type: jsPsych.plugins.parameterType.ARRAY,
        pretty_name: 'which color is prompted',
        default: "black",
        description: '.'
      },
      promptedColorG: {
        type: jsPsych.plugins.parameterType.ARRAY,
        pretty_name: 'which color is prompted',
        default: "black",
        description: '.'
      },
      promptedColorB: {
        type: jsPsych.plugins.parameterType.ARRAY,
        pretty_name: 'which color is prompted',
        default: "black",
        description: '.'
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
      }
    


    }
  }

  plugin.trial = function(display_element, trial) {

    var html = ""



    //Left set
    html += '<div class = "parent" style = "width: 500px; left: -350px; top: 0px; justify-content: left; ">'

      //instructions prompted circle
      html += '<div id="jspsych-html-keyboard-response-stimulus">'+trial.stimulus+'</div>';

      if(trial.feedbackTrial == 0){
          html += '<div class="circleBig" style = "background-color:rgb('+trial.promptedColorR[trial.promptedColor]+','+trial.promptedColorG[trial.promptedColor]+','+trial.promptedColorB[trial.promptedColor]+'); position: relative; left: 200px; top: 100px; ";></div>'
        }else if(trial.feedbackTrial == 1){
          html += '<div class="circleBig" style = "background-color:rgb('+trial.promptedColorR[trial.promptedColor]+','+trial.promptedColorG[trial.promptedColor]+','+trial.promptedColorB[trial.promptedColor]+'); position: relative; left: 200px; top: 100px; ";></div>'
        }else if(trial.feedbackTrial == 2){
          html += '<div class="circleBig" style = "background-color:rgb('+trial.rgbBackground+'); position: relative; left: 65px; top: 17.5px;  ";>'
          html+= '<span style ="position: relative; left: 135px; top: 120px; font-size: 30px;">+</span></div>'
        }

      
      // feedback prompt
      if(trial.feedbackTrial == 0){
        html += '<span style="position: relative; top: 100px; color: rgb('+trial.rgbBackground+')">'+trial.prompt+' </span>'
      }else if(trial.feedbackTrial == 1){
        html += '<span style="position: relative; top: 100px;">'+trial.prompt+' </span>'
      }else if(trial.feedbackTrial == 2){
        html += '<span style="position: relative; top: 100px; color: rgb('+trial.rgbBackground+')">'+trial.prompt+' </span>'
      }


      //Prompted circle 
    html += '</div>'

 

    //squares
    html += '<div >' 

        //Square 1
        html += '<div class="square" style = "position: relative; left: 300px; top: -375px;" >'
          html += '<span style="font-size: 30px; position: relative;">'+trial.colorNames[0]+' </span>'


        for(var i = 0; i < 32;i++){//trial.colorCounter.length;) {
          var j = i
          var topRowAdjust = 0
          if (i >= 10)  
            {j = i - 11
            topRowAdjust = -240}
            if (i>= 22)
          {j = i - 22
            topRowAdjust = -480}
          var leftStarting = 50
          var leftadjust = 30
          var iLeftadjust = leftStarting + leftadjust * j
          var topStarting = 0 + topRowAdjust
          var topadjust = -25
          var iTopadjust = topStarting + topadjust * j

          if(trial.colorCounter[i]==1){html += '<div class="circleMini" style = "background-color: rgb('+trial.promptedColorR[i]+','+trial.promptedColorG[i]+','+trial.promptedColorB[i]+');position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div> '}
          else if(trial.colorCounter[i]==0){html += '<div class="circleMini" style = "background-color:rgb('+trial.rgbBackground+'); position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div>'}
          }

        //New Square 2
        html += '<div class="square" style = "position: relative; left: -1.7px; top: -675px;" >'
          html += '<span style="font-size: 30px; position: relative;">'+trial.colorNames[1]+' </span>'
          for(var i = 0; i < 32;i++){//trial.colorCounter.length;) {
            var j = i
            var topRowAdjust = 0
            if (i >= 10)  
              {j = i - 11
              topRowAdjust = -240}
              if (i>= 22)
            {j = i - 22
              topRowAdjust = -480}
            var leftStarting = 50
            var leftadjust = 30
            var iLeftadjust = leftStarting + leftadjust * j
            var topStarting = 0 + topRowAdjust
            var topadjust = -25
            var iTopadjust = topStarting + topadjust * j
            
            var c = i + 32 
            if(trial.colorCounter[c]==1){html += '<div class="circleMini" style = "background-color: rgb('+trial.promptedColorR[c]+','+trial.promptedColorG[c]+','+trial.promptedColorB[c]+');position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div> '}
            else if(trial.colorCounter[c]==0){html += '<div class="circleMini" style = "background-color:rgb('+trial.rgbBackground+'); position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div>'}
            
             //html += '<div class="circleMini" style = "background-color:'+trial.promptedColor[i]+'; position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div>'
          }
         //New Square 3
         html += '<div class="square" style = "position: relative; left: -1.7px; top: -675px;" >'
         html += '<span style="font-size: 30px; position: relative;">'+trial.colorNames[2]+' </span>'
         for(var i = 0; i < 32;i++){//trial.colorCounter.length;) {
           var j = i
           var topRowAdjust = 0
           if (i >= 10)  
             {j = i - 11
             topRowAdjust = -240}
             if (i>= 22)
           {j = i - 22
             topRowAdjust = -480}
           var leftStarting = 50
           var leftadjust = 30
           var iLeftadjust = leftStarting + leftadjust * j
           var topStarting = 0 + topRowAdjust
           var topadjust = -25
           var iTopadjust = topStarting + topadjust * j
           
           var c = i + 32 + 32  
           if(trial.colorCounter[c]==1){html += '<div class="circleMini" style = "background-color: rgb('+trial.promptedColorR[c]+','+trial.promptedColorG[c]+','+trial.promptedColorB[c]+');position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div> '}
           else if(trial.colorCounter[c]==0){html += '<div class="circleMini" style = "background-color:rgb('+trial.rgbBackground+'); position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div>'}
            
          //  html += '<div class="circleMini" style = "background-color:'+trial.promptedColor[i]+'; position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div>'
         }

         //New Square 4
         html += '<div class="square" style = "position: relative; left: -1.7px; top: -675px;" >'
          html += '<span style="font-size: 30px; position: relative;">'+trial.colorNames[3]+' </span>'
         
          for(var i = 0; i < 32;i++){//trial.colorCounter.length;) {
            var j = i
            var topRowAdjust = 0
            if (i >= 10)  
              {j = i - 11
              topRowAdjust = -240}
              if (i>= 22)
            {j = i - 22
              topRowAdjust = -480}
            var leftStarting = 50
            var leftadjust = 30
            var iLeftadjust = leftStarting + leftadjust * j
            var topStarting = 0 + topRowAdjust
            var topadjust = -25
            var iTopadjust = topStarting + topadjust * j
            
            var c = i + 32 + 32 + 32
            if(trial.colorCounter[c]==1){html += '<div class="circleMini" style = "background-color: rgb('+trial.promptedColorR[c]+','+trial.promptedColorG[c]+','+trial.promptedColorB[c]+');position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div> '}
            else if(trial.colorCounter[c]==0){html += '<div class="circleMini" style = "background-color:rgb('+trial.rgbBackground+'); position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div>'}
              
            // html += '<div class="circleMini" style = "background-color:'+trial.promptedColor[i]+'; position: relative; left: '+iLeftadjust+'px; top: '+iTopadjust+'px; ";></div>'
          }

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
