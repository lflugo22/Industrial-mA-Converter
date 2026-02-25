/**
 * Calibration Controller
 * Manages calibration calculations and UI updates
 */

import { parseNumber, validateCalibrationInputs } from '../../utils/validators.js';
import { applyCorrection, calculateSlope } from '../../utils/calculations.js';
import { formatNumber, formatFactor, formatOffset, formatSlope } from '../../utils/formatters.js';
import { ChartService } from '../../services/chartService.js';

/**
 * CalibrationController class
 * Handles the calibration tab functionality
 */
export class CalibrationController {
  /**
   * Create a new CalibrationController
   * @param {ChartService} chartService - Chart service instance
   */
  constructor(chartService) {
    this.chartService = chartService;
    
    // DOM element references
    this.elements = {
      output1: document.getElementById('output1'),
      output2: document.getElementById('output2'),
      actual1: document.getElementById('actual1'),
      actual2: document.getElementById('actual2'),
      factor: document.getElementById('factor'),
      offset: document.getElementById('offset'),
      corrected1: document.getElementById('corrected1'),
      corrected2: document.getElementById('corrected2'),
      factorDisplay: document.getElementById('factorDisplay'),
      offsetDisplay: document.getElementById('offsetDisplay'),
      slopeDisplay: document.getElementById('slopeDisplay')
    };
    
    this.init();
  }

  /**
   * Initialize event listeners
   */
  init() {
    // Bind input event listeners
    const inputIds = ['output1', 'output2', 'actual1', 'actual2', 'factor', 'offset'];
    
    inputIds.forEach(id => {
      const element = this.elements[id];
      if (element) {
        element.addEventListener('input', () => this.update());
      }
    });
    
    // Initial update
    this.update();
  }

  /**
   * Get current input values
   * @returns {Object} Current input values
   */
  getInputValues() {
    return {
      output1: parseNumber(this.elements.output1?.value),
      output2: parseNumber(this.elements.output2?.value),
      actual1: parseNumber(this.elements.actual1?.value),
      actual2: parseNumber(this.elements.actual2?.value),
      factor: parseNumber(this.elements.factor?.value),
      offset: parseNumber(this.elements.offset?.value)
    };
  }

  /**
   * Update calibration calculations and display
   */
  update() {
    const inputs = this.getInputValues();
    
    // Validate inputs
    const validation = validateCalibrationInputs(inputs);
    if (!validation.valid) {
      console.warn('Calibration validation errors:', validation.errors);
      return;
    }
    
    const { output1, output2, actual1, actual2, factor, offset } = inputs;
    
    // Calculate corrected outputs
    const corrected1 = applyCorrection(actual1, factor, offset);
    const corrected2 = applyCorrection(actual2, factor, offset);
    
    // Calculate slope
    const slope = calculateSlope(output1, output2, actual1, actual2);
    
    // Update display elements
    this.updateDisplay(corrected1, corrected2, factor, offset, slope);
    
    // Update chart
    this.chartService.updateCalibrationChart('calibrationGraph', {
      output1,
      output2,
      actual1,
      actual2,
      corrected1,
      corrected2
    });
  }

  /**
   * Update display elements with calculated values
   */
  updateDisplay(corrected1, corrected2, factor, offset, slope) {
    if (this.elements.corrected1) {
      this.elements.corrected1.textContent = formatNumber(corrected1, 3);
    }
    if (this.elements.corrected2) {
      this.elements.corrected2.textContent = formatNumber(corrected2, 3);
    }
    if (this.elements.factorDisplay) {
      this.elements.factorDisplay.textContent = formatFactor(factor);
    }
    if (this.elements.offsetDisplay) {
      this.elements.offsetDisplay.textContent = formatOffset(offset);
    }
    if (this.elements.slopeDisplay) {
      this.elements.slopeDisplay.textContent = formatSlope(slope);
    }
  }

  /**
   * Get current calibration values
   * @returns {{factor: number, offset: number}} Current calibration values
   */
  getCalibrationValues() {
    const inputs = this.getInputValues();
    return {
      factor: inputs.factor ?? 1,
      offset: inputs.offset ?? 0
    };
  }
}
