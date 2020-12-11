// Load in the Data
const data = require("./data").split("\n");
const dataSample1 = require("./sample").split("\n");

/**
 * Get values of adjacent positon and
 * return as an object
 * @param {Array} Array w/ standard row length
 * @param {Number} Int - row index
 * @param {Number} Int - column index
 * @return {Object} Obejct of values or null
 */
const getAdjacentValues = (arr, row, col) => {
  // create undefined func for easy testing
  const unDef = (input) => {
    if (typeof input === undefined) {
      return true;
    } else {
      return input;
    }
  };
  // Initalize all 8 values
  let returnObject = {
    hzLft: col - 1 > 0 ? arr[row][col - 1] : null,
    hzRgt: col + 1 < arr.length ? arr[row][col + 1] : null,

    upCen: arr[row - 1] ? arr[row - 1][col] : null,
    upLft: arr[row - 1] && col - 1 > 0 ? arr[row - 1][col - 1] : null,
    upRgt: arr[row - 1] && col + 1 < arr.length ? arr[row - 1][col + 1] : null,

    dnCen: arr[row + 1] ? arr[row + 1][col] : null,
    dnLft: arr[row + 1] && col - 1 > 0 ? arr[row + 1][col - 1] : null,
    dnRgt: arr[row + 1] && col + 1 < arr.length ? arr[row + 1][col + 1] : null,
  };

  return returnObject;
};

/**
 * returns tue if array content is equal
 * @param {Array} Array 1
 * @param {Array} Array 2
 * @return {Bool} Obejct of values or null
 */
const checkEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;

  // Copy from StackOverflow for time
  // https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
};

/**
 * Find number of time to run rules
 * before no changes to array
 * @param {Array} Array of integers
 * @return {Number} Int of number of time
 * rules run before stable
 */
const findSeeting = (arr) => {
  // Keep track of itterations
  let iterations = 0;

  // create internal array to prevent JS issues
  let _arr = [...arr];

  // create array of previous values to compare
  let previousArr = [...arr];

  // Run for loop until stable
  const iterate = () => {
    console.log(previousArr);
    console.log(_arr);
    // increment every run
    iterations++;
    // Run through rules on each row
    _arr.forEach((row, r) => {
      // create new string to replace row
      let newRow = "";
      if (r === 1) {
        console.log(row);
      }
      // Run through rules for each item in row of array
      for (let c = 0; c < row.length; c++) {
        console.log(`Row[c] ${row[c]}`);
        let adj = getAdjacentValues(_arr, r, c);
        console.log(newRow);
        if (row[c] === ".") {
          // char is floor, move on
          newRow += ".";
        } else if (row[c] === "L") {
          // char is an empty seat
          // check if no adjacent seats are ocupied
          let occupied = 0;
          for (seat in adj) {
            if (adj[seat] === "#") {
              occupied++;
            }
          }
          if (occupied === 0) {
            newRow += "#";
          } else {
            newRow += "L";
          }
        } else if (row[c] === "#") {
          // char is an empty seat
          // check if no adjacent seats are ocupied
          let occupied = 0;
          for (seat in adj) {
            if (adj[seat] === "#") {
              occupied++;
            }
          }
          if (occupied >= 4) {
            newRow += "L";
          } else {
            newRow += "#";
          }
        } else {
          console.error("Unexpected Input");
        }
      }
      _arr[r] = newRow;
      console.log("after");
      console.log(_arr);
    });
    // after rules check if current Array
    // matches previous. If not, change previous
    if (checkEqual(_arr, previousArr)) {
      // log seats that are taken
      let seatsTaken = 0;
      _arr.forEach((row, r) => {
        // create new string to replace row
        // Run through rules for each item in row of array
        for (let c = 0; c < row.length; c++) {
          if (row[c] === "#") {
            seatsTaken++;
          }
        }
      });
      console.log(`seatsTaken: ${seatsTaken}`);

      return iterations;
    } else {
      console.log("else");
      previousArr = [..._arr];
      iterate();
    }
  };

  iterate();

  return iterations;
};

console.log(
  `Number of itterations before stable seeting: ${findSeeting(dataSample1)}`
);
