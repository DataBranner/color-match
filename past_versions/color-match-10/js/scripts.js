// Main IIFE
(function() {
  var colorNames = ['red', 'green', 'blue'];
  var origColor = Array();
  var userColor = Array();
  var score = String();

  initializeBackgroundColorButton();
//  initBGColorButt1();
//  initBGColorButt2();
  initializeColorForm();
  colorizeCircle();

  // ************************
  // Initialization functions
  // ************************

  // Temporary MWE 1
  function initBGColorButt1() {
    changeBackground();
    var div = document.createElement('div');
    document.body.appendChild(div);
    var subDiv1 = document.createElement('div');
    div.appendChild(subDiv1);
    subDiv1.style.display = "block";
    subDiv1.style.margin = "auto";
    subDiv1.style.width = "100%";
    button = document.createElement('button');
    button.innerHTML = 'Change background color';
    subDiv1.appendChild(button);
    var subDiv2 = document.createElement('div');
    subDiv2.style.display = "block";
    subDiv2.style.margin = "auto";
    subDiv2.style.width = "100%";
    div.appendChild(subDiv2);
    subDiv2.className = 'greyBackground';
    score = document.createElement('p');
    subDiv2.appendChild(score).style.fontWeight = 'bold';
    score.innerHTML = 'Score';
  }

  // Temporary MWE 2
  function initBGColorButt2() {
    changeBackground();
    var div = document.createElement('div');
    div.style.display = "block";
    div.style.textAlign = "center";
    document.body.appendChild(div);
    var subDiv1 = document.createElement('div');
    div.appendChild(subDiv1);
    subDiv1.style.display = 'inline';
    button = document.createElement('button');
    button.innerHTML = 'Change background color';
    subDiv1.appendChild(button);
    var subDiv2 = document.createElement('div');
    div.appendChild(subDiv2);
    subDiv2.className = 'greyBackground';
    subDiv2.style.display = 'inline-block';
    score = document.createElement('p');
    subDiv2.appendChild(score).style.fontWeight = 'bold';
    score.innerHTML = 'Score';
  }

  // Initialize button to change color
  function initializeBackgroundColorButton() {
    changeBackground();
    var div = document.createElement('div');
    div.className = "block textAlignCenter";
    document.body.appendChild(div);
    var subDiv1 = document.createElement('div');
    div.appendChild(subDiv1);
    subDiv1.className = 'inline';
    button = document.createElement('button');
    button.innerHTML = 'Change background color';
    button.id = "changeColor";
    button.onclick = function() {
      changeBackground();
      document.forms[0].elements['red'].select();
    }
    subDiv1.appendChild(button);
    var subDiv2 = document.createElement('div');
    div.appendChild(subDiv2);
    subDiv2.className = 'greyBackground inlineBlock';
    score = document.createElement('p');
    subDiv2.appendChild(score).style.fontWeight = 'bold';
    figureScore(origColor);
  };

  // Initialize form (with three fields) to submit color
  function initializeColorForm() {
    // Place form at page bottom
    var div = document.createElement('div');
    div.className = "bottomCenterContainer block";
    var form = document.createElement('form');
    form.className = "inline";
    div.appendChild(form);
    document.body.appendChild(div);
    // Add fields for the colors
    var colorCircle = document.createElement('div');
    colorCircle.className = 'circle block'
    div.appendChild(colorCircle);
    for (var i=0 ; i<colorNames.length ; i++) {
      var input = document.createElement('input');
      input.type = 'number';
      name = colorNames[i];
      input.id = name;
      input.addEventListener('change', colorizeCircle);
      var label = document.createElement('label');
      label.htmlFor = input.id;
      label.className = 'greyBackground';
      label.innerHTML = name[0].toUpperCase() + name.slice(1);
      input.value = 0;
      if (name == 'red') {input.autofocus = 'autofocus';}
      var subDiv = document.createElement('div');
      subDiv.appendChild(label);
      subDiv.appendChild(input);
      subDiv.style.display = "inline";
      form.appendChild(subDiv);
      div.appendChild(form);
    }
    // Create button
    button = document.createElement('button');
    button.type = 'submit';
    form.appendChild(button);
    button.innerHTML = 'Submit color channels';
    button.onclick = function() {
      submitColorChannels();
      document.forms[0].elements['red'].select();
      color = sumColors();
      figureScore(color);
      changeBackground(color);
      for (var i=0 ; i<3 ; i++) {
        input = document.forms[0].elements[i];
        input.value = 0;
      }
      colorizeCircle();
      return false;
    }
    colorizeCircle();
    figureColorChannels();
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
    origColor = color;
    document.body.style.background = makeRGB(color);
    console.log('Current background color: ', color);
    figureScore(color);
  }

  // Computer color from user-submitted color from values
  function figureColorChannels() {
    var id, value;
    var fields = document.forms[0].elements;
    // Get user-entered values via key-value, but userColor is array.
    for (var i=0 ; i < fields.length ; i++) {
      id = fields[i].id;
      if (id) {
        value = document.getElementById(id).value;
        if (value) {
          if (validate(value)) { userColor[i] = parseInt(value, 10) }
          else {
            if (value == '') {value = '(empty string)';}
            alert('Field "' + id + '" has unacceptable value ' + value);
            return;
          }
        }
      }
    }
  }

  // Process user-submitted color channel values
  function submitColorChannels() {
    figureColorChannels();
    console.log('User-submitted color:', userColor);
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
      return palindromeModulus(origColor[n]+userColor[n]);
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
    score.innerHTML = "Score: " + percent + "%";
  }

  // Recolor colorCircle with colors currently in input boxes.
  function colorizeCircle() {
    figureColorChannels();
    var circle = document.getElementsByClassName('circle')[0];
    circle.style.background = makeRGB(userColor);
  }

})();

