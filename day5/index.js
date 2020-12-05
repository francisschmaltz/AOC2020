// Load in the Data
const boardingPasses = require("./data");

// Data is stored as array of strings that
// are a Binary space partition map
// First 7 are for vertical position
// Last 3 are for horizontal position

class BoardingPass {
  constructor(string) {
    this.seatID = string;
  }

  get row() {
    return this.bianarySort(this.seatID.substring(0, 7), "F", "B");
  }

  get seat() {
    return this.bianarySort(this.seatID.substring(7, 10), "L", "R");
  }

  /**
   * Takes a string and does a bianary sort
   * based of the lenght of the string and
   * low and high characters
   * @param {String} string for sorting
   * @param {String} character for Low
   * @param {String} character for High
   * @return {Number} position from 1 to 2^(string length)
   */
  bianarySort(string, low, high) {
    // Convert string to Array
    let arr = string.split("");

    // Set number to sort to
    // 2 to the power of string length
    let num = Math.pow(2, arr.length);

    // For every character in the string
    // use the LOW and HIGH characters to
    // base our bianary sort on. We start
    // with the max value and then subtract if
    // the low number is used.
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === low) {
        num += Math.pow(2, arr.length - 1 - i) * -1;
      }
    }
    // Subtract one at the end to make sure we get a
    // *real programmer* num that starts at 0
    return num - 1;
  }
}

let seatIDs = [];

for (let i = 0; i < boardingPasses.length; i++) {
  let pass = new BoardingPass(boardingPasses[i]);
  seatIDs.push(pass.row * 8 + pass.seat);
  // console.log(
  //   `Row: ${pass.row} Seat: ${pass.seat} ID: ${pass.row * 8 + pass.seat}`
  // );
}

// Show highest seat ID
seatIDs.sort((a, b) => b - a);
console.log(`Highest SeatID: ${seatIDs[0]}`);

//// Part two
// Find your seat – it should be the only missing seat that'
for (let i = 0; i < seatIDs.length; i++) {
  // If the next seat ID is not 1 less
  // then it's probably ours and also check if
  // there is a next-higher seatID
  if (seatIDs[i] !== seatIDs[i + 1] + 1 && seatIDs[i + 1]) {
    console.log(
      `\n These might be your seat partners: ${seatIDs[i]} and ${
        seatIDs[i + 1]
      } \n`
    );
    console.log(`So your seat is ${seatIDs[i] - 1}`);
  }
}
