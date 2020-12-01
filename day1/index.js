// Load in the Data
const expenseData = require("./data");

// Define sum to look for
const missingSum = 2020;

//// Part 1
// Function to locate sum
const getSum = (arr, sum) => {
  // Sort array
  arr.sort((a, b) => b - a);

  var map = [];
  var pair = [];

  for (var i = 0; i < arr.length; i++) {
    // Check if map has value at index of arr[i]
    if (!map[arr[i]]) {
      // If no value, add value for possible pair
      map[sum - arr[i]] = i;
    } else {
      // If map has value a match has been found
      var index = map[arr[i]];
      pair[0] = arr[index];
      pair[1] = arr[i];
    }
  }
  if (pair[1]) {
    console.log(`Pair: ${pair}`);
  }
  return pair;
};

console.log(getSum(expenseData, missingSum).reduce((a, b) => a * b));
////

console.log("\n");

//// Part 2
// Function to locate sum in three parts
const getSumMore = (arr, sum) => {
  let tri = [];

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // Remove current value from array
    let newArr = arr.filter((item) => item !== val);

    // Remove current value from sum
    let newSum = sum - val;

    // Find pair of Ints that match newSum from remaining vales in newArr
    let twoPair = getSum(newArr, newSum);

    // If two pairs was found, a trio was found
    if (twoPair[1]) {
      tri.push(val);
      twoPair.map((x) => tri.push(x));
      break;
    } else {
    }
  }
  if (tri[2]) {
    console.log(`Tri: ${tri}`);
  }
  return tri;
};

console.log(getSumMore(expenseData, missingSum).reduce((a, b) => a * b));
