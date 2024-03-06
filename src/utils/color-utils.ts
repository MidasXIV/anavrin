/**
 * Converts a hex color to an RGB array.
 * @param {string} hex - Hex color code.
 * @returns {Array} RGB array.
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}

/**
 * Converts an RGB array to a hex color code.
 * @param {Array} rgb - RGB array.
 * @returns {string} Hex color code.
 */
function rgbToHex(rgb) {
  return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`;
}

/**
 * Interpolates between two colors.
 * @param {string} color1 - Start color.
 * @param {string} color2 - End color.
 * @param {number} factor - Interpolation factor.
 * @returns {Array} Interpolated RGB array.
 */
function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}

/**
 * Interpolates between two hex colors, returning an array of interpolated colors.
 * @param {string} startColor - Start hex color.
 * @param {string} endColor - End hex color.
 * @param {number} steps - Number of interpolation steps.
 * @returns {Array} Array of interpolated hex colors.
 */
function interpolateColors(startColor, endColor, steps) {
  const color1 = hexToRgb(startColor);
  const color2 = hexToRgb(endColor);
  const stepFactor = 1 / (steps - 1);
  const interpolatedColorArray = [];

  for (let i = 0; i < steps; i++) {
    interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
  }

  return interpolatedColorArray.map(rgbToHex);
}

export default interpolateColors;
