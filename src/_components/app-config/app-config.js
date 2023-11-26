import moment from 'moment';

class AppConfig {
  constructor() {
    // Initialize the app config directly with the JSON
    this.appConfig = {
      Logo_URL:
        'https://raw.githubusercontent.com/kmaba/Armadale-Mosque-Screen/main/branding/Logo-White.png',
      Logo_orientation: 'vertical',
      primary_colour: '#31669b',
      secondary_colour: '#254d75',
      primary_text_colour: '#fff',
      secondary_text_colour: '#cef9ff',
      prayer_time_highlight_colour: '#ff3995',
      clock_background_colour: '#cef9ff',
      time_format: 'h:mm:ss A',
      sliderMode: 'slider',
      sliderTimeout: '8000',
      Text_Donate_Message:
        "<p class='top'><i>You can donate by going to</i></p>\n<p class='middle'><img width='170px' src='data:image/png;base64,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'/></p>\n<p class='bottom'><i>please donate generously.</i></p>",
      Alternative_Donate_Message:
        '<p><i>You can donate by</i></p>\n<p><i>contactless</i></p>\n<p><i>cards and phones and cash</i></p>',
      Daily_Message:
        "<p><i>Our mosque needs</i></p>\n<p class='middle'><i>your help</i></p>\n<p><i>in order to expand</i></p>",
      Mobile_Use_Notification:
        '<p><i>Please ensure your</i></p>\n<p><i>mobile phone is silent</i></p>\n<p><i>in the prayer hall</i></p>',
      SingleView_Message:
        '<p><i>Please ensure your</i></p>\n<p><i>mobile phone is silent</i></p>\n<p><i>in the prayer hall</i></p>',
      Jummah_slot_1_label: 'Khutbah',
      Jummah_slot_1_winter: '1:05',
      Jummah_slot_1_summer: '1:05',
      Jummah_slot_2_label: 'Iqamah',
      Jummah_slot_2_winter: '1:30',
      Jummah_slot_2_summer: '1:30',
      blackOutPeriod_fajr: '15',
      blackOutPeriod_zuhr: '15',
      blackOutPeriod_asr: '15',
      blackOutPeriod_maghrib: '17',
      blackOutPeriod_isha: '20',
      blackOutPeriod_jummah: '60',
      refreshRate: 1
    };

    // Set an interval to check for updates every second
    setInterval(() => this.checkForUpdates(), 1000);
  }

  get(key = null) {
    if (!key) return null;
    var data = this.getAppConfig();
    return data ? data[key] : '';
  }

  // Function to check for updates
  checkForUpdates() {
    // Get the current timestamp
    const currentTimestamp = moment().unix();

    // Calculate the time difference since the last update
    const lastUpdatedDiff =
      currentTimestamp - parseInt(this.getLastUpdatedTime());

    // Check if the difference exceeds the refresh rate
    if (lastUpdatedDiff > this.appConfig.refreshRate * 60) {
      // Log a message to the console to indicate an update
      console.log('Updating App Config....');

      // Update the last updated timestamp
      this.storeAppConfigLastUpdated(currentTimestamp);

      // You can perform additional update logic here if needed

      // Log the updated app config
      console.log('Current App Config:', this.appConfig);
    }
  }

  // Function to store the last updated timestamp
  storeAppConfigLastUpdated(timestamp) {
    window.localStorage.setItem('appConfig_lastUpdated', timestamp);
  }

  // Function to get the stored app config
  getAppConfig() {
    return this.appConfig;
  }

  // Function to get the last updated timestamp
  getLastUpdatedTime() {
    return window.localStorage.getItem('appConfig_lastUpdated');
  }
}

export default AppConfig;
