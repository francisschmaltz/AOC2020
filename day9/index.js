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
const findNoMatch = (arr, preamble) => {
  // Start going through array to find number that
  // is not a sum of previous
  for (let i = preamble; i < arr.length; i++) {
    // create array to search – previous numbers
    // defined by preamble
    let arrToSearch = arr.slice(i - preamble, i);
    // number to find sum for
    let sumNumber = arr[i];
    if (!getSum(arrToSearch, sumNumber)) {
      // no match on this number
      return sumNumber;
    }
  }

  return 0;
};

console.log(`No Match: ${findNoMatch(data, 25)}`);

/**
 * Find the number that isn't the sum of two
 * preceding numbers
 * @param {Array} Array of integers
 * @param {Number} Int of numbers to consider
 * as preamble to the data
 * @return {Number} Int of
 */
const findContiguousSum = (arr, sum) => {
  let contiguousArr = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(`i: ${i}`);
    console.log(contiguousArr);
    console.log(contiguousArr.reduce((a, b) => a + b, 0));
    console.log(sum);
    if (contiguousArr.reduce((a, b) => a + b, 0) == sum) {
      // contiguous sum found
      return contiguousArr;
    } else if (contiguousArr.reduce((a, b) => a + b, 0) < sum) {
      // array is less than sum so add another to array
      contiguousArr.push(arr[i]);
    } else if (contiguousArr.reduce((a, b) => a + b, 0) > sum) {
      console.log("greater");
      // array is greater than sum
      i += -1;
      contiguousArr.shift();
    }
  }
};

let contigArr = findContiguousSum(data, 1930745883).sort((a, b) => a - b);
console.log(contigArr);
console.log(
  `Encryption break: ${contigArr[0]} + ${contigArr[contigArr.length - 1]} = ${
    contigArr[0] + contigArr[contigArr.length - 1]
  }`
);
