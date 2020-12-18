// Load in the Data
const data = require("./data").split("\n");
const dataSample1 = require("./dataSample1").split("\n");

/**
 * Takes array of data and array for move
 * and returns INT of number of
 * passports that are valid
 * @param {Array} array of objects
 * @return {Number} INT of valid passports
 */
const evaluateMath = (str) => {
  let rawString = str.replace(/\s/g, "");
  let equation = rawString.split("");

  let returnValue = 0;
  let currentOperation = "";
  for (let c = 0; c < equation.length; c++) {
    char = equation[c];

    switch (true) {
      case /[-+*/]/.test(char):
        currentOperation = char;
        break;
      case /\d/.test(char):
        switch (currentOperation) {
          case "-":
            returnValue += parseInt(char) * -1;
            break;
          case "*":
            returnValue *= parseInt(char);
            break;
          case "/":
            returnValue /= parseInt(char);
            break;
          default:
            returnValue += parseInt(char);
            break;
        }
        break;
      case /\(/.test(char):
        let nestedCalc = evaluateMath(rawString.slice(c + 1));
        c += nestedCalc[1];
        switch (currentOperation) {
          case "-":
            returnValue += nestedCalc[0] * -1;
            break;
          case "*":
            returnValue *= nestedCalc[0];
            break;
          case "/":
            returnValue /= nestedCalc[0];
            break;
          default:
            returnValue += nestedCalc[0];
            break;
        }
        break;
      case /\)/.test(char):
        return [returnValue, c + 1];
        break;
      default:
        // We shouldn't have a default so give error
        throw new Error("No case met – error");
    }
  }

  return returnValue;
};

let dataMapPart1 = data.map((equation, q) => evaluateMath(equation));

console.log(dataMapPart1.reduce((a, b) => a + b, 0));
// console.log(evaluateMath(dataSample1[3]));
