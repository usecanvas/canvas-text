import FontMetrics from './font-metrics';

export default class Cursor {
  constructor(element) {
    // const metrics = new FontMetrics('"Helvetica Neue", sans-serif', '1em');
    // console.log('hi');
    // console.log(metrics);
    // this.container = element;
    // this.context = element.getContext('2d');
    // const measurements = this.context.measureText('Test');
    // console.log(measurements.width);
    // console.log(measurements.height);
    // this.context.fillRect(10, 10, 3, 16);
    // this.focused = false;
  }

  blur() {
    this.focused = false;
  }

  focus() {
    this.focused = true
  }
}
