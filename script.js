  // Document Setup and Event Listeners
  document.addEventListener('DOMContentLoaded', function() {
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    widthInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
      }
    });
    heightInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
      }
    });
  });
  
  //fetch JSON
  let jsonData = null;
  fetch('config.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    version = jsonData.setup.version;
    const versionElement = document.getElementById('version');
    versionElement.innerHTML = version;
  
  })
  .catch(error => console.error('Error:', error));
  
  //clearing upon refresh
  window.onload = function() {
    clearing();
  };

  function toggleDirection(direction) {
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');

    if (direction === 'left') {
      leftButton.classList.add('active');
      rightButton.classList.remove('active');
      console.log('left');
      // Add logic here for when Left button is clicked
    } else if (direction === 'right') {
      rightButton.classList.add('active');
      leftButton.classList.remove('active');
      console.log('right');
      // Add logic here for when Right button is clicked
    }
  }

  function clearing() {
    //Clear all inputs
    //input clearing
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(input) {
      input.value = '';
    });
    //fraction clearing
    const widthFraction = document.getElementById('widthFraction');
    widthFraction.selectedIndex = 0;
    const heightFraction = document.getElementById('heightFraction');
    heightFraction.selectedIndex = 0;
    //nosing clearing
    const nosing = document.getElementById('nosingCheckbox');
    nosing.checked = false;
    //checkbox clearing
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });
    //result clearing 
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
  }

  function overshoot() {
    // add code here to calculate overshoot
    // if s3 > width, then s3 -= width
    // then s3 * tan(a) = sx (double check this, is it actually that angle?
    // its overshot if greater than width, then it adds sx/s2 to boards
  }

  function stickover(angle, boards) {
    //this function uses the angle and boards to calculate the exact mark of the edge of the board, from here i can add sticks to the s1 and s3
    const over = boards / Math.cos(angle * (Math.PI / 180));
    return over;
  }

  function checkbox(width, hypotenuse2, hypotenuse3, stepsq, checkboxes, stick) {
    if (checkboxes.NS) {
      width -= stick; 
      hypotenuse2 -= 3;
      hypotenuse3 -= 3;
      stepsq -= stick;
    }
    if (checkboxes.NSL) {
      width -= stick; 
    }
    if (checkboxes.NSR) {
      width -= stick;
      hypotenuse2 -= 3; 
    }
    if (checkboxes.NSB) {
      hypotenuse3 -= 3; 
      stepsq -= stick;
    }   
    return {
      width: width,
      hypotenuse2: hypotenuse2,
      hypotenuse3: hypotenuse3,
      stepsq: stepsq
    };
  }

  function calculate() {
    //variable setup
    const winderType = document.getElementById('winderType').value;
    let width = parseFloat(document.getElementById('widthInput').value);
    let height = parseFloat(document.getElementById('heightInput').value);
    const widthFraction = document.getElementById('widthFraction').value;
    const heightFraction = document.getElementById('heightFraction').value;
    const nosing = document.getElementById('nosingCheckbox').checked;
    const NS = document.getElementById('NS');
    const NSL = document.getElementById('NSL');
    const NSR = document.getElementById('NSR');
    const NSB = document.getElementById('NSB');
    if (widthFraction !== "") {
      width += eval(widthFraction);
    }
    if (heightFraction !== "") {
      height += eval(heightFraction);
    }
    
    //grab angles if nosing true
    //const a = jsonData[winderType].angles.a
    let a;
    let b;
    if (nosing) {
      a = jsonData.winders[winderType].nosingangles.a
      b = jsonData.winders[winderType].nosingangles.b
    } else {
      a = jsonData.winders[winderType].angles.a
      b = jsonData.winders[winderType].angles.b
    }

    //new json setup for arguments all in one object
    var JsonObject = {
      "width": width,
      "height": height,
      "winderType": winderType,
      "checkboxes": {
        "NS": NS.checked,
        "NSL": NSL.checked,
        "NSR": NSR.checked,
        "NSB": NSB.checked,
      },
      "nosing": nosing,
      "nosingwidth": jsonData.setup.nosingwidth,
      "stick": jsonData.setup.stick,
      "hangar": jsonData.setup.hangar,
      "board": jsonData.setup.board,
      "angles": jsonData.winders[winderType].angles,
      "shifts": jsonData.winders[winderType].shifts
  };

    const stick = jsonData.setup.stick;
    const hangar = jsonData.setup.hangar;
    const board = jsonData.setup.board;
    //OLD array setup for arguments
    const size = [width, height];
    const checkboxes = [NS, NSL, NSR, NSB];
    const options = [winderType, nosing, stick, hangar, board]; //always can add more options
    const angles = [a, b];
    const shifts = jsonData.winders[winderType].shifts; //in future consider converting all to var or json
    
    // Define a JavaScript object with date-value pairs
    // Initialize an empty array to store the result
    var result = [];

    // Iterate over each property in the json_data object
    for (var i in shifts) {
        // Push an array containing the date (property) and its corresponding value into the 'result' array
        result.push(shifts[i]);
    }

    
    switch(winderType) {
      case '2StepHanger':
      calculate2StepHanger(size, checkboxes, options, angles, shifts);
      break;
      case '3StepHanger':
      calculate3StepHanger(JsonObject);
      break;
      case '2StepDOT':
      calculate2StepDOT(size, checkboxes, options, angles, shifts);
      break;
      case '3StepDOT':
      calculate3StepDOT(JsonObject);
      break;
      case '2Step3_5Post':
      calculate2Step3_5Post(size, checkboxes, options, angles, shifts);
      break;
      case '3Step3_5Post':
      calculate3Step3_5Post(JsonObject);
      break;
      case '2Step5_5Post':
      calculate2Step5_5Post(size, checkboxes, options, angles, shifts);
      break;
      case '3Step5_5Post':
      calculate3Step5_5Post(JsonObject);
      break;
      case '2StepWrap':
      calculate2StepWrap(size, checkboxes, options, angles, shifts);
      break;
      case '3StepWrap':
      calculate3StepWrap(size, checkboxes, options, angles, shifts);
      break;
      default:
      console.error(`Unsupported winder type: ${winderType}`);
    }
  }

  function calculate2StepHanger(size, checkboxes, options, angles, shifts) {
    // Core Math Calculations
    size[0] -= 0.5;
    const s1 = size[0] * Math.tan(angles[0] * (Math.PI / 180));
    const s3 = size[1] * Math.tan(angles[0] * (Math.PI / 180));
    const w2 = Math.sqrt(Math.pow(size[0], 2) + Math.pow(s1, 2));

    if (s3 > size[0]) {
      console.log('s3 is greater than size[0]');
      s3 -= size[0]
      const sx = s3 * Math.tan(angles[0] * (Math.PI / 180));

    }
    
    
    //New Shift Arithmatic
    //everything is added Var + Shift (with possible negative shift)
    width = size[0] + (options[2] * 2) + options[3];
    step1 = s1 + shifts.s1;
    hypotenuse2 = w2 + shifts.h2;
    step2 = null;
    stepx = null;
    hypotenuse3 = null;
    step3 = s3 + shifts.s3;
    stepsq = size[1] + shifts.sq;
    
    
    // Checkbox Arithmetic
    if (NS.checked) {
      width -= 6.5; 
      hypotenuse2 -= 3;
    }
    if (NSL.checked) {
      width -= 3.25; 
    }
    if (NSR.checked) {
      width -= 3.25;
      hypotenuse2 -= 3; 
    }
    if (NSB.checked) {
      hypotenuse2 -= 3; 
    }
    createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3, stepsq);
  }
  
  function calculate3StepHanger(JsonObject) {
    
    // Core Math Calculations
    JsonObject.width -= JsonObject.hangar;
    const s1 = JsonObject.width * Math.tan(JsonObject.angles.a * (Math.PI / 180));
    const s3 = JsonObject.height * Math.tan(JsonObject.angles.b * (Math.PI / 180)); 
    const s2 = JsonObject.height - s1;
    const sx = JsonObject.width - s3;
    const w2 = Math.sqrt(Math.pow(JsonObject.width, 2) + Math.pow(s1, 2));
    const w3 = Math.sqrt(Math.pow(JsonObject.height, 2) + Math.pow(s3, 2));
    const sticka = stickover(JsonObject.angles.a, JsonObject.board);
    const stickb = stickover(JsonObject.angles.b, JsonObject.board);
    
    // Shift Arithmetic
    width = JsonObject.width + (JsonObject.stick * 2) + JsonObject.hangar;
    step1 = s1 - JsonObject.board + sticka + JsonObject.shifts.s1;
    hypotenuse2 = w2 + JsonObject.shifts.h2;
    step2 = s2 - JsonObject.shifts.s2;
    stepx = sx + stickb + JsonObject.shifts.sx;
    hypotenuse3 = w3 + JsonObject.shifts.h3;
    step3 = s3 - stickb + JsonObject.shifts.s3;
    let stepsq; //needed so checkbox doesnt act on it
    stick = (JsonObject.stick * 2);

    //checkbox function
    ({ width, hypotenuse2, hypotenuse3 } = checkbox(width, hypotenuse2, hypotenuse3, stepsq, JsonObject.checkboxes, JsonObject.stick));

    createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3);
  }

  function calculate2StepDOT(size, checkboxes, options, angles, shifts) {
    // Core Math Calculations
    const s1 = size[0] * Math.tan(angles[0] * (Math.PI / 180));
    const s3 = size[1] * Math.tan(angles[1] * (Math.PI / 180));
    const w2 = Math.sqrt(Math.pow(size[0], 2) + Math.pow(s1, 2));
    
    //New Shift Arithmatic
    //everything is added Var + Shift (with possible negative shift)
    width = size[0] + shifts.width;
    step1 = s1 + shifts.s1;
    hypotenuse2 = w2 + shifts.h2;
    step2 = null;
    stepx = null;
    hypotenuse3 = null;
    step3 = s3 + shifts.s3;
    stepsq = size[1] + shifts.sq;
    
    
    // Checkbox Arithmetic
    if (NS.checked) {
      width -= 6.5; 
      hypotenuse2 -= 3;
    }
    if (NSL.checked) {
      width -= 3.25; 
    }
    if (NSR.checked) {
      width -= 3.25;
      hypotenuse2 -= 3; 
    }
    if (NSB.checked) {
      stepsq -= 3.25; 
    }
    createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3, stepsq);
  }
  
  function calculate3StepDOT(JsonObject) {
    
    // Core Math Calculations
    // Need to calculate Inside/Post Triangle to figure exact values
    // post really affects 2 and 3, that first triangle is always exact based on angles

    // Inside Triangle Setup Calculations
    const offseta = Math.cos(JsonObject.angles.a * (Math.PI / 180)) * JsonObject.nosingwidth; //distance from nosing to top of board vert
    const offsetb = Math.cos(JsonObject.angles.a * (Math.PI / 180)) * JsonObject.nosingwidth; //distance from nosing to top of board vert
    // const insidewidth = up / Math.tan(JsonObject.angles.a * (Math.PI / 180));
    // console.log(insidewidth);
    // const insidehypotenuse = Math.sqrt(Math.pow(insidewidth, 2) + Math.pow(up, 2));
    // console.log(insidehypotenuse);
    // All correct, now to add/subtract to the outside triangle
    console.log("strict");
    const s1 = JsonObject.width * Math.tan(JsonObject.angles.a * (Math.PI / 180));
    const s3 = JsonObject.height * Math.tan(JsonObject.angles.b * (Math.PI / 180)); 
    const s2 = JsonObject.height - s1;
    const sx = JsonObject.width - s3;
    const w2 = Math.sqrt(Math.pow(JsonObject.width, 2) + Math.pow(s1, 2));
    const w3 = Math.sqrt(Math.pow(JsonObject.height, 2) + Math.pow(s3, 2));
    const sticka = stickover(JsonObject.angles.a, JsonObject.board);
    const stickb = stickover(JsonObject.angles.b, JsonObject.board);
    
    // Shift Arithmetic
    width = JsonObject.width + JsonObject.stick + JsonObject.shifts.post; //done
    step1 = s1  + offseta - JsonObject.board + sticka; + JsonObject.shifts.post + JsonObject.shifts.s1; //done
    hypotenuse2 = w2 + JsonObject.shifts.h2; //done?
    step2 = s2 - offsetb + JsonObject.shifts.post - JsonObject.shifts.s2; //done
    stepx = sx - JsonObject.board + stickb + JsonObject.shifts.sx; //done
    hypotenuse3 = w3 + JsonObject.shifts.h3; //done (but offset confusing me, need to check)
    step3 = s3 - stickb + JsonObject.shifts.post - JsonObject.board + JsonObject.shifts.s3; //done
    stepsq = JsonObject.height + JsonObject.shifts.post + JsonObject.stick - JsonObject.board; //done
    stick = JsonObject.stick;

    //checkbox function
    ({ width, hypotenuse2, hypotenuse3, stepsq } = checkbox(width, hypotenuse2, hypotenuse3, stepsq, JsonObject.checkboxes, stick));

    
    createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3, stepsq);
  }
  
  function calculate3Step3_5Post(JsonObject) {
      
    // Core Math Calculations
    // Need to calculate Inside/Post Triangle to figure exact values
    // post really affects 2 and 3, that first triangle is always exact based on angles

    // Inside Triangle Setup Calculations
    const offseta = Math.cos(JsonObject.angles.a * (Math.PI / 180)) * JsonObject.nosingwidth; //distance from nosing to top of board vert
    const offsetb = Math.cos(JsonObject.angles.a * (Math.PI / 180)) * JsonObject.nosingwidth; //distance from nosing to top of board vert
    // const insidewidth = up / Math.tan(JsonObject.angles.a * (Math.PI / 180));
    // console.log(insidewidth);
    // const insidehypotenuse = Math.sqrt(Math.pow(insidewidth, 2) + Math.pow(up, 2));
    // console.log(insidehypotenuse);
    // All correct, now to add/subtract to the outside triangle
    const s1 = JsonObject.width * Math.tan(JsonObject.angles.a * (Math.PI / 180));
    const s3 = JsonObject.height * Math.tan(JsonObject.angles.b * (Math.PI / 180)); 
    const s2 = JsonObject.height - s1;
    const sx = JsonObject.width - s3;
    const w2 = Math.sqrt(Math.pow(JsonObject.width, 2) + Math.pow(s1, 2));
    const w3 = Math.sqrt(Math.pow(JsonObject.height, 2) + Math.pow(s3, 2));
    const sticka = stickover(JsonObject.angles.a, JsonObject.board);
    const stickb = stickover(JsonObject.angles.b, JsonObject.board);
    
    
    // Shift Arithmetic
    width = JsonObject.width + JsonObject.stick + JsonObject.shifts.post; //done
    step1 = s1 + offseta - JsonObject.board + sticka + JsonObject.shifts.post + JsonObject.shifts.s1; //done
    hypotenuse2 = w2 + JsonObject.shifts.h2; //done?
    step2 = s2 - offsetb + JsonObject.shifts.post - JsonObject.shifts.s2; //done
    stepx = sx - JsonObject.board + stickb + JsonObject.shifts.sx; //done
    hypotenuse3 = w3 + JsonObject.shifts.h3; //done (but offset confusing me, need to check)
    step3 = s3 - stickb + JsonObject.shifts.post - JsonObject.board + JsonObject.shifts.s3; //done
    stepsq = JsonObject.height + JsonObject.shifts.post + JsonObject.stick - JsonObject.board; //done
    stick = JsonObject.stick;

    //checkbox function
    ({ width, hypotenuse2, hypotenuse3, stepsq } = checkbox(width, hypotenuse2, hypotenuse3, stepsq, JsonObject.checkboxes, stick));

    
    createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3, stepsq);
  }
  
  function calculate3Step5_5Post(JsonObject) {
    
    const s1 = JsonObject.width * Math.tan(JsonObject.angles.a * (Math.PI / 180));
    const s3 = JsonObject.height * Math.tan(JsonObject.angles.b * (Math.PI / 180)); 
    const s2 = JsonObject.height - s1;
    const sx = JsonObject.width - s3;
    const w2 = Math.sqrt(Math.pow(JsonObject.width, 2) + Math.pow(s1, 2));
    const w3 = Math.sqrt(Math.pow(JsonObject.height, 2) + Math.pow(s3, 2));
    const sticka = stickover(JsonObject.angles.a, JsonObject.board);
    const stickb = stickover(JsonObject.angles.b, JsonObject.board);
    
    // Shift Arithmetic
    width = JsonObject.width + JsonObject.stick + JsonObject.shifts.post;
    step1 = s1 - JsonObject.board + sticka + JsonObject.shifts.s1;
    hypotenuse2 = w2 + JsonObject.shifts.h2;
    step2 = s2 - JsonObject.shifts.s2;
    stepx = sx + stickb + JsonObject.shifts.sx;
    hypotenuse3 = w3 + JsonObject.shifts.h3;
    step3 = s3 - stickb + JsonObject.shifts.s3 + JsonObject.shifts.post - JsonObject.board;
    stepsq = JsonObject.height + JsonObject.stick;
    stick = JsonObject.stick;

    //checkbox function
    ({ width, hypotenuse2, hypotenuse3, stepsq } = checkbox(width, hypotenuse2, hypotenuse3, stepsq, JsonObject.checkboxes, stick));

    createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3, stepsq);
  }
  
  function calculate3StepWrap(size, checkboxes, options, angles, shifts) {
    
    // Core Math Calculations
    const s1 = size[0] * Math.tan(angles[0] * (Math.PI / 180));
    const s3 = size[1] * Math.tan(angles[1] * (Math.PI / 180)); 
    const s2 = size[1] - s1;
    const sx = size[0] - s3;
    const w2 = Math.sqrt(Math.pow(size[0], 2) + Math.pow(s1, 2));
    const w3 = Math.sqrt(Math.pow(size[1], 2) + Math.pow(s3, 2));
    
    // Shift Arithmetic
    width = size[0] + shifts.width;
    step1 = s1 + shifts.s1;
    hypotenuse2 = w2 + shifts.h2;
    step2 = s2 + shifts.s2;
    stepx = sx + shifts.sx;
    hypotenuse3 = w3 + shifts.h3;
    step3 = s3 + shifts.s3;
    stepsq = size[1] + shifts.sq;
    
    
    // Checkbox Arithmetic
    if (NS.checked) {
      width -= 3.25; 
      hypotenuse2 -= 3;
      hypotenuse3 -= 3;
      stepsq -= 3.25;
    }
    if (NSL.checked) {
      width -= 3.25; 
    }
    if (NSR.checked) {
      width -= 3.25;
      hypotenuse2 -= 3; 
    }
    if (NSB.checked) {
      hypotenuse3 -= 3; 
      stepsq -= 3.25;
    }
    createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3, stepsq);
  }
  
  function createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3, stepsq) {
    const roundToQuarter = (value) => Math.round(value * 4) / 4; // Rounding to quarter inch
    // Function to convert decimal to fraction
    function toFraction(decimal) {
      const whole = Math.floor(decimal);
      const fraction = decimal - whole;
      
      if (fraction === 0) {
        return `${whole}`;
      }
      
      const tolerance = 1.0e-6;
      let h1 = 1;
      let h2 = 0;
      let k1 = 0;
      let k2 = 1;
      let b = fraction;
      
      // Continued fraction approximation
      do {
        const a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
      } while (Math.abs(fraction - h1 / k1) > fraction * tolerance);
      
      if (whole === 0) {
        return `<sup>${h1}</sup>&frasl;<sub>${k1}</sub>`;
      } else {
        return `${whole} <sup>${h1}</sup>&frasl;<sub>${k1}</sub>`;
      }
    }
    const winderType = document.getElementById('winderType').value;
   
    let resultobj = {
      width: width,
      s1: step1,
      h2: hypotenuse2,
      s2: step2,
      sx: stepx,
      h3: hypotenuse3,
      s3: step3,
      sq: stepsq
    };
    
    function displayResults(resultobj) {
      let result = '';
      
      for (let key in resultobj) {
        if (resultobj[key] !== undefined && resultobj[key] !== null && !isNaN(resultobj[key])
        ) {
          result += `<div class="result-item"><b>${key}:</b> ${toFraction(roundToQuarter(resultobj[key]))}</div><br>`;
        }
      }
      
      return result;
    }
    
    let result = displayResults({ width: width, s1: step1, h2: hypotenuse2, s2: step2, sx: stepx, h3: hypotenuse3, s3: step3, sq: stepsq});
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = result;
    
    
    
  }
  
  
  
  