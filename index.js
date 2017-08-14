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
const ten = path.join(__dirname, 'ten.mp3');

// Convert them to a.Player sounds
const oneSound = new av.Player(one);
const twoSound = new av.Player(two);
const correctSound = new av.Player(correct);
const buzzerSound = new av.Player(buzzer);
const tenSound = new av.Player(ten);

const answersLength = 6;
let answerArray = [];
for (let i=0; i<answersLength; i++) {
  let newNumber = Math.random() > 0.5 ? 2 : 1;
  answerArray.push( newNumber  );
}

const rfidlib = require('rfid-pn532');

let rfid = rfidlib.use(tessel.port['A'], {
  listen: true,
  delay: 1000
});

// rfid.setPollPeriod( 1000 , err => {
//   console.error(err);
// } )

tenSound.play();


let correctAnswers = [1, 2, 2, 2, 1, 2, 1, 1, 2, 1];
correctAnswers = [1,2];
let arr = [];
// console.log('HELLO WORLD!');



rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {
    // console.log('UID:', card.uid.toString('hex'));
    let thingToPush = card.uid.toString('hex') === '1bf62d0d' ? 1 : 2;
    arr.push(thingToPush);
    if (arr.length >= correctAnswers.length) {
      // console.log('arr:', arr);
      rfid.stopListening(err => {});
      for (let i=0; i<arr.length; i++) {
        if (arr[i] !== correctAnswers[i]) {
          buzzerSound.play();
          return;
        }
      }
      correctSound.play();
    }
  });
});


rfid.on('error', function (err) {
  console.error(err);
});






// function addAnswerToArray(arr) {
//   arr.push(Math.random() > 0.5 ? 2 : 1)
//   return arr;
// }

// Step one: Read out the values to the user.
// For Loop

// Step Two: User inputs and compare inputs to answers
// For Loop

// Step Three: If users screwed up, give them the buzzer. Game Over.
// Otherwise, give them the correct sound. (Extra Credit: create another round
// by appending new answers to the answers array)


answerArray = [1, 2, 2, 1, 1];

console.log(answerArray)
