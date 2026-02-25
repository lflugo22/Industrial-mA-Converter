/**
 * Application Constants
 * Centralized configuration values for the Industrial mA Converter
 */

/**
 * mA Range configurations
 * @type {Object.<string, {min: number, max: number}>}
 */
export const MA_RANGES = {
  '4-20': { min: 4, max: 20 },
  '0-20': { min: 0, max: 20 }
};

/**
 * Default calibration values
 */
export const DEFAULT_CALIBRATION = {
  factor: 1.00,
  offset: 0.00
};

/**
 * Chart color configurations
 */
export const CHART_COLORS = {
  ideal: {
    border: 'rgb(75, 192, 192)',
    background: 'rgba(75, 192, 192, 0.1)'
  },
  actual: {
    border: 'rgb(255, 99, 132)',
    background: 'rgba(255, 99, 132, 0.1)'
  },
  corrected: {
    border: 'rgb(255, 205, 86)',
    background: 'rgba(255, 205, 86, 0.1)'
  },
  scaler: {
    border: 'rgb(54, 162, 235)',
    background: 'rgba(54, 162, 235, 0.1)'
  }
};

/**
 * Conversion type identifiers
 */
export const CONVERSION_TYPES = {
  PARAMETER_TO_MA: 'parameter-to-ma',
  MA_TO_PARAMETER: 'ma-to-parameter'
};

/**
 * Default graph steps for scaler visualization
 */
export const GRAPH_STEPS = 20;
