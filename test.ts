// tests go here; this will not be compiled when this package is used as a library
let blue = 0;
let green = 0;
let red = 0;
let cal = false;

/*
S0  P12 | S3  P14
S1  P2  | S2  P15
OE  P13 | OUT P16
GND GND | VCC 3.3V
*/
input.onButtonPressed(Button.A, function() {
  TCS3200.calibrate(
    DigitalPin.P12,
    DigitalPin.P2,
    DigitalPin.P14,
    DigitalPin.P15,
    DigitalPin.P16,
    50
  );
  cal = false;
});
cal = true;
basic.forever(function() {
  if (!cal) {
    red = TCS3200.readColor(color.RED);
    green = TCS3200.readColor(color.GREEN);
    blue = TCS3200.readColor(color.BLUE);
    serial.writeLine("RED: " + red);
    serial.writeLine("GREEN: " + green);
    serial.writeLine("BLUE: " + blue);
    serial.writeLine("");
  }
});
