/**
 * jspsych-image-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['image-slider-responseMAS-randomInst-NoSlide'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('image-slider-responseMAS-randomInst-NoSlide', 'stimulus', 'image');

  plugin.info = {
    name: 'image-slider-responseMAS-randomInst-NoSlide',
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
     /* stimulus2: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus2',
        default: undefined,
        description: 'The image to be displayed'
      },
      stimulus2b: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus2b',
        default: undefined,
        description: 'The image to be displayed'
      },
      stimulus_height2: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image height2',
        default: null,
        description: 'Set the image height in pixels'
      },
      stimulus_width2: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image width2',
        default: null,
        description: 'Set the image width in pixels'
      },*/
      maintain_aspect_ratio2: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio2',
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
      prompt_size: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt_size',
        default: null,
        description: 'size of font.'
      },
      prompt1: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt2',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      prompt2: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt2b',
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
    }
  }

  

  plugin.trial = function(display_element, trial) {

  var html = "";
    

  
  //Text prompt1
  if (trial.prompt1 !== null){
    html += '<span style="text-align: center; font-size: 100%;">'+trial.prompt1+'</span>'
}

 //html += '<div id="jspsych-image-slider-response-wrapper" style="margin: 35px 0px;">';
 //html += '<div id="jspsych-image-slider-response-stimulus">';

    //First species
   // html += '<span style="text-align: center; font-size: 125%;">'+trial.prompt2+'</span>' // Label 
    //html += '<div style="line-height:10px;">';
    //html += '<br>'
    //html += '</div>'
    html+= '<div class=centered">';
    var  set = 0; 

    for (j = 0; j < 4; j ++){
      var shift = -50; 
      for (i = 0; i < 9; i++){
        shift = shift+ + 10; //width: 3%; 
        html += '<img src="'+trial.stimulus[i+set]+'"; style ="width: 50px; position: relative; left:'+shift+'px; border:3px solid rgb(120,119,117)" '; 
        html += '"></img>'; 
      }
      html += '<div style="line-height:10px;">';
      html += '<br>'
      html += '</div>'
      set = set + 9;  
    }
    //html += '"></img>';
    html += '</div>'
   // html += '<br>'

  //  html += '<div>' 
   // html += '<div>'
   

    
    html += '<div class="jspsych-image-slider-response-container" style="position:relative;  '; // add color to this object? 
    if(trial.slider_width !== null){
      html += 'width:'+trial.slider_width+'px;';
    }
    //html += '">';
    //html += '<hr class="verticalC" />' ;
    //html += '<hr class="verticalL" />' ;
    //html += '<hr class="verticalR" />' ;
    
    html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 0%;" id="jspsych-image-slider-response-response"; class = "jspsych-image-slider-response-sliderColor"; ></input>';
    

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
   // html += '</div>';
    //html += '</div>';
    //html += '</div>';
    

    //Text prompt2
    if (trial.prompt2 !== null){
      html += '<span style="text-align: center; font-size: 100%;">'+trial.prompt2+'</span>'
  }

  html += '<br>'
  html += '<br>'

    // add submit button 
    html += '<button id="jspsych-image-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';


    html += '</div>';
    html += '</div>';

    //html += '</div>';


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
        "stimulus": trial.stimulus,
        "response": response.response,
        "prompt": trial.prompt
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
