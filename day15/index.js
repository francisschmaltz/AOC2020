// Load in the Data
const data = require("./data").split(",");
const dataSample1 = require("./sample").split(",");
const dataSample2 = require("./sample2").split(",");

/**
 * Convert values in memory (array of values) to
 * something with floating support
 * @param {Array} Array of masks or instructions
 * @return {Array} Array of Memory values
 */
const playGame = (arr, queryNum = 2020) => {
  // keep track of game
  let _gameObj = {};
  let _lastNum = 0;

  // run through all possible entries until specific num
  for (let i = 0; i < queryNum; i++) {
    // for large numbers keep track
    if (i % 100000 === 0) {
      console.log(
        `Running Query ${i} of ${queryNum}. ${Math.round(
          (i / queryNum) * 100
        )}% complete`
      );
    }
    // check if we are through starting nums
    if (i >= arr.length) {
      // we are out of starting numbers so we gotta do stuff
      // run through game rules
      if (_gameObj[_lastNum].length === 1) {
        // 1. Check if last number spoke was only spoke once
        // if it is, then the next number is 0
        _lastNum = 0;
        if (typeof _gameObj[`0`] === "undefined") {
          // 0 already has not been called
          _gameObj["0"] = [i];
        } else {
          // 0 already has been called
          _gameObj["0"].push(i);
        }
      } else if (_gameObj[_lastNum].length > 1) {
        // 2. since the last number was already spoken
        // more than once we say how long ago it was
        // spoken.

        // number already has been called so we need to
        // get the number of turns ago it was called
        let _dist =
          _gameObj[_lastNum][_gameObj[_lastNum].length - 1] -
          _gameObj[_lastNum][_gameObj[_lastNum].length - 2];

        if (typeof _gameObj[`${_dist}`] === "undefined") {
          // number already has not been called
          _gameObj[_dist] = [i];
        } else {
          _gameObj[`${_dist}`].push(i);
        }
        _lastNum = _dist;
      } else {
        // 3. A new number has never been called before
        _gameObj[_lastNum] = [i];
        _lastNum = 0;
      }
    } else {
      // We should probably check if repeated, but the
      // starting data doesn't repeat
      _gameObj[arr[i]] = [i];
      _lastNum = parseInt(arr[i]);
    }
  }
  return _lastNum;
};

console.log(`Part 1: last number spoken = ${playGame(data)}`);

console.log(`Part 2: last number spoken = ${playGame(data, 30000000)}`);
