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
  if (!color) {
    color = makeRGB(composeColor());
  }
  document.body.style.background = color;
}

// Add button to change color
function addBackgroundColorButton(text='Change background color') {
  var button = document.createElement('button');
  button.innerHTML = text;
  button.id = "changeColor";
  button.onclick = function() {
    changeBackground();
  }
  document.body.appendChild(button);
};

// Process user-submitted color channel values
function submitColorChannels() {
  for (var i=0 ; i < document.forms[0].elements.length ; i++) {
    var key = document.forms[0].elements[i].id;
    var value = document.forms[0].elements[i].value;
    if (key && value) {
      if (validate(value)) {
        this.userColors[key] = value;
        console.log(key, i, document.forms[0].elements[i].value);
      }
      else {
        alert("Field " + key + " has unacceptable value " + value);
        return {};
      }
    }
  }
  return this.userColors;
}

// Validate as int in range (0, 255]
function validate(value) {
  return (0 <= value <= 255) && (value - Math.floor(value) === 0);
}

// Add form (with three fields) to submit color
function addColorForm() {
  var form = document.createElement('form');
  document.body.appendChild(form);
 
  // Add ID-ed fields for the colors
  for (var i=0 ; i<this.colors.length ; i++) {
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = colors[i].toUpperCase();
    input.id = this.colors[i];
    form.appendChild(input);
  }

  var formButton = document.createElement('button');
  form.appendChild(formButton);
  formButton.innerHTML = 'Submit color channels';
  formButton.onclick = function() {
    this.userColors = submitColorChannels();
    return false;
  }
}

var colors = ['red', 'green', 'blue'];
var userColors = {};

// Main IIFE
(function() {
  changeBackground();
  addBackgroundColorButton();
  addColorForm();
})();

