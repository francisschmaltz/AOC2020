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
  let busses = data[1].split(",");
  return [measureAfter, [...busses]];
};

const dataSample1 = _parseData(dataSample1Raw);
const data = _parseData(dataRaw);

/**
 * findEarliestArrival
 * @param {Array} Array for thing
 * @return {Number} position from 1 to 2^(string length)
 */
findEarliestArrival = (arr) => {
  // Set time of arrival
  let arriveTime = parseInt(arr[0]);

  let departureTimes = {};

  // for each bus time (array of times) calculate departures
  // filter out "x" from part 2
  arr[1]
    .filter((value) => value.length > 1)
    .forEach((item, i) => {
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

console.log(findEarliestArrival(data));

// Part two has to do with bigInt in JS. This is NOT solvable with this soltuon – only verafiable
// unless you have DAYS to let this run

// You can use the ruby file ./cheat.rb to get the real answer and check with this
const leastCommonMultipleTime = (arr) => {
  console.log("in func");
  for (let t = 645338524823717n; t < 645338524823719n; t += 1n) {
    console.log("in for loop");
    console.log(t);
    let numberOfTrue = 0;
    arr.forEach((item, i) => {
      if (item !== "x") {
        // console.log(`offset: ${i}, time: ${t} item: ${item}`);
        // console.log(t % parseInt(item));
        if (
          (t % BigInt(item) === 0n && i === 0) ||
          (t + BigInt(i)) % BigInt(item) === 0n
        ) {
          numberOfTrue++;
        } else {
          // False
        }
      } else {
        numberOfTrue++;
      }
    });
    if (numberOfTrue === arr.length) {
      console.log("all true");

      return t;
    }
  }

  return 0;
};

console.log(645338524823718);
console.log(
  `Part Two: Time with asending times: ${leastCommonMultipleTime([...data[1]])}`
);
