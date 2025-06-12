/**
 * jspsych-html-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["html-keyboard-response-coloredSquare"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-keyboard-response-coloredSquare',
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
        default: 999,
        description: 'Left vs. right (0 vs. 1) color selected during comparison trial'
      },
      target_side: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'which side target was on',
        default: 999,
        description: 'Which set of features to display.'
      },
      feedbackTrial: {
        type: jsPsych.plugins.parameterType.INT, 
        pretty_name: 'whether trial or feedback',
        default: 999,
        description: '0 for trial; 1 for feedback'
      },
      whichColorID: {
        type: jsPsych.plugins.parameterType.INT, 
        pretty_name: 'whether trial or feedback',
        default: 999,
        description: 'color number'
      },
      colorCat: {
        type: jsPsych.plugins.parameterType.STRING, 
        pretty_name: 'whether trial or feedback',
        default: "",
        description: 'color set'
      },
      whichColorCat: {
        type: jsPsych.plugins.parameterType.ARRAY, 
        pretty_name: 'whether trial or feedback',
        default: "",
        description: 'whether blue or purple'
      },
      whichColorSquare: {
        type: jsPsych.plugins.parameterType.STRING, 
        pretty_name: 'whether trial or feedback',
        default: "",
        description: 'color 0 through 7'
      },
      whichSpecies: {
        type: jsPsych.plugins.parameterType.STRING, 
        pretty_name: 'whether filk or slub',
        default: "",
        description: 'color 0 through 7'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = ""

      html += '<div id="jspsych-html-keyboard-response-stimulus"></div><p>';

      // add prompt
      if(trial.prompt !== null){
        html += '<span style="text-align: left; font-size: 150%; position: relative; top: -150px;">'+trial.prompt+'</span>';

      }

      // Display labels above figure
          for(var j=0; j < trial.labels.length; j++){
            var width = 250
            var top_offset = -150
            
            if (j == 0){
              var left_offset = -150;
            }else{
              var left_offset = 150; 
            }
            html += '<div style="display: inline-block; position: relative; left:'+left_offset+'px; text-align: center; width: '+width+'px; top:'+top_offset+'px; ">';
            html += '<span style="text-align: left; font-size: 150%;">'+trial.labels[j]+'</span>';
            html += '</div>'
          }


    //colored squares
    if (trial.feedbackTrial == 0|| trial.feedbackTrial == 1){
        html += '<div style="width:100px;height:100px; margin: 0 auto 3em auto; background-color:rgb('+trial.stimulus+'); position: relative; top: -10px; left: 0px;"></div>'
   
      }else if (trial.feedbackTrial == 2){
        // Move image underneath the correct species 
       // if (trial.target_side == 0 ){//FILK trial
          html += '<div style="width:100px;height:100px; margin: 0 auto 3em auto; background-color:rgb('+trial.stimulus+'); position: relative; left: 0px; top: 0px;';
        //}
        //else if (trial.target_side == 1){//SLUB trial
         // html += '<div style="width:150px;height:150px; margin: 0 auto 3em auto; background-color:rgb('+trial.stimulus+'); position: relative; right: -160px; top: -60px;';
       // }
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
        "key_press": response.key, 
        "stimulus": trial.whichSpecies,
        "feedbackTrial": trial.feedbackTrial, 
        "target_side": trial.target_side,
        "prompt": trial.prompt,
        "question_order": trial.labels.toString(),
        "colorNameProbed": trial.whichColorCat.toString(),
        "colorCatOrder": trial.whichColorSquare,
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
