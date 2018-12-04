enum color {
  //%block="RED"
  RED,
  //%block="GREEN"
  GREEN,
  //%block="BLUE"
  BLUE
}
//%color=#A9BCF5 icon="\uf1fc" block="TCS3200 Color Sensor"
namespace TCS3200 {
  let s2: number;
  let s3: number;
  let wavecount: number = 0;
  let time = 0;
  let r_factor: number;
  let g_factor: number;
  let b_factor: number;

  function resetWavecount(t: number): void {
    wavecount = 0;
    basic.pause(t);
  }

  /**
   * Calibrate the sensor.
   * @param t waiting time; eg: 50, 10, 30, 100, 1000
   */
  //%block="Calibrate|S0 %S0|S1 %S1|S3 %S3|S2 %S2|OUT %OUT|time (ms)%t"
  //%blockExternalInputs=true
  export function calibrate(
    S0: DigitalPin,
    S1: DigitalPin,
    S2: DigitalPin,
    S3: DigitalPin,
    OUT: DigitalPin,
    t: number
  ): void {
    s2 = S2;
    s3 = S3;
    time = t;

    // set output frequency scale to 2%
    pins.digitalWritePin(S0, 0);
    pins.digitalWritePin(S1, 1);

    // approx. wave freq count
    pins.onPulsed(OUT, PulseValue.Low, function() {
      wavecount++;
    });

    // start calibration
    serial.writeLine("Calibrating TCS3200");
    basic.showString("C");
    pins.digitalWritePin(s2, 0);
    pins.digitalWritePin(s3, 0);
    resetWavecount(time);
    r_factor = 255 / wavecount;
    pins.digitalWritePin(s2, 1);
    pins.digitalWritePin(s3, 1);
    resetWavecount(time);
    g_factor = 255 / wavecount;
    pins.digitalWritePin(s2, 0);
    pins.digitalWritePin(s3, 1);
    resetWavecount(time);
    b_factor = 255 / wavecount;
    serial.writeLine("Calibration completed");
    basic.clearScreen();
  }

  //%block="Read Color: %choice"
  export function readColor(filter: color): number {
    let ret: number;
    switch (filter) {
      case color.RED:
        pins.digitalWritePin(s2, 0);
        pins.digitalWritePin(s3, 0);
        resetWavecount(time);
        ret = wavecount * r_factor;
        break;
      case color.GREEN:
        pins.digitalWritePin(s2, 1);
        pins.digitalWritePin(s3, 1);
        resetWavecount(time);
        ret = wavecount * g_factor;
        break;
      case color.BLUE:
        pins.digitalWritePin(s2, 0);
        pins.digitalWritePin(s3, 1);
        resetWavecount(time);
        ret = wavecount * b_factor;
        break;
    }
    if (ret <= 255) {
      return ret;
    } else {
      return 255;
    }
  }
}
