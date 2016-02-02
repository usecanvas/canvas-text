import Cursor from './cursor';
import FontMetrics from './font-metrics';

export default class Canvas {
  constructor(element, text) {
    this.cursor = new Cursor(element);
    this.element = element;
    this.focused = false;
    this.lines   = text.split('\n');

    this.bindResize();
    this.bindFocusEvents();
    this.redraw();
  }

  bindFocusEvents() {
    document.addEventListener('click', ::this.blur);
    this.element.addEventListener('click', ::this.click);
  }

  bindResize() {
    window.addEventListener('resize', ::this.redraw);
  }

  blur(event) {
    if (event.target === this.element) {
      return;
    }

    this.focused = false;
    this.cursor.blur();
  }

  click() {
    this.focus();
  }

  focus() {
    this.focused = true;
    this.cursor.focus();
  }

  redraw() {
    requestAnimationFrame(_ => {
      const width = getComputedStyle(document.querySelector('#content')).width;
      this.element.width = parseInt(width);

      let context = this.element.getContext('2d');
      const style = getComputedStyle(this.element);
      const metrics = new FontMetrics(style.fontFamily, parseInt(style.fontSize));
      const maxWidth = this.element.width - 64;
      const renderedLines = [];

      context.font = style.font;

      for (const line of this.lines) {
        const wordSplit = /(?:[^\s-]+-?)|(?:[\s-])/g;
        let renderedLine = '';

        let word;
        while ((word = wordSplit.exec(line))) {
          word = word[0];

          const renderedWidth = context.measureText(renderedLine).width;
          const wordWidth = context.measureText(word).width;

          if (renderedWidth + wordWidth <= maxWidth) {
            renderedLine += word;
          } else {
            renderedLines.push(renderedLine);
            renderedLine = word;
          }
        }

        renderedLines.push(renderedLine);
        renderedLines.push('');
      }

      let offsetY = metrics.height * 3;

      const height = metrics.height * 3 +
        metrics.height * 1.4285 * renderedLines.length;
      this.element.height = height;

      context.font = style.font;
      
      for (const line of renderedLines) {
        context.fillText(line, 32, offsetY);
        offsetY += metrics.height * 1.4285;
      }
    });
  }
}
