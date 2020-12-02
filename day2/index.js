// Load in the Data
const passwordData = require("./data");

// Data is stored as an array of arrays
// [[Min, Max, RequiredLetter, Password], ...]
// [[Int, Int, String, String], ...]

// Takes array of data and returns INT of valid passwords
const checkPasswordCount = (arr) => {
  // Count valid passwords
  var validAmt = 0;

  // Loop through array and check each password
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i][0];
    let max = arr[i][1];
    let ltr = arr[i][2];
    let pwdRaw = arr[i][3];

    // We need to split the string into an array and filter
    // non matching strings
    let pwd = pwdRaw.split("").filter((l) => l === ltr);

    // Check for right amount of matched letter
    if (pwd.length >= min && pwd.length <= max) {
      validAmt += 1;
    }
  }

  return validAmt;
};

console.log(
  `Number of Valid Password w/ Counting: ${checkPasswordCount(passwordData)}`
);

// Takes array of data and returns INT of valid passwords
const checkPasswordPos = (arr) => {
  // Count valid passwords
  var validAmt = 0;

  // Loop through array and check each password
  for (let i = 0; i < arr.length; i++) {
    let pOne = arr[i][0] - 1;
    let pTwo = arr[i][1] - 1;
    let ltr = arr[i][2];
    let pwdRaw = arr[i][3];

    // We need to split the string into an array and filter
    // non matching strings
    let pwd = pwdRaw.split("");

    // Check if position one and two are true
    let trueOne = pwd[pOne] === ltr;
    let trueTwo = pwd[pTwo] === ltr;

    // Check if only ONE is true
    if ((trueOne && !trueTwo) || (!trueOne && trueTwo)) {
      validAmt += 1;
    }
  }

  return validAmt;
};
console.log(
  `Number of Valid Password w/ Position: ${checkPasswordPos(passwordData)}`
);
