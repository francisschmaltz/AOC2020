// Load in the Data
const dataRaw = require("./data").split("\n\n");
const dataSample1Raw = require("./sample").split("\n\n");

const _parseInput = (arr) => {
  _data0 = arr[0].split("\n");
  _data1 = arr[1].split("\n");
  _data2 = arr[2].split("\n");

  // Split data into two arrays of array of [high,low] numbers
  _data0.forEach((row, i) => {
    _data0[i] = row.split(/\D/).filter((value) => value.length > 0);
    _data0[i] = [
      [parseInt(_data0[i][0]), parseInt(_data0[i][1])],
      [parseInt(_data0[i][2]), parseInt(_data0[i][3])],
    ];
  });

  // remove first description row from your tickets and
  // other tickets
  _data1.shift();
  _data2.shift();

  // parse tickets into arrays
  _data1.forEach((row, i) => {
    _data1[i] = row.split(",");
    _data1[i].forEach((number, n) => {
      _data1[i][n] = parseInt(number);
    });
  });

  // parse tickets numbers into array
  _data2.forEach((row, i) => {
    _data2[i] = row.split(",");
    _data2[i].forEach((number, n) => {
      _data2[i][n] = parseInt(number);
    });
  });

  return [_data0, _data1, _data2];
};

const data = _parseInput(dataRaw);
const dataSample1 = _parseInput(dataSample1Raw);

console.log(dataSample1[0]);
console.log(dataSample1[1]);
console.log(dataSample1[2]);

/**
 * Convert values in memory (array of values) to
 * something with floating support
 * @param {Array} Array of masks or instructions
 * @return {Array} Array of Memory values
 */
const doThing = (arr) => {
  // stores an object of the ticket number and missing number
  let noMatchNumbers = [];

  // for each other ticket, find numbers that don't match
  // possible values from arr[0]
  arr[2].forEach((ticket, t) => {
    // run through every number in each ticket
    ticket.forEach((number, n) => {
      // for each number, check against all
      // ranges from arr[0]
      let _matchedRanges = 0;
      arr[0].forEach((rangeGroup, r) => {
        if (
          (number >= rangeGroup[0][0] && number <= rangeGroup[0][1]) ||
          (number >= rangeGroup[1][0] && number <= rangeGroup[1][1])
        ) {
          _matchedRanges++;
        }
      });

      // If no matched ranges are found add to noMatch Obj
      if (_matchedRanges === 0) {
        noMatchNumbers.push(number);
      }
    });
  });

  console.log(`nunbers with no matches: ${noMatchNumbers}`);
  // return sum of all numbers
  return noMatchNumbers.reduce((a, b) => a + b, 0);
};

console.log(`Part 1: Sum of Numbers that don't Match = ${doThing(data)}`);
