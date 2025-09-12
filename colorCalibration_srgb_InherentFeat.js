

/*----------------------------------COLOR CALIBRATION ------------------------------------ */

function colorCalibration_srgb() {



/*----------------------------------Part 2: ENTER DESIRED COLOR COORDINATES IN xyY ------------------------------------ */

numColors = 10 //currently includes background color - as last color, 

R = [65,
170,
221,
239,
200,
155,
97,
168,
0,
121
]

G = [145,
123,
101,
99,
129,
148,
160,
168,
0,
121
]

B = [249,
226,
182,
103,
39,
25,
57,
168,
0,
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

