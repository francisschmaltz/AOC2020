// Load in the Data
const data = require("./data").split("\n");
const dataSample1 = require("./dataSample1").split("\n");

const evaluateMath = (str, part2 = false) => {
  // part 2 from https://en.wikipedia.org/wiki/Operator-precedence_parser#Alternative_methods
  if (part2) {
    return eval(
      "((" +
        str
          .replace(/\(/g, "(((")
          .replace(/\)/g, ")))")
          .replace(/\+/g, ")+(")
          .replace(/\*/g, "))*((") +
        "))"
    );
  }

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

console.log(`Part 1: ${dataMapPart1.reduce((a, b) => a + b, 0)}`);

let dataMapPart2 = data.map((equation, q) => evaluateMath(equation, true));

console.log(`Part 2: ${dataMapPart2.reduce((a, b) => a + b, 0)}`);
