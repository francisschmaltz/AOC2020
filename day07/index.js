// Load in the Data
const bagSortRules = require("./data");
const bagSortRulesSample1 = require("./sample");
const bagSortRulesSample2 = require("./sample2");

/**
 * Create an object of children and all
 * their possible parents
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

findParentBags("shiny gold bag");

console.log(`Number of Shiny Gold Bag Parents: ${parentBagSet.size}`);

//// Part Two

/**
 * Create an object with children and their
 * values
 * @param {Array} array of bag rules
 * @return {Object} object of sorted rules
 */
const createRulesParentObject = (arr) => {
  let rulesObj = {};

  // Loop through strings in array
  arr.forEach((ruleString) => {
    let stringArr = ruleString.split(",");
    let parentBag = stringArr[0].replace(/\d\s/, "").replace(/[.]/, "");

    // Create empty set of child bags
    let parentBagRulesSet = [];

    // String array contains no bags
    if (stringArr.length === 1) {
      // Parent bags need empty array to sort later
    } else {
      // For every child bag, create entry in obj
      for (let i = 1; i < stringArr.length; i++) {
        let childBagCount = stringArr[i].split("")[0];
        let childBag = stringArr[i].replace(/\d\s/, "").replace(/[.]/, "");

        parentBagRulesSet.push({ [childBag]: childBagCount });
      }
    }
    rulesObj[`${parentBag}`] = parentBagRulesSet;
  });

  return rulesObj;
};

let individualBagCount = 0;
let bagSortParentObj = createRulesParentObject(bagSortRules);

/**
 * recursive function to add parents to count
 * @param {Array} array of bag rules
 * @param {String} string of target parent bag
 * @param {Number} INT of multiplier - how many
 * of the parent bag are there
 */
const individualBagCounter = (targetBag, multiplier = 1) => {
  let childBagRules = bagSortParentObj[`${targetBag}`];

  if (childBagRules.length > 0) {
    childBagRules.forEach((ruleString) => {
      for (let bag in ruleString) {
        let childBagCount = ruleString[bag];
        let childBagName = bag;
        individualBagCount += childBagCount * multiplier;

        individualBagCounter(childBagName, childBagCount * multiplier);
      }
    });
  } else {
  }
};
individualBagCounter("shiny gold bag");

console.log(individualBagCount);
