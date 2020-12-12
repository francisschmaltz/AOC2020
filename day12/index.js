// Load in the Data
const data = require("./data").split("\n");
const dataSample1 = require("./dataSample1").split("\n");

/**
 * Takes a list of moves and translated them to position.
 * The position is an array of figures and a direction. The
 * positon array is [Int, Int] with [0,0] being starting. The
 * positive is north and east, respectively.
 * @param {Array} Array for moves
 * @param {Array} Array - Optional – starting pos default
 * to [0,0]
 * @param {Number} Int - Optional – starting direction
 * Int between 0 and 360 for direction. 0 is due north
 * @return {Number} position from 1 to 2^(string length)
 */
changePos = (arr, startingPos = [0, 0], startingDir = 90) => {
  // Create initial direction values
  // This also prevents stupid JS
  // array clone issues
  let posNS = startingPos[0];
  let posEW = startingPos[1];
  let dirDg = startingDir;

  //
  /**
   * internal func to parse instruction and return parsed input
   * @param {String} String for insctruction
   * @return {Object} Object of action and value for move
   */
  const _parseInst = (inst) => {
    // Get action - first letter (always 1 char)
    let action = inst[0];

    // Create INT for move – all other chars
    let value = parseInt(inst.substring(1));

    // return as obj
    return { action: action, value: value };
  };

  arr.forEach((move, i) => {
    // parse object into object with values
    let instruction = _parseInst(move);

    switch (instruction.action) {
      case "N":
        // move north
        posNS += instruction.value;
        break;
      case "S":
        posNS -= instruction.value;
        break;
      case "E":
        posEW += instruction.value;
        break;
      case "W":
        posEW -= instruction.value;
        break;
      case "L":
        // Add 360 so that the remainder works
        // later (and is non-negative)
        dirDg += 360;
        dirDg -= instruction.value;
        // make sure value is always 0-360
        dirDg = dirDg % 360;
        break;
      case "R":
        dirDg += instruction.value;
        // make sure value is always 0-360
        dirDg = dirDg % 360;
        break;
      case "F":
        if (dirDg === 0) {
          posNS += instruction.value;
        } else if (dirDg === 90) {
          posEW += instruction.value;
        } else if (dirDg === 180) {
          posNS -= instruction.value;
        } else if (dirDg === 270) {
          posEW -= instruction.value;
        } else {
          console.error(`Moving forward with bad degree value ${dirDg}`);
          throw new Error("Degree doesn't work on grid");
        }
        break;

      default:
        // We shouldn't have a default so give error
        console.log(instruction.action);
        throw new Error("No case met – error");
    }
  });

  // return object of points and directions
  return { posNS: posNS, posEW: posEW, dirDg: dirDg };
};

let endPos = changePos(data);
console.log(endPos);
console.log(
  `Manhattan Dist: ${Math.abs(endPos.posNS) + Math.abs(endPos.posEW)}`
);
