// Load in the Data
const passportData = require("./data");
console.log(passportData);

/**
 * Takes array of data and array for move
 * and returns INT of number of
 * passports that are valid
 * @param {Array} array of objects
 * @return {Number} INT of valid passports
 */
const checkPassports = (arr) => {
  // Count valid passwords
  var validPassports = 0;

  for (var i = 0; i < arr.length; i++) {
    // Create passport object
    let p = arr[i];

    // Check to see if object has
    // the requested fields
    let byr = p.hasOwnProperty("byr");
    let iyr = p.hasOwnProperty("iyr");
    let eyr = p.hasOwnProperty("eyr");
    let hgt = p.hasOwnProperty("hgt");
    let hcl = p.hasOwnProperty("hcl");
    let ecl = p.hasOwnProperty("ecl");
    let pid = p.hasOwnProperty("pid");

    // Do not check this yet
    let cid = p.hasOwnProperty("cid");

    if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
      validPassports += 1;
      console.log("passport valid");
      console.log(p);
    }
  }

  return validPassports;
};

console.log(`Number of valid passports: ${checkPassports(passportData)}`);
