var colorNames = ['red', 'green', 'blue'];
var origColor = Array();
var userColor = Array();
var score = String();

// Main IIFE
(function() {
  initializeBackgroundColorButton();
  initializeColorForm();
})();

// ************************
// Initialization functions
// ************************

// Initialize button to change color
function initializeBackgroundColorButton(text='Change background color') {
  changeBackground();
  button = document.createElement('button');
  button.innerHTML = text;
  button.id = "changeColor";
  button.onclick = function() {
    changeBackground();
    document.forms[0].elements['red'].select();
  }
  var table = document.createElement('table');
  table.className = "centered";
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell2.style.backgroundColor = '#ffffff';
  this.score = document.createElement('p');
  cell1.appendChild(button);
  cell2.appendChild(this.score).style.fontWeight = 'bold';
  figureScore(this.origColor);
  document.body.appendChild(table);
};

// Initialize form (with three fields) to submit color
function initializeColorForm() {
  var form = document.createElement('form');
  // Add ID-ed fields for the colors
  for (var i=0 ; i<this.colorNames.length ; i++) {
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = colorNames[i].toUpperCase();
    input.id = colorNames[i];
    input.size = 3;
    input.tabindex = i;
    form.appendChild(input);
  }
  // Create button
  button = document.createElement('button');
  form.appendChild(button);
  button.innerHTML = 'Submit color channels';
  button.onclick = function() {
    submitColorChannels();
    document.forms[0].elements['red'].select();
    color = sumColors();
    figureScore(color);
    changeBackground(color);
    return false;
  }
  // Place form at page bottom
  var div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.bottom = 0;
  div.style.width = "100%"
  var table = document.createElement('table');
  table.className = "centered";
  var row = table.insertRow(0);
  var cell = row.insertCell(0);
  cell.appendChild(form);
  cell.align = 'center';
  document.body.appendChild(div);
  div.appendChild(table);
  document.forms[0].elements['red'].select();
}

// ********************
// Utility functions
// ********************

// Generate a random decimal number 0 <= n <= 255
function rand256() {
  return Math.floor(Math.random() * 256);
}

// Generate a tuple of three random decimal color "channels" (components)
function composeColor() {
  return [rand256(), rand256(), rand256()];
}

// Make 3-tuple into a CSS rgb call
function makeRGB(tuple=[0,0,0]) {
  return "rgb(" + tuple + ")";
}

// Change background to the supplied color
function changeBackground(color) {
  if (!color) { color = composeColor(); }
  this.origColor = color;
  document.body.style.background = makeRGB(color);
  console.log('Current background color: ', color);
  figureScore(color);
}

// Process user-submitted color channel values
function submitColorChannels() {
  var key, value;
  var fields = document.forms[0].elements;
  // Get user-entered values via key-value, but userColor is array.
  for (var i=0 ; i < fields.length ; i++) {
    key = fields[i].id;
    value = fields[i].value;
    if (key) {
      if (validate(value)) { this.userColor[i] = parseInt(value, 10); }
      else {
        if (value == '') {value = '(empty string)';}
        alert('Field "' + key + '" has unacceptable value ' + value);
        return;
      }
    }
  }
  console.log(this.userColor);
  document.forms[0].reset();
}

// Validate as int (or string coercible to int) in range (0, 255]
function validate(value) {
  return (value != '') &&
         (0 <= value <= 255) &&
         (value - Math.floor(value) === 0);
}

/* Calculate "palindrome modulus";
 * Output ranges from 0 to 255.
 * If input % 510 is greater than 255, output is input subtracted from 510.
 * Ordinary modulus would be plotted as a sawtooth wave;
 * this "palindrome modulus" plots as a triangle wave, period (0, 510). */
function palindromeModulus(n) {
  n = n>0 ? n : n+510;
  n = n % 510;
  return n<=255 ? n : 510-n;
}

// Add original colors and user colors
function sumColors() {
  color = [...Array(3).keys()].map(function(n) {
    return palindromeModulus(this.origColor[n]+this.userColor[n]);
  });
  return color;
}

// How close to rgb(255, 255, 255) (perfect score) has user come?
// Treat RGB as three vectors, compute magnitude, and report percent of perfect
function figureScore(color3Tuple) {
  maximum = Math.sqrt(3 * Math.pow(255, 2));
  vector = Math.sqrt(color3Tuple.reduce(function(acc, n) {
    return acc + Math.pow(n,2);
  }, 0));
  percent = (100*vector/maximum).toFixed(1);
  this.score.innerHTML = "Score: " + percent + "%";
}

