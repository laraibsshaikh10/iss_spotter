// index.js
// const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

const ipString = "69.89.31.226";
fetchCoordsByIP(ipString, (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned the coordinates:' , coordinates);



  fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }

    console.log('It worked! The ISS flyover times are:' , flyOverTimes);
  });
});