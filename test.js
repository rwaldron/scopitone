var DCMotor = require('./dcMotor'),
    five = require('johnny-five'),
    board = new five.Board(),
    motor;

board.on('ready', function() {
  motor = new DCMotor(1);

  motor.on('forward', function() {
    console.log('forward');
    setTimeout(function() {
      motor.backward(255)
    }, 100);
  });

  motor.on('backward', function() {
    console.log('backward');
    setTimeout(function() {
      motor.forward(255)
    }, 100);
  });

  motor.backward(255);

});

var shutdown = function () {
  console.log('shutting down...');
  motor.stop();
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);