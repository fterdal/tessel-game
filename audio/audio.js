// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
- Play audio from an amusing scene between Luke Skywalker, R2-D2 and Yoda
- When the audio reaches the end, play it again from the beginning.
*********************************************/

var path = require('path');
var av = require('tessel-av');
// console.log(__dirname);
var mp3 = path.join(__dirname, 'yoda-mudhole.mp3');
// console.log('mp3: ', mp3);
var sound = new av.Player(mp3);

// console.log("HELLO WORLD!");
sound.play();

sound.on('ended', function(seconds) {
  sound.play();
});


/*
  We need a Game:
    - intended response
    - actual response
    - generate an array of intended responses
    - users create an array of actual responses
    - at the end, if the user's array matches the intended array
      - give them a happy sound
      - if not, give them an electric shock on their collar (batteries included!).
    -

*/
