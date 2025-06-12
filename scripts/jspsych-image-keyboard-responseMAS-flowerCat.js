/**
 * jspsych-image-keyboard-response-catExp
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["image-keyboard-responseMAS-flowerCat"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('image-keyboard-responseMAS-flowerCat', 'stimulus', 'image');

  plugin.info = {
    name: 'image-keyboard-responseMAS-flowerCat',
    description: '',
    parameters: {
      stimulusLeft: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: null,
        description: 'The image to be displayed'
      },
      stimulusRight: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: null,
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
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      prompt2: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt2',
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
      stimulusTarget: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'point vs. curvy body',
        options: "",
        default: "",
        description: 'pointy vs. curvy body'
      },
      stimulusTargetName: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'point vs. curvy body',
        options: "",
        default: "",
        description: 'pointy vs. curvy body'
      },
      rgbBackground: {
        type: jsPsych.plugins.parameterType.ARRAY, 
        pretty_name: 'rgb for background',
        default: 0,
        description: '0 for trial; 1 for feedback'
      },
    leftStim: {
        type: jsPsych.plugins.parameterType.INT, 
        pretty_name: 'rgb for alien body color',
        default: "",
        description: ""
      },
      rightStim: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'point vs. curvy body',
        options: "",
        default: "",
        description: 'pointy vs. curvy body'
      },
      feedbackTrial: {
        type: jsPsych.plugins.parameterType.INT, 
        pretty_name: 'whether trial or feedback',
        default: 0,
        description: '0 for trial; 1 for feedback'
      }, 
      correctImage:{
        type: jsPsych.plugins.parameterType.IMAGE, 
        pretty_name: 'whether trial or feedback',
        default: 0,
        description: '0 for trial; 1 for feedback'
      }
    }
  }

  plugin.trial = function(display_element, trial) {



    var html = "";

    html += '<span style="font-size: 120%; display: inline-block; position: relative; left: 50px; text-align: center; top: 75px;">'+trial.prompt2+'</span>'
    html += '<span style="display: inline-block; position: relative; top: 120px; left: -100px; font-size: 150%;">'+trial.labels+'</span>';
    

    //add prompt       
    if (trial.prompt !== null) {
      if (trial.feedbackTrial == 0 || trial.feedbackTrial == 1){
        html += '<span style="font-size: 120%; color: rgb('+trial.rgbBackground+'); position: relative; top:150px; ">'+trial.prompt+'</span>'
        
       }else if ( trial.feedbackTrial == 2 ){
         if (trial.species == "LEFT" ){// left species
            html += '<span style="font-size: 120%;  position: relative; top: 150px; left: -205px">'+trial.prompt+'</span>'
          } else if (trial.species == "RIGHT"){ //right species
            html += '<span style="font-size: 120%;  position: relative; top: 150px; left: 195px">'+trial.prompt+'</span>'
          //html += '<span style="font-size: 120%;  position: relative; top: 150px;">'+trial.prompt+'</span>'
        }    
      }
   }


    // display stimulus
    if (trial.feedbackTrial == 0 || trial.feedbackTrial == 1){ //
      
        //added line for colored square behind alien
        html += '<div style="width:85px;height:15px; margin: 0 auto 3em auto; background-color:rgb('+trial.bodyColor+'); position: relative; top: 145px;"></div>'
        html += '<img src="'+trial.stimulusLeft+'" id="jspsych-image-keyboard-response-stimulus" style ="position: relative; top: 50px; left: -200px;  height:'+trial.stimulus_height+'px; "';
      }

    else if (trial.feedbackTrial == 2){
        // Move image underneath the correct species 
        // if (trial.species == "LEFT" ){// left species
        //         //added line for colored square behind alien
        //     html += '<span style="font-size: 120%;  position: relative; top: 150px; left: 200px">'+trial.prompt+'</span>'

        // }
       // html += '<div style="width:85px;height:360px; margin: 0 auto 3em auto; background-color:rgb('+trial.bodyColor+'); position: relative; top: 145px;"></div>'
        html += '<div style="width:85px;height:15px; margin: 0 auto 3em auto; background-color:rgb('+trial.bodyColor+'); position: relative; top: 145px;"></div>'
        html += '<img src="'+trial.stimulusLeft+'" id="jspsych-image-keyboard-response-stimulus" style ="position: relative; top: 50px; left: -200px;  height:'+trial.stimulus_height+'px; "';

      //  html += '<img src="'+trial.stimulusLeft+'" id="jspsych-image-keyboard-response-stimulus" style ="position: relative; top: -300px; left: 0px; height:'+trial.stimulus_height+'px;"';
        

    }
    
    
    html +='</img>';



        // display stimulus
        if (trial.feedbackTrial == 0 || trial.feedbackTrial == 1){ //
      
          //added line for colored square behind alien
          html += '<div style="width:85px;height:15px; margin: 0 auto 3em auto; background-color:rgb('+trial.bodyColor+'); position: relative; top: 145px;"></div>'
          html += '<img src="'+trial.stimulusRight+'" id="jspsych-image-keyboard-response-stimulus" style ="position: relative; top: -290px; left: 200px; height:'+trial.stimulus_height+'px; "';
   
         }
   
       else if (trial.feedbackTrial == 2){
           // Move image underneath the correct species 
       
          // if (trial.species == "RIGHT"){ //right species
          //       //added line for colored square behind alien
          //       html += '<span style="font-size: 120%;  position: relative; top: 150px; left: -200px">'+trial.prompt+'</span>'
          //     }
            //  html += '<div style="width:85px;height:360px; margin: 0 auto 3em auto; background-color:rgb('+trial.bodyColor+'); position: relative; top: 145px;"></div>'
              html += '<div style="width:85px;height:15px; margin: 0 auto 3em auto; background-color:rgb('+trial.bodyColor+'); position: relative; top: 145px;"></div>'
              html += '<img src="'+trial.stimulusRight+'" id="jspsych-image-keyboard-response-stimulus" style ="position: relative; top: -290px; left: 200px; height:'+trial.stimulus_height+'px; "';

             // html += '<img src="'+trial.stimulusRight+'" id="jspsych-image-keyboard-response-stimulus" style ="position: relative; top: -300px; left: 0px; height:'+trial.stimulus_height+'px;"';

       }
       
   
       
       html +='</img>';


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
        "bodyType": trial.bodyType,
        "feedbackTrial": trial.feedbackTrial,
        "stimulusTargetName":trial.stimulusTargetName,
         "stimulusTarget": trial.stimulusTarget,
         "leftStim": trial.leftStim,
         "rightStim": trial.rightStim,
         "correctImage": trial.correctImage,
        "species": trial.species, 
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
