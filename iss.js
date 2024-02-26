const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = "https://api.ipify.org?format=json";
  request(url, (error, response, body) => {
    //if error occurs while fetching id data
    if (error) {
      callback("Error while requesting IP data: " + error, null);
      return;
    }
    //if response code is anything other than 200, show an error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error
    try {
      const data = JSON.parse(body);
      callback(null, data.ip);
      //if error occurs while parsing
    } catch (parseError) {
      callback(parseError, null);
    }
  });

};

const fetchCoordsByIP = function(ipString, callback) {
  // const url = `http://ipwhois/app/json/${ipString}`;
  const url = `http://ipwho.is/${ipString}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
  
    //if response code is anything other than 200, show an error
    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(message), null);
      return;
    }
    try {
      //parse the data and then extract latitude and longitude values and insert them into the callback
      const data = JSON.parse(body);

      //if API shows an unsuccessful request, result in an error
      if (!data.success) {
        callback(new Error(`The IP address: ${ipString} is invalid`, null));
        return;
      }

      const { latitude, longitude} = data;
      //pass the latitude and longitude values as an object via callback
      callback(null, {latitude, longitude});
      //if there's an error while parsing
    } catch (parseError) {
      callback(parseError, null);
    }
  });

};/**
* Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
* Input:
*   - An object with keys `latitude` and `longitude`
*   - A callback (to pass back an error or the array of resulting data)
* Returns (via Callback):
*   - An error, if any (nullable)
*   - The fly over times as an array of objects (null if error). Example:
*     [ { risetime: 134564234, duration: 600 }, ... ]
*/
const fetchISSFlyOverTimes = function(coords, callback) {
  // coords are latitude and longitude
  const {latitude, longitude} = coords;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback("Error", error);
      return;
    }
    if (response.statusCode !== 200) {
      callback(new Error(`Status Code error ${response.statusCode}`), null);
      return;
    }
    try {
      const data = JSON.parse(body);
      //data.response refers to the array of flyover times
      callback(null, data.response);
      //to catch any errors that may have happened while parsing
    } catch (parseError) {
      callback(parseError, null);
    }
  });



};




module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };