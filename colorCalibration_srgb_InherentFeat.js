

/*----------------------------------COLOR CALIBRATION ------------------------------------ */

function colorCalibration_srgb() {



/*----------------------------------Part 2: ENTER DESIRED COLOR COORDINATES IN xyY ------------------------------------ */

numColors = 20 //currently includes background color - as last color, 

R = [248,
    248,
    239,
    230,
    221,
    211,
    201,
    191,
    180,
    169,
    104,
    97,
    90,
    82,
    74,
    63,
    51,
    35,
    4,
    121
]

G = [83,
    218,
    221,
    224,
    227,
    230,
    232,
    235,
    237,
    239,
    49,
    52,
    55,
    58,
    61,
    63,
    66,
    68,
    70,
    121
]

B = [92, 
    9,
    12,
    17,
    24,
    31,
    39,
    46,
    54,
    62,
    124,
    128,
    131,
    135,
    138,
    141,
    143,
    145,
    147,
    121
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

