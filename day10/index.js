// Load in the Data
const data = require("./data").split("\n");
const dataSample1 = require("./sample").split("\n");
const dataSample2 = require("./sample2").split("\n");

// Turn data into int and sort
data.sort((a, b) => a - b);
data.forEach((int, i) => {
  data[i] = Number(int);
});

dataSample1.sort((a, b) => a - b);
dataSample1.forEach((int, i) => {
  dataSample1[i] = Number(int);
});

dataSample2.sort((a, b) => a - b);
dataSample2.forEach((int, i) => {
  dataSample2[i] = Number(int);
});

/**
 * Check if the sum of two numbers
 * in array are possible
 * @param {Array} Array of integers
 * @return {Object} Object of distances
 */
const getDistance = (arr) => {
  // let return array equal an object with counts of
  // distance between adapters
  let distanceCount = { 1: 0, 2: 0, 3: 0 };

  arr.forEach((adapterVal, i) => {
    // Set value to compare
    let prevVal = 0;

    // Set previous value
    if (i !== 0) {
      prevVal = arr[i - 1];
    }

    let dif = adapterVal - prevVal;

    distanceCount[dif]++;
  });

  // Always add 3 to final count
  distanceCount[3]++;

  return distanceCount;
};

let distCount = getDistance(data);
console.log(
  `1 differences multiplied by 3 differences: ${distCount[1] * distCount[3]}`
);
