/**
 * jspsych-image-slider-responseMAS-colorSquare
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['image-slider-responseMAS-colorSquare-assoc'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('image-slider-responseMAS', 'stimulus', 'image');

  plugin.info = {
    name: 'image-slider-responseMAS-colorSquare-assoc',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus',
        default: null,
        description: 'colors for square'
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
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'Slider starting value',
				default: 50,
				description: 'Sets the starting value of the slider',
			},
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: null,
        description: 'Width of the slider in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
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
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
      colorNumber: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'which color was presented',
        default: "",
        description: 'How long to show the trial.'
      },
      block: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'which color was presented',
        default: "",
        description: 'How long to show the trial.'
      },
      feedbackTrial: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'which color was presented',
        default: "",
        description: 'How long to show the trial.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {




    var html = "";

    //Text prompt
    if (trial.prompt !== null){
       html += '<span style="text-align: center; position: relative; top: 20px; font-size: 150%;">'+trial.prompt+'</span>'
   }

   html += '<br></br>';


    html += '<div id="jspsych-image-slider-response-wrapper" style="margin: 35px 0px;">';
    html += '<div id="jspsych-image-slider-response-stimulus">';

    html += '<div style="width:100px;height:100px; position: relative; top: 50px;  margin: 0 auto 3em auto; background-color:rgb('+trial.stimulus+');"></div>'

    html += '</div>';
    html += '<p><p><p><p><p>';
    html += '<br></br>';


    html += '<div>'
    html += '<div>'
    
    html += '<div class="jspsych-image-slider-response-container" style="position:relative;';//  margin: 4 auto 3em auto; '; 
    if(trial.slider_width !== null){
      html += 'width:'+trial.slider_width+'px;';
    }
    html += '">';
    html += '<hr class="verticalC" />' ;
    html += '<hr class="verticalL" />' ;
    html += '<hr class="verticalR" />' ;
    
    html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-image-slider-response-response";  class = "jspsych-image-slider-response-sliderColor";   ></input>';
    
    //Add labels
    html += '<div>'
    for(var j=0; j < trial.labels.length; j++){
      var width = 100/(trial.labels.length-1);
      var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
      html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
      html += '<span style="text-align: center; font-size: 100%;">'+trial.labels[j]+'</span>';
      html += '</div>'
    }

  
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    html +='<br></br>'
    
    // add submit button 
    html += '<button id="jspsych-image-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';

    display_element.innerHTML = html;


    var response = {
      rt: null,
      response: null
    };

    if(trial.require_movement){
      display_element.querySelector('#jspsych-image-slider-response-response').addEventListener('change', function(){
        display_element.querySelector('#jspsych-image-slider-response-next').disabled = false;
      })
    }

    display_element.querySelector('#jspsych-image-slider-response-next').addEventListener('click', function() {  //Change to #jspysch-image-slider-response-response if want to move to next trial without button click
     
        // measure response time
      var endTime = performance.now();
      response.rt = endTime - startTime;
      response.response = display_element.querySelector('#jspsych-image-slider-response-response').value;

      if(trial.response_ends_trial){
        end_trial();
      } else {
        display_element.querySelector('#jspsych-image-slider-response-next').disabled = true;
      }

    });

    

    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rt": response.rt,
        "stimulus": trial.colorNumber,
        "response": response.response,
        "prompt": trial.prompt,
        "question_order": trial.block,
        "feedbackTrial": trial.feedbackTrial
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-image-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = performance.now();
  };

  return plugin;
})();
