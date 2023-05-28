const request = require('request');

const forcast = (latitude, longtitude, callback) => {
    const url =
      "https://api.weatherapi.com/v1/current.json?key=432e15daca6644fc861200742231005&q=" +
      latitude + "," + longtitude;// from weatherapi.com
    
    // const url1 = 'http://api.weatherstack.com/current?access_key=4631d3959e815b7a0b617387264d348d&query=cairo';// from weatherstack.com
    // const url2 = 'http://api.weatherstack.com/current?access_key=37928efb9ce83637d3c5d370dff9dbc5&query=egypt';// from weatherstack.com
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback ("Unable to connect weather service", undefined)
      } else if (response.body.error) {
        callback (response.body.error.message, undefined)
      } else {
      //   callback (undefined, `it's ${response.body.current.weather_descriptions[0]} in ${response.body.location.country}, ${response.body.location.name}`) // for weatherstack
        // callback (undefined, `it's ${response.body.current.condition.text} in ${response.body.location.country}, ${response.body.location.name} \n Temperature is ${response.body.current.temp_c}`) // for weatherapi
        callback (undefined, `it's ${response.body.current.condition.text} in ${response.body.location.country}\n Temperature is ${response.body.current.temp_c}`)
      }
    });
  };

module.exports = forcast;