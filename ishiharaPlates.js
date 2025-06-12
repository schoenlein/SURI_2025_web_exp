

/* ------------------------------------ Color vision check --------------------------------------- */

function ishiharaPlates() {

//This code presents 11 ishihara plates using the plugin: jspych-image-text-responseMAS. 
// the plates are from: https://www.mdcalc.com/color-vision-screening-ishihara-test#next-steps
//This code always presents plate 0 first, which everyone should be able to see. Then the code randomly presents the other 11 plates.  

//At least 9 of 11 plates must be correctly answered for a participant to be included in your analyses. (aka, they can miss up to two plates)

//In the data table: 
// stimulus: file name of the given ishihara plate (files named as "ishihara-#")
// prompt: correct answer for that plate
// responses: participant's response (typed into a text box)
// correct: whether participants were correct (1) or incorrect (0). 


//*Note, it might be good practice to do a quick visual check of participants responses (rather than only looking at correct vs. incorrect), 
// to ensure that they really did get it correct/incorrect given what they typed. they could, for example, type the word "FIVE", rather than
// input the number "5", which would be coded as incorrect per the "correct" column in the data table. 

// Ishihara color vision check //
var ishihara_instructions = {
    type: "html-keyboard-response",
        stimulus: 
        "<p>Next, you will see an image on the screen." +
        "<br>If you see a number in the image, please carefully type that number in the box.</p>"+
        "<p>If you do not see a number in the image, please type 'None' in the box."+
        "<br>This part of the experiment will take about 2 minutes.</p>"+
        "<p>Please press the spacebar to begin.</p>",
        post_trial_gap: 500,
        choices: [32]
    };
    timeline.push(ishihara_instructions);


    //random function
    function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return  Math.floor(Math.random() * (max - min + 1));
        }
    

   //Loop to present 11 ishihara plates of a unique type
   var plateCounter = [0,0,0,0,0,0,0,0,0,0,0]
   var numPlates = 11; 
   for (plateNum = 0; plateNum < numPlates;){


        //Randomly select which plate to present
        var whichPlate = getRandomIntInclusive(0,10);

        //always present this plate first
        if (plateNum == 0){
                whichPlate = 0;
                answer  =  JSON.stringify({"ishihara":"12"});
        }

        // specify correct answer
        if (whichPlate == 1){
            answer = JSON.stringify({"ishihara":"8"});
        }else if (whichPlate == 2){
            answer = JSON.stringify({"ishihara":"5"}); 
        }else if (whichPlate == 3){
            answer = JSON.stringify({"ishihara":"29"}); 
        }else if (whichPlate == 4){
            answer = JSON.stringify({"ishihara":"74"});
        }else if (whichPlate == 5){
            answer = JSON.stringify({"ishihara":"7"}); 
        }else if (whichPlate == 6){
            answer = JSON.stringify({"ishihara":"45"});  
        }else if (whichPlate == 7){
            answer = JSON.stringify({"ishihara":"2"}); 
        }else if (whichPlate == 8){
            answer = JSON.stringify({"ishihara":"16"});
        }else if (whichPlate == 9){
            answer = JSON.stringify({"ishihara":"35"}); 
        }else if (whichPlate == 10){
            answer = JSON.stringify({"ishihara":"96"}); 
        }
    
        //Check to ensure this plate not previously presented
        if (plateCounter[whichPlate] == 0) {

            //Present trial
            var ishihara_plate = {
                type: 'image-text-responseMAS',
                stimulus: "ishiharaPlateImg/ishihara-"+whichPlate+".png", 
                stimulus_height: 400, 
                correctAnswer: answer,
                on_start: function(trial) {
                    correctAnswer = trial.correctAnswer}, //recorded in the "prompt" column of the output
                questions: [
                    { prompt: "Carefully type what number you see. "+
                        "<p>If you do not see a number, type 'None'.",
                    rows: 1, 
                    columns: 1,
                    required: true,
                    name: 'ishihara'}],
                    button_label: "Next",
                    on_finish: function(data){
                            if(data.responses == correctAnswer){
                                data.correct = 1;  //correct
                            } else {
                                data.correct = 0;}} //incorrect
                    }         
            timeline.push(ishihara_plate) 
            plateCounter[whichPlate] = 1; 
            plateNum++
        }
    }


    // Color Vision check //
    var colorvision = {
        type: 'survey-multi-choice',
        questions: [
            {prompt: "Do you have difficulty seeing colors or noticing differences<br>between colors compared to the average person?",
            options: ["Yes", "No"],
            horizontal: false,
            required: true, 
            name: 'colorDifficulty'},

            {prompt: "Do you consider yourself to be colorblind? ",
            options: ["Yes", "No"],
            horizontal: false,
            required: true, 
            name: 'colorBlind'},

            {prompt: "What device did you use to complete this experiment?",
            options: ["Computer", "Tablet", "Phone", "Other"],
            horizontal: false,
            required: true, 
            name: 'device'}
        ],
        preamble: "",
        button_label: "Done",
        randomize_question_order: false,
        }; 
    timeline.push(colorvision); 



//return {"Red":promptedColorR1, "Green":promptedColorG1, "Blue":promptedColorB1}


//----------- END OF COLOR CALIBRATION -----------------// 
}

