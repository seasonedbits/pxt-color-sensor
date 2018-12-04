# pxt-color-sensor

- for TCS3200 color sensor
- S0, S1 used for output frequency scaling selection inputs. It is preset at 2%.
- S2, S3 used in selection filter type.
- OUT is frequency output pin.
- VCC and GND for supply voltage and ground.
- OE (output enable) is not used in this library, the application can control it
- It takes some time, which the user can specify, to calibrate the sensor. When calibrating the sensor, "C" is shown in the display or you can use the serial monitor for more details.
- check Footnotes for more details.

## Blocks

### Calibration

To calibrate the color sensor. You can specify the calibration time for each color, the longer it takes to calibrate, the more accurate it will be (theoretically).

Connect the sensor to micro:bit. Set up the pins, place the sensor onto a piece of white paper, then start running this block.

### Read Color

Return to color value (0-255) when applying the selected filter.

It takes time `t` (argument of `TSC3200.calibrate()`) for each filter. So to get all RGB values, it takes `3*t`.

## TODO (package)

- [ ] Add a reference for your blocks here
- [x] Add "icon.png" image (300x200) in the root folder
- [ ] Add "- beta" to the GitHub project description if you are still iterating it.
- [ ] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [ ] Get your package reviewed and approved https://makecode.microbit.org/packages/approval

Read more at https://makecode.microbit.org/packages/build-your-own

## License

MIT

## Supported targets

- for PXT/microbit

## Footnotes

datasheet: https://www.mouser.com/catalog/specsheets/TCS3200-E11.pdf
