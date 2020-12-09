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
const findLoop = (arr, fix) => {
  // Keep track of opperations performed as
  // a set of index values
  let oppSet = new Set();

  // Global value
  let accumulator = 0;

  // last jump or nop run
  let lastIndex = [];

  for (var i = 0; i < arr.length; i++) {
    // Get instruction properties
    let opp = arr[i][0];
    let arg = parseInt(arr[i][1]);

    if (oppSet.has(i)) {
      // found the repeated instruction so stop
      // return value
      console.log("Found repeat");
      console.log(
        `Last Jump or NOP: ${lastIndex[lastIndex.length - 1]} ${
          arr[lastIndex.length - 1]
        }`
      );
      console.log("possible issues");
      console.log(lastIndex);

      if (fix) {
        console.log(lastIndex);
        // create object of possible corrections
        let testingObj = {};

        // create arrays to test
        for (let _i = 0; _i < lastIndex.length; _i++) {
          let oppToTest = lastIndex[_i];

          // cloning this stupid fucking array took 2 hours alone
          testingObj[oppToTest] = JSON.parse(JSON.stringify(arr));

          console.log("second for loop");
          console.log(testingObj[oppToTest][oppToTest]);
          if (testingObj[oppToTest][oppToTest][0] === "nop") {
            testingObj[oppToTest][oppToTest][0] = "jmp";
          } else {
            testingObj[oppToTest][oppToTest][0] = "nop";
          }
        }
        console.log("exit for loop");
        console.log(testingObj);
        for (const testArr in testingObj) {
          console.log(testArr);
          console.log("testArr");
          let _oppSet = new Set();

          // Local acc
          let _accumulator = 0;
          let _broken = false;
          for (var _i = 0; _i < testingObj[testArr].length; _i++) {
            console.log(_i);
            // Get instruction properties
            let _opp = testingObj[testArr][_i][0];
            let _arg = parseInt(testingObj[testArr][_i][1]);

            if (_oppSet.has(_i)) {
              // do nothing were done
              _broken = true;
              console.log(_oppSet);
              console.log(`Dupe on ${testArr}`);
              console.log(_i);
              break;
            } else {
              _oppSet.add(_i);
              if (_opp === "acc") {
                // increase accumulator by arg
                _accumulator += _arg;
              } else if (_opp === "jmp") {
                // Jump to a new index. Since the value
                // will always increase 1, we need to subtract
                // one from the nump
                _i += _arg - 1;
              } else if (_opp === "nop") {
                // Do nothing because we want to
                // increate by one and keep going
              }
            }
          }

          // if this passes we found real value
          if (_broken) {
            console.log("broken");
          } else {
            console.log("passed");
            return _accumulator;
          }
        }
      }

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
        lastIndex.push(i);
        i += arg - 1;
      } else if (opp === "nop") {
        // Do nothing because we want to
        // increate by one and keep going
        lastIndex.push(i);
      }
    }
  }

  return returnVal;
};

// console.log(findLoop(instructions));

console.log(`loop results: ${findLoop(instructions, true)}`);
