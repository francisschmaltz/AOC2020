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
const findTrees = (arr, move) => {
  const hMove = move[0];
  const vMove = move[1];

  // Count valid passwords
  var treeHits = 0;

  // Loop through array and check each password
  for (let i = 0; i < arr.length; i++) {
    // split row string into array so we can check
    let row = arr[i].split("");

    let pos = i * hMove;

    // Use remainder to alter horizontal position
    if (pos >= row.length) {
      pos = (i * hMove) % row.length;
    }

    if (row[pos] === "#") {
      console.log("it's a tree");
      console.log(i);
      console.log(pos);
      treeHits += 1;
      console.log(row);
    }
  }

  return treeHits;
};

console.log(`Number of Tree Hits: ${findTrees(treeData, [3, 1])}`);
