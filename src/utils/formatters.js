/**
 * Formatter Utilities
 * Number and string formatting functions
 */

/**
 * Format a number with specified decimal places
 * 
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export function formatNumber(value, decimals = 3) {
  if (typeof value !== 'number' || isNaN(value)) {
    return '—';
  }
  return value.toFixed(decimals);
}

/**
 * Format a value as mA with units
 * 
 * @param {number} value - mA value
 * @returns {string} Formatted string with mA units
 */
export function formatMaValue(value) {
  return `${formatNumber(value, 3)} mA`;
}

/**
 * Format a parameter value
 * 
 * @param {number} value - Parameter value
 * @returns {string} Formatted parameter string
 */
export function formatParameterValue(value) {
  return formatNumber(value, 3);
}

/**
 * Format a calibration factor
 * 
 * @param {number} factor - Factor value
 * @returns {string} Formatted factor string
 */
export function formatFactor(factor) {
  return formatNumber(factor, 2);
}

/**
 * Format a calibration offset
 * 
 * @param {number} offset - Offset value
 * @returns {string} Formatted offset string
 */
export function formatOffset(offset) {
  return formatNumber(offset, 2);
}

/**
 * Format a slope value
 * 
 * @param {number} slope - Slope value
 * @returns {string} Formatted slope string
 */
export function formatSlope(slope) {
  return formatNumber(slope, 4);
}
