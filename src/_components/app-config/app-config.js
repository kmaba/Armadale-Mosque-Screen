import moment from 'moment';

class AppConfig {
  constructor() {
    this.updateData();
  }

  get(key = null) {
    if (!key) return null;
    var data = this.getAppConfig();
    return data ? data[key] : '';
  }

  getSpeadsheetUrl() {
    return (
      process.env.REACT_APP_APP_CONFIG_SPREADSHEET_URL || '../../appConfig.json'
    ); // Adjust the path accordingly
  }

  getAppConfigFromConfigJsons() {
    var spreadsheetUrl = this.getSpeadsheetUrl();

    if (!spreadsheetUrl) {
      alert('REACT_APP_APP_CONFIG_SPREADSHEET_URL env not set');
    }

    return fetch(spreadsheetUrl)
      .then(response => response.json())
      .then(data => {
        this.storeAppConfig(data);
      })
      .catch(error => {
        console.error('Error fetching appConfig:', error);
      });
  }

  storeAppConfig(_appConfig = []) {
    window.localStorage.setItem('appConfig', JSON.stringify(_appConfig));
    window.localStorage.setItem('appConfig_lastUpdated', moment().unix());
  }

  getAppConfig() {
    var _appConfig = window.localStorage.getItem('appConfig');
    return _appConfig ? JSON.parse(_appConfig) : null;
  }

  getLastUpdatedTime() {
    return window.localStorage.getItem('appConfig_lastUpdated');
  }

  updateData() {
    var lastUpdatedDiff = moment().unix() - parseInt(this.getLastUpdatedTime());
    if (
      lastUpdatedDiff > 1 * 60 || // assuming a default refresh rate of 1 minute
      !this.getAppConfig()
    ) {
      this.getAppConfigFromConfigJsons();
      console.info('Updating App Config....');
    }
  }
}

export default AppConfig;
