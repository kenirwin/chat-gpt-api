// Generic app.js file for ExpressJS
import express from 'express';
const app = express();
const port = 3000;
import stations from './data/weatherApiStations.js';
// import stations from './stations.js'; // Meteostat Locations
// import WeatherAPI from './models/MeteostatWeather.js';
import WeatherAPI from './models/WeatherApi.js';
const weatherAPI = new WeatherAPI();
import Chat from './models/Chat.js';
const chat = new Chat();
import dayjs from 'dayjs';
import allStations from './allStations.js';
import countries from './data/countryCodes.js';

app.get('/', (req, res) => {
  // load file from views folder
  // let myStations = stations.sort((a, b) => a.name.en.localeCompare(b.name.en));
  let myStations = stations.sort();
  res.render('weatherPoem.ejs', { stations });
});

app.get('/weather', async (req, res) => {
  console.log('Weather request', req.query);
  let response = await getWeatherAndPoem(req);
  //   console.log(response);
  res.json(response);
});

app.get('/stations', (req, res) => {
  let stations = allStations
    .filter((station) => (station.inventory.hourly.end = '2023-03-21'))
    .sort((a, b) => a.country.localeCompare(b.country));
  res.render('stations.ejs', { stations, countries });
  //   res.json(stations);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function getWeatherAndPoem(req) {
  // get today's weather
  let today = dayjs().format('YYYY-MM-DD');
  const params = {
    station: req.query.location,
    locationName: req.query.locationName,
    start: today,
    end: today,
  };
  let weather = await weatherAPI.getDailyWeather(params);
  // if (weather.data.length === 0) {
  //   return { poem: 'No weather data for this location', weather: '' };
  // }
  // weather.data[0].hemisphere = req.query.hemisphere;
  // let weatherStr = weatherAPI.convertDataToText(weather.data[0]);
  let weatherStr = weatherAPI.convertDataToText(weather);
  console.log(weatherStr);
  let weatherReq =
    'Think about the weather conditions given these data: ' +
    weatherStr +
    ' Write a ' +
    req.query.poemType +
    ' about the weather in ' +
    req.query.locationName +
    '. Do not refer to the numbers.';
  console.log(weatherReq);
  // convert weather data to human readable text string
  let poem = await chat.getResponse(weatherReq);
  return { poem: poem, weather: weatherStr };
}
