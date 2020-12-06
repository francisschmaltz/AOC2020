// Load in the Data
const customsData = require("./data");

/**
 * Takes array strings and retuns
 * number of unique letters
 * @param {Array} array of strings
 * @return {Number} INT of unique letters
 * in array
 */
const checkCustomsData = (arr) => {
  var uniqueObj = {};

  for (var i = 0; i < arr.length; i++) {
    // convert string in array to array
    let stringArr = arr[i].split("");

    // loop through letters
    for (var c = 0; c < stringArr.length; c++) {
      let char = stringArr[c];

      // for every letter check if obj.letter
      // is TRUE. If it isn't then create it
      if (uniqueObj[`${char}`] !== true) {
        uniqueObj[char] = true;
      }
    }
  }

  return Object.keys(uniqueObj).length;
};

let totalAffirms = 0;
for (var i = 0; i < customsData.length; i++) {
  let affirms = checkCustomsData(customsData[i]);
  totalAffirms += affirms;
}
console.log(`Number of affirms: ${totalAffirms}`);
