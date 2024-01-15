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

function calculate() {
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
  const DW = document.getElementById('DW');
if (widthFraction !== "") {
  width += eval(widthFraction);
}
if (heightFraction !== "") {
  height += eval(heightFraction);
}

  switch(winderType) {
    case '2StepHanger':
      calculate2StepHanger(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '3StepHanger':
      calculate3StepHanger(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '2StepDOT':
      calculate2StepDOT(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '3StepDOT':
      calculate3StepDOT(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '2Step3_5Post':
      calculate2Step3_5Post(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '3Step3_5Post':
      calculate3Step3_5Post(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '2Step5_5Post':
      calculate2Step5_5Post(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '3Step5_5Post':
      calculate3Step5_5Post(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '2StepWraparound':
      calculate2StepWraparound(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    case '3StepWraparound':
      calculate3StepWraparound(width, height, nosing, NS, NSL, NSR, NSB, DW);
      break;
    default:
      console.error(`Unsupported winder type: ${winderType}`);
  }
}

function calculate2StepHanger(width, height, nosing, NS, NSL, NSR, NSB, DW) {
// Core Math Calculations
  width -= 0.5;
  const s1 = width * Math.tan(45 * (Math.PI / 180));
  const s3 = height * Math.tan(45 * (Math.PI / 180));
  //const s2 = height - s1;
  //const sx = width - s3;
  const w2 = Math.sqrt(Math.pow(width, 2) + Math.pow(s1, 2));
  //const w3 = Math.sqrt(Math.pow(height, 2) + Math.pow(s1, 2));
  // Shift Arithmetic
  shiftw = 7 + width;
  shifts1 = 1.5 + s1;
  shiftw2 = 4 + w2;
  //shifts2 = 0 + s2;
  //shiftsx = sx - 1;
  //shiftw3 = 4 + w3;
  shifts3 = s3 - 0.5;
  shiftsq = height + 3;
  console.log(height);
  console.log(shiftsq);

  // Checkbox Arithmetic
  if (NS.checked) {
    shiftw -= 6.5; 
    shiftw2 -= 3;
    //shiftw3 -= 3;
  }
  if (NSL.checked) {
    shiftw -= 3.25; 
  }
  if (NSR.checked) {
    shiftw -= 3.25;
    shiftw2 -= 3; 
  }
  if (NSB.checked) {
    shiftw2 -= 3; 
  }
  if (DW.checked) {
    //Add DW Boards? 
  }
  createResult(shiftw, shifts1, shiftw2, shifts3, shiftsq);
}

function calculate3StepHanger(width, height, nosing, NS, NSL, NSR, NSB, DW) {

  // Core Math Calculations
  width -= 0.5;
  const s1 = width * Math.tan(29 * (Math.PI / 180));
  const s3 = height * Math.tan(31 * (Math.PI / 180)); 
  const s2 = height - s1;
  const sx = width - s3;
  const w2 = Math.sqrt(Math.pow(width, 2) + Math.pow(s1, 2));
  const w3 = Math.sqrt(Math.pow(height, 2) + Math.pow(s3, 2));

  // Shift Arithmetic
  shiftw = width + 7;
  shifts1 = s1 + 2.5;
  shiftw2 = w2 + 4;
  shifts2 = s2 + 1;
  shiftsx = sx + 2.5;
  shiftw3 = w3 + 4;
  shifts3 = s3 - 0.5;

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
  if (DW.checked) {
    //Add DW Boards? 
  }
  createResult(shiftw, shifts1, shiftw2, shifts2, shiftsx, shiftw3, shifts3);
}

function calculate3Step5_5Post(width, height, nosing, NS, NSL, NSR, NSB, DW) {

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
  if (DW.checked) {
    //Add DW Boards? 
  }
  createResult(shiftw, shifts1, shiftw2, shifts2, shiftsx, shiftw3, shifts3);
 }
 


    function createResult(shiftw, shifts1, shiftw2, shifts2, shiftsx, shiftw3, shifts3, shiftsq) {
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
   // Define the 2-step winder types
   const twoStepWinders = ['2StepHanger', '2StepDot', '2Step3_5Post', '2Step5_5Post', '2StepWraparound'];
 
  // Check if the selected winder type is a 2-step winder
  if (twoStepWinders.includes(winderType)) {
    // If it's a 2-step winder, omit the results for w3 and s3
    console.log(shiftsq);
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
      <div class="result-item">W: ${toFraction(roundToQuarter(shiftw))}</div>
      <div class="result-item">S1: ${toFraction(roundToQuarter(shifts1))}</div><br>
      <div class="result-item">2W: ${toFraction(roundToQuarter(shiftw2))}</div>
      <div class="result-item">S2: ${toFraction(roundToQuarter(shifts2))}</div>
      <div class="result-item">SX: ${toFraction(roundToQuarter(shiftsx))}</div><br>
      <div class="result-item">SQ: ${toFraction(roundToQuarter(shiftsq))}</div><br>
    `;
  } else {
    // If it's not a 2-step winder, include the results for w3 and s3
    const resultElement = document.getElementById('result');
  resultElement.innerHTML = `
    <div class="result-item">W: ${toFraction(roundToQuarter(shiftw))}</div>
    <div class="result-item">S1: ${toFraction(roundToQuarter(shifts1))}</div><br>
    <div class="result-item">2W: ${toFraction(roundToQuarter(shiftw2))}</div>
    <div class="result-item">S2: ${toFraction(roundToQuarter(shifts2))}</div>
    <div class="result-item">SX: ${toFraction(roundToQuarter(shiftsx))}</div><br>
    <div class="result-item">3W: ${toFraction(roundToQuarter(shiftw3))}</div>
    <div class="result-item">S3: ${toFraction(roundToQuarter(shifts3))}</div>
    `;
  }


  }
    
    

