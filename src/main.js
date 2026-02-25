/**
 * Main Application Entry Point
 * Industrial mA Converter
 * 
 * This file initializes all application components and wires them together.
 */

import { TabController } from './modules/tabController.js';
import { CalibrationController } from './modules/calibration/calibrationController.js';
import { ScalerController } from './modules/scaler/scalerController.js';
import { ChartService } from './services/chartService.js';

/**
 * Application class
 * Main application orchestrator
 */
class Application {
  constructor() {
    this.chartService = null;
    this.tabController = null;
    this.calibrationController = null;
    this.scalerController = null;
  }

  /**
   * Initialize the application
   * @param {Chart} chartLibrary - The Chart.js library
   */
  init(chartLibrary) {
    // Initialize chart service with Chart.js
    this.chartService = new ChartService(chartLibrary);
    
    // Initialize calibration controller
    this.calibrationController = new CalibrationController(this.chartService);
    
    // Initialize scaler controller (no chart needed)
    this.scalerController = new ScalerController(this.calibrationController);
    
    // Initialize tab controller
    this.tabController = new TabController({
      tabSelector: '.tab',
      contentSelector: '.tab-content',
      onTabChange: (tabName) => this.handleTabChange(tabName)
    });
    
    console.log('Industrial mA Converter initialized');
  }

  /**
   * Handle tab change events
   * @param {string} tabName - Name of the newly active tab
   */
  handleTabChange(tabName) {
    // Refresh scaler when switching to that tab
    if (tabName === 'scaler') {
      this.scalerController.update();
    }
  }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  
  // Wait for Chart.js to be loaded
  if (typeof Chart !== 'undefined') {
    app.init(Chart);
  } else {
    console.error('Chart.js not loaded. Make sure to include Chart.js before main.js');
  }
});
