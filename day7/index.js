// Load in the Data
const bagSortRules = require("./data");

/**
 *
 * @param {Array} array of bag rules
 * @return {Object} object of sorted rules
 */
const createRulesObject = (arr) => {
  let rulesObj = {};

  // Loop through strings in array
  arr.forEach((ruleString) => {
    let stringArr = ruleString.split(",");
    let parentBag = stringArr[0].replace(/\d\s/, "").replace(/[.]/, "");

    // String array contains no bags
    if (stringArr.length === 1) {
      // Parent bags need empty array to sort later
      rulesObj[`${parentBag}`] = [];
    } else {
      // For every child bag, create entry in obj
      for (let i = 1; i < stringArr.length; i++) {
        let childBag = stringArr[i].replace(/\d\s/, "").replace(/[.]/, "");

        // Create array of parent bags
        if (!Array.isArray(rulesObj[`${childBag}`])) {
          rulesObj[`${childBag}`] = [parentBag];
        } else {
          rulesObj[`${childBag}`].push(parentBag);
        }
      }
    }
  });

  return rulesObj;
};

let parentBagSet = new Set();
let bagSortObj = createRulesObject(bagSortRules);

// recursive function to add parents to set
const findParentBags = (targetBag) => {
  // Create parent bag from array or none
  let bagParentArr = bagSortObj[`${targetBag}`] || [];

  // recursively add parents to set
  if (bagParentArr.length > 0) {
    bagParentArr.forEach((parent) => {
      parentBagSet.add(parent);
      findParentBags(parent);
    });
  }
};

findParentBags("shiny gold bags");
console.log(`Number of Shiny Gold Bag Parents: ${parentBagSet.size}`);

// console.log(`Part 2: ${func(customsData)}`);
