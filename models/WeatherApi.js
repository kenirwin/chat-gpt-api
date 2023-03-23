import { config } from 'dotenv';
config();
import axios from 'axios';

export default class WeatherApi {
  constructor() {
    this.key = process.env.WEATHER_API_KEY;
    this.url = 'http://api.weatherapi.com/v1/forecast.json?';
  }
  async performGetRequest(headers, params) {
    let options = {
      method: 'GET',
      url: this.url,
      params: params,
      headers: headers,
    };
    // executes an axios GET request with error catch
    try {
      let response = await axios.request(options);
      // return successful query results to calling function
      return response.data;
    } catch (error) {
      console.error('Error in PerformGetRequest:');
      console.error(error);
    }
  }

  getDailyWeather(input) {
    let headers = {};
    let params = {
      key: this.key,
      q: input.locationName,
      days: 1,
    };
    return this.performGetRequest(headers, params);
  }
  convertDataToText(data) {
    console.log(data);
    let hemisphere = data.location.lat > 0 ? 'Northern' : 'Southern';
    let dayOrNight = data.current.is_day === 1 ? 'daytime' : 'nighttime';
    return (
      'Location: ' +
      data.location.name +
      ', ' +
      data.location.region +
      ', ' +
      data.location.country +
      '.' +
      ' Hemisphere: ' +
      hemisphere +
      ' hemisphere.' +
      ' Temperature in Fahrenheit: ' +
      data.current.temp_f +
      '.' +
      ' Feels Like in Fahrenheit: ' +
      data.current.feelslike_f +
      '.' +
      ' Time of Day: ' +
      dayOrNight +
      '.' +
      ' Weather Condition: ' +
      data.current.condition.text +
      '.' +
      ' Wind Speed in MPH: ' +
      data.current.wind_mph +
      '.' +
      ' Wind Direction: ' +
      data.current.wind_dir +
      '.' +
      ' Percent Humidity: ' +
      data.current.humidity +
      '.' +
      ' Precipitation in inches: ' +
      data.current.precip_in +
      '.' +
      ' Cloud Cover (percent): ' +
      data.current.cloud +
      '.' +
      ' Forecast: ' +
      data.forecast.forecastday[0].day.condition.text +
      '.'
    );
  }
}
