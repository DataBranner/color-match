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
function changeBackground(color="rgb(0,0,0)") {
     document.body.style.background = color;
}


// Main IIFE
(function() {
  changeBackground(makeRGB(composeColor()));
})();
