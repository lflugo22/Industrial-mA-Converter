/**
 * Chart Service
 * Wrapper for Chart.js operations
 */

import { CHART_COLORS } from '../constants/index.js';

/**
 * ChartService class for managing Chart.js instances
 */
export class ChartService {
  /**
   * Create a new ChartService
   * @param {Chart} chartLibrary - The Chart.js library
   */
  constructor(chartLibrary) {
    this.Chart = chartLibrary;
    this.charts = new Map();
  }

  /**
   * Create or update a calibration chart
   * 
   * @param {string} canvasId - Canvas element ID
   * @param {Object} data - Chart data
   * @param {number} data.output1 - First ideal output
   * @param {number} data.output2 - Second ideal output
   * @param {number} data.actual1 - First actual value
   * @param {number} data.actual2 - Second actual value
   * @param {number} data.corrected1 - First corrected value
   * @param {number} data.corrected2 - Second corrected value
   */
  updateCalibrationChart(canvasId, data) {
    const { output1, output2, actual1, actual2, corrected1, corrected2 } = data;
    
    // Destroy existing chart if present
    this.destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
      console.error(`Canvas element '${canvasId}' not found`);
      return;
    }
    
    const chart = new this.Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Ideal Output',
            data: [
              { x: output1, y: output1 },
              { x: output2, y: output2 }
            ],
            borderColor: CHART_COLORS.ideal.border,
            backgroundColor: CHART_COLORS.ideal.background,
            tension: 0
          },
          {
            label: 'Actual Output',
            data: [
              { x: output1, y: actual1 },
              { x: output2, y: actual2 }
            ],
            borderColor: CHART_COLORS.actual.border,
            backgroundColor: CHART_COLORS.actual.background,
            tension: 0
          },
          {
            label: 'Corrected Output',
            data: [
              { x: output1, y: corrected1 },
              { x: output2, y: corrected2 }
            ],
            borderColor: CHART_COLORS.corrected.border,
            backgroundColor: CHART_COLORS.corrected.background,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Output (mA)'
            },
            type: 'linear'
          },
          y: {
            title: {
              display: true,
              text: 'Value (mA)'
            }
          }
        }
      }
    });
    
    this.charts.set(canvasId, chart);
  }

  /**
   * Create or update a scaler chart
   * 
   * @param {string} canvasId - Canvas element ID
   * @param {Array<{x: number, y: number}>} dataPoints - Array of {x, y} data points
   */
  updateScalerChart(canvasId, dataPoints) {
    // Destroy existing chart if present
    this.destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
      console.error(`Canvas element '${canvasId}' not found`);
      return;
    }
    
    const chart = new this.Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Parameter to Corrected mA Output',
          data: dataPoints,
          borderColor: CHART_COLORS.scaler.border,
          backgroundColor: CHART_COLORS.scaler.background,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Parameter Value'
            },
            type: 'linear'
          },
          y: {
            title: {
              display: true,
              text: 'Corrected mA Output'
            }
          }
        }
      }
    });
    
    this.charts.set(canvasId, chart);
  }

  /**
   * Destroy a chart by canvas ID
   * 
   * @param {string} canvasId - Canvas element ID
   */
  destroyChart(canvasId) {
    const chart = this.charts.get(canvasId);
    if (chart) {
      chart.destroy();
      this.charts.delete(canvasId);
    }
  }

  /**
   * Destroy all managed charts
   */
  destroyAll() {
    this.charts.forEach((chart, id) => {
      chart.destroy();
    });
    this.charts.clear();
  }
}
