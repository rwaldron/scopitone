var DCMotor = require('./dcMotor'),
    five = require('johnny-five'),
    board = new five.Board();

board.on('ready', function() {
  var motor = new DCMotor(1);

  motor.on('forward', function() {
    console.log('forward');
    setTimeout(function() {
      motor.backward()
    }, 1000);
  });

  motor.on('backward', function() {
    console.log('backward');
    setTimeout(function() {
      motor.forward()
    }, 1000);
  });

  motor.backward();

});