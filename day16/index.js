// Load in the Data
const dataRaw = require("./data").split("\n\n");
const dataSample1Raw = require("./sample").split("\n\n");
const dataSample2Raw = require("./sample2").split("\n\n");

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
const dataSample2 = _parseInput(dataSample2Raw);

console.log(dataSample1[0]);
console.log(dataSample1[1]);
console.log(dataSample1[2]);

/**
 * Convert values in memory (array of values) to
 * something with floating support
 * @param {Array} Array of masks or instructions
 * @return {Array} Array of Memory values
 */
const findInvalidTickets = (arr) => {
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

console.log(
  `Part 1: Sum of Numbers that don't Match = ${findInvalidTickets(data)}`
);

/**
 * Convert values in memory (array of values) to
 * something with floating support
 * @param {Array} Array of masks or instructions
 * @return {Array} Array of Memory values
 */
const findTicketFields = (arr, arrRaw) => {
  // stores a set of tickets to remove later
  let invalidTickets = new Set();

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

      // If no matched ranges are found add entire ticket
      // to set so we can match later
      if (_matchedRanges === 0) {
        invalidTickets.add(arr[2][t]);
      }
    });
  });

  // create new internal set of valid tickets
  let _onlyValidTickets = new Set([...arr[2]]);

  // remove invalid tickets from set
  for (let arrIndex of invalidTickets) {
    _onlyValidTickets.delete(arrIndex);
  }

  // create object to match ticket numbers to values
  // stored as an object of objects
  // { ticketIndex: {0: [fieldName1], 1: [fieldName2, fieldName3]...]}}
  let _matchObj = {};

  // Loop through tickets to find field
  _onlyValidTickets.forEach((ticket, t) => {
    // create object entry
    _matchObj[t] = {};
    // loop through each number in ticket
    ticket.forEach((number, n) => {
      // create empty array for number in object
      _matchObj[t][n] = [];

      // for each number, check against all
      // ranges from arr[0]
      arr[0].forEach((rangeGroup, r) => {
        if (
          (number >= rangeGroup[0][0] && number <= rangeGroup[0][1]) ||
          (number >= rangeGroup[1][0] && number <= rangeGroup[1][1])
        ) {
          let _fieldName = arrRaw[0].split("\n")[r].match(/[^:]*/)[0];
          _matchObj[t][n].push(_fieldName);
        }
      });
    });
  });

  // create object to keep track of feidl name matches
  // the object is an object of ticket field names and a map
  // of keyvalue for the time it's appeared in the index of a ticket.
  // Field name possible matches will be equal to the number of
  // total good tickets
  let _fieldNames = {};
  arrRaw[0].split("\n").forEach((row, r) => {
    _fieldNames[row.match(/[^:]*/)[0]] = new Map();
  });

  for (let match in _matchObj) {
    //loop through each position to add to obj maps

    for (let pos in _matchObj[match]) {
      // loop thorugh each position
      _matchObj[match][pos].forEach((field, f) => {
        // check if value for pos exists in map. If so
        // add one to it, if not set as 1

        if (_fieldNames[field].has(pos)) {
          let _val = _fieldNames[field].get(pos);
          _val++;
          _fieldNames[field].set(pos, _val);
        } else {
          _fieldNames[field].set(pos, 1);
        }
      });
    }
  }

  // Sort _fieldNames and remove non-full matches
  for (let field in _fieldNames) {
    _fieldNames[field] = new Map([..._fieldNames[field].entries()].sort());

    // Remove entries that don't meet length requirement
    for (let [key, value] of _fieldNames[field]) {
      if (value !== _onlyValidTickets.size) {
        _fieldNames[field].delete(key);
      }
    }
  }

  // sort remaining by number of matching entries
  // This leaves us with an object sorted by the field name
  // with the lowest possible matching field indexes
  const _sortedFN = Object.fromEntries(
    Object.entries(_fieldNames).sort(([, a], [, b]) => a.size - b.size)
  );

  console.log("sortedFN");
  console.log(_sortedFN);
};
findTicketFields(data, dataRaw);
console.log(data[1][0]);
console.log(
  `Part 2: All departure values multiples: ${
    data[1][0][6] *
    data[1][0][18] *
    data[1][0][19] *
    data[1][0][10] *
    data[1][0][7] *
    data[1][0][17]
  }`
);
