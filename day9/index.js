// Load in the Data
const data = require("./data").split("\n");
const dataSample1 = require("./sample").split("\n");

// Turn data into int
data.forEach((int, i) => {
  data[i] = Number(int);
});

dataSample1.forEach((int, i) => {
  dataSample1[i] = Number(int);
});

console.log(dataSample1);

/**
 * Check if the sum of two numbers
 * in array are possible
 * @param {Array} Array of integers
 * @param {Number} Int of number to check
 * @return {Array} True if match
 */
const getSum = (arr, sum) => {
  // Sort array
  arr.sort((a, b) => b - a);
  let map = [];
  let pair = [];

  for (let i = 0; i < arr.length; i++) {
    // Check if map has value at index of arr[i]
    if (typeof map[arr[i]] === "undefined") {
      // If no value, add value for possible pair
      map[sum - arr[i]] = i;
    } else {
      // If map has value a match has been found
      let index = map[arr[i]];
      pair[0] = arr[index];
      pair[1] = arr[i];
    }
  }
  if (pair[1]) {
    console.log(`Pair: ${pair}`);
  } else {
    return false;
  }
  return pair;
};

/**
 * Find the number that isn't the sum of two
 * preceding numbers
 * @param {Array} Array of integers
 * @param {Number} Int of numbers to consider
 * as preamble to the data
 * @return {Number} Int of
 */
const doThing = (arr, preamble) => {
  // Start going through array to find number that
  // is not a sum of previous
  for (let i = preamble; i < arr.length; i++) {
    let arrToSearch = arr.slice(i - preamble, i);
    let sumNumber = arr[i];
    if (!getSum(arrToSearch, sumNumber)) {
      // no match on this number
      return sumNumber;
    }
  }

  return 0;
};

console.log(`No Match: ${doThing(data, 25)}`);
