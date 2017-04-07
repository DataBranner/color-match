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
function addButton(text='Change color') {
  var button = document.createElement('button');
  button.innerHTML = text;
  button.onclick = function(){
    changeBackground();
  };
  document.body.appendChild(button);
};


// Main IIFE
(function() {
  changeBackground();
  addButton();
})();
