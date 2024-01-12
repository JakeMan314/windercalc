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
    
    
    function createResult(shiftw, shifts1, shiftw2, shifts2, shiftsx, shiftw3, shifts3) {
  // Displaying the results as mixed fractions if applicable
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
    
    
    function calculate() {
      // Fetching input values
      let width = parseFloat(document.getElementById('widthInput').value);
      const widthFraction = document.getElementById('widthFraction').value;
      let height = parseFloat(document.getElementById('heightInput').value);
      const heightFraction = document.getElementById('heightFraction').value;
      const nosing = document.getElementById('nosingCheckbox').checked;

      // If a fraction is selected, adjust the input values
      if (widthFraction !== "") {
        width += eval(widthFraction);
      }
      if (heightFraction !== "") {
        height += eval(heightFraction);
      }
      
      
	  
	  
	 
    function 3stepwinder() {
      // Subtracting 0.5 from width
      width -= 0.5;
      // Calculating values based on the formula
      const s1 = width * Math.tan(29 * (Math.PI / 180)); // converting degrees to radians
      const s3 = height * Math.tan(31 * (Math.PI / 180)); // converting degrees to radians
      // Calculating S2 and SX
      const s2 = height - s1;
      const sx = width - s3;
      // Calc Diags with Square Root
      const w2 = Math.sqrt(Math.pow(width, 2) + Math.pow(s1, 2));
      const w3 = Math.sqrt(Math.pow(height, 2) + Math.pow(s1, 2));

	  //shift variables
	  const shiftw = 7 + width;
	  const shifts1 = 1 + s1;

	  const shiftw2 = 4 + w2;
	  const shifts2 = 0 + s2;
	  const shiftsx = sx - 1;
	  
	  const shiftw3 = 4 + w3;
	  const shifts3 = 0.5 + s3;
	  }


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


  // Round each answer to the nearest quarter and convert to fractions if needed
  const roundToQuarter = (value) => Math.round(value * 4) / 4;
  
  
 
    }