const request = require('request');

function firstUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const forecast = (lat, long, callback) => {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?lat=' +
    encodeURIComponent(lat) +
    '&lon=' +
    encodeURIComponent(long) +
    '&appid=81bd801c31456a1dfb0ca04ec4de6482&units=metric';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.message == 'Nothing to geocode') {
      callback('Unable to find location', undefined);
    } else if (body.message == 'wrong longitude') {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        firstUpper(body.weather[0].description) +
          '. It is currently ' +
          body.main.temp +
          ' degrees, it feels like ' +
          body.main.feels_like +
          ' degrees'
      );
    }
  });
};

module.exports = forecast;
