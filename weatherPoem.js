import WeatherAPI from './models/Weather.js';
const weatherAPI = new WeatherAPI();
import dayjs from 'dayjs';

// get yyyy-mm-dd format for today
const today = dayjs().format('YYYY-MM-DD');

(async () => {
  // get today's weather
  const params = {
    station: '89009',
    start: today,
    end: today,
  };
  let weather = await weatherAPI.GetDailyWeather(params);
  let weatherStr = weatherAPI.convertDataToText(weather.data[0]);
  console.log(weatherStr);
  let weatherReq =
    'Think about the weather conditions given these data' +
    weatherStr +
    ' Write a sonnet about the weather. Do not refer to the numbers.';
  console.log(weatherReq);
  // convert weather data to human readable text string
})();
