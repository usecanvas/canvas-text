/*
 * Vaguely taken from:
 * https://github.com/grassator/canvas-text-editor/blob/6ff2e47a4c235d0d4017875d1153c5277fe80b39/lib/FontMetrics.js
 */
export default class FontMetrics {
  constructor(family, size) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.whiteSpace = 'nowrap';
    container.style.fontFamily = family;
    container.style.fontSize = size;

    document.body.appendChild(container);

    const metricText = 'mmmmmmmmmm';
    container.innerHTML = metricText;

    // Width is less useful, since Canvas has APIs for measuring text width
    this.width = container.offsetWidth / metricText.length;
    this.height = container.offsetHeight;

    const baselineMeasure = document.createElement('span');
    baselineMeasure.style.display = 'inline-block';
    baselineMeasure.style.overflow = 'hidden';
    baselineMeasure.style.width = '1px';
    baselineMeasure.style.height = '1px';
    container.appendChild(baselineMeasure);

    this.baseline = baselineMeasure.offsetTop + baselineMeasure.offsetHeight;

    document.body.removeChild(container);
  }
}
