// Load in the Data
const data = require("./data").split("\n");
const dataSample1 = require("./sample").split("\n");
const dataSample2 = require("./sample2").split("\n");

const notUnDef = (input) => {
  if (typeof input === undefined) {
    return false;
  } else {
    return true;
  }
};

/**
 * Convert values in memory (array of values) to
 * something else
 * @param {Array} Array of masks or instructions
 * @return {Array} Array of Memory values
 */
const runMemory = (arr) => {
  // create internal variable for mask that changes
  let _mask = [];
  // create internal value for return mem entries
  let mem = [];

  // Run through all lines of instructions
  arr.forEach((line, i) => {
    // check if line is mask or instruction
    if (line.startsWith("mask")) {
      // If line is mask parse and change func
      // mask value
      _mask = line.replace("mask = ", "").split("");
    } else {
      // splits line into [Int, Int] where [0] is mem index
      // and [1] is value to set

      let _memIndex = line.split(/\D/).filter((value) => value.length > 0)[0];
      let _base2Val = line.split(/\D/).filter((value) => value.length > 0)[1];

      // Refine values
      _memIndex = parseInt(_memIndex);
      _base2Val = parseInt(_base2Val).toString(2).split("");

      // Make sure that array is right length
      let missingLen = _mask.length - _base2Val.length;
      for (let l = 0; l < missingLen; l++) {
        _base2Val.unshift("0");
      }

      // create new array with 0'd values
      _base2New = new Array(_mask.length);
      _base2New.fill(0, 0, _base2New.length);

      _mask.forEach((bit, i) => {
        if (_mask[i] !== "X") {
          _base2New[i] = bit;
        } else {
          if (notUnDef(_base2Val[i])) {
            _base2New[i] = _base2Val[i];
          } else {
            _base2New[i] = "0";
          }
        }
      });

      mem[_memIndex] = _base2New.toString().replace(/,/gi, "");
    }
  });

  return mem;
};

let memEntries = runMemory(data);

// Filter array of empty values,
// turn bianary string into int
// add all int together
console.log(
  `Total Value of All Entries: ${memEntries
    .filter((value) => value.length > 0)
    .map((x) => parseInt(x, 2))
    .reduce((a, b) => a + b)}`
);

/**
 * Convert values in memory (array of values) to
 * something with floating support
 * @param {Array} Array of masks or instructions
 * @return {Array} Array of Memory values
 */
const runMemoryFloating = (arr) => {
  // create internal variable for mask that changes
  let _mask = [];
  // create internal value for return mem entries
  let mem = {};

  // Run through all lines of instructions
  arr.forEach((line, i) => {
    // check if line is mask or instruction
    if (line.startsWith("mask")) {
      // If line is mask parse and change func
      // mask value
      _mask = line.replace("mask = ", "").split("");
    } else {
      // splits line into [Int, Int] where [0] is mem index
      // and [1] is value to set

      let _memIndex = line.split(/\D/).filter((value) => value.length > 0)[1];
      let _base2Val = line.split(/\D/).filter((value) => value.length > 0)[0];

      console.log(_base2Val);

      // Refine values
      _memIndex = parseInt(_memIndex);
      _base2Val = parseInt(_base2Val).toString(2).split("");

      // Make sure that array is right length
      let missingLen = _mask.length - _base2Val.length;
      for (let l = 0; l < missingLen; l++) {
        _base2Val.unshift("0");
      }

      _arrs = [""];

      // This is a hot fucking mess that does floating bits
      // basically just itterated over the string and duplicates
      // all strings every time theres a floating value
      console.log(_mask);
      console.log(_base2Val);
      _mask.forEach((bit, i) => {
        if (_mask[i] === "X") {
          // _base2New[i] = "X";
          let _altArr1 = [..._arrs];
          let _altArr2 = [..._arrs];

          _altArr1.forEach((value, v) => {
            _altArr1[v] += "1";
          });
          _altArr2.forEach((value, v) => {
            _altArr2[v] += "0";
          });
          _arrs = [];
          _arrs.push(..._altArr1);
          _arrs.push(..._altArr2);
        } else if (_mask[i] === "1") {
          let _tmpArrs = [..._arrs];
          _tmpArrs.forEach((value, v) => {
            _tmpArrs[v] += "1";
          });
          _arrs = [];
          _arrs.push(..._tmpArrs);
        } else {
          if (notUnDef(_base2Val[i])) {
            let _tmpArrs = [..._arrs];
            _tmpArrs.forEach((value, v) => {
              _tmpArrs[v] += _base2Val[i];
            });
            _arrs = [];
            _arrs.push(..._tmpArrs);
          } else {
            let _tmpArrs = [..._arrs];
            _tmpArrs.forEach((value, v) => {
              _tmpArrs[v] += "0";
            });
            _arrs = [];
            _arrs.push(..._tmpArrs);
          }
        }
      });
      console.log(_arrs);
      _arrs.forEach((addr, i) => {
        mem[addr] = _memIndex;
      });
    }
  });

  console.log(mem);

  // return total value of all items in mem
  let totalSum = 0;
  for (var addr in mem) {
    value = mem[addr];
    totalSum += value;
  }
  return totalSum;
};

console.log(`Total Value of All Entries Part 2: ${runMemoryFloating(data)}`);
