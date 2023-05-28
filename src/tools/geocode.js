const request = require("request");

const geocode = (address, callback) => {
  const geocodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicmFuaW05OSIsImEiOiJjbGhqcGdjZXUwanVzM2dvZTllYWZzbmR0In0.ZZik_GYGHp6eZgN8u_N-vw"; //for any address

  request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("ERROR: UNABLE TO CONNECT", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length === 0) {
      callback("ERROR: UNABLE TO FIND LOCATION", undefined);
    } else {
      callback(undefined, {
        longtitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;