/**
 * Scaler Controller
 * Manages mA conversion calculations and UI updates
 */

import { parseNumber, isValidNumber } from '../../utils/validators.js';
import { 
  parameterToMa, 
  maToParameter 
} from '../../utils/calculations.js';
import { formatMaValue, formatParameterValue } from '../../utils/formatters.js';
import { CONVERSION_TYPES } from '../../constants/index.js';

/**
 * ScalerController class
 * Handles the mA scaler tab functionality
 */
export class ScalerController {
  /**
   * Create a new ScalerController
   * @param {CalibrationController} calibrationController - Calibration controller for factor/offset
   */
  constructor(calibrationController) {
    this.calibrationController = calibrationController;
    
    // DOM element references
    this.elements = {
      maRange: document.getElementById('maRange'),
      paramMin: document.getElementById('paramMin'),
      paramMax: document.getElementById('paramMax'),
      inputType: document.getElementById('inputType'),
      inputLabel: document.getElementById('inputLabel'),
      inputValue: document.getElementById('inputValue'),
      result: document.getElementById('scalerResult')
    };
    
    this.init();
  }

  /**
   * Initialize event listeners
   */
  init() {
    // Bind input event listeners
    const inputIds = ['maRange', 'paramMin', 'paramMax', 'inputValue'];
    
    inputIds.forEach(id => {
      const element = this.elements[id];
      if (element) {
        element.addEventListener('input', () => this.update());
      }
    });
    
    // Input type change handler
    if (this.elements.inputType) {
      this.elements.inputType.addEventListener('change', () => {
        this.updateInputLabel();
        this.update();
      });
    }
  }

  /**
   * Get current input values
   * @returns {Object} Current input values
   */
  getInputValues() {
    return {
      maRange: this.elements.maRange?.value || '4-20',
      paramMin: parseNumber(this.elements.paramMin?.value),
      paramMax: parseNumber(this.elements.paramMax?.value),
      inputType: this.elements.inputType?.value || CONVERSION_TYPES.PARAMETER_TO_MA,
      inputValue: parseNumber(this.elements.inputValue?.value)
    };
  }

  /**
   * Update the input label based on conversion type
   */
  updateInputLabel() {
    const inputType = this.elements.inputType?.value;
    const label = this.elements.inputLabel;
    const input = this.elements.inputValue;
    
    if (!label || !input) return;
    
    if (inputType === CONVERSION_TYPES.PARAMETER_TO_MA) {
      label.textContent = 'Parameter Value:';
      input.placeholder = 'Enter parameter value';
    } else {
      label.textContent = 'mA Value:';
      input.placeholder = 'Enter mA value';
    }
  }

  /**
   * Update scaler calculations and display
   */
  update() {
    const inputs = this.getInputValues();
    const { maRange, paramMin, paramMax, inputType, inputValue } = inputs;
    
    // Validate parameter range
    if (!isValidNumber(paramMin) || !isValidNumber(paramMax)) {
      this.hideResult();
      return;
    }
    
    // Calculate and display result if input value is provided
    if (isValidNumber(inputValue)) {
      const result = this.calculateResult(
        inputValue, 
        paramMin, 
        paramMax, 
        maRange, 
        inputType
      );
      this.showResult(result, inputType);
    } else {
      this.hideResult();
    }
  }

  /**
   * Calculate conversion result
   * @returns {number} Calculated result
   */
  calculateResult(value, paramMin, paramMax, maRange, inputType) {
    if (inputType === CONVERSION_TYPES.PARAMETER_TO_MA) {
      return parameterToMa(value, paramMin, paramMax, maRange);
    } else {
      return maToParameter(value, paramMin, paramMax, maRange);
    }
  }

  /**
   * Show result in the display
   */
  showResult(result, inputType) {
    if (!this.elements.result) return;
    
    let resultText;
    if (inputType === CONVERSION_TYPES.PARAMETER_TO_MA) {
      resultText = `<strong>Result:</strong> ${formatMaValue(result)} (corrected output)`;
    } else {
      resultText = `<strong>Result:</strong> ${formatParameterValue(result)} (parameter value)`;
    }
    
    this.elements.result.innerHTML = resultText;
    this.elements.result.style.display = 'block';
  }

  /**
   * Hide the result display
   */
  hideResult() {
    if (this.elements.result) {
      this.elements.result.style.display = 'none';
    }
  }
}
