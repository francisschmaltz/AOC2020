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
    hzLft: col - 1 >= 0 ? arr[row][col - 1] : null,
    hzRgt: col + 1 <= arr.length ? arr[row][col + 1] : null,

    upCen: arr[row - 1] ? arr[row - 1][col] : null,
    upLft: arr[row - 1] && col - 1 >= 0 ? arr[row - 1][col - 1] : null,
    upRgt: arr[row - 1] && col + 1 <= arr.length ? arr[row - 1][col + 1] : null,

    dnCen: arr[row + 1] ? arr[row + 1][col] : null,
    dnLft: arr[row + 1] && col - 1 >= 0 ? arr[row + 1][col - 1] : null,
    dnRgt: arr[row + 1] && col + 1 <= arr.length ? arr[row + 1][col + 1] : null,
  };

  return returnObject;
};

/**
 * Get values of adjacent positon that is a chair and
 * will skip over non-chair values and
 * return as an object
 * @param {Array} Array w/ standard row length
 * @param {Number} Int - row index
 * @param {Number} Int - column index
 * @return {Object} Obejct of values or null
 */
const getAdjacentValuesFar = (arr, row, col) => {
  // create undefined func for easy testing
  const unDef = (input) => {
    if (typeof input === undefined) {
      return true;
    } else {
      return input;
    }
  };

  // Create functions that search but do so with an int so we can
  // change the search distance. Create these functions inside an
  // object to call later
  let funcMap = {
    hzLft: (_col, _row, _int = 1) => {
      return _col - _int >= 0 ? arr[_row][_col - _int] : null;
    },
    hzRgt: (_col, _row, _int = 1) => {
      return _col + _int < arr[_row].length ? arr[_row][_col + _int] : null;
    },

    upCen: (_col, _row, _int = 1) => {
      return _row - _int >= 0 ? arr[_row - _int][_col] : null;
    },
    upLft: (_col, _row, _int = 1) => {
      return _row - _int >= 0 && _col - _int >= 0
        ? arr[_row - _int][_col - _int]
        : null;
    },
    upRgt: (_col, _row, _int = 1) => {
      return _row - _int >= 0 && _col + _int < arr[_row].length
        ? arr[_row - _int][_col + _int]
        : null;
    },

    dnCen: (_col, _row, _int = 1) => {
      return _row + _int < arr.length ? arr[_row + _int][_col] : null;
    },
    dnLft: (_col, _row, _int = 1) => {
      return _row + _int < arr.length && _col - _int >= 0
        ? arr[_row + _int][_col - _int]
        : null;
    },
    dnRgt: (_col, _row, _int = 1) => {
      return _row + _int < arr.length && _col + _int < arr[_row].length
        ? arr[_row + _int][_col + _int]
        : null;
    },
  };

  // Initalize all 8 values
  let returnObject = {
    hzLft: funcMap["hzLft"](col, row, 1),
    hzRgt: funcMap["hzRgt"](col, row, 1),

    upCen: funcMap["upCen"](col, row, 1),
    upLft: funcMap["upLft"](col, row, 1),
    upRgt: funcMap["upRgt"](col, row, 1),

    dnCen: funcMap["dnCen"](col, row, 1),
    dnLft: funcMap["dnLft"](col, row, 1),
    dnRgt: funcMap["dnRgt"](col, row, 1),
  };

  let newReturnObj = {};
  nonSeatCount = 8;
  for (adj in returnObject) {
    for (var i = 1; i < arr.length; ++i) {
      if (unDef(returnObject[adj]) === true) {
        console.log(unDef(returnObject[adj]));
        console.error(returnObject);
        console.log(returnObject[adj]);
        throw new Error("why is this undefined – somethings wrong");
      }
      if (returnObject[adj] === null) {
        nonSeatCount -= 1;
        newReturnObj[adj] = null;
        break;
      } else if (returnObject[adj] === "L" || returnObject[adj] === "#") {
        nonSeatCount -= 1;
        newReturnObj[adj] = returnObject[adj] === "L" ? "L" : "#";
        break;
      } else if (unDef(returnObject[adj]) !== true) {
        // Call function by object name
        returnObject[adj] = funcMap[adj](col, row, i);
      } else {
        throw new Error("Somethings wrong I can feel it (adj in returnObject)");
      }
    }
    if (nonSeatCount === 0) {
      return newReturnObj;
    }
  }

  console.log(returnObject);
  throw new Error("No return value ready");
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
 * @param {Function} Func used for getting
 * adjacent values
 * @param {Number} Int (Optional | 4) of
 * adjacent seats to consider
 * @return {Number} Int of number of time
 * rules run before stable
 */
const findSeeting = (
  arr,
  adjFunction = getAdjacentValues,
  seatRuleIndex = 4
) => {
  // Keep track of itterations
  let iterations = 0;

  // create internal array to prevent JS issues
  let _arr = [...arr];
  let _tmpArr = [...arr];

  // create array of previous values to compare
  let previousArr = [...arr];

  // Run for loop until stable
  const iterate = () => {
    previousArr = [..._arr];
    console.log(previousArr);
    console.log(_arr);
    // increment every run
    iterations++;
    // Run through rules on each row
    _arr.forEach((row, r) => {
      // create new string to replace row

      let newRow = "";

      // Run through rules for each item in row of array
      for (let c = 0; c < row.length; c++) {
        let adj = adjFunction(_arr, r, c);

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
          if (occupied >= seatRuleIndex) {
            newRow += "L";
          } else {
            newRow += "#";
          }
        } else {
          console.error("Unexpected Input");
        }
      }
      _tmpArr[r] = newRow;
    });
    // after rules check if current Array
    // matches previous. If not, change previous
    if (checkEqual(_tmpArr, previousArr)) {
      // log seats that are taken
      let seatsTaken = 0;
      _tmpArr.forEach((row, r) => {
        // create new string to replace row
        // Run through rules for each item in row of array
        for (let c = 0; c < row.length; c++) {
          if (row[c] === "#") {
            seatsTaken++;
          }
        }
      });
      console.log(`Seats Taken: ${seatsTaken}`);

      return iterations;
    } else {
      _arr = [..._tmpArr];
      iterate();
    }
  };

  iterate();

  return iterations;
};
//
// console.log(
//   `Number of itterations before stable seeting: ${findSeeting(data)}`
// );

console.log(
  `Part Two: Number of itterations before stable seeting: ${findSeeting(
    data,
    getAdjacentValuesFar,
    5
  )}`
);
