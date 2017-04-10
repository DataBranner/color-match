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
function changeBackground(color=this.origColor) {
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
  document.body.appendChild(this.button);
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
  document.body.appendChild(form);
 
  // Add ID-ed fields for the colors
  for (var i=0 ; i<this.colorNames.length ; i++) {
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = colorNames[i].toUpperCase();
    input.id = colorNames[i];
    form.appendChild(input);
  }

  this.formButton = document.createElement('button');
  form.appendChild(this.formButton);
  this.formButton.innerHTML = 'Submit color channels';
  this.formButton.onclick = function() {
    submitColorChannels();
    color = sumColors();
    changeBackground(color);
    return false;
  }
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
  console.log("original color: ", this.origColor);
  color = [...Array(3).keys()].map(function(n) {
    return palindromeModulus(this.origColor[n]+this.userColor[n]);
  });
  console.log('new color; ', color);
  return color;
}

var colorNames = ['red', 'green', 'blue'];
var origColor = null;
var userColor = {};
var button, formButton;

// Main IIFE
(function() {
  changeBackground();
  addBackgroundColorButton();
  addColorForm();
})();

