/**
 * jspsych-image-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["image-keyboard-responseMAS"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('image-keyboard-responseMAS', 'stimulus', 'image');

  plugin.info = {
    name: 'image-keyboard-responseMAS',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
      },
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image height',
        default: null,
        description: 'Set the image height in pixels'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image width',
        default: null,
        description: 'Set the image width in pixels'
      },
      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      labels: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of image.',
      },
      prompt1: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      prompt2: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      prompt_location: {
        type: jsPsych.plugins.parameterType.SELECT,
        pretty_name: 'Prompt location',
        options: ['above','below'],
        default: 'above',
        description: 'Indicates whether to show prompt "above" or "below" the sorting area.'
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
      },
      whichColorCat: {
        type: jsPsych.plugins.parameterType.ARRAY, 
        pretty_name: 'whether trial or feedback',
        default: "",
        description: 'whether blue or purple'
      },
      whichColorSquare: {
        type: jsPsych.plugins.parameterType.INT, 
        pretty_name: 'whether trial or feedback',
        default: "",
        description: 'color 0 through 7'
      }
    }
  }

  

  plugin.trial = function(display_element, trial) {


  
    var html = "";

     
         // add prompt 
         if (trial.prompt1 !== null) {
           html += '<span style="font-size: 100%; ">'+trial.prompt1+'</span>'
          }
    
      // // Display labels above figure
      //  for(var j=0; j < trial.labels.length; j++){
      //   var width = 125
      //   var top_offset = -80
        
      //   if (j == 0){
      //     var left_offset = -150;
      //   }else{
      //     var left_offset = 150; 
      //   }
      //   html += '<div style="display: inline-block; position: relative; left:'+left_offset+'px; text-align: center; width: '+width+'px; top:'+top_offset+'px; ">';
      //   html += '<span style="text-align: left; font-size: 150%;">'+trial.labels[j]+'</span>';
      //   html += '</div>'
      // }

    html += '<div>'
    // display stimulus
    if (trial.feedbackTrial == 0 || trial.feedbackTrial == 1){
      html += '<img src="'+trial.stimulus+'" id="jspsych-image-keyboard-response-stimulus" style="height: 150px; ';
    }
    else if (trial.feedbackTrial == 2){
        // Move image underneath the correct species 
        if (trial.response_sideSelected == 0){
          html += '<img src="'+trial.stimulus+'" id="jspsych-image-keyboard-response-stimulus" style ="position: relative; left: -214px; top: -50px; ';
        }
        else if (trial.response_sideSelected == 1){
          html += '<img src="'+trial.stimulus+'" id="jspsych-image-keyboard-response-stimulus" style ="position: relative; right: -214px; top: -55px;';
        }
    }  
    
    if(trial.stimulus_height !== null){
      html += 'height:'+trial.stimulus_height+'px; '
      if(trial.stimulus_width == null && trial.maintain_aspect_ratio){
        html += 'width: auto; ';
      }
    }
    if(trial.stimulus_width !== null){
      html += 'width:'+trial.stimulus_width+'px; '
      if(trial.stimulus_height == null && trial.maintain_aspect_ratio){
        html += 'height: auto; ';
      }
    }
    
    html +='"></img>';
    html += '</div>'

    if (trial.prompt2 !== null) {
      html += '<span style="font-size: 100%;">'+trial.prompt2+'</span>'
    }
    display_element.innerHTML = html;



    display_element.innerHTML = html;
    // render
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
        "targetSide": trial.target_side,
        "target_side": trial.target_side,
        "feedbackTrial": trial.feedbackTrial,
        "colorNameProbed": trial.whichColorCat.toString(),
        "colorCatOrder": trial.whichColorSquare
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
      display_element.querySelector('#jspsych-image-keyboard-response-stimulus').className += ' responded';

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
        display_element.querySelector('#jspsych-image-keyboard-response-stimulus').style.visibility = 'hidden';
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
