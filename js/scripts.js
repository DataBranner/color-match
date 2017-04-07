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
  button.onclick = changeBackground();
  document.body.appendChild(button);
};

// stub
function submitColorChannels() {}

// Add form (with three fields) to submit color
function addColorForm() {
  var form = document.createElement('form');
  document.body.appendChild(form);
 
  // Add ID-ed fields for the colors
  var colors = ['red', 'green', 'blue'];
  for (var i=0 ; i<colors.length ; i++) {
    var input = document.createElement('input');
    input.type = 'text';
    input.value = colors[i];
    input.id = colors[i];
    form.appendChild(input);
  }

  var formButton = document.createElement('button');
  formButton.innerHTML = 'Submit color channels';
  formButton.onclick = submitColorChannels();
  form.appendChild(formButton);
}

// Main IIFE
(function() {
  changeBackground();
  addBackgroundColorButton();
  addColorForm();
})();
