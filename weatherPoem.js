import WeatherAPI from './models/Weather.js';
const weatherAPI = new WeatherAPI();
import Chat from './models/Chat.js';
const chat = new Chat();
import dayjs from 'dayjs';

// get yyyy-mm-dd format for today
const today = dayjs().format('YYYY-MM-DD');
let poemStyle = 'haiku';
let location = 'KOXD0';

(async () => {
  // get today's weather
  const params = {
    station: location,
    start: today,
    end: today,
  };
  let weather = await weatherAPI.GetDailyWeather(params);
  let weatherStr = weatherAPI.convertDataToText(weather.data[0]);
  console.log(weatherStr);
  let weatherReq =
    'Think about the weather conditions given these data' +
    weatherStr +
    ' Write a ' +
    poemStyle +
    ' about the weather. Do not refer to the numbers.';
  //   console.log(weatherReq);
  // convert weather data to human readable text string
  let poem = await chat.getResponse(weatherReq);
  console.log(poem);
})();
