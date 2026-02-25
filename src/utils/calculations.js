/**
 * Calculation Utilities
 * Pure functions for mA conversion calculations
 * 
 * These functions have no side effects and can be easily unit tested.
 */

import { MA_RANGES } from '../constants/index.js';

/**
 * Convert a parameter value to mA output
 * 
 * @param {number} paramValue - The parameter value to convert
 * @param {number} paramMin - Parameter range minimum
 * @param {number} paramMax - Parameter range maximum
 * @param {string} maRangeKey - mA range key ('4-20' or '0-20')
 * @returns {number} The calculated mA value
 * 
 * @example
 * // Convert pH 7 to mA (pH 0-14 scale, 4-20 mA)
 * parameterToMa(7, 0, 14, '4-20') // returns 12
 */
export function parameterToMa(paramValue, paramMin, paramMax, maRangeKey) {
  const range = MA_RANGES[maRangeKey];
  if (!range) {
    throw new Error(`Invalid mA range key: ${maRangeKey}`);
  }
  
  const paramSpan = paramMax - paramMin;
  if (paramSpan === 0) {
    throw new Error('Parameter min and max cannot be equal');
  }
  
  const maSpan = range.max - range.min;
  return ((paramValue - paramMin) * maSpan / paramSpan) + range.min;
}

/**
 * Convert an mA value to parameter value
 * 
 * @param {number} maValue - The mA value to convert
 * @param {number} paramMin - Parameter range minimum
 * @param {number} paramMax - Parameter range maximum
 * @param {string} maRangeKey - mA range key ('4-20' or '0-20')
 * @returns {number} The calculated parameter value
 * 
 * @example
 * // Convert 12 mA to pH (pH 0-14 scale, 4-20 mA)
 * maToParameter(12, 0, 14, '4-20') // returns 7
 */
export function maToParameter(maValue, paramMin, paramMax, maRangeKey) {
  const range = MA_RANGES[maRangeKey];
  if (!range) {
    throw new Error(`Invalid mA range key: ${maRangeKey}`);
  }
  
  const paramSpan = paramMax - paramMin;
  const maSpan = range.max - range.min;
  
  if (maSpan === 0) {
    throw new Error('Invalid mA range: span is zero');
  }
  
  return ((maValue - range.min) * paramSpan / maSpan) + paramMin;
}

/**
 * Apply calibration correction to an actual measured value
 * 
 * @param {number} actual - The actual measured value
 * @param {number} factor - Calibration factor (multiplier)
 * @param {number} offset - Calibration offset (additive)
 * @returns {number} The corrected value
 * 
 * @example
 * applyCorrection(4.05, 1.00, -0.05) // returns 4.00
 */
export function applyCorrection(actual, factor, offset) {
  return actual * factor + offset;
}

/**
 * Calculate the slope between two measurement points
 * 
 * @param {number} output1 - First ideal output value
 * @param {number} output2 - Second ideal output value
 * @param {number} actual1 - First actual measured value
 * @param {number} actual2 - Second actual measured value
 * @returns {number} The calculated slope
 * 
 * @example
 * calculateSlope(4, 20, 4.1, 20.2) // returns ~1.0125
 */
export function calculateSlope(output1, output2, actual1, actual2) {
  const outputSpan = output2 - output1;
  
  if (outputSpan === 0) {
    throw new Error('Output values cannot be equal');
  }
  
  return (actual2 - actual1) / outputSpan;
}

/**
 * Generate data points for the scaler graph
 * 
 * @param {number} paramMin - Parameter range minimum
 * @param {number} paramMax - Parameter range maximum
 * @param {string} maRangeKey - mA range key
 * @param {number} steps - Number of data points to generate
 * @returns {Array<{x: number, y: number}>} Array of {x, y} data points
 */
export function generateScalerGraphData(paramMin, paramMax, maRangeKey, steps = 20) {
  const data = [];
  const paramSpan = paramMax - paramMin;
  
  for (let i = 0; i <= steps; i++) {
    const param = paramMin + (paramSpan * i / steps);
    const ma = parameterToMa(param, paramMin, paramMax, maRangeKey);
    data.push({ x: param, y: ma });
  }
  
  return data;
}
