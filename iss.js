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
      return callback("Error while requesting IP data: " + error, null);
    }
    //if response code is anything other than 200, show an error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
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

module.exports = { fetchMyIP };