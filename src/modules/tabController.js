/**
 * Tab Controller
 * Handles tab switching functionality
 */

export class TabController {
  /**
   * Create a new TabController
   * @param {Object} options - Configuration options
   * @param {string} options.tabSelector - CSS selector for tab buttons
   * @param {string} options.contentSelector - CSS selector for tab content panels
   * @param {Function} options.onTabChange - Callback when tab changes
   */
  constructor(options) {
    this.tabSelector = options.tabSelector;
    this.contentSelector = options.contentSelector;
    this.onTabChange = options.onTabChange || (() => {});
    
    this.currentTab = null;
    this.init();
  }

  /**
   * Initialize tab event listeners
   */
  init() {
    const tabs = document.querySelectorAll(this.tabSelector);
    
    tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
        const tabName = tab.dataset.tab;
        if (tabName) {
          this.switchTab(tabName, event.target);
        }
      });
    });
    
    // Set initial active tab
    const activeTab = document.querySelector(`${this.tabSelector}.active`);
    if (activeTab) {
      this.currentTab = activeTab.dataset.tab;
    }
  }

  /**
   * Switch to a specific tab
   * 
   * @param {string} tabName - Name of the tab to switch to
   * @param {HTMLElement} clickedTab - The clicked tab element
   */
  switchTab(tabName, clickedTab) {
    // Remove active class from all tabs and contents
    const tabs = document.querySelectorAll(this.tabSelector);
    const contents = document.querySelectorAll(this.contentSelector);
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    if (clickedTab) {
      clickedTab.classList.add('active');
    }
    
    const content = document.getElementById(tabName);
    if (content) {
      content.classList.add('active');
    }
    
    this.currentTab = tabName;
    this.onTabChange(tabName);
  }

  /**
   * Get the currently active tab name
   * @returns {string} Current tab name
   */
  getCurrentTab() {
    return this.currentTab;
  }
}
