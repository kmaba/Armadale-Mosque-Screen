import React, { Component } from 'react';
import './sunrise-and-zawwal.css';
import axios from 'axios';
import moment from 'moment';

class SunriseAndZawwal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sunrise: 'Loading...',
      zawwal: 'Loading...'
    };
  }

  componentDidMount() {
    this.fetchSunriseAndZawwalTime();
  }

  fetchSunriseAndZawwalTime() {
    // Fetch sunrise time
    const sunriseApiUrl =
      'https://api.sunrisesunset.io/json?lat=-31.950527&lng=115.860457'; // Perth's latitude and longitude
    axios
      .get(sunriseApiUrl)
      .then(response => {
        const data = response.data.results;
        const sunriseTime = data.sunrise;
        this.setState({ sunrise: sunriseTime });
      })
      .catch(error => {
        console.error('Error fetching sunrise time:', error);
        this.setState({ sunrise: 'Error' });
      });

    // Fetch solar noon time
    const zawwalApiUrl =
      'https://api.sunrisesunset.io/json?lat=-31.950527&lng=115.860457'; // Perth's latitude and longitude
    axios
      .get(zawwalApiUrl)
      .then(response => {
        const data = response.data.results;
        const solarNoonTime = data.solar_noon;
        this.setState({ zawwal: solarNoonTime });

        // Use moment.js to handle different time formats
        const solarNoonMoment = moment(solarNoonTime, 'h:mm:ss A');
        if (solarNoonMoment.isValid()) {
          const zawwalMoment = solarNoonMoment.clone().add(10, 'minutes');
          this.setState({ zawwal: zawwalMoment.format('h:mm:ss A') });
        } else {
          this.setState({ zawwal: 'Invalid Time' });
        }
      })
      .catch(error => {
        console.error('Error fetching solar noon time:', error);
        this.setState({ zawwal: 'Error' });
      });
  }

  render() {
    return (
      <div className="SunriseAndZawwalWrapper">
        <table className="SunriseAndZawwalTable">
          <thead>
            <tr>
              <th>Sunrise</th>
              <th>Zawwal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.sunrise}</td>
              <td>{this.state.zawwal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SunriseAndZawwal;
