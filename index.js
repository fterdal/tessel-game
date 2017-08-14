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

// function addAnswerToArray(arr) {
//   arr.push(Math.random() > 0.5 ? 2 : 1)
//   return arr;
// }

let userCorrect = true;

answerArray = [1, 2, 2, 1, 1, 1, 2];

function playSound (index, prevSound) {
  let oneNum = answerArray[index];
  if(prevSound){
    prevSound.removeEventListener('ended');
  }
  if (oneNum) {
    let sound;
    if(oneNum === 1) sound = oneSound;
    else sound = twoSound;
    console.log(sound);
    console.log(index);
    // sound.removeEventListener();
    sound.play();
    sound.on('ended', function() {
      playSound(index+1, sound);
    })
  }
}
playSound(0);

// function playOne() {
//   oneSound.play();
//   oneSound.on('ended', function(seconds) {
//     twoSound.play();
//   });
// }
// function playOne() {
//   oneSound.play();
// }
// function playTwo() {
//   // twoSound.on('ended', function(seconds) {
//   //   correctSound.play();
//   // });
//   twoSound.play();
// }
// playOne();
// playTwo();

// Step one: Read out the values to the user.
// For Loop
// for(var i = 0; i < answerArray.length; i+=2){
//   let playNext =(answerArray[i+1] === 1) ? playOne : playTwo;
//   if(answerArray[i] === 1){
//     // console.log(nextSound);
//     playOne(playNext);
//   } else {
//     // console.log(nextSound);
//     playTwo(playNext);
//   }
// }

// Step Two: User inputs and compare inputs to answers
// For Loop

// Step Three: If users screwed up, give them the buzzer. Game Over.
// Otherwise, give them the correct sound. (Extra Credit: create another round
// by appending new answers to the answers array)
//


console.log(answerArray)
//
// function playOne() {
// oneSound.play();
// oneSound.on('ended', function(seconds) {
//   twoSound.play();
// });
// }
//
// function playTwo() {
// twoSound.play();
// twoSound.on('ended', function(seconds) {
//   correctSound.play();
// });
// }
//
// correctSound.play();
// correctSound.on('ended', function(seconds) {
//   buzzerSound.play();
// });
//
// buzzerSound.play();

// Turn one of the LEDs on to start.
// tessel.led[2].on();

// Blink!
// setInterval(() => {
//   tessel.led[2].toggle();
//   tessel.led[3].toggle();
// }, 1000);

// console.log("I'm blinking! (Press CTRL + C to stop)");
