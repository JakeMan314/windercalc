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

  //fetch json types file and set variable
  let jsonData = null;
  fetch('types.json')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    //const shiftValue = data['2StepHanger'].shift.width;
    jsonData = data;
  })
  .catch(error => console.error('Error:', error));


//add angles import from calculate
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
  a = jsonData[winderType].nosingangles.a
  b = jsonData[winderType].nosingangles.b
} else {
  a = jsonData[winderType].angles.a
  b = jsonData[winderType].angles.b
}
//array setup for arguments
const size = [width, height];
const checkboxes = [NS, NSL, NSR, NSB];
const options = [winderType, nosing]; //always can add more options
const angles = [a, b];
const shifts = jsonData[winderType].shifts
console.log(shifts);



  switch(winderType) {
    case '2StepHanger':
      calculate2StepHanger(size, checkboxes, options, angles, shifts);
      break;
    case '3StepHanger':
      calculate3StepHanger(size, checkboxes, options, angles, shifts);
      break;
    case '2StepDOT':
      calculate2StepDOT(size, checkboxes, options, angles, shifts);
      break;
    case '3StepDOT':
      calculate3StepDOT(size, checkboxes, options, angles, shifts);
      break;
    case '2Step3_5Post':
      calculate2Step3_5Post(size, checkboxes, options, angles, shifts);
      break;
    case '3Step3_5Post':
      calculate3Step3_5Post(size, checkboxes, options, angles, shifts);
      break;
    case '2Step5_5Post':
      calculate2Step5_5Post(size, checkboxes, options, angles, shifts);
      break;
    case '3Step5_5Post':
      calculate3Step5_5Post(size, checkboxes, options, angles, shifts);
      break;
    case '2StepWraparound':
      calculate2StepWraparound(size, checkboxes, options, angles, shifts);
      break;
    case '3StepWraparound':
      calculate3StepWraparound(size, checkboxes, options, angles, shifts);
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
  const s2 = size[1] - s1;
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
    hypotenuse2 -= 3; 
  }
  createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3, stepsq);
}

function calculate3StepHanger(size, checkboxes, options, angles, shifts) {

  // Core Math Calculations
  size[0] -= 0.5;
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

  // Checkbox Arithmetic
  if (NS.checked) {
    width -= 6.5; 
    hypotenuse2 -= 3;
    hypotenuse3 -= 3;
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
  }
  createResult(width, step1, hypotenuse2, step2, stepx, hypotenuse3, step3);
}

function calculate3Step3_5Post(size, checkboxes, options, angles, shifts) {

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

function calculate3Step5_5Post(size, checkboxes, options, angles, shifts) {

  // Core Math Calculations
  //width -= 0.5;
  const s1 = width * Math.tan(32 * (Math.PI / 180));
  const s3 = height * Math.tan(24 * (Math.PI / 180)); 
  const s2 = height - s1;
  const sx = width - s3;
  const w2 = Math.sqrt(Math.pow(width, 2) + Math.pow(s1, 2));
  const w3 = Math.sqrt(Math.pow(height, 2) + Math.pow(s3, 2));

  // Shift Arithmetic
  shiftw = width + 5.5;
  shifts1 = s1 + 2.5;
  shiftw2 = w2 + 4;
  shifts2 = s2 + 1;
  shiftsx = sx + 2.5;
  shiftw3 = w3 + 4.5;
  shifts3 = s3 + 5;

  
  // Checkbox Arithmetic
  if (NS.checked) {
    shiftw -= 6.5; 
    shiftw2 -= 3;
    shiftw3 -= 3;
  }
  if (NSL.checked) {
    shiftw -= 3.25; 
  }
  if (NSR.checked) {
    shiftw -= 3.25;
    shiftw2 -= 3; 
  }
  if (NSB.checked) {
    shiftw3 -= 3; 
  }
  createResult(shiftw, shifts1, shiftw2, shifts2, shiftsx, shiftw3, shifts3);
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

   console.log("width", width, "S1", step1, "W2", hypotenuse2, "S2",  step2, "SX",  stepx, "W3",  hypotenuse3, "S3",  step3, "SQ",  stepsq);

  
  
   // Define the 2-step winder types
   const twoStepWinders = ['2StepHanger', '2StepDot', '2Step3_5Post', '2Step5_5Post', '2StepWraparound'];
  // Check if the selected winder type is a 2-step winder
  if (twoStepWinders.includes(winderType)) {
    // If it's a 2-step winder, omit the results for w3 and s3
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
      <div class="result-item">W: ${toFraction(roundToQuarter(width))}</div>
      <div class="result-item">S1: ${toFraction(roundToQuarter(step1))}</div><br>
      <div class="result-item">2W: ${toFraction(roundToQuarter(hypotenuse2))}</div>
      <div class="result-item">S2: ${toFraction(roundToQuarter(step3))}</div>
      <div class="result-item">SQ: ${toFraction(roundToQuarter(stepsq))}</div><br>
    `;
  } else {
    // If it's not a 2-step winder, include the results for w3 and s3
    const resultElement = document.getElementById('result');
  resultElement.innerHTML = `
    <div class="result-item">W: ${toFraction(roundToQuarter(width))}</div>
    <div class="result-item">S1: ${toFraction(roundToQuarter(step1))}</div><br>
    <div class="result-item">2W: ${toFraction(roundToQuarter(hypotenuse2))}</div>
    <div class="result-item">S2: ${toFraction(roundToQuarter(step2))}</div>
    <div class="result-item">SX: ${toFraction(roundToQuarter(stepx))}</div><br>
    <div class="result-item">3W: ${toFraction(roundToQuarter(hypotenuse3))}</div>
    <div class="result-item">S3: ${toFraction(roundToQuarter(step3))}</div>
    <div class="result-item">SQ: ${toFraction(roundToQuarter(stepsq))}</div><br>
    `;
  }


  }
    
    
