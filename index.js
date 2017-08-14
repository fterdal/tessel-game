'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');
const path = require('path');
const av = require('tessel-av');

// Import all the audio files
const one = path.join(__dirname, 'one.mp3');
const two = path.join(__dirname, 'two.mp3');
const correct = path.join(__dirname, 'correct.mp3');
const buzzer = path.join(__dirname, 'buzzer.mp3');

// Convert them to a.Player sounds
const oneSound = new av.Player(one);
const twoSound = new av.Player(two);
const correctSound = new av.Player(correct);
const buzzerSound = new av.Player(buzzer);

const answersLength = 6;
let answerArray = [];
for (let i=0; i<answersLength; i++) {
  let newNumber = Math.random() > 0.5 ? 2 : 1;
  answerArray.push( newNumber  );
}
console.log(answerArray);


oneSound.play();
oneSound.on('ended', function(seconds) {
  twoSound.play();
});

twoSound.play();
twoSound.on('ended', function(seconds) {
  correctSound.play();
});

correctSound.play();
correctSound.on('ended', function(seconds) {
  buzzerSound.play();
});

buzzerSound.play();

// Turn one of the LEDs on to start.
// tessel.led[2].on();

// Blink!
// setInterval(() => {
//   tessel.led[2].toggle();
//   tessel.led[3].toggle();
// }, 1000);

// console.log("I'm blinking! (Press CTRL + C to stop)");
