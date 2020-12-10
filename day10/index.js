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
 * Get distance between every preceding item
 * in array
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

/**
 * Get number of possible combinations
 * of adapters
 * @param {Array} Array of integers
 * @return {Number} Int of combos
 */
const getArrangementCount = (arr) => {};

/**
 * Create every permutation of arr
 * @param {Array} Array of integers
 * @return {Number} Int of valid permutations
 */
const getValidPermutations = (arr) => {
  // add 0 and device (highest+3) value
  // to array
  arr.unshift(0);
  arr.push(arr[arr.length - 1] + 3);

  console.log(arr);

  // create new array that's empty until we add
  // values to it
  let validPermutations = new Array(arr.length);
  validPermutations.fill(0, 0, arr.length);
  validPermutations[0] = 1;

  // For each value in array check what possible
  // outcomes we have
  arr.forEach((value, i) => {
    for (let j = i + 1; j < arr.length; j++) {
      // If next value is less than three, add it to valid perm
      if (arr[j] - value <= 3) {
        validPermutations[j] += validPermutations[i];
      }
    }
  });

  console.log(validPermutations);
  return validPermutations[validPermutations.length - 1];
};

console.log(`Valid Permutations of Array: ${getValidPermutations(data)}`);
