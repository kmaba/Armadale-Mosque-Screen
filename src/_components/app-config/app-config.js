import moment from 'moment';
import config from '../../config.json';
import axios from 'axios';

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
    return process.env.REACT_APP_APP_CONFIG_SPREADSHEET_URL
      ? process.env.REACT_APP_APP_CONFIG_SPREADSHEET_URL
      : config.configJsons.appConfig;
  }

  getAppConfigFromConfigJsons() {
    var spreadsheetUrl = this.getSpeadsheetUrl();

    if (!spreadsheetUrl) {
      alert('REACT_APP_APP_CONFIG_SPREADSHEET_URL env not set');
    }

    const cacheBust = Math.floor(Math.random() * 1000000);
    const urlWithCacheBust = `${spreadsheetUrl}?cacheBust=${cacheBust}`;

    return axios.get(urlWithCacheBust).then(json => {
      this.storeAppConfig(json.data);
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
      lastUpdatedDiff > config.configJsons.refreshRate * 60 ||
      !this.getAppConfig()
    ) {
      this.getAppConfigFromConfigJsons();
      console.info('Updating App Config....');
    }
  }
}

export default AppConfig;
