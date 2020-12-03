// Load in the Data
const treeDataRaw = require("./data");

// Convert string into array where each array of
// trees is a row (so we can repeat)
const treeData = treeDataRaw.split(",");

// Data is stored as an array of strings
// ["...#...###......##.#..#.....##.", ...]
// "." are free areas "#" are trees
// strings "loop" forever

// Takes array of data and array for move
// and returns INT of number
// of trees encountered
const findTrees = (arr, hMove, vMove) => {
  // Count valid passwords
  var treeHits = 0;

  // Loop through array and check each password
  for (var i = 0; i < arr.length; i += vMove) {
    // split row string into array so we can check
    let row = arr[i].split("");

    let pos = (i / vMove) * hMove;

    // Use remainder to alter horizontal position
    if (pos >= row.length) {
      pos = ((i / vMove) * hMove) % row.length;
    }

    if (row[pos] === "#") {
      treeHits += 1;
    }
  }

  return treeHits;
};

console.log(`Number of Tree Hits: ${findTrees(treeData, 3, 1)}`);

//// Part two
// Find trees in multiple places and multiple
console.log(`\n\n Part Two! You need to multiply the numbers below \n\n`);
const a = findTrees(treeData, 1, 1);
const b = findTrees(treeData, 3, 1);
const c = findTrees(treeData, 5, 1);
const d = findTrees(treeData, 7, 1);
const e = findTrees(treeData, 1, 2);
console.log(`Number of Tree Hits: ${a * b * c * d * e}`);
