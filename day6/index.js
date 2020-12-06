// Load in the Data
const customsData = require("./data");

/**
 * Takes array strings and retuns
 * number of unique letters
 * @param {Array} array of strings
 * @param {Number} INT (optional) number of
 * matching values to pass defaults to 1
 * @return {Number} INT of unique letters
 * in array
 */
const checkCustomsData = (arr, affirmReq = 1) => {
  var uniqueObj = {};

  for (var i = 0; i < arr.length; i++) {
    // convert string in array to array
    let stringArr = arr[i].split("");

    // loop through letters
    for (var c = 0; c < stringArr.length; c++) {
      let char = stringArr[c];

      // for every letter check if obj.letter
      // is added – if so add 1, if not set as 1
      if (typeof uniqueObj[`${char}`] === "undefined") {
        uniqueObj[char] = 1;
      } else {
        uniqueObj[char] += 1;
      }
    }
  }

  let affirms = 0;

  // for every key in object, if the value is
  // equal to the number of members required to
  // pass then add 1 to group affirms
  for (const question in uniqueObj) {
    if (uniqueObj[question] >= affirmReq) {
      affirms += 1;
    }
  }

  return affirms;
};

let totalAffirms = 0;
for (var i = 0; i < customsData.length; i++) {
  let affirms = checkCustomsData(customsData[i]);
  totalAffirms += affirms;
}
console.log(`Number of affirms: ${totalAffirms}`);

let totalGroupAffirms = 0;
for (var i = 0; i < customsData.length; i++) {
  let affirms = checkCustomsData(customsData[i], customsData[i].length);
  totalGroupAffirms += affirms;
}
console.log(`Number of group affirms: ${totalGroupAffirms}`);
