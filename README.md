## Color-match

Page generates a random background color. User submits additional colors which are added to the page's color, with the goal of reaching perfect white (`rgb(255, 255, 255)`). How close the user comes to perfect white is expressed as a "score" at the top of the page.

Features:

 * The browser console logs the updated RGB values for easier manual testing.
 * As much styling and HTML as possible is done via JavaScript.
 * User can request new random background color with a button rather than by reloading the page.
 * User input is validated; only integers are accepted (including negative integers, to aid testing).
 * If User's values bring the value of an RGB channel above 255, the new value is not calculated starting from 0 (by ordinary modulus) but counting down from 255 again (by "palindromic modulus" or triangle wave). For example, if a channel value is 250 and User adds 25, the new value is 
 
   ```
   250 + 5 - 20 => 235
   ```

   rather than 

   ```
   250 + 6 => 0; + 19 => 19
   ```

   Values in [0, 255] figured by ordinary modulus describe a sawtooth wave of period 255; those figured by "palindromic modulus" describe a triangle wave of period 510.

### To do next:

 * Visual color-picker, rather than RGB channel values. Use color wheel, [0, 255], for each RGB channel.
 * Replace `placeholder` with labels.
 * Automated tests.

[end]
