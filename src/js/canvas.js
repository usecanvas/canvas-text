import FontMetrics from './font-metrics';

export default class Canvas {
  constructor(element, text) {
    this.element = element;
    this.lines = text.split('\n');

    this.redraw();
    window.addEventListener('resize', ::this.redraw);
  }

  redraw() {
    requestAnimationFrame(_ => {
      const width = getComputedStyle(document.querySelector('#content')).width;
      this.element.width = parseInt(width);

      let context = this.element.getContext('2d', { alpha: false });
      const style = getComputedStyle(this.element);
      const metrics = new FontMetrics(style.fontFamily, parseInt(style.fontSize));
      const maxWidth = this.element.width - 64;
      const renderedLines = [];

      context.font = style.font;

      for (const line of this.lines) {
        const wordSplit = /(?:[^\s-]+[ -]?)|(?:[\s-])/g;
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

      const height = offsetY + metrics.height * 1.4285 * renderedLines.length;
      this.element.height = height;

      context.font = style.font;
      context.fillStyle = 'white';
      context.fillRect(0, 0, this.element.width, this.element.height);
      context.fillStyle = style.color;

      for (const line of renderedLines) {
        context.fillText(line, 32, offsetY);
        offsetY += metrics.height * 1.4285;
      }
    });
  }
}
