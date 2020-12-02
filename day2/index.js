// Load in the Data
const passwordData = require("./data");

// Data is stored as an array of arrays
// [[Min, Max, RequiredLetter, Password], ...]
// [[Int, Int, String, String], ...]

// Takes array of data and returns INT of valid passwords
const checkPassword = (arr) => {
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

console.log(`Number of Valid Password: ${checkPassword(passwordData)}`);
