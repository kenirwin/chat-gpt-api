import { config } from 'dotenv';
config();
import axios from 'axios';

export default class WeatherAPI {
  constructor() {
    this.key = process.env.X_RapidAPI_Key;
    this.host = process.env.X_RapidAPI_Host;
    this.url = 'https://meteostat.p.rapidapi.com/stations/daily';
  }

  async PerformGetRequest(headers, params) {
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

  async GetHourlyWeather(params) {
    console.log('starting GetHourlyWeather');
    const headers = {
      'X-RapidAPI-Key': this.key,
      'X-RapidAPI-Host': this.host,
    };
    let result = await this.PerformGetRequest(headers, params);
    return result;
  }
  async GetDailyWeather(params) {
    const headers = {
      'X-RapidAPI-Key': this.key,
      'X-RapidAPI-Host': this.host,
    };
    let result = await this.PerformGetRequest(headers, params);
    return result;
  }

  convertDataToText(data) {
    const labels = {
      date: 'date',
      tavg: 'average temperature in °C',
      tmin: 'minimum temperature in °C',
      tmax: 'maximum temperature in °C',
      prcp: 'precipitation total in mm',
      snow: 'maximum snow depth in mm',
      wdir: 'average wind direction in degrees',
      wspd: 'average wind speed in km/h',
      wpgt: 'peak wind gust in km/h',
      pres: 'average sea-level air pressure in hPa',
      tsun: 'daily sunshine total in minutes',
    };
    let text = '';
    for (const [key, value] of Object.entries(data)) {
      if (value !== null) {
        text += `${labels[key]}: ${value}. `;
      }
    }
    return text;
  }
}
