

/*----------------------------------COLOR CALIBRATION ------------------------------------ */

function colorCalibration_srgb() {



/*----------------------------------Part 2: ENTER DESIRED COLOR COORDINATES IN xyY ------------------------------------ */

numColors = 36 //currently includes background color - as last color, 

R = [224,
  253,
  255,
  180,
  2,
  6,
  27,
  160,
  239,
  183,
  128,
  248,
  192,
  125,
  250,
  196,
  130,
  205,
  150,
  97,
  134,
  88,
  19,
  138,
  85,
  25,
  146,
  94,
  36,
  199,
  148,
  100,
  0,
  146,
  255,
  122  
]

G = [62,
  151,
  223,
  216,
  186,
  196,
  159,
  70,
  153,
  99,
  43,
  191,
  137,
  73,
  230,
  175,
  110,
  225,
  171,
  119,
  212,
  164,
  105,
  216,
  162,
  108,
  196,
  143,
  91,
  161,
  107,
  53,
  0,
  141,
  252,
  121
]

B = [72,
  37,
  21,
  49,
  116,
  185,
  216,
  197,
  147,
  96,
  49,
  147,
  96,
  37,
  137,
  90,
  33,
  138,
  94,
  46,
  166,
  123,
  71,
  206,
  156,
  105,
  227,
  174,
  124,
  226,
  171,
  119,
  0,
  150,
  255,
  120  
    ]



  var Rval = new Array(numColors).fill(0)
  var Gval = new Array(numColors).fill(0)
  var Bval = new Array(numColors).fill(0)
  

  for (var i = 0; i<numColors; i++){
    Rval[i] = Math.round(R[i]);
    Gval[i] = Math.round(G[i]);
    Bval[i] = Math.round(B[i]);
  }




// Set background color to gray - last color in calibration list //
document.body.style.backgroundColor = "rgb("+Rval[numColors-1]+","+Gval[numColors-1]+","+Bval[numColors-1]+")" 

rBackground = Rval[numColors-1]
gBackground = Gval[numColors-1]
bBackground = Bval[numColors-1]

var promptedColorR1 = Rval
var promptedColorG1 = Gval
var promptedColorB1 = Bval


return {"Red":promptedColorR1, "Green":promptedColorG1, "Blue":promptedColorB1}


//----------- END OF COLOR CALIBRATION -----------------// 
}

