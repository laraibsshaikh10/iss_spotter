// const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require("./iss_promised");

//Require and call the function fetchMyIP in this file. Since this function returns a promise, call .then on its return value. This then call should take in a callback which accepts the response body and, for now, prints it to the screen.
// fetchMyIP()
//   .then(body => console.log(body));


//In index2.js, we should now add a reference to the fetchCoordsByIP function to our promise "chain", using .then(), immediately after the call to fetchMyIp.
  // fetchMyIP()
  // .then(fetchCoordsByIP)
  // .then(body => console.log(body));


  // fetchMyIP()
  // .then(fetchCoordsByIP)
  // .then(fetchISSFlyOverTimes)
  // .then(body => console.log(body));

  const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes 
// copy it from there, or better yet, moduralize and require it in both files

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);

    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds.`);
  }
};
// Call 
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


