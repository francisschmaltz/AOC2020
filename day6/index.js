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

  // Loop through strings in array
  arr.forEach((stringArr) => {
    // Loop through characters in string
    stringArr.split("").forEach((char) => {
      // for every letter check if obj.letter
      // is added – if so add 1, if not set as 1
      if (typeof uniqueObj[`${char}`] === "undefined") {
        uniqueObj[char] = 1;
      } else {
        uniqueObj[char] += 1;
      }
    });
  });

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
let totalGroupAffirms = 0;

customsData.forEach((groupCustomsData) => {
  // Part 1
  totalAffirms += checkCustomsData(groupCustomsData);

  // Part 2
  totalGroupAffirms += checkCustomsData(
    groupCustomsData,
    groupCustomsData.length
  );
});

console.log(`Number of affirms: ${totalAffirms}`);
console.log(`Number of group affirms: ${totalGroupAffirms}`);
