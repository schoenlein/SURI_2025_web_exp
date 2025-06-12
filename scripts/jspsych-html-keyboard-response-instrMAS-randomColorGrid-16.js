/**
 * jspsych-html-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["html-keyboard-response-instrMAS-randomColorGrid-16"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-keyboard-response-instrMAS-randomColorGrid-16',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus',
        default: null,
        description: 'The image to be displayed'
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
      response_sideSelected: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'sideSelected',
        default: 0,
        description: 'Left vs. right (0 vs. 1) color selected during comparison trial'
      },
      target_side: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'which side target was on',
        default: "",
        description: 'Which set of features to display.'
      },
      feedbackTrial: {
        type: jsPsych.plugins.parameterType.INT, 
        pretty_name: 'whether trial or feedback',
        default: 0,
        description: '0 for trial; 1 for feedback'
      }
    }
  }


  plugin.trial = function(display_element, trial) {

    var html = ""
      html += '<div id="jspsych-html-keyboard-response-stimulus"></div><p>';

  
    // add prompt 
    if (trial.prompt1 !== null) {
         html += trial.prompt1;
     }
          

    var  set = 0; 

    //For j rows
     for (j = 0; j < 2; j++){
          
          if (j == 0){
              var shift = 80; 
              var topShift = 0; 
              for (i = 0; i < 5; i++){
                html += '<div style=" display: inline-block; width:40px;height:40px; background-color:rgb('+trial.stimulus[i+set]+'); position: relative; top:'+topShift+'px; left:'+shift+'px;"></div>'
                shift = shift+20; 
              }
              set = set + 5

          }else if (j == 1){
              var shift = -150; 
              var topShift = 60; 
              for (i = 0; i < 6; i++){
                html += '<div style=" display: inline-block; width:40px;height:40px; background-color:rgb('+trial.stimulus[i+set]+'); position: relative; top:'+topShift+'px; left:'+shift+'px;"></div>'
                shift = shift+20;  
              }   
              set = set + 6

         }else if (j == 2){
             var shift = -260; 
             var topShift = 120; 
             for (i = 0; i < 5; i++){
               html += '<div style="display: inline-block; width:40px;height:40px; background-color:rgb('+trial.stimulus[i+set]+'); position: relative; top:'+topShift+'px; left:'+shift+'px;"></div>'
               shift = shift+20; 
             }   
             set = set + 5

        }
    } 
   
        html += '</div>'
      
      
      if (trial.prompt2 !== null) {
      //  html += trial.prompt2
        html += '<span style="position: relative; top: 50px;">'+trial.prompt2+'</span>';
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
        "prompt": trial.prompt, 
        "target_side": trial.target_side,
        "feedbackTrial": trial.feedbackTrial
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
