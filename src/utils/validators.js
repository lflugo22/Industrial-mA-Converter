/**
 * Validation Utilities
 * Input validation functions
 */

/**
 * Check if a value is a valid number
 * 
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid number
 */
export function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Parse a value to a number, returning null if invalid
 * 
 * @param {*} value - Value to parse
 * @returns {number|null} Parsed number or null
 */
export function parseNumber(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  
  const parsed = parseFloat(value);
  return isValidNumber(parsed) ? parsed : null;
}

/**
 * Validate parameter range
 * 
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {{valid: boolean, error?: string}} Validation result
 */
export function validateParameterRange(min, max) {
  if (!isValidNumber(min) || !isValidNumber(max)) {
    return { valid: false, error: 'Invalid parameter values' };
  }
  
  if (min >= max) {
    return { valid: false, error: 'Minimum must be less than maximum' };
  }
  
  return { valid: true };
}

/**
 * Validate mA range key
 * 
 * @param {string} rangeKey - Range key to validate
 * @returns {boolean} True if valid range key
 */
export function isValidMaRange(rangeKey) {
  return rangeKey === '4-20' || rangeKey === '0-20';
}

/**
 * Validate calibration inputs
 * 
 * @param {Object} inputs - Calibration input values
 * @returns {{valid: boolean, errors: string[]}} Validation result with errors array
 */
export function validateCalibrationInputs(inputs) {
  const errors = [];
  const { output1, output2, actual1, actual2, factor, offset } = inputs;
  
  if (!isValidNumber(output1)) errors.push('Output 1 is invalid');
  if (!isValidNumber(output2)) errors.push('Output 2 is invalid');
  if (!isValidNumber(actual1)) errors.push('Actual 1 is invalid');
  if (!isValidNumber(actual2)) errors.push('Actual 2 is invalid');
  if (!isValidNumber(factor)) errors.push('Factor is invalid');
  if (!isValidNumber(offset)) errors.push('Offset is invalid');
  
  if (output1 === output2) {
    errors.push('Output values cannot be equal');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
