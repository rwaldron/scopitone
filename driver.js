var five = require('johnny-five');

var Driver = function() {
	this.latchState = 0;
	// arduino pins that drives the shift register
	this.latch = new five.Pin(12);
	this.clk = new five.Pin(4);
	this.enable = new five.Pin(7);
	this.data = new five.Pin(8);
};

Driver.prototype.init = function() {
	// reset the shift register
	this.latchTx();
	// enable the outputs of the shift register
	this.enable.low();
};

Driver.prototype.latchTx = function() {
	// the cryptic bit banging
	this.latch.low();
	this.data.low();
	for (var i=0; i<8 ; i++) {
		this.clk.low();
		if (this.latchState & 1<<(7-i)) {
			this.data.high();
		}
		else {
			this.data.low();
		}
		this.clk.high();
	}
	this.latch.high();
};

module.exports = Driver;