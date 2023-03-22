// Generic app.js file for ExpressJS
import express from 'express';
const app = express();
const port = 3000;
import stations from './stations.js';
import WeatherAPI from './models/Weather.js';
const weatherAPI = new WeatherAPI();
import Chat from './models/Chat.js';
const chat = new Chat();
import dayjs from 'dayjs';

app.get('/', (req, res) => {
  // load file from views folder
  res.render('index.ejs', { stations: stations });
});

app.get('/weather', async (req, res) => {
  console.log('Weather request', req.query);
  let response = await getWeatherAndPoem(req);
  console.log(response);
  //   let response = {
  //     poem: req.query.poemType + ' goes here',
  //     weather: 'weather for ' + req.query.location + ' goes here',
  //   };
  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function getWeatherAndPoem(req) {
  // get today's weather
  let today = dayjs().format('YYYY-MM-DD');
  const params = {
    station: req.query.location,
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
    req.query.poemType +
    ' about the weather. Do not refer to the numbers.';
  //   console.log(weatherReq);
  // convert weather data to human readable text string
  let poem = await chat.getResponse(weatherReq);
  return { poem: poem, weather: weatherStr };
}
