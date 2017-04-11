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
}

// Add button to change color
function addBackgroundColorButton(text='Change background color') {
  this.button = document.createElement('button');
  this.button.innerHTML = text;
  this.button.id = "changeColor";
  this.button.onclick = function() {
    changeBackground();
  }
  var table = document.createElement('table');
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell2.style.backgroundColor = '#ffffff';
  this.score = document.createElement('p');
  cell1.appendChild(this.button);
  cell2.appendChild(this.score).style.fontWeight = 'bold';
  figureScore(this.origColor);
  document.body.appendChild(table);
};

// Process user-submitted color channel values
function submitColorChannels() {
  var key, value;
  for (var i=0 ; i < document.forms[0].elements.length ; i++) {
    key = document.forms[0].elements[i].id;
    value = document.forms[0].elements[i].value;
    if (key) {
      if (validate(value)) { this.userColor[key] = parseInt(value, 10); }
      else {
        if (value == '') {value = '(empty string)';}
        alert('Field "' + key + '" has unacceptable value ' + value);
        return;
      }
    }
  }
  this.userColor = this.colorNames.map(function(n) {
    return this.userColor[n];
  })
  console.log(this.userColor);
  document.forms[0].reset();
}

// Validate as int in range (0, 255]
function validate(value) {
  return (value != '') &&
         (0 <= value <= 255) &&
         (value - Math.floor(value) === 0);
}

// Add form (with three fields) to submit color
function addColorForm() {
  var form = document.createElement('form');

  // Add ID-ed fields for the colors
  for (var i=0 ; i<this.colorNames.length ; i++) {
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = colorNames[i].toUpperCase();
    input.id = colorNames[i];
    input.size = 3;
    form.appendChild(input);
  }

  this.formButton = document.createElement('button');
  form.appendChild(this.formButton);
  this.formButton.innerHTML = 'Submit color channels';
  this.formButton.onclick = function() {
    submitColorChannels();
    document.forms[0].elements['red'].select();
    color = sumColors();
    figureScore(color);
    changeBackground(color);
    return false;
  }
  
  // Place at page bottom
  var table = document.createElement('table');
  table.style.position = 'fixed';
  table.style.bottom = 0;
  var row = table.insertRow(0);
  var cell = row.insertCell(0);
  cell.appendChild(form);
  cell.align = 'center';
  document.body.appendChild(table);
  
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

//
function figureScore(color3Tuple) {
  maximum = Math.sqrt(3 * Math.pow(255, 2));
  vector = Math.sqrt(color3Tuple.reduce(function(acc, n) {
    return acc + Math.pow(n,2);
  }, 0));
  percent = (100*vector/maximum).toFixed(1);
  this.score.innerHTML = "Score: " + percent + "%";
}

var colorNames = ['red', 'green', 'blue'];
var origColor = null;
var userColor = {};
var button, formButton;
var score = '';

// Main IIFE
(function() {
  changeBackground();
  addBackgroundColorButton();
  addColorForm();
  document.forms[0].elements['red'].select(); // How can we have only one of these?
})();

