var five = require('johnny-five'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter,
	Driver = require('./driver');

// shift register outputs
var	MOTOR1_A = 2,
	MOTOR1_B = 3,
	MOTOR2_A = 1,
	MOTOR2_B = 4,
	MOTOR4_A = 0,
	MOTOR4_B = 6,
	MOTOR3_A = 5,
	MOTOR3_B = 7;

// pwm pins
var MOTOR1 = 11,
	MOTOR2 = 3,
	MOTOR3 = 5,
	MOTOR4 = 6;

var DCMotor = function(motorNumber) {

	this.driver = new Driver();
	this.num = motorNumber;

	switch (this.num) {
		case 1:
			this.a = MOTOR1_A;
			this.b = MOTOR1_B;
			this.pwm = new five.Pin(MOTOR1);
			this.pwm.mode(five.Pin.PWM);
			break;
		case 2:
			this.a = MOTOR2_A;
			this.b = MOTOR2_B;
			this.pwm = new five.Pin(MOTOR2);
			this.pwm.mode(five.Pin.PWM);
			break;
		case 3:
			this.a = MOTOR3_A;
			this.b = MOTOR3_B;
			this.pwm = new five.Pin(MOTOR3);
			this.pwm.mode(five.Pin.PWM);
			break;
		case 4:
			this.a = MOTOR4_A;
			this.b = MOTOR4_B;
			this.pwm = new five.Pin(MOTOR4);
			this.pwm.mode(five.Pin.PWM);
			break;
	}
	this.driver.init();
	this.driver.latchState &= ~1<<this.a & ~1<<this.b;
	this.driver.latchTx();
};

util.inherits(DCMotor, EventEmitter);

DCMotor.prototype.forward = function(speed) {
	//this.pwm.firmata.analogWrite(this.pwm.pin, speed);
	this.pwm.write(speed);
	this.driver.latchState |= 1<<this.a;
	this.driver.latchState &= ~1<<this.b;
	this.driver.latchTx();
	this.emit('forward');
};

DCMotor.prototype.backward = function(speed) {
	//this.pwm.firmata.analogWrite(this.pwm.pin, speed);
	this.pwm.write(speed);
	this.driver.latchState &= ~1<<this.a;
	this.driver.latchState |= 1<<this.b;
	this.driver.latchTx();
	this.emit('backward');
};

DCMotor.prototype.stop = function() {
	this.pwm.low();
	this.driver.latchState &= ~1<<this.a;
	this.driver.latchState &= ~1<<this.b;
	this.driver.latchTx();
	this.emit('stop');
};

module.exports = DCMotor;