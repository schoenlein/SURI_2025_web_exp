/**
 * jspsych-image-button-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a button response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["image-button-responseMAS-colorArray"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('image-button-responseMAS-colorArray', 'stimulus', 'image');

  plugin.info = {
    name: 'image-button-responseMAS-colorArray',
    description: '',
    parameters: {
      stimulus: {
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
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Choices',
        default: undefined,
        array: true,
        description: 'The labels for the buttons.'
      },
      button_html: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Button HTML',
        default: '<button class="jspsych-btn">%choice%</button>',
        array: true,
        description: 'The html of the button. Can create own style.'
      },
      button_html_continue: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Button HTML continue',
        default: null,
        array: false,
        description: 'The html of the button. Can create own style.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed under the button.'
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
      margin_vertical: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Margin vertical',
        default: '0px',
        description: 'The vertical margin of the button.'
      },
      margin_horizontal: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Margin horizontal',
        default: '8px',
        description: 'The horizontal margin of the button.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, then trial will end when user responds.'
      },
      render_on_canvas: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Render on canvas',
        default: true,
        description: 'If true, the image will be drawn onto a canvas element (prevents blank screen between consecutive images in some browsers).'+
          'If false, the image will be shown via an img element.'
      },
      trial_type: {
        type: jsPsych.plugins.parameterType.SELECT,
        pretty_name: 'Part of trial',
        options: ['Present','Feedback'],
        default: 'Present',
        description: 'Which set of features to display.'
      },
      color_selected: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'sideSelected',
        default: 0,
        description: 'which button (color) selected'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {


    var height, width;
    var html;   
    if (trial.render_on_canvas) {
      // first clear the display element (because the render_on_canvas method appends to display_element instead of overwriting it with .innerHTML)
      if (display_element.hasChildNodes()) {
        // can't loop through child list because the list will be modified by .removeChild()
        while (display_element.firstChild) {
          display_element.removeChild(display_element.firstChild);
        }
      }

      // create canvas element and image
      var canvas = document.createElement("canvas");
      canvas.id = "jspsych-image-button-response-stimulus";
      canvas.style.margin = 0;
      canvas.style.padding = 0;
      var img = new Image();   
      img.src = trial.stimulus;
      // determine image height and width
      if (trial.stimulus_height !== null) {
        height = trial.stimulus_height;
        if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
          width = img.naturalWidth * (trial.stimulus_height/img.naturalHeight);
        }
      } else {
        height = img.naturalHeight;
      }
      if (trial.stimulus_width !== null) {
        width = trial.stimulus_width;
        if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
          height = img.naturalHeight * (trial.stimulus_width/img.naturalWidth);
        }
      } else if (!(trial.stimulus_height !== null & trial.maintain_aspect_ratio)) {
        // if stimulus width is null, only use the image's natural width if the width value wasn't set 
        // in the if statement above, based on a specified height and maintain_aspect_ratio = true
        width = img.naturalWidth;
      }
      canvas.height = height;
      canvas.width = width;


     
      // create buttons
      var buttons = [];
      if (Array.isArray(trial.button_html)) {
        if (trial.button_html.length == trial.choices.length) {
          buttons = trial.button_html;
        } else {
          console.error('Error in image-button-response plugin. The length of the button_html array does not equal the length of the choices array');
        }
      } else {
        for (var i = 0; i < trial.choices.length; i++) {
          buttons.push(trial.button_html);
        }
      }
      var btngroup_div = document.createElement('div');
      btngroup_div.id = "jspsych-image-button-response-btngroup";
      html = '';
      html += '<br>'

      var  set = 0; 
     // for (var i = 0; i < trial.choices.length; i++) {


        for (j = 0; j < 3; j++){
          var shift = -125; 
          html += '<div style="line-height:15px;">';

            for (k = 0; k < 3; k++){
                shift = shift+ + 45;
                var str = buttons[k+set].replace(/%choice%/g, trial.choices[k+set]);
                i = k + set;

                if (trial.trial_type == "Feedback" && trial.color_selected == i){    
                  html += '<div class="jspsych-image-button-response-button" style="border:3px solid black; display: inline-block; left:'+shift+'px; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-image-button-response-button-' + i +'" data-choice="'+ i +'">'+str+'</div>';
                }else{
                  html += '<div class="jspsych-image-button-response-button" style="border:3px solid rgb(120,119,117); display: inline-block; left:'+shift+'px; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-image-button-response-button-' + i +'" data-choice="'+ i +'">'+str+'</div>';
                }
            
              }
          html += '<div style="line-height:15px;">';
          html += '<br>'
          set = set + 3;  
        }
     
        
  // add submit button 
  //html += '<button id="jspsych-image-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';


      btngroup_div.innerHTML = html;
      // add canvas to screen and draw image
      display_element.insertBefore(canvas, null);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img,0,0,width,height);
   

      // add prompt if there is one
      if (trial.prompt !== null) {
        display_element.insertAdjacentHTML('beforeend', trial.prompt);
      }
      
      // add buttons to screen
      display_element.insertBefore(btngroup_div, canvas.nextElementSibling);
      // add prompt if there is one
    //  if (trial.prompt !== null) {
      //  display_element.insertAdjacentHTML('beforeend', trial.prompt);
     // }




    } else {

 
    //  html = '<img src="'+trial.stimulus+'" id="jspsych-image-button-response-stimulus">';
      //display buttons
      var buttons = [];
      if (Array.isArray(trial.button_html)) {
        if (trial.button_html.length == trial.choices.length) {
          buttons = trial.button_html;
        } else {
          console.error('Error in image-button-response plugin. The length of the button_html array does not equal the length of the choices array');
        }
      } else {
        for (var i = 0; i < trial.choices.length; i++) {
          buttons.push(trial.button_html);
        }
      }
      html += '<div id="jspsych-image-button-response-btngroup">';

      for (var i = 0; i < trial.choices.length; i++) {
        var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
     //   html += '<img src="'+str+'; class="jspsych-image-button-response-button" style="display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-image-button-response-button-' + i +'" data-choice="'+i+'">'+str+'</img>';
        html += '<div class="jspsych-image-button-response-button" style="width: 50px;  display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-image-button-response-button-' + i +'" data-choice="'+i+'">'+str+'</div>';

      }
      html += '</div>';



      // add prompt
      if (trial.prompt !== null){
        html += trial.prompt;
      }
      // update the page content
      display_element.innerHTML = html;

      // set image dimensions after image has loaded (so that we have access to naturalHeight/naturalWidth)
      var img = display_element.querySelector('#jspsych-image-button-response-stimulus');
      if (trial.stimulus_height !== null) {
        height = trial.stimulus_height;
        if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
          width = img.naturalWidth * (trial.stimulus_height/img.naturalHeight);
        }
      } else {
        height = img.naturalHeight;
      }
      if (trial.stimulus_width !== null) {
        width = trial.stimulus_width;
        if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
          height = img.naturalHeight * (trial.stimulus_width/img.naturalWidth);
        }
      } else if (!(trial.stimulus_height !== null & trial.maintain_aspect_ratio)) {
        // if stimulus width is null, only use the image's natural width if the width value wasn't set 
        // in the if statement above, based on a specified height and maintain_aspect_ratio = true
        width = img.naturalWidth;
      }
      img.style.height = height.toString() + "px";
      img.style.width = width.toString() + "px";
    }

    // start timing
    var start_time = performance.now();

    for (var i = 0; i < trial.choices.length; i++) {
      display_element.querySelector('#jspsych-image-button-response-button-' + i).addEventListener('click', function(e){
        var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
        after_response(choice);
      });
    }

    // store response
    var response = {
      rt: null,
      button: null
    };

    // function to handle responses by the subject
    function after_response(choice) {

      // measure rt
      var end_time = performance.now();
      var rt = end_time - start_time;
      response.button = parseInt(choice);
      response.rt = rt;

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-image-button-response-stimulus').className += ' responded';

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.jspsych-image-button-response-button button');
      for(var i=0; i<btns.length; i++){
        //btns[i].removeEventListener('click');
        btns[i].setAttribute('disabled', 'disabled');
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.choices,
        "button_pressed": response.button,
        "response": trial.choices[trial.color_selected],
        "prompt": trial.prompt
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // hide image if timing is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-image-button-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if time limit is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    } else if (trial.response_ends_trial === false) {
      console.warn("The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true.");
    }
  };

  return plugin;
})();
