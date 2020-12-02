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
    let pwd = arr[i][3];

    let regex = new RegExp(`${ltr}{${min},${max}}`);

    // If Regex matches then the password is valid
    // Log the valid password
    if (regex.test(pwd)) {
      validAmt += 1;
    }
  }

  return validAmt;
};

console.log(`Number of Valid Password: ${checkPassword(passwordData)}`);
