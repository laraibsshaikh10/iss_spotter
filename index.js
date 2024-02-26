// index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// const ipString = "69.89.31.226";
// fetchCoordsByIP(ipString, (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned the coordinates:' , coordinates);



//   fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }

//     console.log('It worked! The ISS flyover times are:' , flyOverTimes);
//   });
// });


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);

    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds.`);
  }
};

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});