// Load in the Data
const instructions = require("./data");
const instructionsSample1 = require("./sample");

/**
 * Find infinite loop
 * @param {Array} array of instructins
 * that is an array of array of two strings.
 * [[argument, variable],...]
 * @return {Number} Int of value before
 * inifite loop
 */
const findLoop = (arr) => {
  // Keep track of opperations performed as
  // a set of index values
  let oppSet = new Set();

  // Global value
  let accumulator = 0;

  for (var i = 0; i < arr.length; i++) {
    // Get instruction properties
    let opp = arr[i][0];
    let arg = parseInt(arr[i][1]);

    if (oppSet.has(i)) {
      // found the repeated instruction so stop
      // return value
      console.log("Found repeat");
      return accumulator;
    } else {
      oppSet.add(i);
      if (opp === "acc") {
        // increase accumulator by arg
        accumulator += arg;
      } else if (opp === "jmp") {
        // Jump to a new index. Since the value
        // will always increase 1, we need to subtract
        // one from the nump
        i += arg - 1;
      } else if (opp === "nop") {
        // Do nothing because we want to
        // increate by one and keep going
      }
    }
  }

  return returnVal;
};

console.log(findLoop(instructions));
