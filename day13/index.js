// Load in the Data
const dataRaw = require("./data").split("\n");
const dataSample1Raw = require("./dataSample1").split("\n");

/**
 * internal func to parse data
 * @param {Array} Array for data
 * @return {Array} Array of parsed data
 */
const _parseData = (data) => {
  let measureAfter = data[0];
  let busses = data[1].split(/\D/).filter((value) => value.length > 0);
  return [measureAfter, [...busses]];
};

const dataSample1 = _parseData(dataSample1Raw);
const data = _parseData(dataRaw);

/**
 * Does thing
 * @param {Array} Array for thing
 * @return {Number} position from 1 to 2^(string length)
 */
doThing = (arr) => {
  // Set time of arrival
  let arriveTime = parseInt(arr[0]);

  let departureTimes = {};

  // for each bus time (array of times) calculate departures
  arr[1].forEach((item, i) => {
    // turn time into int
    let routeTime = parseInt(item);
    let departTime = 0;
    for (let t = 0; t < arriveTime + routeTime; t += routeTime) {
      departTime = t;
    }
    departureTimes[item] = departTime;
  });

  // ID of the earliest bus multiplied by the number of minutes
  // you'll need to wait for that bus?
  let earliestBus = "none";
  let timeToWait = 100000;
  for (var bus in departureTimes) {
    if (departureTimes[bus] - data[0] < timeToWait) {
      earliestBus = bus;
      timeToWait = departureTimes[bus] - data[0];
    }
  }

  console.log(
    `ID: ${earliestBus}, wait time: ${timeToWait}. * Together ${
      parseInt(earliestBus) * timeToWait
    }`
  );

  return departureTimes;
};

console.log(data[0]);
console.log(doThing(data));
